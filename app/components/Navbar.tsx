"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const hamburgerLines = (open: boolean): React.CSSProperties[] => [
  open ? { transform: "translateY(8px) rotate(45deg)" } : {},
  open ? { opacity: 0 } : {},
  open ? { transform: "translateY(-8px) rotate(-45deg)" } : {},
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("Navbar");

  const navLinks = [
    { label: "01 / HOME",       href: "#inicio" },
    { label: "02 / PHILOSOPHY", href: "#filosofia" },
    { label: "03 / STACK",      href: "#stack" },
    { label: "04 / PROJECTS",   href: "#proyectos" },
    { label: "05 / CONTACT",    href: "#contacto" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full bg-transparent text-fg">
      <div className="mx-auto flex h-20 w-full items-center justify-between px-6 lg:px-12">

        <a
          href="#inicio"
          className="text-base font-black tracking-widest text-fg uppercase"
          data-gsap="logo"
        >
          HERODES
        </a>

        <nav className="absolute right-1/2 hidden translate-x-1/2 items-center gap-10 md:flex" data-gsap="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link font-mono text-[10px] tracking-[0.2em] uppercase text-fg hover:opacity-70">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LanguageSwitcher />

          <button
            className="flex flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {hamburgerLines(menuOpen).map((s, i) => (
              <span key={i} className="block h-px w-6 bg-fg transition-all duration-300" style={s} />
            ))}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden bg-surface transition-all duration-300 md:hidden border-b border-border`}
        style={{ maxHeight: menuOpen ? "24rem" : "0", opacity: menuOpen ? 1 : 0 }}
      >
        <nav className="flex flex-col px-6 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border py-4 font-mono text-[10px] tracking-[0.2em] uppercase text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
