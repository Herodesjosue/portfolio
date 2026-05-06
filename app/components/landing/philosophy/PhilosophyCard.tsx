import { PhilosophyItem } from "./types";

interface PhilosophyCardProps {
  item: PhilosophyItem;
  delay: number;
}

export default function PhilosophyCard({ item, delay }: PhilosophyCardProps) {
  return (
    <div
      className="flex flex-col gap-6 group"
      data-reveal="fade-up"
      data-reveal-delay={`${delay}`}
    >
      <div className="flex items-baseline gap-6 border-b border-white/20 pb-6">
        <span className="font-mono text-3xl font-regular tracking-tighter text-white/20 transition-colors duration-300 group-hover:text-white">
          {item.number}
        </span>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl lg:text-3xl font-black uppercase text-white tracking-tight">
            {item.title}
          </h3>
          <p className="font-mono text-[11px] leading-relaxed tracking-wider text-white/60 lowercase pr-4">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
