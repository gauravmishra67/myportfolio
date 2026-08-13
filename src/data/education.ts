export interface Education {
  level: string;
  institution: string;
  degree: string;
  gpa: string;
  year: string;
  status: "completed" | "ongoing";
  description?: string;
}

export const education: Education[] = [
  {
    level: "Grade 10",
    institution: "M.I.T. ENGLISH BOARDING SCHOOL",
    degree: "Secondary Education",
    gpa: "3.75",
    year: "2023",
    status: "completed",
    description: "Completed secondary education with distinction.",
  },
  {
    level: "Grade 12",
  institution: "LIVERPOOL INTERNATIONAL SECONDARY SCHOOL",
    degree: "Higher Secondary Education",
    gpa: "3.70",
    year: "2025",
    status: "completed",
    description: "Completed higher secondary education with distinction.",
  },
  {
    level: "Engineering",
    institution: "MY Engineering College",
    degree: "Bachelor of Engineering",
    gpa: "—",
    year: "Present",
    status: "ongoing",
    description: "Currently pursuing engineering degree.",
  },
];
