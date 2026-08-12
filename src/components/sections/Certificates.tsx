import { certificates } from "../../data/certificates";
import { useInView } from "../../hooks/useInView";

export default function Certificates() {
  const { ref, inView } = useInView(0.1);

  if (certificates.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="py-32 bg-neutral-50/50 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-8 h-px bg-neutral-400" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium">
            Certificates
          </span>
        </div>

        <h2
          className={`font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-16 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Credentials & <span className="italic text-neutral-500">Certifications</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <a
              key={i}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block p-6 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Certificate image */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-5">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center bg-neutral-100"><span class="text-4xl">📜</span></div>';
                    }
                  }}
                />
              </div>

              <h3 className="font-semibold text-neutral-800 mb-1 group-hover:text-neutral-600 transition-colors">
                {cert.name}
              </h3>
              <p className="text-sm text-neutral-500">{cert.organization}</p>
              <p className="text-xs text-neutral-400 mt-2">{cert.date}</p>

              <div className="mt-4 text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors flex items-center gap-1">
                View Credential <span>↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
