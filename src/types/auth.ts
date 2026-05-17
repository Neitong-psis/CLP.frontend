import type { UserRole } from "@/constants/roles";

export interface MockSession {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
  readonly avatarInitials: string;
}
