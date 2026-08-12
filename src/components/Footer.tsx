import { profile } from "../data/profile";
import { useInView } from "../hooks/useInView";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { ref, inView } = useInView(0.1);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      ref={ref}
      className="relative bg-neutral-950 text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Main footer */}
        <div
          className={`py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 transition-all duration-700 ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {/* Brand */}
          <button
            onClick={() => scrollTo("#home")}
            className="group flex items-center gap-3 text-left"
          >
            <img
              src={profile.logoImage}
              alt={`${profile.name} logo`}
              className="w-9 h-9 rounded-lg object-cover border border-white/10 group-hover:border-white/25 transition-colors duration-300"
            />

            <div>
              <p className="text-sm font-medium text-white">
                {profile.name}
              </p>

              <p className="text-xs text-neutral-600 mt-0.5">
                {profile.location}
              </p>
            </div>
          </button>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-xs text-neutral-500 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${profile.email}`}
              className="text-xs text-neutral-500 hover:text-white transition-colors duration-300"
            >
              Email ↗
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-white transition-colors duration-300"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div
          className={`border-t border-white/[0.08] py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all duration-700 delay-150 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-[11px] text-neutral-700">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <p className="text-[11px] text-neutral-700">
              Designed & built with intention.
            </p>

            <button
              onClick={() => scrollTo("#home")}
              className="text-[11px] text-neutral-600 hover:text-white transition-colors duration-300"
            >
              ↑ Top
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}