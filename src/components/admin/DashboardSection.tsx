import type { Project } from "./ProjectsSection";

interface DashboardSectionProps {
  projects: Project[];
  featuredCount: number;
  clientCount: number;
  success: string;
}

export default function DashboardSection({
  projects,
  featuredCount,
  clientCount,
  success,
}: DashboardSectionProps) {
  return (
    <section>
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
          Overview
        </p>
        <h2 className="font-serif text-2xl font-bold mt-1">
          Welcome to your portfolio CMS
        </h2>
        <p className="text-sm text-neutral-500 mt-2">
          Manage your portfolio content from one place.
        </p>
      </div>

      {success && (
        <div className="mb-5 px-4 py-3 bg-green-50 border border-green-100 rounded-xl">
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            Projects
          </p>
          <p className="text-3xl font-bold mt-2">{projects.length}</p>
          <p className="text-xs text-neutral-400 mt-1">
            Total portfolio projects
          </p>
        </div>

        <div className="bg-white border border-neutral-200/80 rounded-2xl p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            Featured
          </p>
          <p className="text-3xl font-bold mt-2">{featuredCount}</p>
          <p className="text-xs text-neutral-400 mt-1">
            Featured projects
          </p>
        </div>

        <div className="bg-white border border-neutral-200/80 rounded-2xl p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            Client Work
          </p>
          <p className="text-3xl font-bold mt-2">{clientCount}</p>
          <p className="text-xs text-neutral-400 mt-1">
            Client projects
          </p>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-6">
        <div className="mb-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            Current Content
          </p>
          <h3 className="font-serif text-lg font-bold mt-1">
            Recent Projects
          </h3>
        </div>

        {projects.length === 0 ? (
          <p className="text-sm text-neutral-400">
            No projects found.
          </p>
        ) : (
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between gap-4 py-3 border-b border-neutral-100 last:border-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {project.title}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    {project.category}
                  </p>
                </div>

                <span className="text-xs text-neutral-400 flex-shrink-0">
                  {project.year}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}