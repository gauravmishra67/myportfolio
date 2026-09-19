import type { Dispatch, SetStateAction } from "react";

export interface Skill {
  id: string;
  name: string;
  category: string;
  level?: number | null;
  proficiency?: number | null;
  sort_order: number;
}

interface SkillsSectionProps {
  skills: Skill[];
  loadingSkills: boolean;
  error: string;
  skillMenuId: string | null;
  setSkillMenuId: Dispatch<SetStateAction<string | null>>;
  openSkillEditor: (skill?: Skill) => void;
  handleDeleteSkill: (id: string) => void;
}

export default function SkillsSection({
  skills,
  loadingSkills,
  error,
  skillMenuId,
  setSkillMenuId,
  openSkillEditor,
  handleDeleteSkill,
}: SkillsSectionProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Content
          </p>

          <h2 className="font-serif text-2xl font-bold mt-1">
            Skills
          </h2>
        </div>

        <button
          type="button"
          onClick={() => openSkillEditor()}
          className="px-4 py-2.5 bg-neutral-900 text-white text-xs font-medium rounded-xl hover:bg-neutral-800 transition-colors"
        >
          + Add Skill
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {loadingSkills ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            Loading skills...
          </p>
        </div>
      ) : skills.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            No skills found.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-visible">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className={`p-4 sm:p-5 flex items-center gap-4 ${
                index !== skills.length - 1
                  ? "border-b border-neutral-100"
                  : ""
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                S
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">
                    {skill.name}
                  </h3>

                  {skill.category && (
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] text-neutral-500">
                      {skill.category}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-2">
                  {skill.level && (
                    <p className="text-xs text-neutral-400">
                      {skill.level}
                    </p>
                  )}

                  {skill.proficiency !== null &&
                    skill.proficiency !== undefined && (
                      <p className="text-xs text-neutral-400">
                        {skill.proficiency}%
                      </p>
                    )}
                </div>

                {skill.proficiency !== null &&
                  skill.proficiency  !== undefined && (
                    <div className="mt-2 h-1.5 w-full max-w-xs rounded-full bg-neutral-100 overflow-visible">
                      <div
                        className="h-full rounded-full bg-neutral-900"
                        style={{
                          width: `${Math.min(
                            Math.max(skill.proficiency , 0),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label={`Actions for ${skill.name}`}
                  aria-expanded={skillMenuId === skill.id}
                  onClick={() =>
                    setSkillMenuId(
                      skillMenuId === skill.id ? null : skill.id
                    )
                  }
                  className="w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  •••
                </button>

                {skillMenuId === skill.id && (
                  <div className="absolute right-0 top-11 z-30 w-32 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => openSkillEditor(skill)}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill.id)}
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