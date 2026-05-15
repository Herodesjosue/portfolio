"use client";

import { useRef, useEffect, useCallback } from "react";
import { buildParticles, Particle, REPEL_R, REPEL_K, SPRING, DAMP, AMBIENT } from "./canvas-utils";

export function useHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    particlesRef.current = buildParticles(w, h);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    init();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onResize = () => init();

    const section = canvas.closest("section");
    section?.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    const tick = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      for (const p of particlesRef.current) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist2 = dx * dx + dy * dy;

        if (dist2 < REPEL_R * REPEL_R && dist2 > 1) {
          const dist = Math.sqrt(dist2);
          const force = REPEL_K / (dist2 + 1);
          p.vx += (dx / dist) * force * 0.016;
          p.vy += (dy / dist) * force * 0.016;
        }

        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;
        p.vx += (Math.random() - 0.5) * AMBIENT;
        p.vy += (Math.random() - 0.5) * AMBIENT;
        p.vx *= DAMP;
        p.vy *= DAMP;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.rotSpeed;

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

  return { canvasRef };
}
