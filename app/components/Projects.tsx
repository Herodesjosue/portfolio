const projects = [
  {
    number: "01",
    tag: "Web · CRM · SaaS",
    title: "Sistemas de Gestión Administrativa",
    description:
      "Arquitectura y desarrollo de plataformas CRM empresariales con Next.js 13 y Supabase. Diseño de esquemas de base de datos relacionales, autenticación por roles, dashboards analíticos en tiempo real y APIs REST/GraphQL de alto rendimiento.",
    stack: ["Next.js 13", "Supabase", "TypeScript", "Prisma ORM", "PostgreSQL"],
    year: "2023 — 2024",
  },
  {
    number: "02",
    tag: "Mobile · Cross-Platform",
    title: "Desarrollo Mobile Multiplataforma",
    description:
      "Creación de aplicaciones móviles nativas con React Native para iOS y Android. Integración con APIs backend, manejo de estado global con Zustand, notificaciones push y flujos de autenticación OAuth.",
    stack: ["React Native", "Zustand", "Node.js", "REST API", "OAuth 2.0"],
    year: "2022 — 2024",
  },
];

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 lg:py-0" data-gsap="projects-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-4" data-gsap="projects-header">
          <span className="text-xs font-medium tracking-[0.35em] uppercase"
            style={{ color: "var(--c-muted)" }}>
            04 — Proyectos
          </span>
          <h2 className="text-4xl font-black tracking-[-0.02em] sm:text-5xl lg:text-6xl"
            style={{ color: "var(--c-fg)" }}>
            LOGROS CLAVE
          </h2>
          <div className="h-px w-16" style={{ background: "var(--c-border2)" }} />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-gsap="projects-grid">
          {projects.map((project, i) => (
            <article
              key={project.number}
              className="theme-card group flex flex-col overflow-hidden rounded-xl"
              data-gsap={`project-card-${i}`}
            >
              {/* Image placeholder */}
              <div
                className="relative h-52 overflow-hidden lg:h-64"
                style={{ background: "var(--c-surface2)" }}
              >
                {/* Grid overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(128,128,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,1) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Project number */}
                <div className="absolute bottom-4 right-5">
                  <span className="select-none text-6xl font-black"
                    style={{ color: "var(--c-border)" }}>
                    {project.number}
                  </span>
                </div>

                {/* Corner marks */}
                <div className="absolute left-4 top-4 h-5 w-5 border-l border-t transition-all duration-300 group-hover:opacity-60"
                  style={{ borderColor: "var(--c-border2)" }} />
                <div className="absolute right-4 top-4 h-5 w-5 border-r border-t transition-all duration-300 group-hover:opacity-60"
                  style={{ borderColor: "var(--c-border2)" }} />

                {/* Tag */}
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <span
                    className="rounded-sm px-3 py-1.5 text-[9px] font-medium tracking-[0.25em] uppercase backdrop-blur-sm"
                    style={{
                      border: "1px solid var(--c-border)",
                      color: "var(--c-muted)",
                      background: "rgba(0,0,0,0.25)",
                    }}
                  >
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-5 p-7">
                <span className="text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: "var(--c-muted)", opacity: 0.5 }}>
                  {project.year}
                </span>

                <h3 className="text-xl font-bold leading-tight tracking-tight"
                  style={{ color: "var(--c-fg)" }}>
                  {project.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>
                  {project.description}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="tech-pill cursor-default rounded-sm px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-2 pt-2">
                  <span
                    className="text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 group-hover:opacity-80"
                    style={{ color: "var(--c-muted)", opacity: 0.5 }}
                  >
                    Ver caso de estudio
                  </span>
                  <svg
                    className="h-3 w-3 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: "var(--c-border2)" }}
                    viewBox="0 0 12 12" fill="none"
                  >
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
