import type { FormEvent } from "react";

interface SkillModalProps {
  editingSkillId: string | null;

  skillName: string;
  setSkillName: (value: string) => void;

  skillCategory: string;
  setSkillCategory: (value: string) => void;

  skillLevel: string;
  setSkillLevel: (value: string) => void;

  skillPercentage: string;
  setSkillPercentage: (value: string) => void;

  savingSkill: boolean;

  handleSaveSkill: (e: FormEvent<HTMLFormElement>) => void;
  resetSkillForm: () => void;
}

export default function SkillModal({
  editingSkillId,
  skillName,
  setSkillName,
  skillCategory,
  setSkillCategory,
  skillLevel,
  setSkillLevel,
  skillPercentage,
  setSkillPercentage,
  savingSkill,
  handleSaveSkill,
  resetSkillForm,
}: SkillModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingSkillId ? "Edit Skill" : "Add Skill"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingSkillId
                ? "Update the skill information."
                : "Add a new skill to your portfolio."}
            </p>
          </div>

          <button
            type="button"
            onClick={resetSkillForm}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSaveSkill}
          className="space-y-5 p-6"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Skill Name
            </label>

            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="React"
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
              value={skillCategory}
              onChange={(e) => setSkillCategory(e.target.value)}
              placeholder="Frontend Development"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Level
            </label>

            <input
              type="number"
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              placeholder="1-5"
              min="1"
              max="5"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Percentage
            </label>

            <input
              type="number"
              min="0"
              max="100"
              value={skillPercentage}
              onChange={(e) => setSkillPercentage(e.target.value)}
              placeholder="80"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />

            <p className="mt-1 text-xs text-gray-500">
              Enter a value from 0 to 100.
            </p>
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={resetSkillForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={savingSkill}
              className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingSkill
                ? "Saving..."
                : editingSkillId
                  ? "Update Skill"
                  : "Add Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}