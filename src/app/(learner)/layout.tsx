export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}
      <main className="bg-brand-navy flex-1">{children}</main>
    </div>
  );
}
