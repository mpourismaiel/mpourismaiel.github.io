import { useCallback, useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  FogExp2,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  SRGBColorSpace,
  Scene,
  Texture,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { createInspector } from "three-inspect/vanilla";

export const Background = () => {
  const inspector = useRef<HTMLDivElement>();
  const camera = useRef<PerspectiveCamera>();
  const scene = useRef<Scene>();
  const renderer = useRef<WebGLRenderer>();
  const parameters =
    useRef<{ color: number[]; texture: Texture; size: number }[]>();
  const materials = useRef<PointsMaterial[]>([]);
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);

  const windowHalfX = useRef<number>(0);
  const windowHalfY = useRef<number>(0);

  const setInspector = useCallback((el: HTMLDivElement) => {
    inspector.current = el;
    initInspector();
  }, []);

  const initInspector = useCallback(() => {
    if (
      process.env.NODE_ENV !== "development" ||
      !inspector.current ||
      !scene.current ||
      !camera.current ||
      !renderer.current
    )
      return;

    createInspector(inspector.current, {
      scene: scene.current,
      camera: camera.current,
      renderer: renderer.current,
    });
  }, []);

  const initScene = useCallback((el: HTMLCanvasElement) => {
    if (renderer.current) return;

    camera.current = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );
    camera.current.position.z = 1000;

    scene.current = new Scene();
    scene.current.fog = new FogExp2(0x000000, 0.0008);

    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      vertices.push(x, y, z);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

    const textureLoader = new TextureLoader();
    const sprite1 = textureLoader.load("/sp1.png");
    const sprite2 = textureLoader.load("/sp2.png");
    parameters.current = [
      { color: [1.0, 1.0, 1.0], texture: sprite1, size: 1 },
      { color: [0.5, 0.5, 0.5], texture: sprite2, size: 0.5 },
    ];

    for (let i = 0; i < parameters.current.length; i++) {
      const color = parameters.current[i].color;
      const sprite = parameters.current[i].texture;
      const size = parameters.current[i].size;
      materials.current[i] = new PointsMaterial({
        size: size,
        map: sprite,
        blending: AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      materials.current[i].color.setHSL(
        color[0],
        color[1],
        color[2],
        SRGBColorSpace,
      );

      const particles = new Points(geometry, materials.current[i]);
      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;

      scene.current.add(particles);
    }

    renderer.current = new WebGLRenderer({
      canvas: el,
    });
    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setAnimationLoop(render);
    initInspector();
  }, []);

  const render = useCallback(() => {
    if (
      !camera.current ||
      !scene.current ||
      !renderer.current ||
      !parameters.current
    )
      return;

    const time = Date.now() * 0.00005;

    camera.current.position.x +=
      (mouseX.current - camera.current.position.x) * 0.05;
    camera.current.position.y +=
      (-mouseY.current - camera.current.position.y) * 0.05;

    camera.current.lookAt(scene.current.position);

    for (let i = 0; i < scene.current.children.length; i++) {
      const object = scene.current.children[i];
      if (object instanceof Points) {
        object.rotation.y = time * (i < 4 ? i + 1 : -i - 1) * 0.5;
      }
    }

    renderer.current.render(scene.current, camera.current);
  }, []);

  useEffect(() => {
    windowHalfX.current = window.innerWidth / 2;
    windowHalfY.current = window.innerHeight / 2;

    function onWindowResize() {
      if (!camera.current || !renderer.current) return;

      windowHalfX.current = window.innerWidth / 2;
      windowHalfY.current = window.innerHeight / 2;
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <div className="fixed z-0 w-screen h-screen top-0 left-0">
      <canvas className="w-full h-full" ref={initScene} />
      <div className="z-20" ref={setInspector}></div>
    </div>
  );
};
