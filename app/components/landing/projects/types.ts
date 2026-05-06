export interface ProjectMeta {
  id: string;
  number: string;
  title: string;
  websiteUrl: string;
  websiteLabel: string;
  image: string;
}

export interface Project extends ProjectMeta {
  industry: string;
  description: string;
  responsibilities: string[];
}
