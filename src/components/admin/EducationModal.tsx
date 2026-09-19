import type { FormEvent } from "react";

interface EducationModalProps {
  editingEducationId: string | null;

  institution: string;
  setInstitution: (value: string) => void;

  degree: string;
  setDegree: (value: string) => void;

  fieldOfStudy: string;
  setFieldOfStudy: (value: string) => void;

  location: string;
  setLocation: (value: string) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  endDate: string;
  setEndDate: (value: string) => void;

  grade: string;
  setGrade: (value: string) => void;

  gpa: string;
  setGpa: (value: string) => void;

  level: string;
  setLevel: (value: string) => void;

  year: string;
  setYear: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  isCurrent: boolean;
  setIsCurrent: (value: boolean) => void;

  savingEducation: boolean;

  handleSaveEducation: (e: FormEvent<HTMLFormElement>) => void;
  resetEducationForm: () => void;
}

export default function EducationModal({
  editingEducationId,
  institution,
  setInstitution,
  degree,
  setDegree,
  fieldOfStudy,
  setFieldOfStudy,
  location,
  setLocation,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  grade,
  setGrade,
  gpa,
  setGpa,
  level,
  setLevel,
  year,
  setYear,
  status,
  setStatus,
  description,
  setDescription,
  isCurrent,
  setIsCurrent,
  savingEducation,
  handleSaveEducation,
  resetEducationForm,
}: EducationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingEducationId ? "Edit Education" : "Add Education"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingEducationId
                ? "Update the education information."
                : "Add a new education entry to your portfolio."}
            </p>
          </div>

          <button
            type="button"
            onClick={resetEducationForm}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSaveEducation}
          className="space-y-5 p-6"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Institution
              </label>

              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Degree
              </label>

              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Field of Study
              </label>

              <input
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={isCurrent}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none disabled:bg-gray-100 focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Grade
              </label>

              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="A / First Division"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                GPA
              </label>

              <input
                type="text"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                placeholder="3.7"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Level
              </label>

              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                placeholder="Bachelor's / Grade 12"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Year
              </label>

              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>

              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Completed / Ongoing"
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

          <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
            <input
              type="checkbox"
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
            />

            <div>
              <p className="text-sm font-medium text-gray-700">
                Currently studying here
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Leave the end date empty while this education is ongoing.
              </p>
            </div>
          </label>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={resetEducationForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={savingEducation}
              className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingEducation
                ? "Saving..."
                : editingEducationId
                  ? "Update Education"
                  : "Add Education"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}