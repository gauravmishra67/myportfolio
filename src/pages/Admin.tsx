import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import DashboardSection from "../components/admin/DashboardSection";

import ProjectsSection, {
  type Project,
} from "../components/admin/ProjectsSection";
import ProjectModal from "../components/admin/ProjectModal";

import EducationSection, {
  type Education,
} from "../components/admin/EducationSection";
import EducationModal from "../components/admin/EducationModal";

import SkillsSection, {
  type Skill,
} from "../components/admin/SkillsSection";
import SkillModal from "../components/admin/SkillModal";

import ExperienceSection, {
  type Experience,
} from "../components/admin/ExperienceSection";
import ExperienceModal from "../components/admin/ExperienceModal";

import CertificatesSection, {
  type Certificate,
} from "../components/admin/CertificatesSection";
import CertificateModal from "../components/admin/CertificateModal";

import LearningSection, {
  type Learning,
} from "../components/admin/LearningSection";
import LearningModal from "../components/admin/LearningModal";

import GoalsSection, {
  type Goal,
} from "../components/admin/GoalsSection";
import GoalModal from "../components/admin/GoalModal";

import ProfileSection, {
  type Profile,
} from "../components/admin/ProfileSection";

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [activeSection, setActiveSection] = useState("dashboard");

  // =========================================================
  // PROJECTS
  // =========================================================

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectMenuId, setProjectMenuId] = useState<string | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null
  );
  const [savingProject, setSavingProject] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(
    null
  );

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [year, setYear] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [image, setImage] = useState("");
  const [clientProject, setClientProject] = useState(false);
  const [sourceCodeAvailable, setSourceCodeAvailable] = useState(false);
  const [isNovel, setIsNovel] = useState(false);
  const [featured, setFeatured] = useState(false);

  // =========================================================
  // EDUCATION
  // =========================================================

  const [education, setEducation] = useState<Education[]>([]);
  const [loadingEducation, setLoadingEducation] = useState(true);
  const [educationMenuId, setEducationMenuId] = useState<string | null>(null);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(
    null
  );
  const [savingEducation, setSavingEducation] = useState(false);

  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [gpa, setGpa] = useState("");
  const [level, setLevel] = useState("");
  const [educationYear, setEducationYear] = useState("");
  const [educationStatus, setEducationStatus] = useState("");
  const [educationDescription, setEducationDescription] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);

  // =========================================================
  // SKILLS
  // =========================================================

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [skillMenuId, setSkillMenuId] = useState<string | null>(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [savingSkill, setSavingSkill] = useState(false);

  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [skillPercentage, setSkillPercentage] = useState("");

  // =========================================================
  // EXPERIENCE
  // =========================================================

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loadingExperience, setLoadingExperience] = useState(true);
  const [experienceMenuId, setExperienceMenuId] = useState<string | null>(
    null
  );
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(
    null
  );
  const [savingExperience, setSavingExperience] = useState(false);

  const [experienceRole, setExperienceRole] = useState("");
  const [experienceOrganization, setExperienceOrganization] = useState("");
  const [experienceYear, setExperienceYear] = useState("");
  const [experienceType, setExperienceType] = useState("");
  const [experienceResponsibilities, setExperienceResponsibilities] =
    useState("");

  // =========================================================
  // CERTIFICATES
  // =========================================================

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loadingCertificates, setLoadingCertificates] = useState(true);
  const [certificateMenuId, setCertificateMenuId] = useState<string | null>(
    null
  );
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [editingCertificateId, setEditingCertificateId] = useState<
    string | null
  >(null);
  const [savingCertificate, setSavingCertificate] = useState(false);

  const [certificateTitle, setCertificateTitle] = useState("");
  const [certificateIssuer, setCertificateIssuer] = useState("");
  const [certificateIssueDate, setCertificateIssueDate] = useState("");
  const [certificateCredentialUrl, setCertificateCredentialUrl] =
    useState("");
  const [certificateImage, setCertificateImage] = useState("");

  // =========================================================
  // LEARNING
  // =========================================================

  const [learning, setLearning] = useState<Learning[]>([]);
  const [loadingLearning, setLoadingLearning] = useState(true);
  const [learningMenuId, setLearningMenuId] = useState<string | null>(null);
  const [showLearningModal, setShowLearningModal] = useState(false);
  const [editingLearningId, setEditingLearningId] = useState<string | null>(
    null
  );
  const [savingLearning, setSavingLearning] = useState(false);

  const [learningName, setLearningName] = useState("");
  const [learningDescription, setLearningDescription] = useState("");
  const [learningIcon, setLearningIcon] = useState("");
  const [learningProgress, setLearningProgress] = useState("");
  const [learningStatus, setLearningStatus] = useState("active");

  // =========================================================
  // GOALS
  // =========================================================

  const [goals, setGoals] = useState<Goal[]>([]);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [goalMenuId, setGoalMenuId] = useState<string | null>(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [savingGoal, setSavingGoal] = useState(false);

  const [goalTitle, setGoalTitle] = useState("");
  const [goalCategory, setGoalCategory] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalStatus, setGoalStatus] = useState("");

  // =========================================================
  // PROFILE
  // =========================================================

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  const [profileName, setProfileName] = useState("");
  const [profileShortName, setProfileShortName] = useState("");
  const [profileLocation, setProfileLocation] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [profileTagline, setProfileTagline] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileGithub, setProfileGithub] = useState("");
  const [profileLinkedin, setProfileLinkedin] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileLogo, setProfileLogo] = useState("");
  const [profileAbout, setProfileAbout] = useState("");

  // =========================================================
  // MESSAGES
  // =========================================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // AUTH
  // =========================================================

  useEffect(() => {
  let mounted = true;

  const checkAdmin = async (email: string | undefined) => {
    if (!email) {
      if (mounted) {
        setIsAdmin(false);
      }
      return;
    }

    const { data, error: adminError } = await supabase
      .from("admin_users")
      .select("role")
      .eq("email", email)
      .maybeSingle();

    if (!mounted) return;

    if (adminError) {
      setError(adminError.message);
      setIsAdmin(false);
      return;
    }

    setIsAdmin(data?.role === "admin");
  };

  const getSession = async () => {
    const { data, error: sessionError } =
      await supabase.auth.getSession();

    if (!mounted) return;

    if (sessionError) {
      setError(sessionError.message);
      setSession(null);
      setIsAdmin(false);
      setAuthLoading(false);
      return;
    }

    setSession(data.session);

    await checkAdmin(data.session?.user.email);

    setAuthLoading(false);
  };

  getSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    async (_event, currentSession) => {
      setSession(currentSession);

      await checkAdmin(currentSession?.user.email);
    }
  );

  return () => {
    mounted = false;
    subscription.unsubscribe();
  };
}, []);

  // =========================================================
  // LOAD PROJECTS
  // =========================================================

  const loadProjects = async () => {
    setLoadingProjects(true);

    const { data, error: loadError } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (loadError) {
      setError(loadError.message);
    } else {
      setProjects((data ?? []) as Project[]);
    }

    setLoadingProjects(false);
  };

  // =========================================================
  // LOAD EDUCATION
  // =========================================================

  const loadEducation = async () => {
    setLoadingEducation(true);

    const { data, error: loadError } = await supabase
      .from("education")
      .select("*")
      .order("sort_order", { ascending: true });

    if (loadError) {
      setError(loadError.message);
    } else {
      setEducation((data ?? []) as Education[]);
    }

    setLoadingEducation(false);
  };

  // =========================================================
  // LOAD SKILLS
  // =========================================================

  const loadSkills = async () => {
    setLoadingSkills(true);

    const { data, error: loadError } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: true });

    if (loadError) {
      setError(loadError.message);
    } else {
      setSkills((data ?? []) as Skill[]);
    }

    setLoadingSkills(false);
  };

  // =========================================================
  // LOAD EXPERIENCE
  // =========================================================

  const loadExperience = async () => {
    setLoadingExperience(true);

    const { data, error: loadError } = await supabase
      .from("experience")
      .select("*")
      .order("sort_order", { ascending: true });

    if (loadError) {
      setError(loadError.message);
    } else {
      setExperiences((data ?? []) as Experience[]);
    }

    setLoadingExperience(false);
  };

  // =========================================================
  // LOAD CERTIFICATES
  // =========================================================

  const loadCertificates = async () => {
    setLoadingCertificates(true);

    const { data, error: loadError } = await supabase
      .from("certificates")
      .select("*")
      .order("sort_order", { ascending: true });

    if (loadError) {
      setError(loadError.message);
    } else {
      setCertificates((data ?? []) as Certificate[]);
    }

    setLoadingCertificates(false);
  };

  // =========================================================
  // LOAD LEARNING
  // =========================================================

  const loadLearning = async () => {
    setLoadingLearning(true);

    const { data, error: loadError } = await supabase
      .from("learning")
      .select("*")
      .order("sort_order", { ascending: true });

    if (loadError) {
      setError(loadError.message);
    } else {
      setLearning((data ?? []) as Learning[]);
    }

    setLoadingLearning(false);
  };

  // =========================================================
  // LOAD GOALS
  // =========================================================

  const loadGoals = async () => {
    setLoadingGoals(true);

    const { data, error: loadError } = await supabase
      .from("goals")
      .select("*")
      .order("sort_order", { ascending: true });

    if (loadError) {
      setError(loadError.message);
    } else {
      setGoals((data ?? []) as Goal[]);
    }

    setLoadingGoals(false);
  };

  // =========================================================
  // LOAD PROFILE
  // =========================================================

  const loadProfile = async () => {
    setLoadingProfile(true);

    const { data, error: loadError } = await supabase
      .from("profile")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (loadError) {
      setError(loadError.message);
    } else if (data) {
      const loadedProfile = data as Profile;

      setProfile(loadedProfile);

      setProfileName(loadedProfile.name ?? "");
      setProfileShortName(loadedProfile.short_name ?? "");
      setProfileLocation(loadedProfile.location ?? "");
      setProfileTitle(loadedProfile.title ?? "");
      setProfileTagline(loadedProfile.tagline ?? "");
      setProfileEmail(loadedProfile.email ?? "");
      setProfileGithub(loadedProfile.github_url ?? "");
      setProfileLinkedin(loadedProfile.linkedin_url ?? "");
      setProfileImage(loadedProfile.profile_image ?? "");
      setProfileLogo(loadedProfile.logo ?? "");
      setProfileAbout(loadedProfile.about ?? "");
    }

    setLoadingProfile(false);
  };

  // =========================================================
  // LOAD ALL ADMIN DATA
  // =========================================================

  useEffect(() => {
    if (!session) return;

    loadProjects();
    loadEducation();
    loadSkills();
    loadExperience();
    loadCertificates();
    loadLearning();
    loadGoals();
    loadProfile();
  }, [session]);

  // =========================================================
  // PROJECT CRUD
  // =========================================================

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setTitle("");
    setCategory("");
    setDescription("");
    setTechnologies("");
    setYear("");
    setLiveUrl("");
    setGithubUrl("");
    setImage("");
    setClientProject(false);
    setSourceCodeAvailable(false);
    setIsNovel(false);
    setFeatured(false);
    setShowProjectModal(false);
  };

  const openAddProject = () => {
    resetProjectForm();
    setShowProjectModal(true);
  };

  const openEditProject = (projectId: string) => {
    const project = projects.find((item) => item.id === projectId);

    if (!project) return;

    setEditingProjectId(project.id);
    setTitle(project.title ?? "");
    setCategory(project.category ?? "");
    setDescription(project.description ?? "");
    setTechnologies(project.technologies?.join(", ") ?? "");
    setYear(project.year ?? "");
    setLiveUrl(project.live_url ?? "");
    setGithubUrl(project.github_url ?? "");
    setImage(project.image ?? "");
    setClientProject(project.client_project ?? false);
    setSourceCodeAvailable(project.source_code_available ?? false);
    setIsNovel(project.is_novel ?? false);
    setFeatured(project.featured ?? false);

    setProjectMenuId(null);
    setShowProjectModal(true);
  };

  const handleSaveProject = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSavingProject(true);
    setError("");
    setSuccess("");

    const technologyArray = technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const projectData = {
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      technologies: technologyArray,
      year: year.trim(),
      live_url: liveUrl.trim() || null,
      github_url: githubUrl.trim() || null,
      image: image.trim() || null,
      client_project: clientProject,
      source_code_available: sourceCodeAvailable,
      is_novel: isNovel,
      featured,
    };

    if (editingProjectId) {
      const { error: updateError } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingProjectId);

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess("Project updated successfully.");
        await loadProjects();
        resetProjectForm();
      }
    } else {
      const nextSortOrder =
        projects.length > 0
          ? Math.max(
              ...projects.map(
                (project) => project.sort_order ?? 0
              )
            ) + 1
          : 1;

      const { error: insertError } = await supabase
        .from("projects")
        .insert({
          ...projectData,
          sort_order: nextSortOrder,
        });

      if (insertError) {
        setError(insertError.message);
      } else {
        setSuccess("Project added successfully.");
        await loadProjects();
        resetProjectForm();
      }
    }

    setSavingProject(false);
  };

  const handleDeleteProject = async (projectId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    setDeletingProjectId(projectId);
    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      setSuccess("Project deleted successfully.");
      setProjectMenuId(null);
      await loadProjects();
    }

    setDeletingProjectId(null);
  };

  // =========================================================
  // EDUCATION CRUD
  // =========================================================

  const resetEducationForm = () => {
    setEditingEducationId(null);
    setInstitution("");
    setDegree("");
    setFieldOfStudy("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setGrade("");
    setGpa("");
    setLevel("");
    setEducationYear("");
    setEducationStatus("");
    setEducationDescription("");
    setIsCurrent(false);
    setShowEducationModal(false);
  };

  const openEducationEditor = (item?: Education) => {
    if (item) {
      setEditingEducationId(item.id);
      setInstitution(item.institution ?? "");
      setDegree(item.degree ?? "");
      setFieldOfStudy(item.field_of_study ?? "");
      setLocation(item.location ?? "");
      setStartDate(item.start_date ?? "");
      setEndDate(item.end_date ?? "");
      setGrade(item.grade ?? "");
      setGpa(item.gpa ?? "");
      setLevel(item.level ?? "");
      setEducationYear(item.year ?? "");
      setEducationStatus(item.status ?? "");
      setEducationDescription(item.description ?? "");
      setIsCurrent(item.is_current ?? false);
    } else {
      resetEducationForm();
    }

    setEducationMenuId(null);
    setShowEducationModal(true);
  };

  const handleSaveEducation = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSavingEducation(true);
    setError("");
    setSuccess("");

    const educationData = {
      institution: institution.trim(),
      degree: degree.trim(),
      field_of_study: fieldOfStudy.trim() || null,
      location: location.trim() || null,
      start_date: startDate || null,
      end_date: isCurrent ? null : endDate || null,
      grade: grade.trim() || null,
      gpa: gpa.trim() || null,
      level: level.trim() || null,
      year: educationYear.trim() || null,
      status: educationStatus.trim() || null,
      description: educationDescription.trim() || null,
      is_current: isCurrent,
    };

    if (editingEducationId) {
      const { error: updateError } = await supabase
        .from("education")
        .update(educationData)
        .eq("id", editingEducationId);

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess("Education updated successfully.");
        await loadEducation();
        resetEducationForm();
      }
    } else {
      const nextSortOrder =
        education.length > 0
          ? Math.max(
              ...education.map(
                (item) => item.sort_order ?? 0
              )
            ) + 1
          : 1;

      const { error: insertError } = await supabase
        .from("education")
        .insert({
          ...educationData,
          sort_order: nextSortOrder,
        });

      if (insertError) {
        setError(insertError.message);
      } else {
        setSuccess("Education added successfully.");
        await loadEducation();
        resetEducationForm();
      }
    }

    setSavingEducation(false);
  };

  const handleDeleteEducation = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education entry?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("education")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      setSuccess("Education deleted successfully.");
      setEducationMenuId(null);
      await loadEducation();
    }
  };

  // =========================================================
  // SKILLS CRUD
  // =========================================================

  const resetSkillForm = () => {
    setEditingSkillId(null);
    setSkillName("");
    setSkillCategory("");
    setSkillLevel("");
    setSkillPercentage("");
    setShowSkillModal(false);
  };

  const openSkillEditor = (skill?: Skill) => {
    if (skill) {
      setEditingSkillId(skill.id);
      setSkillName(skill.name ?? "");
      setSkillCategory(skill.category ?? "");
      setSkillLevel(
        skill.level !== null && skill.level !== undefined
          ? String(skill.level)
          : ""
        );
      setSkillPercentage(
        skill.proficiency !== null &&
          skill.proficiency !== undefined
          ? String(skill.proficiency)
          : ""
      );
    } else {
      resetSkillForm();
    }

    setSkillMenuId(null);
    setShowSkillModal(true);
  };

  const handleSaveSkill = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSavingSkill(true);
    setError("");
    setSuccess("");

    const parsedPercentage =
      skillPercentage.trim() === ""
        ? null
        : Number(skillPercentage);

    const parsedLevel =
     skillLevel.trim() === ""
      ? null
      : Number(skillLevel);

    const skillData = {
     name: skillName.trim(),
     category: skillCategory.trim(),
     level:
     parsedLevel !== null && Number.isFinite(parsedLevel)
      ? parsedLevel
      : null,
     proficiency:
      parsedPercentage !== null &&
      Number.isFinite(parsedPercentage)
       ? parsedPercentage
       : null,
    };

    if (editingSkillId) {
      const { error: updateError } = await supabase
        .from("skills")
        .update(skillData)
        .eq("id", editingSkillId);

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess("Skill updated successfully.");
        await loadSkills();
        resetSkillForm();
      }
    } else {
      const nextSortOrder =
        skills.length > 0
          ? Math.max(
              ...skills.map(
                (skill) => skill.sort_order ?? 0
              )
            ) + 1
          : 1;

      const { error: insertError } = await supabase
        .from("skills")
        .insert({
          ...skillData,
          sort_order: nextSortOrder,
        });

      if (insertError) {
        setError(insertError.message);
      } else {
        setSuccess("Skill added successfully.");
        await loadSkills();
        resetSkillForm();
      }
    }

    setSavingSkill(false);
  };

  const handleDeleteSkill = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      setSuccess("Skill deleted successfully.");
      setSkillMenuId(null);
      await loadSkills();
    }
  };

  // =========================================================
  // EXPERIENCE CRUD
  // =========================================================

  const resetExperienceForm = () => {
    setEditingExperienceId(null);
    setExperienceRole("");
    setExperienceOrganization("");
    setExperienceYear("");
    setExperienceType("");
    setExperienceResponsibilities("");
    setShowExperienceModal(false);
  };

  const openExperienceEditor = (experience?: Experience) => {
    if (experience) {
      setEditingExperienceId(experience.id);
      setExperienceRole(experience.role ?? "");
      setExperienceOrganization(experience.organization ?? "");
      setExperienceYear(experience.year ?? "");
      setExperienceType(experience.employment_type ?? "");
      setExperienceResponsibilities(
        experience.responsibilities?.join("\n") ?? ""
      );
    } else {
      resetExperienceForm();
    }

    setExperienceMenuId(null);
    setShowExperienceModal(true);
  };

  const handleSaveExperience = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSavingExperience(true);
    setError("");
    setSuccess("");

    const responsibilities = experienceResponsibilities
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const experienceData = {
      role: experienceRole.trim(),
      organization: experienceOrganization.trim(),
      year: experienceYear.trim() || null,
      employment_type: experienceType.trim() || null,
      responsibilities,
    };

    if (editingExperienceId) {
      const { error: updateError } = await supabase
        .from("experience")
        .update(experienceData)
        .eq("id", editingExperienceId);

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess("Experience updated successfully.");
        await loadExperience();
        resetExperienceForm();
      }
    } else {
      const nextSortOrder =
        experiences.length > 0
          ? Math.max(
              ...experiences.map(
                (experience) =>
                  experience.sort_order ?? 0
              )
            ) + 1
          : 1;

      const { error: insertError } = await supabase
        .from("experience")
        .insert({
          ...experienceData,
          sort_order: nextSortOrder,
        });

      if (insertError) {
        setError(insertError.message);
      } else {
        setSuccess("Experience added successfully.");
        await loadExperience();
        resetExperienceForm();
      }
    }

    setSavingExperience(false);
  };

  const handleDeleteExperience = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("experience")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      setSuccess("Experience deleted successfully.");
      setExperienceMenuId(null);
      await loadExperience();
    }
  };

  // =========================================================
  // CERTIFICATE CRUD
  // =========================================================

  const resetCertificateForm = () => {
    setEditingCertificateId(null);
    setCertificateTitle("");
    setCertificateIssuer("");
    setCertificateIssueDate("");
    setCertificateCredentialUrl("");
    setCertificateImage("");
    setShowCertificateModal(false);
  };

  const openCertificateEditor = (
    certificate?: Certificate
  ) => {
    if (certificate) {
      setEditingCertificateId(certificate.id);
      setCertificateTitle(certificate.title ?? "");
      setCertificateIssuer(certificate.issuer ?? "");
      setCertificateIssueDate(
        certificate.issue_date ?? ""
      );
      setCertificateCredentialUrl(
        certificate.credential_url ?? ""
      );
      setCertificateImage(certificate.image ?? "");
    } else {
      resetCertificateForm();
    }

    setCertificateMenuId(null);
    setShowCertificateModal(true);
  };

  const handleSaveCertificate = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSavingCertificate(true);
    setError("");
    setSuccess("");

    const certificateData = {
      title: certificateTitle.trim(),
      issuer: certificateIssuer.trim(),
      issue_date:
        certificateIssueDate.trim() || null,
      credential_url:
        certificateCredentialUrl.trim() || null,
      image: certificateImage.trim() || null,
    };

    if (editingCertificateId) {
      const { error: updateError } = await supabase
        .from("certificates")
        .update(certificateData)
        .eq("id", editingCertificateId);

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess("Certificate updated successfully.");
        await loadCertificates();
        resetCertificateForm();
      }
    } else {
      const nextSortOrder =
        certificates.length > 0
          ? Math.max(
              ...certificates.map(
                (certificate) =>
                  certificate.sort_order ?? 0
              )
            ) + 1
          : 1;

      const { error: insertError } = await supabase
        .from("certificates")
        .insert({
          ...certificateData,
          sort_order: nextSortOrder,
        });

      if (insertError) {
        setError(insertError.message);
      } else {
        setSuccess("Certificate added successfully.");
        await loadCertificates();
        resetCertificateForm();
      }
    }

    setSavingCertificate(false);
  };

  const handleDeleteCertificate = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("certificates")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      setSuccess("Certificate deleted successfully.");
      setCertificateMenuId(null);
      await loadCertificates();
    }
  };

  // =========================================================
