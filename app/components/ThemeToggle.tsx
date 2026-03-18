"use client";

import { useTheme } from "../context/ThemeContext";
import { useTranslations } from "next-intl";
import { SunIcon, MoonIcon } from "./icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("ThemeToggle");

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t("activateLight") : t("activateDark")}
      className="flex h-8 w-8 items-center justify-center rounded-sm border border-line2 text-muted transition-all duration-300"
    >
      {theme === "dark" ? (
        <SunIcon className="size-3.5" />
      ) : (
        <MoonIcon className="size-3.5" />
      )}
    </button>
  );
}
