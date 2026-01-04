"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export default function QuantumCloudLight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // --- 1. ESCENA Y CÁMARA ---
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0xEEF1F3);
    // Desactivamos fog para maximizar contraste en modo claro
    scene.fog = null as unknown as THREE.Fog;
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9); // Vista cercana

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 2. SHADERS ---
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;     
      uniform float uHover;    
      
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
        // Cambiamos colores oscuros negros a tonos más claros
        vec3 colorCore = vec3(0.2, 0.2, 0.2); // Gris claro
        vec3 colorOuter = vec3(0.5, 0.5, 0.5); // Gris medio
        float mixFactor = smoothstep(0.0, 4.0, radius + repulsion);
        vColor = mix(colorCore, colorOuter, mixFactor);
        
        // En modo claro evitamos tintes de color; ligero aclarado por interacción
        vColor += vec3(0.05, 0.05, 0.05) * repulsion;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Aumentamos tamaño para que destaquen en blanco
        gl_PointSize = aScale * (22.0 / -mvPosition.z);
        gl_PointSize *= (1.0 + repulsion * 1.2); 
        
        vAlpha = 1.0 - smoothstep(10.0, 20.0, -mvPosition.z);
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          // Borde más definido, brillo más controlado en fondo claro
          strength = pow(strength, 2.0); 

          vec3 finalColor = vColor * strength;
          
          if(strength < 0.01) discard;

          // Alpha más alto para asegurar visibilidad sobre blanco
          float alpha = clamp(strength * vAlpha * 1.2, 0.2, 1.0);
          gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // --- 3. GEOMETRÍA ---
    const count = 2000;
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

      const randomX = (Math.random() - 0.5) * 0.5;
      const randomY = (Math.random() - 0.5) * 0.5;
      const randomZ = (Math.random() - 0.5) * 0.5;

      positions[i3] = x + randomX;
      positions[i3 + 1] = y + randomY;
      positions[i3 + 2] = z + randomZ;

      scales[i] = Math.random();

      randomness[i3] = Math.random();
      randomness[i3 + 1] = Math.random();
      randomness[i3 + 2] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randomness, 3));

    // --- 4. MATERIAL ---
   // --- 4. MATERIAL ---
    const material = new THREE.ShaderMaterial({
      depthWrite: false,
      // MultiplyBlending hace que los puntos oscurezcan sobre fondo blanco
      blending: THREE.MultiplyBlending,
      transparent: true,
      premultipliedAlpha: true,
      vertexColors: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHover: { value: 0 },
      },
    });

    const atom = new THREE.Points(geometry, material);
    scene.add(atom);

    // --- 5. POST-PROCESAMIENTO ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      0.0,
      0.0,
      0.0
    );
    // Sin bloom en modo claro para mantener bordes definidos
    bloomPass.threshold = 1.0;
    bloomPass.strength = 0.0;
    bloomPass.radius = 0.0;
    composer.addPass(bloomPass);

    // --- 6. INTERACCIÓN ---
    const mouse = new THREE.Vector2();
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

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

      atom.rotation.y += 0.005;
      atom.rotation.x += (-targetY * 0.5 - atom.rotation.x) * 0.05;
      atom.rotation.y +=
        (targetX * 0.5 - (atom.rotation.y % (Math.PI * 2))) * 0.05;

      composer.render();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // --- RESIZE ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-20 w-full h-full" />
  );
}
