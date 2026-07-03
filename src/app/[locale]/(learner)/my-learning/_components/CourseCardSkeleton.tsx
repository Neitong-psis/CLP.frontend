export default function CourseCardSkeleton() {
  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <div className="bg-muted h-48 animate-pulse" />
      <div className="bg-card space-y-3 p-5">
        <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
        <div className="bg-muted h-3 w-1/2 animate-pulse rounded" />
        <div className="bg-muted mt-4 h-1.5 w-full animate-pulse rounded-full" />
        <div className="border-border mt-4 border-t pt-4">
          <div className="bg-muted mx-auto h-4 w-24 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
