import { Bell, Moon, Download, Share2, Copy, ShieldCheck, Award } from "lucide-react";
import { CERTIFICATES, MOCK_USER } from "@/config/learner";

export default function CertificatesPage() {
  return (
    <div className="min-h-full">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold text-[#00003e] sm:text-xl">My Certificates</h1>
          <p className="text-xs text-slate-400">Completed course certificates, verification status, and credential history</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
            <Moon className="h-4 w-4" />
          </button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#f4a300]" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Available Certificates", value: CERTIFICATES.length },
            { label: "Verification Status",    value: "Pending",          isStatus: true },
            { label: "Certificate History",    value: CERTIFICATES.length },
          ].map(({ label, value, isStatus }) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-[11px] text-slate-400">{label}</p>
              {isStatus ? (
                <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                  {value}
                </span>
              ) : (
                <p className="text-2xl font-bold text-[#00003e]">{value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Certificate preview cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {CERTIFICATES.map((cert) => (
            <div key={cert.id} className="relative overflow-hidden rounded-2xl bg-[#00003e] p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, #f4a300 1px, transparent 1px)", backgroundSize: "20px 20px" }}
              />
              <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#f4a300]/10 blur-2xl" />
              <div className="relative flex flex-col items-center py-4 text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4a300]/20">
                  <Award className="h-7 w-7 text-[#f4a300]" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">Certificate of Completion</p>
                <p className="mt-1 text-lg font-bold text-white">{cert.fullTitle}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/60">
                  <ShieldCheck className="h-3 w-3" /> Verification Required
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate detail cards */}
        <div className="flex flex-col gap-4">
          {CERTIFICATES.map((cert) => (
            <div key={cert.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-amber-500" />
                    <p className="font-bold text-[#00003e]">{cert.fullTitle}</p>
                  </div>
                  <p className="text-xs text-slate-400">Completed: {cert.completedDate}</p>
                  <p className="text-xs text-slate-400">Certificate ID: {cert.certificateId}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>Progress: 100%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { icon: null,     label: "Preview",   variant: "outline" },
                  { icon: Download, label: "Download",  variant: "gold"    },
                  { icon: Share2,   label: "Share",     variant: "outline" },
                  { icon: Copy,     label: "Copy",      variant: "outline" },
                ].map(({ icon: Icon, label, variant }) => (
                  <button
                    key={label}
                    className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      variant === "gold"
                        ? "bg-[#f4a300] text-white hover:bg-[#e09400]"
                        : "border border-slate-200 text-slate-600 hover:border-[#f4a300] hover:text-[#f4a300]"
                    }`}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
