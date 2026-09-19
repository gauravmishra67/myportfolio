import type { Dispatch, SetStateAction } from "react";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date?: string | null;
  credential_url?: string | null;
  image?: string | null;
  sort_order: number;
}

interface CertificatesSectionProps {
  certificates: Certificate[];
  loadingCertificates: boolean;
  error: string;
  certificateMenuId: string | null;
  setCertificateMenuId: Dispatch<SetStateAction<string | null>>;
  openCertificateEditor: (certificate?: Certificate) => void;
  handleDeleteCertificate: (id: string) => void;
}

export default function CertificatesSection({
  certificates,
  loadingCertificates,
  error,
  certificateMenuId,
  setCertificateMenuId,
  openCertificateEditor,
  handleDeleteCertificate,
}: CertificatesSectionProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Content
          </p>

          <h2 className="font-serif text-2xl font-bold mt-1">
            Certificates
          </h2>
        </div>

        <button
          type="button"
          onClick={() => openCertificateEditor()}
          className="px-4 py-2.5 bg-neutral-900 text-white text-xs font-medium rounded-xl hover:bg-neutral-800"
        >
          + Add Certificate
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {loadingCertificates ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            Loading certificates...
          </p>
        </div>
      ) : certificates.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-neutral-400">
            No certificates found.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-visible">
          {certificates.map((certificate, index) => (
            <div
              key={certificate.id}
              className={`p-4 sm:p-5 flex items-center gap-4 ${
                index !== certificates.length - 1
                  ? "border-b border-neutral-100"
                  : ""
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-neutral-100 overflow-visible flex-shrink-0">
                {certificate.image ? (
                  <img
                    src={certificate.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-300">
                    ◇
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm truncate">
                  {certificate.title}
                </h3>

                <p className="text-xs text-neutral-400 mt-1">
                  {certificate.issuer}
                  {certificate.issue_date
                    ? ` · ${certificate.issue_date}`
                    : ""}
                </p>
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label={`Actions for ${certificate.title}`}
                  aria-expanded={certificateMenuId === certificate.id}
                  onClick={() =>
                    setCertificateMenuId(
                      certificateMenuId === certificate.id
                        ? null
                        : certificate.id
                    )
                  }
                  className="w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                >
                  •••
                </button>

                {certificateMenuId === certificate.id && (
                  <div className="absolute right-0 top-11 z-30 w-32 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => openCertificateEditor(certificate)}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteCertificate(certificate.id)
                      }
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