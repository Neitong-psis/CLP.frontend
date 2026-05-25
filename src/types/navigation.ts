export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface SocialLink {
  readonly href: string;
  readonly label: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}
