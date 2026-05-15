export interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  ox: number; oy: number;
  w: number; h: number;
  angle: number; rotSpeed: number;
  alpha: number;
  r: number; g: number; b: number;
}

const PALETTE: [number, number, number][] = [
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
  [0, 212, 255],
  [0, 212, 255],
  [124, 58, 237],
];

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function buildParticles(w: number, h: number): Particle[] {
  const count = Math.min(220, Math.floor((w * h) / 6000));
  return Array.from({ length: count }, () => {
    const x = rand(0, w);
    const y = rand(0, h);
    const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    return {
      x, y,
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

export const REPEL_R = 140;
export const REPEL_K = 3200;
export const SPRING = 0.016;
export const DAMP = 0.88;
export const AMBIENT = 0.018;
