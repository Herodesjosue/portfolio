const contacts = [
  {
    type: "Email",
    label: "herodeslugo@gmail.com",
    href: "mailto:herodeslugo@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    type: "LinkedIn",
    label: "/in/herodeslugo",
    href: "https://www.linkedin.com/in/herodeslugo/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    type: "Portafolio",
    label: "portfolio-1kxr.vercel.app",
    href: "https://portfolio-1kxr.vercel.app/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="pt-24 lg:pt-32"
      // style={{ borderTop: "1px solid var(--c-border)" }}
      data-gsap="footer-section"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 text-center">

          {/* Label */}
          <span className="text-xs font-medium tracking-[0.35em] uppercase"
            style={{ color: "var(--c-muted)" }}>
            05 — Contacto
          </span>

          {/* Headline */}
          <h2
            className="font-black tracking-[-0.03em]"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
              lineHeight: 0.9,
              color: "var(--c-fg)",
            }}
            data-gsap="footer-headline"
          >
            ¿LISTO PARA
            <br />
            <span style={{ color: "var(--c-muted)" }}>CONSTRUIR ALGO</span>
            <br />
            INCREÍBLE?
          </h2>

          {/* Quote */}
          <p className="max-w-2xl text-base leading-relaxed" style={{ color: "var(--c-muted)" }}>
            Si buscas a un desarrollador que vea el código como una herramienta para{" "}
            <em className="not-italic font-semibold" style={{ color: "var(--c-fg)" }}>
              resolver problemas reales
            </em>{" "}
            mediante la innovación, hablemos.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:herodeslugo@gmail.com"
              className="btn-primary inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Escribir un Mensaje
            </a>
            <a
              href="https://www.linkedin.com/in/herodeslugo/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              Conectar en LinkedIn
            </a>
          </div>

          {/* Contact cards */}
          <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {contacts.map((c) => (
              <a
                key={c.type}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="theme-card group flex flex-col items-center gap-3 rounded-xl px-5 py-6"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300"
                  style={{
                    border: "1px solid var(--c-border2)",
                    color: "var(--c-muted)",
                  }}
                >
                  {c.icon}
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-semibold tracking-[0.3em] uppercase"
                    style={{ color: "var(--c-muted)", opacity: 0.5 }}>
                    {c.type}
                  </span>
                  <span className="text-xs font-medium transition-colors duration-300"
                    style={{ color: "var(--c-muted)" }}>
                    {c.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-16 py-8" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-sm text-xs font-black"
              style={{ border: "1px solid var(--c-border)", color: "var(--c-border2)" }}
            >
              HL
            </div>
            <p className="text-xs tracking-[0.1em]" style={{ color: "var(--c-muted)", opacity: 0.4 }}>
              Copyright © 2026 Herodes Lugo. Todos los derechos reservados.
            </p>
            <p className="text-xs tracking-[0.1em]" style={{ color: "var(--c-muted)", opacity: 0.25 }}>
              Built with Next.js & Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
