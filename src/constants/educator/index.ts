import {
  type LucideIcon,
  Users,
  BookOpen,
  Star,
  DollarSign,
} from 'lucide-react';

/** Static role label/fallback initials — actual identity comes from
 *  `useCurrentUser()`, sourced from the authenticated session. */
export const EDUCATOR_USER = {
  initials: '?',
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

/** Admin decision on a submitted course, surfaced as the status badge under review. */
export type ReviewState = 'Approved' | 'Reject' | 'Under Review';

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
  /** Under Review — admin decision shown as the card's status badge. */
  reviewState?: ReviewState;
  /** Under Review — relative time since submission (e.g. "1 day ago"). */
  submittedAgo?: string;
  /** Published — enrolled learner count. */
  students?: number;
  /** Published — gross revenue label (e.g. "$163,938"). */
  revenue?: string;
  /** Published — average rating out of 5. */
  rating?: number;
  /** Published — relative time since the last update (e.g. "2 days ago"). */
  updatedAgo?: string;
}

export const COURSE_TASK_STATUSES: CourseTaskStatus[] = [
  'To Do',
  'In Writing',
  'Under Review',
  'Published',
  'Archived',
];

export const EDUCATOR_COURSE_TASKS: CourseTask[] = [
  // ── To Do — assigned by admin, awaiting the educator to start writing ────────
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
    priority: 'High',
    dueDate: 'May 30, 2026',
  },
  {
    id: 'ct4',
    title: 'Digital Marketing Campaign Strategy',
    description:
      'Planning a strategy-first course covering campaign goals, channels, budgets, and performance reviews.',
    category: 'Marketing',
    price: '$24.99',
    assignedBy: 'Sarah Wilson',
    status: 'To Do',
    priority: 'High',
    dueDate: 'May 30, 2026',
  },
  {
    id: 'ct5',
    title: 'Foundations of Cloud Computing',
    description:
      'Planning core cloud concepts, service models, deployment patterns, and real-world examples.',
    category: 'Cloud',
    price: '$34',
    assignedBy: 'Sarah Wilson',
    status: 'To Do',
    priority: 'High',
    dueDate: 'May 30, 2026',
  },

  // ── In Writing — educator is actively drafting the content ───────────────────
  {
    id: 'ct6',
    title: 'UI/UX Design Fundamentals',
    description:
      'Building lessons for user research, wireframes, design systems, usability testing, and product handoff.',
    category: 'Design',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'High',
    dueDate: 'Jun 2, 2026',
  },
  {
    id: 'ct7',
    title: 'Full-Stack JavaScript Bootcamp',
    description:
      'Currently editing modules for frontend fundamentals, APIs, authentication, and deployment.',
    category: 'Web Dev',
    price: '$79',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'High',
    dueDate: 'Jun 5, 2026',
  },
  {
    id: 'ct8',
    title: 'Prompt Engineering for Business Teams',
    description:
      'Writing practical prompt patterns for research, analysis, customer support, and operations.',
    category: 'AI',
    price: '$49',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'Medium',
    dueDate: 'Jun 6, 2026',
  },
  {
    id: 'ct9',
    title: 'Product Management Essentials',
    description:
      'Drafting product discovery, roadmap planning, user stories, prioritization, and launch lessons.',
    category: 'Business',
    price: '$44.99',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'Medium',
    dueDate: 'Jun 8, 2026',
  },
  {
    id: 'ct10',
    title: 'Data Visualization with Tableau',
    description:
      'Preparing visual analytics lessons focused on dashboards, storytelling, and stakeholder reporting.',
    category: 'Data Science',
    price: '$59',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'Low',
    dueDate: 'Jun 10, 2026',
  },

  // ── Under Review — submitted, awaiting the admin decision ────────────────────
  {
    id: 'ct11',
    title: 'Cybersecurity Awareness for Teams',
    description:
      'Submitted for admin review with modules on phishing, passwords, device safety, and reporting incidents.',
    category: 'Security',
    price: '$19',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'High',
    dueDate: 'May 26, 2026',
    reviewState: 'Approved',
    submittedAgo: '1 day ago',
  },
  {
    id: 'ct12',
    title: 'Figma to Developer Handoff',
    description:
      'Submitted for admin review with lessons on components, design tokens, specs, and QA handoff.',
    category: 'Design',
    price: '$35',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'High',
    dueDate: 'May 25, 2026',
    reviewState: 'Reject',
    submittedAgo: '2 days ago',
  },
  {
    id: 'ct13',
    title: 'Agile Project Management Basics',
    description:
      'Submitted for admin review with practical sprint planning, backlog, standup, and retrospective lessons.',
    category: 'Business',
    price: 'Free',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'Medium',
    dueDate: 'May 23, 2026',
    reviewState: 'Under Review',
    submittedAgo: '4 days ago',
  },
  {
    id: 'ct14',
    title: 'No-Code Automation with Zapier',
    description:
      'Submitted for admin review with workflow automation examples for teams and small businesses.',
    category: 'Productivity',
    price: '$22',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'Medium',
    dueDate: 'May 21, 2026',
    reviewState: 'Under Review',
    submittedAgo: '6 days ago',
  },
  {
    id: 'ct15',
    title: 'Online Teaching Methods',
    description:
      'Submitted for admin review with lesson planning, learner engagement, assessments, and feedback loops.',
    category: 'Education',
    price: '$27',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'Low',
    dueDate: 'May 20, 2026',
    reviewState: 'Under Review',
    submittedAgo: '1 week ago',
  },

  // ── Published — approved by admin, live for learners ─────────────────────────
  {
    id: 'ct16',
    title: 'React Masterclass for Production Apps',
    description:
      'Approved and publicly available with production React patterns, forms, routing, and performance lessons.',
    category: 'Web Dev',
    price: '$89',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 10',
    students: 1842,
    revenue: '$163,938',
    rating: 4.9,
    updatedAgo: '2 days ago',
  },
  {
    id: 'ct17',
    title: 'AI for Marketing Content',
    description:
      'Approved course teaching AI-assisted campaign planning, content briefs, editing, and brand consistency.',
    category: 'Marketing',
    price: '$49',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 7',
    students: 1260,
    revenue: '$61,740',
    rating: 4.8,
    updatedAgo: '5 days ago',
  },
  {
    id: 'ct18',
    title: 'Python Data Analysis Starter Kit',
    description:
      'Approved public course covering notebooks, pandas, charts, data cleanup, and reporting workflows.',
    category: 'Data Science',
    price: '$59',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 5',
    students: 980,
    revenue: '$57,820',
    rating: 4.7,
    updatedAgo: '1 week ago',
  },
  {
    id: 'ct19',
    title: 'Brand Strategy for Startups',
    description:
      'Approved public course on positioning, messaging, customer segments, and launch storytelling.',
    category: 'Business',
    price: '$39',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 2',
    students: 740,
    revenue: '$28,860',
    rating: 4.6,
    updatedAgo: '10 days ago',
  },
  {
    id: 'ct20',
    title: 'Instructional Design for Digital Courses',
    description:
      'Approved public course for educators designing outcomes, activities, assessments, and course structure.',
    category: 'Education',
    price: 'Free',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published Apr 28',
    students: 1560,
    revenue: '$0',
    rating: 4.8,
    updatedAgo: '2 weeks ago',
  },

  // ── Archived — retired, editable for future resubmission ─────────────────────
  {
    id: 'ct21',
    title: 'Legacy WordPress Site Management',
    description:
      'Retired course kept for records. Editing is locked and only Admin can restore or remove it.',
    category: 'Web Dev',
    price: '$19',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Mar 2',
  },
  {
    id: 'ct22',
    title: 'Basic Email Marketing Tools',
    description:
      'Older marketing workflow course archived after the curriculum moved to a newer version.',
    category: 'Marketing',
    price: '$15',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Feb 18',
  },
  {
    id: 'ct23',
    title: 'Classroom Presentation Basics',
    description:
      'Archived teaching fundamentals course retained for historical review.',
    category: 'Education',
    price: 'Free',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Feb 4',
  },
  {
    id: 'ct24',
    title: 'Small Business Finance Starter',
    description:
      'Archived starter course replaced by the current business analytics track.',
    category: 'Business',
    price: '$25',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Jan 22',
  },
  {
    id: 'ct25',
    title: 'Design Portfolio Workshop',
    description:
      'Retired workshop course. Public edits and educator changes are disabled.',
    category: 'Design',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Jan 9',
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
  {
    id: 's9',
    name: 'Priya Nair',
    email: 'priya.n@clp.com',
    course: 'React & TypeScript – Full Stack',
    progress: 47,
    activity: 'Active',
    status: 'Active',
    enrolled: 'Mar 2026',
    lastSeen: '5h ago',
    earnings: '$24',
  },
  {
    id: 's10',
    name: 'Tomás Herrera',
    email: 'tomas.h@clp.com',
    course: 'Complete Web Development Bootcamp',
    progress: 100,
    activity: 'Highly active',
    status: 'Completed',
    enrolled: 'Nov 2025',
    lastSeen: '2d ago',
    earnings: '$49',
  },
  {
    id: 's11',
    name: 'Chloe Martin',
    email: 'chloe.m@clp.com',
    course: 'Advanced CSS & Sass',
    progress: 12,
    activity: 'At risk',
    status: 'Inactive',
    enrolled: 'Apr 2026',
    lastSeen: '3w ago',
    earnings: '$24',
  },
  {
    id: 's12',
    name: 'Kenji Watanabe',
    email: 'kenji.w@clp.com',
    course: 'Node.js, Express, MongoDB & More',
    progress: 68,
    activity: 'Active',
    status: 'Active',
    enrolled: 'Feb 2026',
    lastSeen: '3h ago',
    earnings: '$29',
  },
  {
    id: 's13',
    name: 'Fatima Al-Sayed',
    email: 'fatima.a@clp.com',
    course: 'React & TypeScript – Full Stack',
    progress: 89,
    activity: 'Highly active',
    status: 'Active',
    enrolled: 'Jan 2026',
    lastSeen: '45m ago',
    earnings: '$24',
  },
  {
    id: 's14',
    name: 'Liam O’Brien',
    email: 'liam.o@clp.com',
    course: 'Complete Web Development Bootcamp',
    progress: 100,
    activity: 'Active',
    status: 'Completed',
    enrolled: 'Dec 2025',
    lastSeen: '5d ago',
    earnings: '$49',
  },
  {
    id: 's15',
    name: 'Sofia Rossi',
    email: 'sofia.r@clp.com',
    course: 'Advanced CSS & Sass',
    progress: 34,
    activity: 'At risk',
    status: 'Inactive',
    enrolled: 'Apr 2026',
    lastSeen: '2w ago',
    earnings: '$24',
  },
  {
    id: 's16',
    name: 'Noah Williams',
    email: 'noah.w@clp.com',
    course: 'Node.js, Express, MongoDB & More',
    progress: 76,
    activity: 'Highly active',
    status: 'Active',
    enrolled: 'Feb 2026',
    lastSeen: '1h ago',
    earnings: '$29',
  },
  {
    id: 's17',
    name: 'Amara Okafor',
    email: 'amara.o@clp.com',
    course: 'Complete Web Development Bootcamp',
    progress: 58,
    activity: 'Active',
    status: 'Active',
    enrolled: 'Mar 2026',
    lastSeen: '7h ago',
    earnings: '$49',
  },
  {
    id: 's18',
    name: 'Lucas Silva',
    email: 'lucas.s@clp.com',
    course: 'React & TypeScript – Full Stack',
    progress: 100,
    activity: 'Highly active',
    status: 'Completed',
    enrolled: 'Nov 2025',
    lastSeen: '4d ago',
    earnings: '$24',
  },
  {
    id: 's19',
    name: 'Hannah Becker',
    email: 'hannah.b@clp.com',
    course: 'Advanced CSS & Sass',
    progress: 8,
    activity: 'At risk',
    status: 'Inactive',
    enrolled: 'May 2026',
    lastSeen: '1mo ago',
    earnings: '$24',
  },
  {
    id: 's20',
    name: 'Mateo González',
    email: 'mateo.g@clp.com',
    course: 'Complete Web Development Bootcamp',
    progress: 63,
    activity: 'Active',
    status: 'Active',
    enrolled: 'Feb 2026',
    lastSeen: '2h ago',
    earnings: '$49',
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

export interface DashboardStatConfig {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconBg: string;
  gradient: string;
  href: string;
}

export const EDUCATOR_STAT_CONFIG: DashboardStatConfig[] = [
  {
    label: 'Total Students',
    value: '4,751',
    change: '+18%',
    icon: Users,
    iconBg: 'bg-brand-navy',
    gradient: 'from-blue-700 to-indigo-900',
    href: '/educator/students',
  },
  {
    label: 'Published Courses',
    value: '3',
    change: '+2',
    icon: BookOpen,
    iconBg: 'bg-brand-gold',
    gradient: 'from-amber-500 to-orange-600',
    href: '/educator/courses',
  },
  {
    label: 'Avg Rating',
    value: '4.7',
    change: '+0.2',
    icon: Star,
    iconBg: 'bg-brand-gold',
    gradient: 'from-violet-600 to-purple-900',
    href: '/educator/analytics',
  },
  {
    label: 'Monthly Earnings',
    value: '$7,960',
    change: '+24%',
    icon: DollarSign,
    iconBg: 'bg-brand-navy',
    gradient: 'from-emerald-500 to-teal-800',
    href: '/educator/analytics',
  },
];

export const MONTHLY_REVENUE = [
  { month: 'Jun', amount: 1820 },
  { month: 'Jul', amount: 2440 },
  { month: 'Aug', amount: 3010 },
  { month: 'Sep', amount: 2200 },
  { month: 'Oct', amount: 3580 },
  { month: 'Nov', amount: 4310 },
  { month: 'Dec', amount: 3790 },
  { month: 'Jan', amount: 4820 },
  { month: 'Feb', amount: 6100 },
  { month: 'Mar', amount: 5520 },
  { month: 'Apr', amount: 6640 },
  { month: 'May', amount: 7960 },
];

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
  { title: 'GraphQL Essentials', students: 654, rating: 4.6 },
  { title: 'Advanced CSS & Sass', students: 521, rating: 4.5 },
  { title: 'Docker for Developers', students: 438, rating: 4.7 },
  { title: 'Testing with Jest', students: 312, rating: 4.4 },
  { title: 'Next.js Production', students: 289, rating: 4.8 },
];

export const COMPLETION_RATES = [
  { title: 'React Masterclass', rate: 74 },
  { title: 'Node.js Fundamentals', rate: 68 },
  { title: 'TypeScript Deep Dive', rate: 81 },
  { title: 'GraphQL Essentials', rate: 59 },
  { title: 'Advanced CSS & Sass', rate: 71 },
  { title: 'Docker for Developers', rate: 63 },
  { title: 'Testing with Jest', rate: 55 },
  { title: 'Next.js Production', rate: 77 },
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

export interface FilterOption {
  value: string;
  label: string;
}

export const FILTER_PROGRESS_OPTIONS: FilterOption[] = [
  { value: '0-25', label: '0–25%' },
  { value: '26-50', label: '26–50%' },
  { value: '51-75', label: '51–75%' },
  { value: '76-100', label: '76–100%' },
];

export const FILTER_ACTIVITY_OPTIONS: FilterOption[] = [
  { value: 'Highly active', label: 'Highly active' },
  { value: 'Active', label: 'Active' },
  { value: 'At risk', label: 'At risk' },
];

export const FILTER_STATUS_OPTIONS: FilterOption[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Completed', label: 'Completed' },
];

export const FILTER_LAST_ACTIVE_OPTIONS: FilterOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
];
