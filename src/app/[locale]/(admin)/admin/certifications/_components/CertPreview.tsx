export function CertPreview({
  name,
  category,
  certOfCompletion,
  learnerName,
  courseTitle,
  thumbnailUrl,
}: {
  name: string;
  category: string;
  certOfCompletion: string;
  learnerName: string;
  courseTitle: string;
  thumbnailUrl?: string;
}) {
  if (thumbnailUrl) {
    return (
      <div className="border-border bg-card flex flex-col overflow-hidden rounded-xl border shadow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl}
          alt={name}
          className="h-40 w-full object-cover"
        />
        <p className="text-muted-foreground px-3 py-2 text-center text-[10px] font-semibold">
          {name}
        </p>
      </div>
    );
  }

  return (
    <div className="border-border bg-card flex flex-col rounded-xl border p-4 shadow">
      <div className="text-muted-foreground flex items-start justify-between text-[10px] font-bold tracking-wider uppercase">
        <span>CLP</span>
        <span>{category}</span>
      </div>
      <div className="mt-3 text-center">
        <p className="text-brand-gold text-[9px] font-bold tracking-widest uppercase">
          {certOfCompletion}
        </p>
        <p className="text-foreground mt-2 text-sm font-bold">{learnerName}</p>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          {courseTitle}
        </p>
      </div>
      <div className="mt-3 text-center">
        <p className="text-muted-foreground text-[10px] font-semibold">
          {name}
        </p>
      </div>
      <div className="text-muted-foreground mt-3 flex items-end justify-between text-[10px]">
        <span>Date</span>
        <span>Signature</span>
      </div>
    </div>
  );
}
