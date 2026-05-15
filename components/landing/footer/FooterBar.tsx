import { EmailIcon, LinkedInIcon, XIcon, GitHubIcon } from "@/components/icons";

interface FooterBarProps {
  role: string;
  copyright: string;
}

export default function FooterBar({ role, copyright }: FooterBarProps) {
  return (
    <div className="w-full border-t border-border bg-bg px-6 lg:px-12 py-8 flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-4">
        <span className="text-sm font-black tracking-widest uppercase">HERODES</span>
        <span className="block h-4 w-px bg-border" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted/60">
          {role}
        </span>
      </div>

      <div className="flex items-center gap-8 font-mono text-[9px] tracking-[0.2em] uppercase text-fg">
        <a
          href="mailto:herodeslugo@gmail.com"
          className="flex items-center gap-2 hover:opacity-60 transition-opacity"
        >
          <EmailIcon className="size-3.5 shrink-0" />
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/herodeslugo/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-60 transition-opacity"
        >
          <LinkedInIcon className="size-3.5 shrink-0" />
          LinkedIn
        </a>
        <a
          href="https://x.com/Josue797AS"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-60 transition-opacity"
        >
          <XIcon className="size-3 shrink-0" />
          X
        </a>
        <a
          href="https://github.com/Herodesjosue"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-60 transition-opacity"
        >
          <GitHubIcon className="size-3.5 shrink-0" />
          GitHub
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
        {copyright}
      </div>
    </div>
  );
}
