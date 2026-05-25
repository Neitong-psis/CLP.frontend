import {
  GoogleIcon,
  FacebookIcon,
  MicrosoftIcon,
} from "@/components/common/icons/SocialIcons";

const OAUTH_PROVIDERS = [
  { id: "google",    label: "Google",    Icon: GoogleIcon,    iconClass: "h-4 w-4 shrink-0 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" },
  { id: "facebook",  label: "Facebook",  Icon: FacebookIcon,  iconClass: "h-4 w-4 shrink-0 text-[#1877F2] sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" },
  { id: "microsoft", label: "Microsoft", Icon: MicrosoftIcon, iconClass: "h-4 w-4 shrink-0 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" },
] as const;

export default function OAuthButtons() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 2xl:gap-4">
      {OAUTH_PROVIDERS.map(({ id, label, Icon, iconClass }) => (
        <button
          key={id}
          type="button"
          aria-label={`Continue with ${label}`}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-xs font-semibold text-[#00003e] transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] sm:gap-2 sm:px-3 sm:py-3 sm:text-sm 2xl:rounded-2xl 2xl:py-3.5 2xl:text-base 3xl:py-4 3xl:text-lg"
        >
          <Icon className={iconClass} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
