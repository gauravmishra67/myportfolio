export interface ProjectDetails {
  challenge?: string;
  solution?: string;
  features?: string[];
  role?: string;
  premise?: string;
  inspiration?: string;
  status?: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  technologies?: string[];
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  clientProject?: boolean;
  sourceCodeAvailable?: boolean;
  isNovel?: boolean;
  featured?: boolean;
  details: ProjectDetails;
}
