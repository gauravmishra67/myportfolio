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
  details: ProjectDetails;
}

export const projects: Project[] = [
  {
    title: "Blade Razor Website",
    category: "Client Work",
    description:
      "A modern, responsive business website designed and developed for Blade Razor, creating a professional digital presence with a clean visual identity, intuitive navigation, and an engaging user experience across desktop and mobile devices.",
    technologies: ["Three.js", "React", "CSS", "Tailwind CSS", "TypeScript", "HTML"],
    year: "2026",
    liveUrl: "https://bladerazor.netlify.app",
    githubUrl: "",
    image: "/bladerazor.png",
    clientProject: true,
    sourceCodeAvailable: false,
    details: {
      challenge:
        "BladeRazor had a limited online presence and no dedicated website to effectively showcase the salon. Its Google Business Profile contained limited information, making it difficult for potential customers to discover the salon, learn about its services, and access important information before visiting. The client needed a professional digital presence that could improve visibility, build credibility, and make the salon easier to discover online.",
      solution:
        "I designed and developed a modern, responsive website that gives BladeRazor a professional digital presence and makes essential salon information easily accessible. The website presents the salon, services, and key information through a clean and intuitive interface, optimized for both desktop and mobile users. The goal was to create a trustworthy first impression, simplify the customer journey, and provide a convenient online touchpoint that can help turn visitors into potential customers.",
      features: ["Modern, professional landing page— immediately presents the salon/barbershop and its brand.", "Contact section — gives customers an easy way to get in touch.", "SEO-friendly structure — helps establish an online presence and makes the business easier to discover."],
      role: "UI/UX Designer & Frontend Developer — responsible for the design, responsive development, user experience, implementation, and deployment of the website.",
    },
  },
  {
    title: "DentalClinic Demo Website",
    category: "Web Development",
    description: "A modern, responsive business website designed and developed for a dental clinic, creating a professional digital presence with a clean visual identity, intuitive navigation, and an engaging user experience across desktop and mobile devices.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "HTML","CSS", "Three.js"],
    year: "2026",
    liveUrl: "https://dentalclinicdemowebsite.vercel.app/",
    githubUrl: "https://github.com/gauravmishra67/dentalclinic-demo-website",
    image: "/dentalclinic.png",
    clientProject: false,
    sourceCodeAvailable: true,
    details: {
      challenge: "Create a modern dental clinic website that builds trust, improves the patient experience, and gives the clinic a stronger digital presence.",
      solution: "Designed and developed an immersive, responsive website with a premium healthcare aesthetic, intuitive navigation, interactive elements, and a streamlined appointment experience.",
      features: ["Interactive & responsive UI", "Online appointment booking", "Patient testimonials", "SEO-friendly structure", "Smooth animations & micro-interactions"],
      role: "UI/UX Designer & Frontend Developer — responsible for the visual design, user experience, responsive implementation, interactions, and overall website development.",
    },
  },
  {
    title: "The Last Empiricists",
    category: "Novel",
    description:
      '"A story of two castes, a stolen mind, and a boy who walked toward the thing everyone else walked away from."',
    year: "2026",
    image: "/empiricists.png",
    liveUrl: "https://the-last-empiricists.vercel.app",
    isNovel: true,
    details: {
      premise:
        "California, 2113. Robots and AI govern every institution — not by force, but by a century of humans choosing not to do hard things anymore. Society has split into two castes: the Rationalists, who can afford the technology, and the Empiricists, the poor left behind to survive in the hills. Nineteen-year-old Harry Veld has spent two years quietly tracking patrol patterns from a ridge above the city, filling notebooks with something he can't yet name. He doesn't know it yet, but the answer — to a secret buried since 2067, and to who he really is — is closer than the distance between the village and the city ever suggested.",
      inspiration:
        "This story started with a dream. I was in some kind of future, with a girl I'd never met before, and the two of us were racing against something — solving a problem that felt urgent and enormous, though I couldn't tell you now what the problem actually was. What I remember is the shape of it: the pressure of it, working alongside her, and a promise we made each other for after we solved it. I woke up before we got there. I never got the ending. So I wrote toward it instead.",
      status: "Finished",
      role: "Author",
    },
  },
];
