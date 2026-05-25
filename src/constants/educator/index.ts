export const EDUCATOR_USER = {
  name: 'Dr. Angela Yu',
  email: 'angela@clp.com',
  initials: 'AY',
  role: 'Educator',
};

export type CourseStatus = 'Published' | 'Draft' | 'Under Review';

export interface EducatorCourse {
  id: string;
  title: string;
  category: string;
  level: string;
  enrolled: number;
  completionRate: number;
  rating: number;
  status: CourseStatus;
  revenue: string;
  updatedAt: string;
}

export const EDUCATOR_COURSES: EducatorCourse[] = [
  {
    id: 'ec1',
    title: 'Complete Web Development Bootcamp',
    category: 'Web Development',
    level: 'Beginner',
    enrolled: 342,
    completionRate: 68,
    rating: 4.8,
    status: 'Published',
    revenue: '$8,208',
    updatedAt: 'May 10, 2026',
  },
  {
    id: 'ec2',
    title: 'Advanced CSS & Sass: Flexbox, Grid, Animations',
    category: 'Web Development',
    level: 'Intermediate',
    enrolled: 215,
    completionRate: 74,
    rating: 4.7,
    status: 'Published',
    revenue: '$5,160',
    updatedAt: 'Apr 22, 2026',
  },
  {
    id: 'ec3',
    title: 'Node.js, Express, MongoDB & More',
    category: 'Web Development',
    level: 'Intermediate',
    enrolled: 187,
    completionRate: 60,
    rating: 4.6,
    status: 'Published',
    revenue: '$4,488',
    updatedAt: 'Mar 15, 2026',
  },
  {
    id: 'ec4',
    title: 'React & TypeScript – Full Stack',
    category: 'Programming',
    level: 'Advanced',
    enrolled: 98,
    completionRate: 42,
    rating: 4.9,
    status: 'Published',
    revenue: '$2,352',
    updatedAt: 'May 5, 2026',
  },
  {
    id: 'ec5',
    title: 'Python Automation & Scripting',
    category: 'Programming',
    level: 'Beginner',
    enrolled: 0,
    completionRate: 0,
    rating: 0,
    status: 'Draft',
    revenue: '$0',
    updatedAt: 'May 18, 2026',
  },
  {
    id: 'ec6',
    title: 'GraphQL API Design',
    category: 'Web Development',
    level: 'Advanced',
    enrolled: 0,
    completionRate: 0,
    rating: 0,
    status: 'Under Review',
    revenue: '$0',
    updatedAt: 'May 20, 2026',
  },
];

export interface StudentRow {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  status: 'Active' | 'Inactive' | 'Completed';
  enrolled: string;
  lastSeen: string;
}

export const EDUCATOR_STUDENTS: StudentRow[] = [
  {
    id: 's1',
    name: 'Alex Johnson',
    email: 'alex.j@clp.com',
    course: 'Complete Web Development Bootcamp',
    progress: 84,
    status: 'Active',
    enrolled: 'Jan 2026',
    lastSeen: '30m ago',
  },
  {
    id: 's2',
    name: 'Sopheaktra Meng',
    email: 'sopheaktra@ayla.edu.kh',
    course: 'Complete Web Development Bootcamp',
    progress: 62,
    status: 'Active',
    enrolled: 'Feb 2026',
    lastSeen: '2h ago',
  },
  {
    id: 's3',
    name: 'John Doe',
    email: 'learner@clp.com',
    course: 'Advanced CSS & Sass',
    progress: 91,
    status: 'Completed',
    enrolled: 'Dec 2025',
    lastSeen: '1d ago',
  },
  {
    id: 's4',
    name: 'Sarah Lee',
    email: 'sarah.lee@clp.com',
    course: 'Node.js, Express, MongoDB & More',
    progress: 38,
    status: 'Inactive',
    enrolled: 'Mar 2026',
    lastSeen: '2w ago',
  },
  {
    id: 's5',
    name: 'Jane Smith',
    email: 'jane.smith@clp.com',
    course: 'Complete Web Development Bootcamp',
    progress: 55,
    status: 'Active',
    enrolled: 'Feb 2026',
    lastSeen: '4h ago',
  },
  {
    id: 's6',
    name: 'Marcus Rivera',
    email: 'marcus.r@clp.com',
    course: 'React & TypeScript – Full Stack',
    progress: 73,
    status: 'Active',
    enrolled: 'Apr 2026',
    lastSeen: '1h ago',
  },
  {
    id: 's7',
    name: 'Emily Chen',
    email: 'emily.c@clp.com',
    course: 'Advanced CSS & Sass',
    progress: 100,
    status: 'Completed',
    enrolled: 'Jan 2026',
    lastSeen: '3d ago',
  },
  {
    id: 's8',
    name: 'David Kim',
    email: 'david.k@clp.com',
    course: 'Node.js, Express, MongoDB & More',
    progress: 20,
    status: 'Active',
    enrolled: 'May 2026',
    lastSeen: '6h ago',
  },
];

