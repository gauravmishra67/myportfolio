import { education } from "../../data/education";
import { useInView } from "../../hooks/useInView";

export default function Education() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="education" className="py-32 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-8 h-px bg-neutral-400" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium">
            Education
          </span>
        </div>

        <h2
          className={`font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-16 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Academic <span className="italic text-neutral-500">Background</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <div
              key={i}
              className={`group p-8 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-500 relative overflow-hidden ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Status indicator */}
              {edu.status === "ongoing" && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Currently
                  </span>
                </div>
              )}

              <div className="text-4xl font-bold text-neutral-100 font-serif mb-4 group-hover:text-neutral-200 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3 className="font-serif text-xl font-bold text-neutral-900 mb-1">
                {edu.level}
              </h3>
              <p className="text-sm text-neutral-500 mb-1">{edu.institution}</p>
              <p className="text-xs text-neutral-400 mb-4">{edu.degree}</p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">GPA</span>
                  <p className="text-lg font-bold text-neutral-800 font-mono">{edu.gpa}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">Year</span>
                  <p className="text-sm font-medium text-neutral-600">{edu.year}</p>
                </div>
              </div>

              {edu.description && (
                <p className="text-xs text-neutral-400 mt-4 leading-relaxed">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
