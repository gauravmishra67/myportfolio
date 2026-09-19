import type { FormEvent } from "react";

interface ExperienceModalProps {
  editingExperienceId: string | null;

  experienceRole: string;
  setExperienceRole: (value: string) => void;

  experienceOrganization: string;
  setExperienceOrganization: (value: string) => void;

  experienceYear: string;
  setExperienceYear: (value: string) => void;

  experienceType: string;
  setExperienceType: (value: string) => void;

  experienceResponsibilities: string;
  setExperienceResponsibilities: (value: string) => void;

  savingExperience: boolean;

  handleSaveExperience: (e: FormEvent<HTMLFormElement>) => void;

  onClose: () => void;
}

export default function ExperienceModal({
  editingExperienceId,
  experienceRole,
  setExperienceRole,
  experienceOrganization,
  setExperienceOrganization,
  experienceYear,
  setExperienceYear,
  experienceType,
  setExperienceType,
  experienceResponsibilities,
  setExperienceResponsibilities,
  savingExperience,
  handleSaveExperience,
  onClose,
}: ExperienceModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl">
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-neutral-100 px-7 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              Portfolio Content
            </p>

            <h2 className="font-serif text-2xl font-bold mt-1">
              {editingExperienceId
                ? "Edit Experience"
                : "Add Experience"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-neutral-200 text-neutral-400 hover:text-neutral-900"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSaveExperience}
          className="p-7 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Role
              </label>

              <input
                required
                value={experienceRole}
                onChange={(e) =>
                  setExperienceRole(e.target.value)
                }
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Organization
              </label>

              <input
                required
                value={experienceOrganization}
                onChange={(e) =>
                  setExperienceOrganization(e.target.value)
                }
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Year
              </label>

              <input
                value={experienceYear}
                onChange={(e) =>
                  setExperienceYear(e.target.value)
                }
                placeholder="2026"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Employment Type
              </label>

              <input
                value={experienceType}
                onChange={(e) =>
                  setExperienceType(e.target.value)
                }
                placeholder="Freelance / Internship / Full-time"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Responsibilities
              </label>

              <textarea
                rows={6}
                value={experienceResponsibilities}
                onChange={(e) =>
                  setExperienceResponsibilities(e.target.value)
                }
                placeholder="One responsibility per line"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm resize-none"
              />

              <p className="text-xs text-neutral-400 mt-2">
                Enter one responsibility per line.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-neutral-200 rounded-xl text-sm font-medium hover:bg-neutral-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={savingExperience}
              className="px-6 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium disabled:opacity-50"
            >
              {savingExperience
                ? "Saving..."
                : editingExperienceId
                  ? "Update Experience"
                  : "Save Experience"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}