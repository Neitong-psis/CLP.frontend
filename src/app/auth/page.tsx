import RightPanel from '@/feature/auth/RightPanel';
import LeftPanel from '@/feature/auth/LeftPanel';

export default function LoginPage() {
  return (
    <div className="3xl:mx-auto 3xl:max-w-[2560px] flex min-h-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
