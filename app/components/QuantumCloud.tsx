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

    // --- Helper: detect dark mode ---
    const isDark = () => document.documentElement.classList.contains("dark");

    // --- 1. ESCENA Y CÁMARA ---
    const initialDark = isDark();
    const bgLight = new THREE.Color(0xf5f5f5);
    const bgDark = new THREE.Color(0x131414);

    const scene = new THREE.Scene();
    scene.background = initialDark ? bgDark.clone() : bgLight.clone();
    scene.fog = new THREE.FogExp2(
      initialDark ? 0x131414 : 0xf5f5f5,
      0.035
    );

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

    // --- 2. SHADERS ---
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uHover;
      uniform float uIsDark;
      attribute float aScale;
      attribute vec3 aRandom;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec3 pos = position;
        float angle = atan(pos.y, pos.x);
        float radius = length(pos.xy);
        float speed = 1.0 + (3.0 / (radius + 0.1));
        float currentAngle = angle + uTime * speed * 0.2;
        pos.x = cos(currentAngle) * radius;
        pos.y = sin(currentAngle) * radius;
        pos.z += sin(currentAngle * 3.0 + uTime) * (radius * 0.3);

        vec3 mousePos = vec3(uMouse * 5.0, 2.0);
        float dist = distance(pos, mousePos);
        float repulsion = smoothstep(3.0, 0.0, dist);
        vec3 dir = normalize(pos - mousePos);
        pos += dir * repulsion * 2.5;
        pos.x += sin(uTime * 20.0 + pos.y) * repulsion * 0.1;

        // Light mode: soft gray/blue particles
        vec3 colorCoreLight  = vec3(0.50, 0.52, 0.58);
        vec3 colorOuterLight = vec3(0.68, 0.70, 0.74);
        // Dark mode: white particles
        vec3 colorCoreDark   = vec3(1.0, 1.0, 1.0);
        vec3 colorOuterDark  = vec3(0.6, 0.6, 0.6);

        vec3 colorCore  = mix(colorCoreLight, colorCoreDark, uIsDark);
        vec3 colorOuter = mix(colorOuterLight, colorOuterDark, uIsDark);

        float mixFactor = smoothstep(0.0, 4.0, radius + repulsion);
        vColor = mix(colorCore, colorOuter, mixFactor);

        vec3 repulsionGlow = mix(vec3(0.5, 0.55, 0.6), vec3(1.0), uIsDark);
        vColor += repulsionGlow * repulsion;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = aScale * (15.0 / -mvPosition.z);
        gl_PointSize *= (1.0 + repulsion * 2.0);
        vAlpha = 1.0 - smoothstep(10.0, 20.0, -mvPosition.z);
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        float strength = distance(gl_PointCoord, vec2(0.5));
        strength = 1.0 - strength;
        strength = pow(strength, 3.0);
        vec3 finalColor = vColor * strength;
        if (strength < 0.01) discard;
        gl_FragColor = vec4(finalColor, strength * vAlpha);
      }
    `;

    // --- 3. GEOMETRÍA ---
    const count = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 4.0 + Math.random();
      const spinAngle = radius * 5.0;
      const branchAngle = (i % 3) * ((Math.PI * 2) / 3);
      const x = Math.cos(branchAngle + spinAngle) * radius;
      const y = Math.sin(branchAngle + spinAngle) * radius;
      const z = (Math.random() - 0.5) * (radius * 0.8);
      positions[i3]     = x + (Math.random() - 0.5) * 0.5;
      positions[i3 + 1] = y + (Math.random() - 0.5) * 0.5;
      positions[i3 + 2] = z + (Math.random() - 0.5) * 0.5;
      scales[i] = Math.random();
      randomness[i3]     = Math.random();
      randomness[i3 + 1] = Math.random();
      randomness[i3 + 2] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale",   new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aRandom",  new THREE.BufferAttribute(randomness, 3));

    // --- 4. MATERIAL ---
    const material = new THREE.ShaderMaterial({
      depthWrite: false,
      vertexColors: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:   { value: 0 },
        uMouse:  { value: new THREE.Vector2(0, 0) },
        uHover:  { value: 0 },
        uIsDark: { value: initialDark ? 1.0 : 0.0 },
      },
    });

    const atom = new THREE.Points(geometry, material);
    scene.add(atom);

    // --- 5. POST-PROCESAMIENTO ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.5, 0.4, 0.85
    );
    bloomPass.threshold = 0.1;
    bloomPass.strength  = initialDark ? 1.2 : 0.25;
    bloomPass.radius    = 0.5;
    composer.addPass(bloomPass);

    // --- 6. THEME REACTIVITY ---
    const targetBgColor = initialDark ? bgDark.clone() : bgLight.clone();
    let targetIsDark = initialDark ? 1.0 : 0.0;
    let targetBloomStrength = initialDark ? 1.2 : 0.25;

    const updateThemeTarget = () => {
      const dark = isDark();
      targetBgColor.copy(dark ? bgDark : bgLight);
      targetIsDark = dark ? 1.0 : 0.0;
      targetBloomStrength = dark ? 1.2 : 0.25;
    };

    const themeObserver = new MutationObserver(() => updateThemeTarget());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- 7. INTERACCIÓN ---
    const mouse = new THREE.Vector2();
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth)  *  2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) *  2 + 1;
      targetX = mouse.x * 0.5;
      targetY = mouse.y * 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouse.value.x +=
        (mouse.x - material.uniforms.uMouse.value.x) * 0.1;
      material.uniforms.uMouse.value.y +=
        (mouse.y - material.uniforms.uMouse.value.y) * 0.1;

      // Smooth theme transitions
      (scene.background as THREE.Color).lerp(targetBgColor, 0.04);
      scene.fog!.color.lerp(targetBgColor, 0.04);
      material.uniforms.uIsDark.value +=
        (targetIsDark - material.uniforms.uIsDark.value) * 0.04;
      bloomPass.strength +=
        (targetBloomStrength - bloomPass.strength) * 0.04;

      atom.rotation.y += 0.005;
      atom.rotation.x += (-targetY * 0.5 - atom.rotation.x) * 0.05;
      atom.rotation.y += (targetX * 0.5 - (atom.rotation.y % (Math.PI * 2))) * 0.05;

      composer.render();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // --- RESIZE ---
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

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();
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
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
}
