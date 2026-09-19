import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useInView } from "../../hooks/useInView";

interface Skill {
  name: string;
  level: number;
  category: string;
  proficiency: number;
}

export default function Skills() {
  const { ref, inView } = useInView(0.1);

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase
        .from("skills")
        .select("name, level, category, proficiency")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Failed to fetch skills:", error);
        setLoading(false);
        return;
      }

      setSkills(data ?? []);
      setLoading(false);
    }

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-32 bg-neutral-50/50 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        {/* Section label */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-8 h-px bg-neutral-400" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium">
            Skills
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
          <h2
            className={`font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Tools &{" "}
            <span className="italic text-neutral-500">Technologies</span>
          </h2>

          <p
            className={`text-xs text-neutral-400 uppercase tracking-wider transition-all duration-700 delay-200 ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          >
            Self-assessed proficiency
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {loading ? (
            <div className="text-sm text-neutral-400">
              Loading skills...
            </div>
          ) : (
            skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={i}
                animate={inView}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  skill,
  index,
  animate,
}: {
  skill: Skill;
  index: number;
  animate: boolean;
}) {
  return (
    <div
      className={`group p-6 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-100/50 transition-all duration-500 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${200 + index * 80}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-neutral-800">
            {skill.name}
          </h3>

          <span className="text-xs text-neutral-400 uppercase tracking-wider">
            {skill.category}
          </span>
        </div>

        <span className="text-2xl font-bold text-neutral-300 group-hover:text-neutral-800 transition-colors duration-500 font-mono">
          {skill.proficiency}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? `${skill.proficiency}%` : "0%",
            transitionDelay: `${300 + index * 80}ms`,
            background: `linear-gradient(90deg, #333 0%, #666 100%)`,
          }}
        />
      </div>
    </div>
  );
}