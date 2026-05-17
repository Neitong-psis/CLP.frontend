import { UserRole } from "@/constants/roles";
import type { MockSession } from "@/types/auth";

export interface DemoUser extends MockSession {
  readonly label: string;
  readonly accessLabel: string;
  readonly badgeClassName: string;
}

export const DEMO_USERS: readonly DemoUser[] = [
  {
    id: "demo-admin",
    name: "Admin User",
    email: "admin@clp.com",
    role: UserRole.Admin,
    avatarInitials: "AU",
    label: "Admin User",
    accessLabel: "Admin Access",
    badgeClassName: "bg-red-600 text-white",
  },
  {
    id: "demo-educator",
    name: "Dr. Angela Yu",
    email: "educator@clp.com",
    role: UserRole.Instructor,
    avatarInitials: "AY",
    label: "Dr. Angela Yu",
    accessLabel: "Educator Access",
    badgeClassName: "bg-[#E6A23C] text-[#0F172A]",
  },
  {
    id: "demo-learner",
    name: "John Doe",
    email: "learner@clp.com",
    role: UserRole.Learner,
    avatarInitials: "JD",
    label: "John Doe",
    accessLabel: "Learner Access",
    badgeClassName: "bg-amber-400 text-[#0F172A]",
  },
] as const;

export const DEFAULT_DEMO_USER = DEMO_USERS[2];
