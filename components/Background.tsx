import { useCallback, useEffect, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { createInspector } from "three-inspect/vanilla";

export const Background = () => {
  const inspector = useRef<HTMLDivElement | null>(null);
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  const scrollX = useRef<number>(0);
  const scrollY = useRef<number>(0);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const camera = useRef<PerspectiveCamera | null>(null);
  const renderer = useRef<WebGLRenderer | null>(null);
  const starsT1 = useRef<Points | null>(null);
  const starsT2 = useRef<Points | null>(null);
  const scene = useRef<Scene | null>(null);
  const delta = useRef<number>(0);

  const getRandomParticelPos = useCallback((particleCount: number) => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const resizeRendererToDisplaySize = useCallback((renderer: WebGLRenderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }, []);

  const render = useCallback(() => {
    if (
      !renderer.current ||
      !scene.current ||
      !camera.current ||
      !starsT1.current ||
      !starsT2.current
    )
      return;

    if (resizeRendererToDisplaySize(renderer.current)) {
      const canvas = renderer.current.domElement;
      // changing the camera aspect to remove the strechy problem
      camera.current.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.current.updateProjectionMatrix();
    }

    starsT1.current.position.x =
      mouseX.current * 0.0001 +
      scrollX.current * 0.0005 +
      Math.cos(delta.current * 0.01) * 0.01;
    starsT1.current.position.y =
      mouseY.current * -0.0001 +
      scrollY.current * 0.0005 +
      Math.sin(delta.current * 0.01) * 0.01;

    starsT2.current.position.x =
      mouseX.current * 0.0001 +
      scrollX.current * 0.0005 +
      Math.cos(delta.current * 0.01) * 0.01;
    starsT2.current.position.y =
      mouseY.current * -0.0001 +
      scrollY.current * 0.0005 +
      Math.sin(delta.current * 0.01) * 0.01;

    renderer.current.render(scene.current, camera.current);
    requestAnimationFrame(render);
  }, []);

  const setInspector = useCallback((el: HTMLDivElement) => {
    inspector.current = el;
    initInspector();
  }, []);

  const initInspector = useCallback(() => {
    if (
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
    if (canvas.current) return;
    canvas.current = el;
    renderer.current = new WebGLRenderer({ canvas: canvas.current });
    renderer.current.setClearColor(new Color("#1c1624"));
    scene.current = new Scene();

    const color = 0xffffff;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.current.add(light);

    const fov = 75,
      aspect = 2,
      near = 1.5,
      far = 50;
    camera.current = new PerspectiveCamera(fov, aspect, near, far);
    camera.current.position.z = 2;

    const loader = new TextureLoader();
    const geometrys = [new BufferGeometry(), new BufferGeometry()];
    geometrys[0].setAttribute(
      "position",
      new BufferAttribute(getRandomParticelPos(15000), 3),
    );
    geometrys[1].setAttribute(
      "position",
      new BufferAttribute(getRandomParticelPos(15000), 3),
    );

    const materials = [
      new PointsMaterial({
        size: 0.01,
        map: loader.load("/sp1.png"),
        transparent: true,
        color: "#aaa",
      }),
      new PointsMaterial({
        size: 0.0075,
        map: loader.load("/sp2.png"),
        transparent: true,
      }),
    ];

    starsT1.current = new Points(geometrys[0], materials[0]);
    starsT2.current = new Points(geometrys[1], materials[1]);

    initInspector();
    requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      mouseX.current = e.clientX - window.innerWidth / 2;
      mouseY.current = e.clientY - window.innerHeight / 2;
    };

    const scrollHandler = (e: Event) => {
      scrollX.current = window.scrollX;
      scrollY.current = window.scrollY;
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("scroll", scrollHandler);
    const timer = setInterval(() => {
      delta.current += 1;
    }, 1000 / 60);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("scroll", scrollHandler);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed z-0 w-screen h-screen top-0 left-0">
      <canvas className="w-full h-full" ref={initScene} />
      <div className="z-20" ref={setInspector}></div>
    </div>
  );
};
