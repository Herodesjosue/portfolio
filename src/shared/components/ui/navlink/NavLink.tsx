import Link from "next/link";
import { NavLinkProps } from "./types";

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => (
  <Link
    className="px-6 py-2 transition-colors hover:text-primary-100"
    href={href}
  >
    {label}
  </Link>
);

export default NavLink;
