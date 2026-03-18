import { useTranslations } from "next-intl";
import { ArrowRight } from "./icons";

export default function Philosophy() {
  const t = useTranslations("Philosophy");

  const cards = [
    {
      emoji: "✦",
      title: t("card1.title"),
      description: t("card1.description"),
      tag: t("card1.tag"),
    },
    {
      emoji: "⚡",
      title: t("card2.title"),
      description: t("card2.description"),
      tag: t("card2.tag"),
    },
    {
      emoji: "◈",
      title: t("card3.title"),
      description: t("card3.description"),
      tag: t("card3.tag"),
    },
  ];

  return (
    <section id="filosofia" className=" lg:py-0" data-gsap="philosophy-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-16 flex flex-col gap-4" data-gsap="philosophy-header">
          <span className="text-xs font-medium tracking-[0.35em] uppercase text-muted">
            {t("sectionLabel")}
          </span>
          <h2 className="text-4xl font-black tracking-[-0.02em] text-fg sm:text-5xl lg:text-6xl">
            {t("sectionTitle")}
          </h2>
          <div className="h-px w-16 bg-line2" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" data-gsap="philosophy-cards">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="theme-card group flex h-full flex-col justify-between gap-8 rounded-xl p-8"
              data-gsap={`philosophy-card-${i}`}
            >
              <div className="flex flex-col gap-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line2 text-lg text-fg transition-all duration-300">
                  {card.emoji}
                </div>
                <h3 className="text-xl font-bold leading-tight tracking-tight text-fg">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {card.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted opacity-50">
                  {card.tag}
                </span>
                <div className="mx-4 h-px flex-1 bg-line" />
                <ArrowRight className="h-3 w-3 text-line2 transition-all duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
