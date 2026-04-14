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
      techs: ["React.js", "Next.js", "Tailwind CSS", "Zustand", "Bootstrap"],
    },
    {
      id: "backend",
      number: "02",
      label: t("categories.backend"),
      techs: ["Node.js", "NestJS", "GraphQL", "Prisma ORM"],
    },
    {
      id: "creative",
      number: "03",
      label: t("categories.creative"),
      techs: ["GSAP", "Three.js", "WebGL"],
    },
    {
      id: "databases",
      number: "04",
      label: t("categories.databases"),
      techs: ["PostgreSQL", "MongoDB", "Supabase"],
    },
    {
      id: "mobile",
      number: "05",
      label: t("categories.mobile"),
      techs: ["React Native"],
    },
  ];

  return (
    <section id="stack" className="py-24 lg:py-40 " data-gsap="stack-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col gap-24 lg:gap-32">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end justify-between" data-reveal="fade-up">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              {t("sectionLabel")}
            </span>
            <h2 className="text-5xl lg:text-[7rem] leading-[0.85] font-black tracking-tighter text-fg uppercase">
              TECH<br />STACK.
            </h2>
          </div>
          <div className="max-w-[320px] lg:mb-4 lg:text-right">
            <p className="font-mono text-xs leading-relaxed text-muted lowercase">
              {t("sectionDescription")}
            </p>
          </div>
        </div>

        {/* Agency-style index list instead of cards */}
        <div className="flex flex-col border-t-2 border-fg">
          {categories.map((cat, idx) => (
            <div 
              key={cat.id} 
              className="group flex flex-col lg:flex-row lg:items-center py-10 lg:py-16 border-b border-border gap-8 hover:bg-fg/5 transition-colors duration-500"
              data-reveal="fade-up"
              data-reveal-delay={`${100 + idx * 100}`}
            >
              <div className="flex items-center gap-12 lg:w-[40%] px-4">
                <span className="font-mono text-2xl lg:text-4xl text-muted/30 group-hover:text-fg transition-colors duration-500">
                  {cat.number}
                </span>
                <h3 className="text-2xl lg:text-3xl font-black tracking-tight uppercase text-fg">
                  {cat.label}
                </h3>
              </div>
              <div className="flex flex-wrap lg:justify-end gap-x-6 gap-y-4 lg:w-[60%] px-4 lg:px-8">
                {cat.techs.map((tech) => (
                  <span 
                    key={tech} 
                    className="font-mono text-[10px] lg:text-xs tracking-widest uppercase text-muted group-hover:text-fg transition-colors duration-500"
                  >
                    [ {tech} ]
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Marquee ticker placed completely at bottom and stripped to raw text */}
      <div 
        className="mt-32 border-y border-border py-6 overflow-hidden bg-bg"
        data-reveal="fade-in"
      >
        <div className="marquee-track select-none flex items-center">
          {[...allTechs, ...allTechs].map((tech, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="font-mono whitespace-nowrap text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-fg">
                {tech}
              </span>
              <span className="text-muted/30 font-mono text-[10px]">//</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
