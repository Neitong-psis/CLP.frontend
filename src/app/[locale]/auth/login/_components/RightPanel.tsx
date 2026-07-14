import Link from 'next/link';
import Logo from '@/components/common/Logo';
import AuthCard from './AuthCard';

export default function RightPanel() {
  return (
    <div className="3xl:px-28 bg-brand-navy flex w-full flex-1 flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-[clamp(0.75rem,4vh,3.5rem)] xl:px-14 2xl:px-20">
      <div className="3xl:max-w-[640px] w-full max-w-100 sm:max-w-115 lg:max-w-110 xl:max-w-120 2xl:max-w-135">
        {/* Mobile-only logo */}
        <div className="mb-6 flex justify-center lg:hidden">
          <Link
            href="/"
            className="transition-opacity hover:opacity-80"
            aria-label="Go to homepage"
          >
            <Logo variant="light" size="md" className="h-14 sm:h-16" />
          </Link>
        </div>

        {/* Card */}
        <div className="3xl:px-16 rounded-2xl bg-white px-5 py-6 shadow-2xl shadow-black/40 sm:px-7 sm:py-7 lg:py-[clamp(0.75rem,3vh,2.5rem)] xl:px-12 2xl:rounded-3xl 2xl:px-14">
          <AuthCard />
        </div>
      </div>
    </div>
  );
}
