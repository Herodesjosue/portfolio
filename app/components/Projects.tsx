import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "./icons";

interface Stat { value: string; label: string }

interface ProjectMeta {
  id: string;
  number: string;
  title: string;
  stats: Stat[];
  websiteUrl: string;
  websiteLabel: string;
  image: string;
  responsibilityCount: number;
}

interface Project extends ProjectMeta {
  industry: string;
  description: string;
  responsibilities: string[];
}

const projectsMeta: ProjectMeta[] = [
  {
    id: "sozialens",
    number: "01",
    title: "SOZIALENS",
    stats: [
      { value: "+250K", label: "INV. CAPTURED" },
      { value: "+1K",   label: "CLIENTS" },
    ],
    websiteUrl: "",
    websiteLabel: "SOZIALENS",
    image: "/images/projects/sozialens-hero.webp",
    responsibilityCount: 4,
  },
  {
    id: "nest",
    number: "02",
    title: "NEST",
    stats: [
      { value: "+25K", label: "USERS" },
      { value: "$250M", label: "TVL" },
    ],
    websiteUrl: "",
    websiteLabel: "NEST",
    image: "/images/projects/nest-hero.webp",
    responsibilityCount: 1,
  },
  {
    id: "garbo",
    number: "03",
    title: "GARBO",
    stats: [
      { value: "$310B", label: "MARKET SHARE" },
      { value: "$8T",   label: "MARKET WORTH" },
      { value: "37%",   label: "GROWTH" },
    ],
    websiteUrl: "",
    websiteLabel: "GARBO",
    image: "/images/projects/garbo-hero.webp",
    responsibilityCount: 2,
  },
  {
    id: "fenix",
    number: "04",
    title: "FENIX FINANCE",
    stats: [
      { value: "+$1.7B", label: "TRADE VOLUME" },
      { value: "$20M",   label: "OPEN INTEREST" },
      { value: "+5K",    label: "USERS" },
    ],
    websiteUrl: "https://www.fenixfinance.io/",
    websiteLabel: "FENIX FINANCE",
    image: "/images/projects/fenix-hero.webp",
    responsibilityCount: 2,
  },
  {
    id: "intentx",
    number: "05",
    title: "INTENTX",
    stats: [
      { value: "+$1.7B", label: "TRADE VOLUME" },
      { value: "$20M",   label: "OPEN INTEREST" },
      { value: "+5K",    label: "USERS" },
    ],
    websiteUrl: "https://intentx.io/",
    websiteLabel: "INTENTX",
    image: "/images/projects/intentx-hero.webp",
    responsibilityCount: 1,
  },
];

/* ── Single Project Showcase ───────────────────────────────── */

function ProjectShowcase({
  project,
  index,
  visitLabel,
  contributionLabel,
  studioNote,
  studioLabel,
}: {
  project: Project;
  index: number;
  visitLabel: string;
  contributionLabel: string;
  studioNote: string;
  studioLabel: string;
}) {
  const isReversed = index % 2 !== 0;

  return (
    <article
      className="project-showcase"
      data-reveal="fade-up"
      data-reveal-delay={`${index * 120}`}
    >
      <div
        className={`flex flex-col ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* ── Hero Image ─────────────────────────────────── */}
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:w-[58%]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />

          {/* Gradient overlay */}
          <div className="project-hero-overlay pointer-events-none absolute inset-0" />

          {/* Grid pattern overlay */}
          <div className="project-grid-overlay pointer-events-none absolute inset-0" />

          {/* Large number */}
          <div className="absolute bottom-6 right-8">
            <span className="project-number text-7xl lg:text-8xl">
              {project.number}
            </span>
          </div>

          {/* Corner accents */}
          <div
            className="absolute left-4 top-4 h-5 w-5 border-l border-t"
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
          />
          <div
            className="absolute right-4 top-4 h-5 w-5 border-r border-t"
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
          />

          {/* Industry badge */}
          <div className="absolute left-1/2 top-4 -translate-x-1/2">
            <span className="project-industry-badge rounded-sm px-3 py-1.5 text-[9px] font-medium tracking-[0.25em] uppercase">
              {project.industry}
            </span>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────── */}
        <div className="flex flex-1 flex-col justify-between gap-6 p-8 lg:p-10">
          {/* Title */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-black leading-tight tracking-tight text-fg lg:text-3xl">
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {project.description}
            </p>
          </div>

          {/* Contributions */}
          <div className="flex flex-col gap-3">
            <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-muted opacity-50">
              {contributionLabel}
            </span>
            <ul className="flex flex-col gap-2">
              {project.responsibilities.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 text-[13px] leading-snug text-muted"
                >
                  <span className="mt-2 h-px w-4 shrink-0 bg-line2" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Footer: Esthetiqo badge + link */}
          <div className="flex flex-col gap-4 border-t border-line pt-5">
            {/* Esthetiqo studio badge */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.1em] text-muted opacity-50">
                {studioNote}
              </span>
              <span className="studio-badge">{studioLabel}</span>
            </div>

            {/* Project link */}
            {project.websiteUrl ? (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-70"
              >
                <span className="text-xs font-medium tracking-[0.15em] uppercase text-fg">
                  {visitLabel} {project.websiteLabel}
                </span>
                <ArrowRight className="h-3 w-3 text-muted transition-transform duration-300 hover:translate-x-1" />
              </a>
            ) : (
              <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted opacity-40">
                {project.websiteLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Projects Section ──────────────────────────────────────── */

export default function Projects() {
  const t = useTranslations("Projects");

  const projects: Project[] = projectsMeta.map((meta) => ({
    ...meta,
    industry: t(`${meta.id}.industry`),
    description: t(`${meta.id}.description`),
    responsibilities: t.raw(`${meta.id}.responsibilities`) as string[],
  }));

  return (
    <section id="proyectos" className="py-24 lg:py-32" data-gsap="projects-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Section Header ─────────────────────────────── */}
        <div className="mb-16 flex flex-col gap-4" data-gsap="projects-header">
          <span
            className="text-xs font-medium tracking-[0.35em] uppercase text-muted"
            data-reveal="fade-in"
          >
            {t("sectionLabel")}
          </span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              className="text-4xl font-black tracking-[-0.02em] text-fg sm:text-5xl lg:text-6xl"
              data-reveal="fade-up"
              data-reveal-delay="100"
            >
              {t("sectionTitle")}
            </h2>
            <p
              className="max-w-sm pb-1 text-sm text-muted"
              data-reveal="fade-left"
              data-reveal-delay="200"
            >
              {t("sectionDescription")}
            </p>
          </div>
          <div className="h-px w-16 bg-line2" data-reveal="fade-left" data-reveal-delay="250" />
        </div>

        {/* ── Project Showcases ──────────────────────────── */}
        <div className="flex flex-col gap-8" data-gsap="projects-grid">
          {projects.map((project, i) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={i}
              visitLabel={t("visitLabel")}
              contributionLabel={t("contributionLabel")}
              studioNote={t("studioNote")}
              studioLabel={t("studioLabel")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
