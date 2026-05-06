export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
      <div className="absolute inset-0 grid-pattern animate-grid-pan" />
      <div className="absolute inset-0 bg-noise mix-blend-multiply" />
    </div>
  );
}
