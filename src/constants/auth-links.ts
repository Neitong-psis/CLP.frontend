export function authHref(
  tab: 'login' | 'signup',
  role: 'learner' | 'educator',
): string {
  return `/auth?tab=${tab}&role=${role}`;
}
