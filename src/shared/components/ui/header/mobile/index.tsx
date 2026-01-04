import { useRef, useState } from "react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import HamburgerButton from "./HamburgerButton";
import Overlay from "./Overlay";
import SidebarMenu from "./SidebarMenu";

const MobileHeader: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useClickOutside(buttonRef, () => setIsOpen(false));

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="md:hidden h-full flex items-center  relative">
      <HamburgerButton onClick={handleToggle} buttonRef={buttonRef} />
      <Overlay isOpen={isOpen} onClick={handleClose} />
      <SidebarMenu isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default MobileHeader;
