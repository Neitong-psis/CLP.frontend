export default function Avatar({ name }: { name: string }) {
  const initial = name ? name[0].toUpperCase() : 'U';
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-xl font-bold text-slate-400">
      {initial}
    </div>
  );
}
