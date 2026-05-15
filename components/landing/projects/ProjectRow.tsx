import { ArrowRight } from "@/components/icons";
import { Project } from "./types";

interface ProjectRowProps {
  project: Project;
  isOpen: boolean;
  onClick: () => void;
  onPointerEnter: (e: React.PointerEvent<HTMLDivElement>) => void;
}

export default function ProjectRow({ project, isOpen, onClick, onPointerEnter }: ProjectRowProps) {
  return (
    <div onClick={onClick} onPointerEnter={onPointerEnter} className="group cursor-pointer">
      <div className="h-px w-full bg-white/10" />
      <div className="w-full flex items-center justify-between py-6 lg:py-8 select-none">
        <div className="flex items-center gap-6 lg:gap-10">
          <span
            className="font-mono text-sm lg:text-base tabular-nums transition-colors duration-300"
            style={{ color: isOpen ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }}
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
    </div>
  );
}
