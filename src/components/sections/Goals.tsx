import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useInView } from "../../hooks/useInView";

interface Goal {
  title: string;
  description: string | null;
  status: "completed" | "current" | "future";
}
export default function Goals() {
  const { ref, inView } = useInView(0.1);

  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGoals() {
      const { data, error } = await supabase
        .from("goals")
        .select("title, description, status")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Failed to fetch goals:", error);
        setLoading(false);
        return;
      }

      setGoals(data ?? []);
      setLoading(false);
    }

    fetchGoals();
  }, []);

  return (
    <section className="py-32 bg-neutral-50/50 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-8 h-px bg-neutral-400" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium">
            Goals
          </span>
        </div>

        <h2
          className={`font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-16 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Where I'm <span className="italic text-neutral-500">Headed</span>
        </h2>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-neutral-200 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {loading ? (
              <div className="text-sm text-neutral-400">
                Loading goals...
              </div>
            ) : (
              goals.map((goal, i) => (
                <div
                  key={goal.title}
                  className={`relative transition-all duration-700 ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${300 + i * 200}ms` }}
                >
                  {/* Node on the line */}
                  <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors duration-500 ${
                        goal.status === "current"
                          ? "bg-neutral-900 border-neutral-900"
                          : goal.status === "completed"
                          ? "bg-white border-neutral-500"
                          : "bg-white border-neutral-200"
                      }`}
                    />
                  </div>

                  <div
                    className={`p-8 rounded-2xl border transition-all duration-500 hover:shadow-xl hover:shadow-neutral-100/50 ${
                      goal.status === "current"
                        ? "bg-[#b8ad99] border-[#a89d8d] text-white"
                        : "bg-white border-neutral-100 hover:border-neutral-200"
                    } md:mt-12`}
                  >
                    {/* Status label */}
                    <span
                      className={`text-xs uppercase tracking-widest font-medium ${
                        goal.status === "current"
                          ? "text-neutral-400"
                          : "text-neutral-400"
                      }`}
                    >
                      {goal.status === "current"
                        ? "Now"
                        : goal.status === "completed"
                        ? "Completed"
                        : "Future"}
                    </span>

                    <h3
                      className={`font-serif text-2xl font-bold mt-3 mb-3 ${
                        goal.status === "current"
                          ? "text-white"
                          : "text-neutral-900"
                      }`}
                    >
                      {goal.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed ${
                        goal.status === "current"
                          ? "text-neutral-300"
                          : "text-neutral-500"
                      }`}
                    >
                      {goal.description}
                    </p>

                    {/* Arrow indicator for non-last items */}
                    {i < goals.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 text-neutral-300 text-lg">
                        →
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}