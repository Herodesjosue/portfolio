"use client";

import { useTranslations } from "next-intl";
import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import FooterBar from "./FooterBar";
import { useContactForm } from "./useContactForm";

export default function Footer() {
  const t = useTranslations("Footer");
  const { status, handleSubmit } = useContactForm();

  return (
    <footer id="contacto" className="text-fg flex flex-col">
      <div
        className="w-full flex justify-center py-24 lg:py-40 px-6 lg:px-12"
        data-gsap="footer-section"
      >
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-24">
          <ContactHero
            sectionLabel={t("sectionLabel")}
            descriptionPre={t("descriptionPre")}
            descriptionHighlight={t("descriptionHighlight")}
            descriptionPost={t("descriptionPost")}
          />
          <ContactForm status={status} onSubmit={handleSubmit} />
        </div>
      </div>
      <FooterBar />
    </footer>
  );
}
