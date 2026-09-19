import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import { useInView } from "../../hooks/useInView";

interface Profile {
  contactCTA: string;
  email: string;
  phone: string;
  github: string;
  formspreeEndpoint: string;
}

export default function Contact() {
  const { ref, inView } = useInView(0.1);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profile")
        .select(
          "contact_cta, email, phone, github_url, formspree_endpoint"
        )
        .limit(1);

      if (error) {
        console.error("Failed to fetch Contact profile:", error);
        return;
      }

      if (!data || data.length === 0) {
        console.error("No profile row found for Contact");
        return;
      }

      const row = data[0];

      setProfile({
        contactCTA: row.contact_cta ?? "",
        email: row.email ?? "",
        phone: row.phone ?? "",
        github: row.github_url ?? "",
        formspreeEndpoint: row.formspree_endpoint ?? "",
      });
    }

    fetchProfile();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    if (!profile?.formspreeEndpoint) {
      console.error("Formspree endpoint is missing.");
      setFormState("error");
      return;
    }

    try {
      const res = await fetch(profile.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-gradient-to-tl from-stone-100/60 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-8 h-px bg-neutral-400" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium">
            Contact
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <h2
              className={`font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-6 transition-all duration-700 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {profile?.contactCTA || "Let's build something worth remembering."}
            </h2>

            <p
              className={`text-lg text-neutral-500 font-light mb-10 transition-all duration-700 delay-200 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
            >
              I'm always interested in hearing about new projects, creative ideas, or opportunities to collaborate.
            </p>

            {/* Contact info */}
            <div
              className={`space-y-5 transition-all duration-700 delay-300 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href={`mailto:${profile?.email || ""}`}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-sm">
                  ✉️
                </div>
                <div>
                  <p className="text-xs text-neutral-400 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {profile?.email || ""}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${profile?.phone || ""}`}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-sm">
                  📱
                </div>
                <div>
                  <p className="text-xs text-neutral-400 uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {profile?.phone || ""}
                  </p>
                </div>
              </a>

              <a
                href={profile?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-sm">
                  💻
                </div>
                <div>
                  <p className="text-xs text-neutral-400 uppercase tracking-wider">
                    GitHub
                  </p>
                  <p className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    GitHub Profile ↗
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-12 rounded-3xl bg-white border border-neutral-100">
                <div className="text-5xl mb-6">✨</div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-3">
                  Message Sent!
                </h3>
                <p className="text-neutral-500 mb-6">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="px-6 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10 rounded-3xl bg-white border border-neutral-100 shadow-sm space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs text-neutral-400 uppercase tracking-widest font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-800 text-sm placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:bg-white transition-all"
                    placeholder="Your name"
                    disabled={formState === "loading"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs text-neutral-400 uppercase tracking-widest font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-800 text-sm placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:bg-white transition-all"
                    placeholder="your@email.com"
                    disabled={formState === "loading"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs text-neutral-400 uppercase tracking-widest font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-800 text-sm placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:bg-white transition-all resize-none"
                    placeholder="Tell me about your project or idea..."
                    disabled={formState === "loading"}
                  />
                </div>

                {formState === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                    <p className="text-sm text-red-600">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full py-3.5 px-6 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formState === "loading" ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="opacity-25"
                        />
                        <path
                          d="M4 12a8 8 0 018-8"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span>→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}