import React from "react";

export interface Project {
  id: string;
  title: string;
  category: string;
  description?: string;
  technologies?: string[];
  year: string;
  live_url?: string | null;
  github_url?: string | null;
  image?: string | null;
  client_project?: boolean;
  source_code_available?: boolean;
  is_novel?: boolean;
  featured: boolean;
  sort_order: number;
  details?: Record<string, unknown>;
}

interface ProjectsSectionProps {
  projects: Project[];
  loadingProjects: boolean;
  error: string;
  savingProject: boolean;
  deletingProjectId: string | null;
  projectMenuId: string | null;
  setProjectMenuId: React.Dispatch<React.SetStateAction<string | null>>;
  openEditProject: (projectId: string) => void;
  handleDeleteProject: (projectId: string) => void;
  openAddProject: () => void;
}

export default function ProjectsSection({
  projects,
  loadingProjects,
  error,
  savingProject,
  deletingProjectId,
  projectMenuId,
  setProjectMenuId,
  openEditProject,
  handleDeleteProject,
  openAddProject,
}: ProjectsSectionProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Content
          </p>
          <h2 className="font-serif text-2xl font-bold mt-1">Projects</h2>
        </div>

        <button
          type="button"
          onClick={openAddProject}
          className="px-4 py-2.5 bg-neutral-900 text-white text-xs font-medium rounded-xl hover:bg-neutral-800 transition-colors"
        >
          + Add Project
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {loadingProjects ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">Loading your projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">No projects found.</p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-visible">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`p-4 sm:p-5 flex items-center gap-3 sm:gap-5 ${
                index !== projects.length - 1
                  ? "border-b border-neutral-100"
                  : ""
              }`}
            >
              <div className="w-16 h-16 rounded-xl bg-neutral-100 overflow-visible flex-shrink-0">
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-300">
                    ◈
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">{project.title}</h3>

                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] text-neutral-500">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-400 mt-1">
                  {project.category} · {project.year}
                </p>
              </div>

              <div className="hidden sm:block text-xs text-neutral-300">
                #{String(project.sort_order).padStart(2, "0")}
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label={`Actions for ${project.title}`}
                  aria-expanded={projectMenuId === project.id}
                  onClick={() =>
                    setProjectMenuId(
                      projectMenuId === project.id ? null : project.id
                    )
                  }
                  className="w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  •••
                </button>

                {projectMenuId === project.id && (
                  <div className="absolute right-0 top-11 z-30 w-32 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => openEditProject(project.id)}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteProject(project.id)}
                      disabled={deletingProjectId === project.id || savingProject}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingProjectId === project.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
