import LeftPanel from './_components/LeftPanel';
import { RightPanelSkeleton } from './_components/RightPanelSkeleton';

export default function LoginLoading() {
  return (
    <main className="3xl:mx-auto 3xl:max-w-[2560px] flex min-h-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden">
      <LeftPanel />
      <RightPanelSkeleton />
    </main>
  );
}
