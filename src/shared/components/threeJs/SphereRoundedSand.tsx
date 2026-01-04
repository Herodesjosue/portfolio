"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

interface SphereRoundedSandProps {
  zoom?: number;
}

export default function SphereRoundedSand({
  zoom = 12,
}: SphereRoundedSandProps) {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const targetZoomRef = useRef(zoom);

  useEffect(() => {
    targetZoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x131414);
    scene.fog = new THREE.FogExp2(0x131414, 0.025);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 60);

    const renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: false,
      powerPreference: "default",
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    // controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 30;

    const vertexShader = `
      uniform float uTime;
      attribute float aRandomBrightness;
      attribute float aSize;

      varying float vBrightness;

      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);

        return mix(
          mix(
            mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
            mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x),
            f.y
          ),
          mix(
            mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
            mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x),
            f.y
          ),
          f.z
        );
      }

      void main() {
        vBrightness = aRandomBrightness;

        float drift = noise(position * 0.5 + uTime * 0.1) * 0.3;
        vec3 newPosition = position + vec3(drift, drift * 0.5, drift * 0.2);

        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        float baseSize = 2.0 * aSize;
        gl_PointSize = baseSize * (15.0 / -mvPosition.z);
      }
    `;

    const fragmentShader = `
      varying float vBrightness;

      void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);

        float alpha = 1.0 - smoothstep(0.3, 0.5, ll);
        if (ll > 0.5) discard;

        vec3 sandBase = vec3(0.9, 0.85, 0.8);
        vec3 sandHighlight = vec3(1.0, 1.0, 1.0);
        vec3 finalColor = mix(sandBase, sandHighlight, vBrightness);

        gl_FragColor = vec4(finalColor, alpha * 0.8);
      }
    `;

    const particlesCount = 800;
    const sphereRadius = 10.0;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const brightness = new Float32Array(particlesCount);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = sphereRadius * Math.cbrt(Math.random());

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      brightness[i] = Math.random();
      sizes[i] = Math.random() * 0.5 + 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute(
      "aRandomBrightness",
      new THREE.BufferAttribute(brightness, 1)
    );
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0.6;
    bloomPass.strength = 0.4;
    bloomPass.radius = 0.1;
    composer.addPass(bloomPass);

    // const filmPass = new FilmPass(0.35, true);
    // composer.addPass(filmPass);

    const clock = new THREE.Clock();
    const animationId = 0;

    // Variable para saber si la intro sigue activa
    const introFinished = false;

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      const currentDistance = camera.position.length();
      const targetDistance = targetZoomRef.current;

      if (Math.abs(currentDistance - targetDistance) > 0.5) {
        const newDistance = THREE.MathUtils.lerp(
          currentDistance,
          targetDistance,
          0.09
        );
        camera.position.setLength(newDistance);
      }

      controls.update();
      composer.render();
    }

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      bloomPass.dispose();
      // filmPass.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas ref={containerRef} className="fixed h-full w-full -z-10 inset-0" />
  );
}
