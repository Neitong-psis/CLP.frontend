export const ADMIN_USER = {
  name: 'Sarah Wilson',
  email: 'admin@clp.com',
  initials: 'SW',
  role: 'Platform Admin',
};

export type UserStatus = 'Active' | 'Inactive' | 'Suspended';
export type UserRole = 'Learner' | 'Instructor' | 'Admin';

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  enrolled: number;
  joined: string;
  lastActive: string;
}

export const ADMIN_USERS: AdminUserRow[] = [
  {
    id: 'u1',
    name: 'Sopheaktra Meng',
    email: 'sopheaktra@ayla.edu.kh',
    role: 'Learner',
    status: 'Active',
    enrolled: 5,
    joined: 'Jan 2026',
    lastActive: '2h ago',
  },
  {
    id: 'u2',
    name: 'John Doe',
    email: 'learner@clp.com',
    role: 'Learner',
    status: 'Active',
    enrolled: 3,
    joined: 'Feb 2026',
    lastActive: '1d ago',
  },
  {
    id: 'u3',
    name: 'Dr. Angela Yu',
    email: 'angela@clp.com',
    role: 'Instructor',
    status: 'Active',
    enrolled: 0,
    joined: 'Dec 2025',
    lastActive: '3h ago',
  },
  {
    id: 'u4',
    name: 'Kiril Eremenko',
    email: 'kiril@clp.com',
    role: 'Instructor',
    status: 'Active',
    enrolled: 0,
    joined: 'Nov 2025',
    lastActive: '5d ago',
  },
  {
    id: 'u5',
    name: 'Jane Smith',
    email: 'jane.smith@clp.com',
    role: 'Learner',
    status: 'Inactive',
    enrolled: 1,
    joined: 'Mar 2026',
    lastActive: '2w ago',
  },
  {
    id: 'u6',
    name: 'Alex Johnson',
    email: 'alex.j@clp.com',
    role: 'Learner',
    status: 'Active',
    enrolled: 4,
    joined: 'Jan 2026',
    lastActive: '30m ago',
  },
  {
    id: 'u7',
    name: 'Sarah Lee',
    email: 'sarah.lee@clp.com',
    role: 'Learner',
    status: 'Suspended',
    enrolled: 2,
    joined: 'Feb 2026',
    lastActive: '1w ago',
  },
  {
    id: 'u8',
    name: 'Jose Portilla',
    email: 'jose@clp.com',
    role: 'Instructor',
    status: 'Active',
    enrolled: 0,
    joined: 'Oct 2025',
    lastActive: '1d ago',
  },
];

export type CourseStatus = 'Published' | 'Draft' | 'Archived';

export interface AdminCourseRow {
  id: string;
  title: string;
  category: string;
  level: string;
  instructor: string;
  enrolled: number;
  completionRate: number;
  status: CourseStatus;
  createdAt: string;
}

export const ADMIN_COURSES: AdminCourseRow[] = [
  {
    id: 'ac1',
    title: 'Complete Web Development Bootcamp',
    category: 'Web Development',
    level: 'Beginner',
    instructor: 'Dr. Angela Yu',
    enrolled: 234567,
    completionRate: 68,
    status: 'Archived',
    createdAt: 'Jan 2026',
  },
  {
    id: 'ac2',
    title: 'Machine Learning A-Z: Python & R',
    category: 'Data Science',
    level: 'Intermediate',
    instructor: 'Kiril Eremenko',
    enrolled: 190810,
    completionRate: 45,
    status: 'Published',
    createdAt: 'Dec 2025',
  },
  {
    id: 'ac3',
    title: 'AWS Certified Solutions Architect',
    category: 'Cloud Computing',
    level: 'Advanced',
    instructor: 'Stephane Maarek',
    enrolled: 156000,
    completionRate: 30,
    status: 'Published',
    createdAt: 'Nov 2025',
  },
  {
    id: 'ac4',
    title: 'The Complete JavaScript Course',
    category: 'Programming',
    level: 'Beginner',
    instructor: 'Jonas Schmedtmann',
    enrolled: 245678,
    completionRate: 72,
    status: 'Published',
    createdAt: 'Oct 2025',
  },
  {
    id: 'ac5',
    title: 'React – The Complete Guide',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Maximilian Schwarzmuller',
    enrolled: 178765,
    completionRate: 58,
    status: 'Draft',
    createdAt: 'Jan 2026',
  },
  {
    id: 'ac6',
    title: 'Docker & Kubernetes: The Practical Guide',
    category: 'DevOps',
    level: 'Intermediate',
    instructor: 'Maximilian Schwarzmuller',
    enrolled: 94000,
    completionRate: 40,
    status: 'Published',
    createdAt: 'Feb 2026',
  },
  {
    id: 'ac7',
    title: 'Complete Python Bootcamp',
    category: 'Programming',
    level: 'Beginner',
    instructor: 'Jose Portilla',
    enrolled: 315758,
    completionRate: 75,
    status: 'Published',
    createdAt: 'Sep 2025',
  },
  {
    id: 'ac8',
    title: 'UI/UX Design Essentials',
    category: 'Design',
    level: 'Beginner',
    instructor: 'Daniel Walter Scott',
    enrolled: 0,
    completionRate: 0,
    status: 'Draft',
    createdAt: 'Apr 2026',
  },
];

