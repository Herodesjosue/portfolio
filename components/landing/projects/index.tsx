"use client";

import { useTranslations } from "next-intl";
import QuantumCloudLoader from "./QuantumCloudLoader";
import ProjectRow from "./ProjectRow";
import ProjectPanel from "./ProjectPanel";
import { useProjects } from "./useProjects";
import { projectsMeta } from "./data";
import { Project } from "./types";

export default function Projects() {
  const t = useTranslations("Projects");
  const { activeId, setActiveId, reset } = useProjects("sozialens");

  const projects: Project[] = projectsMeta.map((meta) => ({
    ...meta,
    industry: t(`${meta.id}.industry`),
    description: t(`${meta.id}.description`),
    responsibilities: t.raw(`${meta.id}.responsibilities`) as string[],
  }));

  return (
    <section id="proyectos" className="relative  overflow-hidden" data-gsap="projects-section">
      <QuantumCloudLoader />

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
            {t("headlineA")}
            <br />
            {t("headlineB")}
          </h2>
        </div>
        <div className="md:w-1/3 lg:pb-2" data-reveal="fade-up" data-reveal-delay="200">
          <p className="font-mono text-[11px] leading-relaxed text-white/50 lowercase">
            {t("sectionDescription")}
          </p>
        </div>
      </div>

      <div
        className="mx-auto max-w-7xl px-6 lg:px-12 pb-24 lg:pb-40"
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") reset();
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            data-reveal="fade-up"
            data-reveal-delay={`${i * 80}`}
          >
            <ProjectRow
              project={project}
              isOpen={activeId === project.id}
              onClick={() => setActiveId(activeId === project.id ? null : project.id)}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActiveId(project.id);
              }}
            />
            <ProjectPanel
              project={project}
              isOpen={activeId === project.id}
              aboutLabel={t("aboutLabel")}
              responsibilitiesLabel={t("responsibilitiesLabel")}
            />
          </div>
        ))}
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
