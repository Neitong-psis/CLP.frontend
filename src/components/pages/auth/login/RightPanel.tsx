import Logo from '@/components/common/Logo';
import AuthCard from './AuthCard';

export default function RightPanel() {
  return (
    <div className="3xl:px-28 flex w-full flex-1 flex-col items-center justify-center bg-[#00003e] px-4 py-8 sm:px-6 sm:py-10 lg:overflow-hidden lg:px-10 xl:px-14 2xl:px-20">
      <div className="3xl:max-w-[640px] w-full max-w-[400px] sm:max-w-[460px] lg:max-w-[440px] xl:max-w-[480px] 2xl:max-w-[540px]">
        {/* Mobile-only logo */}
        <div className="mb-6 flex justify-center lg:hidden">
          <Logo
            variant="light"
            size="md"
            className="!w-[140px] sm:!w-[180px]"
          />
        </div>

        {/* Card */}
        <div className="3xl:px-16 3xl:py-14 rounded-2xl bg-white px-5 py-6 shadow-2xl shadow-black/40 sm:px-7 sm:py-7 xl:px-12 xl:py-9 2xl:rounded-3xl 2xl:px-14 2xl:py-12">
          <AuthCard />
        </div>
      </div>
    </div>
  );
}
