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
    credentialUrl: "https://www.freecodecamp.org/certification/gauravkumarmishra/responsive-web-design-v9",
    image: "/certificate.png",
  },
];
