import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useInView } from "../../hooks/useInView";

interface ExperienceItem {
  role: string;
  organization: string;
  year: string | null;
  employment_type: string | null;
  responsibilities: string[] | null;
}

export default function Experience() {
  const { ref, inView } = useInView(0.1);

  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperience() {
      const { data, error } = await supabase
        .from("experience")
        .select(
          "role, organization, year, employment_type, responsibilities"
        )
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Failed to fetch experience:", error);
        setLoading(false);
        return;
      }

      setExperience(data ?? []);
      setLoading(false);
    }

    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-32 bg-neutral-50/50 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-8 h-px bg-neutral-400" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium">
            Experience
          </span>
        </div>

        <h2
          className={`font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-16 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Professional <span className="italic text-neutral-500">Journey</span>
        </h2>

        <div className="space-y-8">
          {loading ? (
            <div className="text-sm text-neutral-400">
              Loading experience...
            </div>
          ) : (
            experience.map((exp, i) => (
              <div
                key={`${exp.organization}-${exp.role}-${i}`}
                className={`relative pl-8 border-l-2 border-neutral-200 transition-all duration-700 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-neutral-400" />

                <div className="p-8 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-100/50 transition-all duration-500">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {exp.employment_type && (
                      <span className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full font-medium">
                        {exp.employment_type}
                      </span>
                    )}

                    {exp.year && (
                      <span className="text-xs text-neutral-400">
                        {exp.year}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-neutral-900 mb-1">
                    {exp.role}
                  </h3>

                  <p className="text-sm text-neutral-500 mb-5">
                    {exp.organization}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(exp.responsibilities ?? []).map((resp) => (
                      <span
                        key={resp}
                        className="px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-100 text-neutral-600 rounded-lg"
                      >
                        {resp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}