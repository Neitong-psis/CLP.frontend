export const ADMIN_USER = {
  name: 'Sarah Wilson',
  email: 'admin@clp.com',
  initials: 'SW',
  role: 'Platform Admin',
};

export type UserStatus = 'Active' | 'Inactive' | 'Suspended' | 'Achieved';
export type UserRole = 'Learner' | 'Educator' | 'Admin';

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
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Learner',
    status: 'Active',
    enrolled: 5,
    joined: 'Jan 15, 2024',
    lastActive: '2h ago',
  },
  {
    id: 'u2',
    name: 'Dr. Angela Yu',
    email: 'angela@example.com',
    role: 'Educator',
    status: 'Active',
    enrolled: 0,
    joined: 'Jun 20, 2023',
    lastActive: '3h ago',
  },
  {
    id: 'u3',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Admin',
    status: 'Active',
    enrolled: 0,
    joined: 'Mar 10, 2023',
    lastActive: '1d ago',
  },
  {
    id: 'u4',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Learner',
    status: 'Achieved',
    enrolled: 12,
    joined: 'Feb 28, 2024',
    lastActive: '5d ago',
  },
  {
    id: 'u5',
    name: 'Kirill Eremenko',
    email: 'kirill@example.com',
    role: 'Educator',
    status: 'Active',
    enrolled: 0,
    joined: 'Aug 12, 2023',
    lastActive: '5d ago',
  },
  {
    id: 'u6',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'Learner',
    status: 'Inactive',
    enrolled: 3,
    joined: 'Mar 5, 2025',
    lastActive: '2w ago',
  },
  {
    id: 'u7',
    name: 'Tom Chen',
    email: 'tom@example.com',
    role: 'Learner',
    status: 'Active',
    enrolled: 8,
    joined: 'Apr 1, 2025',
    lastActive: '30m ago',
  },
];

export type CourseStatus = 'Public' | 'Pending' | 'Archive';

export interface AdminCourseRow {
  id: string;
  title: string;
  category: string;
  level: string;
  instructor: string;
  enrolled: number;
  rating: number;
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
    rating: 4.8,
    status: 'Archive',
    createdAt: 'May 13, 2026',
  },
  {
    id: 'ac2',
    title: 'Machine Learning A-Z: Python & R',
    category: 'Data Science',
    level: 'Intermediate',
    instructor: 'Kirill Eremenko',
    enrolled: 189432,
    rating: 4.9,
    status: 'Public',
    createdAt: 'May 12, 2026',
  },
  {
    id: 'ac3',
    title: 'AWS Certified Solutions Architect',
    category: 'Cloud Computing',
    level: 'Advanced',
    instructor: 'Stephane Maarek',
    enrolled: 156789,
    rating: 4.7,
    status: 'Public',
    createdAt: 'May 11, 2026',
  },
  {
    id: 'ac4',
    title: 'The Complete JavaScript Course',
    category: 'Programming',
    level: 'Beginner',
    instructor: 'Jonas Schmedtmann',
    enrolled: 345678,
    rating: 4.9,
    status: 'Public',
    createdAt: 'May 10, 2026',
  },
  {
    id: 'ac5',
    title: 'React – The Complete Guide',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Maximilian Schwarzmuller',
    enrolled: 298765,
    rating: 4.8,
    status: 'Pending',
    createdAt: 'May 9, 2026',
  },
  {
    id: 'ac6',
    title: 'Python for Data Science',
    category: 'Data Science',
    level: 'Beginner',
    instructor: 'Jose Portilla',
    enrolled: 187654,
    rating: 4.7,
    status: 'Public',
    createdAt: 'May 8, 2026',
  },
  {
    id: 'ac7',
    title: 'Docker & Kubernetes: The Practical Guide',
    category: 'DevOps',
    level: 'Intermediate',
    instructor: 'Maximilian Schwarzmuller',
    enrolled: 134567,
    rating: 4.8,
    status: 'Public',
    createdAt: 'May 7, 2026',
  },
  {
    id: 'ac8',
    title: 'UI/UX Design Essentials',
    category: 'Design',
    level: 'Beginner',
    instructor: 'Daniel Walter Scott',
    enrolled: 98765,
    rating: 4.6,
    status: 'Archive',
    createdAt: 'May 6, 2026',
  },
  {
    id: 'ac9',
    title: 'Advanced React Patterns',
    category: 'Web Development',
    level: 'Advanced',
    instructor: 'Kent C. Dodds',
    enrolled: 85432,
    rating: 4.9,
    status: 'Pending',
    createdAt: 'May 5, 2026',
  },
  {
    id: 'ac10',
    title: 'Full-Stack Next.js',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Vercel Team',
    enrolled: 125432,
    rating: 4.9,
    status: 'Public',
    createdAt: 'May 4, 2026',
  },
  {
    id: 'ac11',
    title: 'Complete Python Bootcamp',
    category: 'Programming',
    level: 'Beginner',
    instructor: 'Jose Portilla',
    enrolled: 456789,
    rating: 4.8,
    status: 'Public',
    createdAt: 'May 3, 2026',
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
  { label: 'Educators', count: 2, color: '#10b981' },
  { label: 'Learners', count: 4, color: '#3b82f6' },
];

