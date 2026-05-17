export const UserRole = {
  Learner: "LEARNER",
  Instructor: "INSTRUCTOR",
  Admin: "ADMIN",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
