"use client";

import { useTranslations } from "next-intl";

const allTechs = [
  "React.js", "Next.js", "TypeScript", "Node.js", "NestJS", "GraphQL",
  "Prisma ORM", "PostgreSQL", "MongoDB", "Supabase", "React Native",
  "GSAP", "Three.js", "WebGL", "Tailwind CSS", "Zustand", "Docker",
  "Git", "REST APIs", "Auth0", "Vercel", "AWS",
];

export default function TechStack() {
  const t = useTranslations("TechStack");

  const categories = [
    {
      id: "frontend",
      number: "01",
      label: t("categories.frontend"),
      dotColor: "rgba(0,212,255,0.9)",
      glow: "rgba(0,212,255,0.1)",
      techs: ["React.js", "Next.js", "Tailwind CSS", "Zustand", "Bootstrap"],
      span: "lg:col-span-4",
    },
    {
      id: "backend",
      number: "02",
      label: t("categories.backend"),
      dotColor: "rgba(124,58,237,0.9)",
      glow: "rgba(124,58,237,0.1)",
      techs: ["Node.js", "NestJS", "GraphQL", "Prisma ORM"],
      span: "lg:col-span-4",
    },
    {
      id: "creative",
      number: "03",
      label: t("categories.creative"),
      dotColor: "rgba(100,100,120,0.7)",
      glow: "rgba(100,100,120,0.05)",
      techs: ["GSAP", "Three.js", "WebGL"],
      span: "lg:col-span-4",
    },
    {
      id: "databases",
      number: "04",
      label: t("categories.databases"),
      dotColor: "rgba(0,212,255,0.7)",
      glow: "rgba(0,212,255,0.07)",
      techs: ["PostgreSQL", "MongoDB", "Supabase"],
      span: "lg:col-span-6",
    },
    {
      id: "mobile",
      number: "05",
      label: t("categories.mobile"),
      dotColor: "rgba(124,58,237,0.7)",
      glow: "rgba(124,58,237,0.07)",
      techs: ["React Native"],
      span: "lg:col-span-6",
    },
  ];

  return (
    <section id="stack" className="py-24 lg:py-32" data-gsap="stack-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-16 flex flex-col gap-4" data-gsap="stack-header">
          <span
            className="text-xs font-medium tracking-[0.35em] uppercase text-muted"
            data-reveal="fade-in"
          >
            {t("sectionLabel")}
          </span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              className="text-4xl font-black tracking-[-0.02em] text-fg sm:text-5xl lg:text-6xl"
              data-reveal="fade-up"
              data-reveal-delay="100"
            >
              {t("sectionTitle")}
            </h2>
            <p
              className="max-w-xs pb-1 text-sm text-muted"
              data-reveal="fade-left"
              data-reveal-delay="200"
            >
              {t("sectionDescription")}
            </p>
          </div>
          <div className="h-px w-16 bg-line2" data-reveal="fade-left" data-reveal-delay="250" />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`theme-card group relative overflow-hidden rounded-xl p-6 ${cat.span}`}
              data-reveal="scale-in"
              data-reveal-delay={`${300 + idx * 100}`}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse at 30% 40%, ${cat.glow} 0%, transparent 70%)` }}
              />

              <div className="absolute right-5 top-5">
                <span className="font-mono text-[10px] tracking-[0.2em] text-line2">{cat.number}</span>
              </div>

              <div className="mb-5 flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: cat.dotColor, boxShadow: `0 0 6px ${cat.dotColor}` }}
                />
                <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted">
                  {cat.label}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span key={tech} className="tech-pill cursor-default rounded-sm px-3 py-1.5 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: `linear-gradient(90deg, ${cat.dotColor}, transparent)` }}
              />
            </div>
          ))}
        </div>

        <div
          className="mt-12 overflow-hidden border-y border-line py-4"
          data-reveal="fade-in"
          data-reveal-delay="800"
        >
          <div className="marquee-track select-none">
            {[...allTechs, ...allTechs].map((tech, i) => (
              <div key={i} className="flex items-center gap-5 px-5">
                <span
                  className="cursor-default whitespace-nowrap text-xs font-medium tracking-[0.2em] uppercase text-muted opacity-40 transition-opacity duration-200 hover:opacity-90"
                >
                  {tech}
                </span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-line2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