// LEARNING CRUD
// =========================================================

const resetLearningForm = () => {
  setEditingLearningId(null);
  setLearningName("");
  setLearningDescription("");
  setLearningIcon("");
  setLearningProgress("");
  setLearningStatus("active");
  setShowLearningModal(false);
};

const openLearningEditor = (item?: Learning) => {
  if (item) {
    setEditingLearningId(item.id);
    setLearningName(item.name ?? "");
    setLearningDescription(item.description ?? "");
    setLearningIcon(item.icon ?? "");
    setLearningProgress(
      item.progress !== null && item.progress !== undefined
        ? String(item.progress)
        : ""
    );
    setLearningStatus(item.status ?? "active");
  } else {
    resetLearningForm();
  }

  setLearningMenuId(null);
  setShowLearningModal(true);
};

const handleSaveLearning = async (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setSavingLearning(true);
  setError("");
  setSuccess("");

  const parsedProgress =
    learningProgress.trim() === ""
      ? null
      : Number(learningProgress);

  const learningData = {
    name: learningName.trim(),
    description: learningDescription.trim(),
    icon: learningIcon.trim(),
    progress:
      parsedProgress !== null &&
      Number.isFinite(parsedProgress)
        ? parsedProgress
        : null,
    status: learningStatus.trim() || "active",
  };

  if (editingLearningId) {
    const { error: updateError } = await supabase
      .from("learning")
      .update(learningData)
      .eq("id", editingLearningId);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess("Learning entry updated successfully.");
      await loadLearning();
      resetLearningForm();
    }
  } else {
    const nextSortOrder =
      learning.length > 0
        ? Math.max(
            ...learning.map(
              (item) => item.sort_order ?? 0
            )
          ) + 1
        : 1;

    const { error: insertError } = await supabase
      .from("learning")
      .insert({
        ...learningData,
        sort_order: nextSortOrder,
      });

    if (insertError) {
      setError(insertError.message);
    } else {
      setSuccess("Learning entry added successfully.");
      await loadLearning();
      resetLearningForm();
    }
  }

  setSavingLearning(false);
};