export type TopCourseVisibility = 'Public' | 'Pending' | 'Archive';

export const TOP_PERFORMING_COURSES = [
  {
    title: 'Complete Python Bootcamp',
    instructor: 'Jose Portilla',
    category: 'Programming',
    students: '315,758',
    visibility: 'Public' as TopCourseVisibility,
    progress: 90,
    rating: 4.8,
    revenue: '$84.2k',
  },
  {
    title: 'The Complete JavaScript Course',
    instructor: 'Jonas Schmedtmann',
    category: 'Programming',
    students: '245,678',
    visibility: 'Public' as TopCourseVisibility,
    progress: 78,
    rating: 4.9,
    revenue: '$65.5k',
  },
  {
    title: 'React – The Complete Guide',
    instructor: 'Maximilian Schwarzmuller',
    category: 'Web Dev',
    students: '178,765',
    visibility: 'Pending' as TopCourseVisibility,
    progress: 65,
    rating: 4.8,
    revenue: '$48.1k',
  },
  {
    title: 'Complete Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    category: 'Web Dev',
    students: '234,567',
    visibility: 'Archive' as TopCourseVisibility,
    progress: 72,
    rating: 4.7,
    revenue: '$62.3k',
  },
  {
    title: 'Machine Learning A-Z: Python & R',
    instructor: 'Kirill Eremenko',
    category: 'Data Science',
    students: '190,810',
    visibility: 'Public' as TopCourseVisibility,
    progress: 60,
    rating: 4.9,
    revenue: '$51.2k',
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
  { name: 'Data Science', amount: '$60.7k', pct: 100 },
  { name: 'Cloud', amount: '$49.1k', pct: 81 },
  { name: 'Programming', amount: '$41.2k', pct: 68 },
  { name: 'DevOps', amount: '$33.9k', pct: 56 },
  { name: 'Design', amount: '$21.9k', pct: 36 },
  { name: 'Web Dev', amount: '$20.4k', pct: 34 },
];

export const QUIZ_ANALYTICS = [
  {
    title: 'Python Fundamentals Quiz',
    difficult: 'List comprehensions',
    completion: 88,
    avgScore: 79,
    passRate: 74,
  },
  {
    title: 'Web Security Assessment',
    difficult: 'CSRF vs XSS',
    completion: 70,
    avgScore: 65,
    passRate: 61,
  },
  {
    title: 'Machine Learning Checkpoint',
    difficult: 'Bias-variance tradeoff',
    completion: 93,
    avgScore: 85,
    passRate: 90,
  },
] as const;

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
