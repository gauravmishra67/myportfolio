interface AdminHeaderProps {
  activeSection: string;
  email?: string;
}

const sectionTitles: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  education: "Education",
  skills: "Skills",
  experience: "Experience",
  certificates: "Certificates",
  learning: "Learning",
  goals: "Goals",
  profile: "Profile",
};

export default function AdminHeader({
  activeSection,
  email,
}: AdminHeaderProps) {
  const title = sectionTitles[activeSection] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-neutral-200/70">
      <div className="px-5 sm:px-7 lg:px-10 py-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Portfolio CMS
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
            {title}
          </h2>
        </div>

        {email && (
          <div className="hidden sm:block text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Signed in as
            </p>
            <p className="text-xs text-neutral-600 mt-1 max-w-[220px] truncate">
              {email}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}