const handleDeleteLearning = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this learning entry?"
  );

  if (!confirmed) return;

  setError("");
  setSuccess("");

  const { error: deleteError } = await supabase
    .from("learning")
    .delete()
    .eq("id", id);

  if (deleteError) {
    setError(deleteError.message);
  } else {
    setSuccess("Learning entry deleted successfully.");
    setLearningMenuId(null);
    await loadLearning();
  }
};
  // =========================================================
  // GOALS CRUD
  // =========================================================

  const resetGoalForm = () => {
    setEditingGoalId(null);
    setGoalTitle("");
    setGoalCategory("");
    setGoalDescription("");
    setGoalStatus("");
    setShowGoalModal(false);
  };

  const openGoalEditor = (goal?: Goal) => {
    if (goal) {
      setEditingGoalId(goal.id);
      setGoalTitle(goal.title ?? "");
      setGoalCategory(goal.category ?? "");
      setGoalDescription(goal.description ?? "");
      setGoalStatus(goal.status ?? "");
    } else {
      resetGoalForm();
    }

    setGoalMenuId(null);
    setShowGoalModal(true);
  };

  const handleSaveGoal = async (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setSavingGoal(true);
  setError("");
  setSuccess("");

  const selectedStatus = goalStatus.trim().toLowerCase();

  const goalData = {
    title: goalTitle.trim(),
    category: goalCategory.trim() || null,
    description: goalDescription.trim() || null,
    status: goalStatus.trim() || null,
  };

  let savedGoalId = editingGoalId;

  // -----------------------------------
  // SAVE / UPDATE THE GOAL
  // -----------------------------------

  if (editingGoalId) {
    const { error: updateError } = await supabase
      .from("goals")
      .update(goalData)
      .eq("id", editingGoalId);

    if (updateError) {
      setError(updateError.message);
      setSavingGoal(false);
      return;
    }
  } else {
    const nextSortOrder =
      goals.length > 0
        ? Math.max(
            ...goals.map(
              (goal) => goal.sort_order ?? 0
            )
          ) + 1
        : 1;

    const { data: newGoal, error: insertError } =
      await supabase
        .from("goals")
        .insert({
          ...goalData,
          sort_order: nextSortOrder,
        })
        .select("id")
        .single();

    if (insertError) {
      setError(insertError.message);
      setSavingGoal(false);
      return;
    }

    savedGoalId = newGoal.id;
  }

  // -----------------------------------
  // IF THIS GOAL IS CURRENT
  // AUTOMATICALLY SET THE OTHER GOALS
  // -----------------------------------

  if (
    selectedStatus === "current" &&
    savedGoalId
  ) {
    // Get the freshly saved goal directly
    // from Supabase.
    const { data: currentGoal, error: currentGoalError } =
      await supabase
        .from("goals")
        .select("id, sort_order")
        .eq("id", savedGoalId)
        .single();

    if (currentGoalError || !currentGoal) {
      setError(
        currentGoalError?.message ||
          "Could not find the saved goal."
      );
      setSavingGoal(false);
      return;
    }

    const currentSortOrder =
      currentGoal.sort_order ?? 0;

    // Goals BEFORE the current goal = COMPLETED
    const { error: completedError } = await supabase
      .from("goals")
      .update({ status: "completed" })
      .lt("sort_order", currentSortOrder)
      .neq("id", savedGoalId);

    if (completedError) {
      setError(completedError.message);
      setSavingGoal(false);
      return;
    }

    // Goals AFTER the current goal = FUTURE
    const { error: futureError } = await supabase
      .from("goals")
      .update({ status: "future" })
      .gt("sort_order", currentSortOrder)
      .neq("id", savedGoalId);

    if (futureError) {
      setError(futureError.message);
      setSavingGoal(false);
      return;
    }

    // Make absolutely sure the selected goal
    // is CURRENT.
    const { error: currentError } = await supabase
      .from("goals")
      .update({ status: "current" })
      .eq("id", savedGoalId);

    if (currentError) {
      setError(currentError.message);
      setSavingGoal(false);
      return;
    }
  }

  setSuccess(
    editingGoalId
      ? "Goal updated successfully."
      : "Goal added successfully."
  );

  await loadGoals();
  resetGoalForm();

  setSavingGoal(false);
};

  const handleDeleteGoal = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("goals")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      setSuccess("Goal deleted successfully.");
      setGoalMenuId(null);
      await loadGoals();
    }
  };

  // =========================================================
  // PROFILE CRUD
  // =========================================================

  const handleSaveProfile = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSavingProfile(true);
    setError("");
    setSuccess("");

    const profileData = {
      name: profileName.trim(),
      short_name: profileShortName.trim() || null,
      location: profileLocation.trim() || null,
      title: profileTitle.trim() || null,
      tagline: profileTagline.trim() || null,
      email: profileEmail.trim() || null,
      github_url: profileGithub.trim() || null,
      linkedin_url: profileLinkedin.trim() || null,
      profile_image: profileImage.trim() || null,
      logo: profileLogo.trim() || null,
      about: profileAbout.trim() || null,
    };

    if (profile?.id) {
      const { data, error: updateError } = await supabase
        .from("profile")
        .update(profileData)
        .eq("id", profile.id)
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
      } else {
        setProfile(data as Profile);
        setSuccess("Profile updated successfully.");
      }
    } else {
      const { data, error: insertError } = await supabase
        .from("profile")
        .insert(profileData)
        .select()
        .single();

      if (insertError) {
        setError(insertError.message);
      } else {
        setProfile(data as Profile);
        setSuccess("Profile created successfully.");
      }
    }

    setSavingProfile(false);
  };

  // =========================================================
  // AUTH
  // =========================================================

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // =========================================================
  // AUTH LOADING
  // =========================================================

  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <p className="text-sm text-neutral-400">
          Loading...
        </p>
      </div>
    );
  }

  if (!session) {
  return <AdminLogin />;
}

