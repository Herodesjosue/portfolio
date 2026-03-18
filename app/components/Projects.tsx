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
    websiteUrl: "https://NEST.io",
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
    websiteUrl: "https://GARBO.io",
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
    websiteUrl: "https://FENIX.io",
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
    websiteUrl: "https://INTENTX.io",
    websiteLabel: "INTENTX",
    image: "/images/projects/intentx-hero.webp",
    responsibilityCount: 1,
  },
];

function ProjectCard({
  project,
  visitLabel,
  responsibilitiesLabel,
}: {
  project: Project;
  visitLabel: string;
  responsibilitiesLabel: string;
}) {
  return (
    <article className="theme-card group flex h-full flex-col overflow-hidden rounded-xl">
      <div className="relative h-52 overflow-hidden bg-surface2 lg:h-64">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(rgba(128,128,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute bottom-4 right-5">
          <span className="select-none text-6xl font-black" style={{ color: "rgba(255,255,255,0.15)" }}>
            {project.number}
          </span>
        </div>
        <div className="absolute left-4 top-4 h-5 w-5 border-l border-t transition-all duration-300 group-hover:opacity-60" style={{ borderColor: "rgba(255,255,255,0.3)" }} />
        <div className="absolute right-4 top-4 h-5 w-5 border-r border-t transition-all duration-300 group-hover:opacity-60" style={{ borderColor: "rgba(255,255,255,0.3)" }} />
        <div className="absolute left-1/2 top-4 -translate-x-1/2">
          <span
            className="rounded-sm px-3 py-1.5 text-[9px] font-medium tracking-[0.25em] uppercase backdrop-blur-sm"
            style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", background: "rgba(0,0,0,0.35)" }}
          >
            {project.industry}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-7">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-fg">{project.title}</h3>

        <p className="text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="flex flex-col flex-1 gap-1.5">
          <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-muted opacity-50">
            {responsibilitiesLabel}
          </span>
          <ul className="flex flex-col gap-1">
            {project.responsibilities.map((r) => (
              <li key={r} className="flex items-center gap-2 text-[11px] leading-snug text-muted">
                <span className="h-px w-3 shrink-0 bg-line2" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="grid gap-4 border-t border-line pt-4"
          style={{ gridTemplateColumns: `repeat(${project.stats.length}, 1fr)` }}
        >
          {/* {project.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="text-base font-bold tracking-tight text-fg">{stat.value}</span>
              <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-muted opacity-50">{stat.label}</span>
            </div>
          ))} */}
        </div>

        <div className="mt-auto pt-2">
          {project.websiteUrl ? (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-70"
            >
              <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted">
                {visitLabel} {project.websiteLabel}
              </span>
              <ArrowRight className="h-3 w-3 text-line2 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          ) : (
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted opacity-40">
              {project.websiteLabel}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const t = useTranslations("Projects");

  const projects: Project[] = projectsMeta.map((meta) => ({
    ...meta,
    industry: t(`${meta.id}.industry`),
    description: t(`${meta.id}.description`),
    responsibilities: t.raw(`${meta.id}.responsibilities`) as string[],
  }));

  return (
    <section id="proyectos" className=" lg:py-0" data-gsap="projects-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-16 flex flex-col gap-4" data-gsap="projects-header">
          <span className="text-xs font-medium tracking-[0.35em] uppercase text-muted">
            {t("sectionLabel")}
          </span>
          <h2 className="text-4xl font-black tracking-[-0.02em] text-fg sm:text-5xl lg:text-6xl">
            {t("sectionTitle")}
          </h2>
          <div className="h-px w-16 bg-line2" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-gsap="projects-grid">
          {projects.map((project, i) => (
            <div key={project.id} className="h-full" data-gsap={`project-card-${i}`}>
              <ProjectCard
                project={project}
                visitLabel={t("visitLabel")}
                responsibilitiesLabel={t("responsibilitiesLabel")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
