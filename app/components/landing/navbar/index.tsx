"use client";

import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import HamburgerButton from "./HamburgerButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNavbar } from "./useNavbar";
import { navLinks } from "./data";

export default function Navbar() {
  const { menuOpen, toggle, close } = useNavbar();

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

        <NavLinks links={navLinks} variant="desktop" />

        <div className="flex items-center gap-5">
          <LanguageSwitcher />
          <HamburgerButton open={menuOpen} onClick={toggle} />
        </div>
      </div>

      <MobileMenu open={menuOpen} links={navLinks} onClose={close} />
    </header>
  );
}
