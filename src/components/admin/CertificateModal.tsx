import type { FormEvent } from "react";

interface CertificateModalProps {
  editingCertificateId: string | null;

  certificateTitle: string;
  setCertificateTitle: (value: string) => void;

  certificateIssuer: string;
  setCertificateIssuer: (value: string) => void;

  certificateIssueDate: string;
  setCertificateIssueDate: (value: string) => void;

  certificateCredentialUrl: string;
  setCertificateCredentialUrl: (value: string) => void;

  certificateImage: string;
  setCertificateImage: (value: string) => void;

  savingCertificate: boolean;

  handleSaveCertificate: (e: FormEvent<HTMLFormElement>) => void;

  onClose: () => void;
}

export default function CertificateModal({
  editingCertificateId,
  certificateTitle,
  setCertificateTitle,
  certificateIssuer,
  setCertificateIssuer,
  certificateIssueDate,
  setCertificateIssueDate,
  certificateCredentialUrl,
  setCertificateCredentialUrl,
  certificateImage,
  setCertificateImage,
  savingCertificate,
  handleSaveCertificate,
  onClose,
}: CertificateModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl">
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-neutral-100 px-7 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              Portfolio Content
            </p>

            <h2 className="font-serif text-2xl font-bold mt-1">
              {editingCertificateId
                ? "Edit Certificate"
                : "Add Certificate"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-neutral-200 text-neutral-400 hover:text-neutral-900"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSaveCertificate}
          className="p-7 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Certificate Title
              </label>

              <input
                required
                value={certificateTitle}
                onChange={(e) =>
                  setCertificateTitle(e.target.value)
                }
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Issuer
              </label>

              <input
                required
                value={certificateIssuer}
                onChange={(e) =>
                  setCertificateIssuer(e.target.value)
                }
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Issue Date
              </label>

              <input
                value={certificateIssueDate}
                onChange={(e) =>
                  setCertificateIssueDate(e.target.value)
                }
                placeholder="2026-09-18"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Credential URL
              </label>

              <input
                type="url"
                value={certificateCredentialUrl}
                onChange={(e) =>
                  setCertificateCredentialUrl(e.target.value)
                }
                placeholder="https://..."
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Image URL
              </label>

              <input
                value={certificateImage}
                onChange={(e) =>
                  setCertificateImage(e.target.value)
                }
                placeholder="/certificate.png"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-neutral-200 rounded-xl text-sm font-medium hover:bg-neutral-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={savingCertificate}
              className="px-6 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium disabled:opacity-50"
            >
              {savingCertificate
                ? "Saving..."
                : editingCertificateId
                  ? "Update Certificate"
                  : "Save Certificate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}