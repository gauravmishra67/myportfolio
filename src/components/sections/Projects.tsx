import { useState, useRef } from "react";
import { projects, type Project } from "../../data/projects";
import { useInView } from "../../hooks/useInView";

export default function Projects() {
  const { ref, inView } = useInView(0.05);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        {/* Section label */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-8 h-px bg-neutral-400" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium">
            Work
          </span>
        </div>

        <h2
          className={`font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-16 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Selected <span className="italic text-neutral-500">Projects</span>
        </h2>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              animate={inView}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  animate,
  onSelect,
}: {
  project: Project;
  index: number;
  animate: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  };

  const isNovel = project.isNovel;

  return (
    <div
      ref={cardRef}
      className={`group cursor-pointer rounded-3xl overflow-hidden border border-neutral-100 hover:border-neutral-200 bg-white hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${200 + index * 150}ms`,
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease, box-shadow 0.5s ease, opacity 0.7s ease, border-color 0.5s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      data-cursor-hover
    >
      <div className={`grid ${isNovel ? "md:grid-cols-[280px_1fr]" : "md:grid-cols-2"} gap-0`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${isNovel ? "aspect-[3/4] md:aspect-auto" : "aspect-video md:aspect-auto md:min-h-[320px]"} bg-neutral-100`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {isNovel && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          )}
          {project.clientProject && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-700">
              Client Work
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-neutral-400 uppercase tracking-widest font-medium">
              {project.category}
            </span>
            <span className="text-xs text-neutral-300">·</span>
            <span className="text-xs text-neutral-400">{project.year}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 group-hover:text-neutral-700 transition-colors">
            {project.title}
          </h3>

          <p className="text-neutral-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex items-center gap-4 mt-auto">
            <span className="text-sm font-medium text-neutral-800 group-hover:text-neutral-600 transition-colors flex items-center gap-2">
              View Details
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-400 hover:text-neutral-600 underline underline-offset-2 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Live Site ↗
              </a>
            )}
            {project.sourceCodeAvailable && project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-400 hover:text-neutral-600 underline underline-offset-2 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const isNovel = project.isNovel;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white transition-all"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header Image */}
        <div className="relative h-64 overflow-hidden rounded-t-3xl bg-neutral-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 -mt-12 relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full font-medium">
              {project.category}
            </span>
            <span className="text-xs text-neutral-400">{project.year}</span>
          </div>

          <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-4">
            {project.title}
          </h2>
          <p className="text-neutral-500 leading-relaxed mb-8">{project.description}</p>

          {/* Technologies */}
          {project.technologies && (
            <div className="mb-8">
              <h4 className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm bg-neutral-100 text-neutral-700 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Role */}
          {project.details.role && (
            <div className="mb-8">
              <h4 className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-3">Role</h4>
              <p className="text-neutral-600 text-sm leading-relaxed">{project.details.role}</p>
            </div>
          )}

          {/* Challenge & Solution */}
          {project.details.challenge && (
            <div className="mb-8">
              <h4 className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-3">Challenge</h4>
              <p className="text-neutral-600 text-sm leading-relaxed">{project.details.challenge}</p>
            </div>
          )}

          {project.details.solution && (
            <div className="mb-8">
              <h4 className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-3">Solution</h4>
              <p className="text-neutral-600 text-sm leading-relaxed">{project.details.solution}</p>
            </div>
          )}

          {/* Features */}
          {project.details.features && project.details.features.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-3">Features</h4>
              <ul className="space-y-2">
                {project.details.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Novel-specific fields */}
          {isNovel && (
            <>
              {project.details.premise && (
                <div className="mb-8">
                  <h4 className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-3">Premise</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed italic font-serif">{project.details.premise}</p>
                </div>
              )}
              {project.details.inspiration && (
                <div className="mb-8">
                  <h4 className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-3">Inspiration</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{project.details.inspiration}</p>
                </div>
              )}
              {project.details.status && (
                <div className="mb-8">
                  <h4 className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-3">Status</h4>
                  <span className="px-3 py-1.5 text-sm bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                    {project.details.status}
                  </span>
                </div>
              )}
            </>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-100">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Visit Live Site ↗
              </a>
            )}
            {project.sourceCodeAvailable && project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white border border-neutral-200 text-neutral-700 text-sm font-medium rounded-xl hover:bg-neutral-50 transition-colors"
              >
                View Source ↗
              </a>
            )}
            {project.sourceCodeAvailable === false && (
              <span className="px-5 py-2.5 text-sm text-neutral-400 italic">
                Source code not publicly available
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
