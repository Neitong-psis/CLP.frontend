export type AuthTab = 'login' | 'signup';

export const AUTH_TABS: Record<
  AuthTab,
  {
    label: string;
    heading: string;
    sub: string;
    ctaPrefix: string;
    ctaAction: string;
    ctaTab: AuthTab;
  }
> = {
  login: {
    label: 'Sign In',
    heading: 'Welcome Back!',
    sub: 'Sign in to continue your learning journey',
    ctaPrefix: "Don't have an account?",
    ctaAction: 'Sign up',
    ctaTab: 'signup',
  },
  signup: {
    label: 'Sign Up',
    heading: 'Create Your Account',
    sub: 'Join thousands of learners worldwide',
    ctaPrefix: 'Already have an account?',
    ctaAction: 'Sign in',
    ctaTab: 'login',
  },
};

export const LEFT_PANEL_COPY = {
  badge: 'Welcome back',
  heading: 'Excellence in\nEducation',
  sub: 'Empowering young leaders through world-class curriculum and innovative learning.',
  copyrightOwner: 'AYLA',
} as const;
