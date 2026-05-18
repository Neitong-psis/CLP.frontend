import LeftPanel from "@/components/pages/auth/login/LeftPanel";
import RightPanel from "@/components/pages/auth/login/RightPanel";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden 3xl:mx-auto 3xl:max-w-[2560px]">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
