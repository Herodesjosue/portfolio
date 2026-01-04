import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function QuanticoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // ESCENA, CÁMARA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // SHADERS
    const fragmentShader = `
            uniform vec2 uMouse;
            uniform float uVelo;
            uniform vec2 uResolution;
            uniform float uAlpha;
            varying vec2 vUv;
            void main() {
                vec2 uv = vUv;
                float aspectRatio = uResolution.x / uResolution.y;
                vec2 aspectUV = vUv;
                aspectUV.x *= aspectRatio;
                vec2 mouse = uMouse;
                mouse.x *= aspectRatio;
                float dist = distance(aspectUV, mouse);
                float decay = smoothstep(0.15, 0.0, dist);
                float strength = 0.02 * uVelo * decay;
                float intensity = smoothstep(0.0, 0.01, strength);
                float alpha = intensity * uAlpha;
                vec3 color = vec3(intensity);
                gl_FragColor = vec4(color, alpha);
            }
        `;
    const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;

    // MATERIAL + GEOMETRÍA
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uVelo: { value: 0.0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uAlpha: { value: 0.6 },
      },
      transparent: true,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // INTERACCIÓN
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const currentMouse = new THREE.Vector2(0.5, 0.5);
    let targetVelo = 0.0;
    let currentVelo = 0.0;

    function onMouseMove(e: MouseEvent) {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight;
      targetMouse.set(x, y);
      targetVelo = 1.5;
    }
    window.addEventListener("mousemove", onMouseMove);

    // RENDER LOOP
    let rafId: number | null = null;
    function animate() {
      rafId = requestAnimationFrame(animate);
      currentMouse.lerp(targetMouse, 0.08);
      targetVelo *= 0.96;
      currentVelo += (targetVelo - currentVelo) * 0.1;

      material.uniforms.uMouse.value.copy(currentMouse);
      material.uniforms.uVelo.value = currentVelo;

      renderer.render(scene, camera);
    }
    animate();

    // RESIZE
    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      material.uniforms.uResolution.value.set(width, height);
    }
    window.addEventListener("resize", onResize);

    // LIMPIEZA
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // contenedor y overlay (estilo mínimo) - el canvas es el lienzo principal
  return (
    <div className="bg-dark fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
