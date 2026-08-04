import { Award, X, Copy, Download, Printer, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_INSTRUCTOR, type CertRecord } from '../_lib/data';
import { useEscapeKey } from '../_hooks/useEscapeKey';
import { QRMockup } from './QRMockup';

export function CertificateModal({
  cert,
  onClose,
  onDownload,
  onCopyLink,
  onShare,
}: {
  cert: CertRecord;
  onClose: () => void;
  onDownload: () => void;
  onCopyLink: (url: string) => void;
  onShare: (url: string) => void;
}) {
  const verifyUrl = `${window.location.origin}/verify/${cert.id}`;

  useEscapeKey(onClose);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="ring-border bg-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl shadow-2xl ring-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4">
          <div>
            <h2 className="text-foreground text-sm font-bold">
              Official certificate
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Your verified credential is ready to download, print, or share.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted ml-4 shrink-0 rounded-lg"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Certificate body — always white regardless of app theme */}
        <div
          className="mx-6 overflow-hidden rounded-xl"
          style={{ border: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}
        >
          <div className="bg-white px-8 pt-7 pb-8">
            {/* Logo + QR row */}
            <div className="mb-8 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#dde3eb] bg-[#f0f4f8]">
                  <Award className="h-6 w-6 text-[#0f2044]" />
                </div>
                <div>
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: '#0f2044' }}
                  >
                    Content Learning Platform
                  </p>
                  <p
                    className="mt-0.5 text-[10px]"
                    style={{ color: '#6b7280' }}
                  >
                    Excellence in Education
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <QRMockup />
                <p
                  className="text-[9px] font-semibold tracking-wider uppercase"
                  style={{ color: '#6b7280' }}
                >
                  VERIFY: {cert.id.slice(-1)}
                </p>
              </div>
            </div>

            {/* Main text */}
            <div className="text-center">
              <h1
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  color: '#0f2044',
                  lineHeight: 1.2,
                }}
              >
                Certificate of Completion
              </h1>

              <p
                className="mt-3 text-[11px] font-bold tracking-widest uppercase"
                style={{ color: '#c9922b' }}
              >
                This Certifies That
              </p>

              <p
                className="mx-10 mt-4 border-b pb-3"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '1.875rem',
                  color: '#0f2044',
                  borderColor: '#d1d5db',
                }}
              >
                {cert.recipient}
              </p>

              <p
                className="mt-4 text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: '#6b7280' }}
              >
                Has Completed The Course
              </p>

              <p
                className="mt-2 text-lg font-bold"
                style={{ color: '#0f2044' }}
              >
                {cert.course}
              </p>
            </div>

            {/* Signature row */}
            <div className="mt-9 grid grid-cols-2 gap-8 px-2">
              <div
                className="border-t pt-2"
                style={{ borderColor: 'rgba(15, 32, 68, 0.2)' }}
              >
                <p className="text-sm" style={{ color: '#0f2044' }}>
                  {cert.issued}
                </p>
                <p
                  className="mt-0.5 text-[9px] font-semibold tracking-widest uppercase"
                  style={{ color: '#9ca3af' }}
                >
                  Date of Issue
                </p>
              </div>
              <div
                className="border-t pt-2 text-right"
                style={{ borderColor: 'rgba(15, 32, 68, 0.2)' }}
              >
                <p
                  className="text-[11px] font-medium"
                  style={{ color: '#0f2044' }}
                >
                  {DEFAULT_INSTRUCTOR}
                </p>
                <p
                  className="mt-0.5 text-[9px] font-semibold tracking-widest uppercase"
                  style={{ color: '#9ca3af' }}
                >
                  Lead Instructor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download / share section */}
        <div className="px-6 pt-4 pb-6">
          <p className="text-foreground text-sm font-bold">
            Download or share your certificate
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            These actions unlock after verification is submitted successfully.
          </p>

          {/* URL strip */}
          <div className="border-border bg-surface mt-3 flex items-center gap-2 rounded-lg border px-3 py-2.5">
            <span className="text-muted-foreground flex-1 truncate font-mono text-xs">
              {verifyUrl}
            </span>
            <button
              onClick={() => onCopyLink(verifyUrl)}
              className="text-foreground hover:text-brand-gold flex shrink-0 items-center gap-1.5 text-xs font-semibold transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy Link
            </button>
          </div>

          {/* Action buttons — same outline treatment on all three, so
              Download doesn't read as more "primary" than Print/Share. */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Button
              variant="ghost"
              onClick={onDownload}
              className="border-border text-foreground hover:bg-muted h-auto items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Download Official PDF
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.print()}
              className="border-border text-foreground hover:bg-muted h-auto items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              Print Certificate
            </Button>
            <Button
              variant="ghost"
              onClick={() => onShare(verifyUrl)}
              className="border-border text-foreground hover:bg-muted h-auto items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share Certificate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
