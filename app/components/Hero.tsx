const stats = [
  { value: "5+", label: "Años exp." },
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
      {/* Status badge */}
      <div className="mb-6 flex items-center gap-2.5" data-gsap="hero-status">
        <span className="blink h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-medium tracking-[0.3em] text-emerald-400/80 uppercase">
          Disponible para proyectos
        </span>
      </div>

      {/* Identity */}
      <p
        className="mb-8 text-[11px] font-medium tracking-[0.45em] uppercase"
        style={{ color: "var(--c-muted)" }}
        data-gsap="hero-label"
      >
        Herodes Lugo
        <span className="mx-3 opacity-30">·</span>
        Full Stack Developer
        <span className="mx-3 opacity-30">·</span>
        Creative Engineer
      </p>
      <div className="flex py-10 max-lg:flex-col items-end">
        {/* Headline */}
        <h1
          className="mx-auto max-w-5xl text-left max-lg:text-center font-black leading-[0.88] tracking-[-0.04em]"
          style={{
            fontSize: "clamp(2.8rem, 5.5vw, 6.5rem)",
            color: "var(--c-fg)",
          }}
          data-gsap="hero-headline"
        >
          <span className="block">CONSTRUYENDO</span>
          <span className="block" style={{ color: "var(--c-muted)" }}>
            ARQUITECTURAS
          </span>
          <span className="block" style={{ color: "var(--c-muted)" }}>
            ESCALABLES
          </span>
          <span className="block">Y EXPERIENCIAS</span>
          <span className="block">INMERSIVAS.</span>
        </h1>

        <div className="">
          {/* Description */}
          <p
            className="mb-10 max-w-lg text-sm leading-relaxed"
            style={{ color: "var(--c-muted)" }}
            data-gsap="hero-desc"
          >
            Diseño y construyo sistemas de software de alto rendimiento con foco
            en arquitectura limpia, UX excepcional y tecnologías de vanguardia.
          </p>

          {/* CTAs */}
          <div
            className="mb-14 flex flex-wrap items-center justify-center gap-3"
            data-gsap="hero-cta"
          >
            <a
              href="#proyectos"
              className="btn-primary inline-flex items-center gap-2 rounded-sm px-6 py-3 text-[11px] font-bold tracking-[0.18em] uppercase"
            >
              Ver Proyectos
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6h8M6 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
      {/* Stats */}
      <div
        className="flex gap-12  pt-8"
        style={{ borderColor: "var(--c-border)" }}
        data-gsap="hero-stats"
      >
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <span
              className="text-2xl font-black leading-none"
              style={{ color: "var(--c-fg)" }}
            >
              {s.value}
            </span>
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "var(--c-muted)" }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--c-border2)" }}>
          Scroll
        </span>
        <div className="h-8 w-px overflow-hidden">
          <div
            className="h-full w-full animate-bounce"
            style={{ background: "linear-gradient(to bottom, var(--c-border2), transparent)" }}
          />
        </div>
      </div> */}
    </section>
  );
}
