import { useTranslations } from "next-intl";
import { EmailIcon, LinkedInIcon } from "./icons";

interface Contact {
  type: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const contacts: Contact[] = [
  {
    type: "Email",
    label: "herodeslugo@gmail.com",
    href: "mailto:herodeslugo@gmail.com",
    icon: <EmailIcon className="size-5" />,
  },
  {
    type: "LinkedIn",
    label: "/in/herodeslugo",
    href: "https://www.linkedin.com/in/herodeslugo/",
    icon: <LinkedInIcon className="size-5" />,
  },
];

function ContactCard({ contact }: { contact: Contact }) {
  return (
    <a
      href={contact.href}
      target={contact.href.startsWith("http") ? "_blank" : undefined}
      rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="theme-card group flex flex-col items-center gap-3 rounded-xl px-5 py-6"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line2 text-muted transition-all duration-300">
        {contact.icon}
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-muted opacity-50">
          {contact.type}
        </span>
        <span className="text-xs font-medium text-muted transition-colors duration-300">
          {contact.label}
        </span>
      </div>
    </a>
  );
}

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer id="contacto" className="pt-24 lg:pt-32" data-gsap="footer-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 text-center">

          <span className="text-xs font-medium tracking-[0.35em] uppercase text-muted">
            {t("sectionLabel")}
          </span>

          <h2
            className="font-black tracking-[-0.03em] text-fg"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", lineHeight: 0.9 }}
            data-gsap="footer-headline"
          >
            {t("headline1")}
            <br />
            <span className="text-muted">{t("headline2")}</span>
            <br />
            {t("headline3")}
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-muted">
            {t("descriptionPre")}{" "}
            <em className="not-italic font-semibold text-fg">{t("descriptionHighlight")}</em>{" "}
            {t("descriptionPost")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:herodeslugo@gmail.com"
              className="btn-primary inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase"
            >
              <EmailIcon className="size-4" />
              {t("emailButton")}
            </a>
            <a
              href="https://www.linkedin.com/in/herodeslugo/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase"
            >
              <LinkedInIcon className="size-4" />
              {t("linkedinButton")}
            </a>
          </div>

          <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {contacts.map((c) => (
              <ContactCard key={c.type} contact={c} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-line py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-line text-xs font-black text-line2">
              HL
            </div>
            <p className="text-xs tracking-widest text-muted opacity-40">
              {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
