import Image from "next/image";
import Button from "../../button";
import NestLogo from "../../icon/Logo";
import SidebarLink from "./SidebarLink";

const SidebarMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className={`bg-base-100 fixed z-50  duration-700 transition-transform sidebar-mobile right-0 h-screen bottom-0 top-0 w-full  py-4  justify-between flex flex-col  ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="flex flex-col gap-6 pt-10 ">
      <div className="flex items-center justify-between border-b  pb-14 border-b-primary-600 px-5 relative">
        <NestLogo className="w-max" />
        <button onClick={onClose} aria-label="Close menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 4L4 20M20 20L4 4"
              stroke="#005B55"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </button>
        <Image
          src="/images/polygon.svg"
          alt=""
          height={26}
          width={26}
          className="absolute -rotate-90 -left-1 -bottom-3 "
        />

        <Image
          src="/images/bar-decorator.svg"
          alt=""
          height={49}
          width={49}
          className="absolute -bottom-0.5 -right-0.5 "
        />
      </div>

      <nav className="flex flex-col  px-5">
        <SidebarLink href="">Home</SidebarLink>
        <SidebarLink href="">About</SidebarLink>
        <SidebarLink href="">Platform</SidebarLink>
        <SidebarLink href="">Cases Use</SidebarLink>
      </nav>
    </div>

    <div className="px-5 w-full flex flex-col gap-16">
      <Button className="w-full text-sm" size="lg">
        Get Started
      </Button>
      <div className="flex items-center justify-between px-5 text-xs text-primary-600">
        <span>Platform</span>
        <span>Resources</span>
        <span>Institutional Contact</span>
      </div>
    </div>
  </div>
);

export default SidebarMenu;
