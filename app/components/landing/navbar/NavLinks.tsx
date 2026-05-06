import { NavLink } from "./types";

interface NavLinksProps {
  links: NavLink[];
  variant: "desktop" | "mobile";
  onLinkClick?: () => void;
}

export default function NavLinks({ links, variant, onLinkClick }: NavLinksProps) {
  if (variant === "desktop") {
    return (
      <nav
        className="absolute right-1/2 hidden translate-x-1/2 items-center gap-10 md:flex"
        data-gsap="nav-links"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link font-mono text-[10px] tracking-[0.2em] uppercase text-fg hover:opacity-70"
          >
            {link.label}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col px-6 pb-4 pt-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className="border-b border-border py-4 font-mono text-[10px] tracking-[0.2em] uppercase text-fg"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
