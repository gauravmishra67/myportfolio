import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useInView } from "../../hooks/useInView";

interface LearningItem {
  name: string;
  description: string;
  icon: string;
  progress?: number;
  status: "active" | "planned" | "paused";
}

export default function Learning() {
  const { ref, inView } = useInView(0.1);
  const [learning, setLearning] = useState<LearningItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLearning() {
      const { data, error } = await supabase
        .from("learning")
        .select("name, description, icon, progress, status")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Failed to fetch learning:", error);
        setLoading(false);
        return;
      }

      setLearning(data ?? []);
      setLoading(false);
    }

    fetchLearning();
  }, []);

  return (
    <section className="py-32 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-8 h-px bg-neutral-400" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium">
            Currently Learning
          </span>
        </div>

        <h2
          className={`font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-4 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Always <span className="italic text-neutral-500">Evolving</span>
        </h2>

        <p
          className={`text-neutral-500 text-lg font-light max-w-xl mb-16 transition-all duration-700 delay-200 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          Skills are never static. Here's what I'm currently exploring and building proficiency in.
        </p>

        {/* Learning cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-sm text-neutral-400">
              Loading...
            </div>
          ) : (
            learning.map((item, i) => (
              <div
                key={item.name}
                className={`group relative p-6 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-500 overflow-hidden ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + i * 120}ms` }}
              >
                {/* Progress background fill */}
                {item.progress !== undefined && (
                  <div
                    className="absolute bottom-0 left-0 w-full bg-neutral-50 transition-all duration-1000 ease-out"
                    style={{
                      height: inView ? `${item.progress}%` : "0%",
                      transitionDelay: `${500 + i * 120}ms`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  <span className="text-3xl mb-4 block">{item.icon}</span>

                  <h3 className="font-semibold text-neutral-800 text-lg mb-1">
                    {item.name}
                  </h3>

                  <p className="text-sm text-neutral-500 mb-4">
                    {item.description}
                  </p>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        item.status === "active"
                          ? "bg-emerald-50 text-emerald-600"
                          : item.status === "planned"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {item.status === "active"
                        ? "Active"
                        : item.status === "planned"
                        ? "Planned"
                        : "Paused"}
                    </span>

                    {item.progress !== undefined && (
                      <span className="text-xs font-mono text-neutral-400">
                        {item.progress}%
                      </span>
                    )}
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