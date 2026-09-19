import type { FormEvent } from "react";

interface ProjectModalProps {
  editingProjectId: string | null;

  title: string;
  setTitle: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  technologies: string;
  setTechnologies: (value: string) => void;

  year: string;
  setYear: (value: string) => void;

  liveUrl: string;
  setLiveUrl: (value: string) => void;

  githubUrl: string;
  setGithubUrl: (value: string) => void;

  image: string;
  setImage: (value: string) => void;

  clientProject: boolean;
  setClientProject: (value: boolean) => void;

  sourceCodeAvailable: boolean;
  setSourceCodeAvailable: (value: boolean) => void;

  isNovel: boolean;
  setIsNovel: (value: boolean) => void;

  featured: boolean;
  setFeatured: (value: boolean) => void;

  savingProject: boolean;

  handleSaveProject: (e: FormEvent<HTMLFormElement>) => void;
  resetProjectForm: () => void;
}

export default function ProjectModal({
  editingProjectId,
  title,
  setTitle,
  category,
  setCategory,
  description,
  setDescription,
  technologies,
  setTechnologies,
  year,
  setYear,
  liveUrl,
  setLiveUrl,
  githubUrl,
  setGithubUrl,
  image,
  setImage,
  clientProject,
  setClientProject,
  sourceCodeAvailable,
  setSourceCodeAvailable,
  isNovel,
  setIsNovel,
  featured,
  setFeatured,
  savingProject,
  handleSaveProject,
  resetProjectForm,
}: ProjectModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingProjectId ? "Edit Project" : "Add Project"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {editingProjectId
                ? "Update the project information."
                : "Add a new project to your portfolio."}
            </p>
          </div>

          <button
            type="button"
            onClick={resetProjectForm}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSaveProject} className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Technologies
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="React, TypeScript, Supabase"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate technologies with commas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Live URL
            </label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              GitHub URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div className="space-y-3 rounded-xl border border-gray-200 p-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={clientProject}
                onChange={(e) => setClientProject(e.target.checked)}
              />
              <span className="text-sm text-gray-700">Client Project</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={sourceCodeAvailable}
                onChange={(e) => setSourceCodeAvailable(e.target.checked)}
              />
              <span className="text-sm text-gray-700">
                Source Code Available
              </span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isNovel}
                onChange={(e) => setIsNovel(e.target.checked)}
              />
              <span className="text-sm text-gray-700">Novel</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={resetProjectForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={savingProject}
              className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingProject
                ? "Saving..."
                : editingProjectId
                  ? "Update Project"
                  : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}