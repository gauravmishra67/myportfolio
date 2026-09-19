import type { Dispatch, SetStateAction } from "react";

export interface Goal {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  status?: string | null;
  sort_order: number;
}

interface GoalsSectionProps {
  goals: Goal[];
  loadingGoals: boolean;
  error: string;
  goalMenuId: string | null;
  setGoalMenuId: Dispatch<SetStateAction<string | null>>;
  openGoalEditor: (goal?: Goal) => void;
  handleDeleteGoal: (id: string) => void;
}

export default function GoalsSection({
  goals,
  loadingGoals,
  error,
  goalMenuId,
  setGoalMenuId,
  openGoalEditor,
  handleDeleteGoal,
}: GoalsSectionProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Content
          </p>

          <h2 className="font-serif text-2xl font-bold mt-1">
            Goals
          </h2>
        </div>

        <button
          type="button"
          onClick={() => openGoalEditor()}
          className="px-4 py-2.5 bg-neutral-900 text-white text-xs font-medium rounded-xl hover:bg-neutral-800 transition-colors"
        >
          + Add Goal
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {loadingGoals ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            Loading goals...
          </p>
        </div>
      ) : goals.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            No goals found.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-visible">
          {goals.map((goal, index) => (
            <div
              key={goal.id}
              className={`p-4 sm:p-5 flex items-start gap-4 ${
                index !== goals.length - 1
                  ? "border-b border-neutral-100"
                  : ""
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                G
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">
                    {goal.title}
                  </h3>

                  {goal.status && (
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] text-neutral-500">
                      {goal.status}
                    </span>
                  )}

                  {goal.category && (
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] text-neutral-500">
                      {goal.category}
                    </span>
                  )}
                </div>

                {goal.description && (
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {goal.description}
                  </p>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label={`Actions for ${goal.title}`}
                  aria-expanded={goalMenuId === goal.id}
                  onClick={() =>
                    setGoalMenuId(
                      goalMenuId === goal.id ? null : goal.id
                    )
                  }
                  className="w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  •••
                </button>

                {goalMenuId === goal.id && (
                  <div className="absolute right-0 top-11 z-30 w-32 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => openGoalEditor(goal)}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteGoal(goal.id)}
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