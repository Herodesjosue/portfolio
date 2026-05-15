"use client";

import { useTranslations } from "next-intl";
import TechCategoryRow from "./TechCategoryRow";
import TechMarquee from "./TechMarquee";
import { categoryBase } from "./data";
import { TechCategory } from "./types";

export default function TechStack() {
  const t = useTranslations("TechStack");

  const categories: TechCategory[] = categoryBase.map((cat) => ({
    ...cat,
    label: t(`categories.${cat.id}`),
  }));

  return (
    <section id="stack" className="py-24 lg:py-40" data-gsap="stack-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col gap-24 lg:gap-32">
        <div
          className="flex flex-col gap-8 lg:flex-row lg:items-end justify-between"
          data-reveal="fade-up"
        >
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              {t("sectionLabel")}
            </span>
            <h2 className="text-5xl lg:text-[7rem] leading-[0.85] font-black tracking-tighter text-fg uppercase">
              TECH
              <br />
              STACK.
            </h2>
          </div>
          <div className="max-w-[320px] lg:mb-4 lg:text-right">
            <p className="font-mono text-xs leading-relaxed text-muted lowercase">
              {t("sectionDescription")}
            </p>
          </div>
        </div>

        <div className="flex flex-col border-t-2 border-fg">
          {categories.map((cat, idx) => (
            <TechCategoryRow key={cat.id} category={cat} index={idx} />
          ))}
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
