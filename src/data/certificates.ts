export interface Certificate {
  name: string;
  organization: string;
  date: string;
  credentialUrl: string;
  image: string;
}

export const certificates: Certificate[] = [
  {
    name: "Responsive Web Design",
    organization: "freeCodeCamp",
    date: "Your Date",
    credentialUrl: "https://freecodecamp.org/certification/your-username/responsive-web-design",
    image: "/certificates/freecodecamp-cert.jpg",
  },
];
