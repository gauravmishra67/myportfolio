import { lazy, Suspense, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useInView } from "../../hooks/useInView";
import ResumeModal from "../ResumeModal";

const CubeHero = lazy(() => import("../3D/CubeHero"));

interface Stat {
  label: string;
  value: string;
}

interface Profile {
  name: string;
  heroSubtext: string;
  stats: Stat[];
}

export default function Hero() {
  const { ref, inView } = useInView(0.1);
  const [showResume, setShowResume] = useState(false);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profile")
        .select("name, hero_subtext, stats")
        .limit(1);

      if (error) {
        console.error("Failed to fetch Hero profile:", error);
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        console.error("No profile row found for Hero");
        setLoading(false);
        return;
      }

      const row = data[0];

      setProfile({
        name: row.name ?? "",
        heroSubtext: row.hero_subtext ?? "",
        stats: Array.isArray(row.stats) ? row.stats : [],
      });

      setLoading(false);
    }

    fetchProfile();
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-neutral-100/80 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-stone-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-stone-100/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div
            className={`flex flex-col transition-all duration-1000 ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Name */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.12] tracking-tight">
              {loading ? "Loading..." : profile?.name}
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed max-w-md font-light mt-6">
              {loading ? "Loading..." : profile?.heroSubtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center gap-2 px-7 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/10"
              >
                View My Work
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <button
                onClick={() => setShowResume(true)}
                className="group flex items-center gap-2 px-7 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/10"
              >
                Resume
                <span className="text-xs">↓</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10">
              {profile?.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-neutral-900">
                    {stat.value}
                  </span>

                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 3D Cube with Satellite Orbiting Labels */}
          <div
            className={`relative h-[420px] sm:h-[480px] lg:h-[580px] w-full flex items-center justify-center transition-all duration-1000 delay-300 ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {/* Glow behind cube */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-radial from-stone-200/60 to-transparent rounded-full blur-3xl" />

            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-neutral-300 to-neutral-500 animate-pulse" />
                </div>
              }
            >
              <CubeHero />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-400 tracking-widest uppercase">
          Scroll
        </span>

        <div className="w-5 h-8 rounded-full border border-neutral-300 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-neutral-400 animate-bounce" />
        </div>
      </div>

      {showResume && (
        <ResumeModal onClose={() => setShowResume(false)} />
      )}
    </section>
  );
}