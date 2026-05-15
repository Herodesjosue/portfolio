export default function FooterBar() {
  return (
    <div className="w-full border-t border-border bg-bg px-6 lg:px-12 py-8 flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-4">
        <span className="text-sm font-black tracking-widest uppercase">HERODES</span>
        <span className="block h-4 w-px bg-border" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted/60">
          Creative Developer
        </span>
      </div>

      <div className="flex items-center gap-8 font-mono text-[9px] tracking-[0.2em] uppercase text-fg">
        <a href="mailto:herodeslugo@gmail.com" className="hover:opacity-60 transition-opacity">
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/herodeslugo/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity"
        >
          LinkedIn
        </a>
        {/* <a
          href="/pdf/herodes-lugo-cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity text-muted"
        >
          Curriculum
        </a> */}
      </div>

      <div className="font-mono text-[9px] uppercase tracking-widest text-muted/40">
        © {new Date().getFullYear()} ALL RIGHTS RESERVED.
      </div>
    </div>
  );
}