export const EDUCATOR_STATS = [
  { label: 'Total Students', value: '842', change: '+24 this month' },
  { label: 'Published Courses', value: '4', change: '+1 this month' },
  { label: 'Avg. Completion', value: '61%', change: '+3% this month' },
  { label: 'Total Revenue', value: '$20,208', change: '+$1,240 this month' },
] as const;

export const WEEKLY_ENROLLMENTS = [
  { day: 'Mon', count: 18 },
  { day: 'Tue', count: 32 },
  { day: 'Wed', count: 27 },
  { day: 'Thu', count: 45 },
  { day: 'Fri', count: 38 },
  { day: 'Sat', count: 12 },
  { day: 'Sun', count: 8 },
];

export const RECENT_ACTIVITY = [
  {
    student: 'Alex Johnson',
    action: 'Completed lesson',
    course: 'Web Dev Bootcamp',
    time: '30m ago',
  },
  {
    student: 'Marcus Rivera',
    action: 'Submitted quiz',
    course: 'React & TypeScript',
    time: '1h ago',
  },
  {
    student: 'David Kim',
    action: 'Enrolled',
    course: 'Node.js, Express, MongoDB',
    time: '6h ago',
  },
  {
    student: 'Sopheaktra Meng',
    action: 'Left a review ★★★★★',
    course: 'Web Dev Bootcamp',
    time: '8h ago',
  },
  {
    student: 'Emily Chen',
    action: 'Completed course',
    course: 'Advanced CSS & Sass',
    time: '1d ago',
  },
];

export const TOP_COURSES = [
  { title: 'Complete Web Development Bootcamp', enrolled: 342, completion: 68 },
  { title: 'Advanced CSS & Sass', enrolled: 215, completion: 74 },
  { title: 'Node.js, Express, MongoDB & More', enrolled: 187, completion: 60 },
  { title: 'React & TypeScript – Full Stack', enrolled: 98, completion: 42 },
];

export const DASHBOARD_STATS = [
  { label: 'Total Students', value: '4,751', change: '+18%' },
  { label: 'Published Courses', value: '3', change: '+2' },
  { label: 'Avg Rating', value: '4.7', change: '+0.2' },
  { label: 'Monthly Earnings', value: '$7,960', change: '+24%' },
] as const;

export const MONTHLY_ENROLLMENTS = [
  { month: 'Jun', count: 80 },
  { month: 'Jul', count: 105 },
  { month: 'Aug', count: 150 },
  { month: 'Sep', count: 130 },
  { month: 'Oct', count: 165 },
  { month: 'Nov', count: 195 },
  { month: 'Dec', count: 205 },
  { month: 'Jan', count: 225 },
  { month: 'Feb', count: 260 },
  { month: 'Mar', count: 305 },
  { month: 'Apr', count: 370 },
  { month: 'May', count: 420 },
];

export const DASHBOARD_TOP_COURSES = [
  { title: 'React Masterclass', students: 1842, rating: 4.9 },
  { title: 'Node.js Fundamentals', students: 1203, rating: 4.7 },
  { title: 'TypeScript Deep Dive', students: 876, rating: 4.8 },
];

export const COMPLETION_RATES = [
  { title: 'React Masterclass', rate: 74 },
  { title: 'Node.js Fundamentals', rate: 68 },
  { title: 'TypeScript Deep Dive', rate: 81 },
  { title: 'GraphQL Essentials', rate: 59 },
];

export const QUIZ_ANALYTICS = [
  {
    title: 'Introduction Quiz',
    difficult: 'CSS specificity',
    completion: 82,
    avgScore: 76,
    passRate: 71,
  },
  {
    title: 'HTML Assessment',
    difficult: 'Semantic landmarks',
    completion: 64,
    avgScore: 68,
    passRate: 58,
  },
  {
    title: 'Advanced Patterns Review',
    difficult: 'Render props',
    completion: 91,
    avgScore: 84,
    passRate: 88,
  },
];
