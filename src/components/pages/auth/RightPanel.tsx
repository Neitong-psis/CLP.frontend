import Logo from '@/components/common/Logo';
import AuthCard from './AuthCard';

export default function RightPanel() {
  return (
    <div className="3xl:px-28 bg-brand-navy flex w-full flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:overflow-hidden lg:px-10 xl:px-14 2xl:px-20">
      <div className="3xl:max-w-[640px] w-full max-w-100 sm:max-w-115 lg:max-w-110 xl:max-w-120 2xl:max-w-135">
        {/* Mobile-only logo */}
        <div className="mb-6 flex justify-center lg:hidden">
          <Logo variant="light" size="md" className="w-35! sm:w-45!" />
        </div>

        {/* Card */}
        <div className="3xl:px-16 3xl:py-14 rounded-lg bg-white px-5 py-6 sm:px-7 sm:py-7 xl:px-12 xl:py-9 2xl:px-14 2xl:py-12">
          <AuthCard />
        </div>
      </div>
    </div>
  );
}
