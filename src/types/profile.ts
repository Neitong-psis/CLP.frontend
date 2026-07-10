export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  role: string;
  status: string;
  coursesCount?: number | string;
  joined: string;
  lastActive?: string;
  studentId?: string;
  program?: string;
  organization?: string;
  gender?: string;
  dob?: string;
  nationality?: string;
  address?: string;
  bio?: string;
}
