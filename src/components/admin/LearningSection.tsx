import type { Dispatch, SetStateAction } from "react";

export interface Learning {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress?: number | null;
  status: string;
  sort_order: number;
}

interface LearningSectionProps {
  learning: Learning[];
  loadingLearning: boolean;
  error: string;
  learningMenuId: string | null;
  setLearningMenuId: Dispatch<SetStateAction<string | null>>;
  openLearningEditor: (item?: Learning) => void;
  handleDeleteLearning: (id: string) => void;
}

export default function LearningSection({
  learning,
  loadingLearning,
  error,
  learningMenuId,
  setLearningMenuId,
  openLearningEditor,
  handleDeleteLearning,
}: LearningSectionProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Content
          </p>

          <h2 className="font-serif text-2xl font-bold mt-1">
            Learning
          </h2>
        </div>

        <button
          type="button"
          onClick={() => openLearningEditor()}
          className="px-4 py-2.5 bg-neutral-900 text-white text-xs font-medium rounded-xl hover:bg-neutral-800 transition-colors"
        >
          + Add Learning
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {loadingLearning ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            Loading learning entries...
          </p>
        </div>
      ) : learning.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            No learning entries found.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-visible">
          {learning.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex items-center gap-4 ${
                index !== learning.length - 1
                  ? "border-b border-neutral-100"
                  : ""
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                L
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">
                    {item.name}
                  </h3>

                  {item.status && (
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] text-neutral-500">
                      {item.status}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-500 mt-1">
                  {item.description}
                </p>

                {item.progress !== null &&
                  item.progress !== undefined && (
                    <div className="mt-3 max-w-md">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-neutral-400">
                          Progress
                        </span>

                        <span className="text-[10px] text-neutral-500">
                          {item.progress}%
                        </span>
                      </div>

                      <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-visible">
                        <div
                          className="h-full rounded-full bg-neutral-900"
                          style={{
                            width: `${Math.min(
                              Math.max(item.progress, 0),
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label={`Actions for ${item.name}`}
                  aria-expanded={learningMenuId === item.id}
                  onClick={() =>
                    setLearningMenuId(
                      learningMenuId === item.id ? null : item.id
                    )
                  }
                  className="w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  •••
                </button>

                {learningMenuId === item.id && (
                  <div className="absolute right-0 top-11 z-30 w-32 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => openLearningEditor(item)}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteLearning(item.id)}
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