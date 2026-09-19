interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleSignOut: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "learning", label: "Learning" },
  { id: "goals", label: "Goals" },
  { id: "profile", label: "Profile" },
];

export default function AdminSidebar({
  activeSection,
  setActiveSection,
  handleSignOut,
}: AdminSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-56 lg:w-64 bg-black text-white flex-col">
        <div className="px-6 py-7 border-b border-white/10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            GKM
          </p>

          <h1 className="font-serif text-xl font-bold mt-1 text-white">
            Portfolio CMS
          </h1>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition ${
                  active
                    ? "bg-white text-black font-medium"
                    : "text-white hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full px-4 py-3 rounded-xl text-sm text-white hover:bg-white/10 hover:text-white text-left transition"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-0 z-40 bg-black text-white border-b border-white/10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/50">
              GKM
            </p>

            <h1 className="font-serif text-lg font-bold text-white">
              Portfolio CMS
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="text-xs text-white hover:text-white"
          >
            Sign out
          </button>
        </div>

        <div className="px-3 pb-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {navItems.map((item) => {
              const active = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap transition ${
                    active
                      ? "bg-white text-black font-medium"
                      : "bg-white/10 text-white hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}