import Link from "next/link";

const SidebarLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    className="text-primary-500 transition-colors hover:bg-primary-200/10 w-full font-light text-2xl h-fit py-6"
  >
    {children}
  </Link>
);

export default SidebarLink;