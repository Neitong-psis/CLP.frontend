export default function EducatorRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-brand-navy min-h-screen">{children}</div>;
}
