import { useState, useEffect } from "react";
import { profile } from "../data/profile";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? "w-[95%] max-w-5xl"
            : "w-[95%] max-w-6xl"
        }`}
      >
        <div
          className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.04] border border-neutral-200/60"
              : "bg-white/50 backdrop-blur-md border border-neutral-200/40"
          }`}
        >
          {/* Left: Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center overflow-hidden">
              <img
                src={profile.logoImage}
                alt="GM Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.innerHTML =
                    '<span class="text-white text-xs font-semibold">GM</span>';
                }}
              />
            </div>
            <span className="text-sm font-medium text-neutral-700 hidden sm:inline">
              Gaurav K. Mishra
            </span>
          </a>

          {/* Center: Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors rounded-lg hover:bg-neutral-100/60"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Let's Talk
              <span className="text-xs">↗</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`w-5 h-0.5 bg-neutral-800 transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-neutral-800 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-neutral-800 transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-2xl font-light text-neutral-800 hover:text-neutral-500 transition-all duration-300"
              style={{
                transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="mt-4 px-6 py-3 bg-neutral-900 text-white rounded-xl text-lg font-medium"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 50}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transition: "all 0.4s ease",
            }}
          >
            Let's Talk ↗
          </button>
        </div>
      </div>
    </>
  );
}
