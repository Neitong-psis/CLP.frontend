import LeftPanel from '../auth/login/_components/LeftPanel';
import { RightPanelSkeleton } from '../auth/login/_components/RightPanelSkeleton';

export default function AuthLoading() {
  return (
    <div className="3xl:mx-auto 3xl:max-w-[2560px] flex min-h-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden">
      <LeftPanel />
      <RightPanelSkeleton />
    </div>
  );
}
