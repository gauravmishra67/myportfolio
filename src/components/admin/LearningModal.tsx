import type { FormEvent } from "react";

interface LearningModalProps {
  editingLearningId: string | null;

  learningName: string;
  setLearningName: (value: string) => void;

  learningDescription: string;
  setLearningDescription: (value: string) => void;

  learningIcon: string;
  setLearningIcon: (value: string) => void;

  learningProgress: string;
  setLearningProgress: (value: string) => void;

  learningStatus: string;
  setLearningStatus: (value: string) => void;

  savingLearning: boolean;

  handleSaveLearning: (
    e: FormEvent<HTMLFormElement>
  ) => void;

  resetLearningForm: () => void;
}

export default function LearningModal({
  editingLearningId,
  learningName,
  setLearningName,
  learningDescription,
  setLearningDescription,
  learningIcon,
  setLearningIcon,
  learningProgress,
  setLearningProgress,
  learningStatus,
  setLearningStatus,
  savingLearning,
  handleSaveLearning,
  resetLearningForm,
}: LearningModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingLearningId
                ? "Edit Learning"
                : "Add Learning"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingLearningId
                ? "Update the learning information."
                : "Add a new learning entry."}
            </p>
          </div>

          <button
            type="button"
            onClick={resetLearningForm}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSaveLearning}
          className="space-y-5 p-6"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              value={learningName}
              onChange={(e) =>
                setLearningName(e.target.value)
              }
              placeholder="Godot 4.7"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>

            <input
              type="text"
              value={learningDescription}
              onChange={(e) =>
                setLearningDescription(e.target.value)
              }
              placeholder="Game Development"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Icon
            </label>

            <input
              type="text"
              value={learningIcon}
              onChange={(e) =>
                setLearningIcon(e.target.value)
              }
              placeholder="🎮"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Progress
            </label>

            <input
              type="number"
              min="0"
              max="100"
              value={learningProgress}
              onChange={(e) =>
                setLearningProgress(e.target.value)
              }
              placeholder="35"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />

            <p className="mt-1 text-xs text-gray-500">
              Enter a value from 0 to 100.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>

            <input
              type="text"
              value={learningStatus}
              onChange={(e) =>
                setLearningStatus(e.target.value)
              }
              placeholder="active"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={resetLearningForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={savingLearning}
              className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingLearning
                ? "Saving..."
                : editingLearningId
                  ? "Update Learning"
                  : "Add Learning"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}