export interface Goal {
  title: string;
  description: string;
  status: "current" | "next" | "future";
}

export const goals: Goal[] = [
  {
    title: "Software Engineering",
    description: "Building strong foundations in computer science and engineering principles.",
    status: "current",
  },
  {
    title: "Full-Stack Development",
    description: "Mastering both frontend and backend technologies for complete web solutions.",
    status: "next",
  },
  {
    title: "Technology + Research",
    description: "Contributing to technology innovation through research and creative problem-solving.",
    status: "future",
  },
];
