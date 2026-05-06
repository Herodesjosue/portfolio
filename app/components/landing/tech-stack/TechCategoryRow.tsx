import { TechCategory } from "./types";

interface TechCategoryRowProps {
  category: TechCategory;
  index: number;
}

export default function TechCategoryRow({ category, index }: TechCategoryRowProps) {
  return (
    <div
      className="group flex flex-col lg:flex-row lg:items-center py-10 lg:py-16 border-b border-border gap-8 hover:bg-fg/5 transition-colors duration-500"
      data-reveal="fade-up"
      data-reveal-delay={`${100 + index * 100}`}
    >
      <div className="flex items-center gap-12 lg:w-[40%] px-4">
        <span className="font-mono text-2xl lg:text-4xl text-muted/30 group-hover:text-fg transition-colors duration-500">
          {category.number}
        </span>
        <h3 className="text-2xl lg:text-3xl font-black tracking-tight uppercase text-fg">
          {category.label}
        </h3>
      </div>
      <div className="flex flex-wrap lg:justify-end gap-x-6 gap-y-4 lg:w-[60%] px-4 lg:px-8">
        {category.techs.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] lg:text-xs tracking-widest uppercase text-muted group-hover:text-fg transition-colors duration-500"
          >
            [ {tech} ]
          </span>
        ))}
      </div>
    </div>
  );
}
