export interface LearningItem {
  name: string;
  description: string;
  icon: string;
  progress?: number;
  status: "active" | "planned" | "paused";
}

export const currentlyLearning: LearningItem[] = [
  {
    name: "Godot 4.7",
    description: "Game Development",
    icon: "🎮",
    progress: 35,
    status: "active",
  },
  {
    name: "Japanese",
    description: "Language Learning",
    icon: "🇯🇵",
    progress: 25,
    status: "active",
  },
  {
    name: "MySQL",
    description: "Database Management",
    icon: "🗄️",
    progress: 35,
    status: "active",
  },
  {
    name: "Backend Development",
    description: "Server-side Engineering",
    icon: "⚡",
    progress: 30,
    status: "active",
  },
];
