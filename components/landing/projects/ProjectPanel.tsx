import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { Project } from "./types";

interface ProjectPanelProps {
  project: Project;
  isOpen: boolean;
  aboutLabel: string;
  responsibilitiesLabel: string;
}

export default function ProjectPanel({ project, isOpen, aboutLabel, responsibilitiesLabel }: ProjectPanelProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.55s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pb-10 lg:pb-14">
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-white/5">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover scale-105 transition-transform duration-1000"
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

          <div className="flex flex-col gap-8 justify-center">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/30">
                {`// ${aboutLabel}`}
              </span>
              <p className="font-mono text-[12px] leading-relaxed tracking-wide text-white/65 lowercase">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/30">
                {`// ${responsibilitiesLabel}`}
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
  );
}
