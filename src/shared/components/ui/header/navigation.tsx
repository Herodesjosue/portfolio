import NavLink from "../navlink/NavLink";

const links = [
  { href: "/", label: "Home" },
  { href: "/", label: "About Us" },
  { href: "/", label: "Platform" },
  { href: "/", label: "Contact Us" },
  { href: "/", label: "Newsletter" },
  { href: "/", label: "FAQ" },
];

const Navigation: React.FC = () => {
  return (
    <nav className="flex items-center gap-2.5 font-normal text-primary-500 max-md:hidden text-lg">
      {links.map(({ href, label }) => (
        <NavLink key={label} href={href} label={label} />
      ))}
    </nav>
  );
};

export default Navigation;
