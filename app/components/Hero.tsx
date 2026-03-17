import { ArrowRight } from "./icons";

const stats = [
  { value: "5+",  label: "Años exp." },
  { value: "20+", label: "Proyectos" },
  { value: "10+", label: "Tecnologías" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16 text-center lg:px-8"
      data-gsap="hero-section"
    >
      <div className="mb-6 flex items-center gap-2.5" data-gsap="hero-status">
        <span className="blink h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-medium tracking-[0.3em] text-emerald-400/80 uppercase">
          Disponible para proyectos
        </span>
      </div>

      <p className="mb-8 text-[11px] font-medium tracking-[0.45em] uppercase text-muted" data-gsap="hero-label">
        Herodes Lugo
        <span className="mx-3 opacity-30">·</span>
        Full Stack Developer
        <span className="mx-3 opacity-30">·</span>
        Creative Engineer
      </p>

      <div className="flex flex-col items-center py-10">
        <h1
          className="mx-auto text-center font-black leading-[0.88] tracking-[-0.04em] text-fg"
          style={{ fontSize: "clamp(2.8rem, 4.5vw, 6.5rem)" }}
          data-gsap="hero-headline"
        >
          <span className="block">
            CONSTRUYENDO{" "}
            <span className="text-muted">ARQUITECTURAS</span>
          </span>
          <span className="block text-muted">
            ESCALABLES{" "}
            <span className="text-fg">Y</span>
          </span>
          <span className="block">EXPERIENCIAS INMERSIVAS.</span>
        </h1>

        <div className="mt-5 flex flex-col gap-5">
          <p className="max-w-lg text-sm leading-relaxed text-muted" data-gsap="hero-desc">
            Diseño y construyo sistemas de software de alto rendimiento con foco
            en arquitectura limpia, UX excepcional y tecnologías de vanguardia.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3" data-gsap="hero-cta">
            <a
              href="#proyectos"
              className="btn-primary inline-flex items-center gap-2 rounded-sm px-6 py-3 text-[11px] font-bold tracking-[0.18em] uppercase"
            >
              Ver Proyectos
              <ArrowRight className="size-3" />
            </a>
            <a
              href="#contacto"
              className="btn-outline inline-flex items-center gap-2 rounded-sm px-6 py-3 text-[11px] font-bold tracking-[0.18em] uppercase"
            >
              Hablemos
            </a>
          </div>
        </div>
      </div>

      <div className="flex gap-12 pt-8" data-gsap="hero-stats">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <span className="text-2xl font-black leading-none text-fg">{s.value}</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
