import { useTranslations } from "next-intl";
import CodeTerminal from "./CodeTerminal";
import PhilosophyCard from "./PhilosophyCard";
import { PhilosophyItem } from "./types";

export default function Philosophy() {
  const t = useTranslations("Philosophy");

  const items: PhilosophyItem[] = [
    { number: "01", title: t("card1.title"), description: t("card1.description") },
    { number: "02", title: t("card2.title"), description: t("card2.description") },
    { number: "03", title: t("card3.title"), description: t("card3.description") },
  ];

  return (
    <section id="filosofia" className="py-24 lg:py-40 bg-surface2" data-gsap="philosophy-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="flex flex-col lg:w-[45%] gap-12 lg:sticky lg:top-32 h-fit">
          <div className="flex flex-col gap-6" data-reveal="fade-up">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
              {t("sectionLabel")}
            </span>
            <h2
              className="text-5xl lg:text-[5rem] leading-[0.85] font-black tracking-tighter text-white uppercase"
              style={{ wordBreak: "keep-all" }}
            >
              {t("sectionTitle") || "THE ETHOS"}
            </h2>
          </div>

          <div
            className="w-full aspect-[4/5] overflow-hidden mt-8 border border-white/[0.08]"
            data-reveal="fade-in"
            data-reveal-delay="200"
          >
            <CodeTerminal />
          </div>
        </div>

        <div className="flex flex-col lg:w-[55%] justify-end gap-16 lg:py-24">
          {items.map((item, i) => (
            <PhilosophyCard key={item.number} item={item} delay={200 + i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
