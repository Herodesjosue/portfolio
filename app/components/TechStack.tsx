"use client";

import { useEffect, useRef } from "react";

const categories = [
  {
    id: "frontend",
    number: "01",
    label: "Frontend",
    dotColor: "rgba(0,212,255,0.9)",
    glow: "rgba(0,212,255,0.1)",
    techs: ["React.js", "Next.js", "Tailwind CSS", "Zustand", "Bootstrap"],
    span: "lg:col-span-4",
  },
  {
    id: "backend",
    number: "02",
    label: "Backend",
    dotColor: "rgba(124,58,237,0.9)",
    glow: "rgba(124,58,237,0.1)",
    techs: ["Node.js", "NestJS", "GraphQL", "Prisma ORM"],
    span: "lg:col-span-4",
  },
  {
    id: "creative",
    number: "03",
    label: "Creative & Motion",
    dotColor: "rgba(255,255,255,0.7)",
    glow: "rgba(255,255,255,0.05)",
    techs: ["GSAP", "Three.js", "WebGL"],
    span: "lg:col-span-4",
  },
  {
    id: "databases",
    number: "04",
    label: "Bases de Datos",
    dotColor: "rgba(0,212,255,0.7)",
    glow: "rgba(0,212,255,0.07)",
    techs: ["PostgreSQL", "MongoDB", "Supabase"],
    span: "lg:col-span-6",
  },
  {
    id: "mobile",
    number: "05",
    label: "Mobile",
    dotColor: "rgba(124,58,237,0.7)",
    glow: "rgba(124,58,237,0.07)",
    techs: ["React Native"],
    span: "lg:col-span-6",
  },
];

const allTechs = [
  "React.js", "Next.js", "TypeScript", "Node.js", "NestJS", "GraphQL",
  "Prisma ORM", "PostgreSQL", "MongoDB", "Supabase", "React Native",
  "GSAP", "Three.js", "WebGL", "Tailwind CSS", "Zustand", "Docker",
  "Git", "REST APIs", "Auth0", "Vercel", "AWS",
];

export default function TechStack() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".stack-card");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.animationDelay = `${idx * 80}ms`;
            el.classList.add("stack-card-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => {
      card.style.opacity = "0";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stack" className="py-24 lg:py-32" data-gsap="stack-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-4" data-gsap="stack-header">
          <span className="text-xs font-medium tracking-[0.35em] uppercase"
            style={{ color: "var(--c-muted)" }}>
            03 — Tecnologías
          </span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl font-black tracking-[-0.02em] sm:text-5xl lg:text-6xl"
              style={{ color: "var(--c-fg)" }}>
              CORE TECH STACK
            </h2>
            <p className="max-w-xs pb-1 text-sm" style={{ color: "var(--c-muted)" }}>
              Herramientas que uso a diario para construir productos escalables.
            </p>
          </div>
          <div className="h-px w-16" style={{ background: "var(--c-border2)" }} />
        </div>

        {/* Bento grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12"
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`stack-card theme-card group relative overflow-hidden rounded-xl p-6 ${cat.span}`}
              style={{ opacity: 0 }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 30% 40%, ${cat.glow} 0%, transparent 70%)`,
                }}
              />

              {/* Number */}
              <div className="absolute right-5 top-5">
                <span className="font-mono text-[10px] tracking-[0.2em]"
                  style={{ color: "var(--c-border2)" }}>
                  {cat.number}
                </span>
              </div>

              {/* Category label */}
              <div className="mb-5 flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{
                    background: cat.dotColor,
                    boxShadow: `0 0 6px ${cat.dotColor}`,
                  }}
                />
                <span className="text-[10px] font-semibold tracking-[0.3em] uppercase"
                  style={{ color: "var(--c-muted)" }}>
                  {cat.label}
                </span>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="tech-pill cursor-default rounded-sm px-3 py-1.5 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bottom sweep */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{
                  background: `linear-gradient(90deg, ${cat.dotColor}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div
          className="mt-12 overflow-hidden py-4"
          style={{ borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)" }}
        >
          <div className="marquee-track select-none">
            {[...allTechs, ...allTechs].map((tech, i) => (
              <div key={i} className="flex items-center gap-5 px-5">
                <span
                  className="cursor-default whitespace-nowrap text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-200"
                  style={{ color: "var(--c-muted)", opacity: 0.4 }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.9")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "0.4")}
                >
                  {tech}
                </span>
                <span
                  className="h-1 w-1 flex-shrink-0 rounded-full"
                  style={{ background: "var(--c-border2)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
