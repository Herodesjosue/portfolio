import Image from "next/image";

const projects = [
  {
    id: "sozialens",
    number: "01",
    industry: "AI AND SMM",
    title: "SOZIALENS",
    description:
      "Platform that connects businesses with thematic social media accounts to boost visibility without relying on traditional influencers. Offers customizable ad campaigns and transparent metrics for broad and targeted audiences.",
    responsibilities: [
      "Full-stack development (frontend & backend)",
      "Authentication module integration",
      "Real-time chat module development",
      "Built with NestJS, Prisma, GraphQL & Next.js",
    ],
    stats: [
      { value: "+250K", label: "INV. CAPTURED" },
      { value: "+1K", label: "CLIENTS" },
    ],
    websiteUrl: "",
    websiteLabel: "SOZIALENS",
    image: "/images/projects/sozialens-hero.webp",
  },
  {
    id: "nest",
    number: "02",
    industry: "CRYPTO AND WEB3",
    title: "NEST",
    description:
      "DeFi platform on Hyperliquid merging yield strategies, automated voting, and a meme-powered identity. Features $HYPE staking, veHYPE creation, automated governance, and a built-in incentives engine.",
    responsibilities: [
      "Landing page development",
    ],
    stats: [
      { value: "+25K", label: "USERS" },
      { value: "$250M", label: "TVL" },
    ],
    websiteUrl: "https://NEST.io",
    websiteLabel: "NEST",
    image: "/images/projects/nest-hero.webp",
  },
  {
    id: "garbo",
    number: "03",
    industry: "CYBER-SECURITY",
    title: "GARBO",
    description:
      "Cutting-edge platform enabling real-time virtualization of mobile devices on ARM-over-ARM architecture. Provides complete control for security research, cyber intelligence, and advanced testing at scale.",
    responsibilities: [
      "Landing page design & development",
      "Product screen UI development",
    ],
    stats: [
      { value: "$310B", label: "MARKET SHARE" },
      { value: "$8T", label: "MARKET WORTH" },
      { value: "37%", label: "GROWTH" },
    ],
    websiteUrl: "https://GARBO.io",
    websiteLabel: "GARBO",
    image: "/images/projects/garbo-hero.webp",
  },
  {
    id: "fenix",
    number: "04",
    industry: "PERPS TRADING AND CRYPTO",
    title: "FENIX FINANCE",
    description:
      "Marketplace where protocols compete for liquidity, users earn by voting and providing funds, and traders enjoy efficient exchange—powered by Blast network's native yield.",
    responsibilities: [
      "Frontend development with focus on performance",
      "Responsive optimization for desktop & mobile",
    ],
    stats: [
      { value: "+$1.7B", label: "TRADE VOLUME" },
      { value: "$20M", label: "OPEN INTEREST" },
      { value: "+5K", label: "USERS" },
    ],
    websiteUrl: "https://FENIX.io",
    websiteLabel: "FENIX FINANCE",
    image: "/images/projects/fenix-hero.webp",
  },
  {
    id: "intentx",
    number: "05",
    industry: "PERPS TRADING AND CRYPTO",
    title: "INTENTX",
    description:
      "Decentralized OTC derivatives platform enabling leveraged perpetual futures trading with a CEX-level experience—entirely on-chain, non-custodial, and permissionless.",
    responsibilities: [
      "Frontend development of the core trading module",
    ],
    stats: [
      { value: "+$1.7B", label: "TRADE VOLUME" },
      { value: "$20M", label: "OPEN INTEREST" },
      { value: "+5K", label: "USERS" },
    ],
    websiteUrl: "https://INTENTX.io",
    websiteLabel: "INTENTX",
    image: "/images/projects/intentx-hero.webp",
  },
];

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 lg:py-0" data-gsap="projects-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-4" data-gsap="projects-header">
          <span
            className="text-xs font-medium tracking-[0.35em] uppercase"
            style={{ color: "var(--c-muted)" }}
          >
            04 — Proyectos
          </span>
          <h2
            className="text-4xl font-black tracking-[-0.02em] sm:text-5xl lg:text-6xl"
            style={{ color: "var(--c-fg)" }}
          >
            LOGROS CLAVE
          </h2>
          <div className="h-px w-16" style={{ background: "var(--c-border2)" }} />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-gsap="projects-grid">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="theme-card group flex flex-col overflow-hidden rounded-xl"
              data-gsap={`project-card-${i}`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden lg:h-64" style={{ background: "var(--c-surface2)" }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Dark overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30" />

                {/* Grid overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(128,128,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,1) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Project number */}
                <div className="absolute bottom-4 right-5">
                  <span
                    className="select-none text-6xl font-black"
                    style={{ color: "rgba(255,255,255,0.15)" }}
                  >
                    {project.number}
                  </span>
                </div>

                {/* Corner marks */}
                <div
                  className="absolute left-4 top-4 h-5 w-5 border-l border-t transition-all duration-300 group-hover:opacity-60"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}
                />
                <div
                  className="absolute right-4 top-4 h-5 w-5 border-r border-t transition-all duration-300 group-hover:opacity-60"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}
                />

                {/* Industry tag */}
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <span
                    className="rounded-sm px-3 py-1.5 text-[9px] font-medium tracking-[0.25em] uppercase backdrop-blur-sm"
                    style={{
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.75)",
                      background: "rgba(0,0,0,0.35)",
                    }}
                  >
                    {project.industry}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-5 p-7">

                {/* Title */}
                <h3
                  className="text-xl font-bold leading-tight tracking-tight"
                  style={{ color: "var(--c-fg)" }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>
                  {project.description}
                </p>

                {/* Responsibilities */}
                <div className="flex flex-col gap-1.5">
                  <span
                    className="text-[9px] font-medium tracking-[0.3em] uppercase"
                    style={{ color: "var(--c-muted)", opacity: 0.5 }}
                  >
                    Responsabilidades
                  </span>
                  <ul className="flex flex-col gap-1">
                    {project.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="flex items-center gap-2 text-[11px] leading-snug"
                        style={{ color: "var(--c-muted)" }}
                      >
                        <span
                          className="h-px w-3 shrink-0"
                          style={{ background: "var(--c-border2)" }}
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div
                  className="grid gap-4 border-t pt-4"
                  style={{
                    borderColor: "var(--c-border)",
                    gridTemplateColumns: `repeat(${project.stats.length}, 1fr)`,
                  }}
                >
                  {/* {project.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-0.5">
                      <span
                        className="text-base font-bold tracking-tight"
                        style={{ color: "var(--c-fg)" }}
                      >
                        {stat.value}
                      </span>
                      <span
                        className="text-[9px] font-medium tracking-[0.2em] uppercase"
                        style={{ color: "var(--c-muted)", opacity: 0.5 }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))} */}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-2">
                  {project.websiteUrl ? (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-70"
                    >
                      <span
                        className="text-xs font-medium tracking-[0.15em] uppercase"
                        style={{ color: "var(--c-muted)" }}
                      >
                        Visitar {project.websiteLabel}
                      </span>
                      <svg
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: "var(--c-border2)" }}
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6h8M6 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ) : (
                    <span
                      className="text-xs font-medium tracking-[0.15em] uppercase"
                      style={{ color: "var(--c-muted)", opacity: 0.4 }}
                    >
                      {project.websiteLabel}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
