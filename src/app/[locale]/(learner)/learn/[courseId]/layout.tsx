import { ToastProvider } from '@/components/ui/toast';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="bg-background min-h-screen">{children}</div>
    </ToastProvider>
  );
}
