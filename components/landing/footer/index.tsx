"use client";

import { useTranslations } from "next-intl";
import ContactHero from "./ContactHero";
import ContactForm, { ContactFormStrings } from "./ContactForm";
import FooterBar from "./FooterBar";
import { useContactForm } from "./useContactForm";

export default function Footer() {
  const t = useTranslations("Footer");
  const { status, handleSubmit } = useContactForm();

  const formStrings: ContactFormStrings = {
    nameLabel: t("form.nameLabel"),
    emailLabel: t("form.emailLabel"),
    messageLabel: t("form.messageLabel"),
    namePlaceholder: t("form.namePlaceholder"),
    emailPlaceholder: t("form.emailPlaceholder"),
    messagePlaceholder: t("form.messagePlaceholder"),
    success: t("form.success"),
    error: t("form.error"),
    processing: t("form.processing"),
    submit: t("form.submit"),
    submitted: t("form.submitted"),
  };

  return (
    <footer id="contacto" className="text-fg flex flex-col">
      <div
        className="w-full flex justify-center py-24 lg:py-40 px-6 lg:px-12"
        data-gsap="footer-section"
      >
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-24">
          <ContactHero
            sectionLabel={t("sectionLabel")}
            headline1={t("headline1")}
            headline2={t("headline2")}
            descriptionPre={t("descriptionPre")}
            descriptionHighlight={t("descriptionHighlight")}
            descriptionPost={t("descriptionPost")}
          />
          <ContactForm status={status} onSubmit={handleSubmit} strings={formStrings} />
        </div>
      </div>
      <FooterBar role={t("footerRole")} copyright={t("copyright")} />
    </footer>
  );
}
