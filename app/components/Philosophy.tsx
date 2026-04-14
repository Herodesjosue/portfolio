import { useTranslations } from "next-intl";

export default function Philosophy() {
  const t = useTranslations("Philosophy");

  const items = [
    {
      number: "01",
      title: t("card1.title"),
      description: t("card1.description"),
    },
    {
      number: "02",
      title: t("card2.title"),
      description: t("card2.description"),
    },
    {
      number: "03",
      title: t("card3.title"),
      description: t("card3.description"),
    },
  ];

  return (
    <section id="filosofia" className="py-24 lg:py-40 bg-surface2" data-gsap="philosophy-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Headline & Media Placeholder */}
        <div className="flex flex-col lg:w-[45%] gap-12 lg:sticky lg:top-32 h-fit">
          <div className="flex flex-col gap-6" data-reveal="fade-up">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
              {t("sectionLabel")}
            </span>
            <h2 className="text-5xl lg:text-[5rem] leading-[0.85] font-black tracking-tighter text-white uppercase" style={{ wordBreak: 'keep-all' }}>
              {t("sectionTitle") || "THE ETHOS"}
            </h2>
          </div>

          <div 
            className="group relative w-full aspect-[4/5] overflow-hidden mt-8"
            data-reveal="fade-in"
            data-reveal-delay="200"
          >
            {/* Video de fondo */}
            <video
              src="/videos/codigo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover  transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Filtro oscuro sobre el video */}
            {/* <div className="absolute inset-0 bg-[#131414]/90 pointer-events-none" /> */}
            {/* Viñeta suave en bordes */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)' }} />

            {/* Corner Details */}
            <div className="absolute top-4 flex w-full justify-between px-4 font-mono text-[9px] tracking-widest text-white/70 uppercase">
               <span>[REC]</span>
               <span className="animate-pulse text-red-500/70">●</span>
            </div>
            <div className="absolute bottom-4 flex w-full justify-between px-4 font-mono text-[9px] tracking-widest text-white/70 uppercase">
               <span>CODIGO.MP4</span>
               <span>LIVE // AUTOPLAY</span>
            </div>
          </div>
        </div>

        {/* Right Side: Philosophy Items */}
        <div className="flex flex-col lg:w-[55%] justify-end gap-16 lg:py-24 ">
          {items.map((item, i) => (
            <div 
              key={item.number} 
              className="flex flex-col gap-6 group"
              data-reveal="fade-up"
              data-reveal-delay={`${200 + i * 150}`}
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
          ))}
        </div>

      </div>
    </section>
  );
}
