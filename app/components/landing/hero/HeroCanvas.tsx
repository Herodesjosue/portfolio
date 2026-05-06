"use client";

import { useHeroCanvas } from "./useHeroCanvas";

export default function HeroCanvas() {
  const { canvasRef } = useHeroCanvas();

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}
