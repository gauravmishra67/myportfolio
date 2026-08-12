import { profile } from "../../data/profile";
import { useInView } from "../../hooks/useInView";

export default function About() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const { ref: pillarsRef, inView: pillarsInView } = useInView(0.15);

  return (
    <section id="about" className="py-32 relative" ref={sectionRef}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <div
          className={`flex items-center gap-3 mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-8 h-px bg-neutral-400" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium">
            About
          </span>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image + identity */}
          <div
            className={`space-y-8 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative group">
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" />
              </div>
              {/* Decorative border */}
              <div className="absolute -inset-3 border border-neutral-200/50 rounded-3xl -z-10" />
            </div>

            {/* Location badge */}
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <span>📍</span>
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="space-y-10">
            <h2
              className={`font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight transition-all duration-700 delay-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {profile.tagline}
            </h2>

            <div className="space-y-6">
              {profile.about.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-lg text-neutral-500 leading-relaxed font-light transition-all duration-700 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${400 + i * 150}ms` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Personal facts */}
            <div
              className={`grid grid-cols-2 gap-4 pt-4 transition-all duration-700 delay-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {[
                { label: "Location", value: "Nepal" },
                { label: "Focus", value: "Frontend + Design" },
                { label: "Interests", value: "Fiction, Music" },
                { label: "Status", value: "Open to work" },
              ].map((fact) => (
                <div key={fact.label} className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">{fact.label}</span>
                  <p className="text-sm text-neutral-700 font-medium mt-1">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Identity Pillars */}
        <div ref={pillarsRef} className="mt-24 grid md:grid-cols-3 gap-6">
          {profile.identityPillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`group p-8 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-500 ${
                pillarsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="text-3xl">{pillar.icon}</span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-4">
                {pillar.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed mt-3">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
