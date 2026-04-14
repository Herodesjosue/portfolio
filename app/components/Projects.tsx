"use client"

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight } from "./icons";

interface Stat { value: string; label: string }

interface ProjectMeta {
  id: string;
  number: string;
  title: string;
  stats: Stat[];
  websiteUrl: string;
  websiteLabel: string;
  image: string;
}

interface Project extends ProjectMeta {
  industry: string;
  description: string;
  responsibilities: string[];
}

const projectsMeta: ProjectMeta[] = [
  {
    id: "sozialens",
    number: "01",
    title: "SOZIALENS",
    stats: [
      { value: "+250K", label: "INV. CAPTURED" },
      { value: "+1K",   label: "CLIENTS" },
    ],
    websiteUrl: "",
    websiteLabel: "SOZIALENS",
    image: "/images/projects/sozialens-hero.webp",
  },
  {
    id: "nest",
    number: "02",
    title: "NEST",
    stats: [
      { value: "+25K", label: "USERS" },
      { value: "$250M", label: "TVL" },
    ],
    websiteUrl: "",
    websiteLabel: "NEST",
    image: "/images/projects/nest-hero.webp",
  },
  {
    id: "garbo",
    number: "03",
    title: "GARBO",
    stats: [
      { value: "$310B", label: "MARKET SHARE" },
      { value: "$8T",   label: "MARKET WORTH" },
    ],
    websiteUrl: "",
    websiteLabel: "GARBO",
    image: "/images/projects/garbo-hero.webp",
  },
  {
    id: "fenix",
    number: "04",
    title: "FENIX",
    stats: [
      { value: "+$1.7B", label: "TRADE VOLUME" },
      { value: "+5K",    label: "USERS" },
    ],
    websiteUrl: "https://www.fenixfinance.io/",
    websiteLabel: "FENIX FINANCE",
    image: "/images/projects/fenix-hero.webp",
  },
  {
    id: "intentx",
    number: "05",
    title: "INTENTX",
    stats: [
      { value: "+$1.7B", label: "TRADE VOLUME" },
      { value: "$20M",   label: "OPEN INTEREST" },
    ],
    websiteUrl: "https://intentx.io/",
    websiteLabel: "INTENTX",
    image: "/images/projects/intentx-hero.webp",
  },
];

/* ── Agency Carousel Section ──────────────────────────────────────── */

export default function Projects() {
  const t = useTranslations("Projects");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current || !trackRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;
      
      if (scrolled >= 0 && scrolled <= scrollableDistance) {
        const percentage = scrolled / scrollableDistance;
        const trackWidth = trackRef.current.scrollWidth - window.innerWidth;
        trackRef.current.style.transform = `translate3d(-${percentage * trackWidth}px, 0, 0)`;
      } else if (scrolled < 0) {
        trackRef.current.style.transform = `translate3d(0px, 0, 0)`;
      } else if (scrolled > scrollableDistance) {
        const trackWidth = trackRef.current.scrollWidth - window.innerWidth;
        trackRef.current.style.transform = `translate3d(-${trackWidth}px, 0, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects: Project[] = projectsMeta.map((meta) => ({
    ...meta,
    industry: t(`${meta.id}.industry`),
    description: t(`${meta.id}.description`),
    responsibilities: t.raw(`${meta.id}.responsibilities`) as string[],
  }));

  return (
    // We added extra 50vh to h-[450vh] so the final item has a bit more "delay" before unpinning, making it softer
    <section id="proyectos" className="relative h-[450vh] bg-[#E8E4DB]" ref={containerRef}>
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-24 lg:pt-32 pb-12" ref={stickyRef}>
        
        {/* Header layer */}
        <div className="w-full flex flex-col md:flex-row lg:items-end justify-between px-6 lg:px-12 gap-8 shrink-0">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted" data-reveal="fade-in">
              {t("sectionLabel")}
            </span>
            <h2 className="text-5xl lg:text-[6.5rem] leading-[0.85] font-black tracking-tighter text-fg uppercase" data-reveal="fade-up">
              SELECTED<br/>WORKS.
            </h2>
          </div>
          <div className="md:w-1/3 lg:pb-4" data-reveal="fade-up" data-reveal-delay="200">
            <p className="font-mono text-[11px] leading-relaxed text-muted lowercase">
              {t("sectionDescription")}
            </p>
          </div>
        </div>

        {/* Floating instruction */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 font-mono text-[9px] uppercase tracking-[0.3em] text-muted animate-pulse">
            SCROLL TO VIEW GALLERY ↓
        </div>

        {/* Carousel Track */}
        <div className="flex-1 w-full flex items-center mt-8 lg:mt-12 overflow-hidden" data-reveal="fade-in" data-reveal-delay="400">
          <div className="flex w-max items-center h-full px-6 lg:px-12 gap-12 lg:gap-16 will-change-transform" ref={trackRef}>
              
              {projects.map((project) => (
                  <article key={project.id} className="relative flex-none w-[85vw] md:w-[60vw] lg:w-[40vw] h-[60vh] lg:h-[65vh] group flex flex-col gap-6">
                      {/* Image Container */}
                      <div className="relative w-full flex-1 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 bg-border">
                          <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
                              sizes="(max-width: 1024px) 85vw, 40vw"
                          />
                          <div className="absolute inset-0 bg-fg/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-1000" />
                          
                          {/* Interactive UI element */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                               <a 
                                  href={project.websiteUrl || "#"} 
                                  target={project.websiteUrl ? "_blank" : undefined}
                                  rel={project.websiteUrl ? "noopener noreferrer" : undefined}
                                  className="w-24 h-24 rounded-full backdrop-blur-md bg-surface/20 border border-surface/50 flex flex-col items-center justify-center text-surface font-mono text-[9px] tracking-widest uppercase hover:scale-110 transition-transform duration-300"
                               >
                                  <ArrowRight className="size-4 mb-2" />
                                  {t("visitLabel")}
                               </a>
                          </div>
                      </div>

                      {/* Metadata below image */}
                      <div className="w-full flex justify-between items-start shrink-0">
                          <div className="flex flex-col gap-2">
                              <span className="font-mono text-3xl font-light text-muted">
                                  {project.number}
                              </span>
                              <h3 className="text-2xl lg:text-3xl font-black uppercase text-fg tracking-tighter">
                                  {project.title}
                              </h3>
                              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">
                                  {project.industry}
                              </span>
                          </div>
                          
                          <div className="flex gap-6 text-right">
                              {project.stats.map(s => (
                                  <div key={s.label} className="flex flex-col gap-1">
                                      <span className="font-black text-fg text-sm">{s.value}</span>
                                      <span className="font-mono text-[8px] uppercase tracking-widest text-muted/60">{s.label}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </article>
              ))}

              {/* Spacer at the end so last card leaves room */}
              <div className="w-[10vw] flex-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
