import { allTechs } from "./data";

export default function TechMarquee() {
  return (
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
            <span className="text-muted/30 font-mono text-[10px]">{"//"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
