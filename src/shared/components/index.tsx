"use client";
import Link from "next/link";
import { useSectionStore } from "@/shared/store/useSectionStore";
import Logo from "./ui/icon/Logo";
const NAV_ITEMS = ["Home", "About", "Services", "Portfolio"];

const Header: React.FC = () => {
  const { activeIndex, sectionCount } = useSectionStore();
  const lastIndex = NAV_ITEMS.length - 1;
  const highlightedIndex = sectionCount ? Math.min(activeIndex, lastIndex) : -1;
  const isFirstSection = activeIndex === 0;

  return (
    <header className={`fixed right-0 left-0 h-20 min-h-20 max-h-20 top-10 px-20 z-50 transition-all  ${isFirstSection ? "border-b-0 border-transparent " : "" } border-white/25 ` }>
      <div className="relative  w-full flex items-center">
        <div className="flex gap-5 w-full items-center relative">
          <Logo  className="w-[4.25rem] h-[3.625rem] max-w-[4.25rem] max-h-[3.625rem]" />
          <div
            className={`transition-opacity duration-300 ease-out h-px w-full bg-white/40 mr-16 ${
              isFirstSection ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        </div>

        <div className="flex items-center gap-10">
          <nav>
            <ul className="flex space-x-8 text-xl font-light">
              {NAV_ITEMS.map((label, idx) => (
                <li
                  key={label}
                  className={`transition-colors ${
                    highlightedIndex === idx
                      ? "text-primary-100"
                      : "text-white/60"
                  }`}
                >
                  <Link href="">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-6">
            <div className="whitespace-nowrap text-5xl text-primary-100">
              BOOK A CALL
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
