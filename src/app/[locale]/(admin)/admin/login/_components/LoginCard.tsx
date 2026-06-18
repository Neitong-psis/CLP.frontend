import { getTranslations } from 'next-intl/server';
import AdminLoginForm from '@/app/[locale]/(admin)/admin/login/_components/AdminLoginForm';
import Logo from '@/components/common/Logo';

export default async function LoginCard() {
  const t = await getTranslations('admin.login');
  return (
    <div className="bg-brand-navy 3xl:px-28 flex w-full flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-8 xl:px-14 2xl:px-20">
      <div className="3xl:max-w-[640px] w-full max-w-100 sm:max-w-115 lg:max-w-[26rem] xl:max-w-[30rem] 2xl:max-w-135">
        {/* Mobile-only logo */}
        <div className="mb-6 flex justify-center lg:hidden">
          <Logo variant="light" size="md" className="w-35! sm:w-45!" />
        </div>

        <div className="3xl:px-16 3xl:py-14 rounded-xl bg-white px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-8 xl:px-12 xl:py-10 2xl:px-14 2xl:py-12">
          <div className="mb-5 2xl:mb-6">
            <h2 className="text-brand-navy 3xl:text-4xl text-xl leading-tight font-bold sm:text-[1.4rem] xl:text-[1.75rem] 2xl:text-3xl">
              {t('title')}
            </h2>
            <p className="text-brand-navy/45 3xl:text-lg mt-1.5 text-sm 2xl:mt-2 2xl:text-base">
              {t('subtitle')}
            </p>
          </div>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
