import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen w-full flex-col overflow-hidden px-6 pb-12 pt-28 lg:px-12"
      data-gsap="hero-section"
    >
      {/* Editorial Animated Background */}
      <div className="absolute inset-0 -z-10 h-full w-full  pointer-events-none">
        {/* Animated Grid with fade radial mask so it dissipates at the bottom */}
        <div className="absolute inset-0 grid-pattern animate-grid-pan " />
        {/* SVG Texture Grain Overlay */}
        <div className="absolute inset-0 bg-noise mix-blend-multiply" />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-4">
        <h1
          className="flex flex-col font-black tracking-[-0.04em] uppercase"
          style={{ fontSize: "clamp(4rem, 13vw, 15rem)", lineHeight: 0.85 }}
        >
          <span className="text-fg drop-shadow-sm" data-reveal="fade-up" data-reveal-delay="100">
            CREATIVE
          </span>
          <span 
            className="text-transparent" 
            style={{ WebkitTextStroke: "2px var(--color-fg)" }}
            data-reveal="fade-up" 
            data-reveal-delay="300"
          >
            DEVELOPER
          </span>
        </h1>

        <div 
          className="mt-6 self-start md:self-end md:mr-16 lg:mr-48"
          data-reveal="fade-in"
          data-reveal-delay="600"
        >
          <p className="font-mono text-[10px] leading-relaxed tracking-[0.25em] text-fg/80 uppercase">
            Herodes Lugo <span className="mx-2 opacity-30">/</span> Web Developer
          </p>
        </div>
      </div>

      <div className="mt-16 flex w-full flex-col items-start justify-between gap-12 md:flex-row md:items-end lg:mt-24">
        <div className="flex flex-col gap-6" data-reveal="fade-up" data-reveal-delay="700">
          <p className="font-mono text-[10px] tracking-[0.25em] text-fg uppercase">
            {"// SCALABLE WEB SOLUTIONS."}
          </p>
          <a
            href="#proyectos"
            className="group mt-12 inline-flex items-center gap-3 font-mono text-[10px] font-bold tracking-[0.2em] text-fg transition-opacity hover:opacity-70 uppercase"
          >
            EXPLORE MY WORK
            <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </a>
        </div>

        <div className="max-w-[400px]" data-reveal="fade-up" data-reveal-delay="850">
          <p className="font-mono text-[11px] leading-relaxed tracking-wider text-muted lowercase">
            Full-stack developer and architect driven by a passion for building efficient, secure applications. Expertise in web development, with a focus on performance, immersive experiences, and pushing boundaries in code.
          </p>
        </div>
      </div>
    </section>
  );
}
