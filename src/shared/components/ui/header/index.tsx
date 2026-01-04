"use client";
import Link from "next/link";
import Logo from "../icon/Logo";
import { useSectionStore } from "@/shared/store/useSectionStore";
import { useThemeStore } from "@/shared/store/useThemeStore";
const NAV_ITEMS = ["Home", "About", "Services", "Portfolio"];

const Header: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { activeIndex, sectionCount } = useSectionStore();

  const lastIndex = NAV_ITEMS.length - 1;
  const highlightedIndex = sectionCount ? Math.min(activeIndex, lastIndex) : -1;
  const isFirstSection = activeIndex === 0;

  return (
    <header
      className={`fixed right-0 left-0 h-20 top-10 px-20 z-50 box-border transition-colors duration-300 ${
        isFirstSection ? "border-transparent" : "border-white/25 border-b"
      }`}
    >
      <div className="relative w-full flex items-center">
        <div className="flex gap-5 w-full items-center relative">
          <div className="w-[4.25rem] h-[3.625rem]">

          </div>
          {/* <Logo className="w-[4.25rem] h-[3.625rem] max-w-[4.25rem] max-h-[3.625rem]" /> */}
          <div
            className={`h-px w-full ${isDarkMode ? "bg-white/40" : "bg-dark/25"} mr-16 transition-opacity duration-300 ease-out ${
              isFirstSection ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        </div>

        <div className="flex items-center gap-10">
          {/* <nav>
            <ul className="flex space-x-8 text-xl font-light">
              {NAV_ITEMS.map((label, idx) => (
                <li
                  key={label}
                  className={`transition-colors duration-300
                    
                    
                    ${
                      isDarkMode && highlightedIndex === idx
                        ? "text-primary-100"
                        : isDarkMode 
                        ? "text-white/60"
                        : "text-dark"
                    }`}
                >
                  <Link href="">{label}</Link>
                </li>
              ))}
            </ul>
          </nav> */}
          <div className="flex items-center gap-6">
            <div className={`whitespace-nowrap uppercase text-5xl ${isDarkMode ? "text-slate-200" : "text-dark"}`}>
              linkedin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
