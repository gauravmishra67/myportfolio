interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl w-full max-w-5xl h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-white">
          <div>
            <h2 className="font-serif text-xl font-bold text-neutral-900">
              Resume
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Gaurav Kumar Mishra
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Download */}
            <a
              href="/resume.pdf"
              download="Gaurav_Kumar_Mishra_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Download
              <span className="text-xs">↓</span>
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-all"
              aria-label="Close resume"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF */}
        <div className="flex-1 bg-neutral-100">
          <iframe
            src="/resume.pdf"
            title="Gaurav Kumar Mishra Resume"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}