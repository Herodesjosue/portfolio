"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export default function QuantumCloud() {
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // --- 1. ESCENA Y CÁMARA ---
    const bgDark = new THREE.Color(0x131414);
    const scene = new THREE.Scene();
    scene.background = bgDark.clone();
    scene.fog = new THREE.FogExp2(0x131414, 0.035);

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

    // --- 2. SHADERS (Celestial Rain / Constellation) ---
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      attribute float aScale;
      attribute vec3 aRandom;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec3 pos = position;
        
        // Movimiento de "Lluvia de Estrellas" (Caída sutil y constante)
        float fallSpeed = 0.3 + (aRandom.z * 0.4);
        pos.y -= uTime * fallSpeed;
        
        // "Wrap around": Reaparecen arriba cuando salen de la vista
        pos.y = mod(pos.y + 12.0, 24.0) - 12.0;

        // Movimiento lateral suave tipo deriva espacial
        pos.x += sin(uTime * 0.1 + aRandom.x * 20.0) * 0.5;

        // Interacción suave con el mouse (Empuje sin sacudidas)
        vec3 mousePos = vec3(uMouse * 6.0, 2.0);
        float dist = distance(pos, mousePos);
        float repulsion = smoothstep(4.0, 0.0, dist);
        vec3 dir = normalize(pos - mousePos);
        pos += dir * repulsion * 1.5;

        // Colores estelares
        vec3 colorCore   = vec3(1.0, 1.0, 1.0);
        vec3 colorOuter  = vec3(0.7, 0.8, 0.9); // Tinte azulado muy tenue

        float distFromCenter = length(pos.xy);
        float mixFactor = smoothstep(0.0, 10.0, distFromCenter);
        vColor = mix(colorCore, colorOuter, mixFactor);

        // Twinkling (Parpadeo celestial)
        float twinkle = sin(uTime * (1.0 + aRandom.y * 2.0) + aRandom.x * 10.0) * 0.5 + 0.5;
        vColor += twinkle * 0.2;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Tamaño proporcional a la cámara y parpadeo
        gl_PointSize = aScale * (12.0 / -mvPosition.z);
        gl_PointSize *= (0.8 + twinkle * 0.4);
        
        vAlpha = (1.0 - smoothstep(12.0, 22.0, -mvPosition.z)) * (0.6 + twinkle * 0.4);
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        float strength = distance(gl_PointCoord, vec2(0.5));
        strength = 1.0 - strength;
        strength = pow(strength, 3.5);
        vec3 finalColor = vColor * strength;
        if (strength < 0.01) discard;
        gl_FragColor = vec4(finalColor, strength * vAlpha);
      }
    `;

    // --- 3. GEOMETRÍA ---
    const count = 5000; // Menos puntos pero más "intencionales"
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribución más abierta tipo campo estelar
      positions[i3]     = (Math.random() - 0.5) * 20.0;
      positions[i3 + 1] = (Math.random() - 0.5) * 20.0;
      positions[i3 + 2] = (Math.random() - 0.5) * 10.0;
      
      scales[i] = Math.random() * 0.8 + 0.2;
      randomness[i3]     = Math.random();
      randomness[i3 + 1] = Math.random();
      randomness[i3 + 2] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale",   new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aRandom",  new THREE.BufferAttribute(randomness, 3));

    // --- 4. MATERIAL ---
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // --- 5. POST-PROCESAMIENTO ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.0, 0.5, 0.9
    );
    bloomPass.threshold = 0.05;
    bloomPass.strength  = 1.0;
    bloomPass.radius    = 0.6;
    composer.addPass(bloomPass);

    // --- 6. INTERACCIÓN ---
    const mouse = new THREE.Vector2();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth)  *  2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) *  2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;
      
      // Suavizado del mouse
      material.uniforms.uMouse.value.x += (mouse.x - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (mouse.y - material.uniforms.uMouse.value.y) * 0.05;

      // Rotación muy lenta de todo el campo estelar
      stars.rotation.y = elapsedTime * 0.02;
      stars.rotation.z = elapsedTime * 0.01;

      composer.render();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={containerRef}
      id="quantum-canvas"
      className="absolute inset-0 -z-10 h-full w-full"
    />
  );
}
