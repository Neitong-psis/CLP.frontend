import React, { useState, useRef, useEffect, type DragEvent } from 'react';
import { Upload, Trash2, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ThumbnailUploadProps {
  fileValue: File | null;
  pathValue?: string | null;
  onChange: (f: File | null) => void;
}

export function ThumbnailUpload({
  fileValue,
  pathValue,
  onChange,
}: ThumbnailUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (fileValue) {
      const url = URL.createObjectURL(fileValue);
      setTimeout(() => setPreview(url), 0);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (pathValue) {
      setTimeout(() => setPreview(pathValue), 0);
    } else {
      setTimeout(() => setPreview(null), 0);
    }
  }, [fileValue, pathValue]);

  const accept = (file: File) => {
    if (file.type.startsWith('image/')) {
      onChange(file);
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) {
      accept(f);
    }
  };

  if (preview) {
    return (
      <div className="group relative overflow-hidden rounded-xl border border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview}
          alt="Thumbnail"
          className="aspect-video w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow transition hover:bg-white"
          >
            <Upload className="h-3 w-3" /> Replace
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex items-center gap-1.5 rounded-lg bg-red-500/90 px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-red-500"
          >
            <Trash2 className="h-3 w-3" /> Remove
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && accept(e.target.files[0])}
        />
      </div>
    );
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => fileRef.current?.click()}
      className={cn(
        'flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 text-center transition-all duration-150',
        isDragging
          ? 'border-brand-gold bg-brand-gold/5 scale-[1.01]'
          : 'hover:border-brand-gold hover:bg-brand-gold/5 border-slate-200 bg-slate-50/50',
      )}
    >
      <ImageIcon
        className={cn(
          'h-7 w-7 transition-colors',
          isDragging ? 'text-brand-gold' : 'text-slate-300',
        )}
      />
      <span className="text-xs font-semibold text-slate-500">
        {isDragging ? 'Drop to upload' : 'Click to upload'}
      </span>
      <span className="text-[11px] text-slate-400">16:9 recommended</span>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && accept(e.target.files[0])}
      />
    </div>
  );
}
