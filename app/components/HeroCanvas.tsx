"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number;
  oy: number;
  w: number;
  h: number;
  angle: number;
  rotSpeed: number;
  alpha: number;
  r: number;
  g: number;
  b: number;
}

// Color palette: mostly white, accent cyan & purple
const PALETTE = [
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
  [0,   212, 255],
  [0,   212, 255],
  [124,  58, 237],
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildParticles(w: number, h: number): Particle[] {
  const count = Math.min(220, Math.floor((w * h) / 6000));
  return Array.from({ length: count }, () => {
    const x  = rand(0, w);
    const y  = rand(0, h);
    const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    return {
      x,  y,
      vx: rand(-0.15, 0.15),
      vy: rand(-0.15, 0.15),
      ox: x, oy: y,
      w: rand(3, 9),
      h: rand(1.5, 3),
      angle: rand(0, Math.PI),
      rotSpeed: rand(-0.004, 0.004),
      alpha: rand(0.08, 0.35),
      r, g, b,
    };
  });
}

export default function HeroCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef       = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w   = canvas.offsetWidth;
    const h   = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    particlesRef.current = buildParticles(w, h);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    init();

    // Track mouse globally, compute position relative to canvas
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const onResize = () => init();

    const section = canvas.closest("section");
    section?.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    // ── Animation loop ───────────────────────────────────────
    const REPEL_R  = 140;   // repulsion radius (px)
    const REPEL_K  = 3200;  // repulsion strength
    const SPRING   = 0.016; // return spring
    const DAMP     = 0.88;  // velocity damping
    const AMBIENT  = 0.018; // ambient random drift per tick

    const tick = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W  = canvas.offsetWidth;
      const H  = canvas.offsetHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      for (const p of particlesRef.current) {
        // ── Mouse repulsion ──────────────────────────────────
        const dx    = p.x - mx;
        const dy    = p.y - my;
        const dist2 = dx * dx + dy * dy;

        if (dist2 < REPEL_R * REPEL_R && dist2 > 1) {
          const dist  = Math.sqrt(dist2);
          const force = REPEL_K / (dist2 + 1);
          p.vx += (dx / dist) * force * 0.016;
          p.vy += (dy / dist) * force * 0.016;
        }

        // ── Spring return to origin ──────────────────────────
        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;

        // ── Ambient micro-drift ──────────────────────────────
        p.vx += (Math.random() - 0.5) * AMBIENT;
        p.vy += (Math.random() - 0.5) * AMBIENT;

        // ── Damping & integration ───────────────────────────
        p.vx *= DAMP;
        p.vy *= DAMP;
        p.x  += p.vx;
        p.y  += p.vy;
        p.angle += p.rotSpeed;

        // ── Draw ─────────────────────────────────────────────
        // Skip if entirely outside canvas
        if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) continue;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
        ctx.fillRect(-p.w * 0.5, -p.h * 0.5, p.w, p.h);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMouseMove);
      section?.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}