if (!isAdmin) {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-neutral-900">
          Access Denied
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          You do not have permission to access the admin panel.
        </p>

        <button
          onClick={handleSignOut}
          className="mt-5 px-4 py-2 bg-neutral-900 text-white text-sm rounded-xl hover:bg-neutral-800 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

  // =========================================================
  // DASHBOARD COUNTS
  // =========================================================

  const featuredCount = projects.filter(
    (project) => project.featured
  ).length;

  const clientCount = projects.filter(
    (project) => project.client_project
  ).length;

  // =========================================================
  // ADMIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={(section) => {
          setActiveSection(section);
          setSuccess("");
          setError("");
        }}
        handleSignOut={handleSignOut}
      />

      <div className="md:pl-56 lg:pl-64 min-h-screen">
        <AdminHeader
          activeSection={activeSection}
          email={session.user?.email}
        />

        <main className="px-5 sm:px-7 lg:px-10 py-7 max-w-7xl">
          {/* DASHBOARD */}
          {activeSection === "dashboard" && (
            <DashboardSection
              projects={projects}
              featuredCount={featuredCount}
              clientCount={clientCount}
              success={success}
            />
          )}

          {/* PROJECTS */}
          {activeSection === "projects" && (
            <ProjectsSection
              projects={projects}
              loadingProjects={loadingProjects}
              error={error}
              savingProject={savingProject}
              deletingProjectId={deletingProjectId}
              projectMenuId={projectMenuId}
              setProjectMenuId={setProjectMenuId}
              openEditProject={openEditProject}
              handleDeleteProject={handleDeleteProject}
              openAddProject={openAddProject}
            />
          )}

          {/* EDUCATION */}
          {activeSection === "education" && (
            <EducationSection
              education={education}
              loadingEducation={loadingEducation}
              error={error}
              educationMenuId={educationMenuId}
              setEducationMenuId={setEducationMenuId}
              openEducationEditor={openEducationEditor}
              handleDeleteEducation={handleDeleteEducation}
            />
          )}

          {/* SKILLS */}
          {activeSection === "skills" && (
            <SkillsSection
              skills={skills}
              loadingSkills={loadingSkills}
              error={error}
              skillMenuId={skillMenuId}
              setSkillMenuId={setSkillMenuId}
              openSkillEditor={openSkillEditor}
              handleDeleteSkill={handleDeleteSkill}
            />
          )}

          {/* EXPERIENCE */}
          {activeSection === "experience" && (
            <ExperienceSection
              experiences={experiences}
              loadingExperience={loadingExperience}
              error={error}
              experienceMenuId={experienceMenuId}
              setExperienceMenuId={setExperienceMenuId}
              openExperienceEditor={openExperienceEditor}
              handleDeleteExperience={handleDeleteExperience}
            />
          )}

          {/* CERTIFICATES */}
          {activeSection === "certificates" && (
            <CertificatesSection
              certificates={certificates}
              loadingCertificates={loadingCertificates}
              error={error}
              certificateMenuId={certificateMenuId}
              setCertificateMenuId={setCertificateMenuId}
              openCertificateEditor={openCertificateEditor}
              handleDeleteCertificate={handleDeleteCertificate}
            />
          )}

          {/* LEARNING */}
          {activeSection === "learning" && (
            <LearningSection
              learning={learning}
              loadingLearning={loadingLearning}
              error={error}
              learningMenuId={learningMenuId}
              setLearningMenuId={setLearningMenuId}
              openLearningEditor={openLearningEditor}
              handleDeleteLearning={handleDeleteLearning}
            />
          )}

          {/* GOALS */}
          {activeSection === "goals" && (
            <GoalsSection
              goals={goals}
              loadingGoals={loadingGoals}
              error={error}
              goalMenuId={goalMenuId}
              setGoalMenuId={setGoalMenuId}
              openGoalEditor={openGoalEditor}
              handleDeleteGoal={handleDeleteGoal}
            />
          )}

          {/* PROFILE */}
          {activeSection === "profile" && (
            <ProfileSection
              profile={profile}
              loadingProfile={loadingProfile}
              error={error}
              profileName={profileName}
              setProfileName={setProfileName}
              profileShortName={profileShortName}
              setProfileShortName={setProfileShortName}
              profileLocation={profileLocation}
              setProfileLocation={setProfileLocation}
              profileTitle={profileTitle}
              setProfileTitle={setProfileTitle}
              profileTagline={profileTagline}
              setProfileTagline={setProfileTagline}
              profileEmail={profileEmail}
              setProfileEmail={setProfileEmail}
              profileGithub={profileGithub}
              setProfileGithub={setProfileGithub}
              profileLinkedin={profileLinkedin}
              setProfileLinkedin={setProfileLinkedin}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              profileLogo={profileLogo}
              setProfileLogo={setProfileLogo}
              profileAbout={profileAbout}
              setProfileAbout={setProfileAbout}
              savingProfile={savingProfile}
              handleSaveProfile={handleSaveProfile}
            />
          )}
        </main>
      </div>

      {/* =====================================================
          MODALS
      ===================================================== */}

      {showProjectModal && (
        <ProjectModal
          editingProjectId={editingProjectId}
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          description={description}
          setDescription={setDescription}
          technologies={technologies}
          setTechnologies={setTechnologies}
          year={year}
          setYear={setYear}
          liveUrl={liveUrl}
          setLiveUrl={setLiveUrl}
          githubUrl={githubUrl}
          setGithubUrl={setGithubUrl}
          image={image}
          setImage={setImage}
          clientProject={clientProject}
          setClientProject={setClientProject}
          sourceCodeAvailable={sourceCodeAvailable}
          setSourceCodeAvailable={setSourceCodeAvailable}
          isNovel={isNovel}
          setIsNovel={setIsNovel}
          featured={featured}
          setFeatured={setFeatured}
          savingProject={savingProject}
          handleSaveProject={handleSaveProject}
          resetProjectForm={resetProjectForm}
        />
      )}

      {showEducationModal && (
        <EducationModal
          editingEducationId={editingEducationId}
          institution={institution}
          setInstitution={setInstitution}
          degree={degree}
          setDegree={setDegree}
          fieldOfStudy={fieldOfStudy}
          setFieldOfStudy={setFieldOfStudy}
          location={location}
          setLocation={setLocation}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          grade={grade}
          setGrade={setGrade}
          gpa={gpa}
          setGpa={setGpa}
          level={level}
          setLevel={setLevel}
          year={educationYear}
          setYear={setEducationYear}
          status={educationStatus}
          setStatus={setEducationStatus}
          description={educationDescription}
          setDescription={setEducationDescription}
          isCurrent={isCurrent}
          setIsCurrent={setIsCurrent}
          savingEducation={savingEducation}
          handleSaveEducation={handleSaveEducation}
          resetEducationForm={resetEducationForm}
        />
      )}

      {showSkillModal && (
        <SkillModal
          editingSkillId={editingSkillId}
          skillName={skillName}
          setSkillName={setSkillName}
          skillCategory={skillCategory}
          setSkillCategory={setSkillCategory}
          skillLevel={skillLevel}
          setSkillLevel={setSkillLevel}
          skillPercentage={skillPercentage}
          setSkillPercentage={setSkillPercentage}
          savingSkill={savingSkill}
          handleSaveSkill={handleSaveSkill}
          resetSkillForm={resetSkillForm}
        />
      )}

      {showExperienceModal && (
        <ExperienceModal
          editingExperienceId={editingExperienceId}
          experienceRole={experienceRole}
          setExperienceRole={setExperienceRole}
          experienceOrganization={experienceOrganization}
          setExperienceOrganization={setExperienceOrganization}
          experienceYear={experienceYear}
          setExperienceYear={setExperienceYear}
          experienceType={experienceType}
          setExperienceType={setExperienceType}
          experienceResponsibilities={experienceResponsibilities}
          setExperienceResponsibilities={
            setExperienceResponsibilities
          }
          savingExperience={savingExperience}
          handleSaveExperience={handleSaveExperience}
          onClose={resetExperienceForm}
        />
      )}

      {showCertificateModal && (
        <CertificateModal
          editingCertificateId={editingCertificateId}
          certificateTitle={certificateTitle}
          setCertificateTitle={setCertificateTitle}
          certificateIssuer={certificateIssuer}
          setCertificateIssuer={setCertificateIssuer}
          certificateIssueDate={certificateIssueDate}
          setCertificateIssueDate={
            setCertificateIssueDate
          }
          certificateCredentialUrl={
            certificateCredentialUrl
          }
          setCertificateCredentialUrl={
            setCertificateCredentialUrl
          }
          certificateImage={certificateImage}
          setCertificateImage={setCertificateImage}
          savingCertificate={savingCertificate}
          handleSaveCertificate={handleSaveCertificate}
          onClose={resetCertificateForm}
        />
      )}

      {showLearningModal && (
        <LearningModal
          editingLearningId={editingLearningId}
          learningName={learningName}
          setLearningName={setLearningName}
          learningDescription={learningDescription}
          setLearningDescription={setLearningDescription}
          learningIcon={learningIcon}
          setLearningIcon={setLearningIcon}
          learningProgress={learningProgress}
          setLearningProgress={setLearningProgress}
          learningStatus={learningStatus}
          setLearningStatus={setLearningStatus}
          savingLearning={savingLearning}
          handleSaveLearning={handleSaveLearning}
          resetLearningForm={resetLearningForm}
        />
      )}

      {showGoalModal && (
        <GoalModal
          editingGoalId={editingGoalId}
          goalTitle={goalTitle}
          setGoalTitle={setGoalTitle}
          goalCategory={goalCategory}
          setGoalCategory={setGoalCategory}
          goalDescription={goalDescription}
          setGoalDescription={setGoalDescription}
          goalStatus={goalStatus}
          setGoalStatus={setGoalStatus}
          savingGoal={savingGoal}
          handleSaveGoal={handleSaveGoal}
          resetGoalForm={resetGoalForm}
        />
      )}
    </div>
  );
}

// =========================================================
// ADMIN LOGIN
// =========================================================

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      setError(loginError.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-neutral-200 rounded-[28px] shadow-sm p-7 sm:p-8">
          <div className="mb-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
              GKM
            </p>

            <h1 className="font-serif text-3xl font-bold mt-2">
              Portfolio CMS
            </h1>

            <p className="text-sm text-neutral-500 mt-2">
              Sign in to manage your portfolio.
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
            onSubmit={handleLogin}
            className="space-y-5"
          >
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm focus:border-neutral-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm focus:border-neutral-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}