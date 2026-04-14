"use client";

import { useTranslations } from "next-intl";
import { EmailIcon, LinkedInIcon } from "./icons";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer id="contacto" className=" text-fg flex flex-col">
      
      {/* ── Contact Agency Section ──────────────────────────────── */}
      <div className="w-full flex justify-center py-24 lg:py-40 px-6 lg:px-12" data-gsap="footer-section">
        
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Typography & Intro */}
          <div className="flex flex-col gap-8 lg:w-1/2 lg:sticky lg:top-40 h-fit" data-reveal="fade-up">
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted">
              {t("sectionLabel")}
            </span>
            <h2 
              className="font-black tracking-tighter uppercase leading-[0.85]" 
              style={{ fontSize: "clamp(3.5rem, 7vw, 7.5rem)" }}
            >
              LET'S BUILD
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px var(--color-fg)" }}>
                THE FUTURE.
              </span>
            </h2>
            <p className="max-w-md font-mono text-[11px] leading-relaxed text-muted lowercase mt-4">
              {t("descriptionPre")}{" "}
              <strong className="text-fg font-black uppercase">{t("descriptionHighlight")}</strong>{" "}
              {t("descriptionPost")}
            </p>
          </div>

          {/* Right: Contact Form */}
          <div className="flex flex-col lg:w-1/2 justify-center lg:pl-12" data-reveal="fade-up" data-reveal-delay="200">
             <form 
                className="flex flex-col gap-12 w-full max-w-lg" 
                onSubmit={(e) => { e.preventDefault(); window.location.href="mailto:herodeslugo@gmail.com"; }}
             >
                <div className="flex flex-col gap-2 group">
                   <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted group-focus-within:text-fg transition-colors">
                      01 // Name
                   </label>
                   <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-fg/20 py-4 font-black uppercase text-2xl lg:text-3xl text-fg focus:outline-none focus:border-fg transition-colors placeholder:text-fg/10" 
                      placeholder="JOHN DOE" 
                   />
                </div>
                
                <div className="flex flex-col gap-2 group">
                   <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted group-focus-within:text-fg transition-colors">
                      02 // Email
                   </label>
                   <input 
                      type="email" 
                      required
                      className="w-full bg-transparent border-b border-fg/20 py-4 font-black uppercase text-2xl lg:text-3xl text-fg focus:outline-none focus:border-fg transition-colors placeholder:text-fg/10" 
                      placeholder="HELLO@DOMAIN.COM" 
                   />
                </div>
                
                <div className="flex flex-col gap-2 group">
                   <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted group-focus-within:text-fg transition-colors">
                      03 // Message
                   </label>
                   <textarea 
                      required
                      rows={1}
                      onInput={(e) => {
                         e.currentTarget.style.height = 'auto';
                         e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                      }}
                      className="w-full bg-transparent border-b border-fg/20 py-4 font-black uppercase text-xl lg:text-2xl text-fg focus:outline-none focus:border-fg transition-colors resize-none overflow-hidden placeholder:text-fg/10" 
                      placeholder="TELL ME ABOUT YOUR PROJECT..." 
                   />
                </div>

                <div className="mt-12 w-full flex justify-start lg:justify-end">
                   <button 
                      type="submit" 
                      className="group relative inline-flex w-full sm:w-auto items-center justify-center px-12 py-6 lg:px-20 lg:py-8 bg-cta text-white transition-transform duration-500 hover:scale-105 overflow-visible"
                   >
                      <div className="absolute inset-0 border border-cta animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                      <div className="absolute inset-0 border border-cta opacity-20 group-hover:scale-y-125 group-hover:scale-x-105 group-hover:opacity-0 transition-all duration-700" />
                      
                      {/* Enforcing z-index to ensure text is above the absolute overlays and clearly white */}
                      <span className="relative z-10 font-mono text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-4">
                        Start Project
                        <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </span>
                   </button>
                </div>
             </form>
          </div>
          
        </div>
      </div>

      {/* ── Actual Footer Bar ──────────────────────────────────── */}
      <div className="w-full border-t border-border bg-bg px-6 lg:px-12 py-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-black tracking-widest uppercase">HERODES.IO</span>
          <span className="block h-4 w-px bg-border" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted/60">
             Creative Developer
          </span>
        </div>
        
        {/* Middle: Links */}
        <div className="flex items-center gap-8 font-mono text-[9px] tracking-[0.2em] uppercase text-fg">
            <a href="mailto:herodeslugo@gmail.com" className="hover:opacity-60 transition-opacity">
               Email
            </a>
            <a href="https://www.linkedin.com/in/herodeslugo/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
               LinkedIn
            </a>
            <a href="/pdf/herodes-lugo-cv.pdf" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity text-muted">
               Curriculum
            </a>
        </div>

        {/* Right: Copyright */}
        <div className="font-mono text-[9px] uppercase tracking-widest text-muted/40">
           © {new Date().getFullYear()} ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
