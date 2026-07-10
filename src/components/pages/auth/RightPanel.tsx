export default function RightPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-navy flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white px-8 py-9 shadow-2xl shadow-black/40">
          {children}
        </div>
      </div>
    </div>
  );
}
