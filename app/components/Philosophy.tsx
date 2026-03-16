const cards = [
  {
    emoji: "✦",
    title: "Clean Code por defecto",
    description:
      "La mantenibilidad y legibilidad son el estándar de oro. Escribo código que los equipos pueden entender, escalar y evolucionar sin fricción.",
    tag: "Principios",
  },
  {
    emoji: "⚡",
    title: "Performance como estándar",
    description:
      "La optimización técnica no es opcional. Cada milisegundo importa — diseño arquitecturas que entregan experiencias veloces y fluidas por defecto.",
    tag: "Ingeniería",
  },
  {
    emoji: "◈",
    title: "UX/UI Creativo como prioridad",
    description:
      "El software debe ser hermoso y funcional. Fusiono narrativa visual con interacciones inmersivas para crear productos que los usuarios recuerdan.",
    tag: "Diseño",
  },
];

export default function Philosophy() {
  return (
    <section id="filosofia" className="py-24 lg:py-0" data-gsap="philosophy-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-4" data-gsap="philosophy-header">
          <span className="text-xs font-medium tracking-[0.35em] uppercase"
            style={{ color: "var(--c-muted)" }}>
            02 — Filosofía
          </span>
          <h2 className="text-4xl font-black tracking-[-0.02em] sm:text-5xl lg:text-6xl"
            style={{ color: "var(--c-fg)" }}>
            MI FILOSOFÍA
          </h2>
          <div className="h-px w-16" style={{ background: "var(--c-border2)" }} />
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" data-gsap="philosophy-cards">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="theme-card group flex flex-col justify-between gap-8 rounded-xl p-8"
              data-gsap={`philosophy-card-${i}`}
            >
              <div className="flex flex-col gap-5">
                {/* Icon */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-all duration-300"
                  style={{ border: "1px solid var(--c-border2)", color: "var(--c-fg)" }}
                >
                  {card.emoji}
                </div>

                <h3 className="text-xl font-bold leading-tight tracking-tight"
                  style={{ color: "var(--c-fg)" }}>
                  {card.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>
                  {card.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-[0.25em] uppercase"
                  style={{ color: "var(--c-muted)", opacity: 0.5 }}>
                  {card.tag}
                </span>
                <div className="mx-4 h-px flex-1" style={{ background: "var(--c-border)" }} />
                <svg className="h-3 w-3 transition-all duration-300 group-hover:translate-x-0.5"
                  style={{ color: "var(--c-border2)" }}
                  viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
