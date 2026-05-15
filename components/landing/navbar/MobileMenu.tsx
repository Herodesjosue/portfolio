import NavLinks from "./NavLinks";
import { NavLink } from "./types";

interface MobileMenuProps {
  open: boolean;
  links: NavLink[];
  onClose: () => void;
}

export default function MobileMenu({ open, links, onClose }: MobileMenuProps) {
  return (
    <div
      className="overflow-hidden  transition-all duration-300 md:hidden border-b border-border"
      style={{ maxHeight: open ? "24rem" : "0", opacity: open ? 1 : 0 }}
    >
      <NavLinks links={links} variant="mobile" onLinkClick={onClose} />
    </div>
  );
}
