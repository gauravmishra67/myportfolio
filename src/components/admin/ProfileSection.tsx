import type { FormEvent } from "react";

export interface Profile {
  id: string;
  name: string;
  short_name?: string | null;
  location?: string | null;
  title?: string | null;
  tagline?: string | null;
  email?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  profile_image?: string | null;
  logo?: string | null;
  about?: string | null;
}

interface ProfileSectionProps {
  profile: Profile | null;
  loadingProfile: boolean;
  error: string;

  profileName: string;
  setProfileName: (value: string) => void;

  profileShortName: string;
  setProfileShortName: (value: string) => void;

  profileLocation: string;
  setProfileLocation: (value: string) => void;

  profileTitle: string;
  setProfileTitle: (value: string) => void;

  profileTagline: string;
  setProfileTagline: (value: string) => void;

  profileEmail: string;
  setProfileEmail: (value: string) => void;

  profileGithub: string;
  setProfileGithub: (value: string) => void;

  profileLinkedin: string;
  setProfileLinkedin: (value: string) => void;

  profileImage: string;
  setProfileImage: (value: string) => void;

  profileLogo: string;
  setProfileLogo: (value: string) => void;

  profileAbout: string;
  setProfileAbout: (value: string) => void;

  savingProfile: boolean;
  handleSaveProfile: (e: FormEvent<HTMLFormElement>) => void;
}

export default function ProfileSection({
  profile,
  loadingProfile,
  error,
  profileName,
  setProfileName,
  profileShortName,
  setProfileShortName,
  profileLocation,
  setProfileLocation,
  profileTitle,
  setProfileTitle,
  profileTagline,
  setProfileTagline,
  profileEmail,
  setProfileEmail,
  profileGithub,
  setProfileGithub,
  profileLinkedin,
  setProfileLinkedin,
  profileImage,
  setProfileImage,
  profileLogo,
  setProfileLogo,
  profileAbout,
  setProfileAbout,
  savingProfile,
  handleSaveProfile,
}: ProfileSectionProps) {
  if (loadingProfile) {
    return (
      <section>
        <div className="mb-5">
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Content
          </p>

          <h2 className="font-serif text-2xl font-bold mt-1">
            Profile
          </h2>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            Loading profile...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
          Content
        </p>

        <h2 className="font-serif text-2xl font-bold mt-1">
          Profile
        </h2>

        <p className="text-sm text-neutral-500 mt-2">
          Manage the personal information displayed across your portfolio.
        </p>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSaveProfile}
        className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-7 space-y-6"
      >
        <div>
          <h3 className="font-serif text-lg font-bold">
            Basic Information
          </h3>

          <p className="text-xs text-neutral-400 mt-1">
            Your main identity and portfolio information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Short Name
            </label>

            <input
              type="text"
              value={profileShortName}
              onChange={(e) => setProfileShortName(e.target.value)}
              placeholder="GKM"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Location
            </label>

            <input
              type="text"
              value={profileLocation}
              onChange={(e) => setProfileLocation(e.target.value)}
              placeholder="Nepal"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Title
            </label>

            <input
              type="text"
              value={profileTitle}
              onChange={(e) => setProfileTitle(e.target.value)}
              placeholder="Engineering Student · UI/UX Designer · Fiction Writer"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-6">
          <h3 className="font-serif text-lg font-bold">
            Branding
          </h3>

          <p className="text-xs text-neutral-400 mt-1">
            Text used in the hero section and other portfolio areas.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tagline
            </label>

            <input
              type="text"
              value={profileTagline}
              onChange={(e) => setProfileTagline(e.target.value)}
              placeholder="Where engineering meets imagination."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              About
            </label>

            <textarea
              value={profileAbout}
              onChange={(e) => setProfileAbout(e.target.value)}
              rows={6}
              placeholder="Write your profile introduction..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 resize-none"
            />
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-6">
          <h3 className="font-serif text-lg font-bold">
            Contact & Social
          </h3>

          <p className="text-xs text-neutral-400 mt-1">
            Links and contact information shown on your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              GitHub URL
            </label>

            <input
              type="url"
              value={profileGithub}
              onChange={(e) => setProfileGithub(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              LinkedIn URL
            </label>

            <input
              type="url"
              value={profileLinkedin}
              onChange={(e) => setProfileLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-6">
          <h3 className="font-serif text-lg font-bold">
            Images
          </h3>

          <p className="text-xs text-neutral-400 mt-1">
            URLs for your profile image and portfolio logo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Profile Image URL
            </label>

            <input
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              placeholder="/profile.jpg"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Logo URL
            </label>

            <input
              type="text"
              value={profileLogo}
              onChange={(e) => setProfileLogo(e.target.value)}
              placeholder="/logo.jpg"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </div>
        </div>

        {profile && (
          <div className="rounded-xl bg-neutral-50 border border-neutral-100 px-4 py-3">
            <p className="text-xs text-neutral-400">
              Profile record loaded successfully.
            </p>
          </div>
        )}

        <div className="flex justify-end border-t border-neutral-100 pt-5">
          <button
            type="submit"
            disabled={savingProfile}
            className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingProfile ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </section>
  );
}