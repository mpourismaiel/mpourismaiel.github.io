import { useCallback, useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
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
  const canvas = useRef<HTMLCanvasElement>();
  const inspector = useRef<HTMLDivElement>();
  const camera = useRef<PerspectiveCamera>();
  const scene = useRef<Scene>();
  const renderer = useRef<WebGLRenderer>();
  const parameters =
    useRef<{ color: number[]; texture: Texture; size: number }[]>();
  const materials = useRef<PointsMaterial[]>([]);

  const windowSize = useRef<{ h: number; w: number }>({ h: 0, w: 0 });
  const offset = useRef<number>(0);

  const setInspector = useCallback((el: HTMLDivElement) => {
    inspector.current = el;
    initInspector();
  }, []);

  const initInspector = useCallback(() => {
    if (
      process.env.NODE_ENV !== "development" ||
      process.env.NEXT_PUBLIC_DISABLE_INSPECTOR === "true" ||
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

  const setCanvas = useCallback((el: HTMLCanvasElement) => {
    if (canvas.current) return;
    canvas.current = el;
  }, []);

  const initScene = useCallback(() => {
    if (renderer.current) return;

    camera.current = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );
    camera.current.position.z = 1000;

    scene.current = new Scene();
    scene.current.background = new Color(0x1c1624);
    scene.current.fog = new FogExp2(0x000000, 0.0008);

    const vertices = [];
    for (
      let i = 0;
      i < (windowSize.current.w * windowSize.current.h) / 60;
      i++
    ) {
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
    const maxSize = (1000 / windowSize.current.w) * 1.5;
    parameters.current = [
      { color: [1.0, 1.0, 1.0], texture: sprite1, size: maxSize },
      { color: [0.5, 0.5, 0.5], texture: sprite2, size: maxSize / 2 },
    ];

    for (let i = 0; i < parameters.current.length; i++) {
      materials.current[i] = new PointsMaterial({
        size: parameters.current[i].size,
        map: parameters.current[i].texture,
        blending: AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      materials.current[i].color.setHSL(
        parameters.current[i].color[0],
        parameters.current[i].color[1],
        parameters.current[i].color[2],
        SRGBColorSpace,
      );

      const particles = new Points(geometry, materials.current[i]);
      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;

      scene.current.add(particles);
    }

    renderer.current = new WebGLRenderer({
      canvas: canvas.current,
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

    const time = Date.now() * 0.000008;
    const speed = (1000 / windowSize.current.w) * 1.2;
    for (let i = 0, j = 0; i < scene.current.children.length; i++) {
      const object = scene.current.children[i];
      if (object instanceof Points) {
        j++;
        object.rotation.y = time * (i === 0 ? speed : -speed);
        object.position.y = (offset.current / 20) * j;
      }
    }

    renderer.current.render(scene.current, camera.current);
  }, []);

  useEffect(() => {
    windowSize.current.w = window.innerWidth / 2;
    windowSize.current.h = window.innerHeight / 2;

    function onWindowResize() {
      if (!camera.current || !renderer.current) return;

      windowSize.current.w = window.innerWidth / 2;
      windowSize.current.h = window.innerHeight / 2;
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    }

    function onScroll() {
      offset.current = window.scrollY;
    }

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("scroll", onScroll);
    initScene();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed z-0 w-screen h-screen top-0 left-0">
      <canvas className="w-full h-full" ref={setCanvas} />
      <div className="z-20" ref={setInspector}></div>
    </div>
  );
};
