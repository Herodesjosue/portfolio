"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "./icons";
import QuantumCloudLoader from "@/app/components/QuantumCloudLoader";

interface Project {
  id: string;
  number: string;
  title: string;
  industry: string;
  description: string;
  responsibilities: string[];
  websiteUrl: string;
  websiteLabel: string;
  image: string;
}

const projectsMeta = [
  {
    id: "sozialens",
    number: "01",
    title: "SOZIALENS",
    websiteUrl: "",
    websiteLabel: "SOZIALENS",
    image: "/images/projects/sozialens-hero.webp",
  },
  {
    id: "nest",
    number: "02",
    title: "NEST",
    websiteUrl: "",
    websiteLabel: "NEST",
    image: "/images/projects/nest-hero.webp",
  },
  {
    id: "garbo",
    number: "03",
    title: "GARBO",
    websiteUrl: "",
    websiteLabel: "GARBO",
    image: "/images/projects/garbo-hero.webp",
  },
  {
    id: "fenix",
    number: "04",
    title: "FENIX",
    websiteUrl: "https://www.fenixfinance.io/",
    websiteLabel: "FENIX FINANCE",
    image: "/images/projects/fenix-hero.webp",
  },
  {
    id: "intentx",
    number: "05",
    title: "INTENTX",
    websiteUrl: "https://intentx.io/",
    websiteLabel: "INTENTX",
    image: "/images/projects/intentx-hero.webp",
  },
];

export default function Projects() {
  const t = useTranslations("Projects");
  // Primer proyecto abierto por defecto
  const [activeId, setActiveId] = useState<string | null>("sozialens");

  const projects: Project[] = projectsMeta.map((meta) => ({
    ...meta,
    industry: t(`${meta.id}.industry`),
    description: t(`${meta.id}.description`),
    responsibilities: t.raw(`${meta.id}.responsibilities`) as string[],
  }));

  return (
    <section
      id="proyectos"
      className="relative"
      data-gsap="projects-section"
    >
      <QuantumCloudLoader />
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 lg:pt-40 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex flex-col gap-4">
          <span
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50"
            data-reveal="fade-in"
          >
            {t("sectionLabel")}
          </span>
          <h2
            className="text-5xl lg:text-[6.5rem] leading-[0.85] font-black tracking-tighter text-white uppercase"
            data-reveal="fade-up"
          >
            SELECTED
            <br />
            WORKS.
          </h2>
        </div>
        <div
          className="md:w-1/3 lg:pb-2"
          data-reveal="fade-up"
          data-reveal-delay="200"
        >
          <p className="font-mono text-[11px] leading-relaxed text-white/50 lowercase">
            {t("sectionDescription")}
          </p>
        </div>
      </div>

      {/* ── Accordion List ───────────────────────────────────── */}
      {/* onMouseLeave en el wrapper: cierra al salir de la lista completa */}
      <div
        className="mx-auto max-w-7xl px-6 lg:px-12 pb-24 lg:pb-40"
        onMouseLeave={() => setActiveId("sozialens")}
      >
        {projects.map((project, i) => {
          const isOpen = activeId === project.id;

          return (
            <div
              key={project.id}
              onMouseEnter={() => setActiveId(project.id)}
              data-reveal="fade-up"
              data-reveal-delay={`${i * 80}`}
            >
              {/* Separador */}
              <div className="h-px w-full bg-white/10" />

              {/* Fila del proyecto — solo número + nombre */}
              <div className="w-full flex items-center justify-between py-6 lg:py-8 cursor-default select-none">
                <div className="flex items-center gap-6 lg:gap-10">
                  <span
                    className="font-mono text-sm lg:text-base tabular-nums transition-colors duration-300"
                    style={{
                      color: isOpen
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(255,255,255,0.2)",
                    }}
                  >
                    {project.number}
                  </span>
                  <h3
                    className="font-black uppercase tracking-tighter transition-opacity duration-300"
                    style={{
                      fontSize: "clamp(2rem, 5vw, 4.5rem)",
                      lineHeight: 1,
                      color: isOpen ? "#ffffff" : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Indicador de industria + flecha */}
                <div className="flex items-center gap-4 shrink-0">
                  <span
                    className="hidden md:block font-mono text-[10px] tracking-widest uppercase text-white/30 transition-opacity duration-300"
                    style={{ opacity: isOpen ? 1 : 0 }}
                  >
                    {project.industry}
                  </span>
                  <span
                    className="text-white/30 transition-all duration-400"
                    style={{
                      opacity: isOpen ? 1 : 0.3,
                      transform: isOpen ? "translateX(4px)" : "translateX(0)",
                    }}
                    aria-hidden="true"
                  >
                    <ArrowRight className="size-5" />
                  </span>
                </div>
              </div>

              {/* ── Panel expandido (hover-open) ─────────────── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition:
                    "grid-template-rows 0.55s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pb-10 lg:pb-14">
                    {/* Imagen */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-white/5">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover  scale-105 transition-transform duration-1000"
                        sizes="(max-width: 1024px) 90vw, 45vw"
                      />
                      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                      {project.websiteUrl && (
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[9px] tracking-widest uppercase text-white/70 border border-white/20 px-4 py-2 backdrop-blur-sm hover:bg-white/10 transition-colors duration-200"
                        >
                          <ArrowRight className="size-3" />
                          {project.websiteLabel}
                        </a>
                      )}
                    </div>

                    {/* Detalles */}
                    <div className="flex flex-col gap-8 justify-center">
                      {/* Descripción */}
                      <div className="flex flex-col gap-3">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-white/30">
                          {"// About"}
                        </span>
                        <p className="font-mono text-[12px] leading-relaxed tracking-wide text-white/65 lowercase">
                          {project.description}
                        </p>
                      </div>

                      {/* Responsabilidades */}
                      <div className="flex flex-col gap-3">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-white/30">
                          {"// Responsibilities"}
                        </span>
                        <ul className="flex flex-col gap-2">
                          {project.responsibilities.map((r, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-3 font-mono text-[11px] tracking-wide text-white/60 lowercase"
                            >
                              <span className="mt-[6px] shrink-0 h-px w-3 bg-white/25" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Borde final */}
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