export const DASHBOARD_STATS = [
  { label: 'Total Users', value: '7', change: '+13%', icon: 'users' },
  { label: 'Active Courses', value: '7', change: '+4%', icon: 'book' },
  {
    label: 'Total Enrollments',
    value: '2,313,870',
    change: '+28%',
    icon: 'trending',
  },
  { label: 'Monthly Revenue', value: '$98.6k', change: '+15%', icon: 'dollar' },
  {
    label: 'Total Certificates',
    value: '12,450',
    change: '+14%',
    icon: 'award',
  },
  { label: 'Verified Claims', value: '8,920', change: '+14%', icon: 'shield' },
] as const;

export const USER_DISTRIBUTION = [
  { label: 'Admins', count: 1, color: '#f4a300' },
  { label: 'Educators', count: 2, color: '#4e9af1' },
  { label: 'Learners', count: 4, color: '#10b981' },
];

export type TopCourseVisibility = 'Public' | 'Pending' | 'Archive';

export const TOP_PERFORMING_COURSES = [
  {
    title: 'Complete Python Bootcamp',
    students: '315,758',
    visibility: 'Public' as TopCourseVisibility,
    progress: 90,
  },
  {
    title: 'The Complete JavaScript Course',
    students: '245,678',
    visibility: 'Public' as TopCourseVisibility,
    progress: 78,
  },
  {
    title: 'React – The Complete Guide',
    students: '178,765',
    visibility: 'Pending' as TopCourseVisibility,
    progress: 65,
  },
  {
    title: 'Complete Web Development Bootcamp',
    students: '234,567',
    visibility: 'Archive' as TopCourseVisibility,
    progress: 72,
  },
  {
    title: 'Machine Learning A-Z: Python & R',
    students: '190,810',
    visibility: 'Public' as TopCourseVisibility,
    progress: 60,
  },
];

export const REVENUE_STATS = [
  { label: 'Annual Revenue', value: '$806.5k', change: '+53%' },
  { label: 'This Month', value: '$98.6k', change: '+15%' },
  { label: 'Monthly Recurring Revenue', value: '$98.6k', change: '+46%' },
  { label: 'Avg Order Value', value: '$43', change: '+14%' },
] as const;

export const MONTHLY_REVENUE = [
  { month: 'Jun', amount: 38 },
  { month: 'Jul', amount: 42 },
  { month: 'Aug', amount: 45 },
  { month: 'Sep', amount: 52 },
  { month: 'Oct', amount: 58 },
  { month: 'Nov', amount: 63 },
  { month: 'Dec', amount: 71 },
  { month: 'Jan', amount: 75 },
  { month: 'Feb', amount: 82 },
  { month: 'Mar', amount: 88 },
  { month: 'Apr', amount: 91 },
  { month: 'May', amount: 98.6 },
];

export const REVENUE_BY_CATEGORY = [
  { name: 'Web Dev', amount: '$20.4k', pct: 100 },
  { name: 'Data Science', amount: '$60.7k', pct: 74 },
  { name: 'Cloud', amount: '$49.1k', pct: 60 },
  { name: 'Programming', amount: '$41.2k', pct: 50 },
  { name: 'DevOps', amount: '$33.9k', pct: 41 },
  { name: 'Design', amount: '$21.9k', pct: 26 },
];

export const PLATFORM_ANALYTICS_DATA = [
  { month: 'Jun', users: 12000, enrollments: 28000 },
  { month: 'Jul', users: 18000, enrollments: 34000 },
  { month: 'Aug', users: 22000, enrollments: 40000 },
  { month: 'Sep', users: 28000, enrollments: 46000 },
  { month: 'Oct', users: 32000, enrollments: 50000 },
  { month: 'Nov', users: 36000, enrollments: 55000 },
  { month: 'Dec', users: 40000, enrollments: 60000 },
  { month: 'Jan', users: 44000, enrollments: 65000 },
  { month: 'Feb', users: 48000, enrollments: 70000 },
  { month: 'Mar', users: 52000, enrollments: 75000 },
  { month: 'Apr', users: 56000, enrollments: 80000 },
  { month: 'May', users: 60000, enrollments: 85000 },
];

export const RECENT_ENROLLMENTS = [
  {
    user: 'Alex Johnson',
    course: 'Complete Web Development Bootcamp',
    date: 'May 20, 2026',
    status: 'Active',
  },
  {
    user: 'Sopheaktra Meng',
    course: 'Machine Learning A-Z',
    date: 'May 19, 2026',
    status: 'Active',
  },
  {
    user: 'John Doe',
    course: 'AWS Certified Solutions Architect',
    date: 'May 18, 2026',
    status: 'Active',
  },
  {
    user: 'Jane Smith',
    course: 'React – The Complete Guide',
    date: 'May 17, 2026',
    status: 'Inactive',
  },
  {
    user: 'Sarah Lee',
    course: 'The Complete JavaScript Course',
    date: 'May 16, 2026',
    status: 'Active',
  },
];

export const WEEKLY_ENROLLMENTS = [
  { day: 'Mon', count: 42 },
  { day: 'Tue', count: 68 },
  { day: 'Wed', count: 55 },
  { day: 'Thu', count: 90 },
  { day: 'Fri', count: 73 },
  { day: 'Sat', count: 28 },
  { day: 'Sun', count: 15 },
];

export const TOP_COURSES = [
  { title: 'Complete Python Bootcamp', enrolled: 315758, completion: 75 },
  { title: 'Complete JavaScript Course', enrolled: 245678, completion: 72 },
  { title: 'Web Development Bootcamp', enrolled: 234567, completion: 68 },
  { title: 'React – The Complete Guide', enrolled: 178765, completion: 58 },
  { title: 'Machine Learning A-Z', enrolled: 190810, completion: 45 },
];
