import type { Dispatch, SetStateAction } from "react";

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study?: string | null;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  grade?: string | null;
  description?: string | null;
  is_current?: boolean | null;
  sort_order: number;
  level?: string | null;
  gpa?: string | null;
  year?: string | null;
  status?: string | null;
}

interface EducationSectionProps {
  education: Education[];
  loadingEducation: boolean;
  error: string;
  educationMenuId: string | null;
  setEducationMenuId: Dispatch<SetStateAction<string | null>>;
  openEducationEditor: (education?: Education) => void;
  handleDeleteEducation: (id: string) => void;
}

export default function EducationSection({
  education,
  loadingEducation,
  error,
  educationMenuId,
  setEducationMenuId,
  openEducationEditor,
  handleDeleteEducation,
}: EducationSectionProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Content
          </p>
          <h2 className="font-serif text-2xl font-bold mt-1">
            Education
          </h2>
        </div>

        <button
          type="button"
          onClick={() => openEducationEditor()}
          className="px-4 py-2.5 bg-neutral-900 text-white text-xs font-medium rounded-xl hover:bg-neutral-800 transition-colors"
        >
          + Add Education
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {loadingEducation ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            Loading education...
          </p>
        </div>
      ) : education.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            No education entries found.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-visible">
          {education.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex items-start gap-4 ${
                index !== education.length - 1
                  ? "border-b border-neutral-100"
                  : ""
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-sm flex-shrink-0">
                E
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">
                    {item.degree}
                  </h3>

                  {item.is_current && (
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] text-neutral-500">
                      Current
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-500 mt-1">
                  {item.institution}
                </p>

                <p className="text-xs text-neutral-400 mt-1">
                  {item.field_of_study || item.level || ""}
                  {(item.year || item.status) &&
                    ` · ${item.year || item.status}`}
                </p>

                {(item.gpa || item.grade) && (
                  <p className="text-xs text-neutral-400 mt-1">
                    {item.gpa ? `GPA: ${item.gpa}` : `Grade: ${item.grade}`}
                  </p>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label={`Actions for ${item.degree}`}
                  aria-expanded={educationMenuId === item.id}
                  onClick={() =>
                    setEducationMenuId(
                      educationMenuId === item.id ? null : item.id
                    )
                  }
                  className="w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  •••
                </button>

                {educationMenuId === item.id && (
                  <div className="absolute right-0 top-11 z-30 w-32 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => openEducationEditor(item)}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteEducation(item.id)}
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