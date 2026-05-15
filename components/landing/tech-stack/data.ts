export const allTechs = [
  "React.js", "Next.js", "TypeScript", "Node.js", "NestJS", "GraphQL",
  "Prisma ORM", "PostgreSQL", "MongoDB", "Supabase", "React Native",
  "GSAP", "Three.js", "WebGL", "Tailwind CSS", "Zustand", "Docker",
  "Git", "REST APIs", "Auth0", "Vercel", "AWS",
];

export const categoryBase: { id: string; number: string; techs: string[] }[] = [
  { id: "frontend",  number: "01", techs: ["React.js", "Next.js", "Tailwind CSS", "Zustand", "Bootstrap"] },
  { id: "backend",   number: "02", techs: ["Node.js", "NestJS", "GraphQL", "Prisma ORM"] },
  { id: "creative",  number: "03", techs: ["GSAP", "Three.js", "WebGL"] },
  { id: "databases", number: "04", techs: ["PostgreSQL", "MongoDB", "Supabase"] },
  { id: "mobile",    number: "05", techs: ["React Native"] },
];
