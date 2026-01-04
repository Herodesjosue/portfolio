import * as THREE from "three";
import { useEffect, useRef } from "react";

const HoverGlass = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // console.log(canvasRef.current);
  useEffect(() => {
    if (!canvasRef.current) return;
    // --- 1. CONFIGURACIÓN DE ESCENA ---
    const scene = new THREE.Scene();
    // Usamos cámara ortográfica porque es un efecto 2D, no necesitamos perspectiva
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimización retina
    // document.body.appendChild(renderer.domElement);

    // --- 2. EL SHADER (GLSL) ---
    // Aquí es donde ocurre la magia matemática
    const fragmentShader = `
            uniform sampler2D uTexture;
            uniform vec2 uMouse;
            uniform float uVelo;
            uniform vec2 uResolution;
            uniform vec2 uImageSize;
            varying vec2 vUv;

            // Función Helper: Emula 'background-size: cover'
            vec2 getCoverUv(vec2 uv, vec2 resolution, vec2 texResolution) {
                vec2 s = resolution; // Screen
                vec2 i = texResolution; // Image
                float rs = s.x / s.y;
                float ri = i.x / i.y;
                vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, s.y * i.x / s.x);
                vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
                vec2 uvCover = uv * s / new + offset;
                return uvCover;
            }

            void main() {
                vec2 uv = vUv;
                
                // 1. Corregir Aspect Ratio (Cover)
                vec2 coverUv = getCoverUv(uv, uResolution, uImageSize);

                // 2. Calcular distancia del mouse (Corregida por aspecto de pantalla)
                // Si no corregimos, el círculo del mouse será un óvalo
                vec2 mouse = uMouse;
                float aspectRatio = uResolution.x / uResolution.y;
                
                vec2 aspectUV = vUv; 
                aspectUV.x *= aspectRatio; 
                mouse.x *= aspectRatio;

                float dist = distance(aspectUV, mouse);
                
                // 3. Crear ondas / decaimiento
                float decay = smoothstep(0.5, 0.0, dist);
                
                // 4. Calcular la fuerza basada en la velocidad del mouse
                float strength = 0.02 * uVelo * decay;

                // 5. Deformar UVs (Efecto Liquido)
                vec2 distortedUV = coverUv - (aspectUV - mouse) * strength;

                // 6. Aberración Cromática (RGB Shift)
                float r = texture2D(uTexture, distortedUV + vec2(strength * 0.5, 0.0)).r;
                float g = texture2D(uTexture, distortedUV).g;
                float b = texture2D(uTexture, distortedUV - vec2(strength * 0.5, 0.0)).b;

                gl_FragColor = vec4(r, g, b, 1.0);
            }
        `;

    const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;

    // --- 3. CARGA DE RECURSOS ---
    const loader = new THREE.TextureLoader();
    // Usamos una imagen 
    loader.load(
      "https://images.unsplash.com/photo-1515139832362-a06b09ecced0?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      (texture) => {
        // Una vez cargada la textura, creamos el mesh
        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTexture: { value: texture },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uVelo: { value: 0.0 },
            uResolution: {
              value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            uImageSize: {
              value: new THREE.Vector2(
                texture.image.width,
                texture.image.height
              ),
            },
          },
        });

        // Plano que ocupa toda la pantalla (Clip Space -1 a 1)
        const geometry = new THREE.PlaneGeometry(2, 2);
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
      }
    );

    // --- 4. INTERACCIÓN (MOUSE) ---
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const currentMouse = new THREE.Vector2(0.5, 0.5);
    let targetVelo = 0.0;
    let currentVelo = 0.0;

    window.addEventListener("mousemove", (e) => {
      // Normalizamos de 0 a 1
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight; // Invertir Y para WebGL

      targetMouse.set(x, y);

      // "Hack" visual: aumentamos la distorsión cuando el mouse se mueve
      targetVelo = 1.5;
    });

    // --- 5. RENDER LOOP ---
    function animate() {
      requestAnimationFrame(animate);

      // Verificar si el material está listo (async load)
      const plane = scene.children[0];
      if (plane && plane.material.uniforms) {
        // LERP: Interpolación suave para el movimiento
        // Esto hace que el efecto se sienta "viscoso"
        currentMouse.lerp(targetMouse, 0.08);

        // Decaimiento de la velocidad (vuelve a 0 si no mueves el mouse)
        targetVelo *= 0.96;
        currentVelo += (targetVelo - currentVelo) * 0.1;

        // Actualizar Uniforms
        plane.material.uniforms.uMouse.value.copy(currentMouse);
        plane.material.uniforms.uVelo.value = currentVelo;
      }

      renderer.render(scene, camera);
    }
    animate();

    // --- 6. MANEJO DE REDIMENSIONAMIENTO ---
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);

      const plane = scene.children[0];
      if (plane) {
        plane.material.uniforms.uResolution.value.set(width, height);
      }
    });

    return () => {
    
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed h-full object-cover w-full inset-0"
      
    />
  );
};

export default HoverGlass;
