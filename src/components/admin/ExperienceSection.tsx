import type { Dispatch, SetStateAction } from "react";

export interface Experience {
  id: string;
  role: string;
  organization: string;
  year?: string | null;
  employment_type?: string | null;
  responsibilities?: string[] | null;
  sort_order: number;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  loadingExperience: boolean;
  error: string;
  experienceMenuId: string | null;
  setExperienceMenuId: Dispatch<SetStateAction<string | null>>;
  openExperienceEditor: (experience?: Experience) => void;
  handleDeleteExperience: (id: string) => void;
}

export default function ExperienceSection({
  experiences,
  loadingExperience,
  error,
  experienceMenuId,
  setExperienceMenuId,
  openExperienceEditor,
  handleDeleteExperience,
}: ExperienceSectionProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Content
          </p>

          <h2 className="font-serif text-2xl font-bold mt-1">
            Experience
          </h2>
        </div>

        <button
          type="button"
          onClick={() => openExperienceEditor()}
          className="px-4 py-2.5 bg-neutral-900 text-white text-xs font-medium rounded-xl hover:bg-neutral-800"
        >
          + Add Experience
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {loadingExperience ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            Loading experience...
          </p>
        </div>
      ) : experiences.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            No experience entries found.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-visible">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`p-4 sm:p-5 flex items-start gap-4 ${
                index !== experiences.length - 1
                  ? "border-b border-neutral-100"
                  : ""
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-sm flex-shrink-0">
                ○
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm">
                  {experience.role}
                </h3>

                <p className="text-xs text-neutral-500 mt-1">
                  {experience.organization}
                  {experience.year
                    ? ` · ${experience.year}`
                    : ""}
                </p>

                {experience.employment_type && (
                  <p className="text-xs text-neutral-400 mt-1">
                    {experience.employment_type}
                  </p>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label={`Actions for ${experience.role}`}
                  aria-expanded={
                    experienceMenuId === experience.id
                  }
                  onClick={() =>
                    setExperienceMenuId(
                      experienceMenuId === experience.id
                        ? null
                        : experience.id
                    )
                  }
                  className="w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                >
                  •••
                </button>

                {experienceMenuId === experience.id && (
                  <div className="absolute right-0 top-11 z-30 w-32 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() =>
                        openExperienceEditor(experience)
                      }
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteExperience(experience.id)
                      }
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
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