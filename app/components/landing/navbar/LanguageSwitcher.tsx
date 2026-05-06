"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "es" ? "en" : "es";
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggle}
      className="text-xs font-medium tracking-[0.15em] uppercase text-muted transition-colors duration-300 hover:text-fg"
      aria-label={`Switch to ${locale === "es" ? "English" : "Español"}`}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
