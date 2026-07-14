'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, FileUp, UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface AssignmentSubmissionProps {
  initiallySubmitted: boolean;
  onSubmitted: () => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AssignmentSubmission({
  initiallySubmitted,
  onSubmitted,
}: AssignmentSubmissionProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'done'>(
    'idle',
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isSubmitted = initiallySubmitted || uploadState === 'done';

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function addFiles(incoming: FileList | null) {
    if (!incoming || incoming.length === 0) return;
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      const next = Array.from(incoming).filter((f) => !existing.has(f.name));
      return [...prev, ...next];
    });
    setUploadState('idle');
    setUploadProgress(0);
    if (inputRef.current) inputRef.current.value = '';
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function handleSubmit() {
    if (files.length === 0 || uploadState === 'uploading') return;
    setUploadState('uploading');
    setUploadProgress(0);

    let progress = 0;
    intervalRef.current = setInterval(() => {
      progress += Math.random() * 12 + 6;
      if (progress >= 100) {
        clearInterval(intervalRef.current!);
        setUploadProgress(100);
        setTimeout(() => {
          setUploadState('done');
          onSubmitted();
        }, 400);
      } else {
        setUploadProgress(Math.round(Math.min(progress, 99)));
      }
    }, 140);
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-5 py-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
        <div>
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Submitted
          </p>
          <p className="text-xs text-emerald-600/70 dark:text-emerald-400/60">
            Your assignment has been submitted and is awaiting review.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {files.length > 0 ? (
        /* Files selected — list + submit */
        <div className="border-border space-y-3 rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <p className="text-foreground text-sm font-semibold">
              {files.length} file{files.length > 1 ? 's' : ''} selected
            </p>
            <span className="text-muted-foreground text-xs">
              {formatSize(totalSize)} total
            </span>
          </div>

          <ul className="space-y-2">
            {files.map((f, idx) => (
              <li
                key={f.name}
                className="bg-muted/40 flex items-center gap-3 rounded-lg px-3 py-2.5"
              >
                <FileUp className="text-brand-gold h-5 w-5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">
                    {f.name}
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    {formatSize(f.size)}
                  </p>
                </div>
                {uploadState === 'uploading' ? (
                  <span className="text-muted-foreground text-[11px] tabular-nums">
                    {idx < Math.floor((uploadProgress / 100) * files.length)
                      ? '✓'
                      : idx ===
                          Math.floor((uploadProgress / 100) * files.length)
                        ? `${uploadProgress}%`
                        : '—'}
                  </span>
                ) : uploadState === 'idle' ? (
                  <button
                    type="button"
                    onClick={() => removeFile(f.name)}
                    className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
                    aria-label={`Remove ${f.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </li>
            ))}
          </ul>

          {uploadState === 'uploading' && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Uploading {files.length} file
                  {files.length > 1 ? 's' : ''}…
                </span>
                <span className="text-foreground font-semibold">
                  {uploadProgress}%
                </span>
              </div>
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <div
                  className="bg-brand-gold h-full rounded-full transition-[width] duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={uploadState === 'uploading'}
              className={cn(
                'flex-1 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all',
                uploadState === 'uploading'
                  ? 'bg-brand-gold/50 text-brand-navy/60 cursor-not-allowed'
                  : 'bg-brand-gold text-brand-navy hover:bg-brand-gold/90 cursor-pointer',
              )}
            >
              {uploadState === 'uploading'
                ? `Uploading… ${uploadProgress}%`
                : `Submit ${files.length} File${files.length > 1 ? 's' : ''}`}
            </button>
            {uploadState === 'idle' && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="border-border text-muted-foreground hover:text-foreground rounded-xl border px-4 py-2.5 text-sm transition-colors"
              >
                Add More
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200',
            isDragging
              ? 'border-brand-gold bg-brand-gold/5 scale-[1.01]'
              : 'border-border hover:border-brand-gold/50 hover:bg-muted/30',
          )}
        >
          <UploadCloud
            className={cn(
              'mx-auto mb-3 h-10 w-10 transition-colors duration-200',
              isDragging ? 'text-brand-gold' : 'text-muted-foreground/40',
            )}
          />
          <p className="text-foreground text-sm font-semibold">
            {isDragging ? 'Drop files here' : 'Upload your assignment'}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Drag & drop multiple files or click to browse · PDF, DOCX, ZIP,
            images
          </p>
          <span className="bg-brand-gold text-brand-navy mt-4 inline-block rounded-xl px-6 py-2.5 text-sm font-semibold">
            Browse Files
          </span>
        </div>
      )}

      {/* Hidden multi-file input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.zip,.png,.jpg,.jpeg"
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
    </>
  );
}
