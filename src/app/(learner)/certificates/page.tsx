import { Download, Share2, Copy, ShieldCheck } from 'lucide-react';
import { CERTIFICATES, MOCK_USER } from '@/config/learner';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';

export default function CertificatesPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <TopBar
        role="learner"
        title="My Certificates"
        subtitle={`Live workspace synced for ${MOCK_USER.email}`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="mb-2 text-sm text-slate-400">
              Available Certificates
            </p>
            <p className="text-brand-navy text-3xl font-bold">
              {CERTIFICATES.length}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="mb-2 text-sm text-slate-400">Verification Status</p>
            <span className="bg-brand-gold/15 text-brand-gold inline-block rounded-full px-3 py-1 text-sm font-bold">
              Pending
            </span>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="mb-2 text-sm text-slate-400">Certificate History</p>
            <p className="text-brand-navy text-3xl font-bold">
              {CERTIFICATES.length}
            </p>
          </div>
        </div>

        {/* Preview cards */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="bg-brand-navy rounded-lg px-8 py-10 text-center"
            >
              <div>
                <p className="mb-2 text-[11px] font-semibold tracking-widest text-white/50 uppercase">
                  Certificate of Completion
                </p>
                <p className="text-lg font-bold text-white">{cert.fullTitle}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/70">
                  <ShieldCheck className="h-3 w-3" />
                  Verification Required
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-brand-navy font-bold">{cert.fullTitle}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Completed: {cert.completedDate}
                  </p>
                </div>
                <ShieldCheck className="text-brand-gold mt-0.5 h-5 w-5 shrink-0" />
              </div>

              <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                <span>Certificate ID: {cert.certificateId}</span>
                <span>Progress: 100%</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button className="flex items-center justify-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-800">
                  Preview
                </button>
                <button className="bg-brand-gold hover:bg-brand-gold-dark flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold text-white transition-colors">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
                <button className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-800">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>
                <button className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-800">
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <FooterBottomBar theme="light" />
    </div>
  );
}
