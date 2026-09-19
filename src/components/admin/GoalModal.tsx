import type { FormEvent } from "react";

interface GoalModalProps {
  editingGoalId: string | null;

  goalTitle: string;
  setGoalTitle: (value: string) => void;

  goalCategory: string;
  setGoalCategory: (value: string) => void;

  goalDescription: string;
  setGoalDescription: (value: string) => void;

  goalStatus: string;
  setGoalStatus: (value: string) => void;

  savingGoal: boolean;

  handleSaveGoal: (e: FormEvent<HTMLFormElement>) => void;
  resetGoalForm: () => void;
}

export default function GoalModal({
  editingGoalId,
  goalTitle,
  setGoalTitle,
  goalCategory,
  setGoalCategory,
  goalDescription,
  setGoalDescription,
  goalStatus,
  setGoalStatus,
  savingGoal,
  handleSaveGoal,
  resetGoalForm,
}: GoalModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingGoalId ? "Edit Goal" : "Add Goal"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingGoalId
                ? "Update the goal information."
                : "Add a new goal to your portfolio."}
            </p>
          </div>

          <button
            type="button"
            onClick={resetGoalForm}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSaveGoal}
          className="space-y-5 p-6"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Goal Title
            </label>

            <input
              type="text"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              placeholder="Build an AI-powered application"
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
              value={goalCategory}
              onChange={(e) => setGoalCategory(e.target.value)}
              placeholder="Career / Technology / Personal"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              value={goalDescription}
              onChange={(e) => setGoalDescription(e.target.value)}
              rows={5}
              placeholder="Describe what you want to achieve..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 resize-none"
            />
          </div>

          <div>
           <label className="mb-1 block text-sm font-medium text-gray-700">
             Status
           </label>

           <select
             value={goalStatus}
             onChange={(e) => setGoalStatus(e.target.value)}
             className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            >
              <option value="">Select status</option>
              <option value="completed">Completed</option>
              <option value="current">Current</option>
              <option value="future">Future</option>
            </select>
           </div>
          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={resetGoalForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={savingGoal}
              className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingGoal
                ? "Saving..."
                : editingGoalId
                  ? "Update Goal"
                  : "Add Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}