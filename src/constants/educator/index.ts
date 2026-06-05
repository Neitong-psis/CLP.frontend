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

// ── Course tasks (My Courses workspace) ──────────────────────────────────────
// The educator workspace is organised as a task board: every course moves
// through To Do → In Writing → Under Review → Published (or Archived).

export type CourseTaskStatus =
  | 'To Do'
  | 'In Writing'
  | 'Under Review'
  | 'Published'
  | 'Archived';

export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface CourseTask {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  assignedBy: string;
  status: CourseTaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export const COURSE_TASK_STATUSES: CourseTaskStatus[] = [
  'To Do',
  'In Writing',
  'Under Review',
  'Published',
  'Archived',
];

export const EDUCATOR_COURSE_TASKS: CourseTask[] = [
  {
    id: 'ct1',
    title: 'AI Productivity for Office Teams',
    description:
      'Planning a practical course on using AI tools for daily operations, research, and team workflows.',
    category: 'AI',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    status: 'To Do',
    priority: 'High',
    dueDate: 'May 30, 2026',
  },
  {
    id: 'ct2',
    title: 'Business Analytics with Excel and Power BI',
    description:
      'Planning dashboards, spreadsheet models, and Power BI reporting lessons for business teams.',
    category: 'Business',
    price: '$39',
    assignedBy: 'Sarah Wilson',
    status: 'To Do',
    priority: 'High',
    dueDate: 'May 30, 2026',
  },
  {
    id: 'ct3',
    title: 'Intro to Python for Educators',
    description:
      'Planning beginner-friendly Python lessons for teachers who want to use coding in classrooms.',
    category: 'Programming',
    price: 'Free',
    assignedBy: 'Sarah Wilson',
    status: 'To Do',
    priority: 'Medium',
    dueDate: 'Jun 4, 2026',
  },
  {
    id: 'ct4',
    title: 'Digital Marketing Campaign Strategy',
    description:
      'Planning a strategy-first course covering campaign goals, channels, budgets, and performance reviews.',
    category: 'Marketing',
    price: '$24.99',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'High',
    dueDate: 'May 28, 2026',
  },
  {
    id: 'ct5',
    title: 'Foundations of Cloud Computing',
    description:
      'Drafting core cloud concepts, service models, deployment patterns, and real-world examples.',
    category: 'Cloud',
    price: '$34',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'Medium',
    dueDate: 'Jun 1, 2026',
  },
  {
    id: 'ct6',
    title: 'Agile Project Management Basics',
    description:
      'Lessons on sprints, backlogs, and ceremonies are written and ready for the admin review pass.',
    category: 'Business',
    price: '$32',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'High',
    dueDate: 'May 26, 2026',
  },
  {
    id: 'ct7',
    title: 'Responsive Web Design Essentials',
    description:
      'Mobile-first layout course submitted for approval — awaiting reviewer feedback before publishing.',
    category: 'Web Development',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'Medium',
    dueDate: 'May 27, 2026',
  },
  {
    id: 'ct8',
    title: 'Complete Web Development Bootcamp',
    description:
      'Live for learners with strong completion rates. Track performance and reviews in analytics.',
    category: 'Web Development',
    price: '$49',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 10',
  },
  {
    id: 'ct9',
    title: 'Advanced CSS & Sass: Flexbox, Grid, Animations',
    description:
      'Published and enrolling. Consider a refresh lesson on container queries next quarter.',
    category: 'Web Development',
    price: '$24',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published Apr 22',
  },
  {
    id: 'ct10',
    title: 'Legacy jQuery Patterns',
    description:
      'Archived after the framework refresh. Restore if you want to modernise and republish it.',
    category: 'Programming',
    price: '$19',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Mar 2',
  },
];

export type StudentStatus = 'Active' | 'Inactive' | 'Completed';
export type StudentActivity = 'Highly active' | 'Active' | 'At risk';

export interface StudentRow {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  activity: StudentActivity;
  status: StudentStatus;
  enrolled: string;
  lastSeen: string;
  earnings: string;
}

export const EDUCATOR_STUDENTS: StudentRow[] = [
  {
    id: 's1',
    name: 'Alex Johnson',
    email: 'alex.j@clp.com',
    course: 'Complete Web Development Bootcamp',
    progress: 84,
    activity: 'Highly active',
    status: 'Active',
    enrolled: 'Jan 2026',
    lastSeen: '30m ago',
    earnings: '$49',
  },
  {
    id: 's2',
    name: 'Sopheaktra Meng',
    email: 'sopheaktra@ayla.edu.kh',
    course: 'Complete Web Development Bootcamp',
    progress: 62,
    activity: 'Active',
    status: 'Active',
    enrolled: 'Feb 2026',
    lastSeen: '2h ago',
    earnings: '$49',
  },
  {
    id: 's3',
    name: 'John Doe',
    email: 'learner@clp.com',
    course: 'Advanced CSS & Sass',
    progress: 91,
    activity: 'Highly active',
    status: 'Completed',
    enrolled: 'Dec 2025',
    lastSeen: '1d ago',
    earnings: '$24',
  },
  {
    id: 's4',
    name: 'Sarah Lee',
    email: 'sarah.lee@clp.com',
    course: 'Node.js, Express, MongoDB & More',
    progress: 38,
    activity: 'At risk',
    status: 'Inactive',
    enrolled: 'Mar 2026',
    lastSeen: '2w ago',
    earnings: '$29',
  },
  {
    id: 's5',
    name: 'Jane Smith',
    email: 'jane.smith@clp.com',
    course: 'Complete Web Development Bootcamp',
    progress: 55,
    activity: 'Active',
    status: 'Active',
    enrolled: 'Feb 2026',
    lastSeen: '4h ago',
    earnings: '$49',
  },
  {
    id: 's6',
    name: 'Marcus Rivera',
    email: 'marcus.r@clp.com',
    course: 'React & TypeScript – Full Stack',
    progress: 73,
    activity: 'Highly active',
    status: 'Active',
    enrolled: 'Apr 2026',
    lastSeen: '1h ago',
    earnings: '$24',
  },
  {
    id: 's7',
    name: 'Emily Chen',
    email: 'emily.c@clp.com',
    course: 'Advanced CSS & Sass',
    progress: 100,
    activity: 'Highly active',
    status: 'Completed',
    enrolled: 'Jan 2026',
    lastSeen: '3d ago',
    earnings: '$24',
  },
  {
    id: 's8',
    name: 'David Kim',
    email: 'david.k@clp.com',
    course: 'Node.js, Express, MongoDB & More',
    progress: 20,
    activity: 'At risk',
    status: 'Active',
    enrolled: 'May 2026',
    lastSeen: '6h ago',
    earnings: '$29',
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
