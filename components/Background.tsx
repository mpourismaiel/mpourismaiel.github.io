import { useCallback, useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  FogExp2,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { createInspector } from "three-inspect/vanilla";

const StarrySkyShader = {
  vertexShader: `
    varying vec3 vPos;

    void main() {
      vPos = position;
      vec4 mvPosition = modelViewMatrix * vec4( vPos, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

    float cnoise(vec3 P){
      vec3 Pi0 = floor(P); // Integer part for indexing
      vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
      Pi0 = mod(Pi0, 289.0);
      Pi1 = mod(Pi1, 289.0);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;

      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);

      vec4 gx0 = ixy0 / 7.0;
      vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);

      vec4 gx1 = ixy1 / 7.0;
      vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);

      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;

      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);

      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
      return 2.2 * n_xyz;
    }

    varying vec3 vPos;
    uniform float skyRadius;
    uniform vec3 noiseOffset;

    uniform vec3 env_c1;
    uniform vec3 env_c2;

    uniform float clusterSize;
    uniform float clusterStrength;

    uniform float starSize;
    uniform float starDensity;
    uniform float time;

    void main() {
      float freq = 1.1/skyRadius;
      float noise = cnoise(vPos * freq);
      vec4 backgroundColor = vec4(mix(env_c1, env_c2, noise), 1.0);

      float scaledClusterSize = (1.0/clusterSize)/skyRadius;
      float scaledStarSize = (1.0/starSize)/skyRadius;

      float cs = pow(abs(cnoise(scaledClusterSize*vPos+noiseOffset)),1.0/clusterStrength) + cnoise(scaledStarSize*vPos);

      float c =clamp(pow(abs(cs), 1.0/starDensity),0.0,1.0);
      vec4 starColor = 0.5*vec4(c, c, c, 1.0);

      vec3 p = vPos * mod(time * 2.5, 10.);
      //p.y += time;
      float sn = sin(time * 2.) * 0.5 + 0.5;
      float starNoise = (cnoise(p * freq) * 0.5 + 0.5) * sn;

      gl_FragColor = backgroundColor;
      gl_FragColor += starColor * starNoise;
    }
  `,
};

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
