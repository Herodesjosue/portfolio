"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Inicio",    href: "#inicio" },
  { label: "Filosofía", href: "#filosofia" },
  { label: "Stack",     href: "#stack" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto",  href: "#contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="backdrop-blur-xl   fixed left-0 right-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-16 lg:h-24 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <a
          href="#inicio"
          className="flex h-9 w-9 items-center justify-center rounded-sm text-sm font-black tracking-tighter transition-all duration-300"
          style={{
            border: "1px solid var(--c-border2)",
            color: "var(--c-fg)",
          }}
          data-gsap="logo"
        >
          HL
        </a>

        {/* Desktop Nav */}
        <nav className="hidden  absolute right-1/2 translate-x-1/2 items-center gap-8 md:flex" data-gsap="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-xs font-medium tracking-[0.15em] uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: CV + theme toggle + hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href="/cv-herodes-lugo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cv hidden rounded-sm px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase md:inline-flex"
            data-gsap="cta-button"
          >
            Descargar CV
          </a>

          {/* Hamburger */}
          <button
            className="flex flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {([
              menuOpen ? { background: "var(--c-fg)", transform: "translateY(8px) rotate(45deg)" } : { background: "var(--c-fg)" },
              menuOpen ? { background: "var(--c-fg)", opacity: 0 } : { background: "var(--c-fg)" },
              menuOpen ? { background: "var(--c-fg)", transform: "translateY(-8px) rotate(-45deg)" } : { background: "var(--c-fg)" },
            ] as React.CSSProperties[]).map((s, i) => (
              <span key={i} className="block h-px w-6 transition-all duration-300" style={s} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="overflow-hidden transition-all duration-300 md:hidden"
        style={{
          maxHeight: menuOpen ? "24rem" : "0",
          opacity: menuOpen ? 1 : 0,
          borderTop: menuOpen ? "1px solid var(--c-border)" : "none",
        }}
      >
        <nav className="flex flex-col px-6 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="nav-link border-b py-4 text-xs font-medium tracking-[0.15em] uppercase"
              style={{ borderColor: "var(--c-border)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/cv-herodes-lugo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cv mt-4 inline-flex items-center justify-center rounded-sm px-4 py-3 text-xs font-medium tracking-[0.15em] uppercase"
          >
            Descargar CV
          </a>
        </nav>
      </div>
    </header>
  );
}
