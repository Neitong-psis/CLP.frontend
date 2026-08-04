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
    title: 'Complete Khmer Literature Bootcamp',
    category: 'Khmer Literature',
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
    title: 'Advanced Khmer Poetry: Form, Meter, Performance',
    category: 'Khmer Literature',
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
    title: 'Early Childhood Development, Play & Care',
    category: 'Child Development',
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
    title: 'Leadership Development – Full Program',
    category: 'Leadership Development',
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
    title: 'Community Leadership Fundamentals',
    category: 'Leadership',
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
    title: 'Innovative Learning Design Lab',
    category: 'Innovative Learning',
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

/** One admin note on a content item — which item, in which lesson, the
 *  admin's per-item verdict, and why. `itemId` matches a `ReviewItem.id`
 *  from `_lib/content.ts`. Rejected items always carry a note (required at
 *  entry); approved items only appear here if the admin left an optional one. */
export interface ReviewFeedbackItem {
  itemId: string;
  lessonTitle: string;
  itemTitle: string;
  status: 'approved' | 'rejected';
  note: string;
}

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
  /** Cover art for the workspace card once the course has content — never
   *  set for "To Do" tasks, which show the empty-cover placeholder instead. */
  thumbnailUrl?: string;
  /** Under Review — admin decision shown as the card's status badge. */
  reviewState?: ReviewState;
  /** Under Review — relative time since submission (e.g. "1 day ago"). */
  submittedAgo?: string;
  /** Under Review + Reject — the specific content items admin flagged. */
  reviewFeedback?: ReviewFeedbackItem[];
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

/** Clean, lowercase-kebab URL slugs for status — used for the board's
 *  `?tab=` query param instead of the raw label (`In%20Writing`). */
export const STATUS_SLUG: Record<CourseTaskStatus, string> = {
  'To Do': 'todo',
  'In Writing': 'in-writing',
  'Under Review': 'under-review',
  Published: 'published',
  Archived: 'archived',
};

export const SLUG_TO_STATUS: Record<string, CourseTaskStatus> =
  Object.fromEntries(
    COURSE_TASK_STATUSES.map((status) => [STATUS_SLUG[status], status]),
  );

/** Shared status badge colors — the My Courses board and the course editor's
 *  Step 3 "Current Status" preview both render the same status vocabulary
 *  and should look identical wherever it shows up. */
export const STATUS_BADGE: Record<CourseTaskStatus, string> = {
  'To Do': 'border-border bg-muted/40 text-muted-foreground',
  'In Writing': 'border-blue-400/30 bg-blue-500/10 text-blue-500',
  'Under Review': 'border-amber-400/30 bg-amber-500/10 text-amber-600',
  Published: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-600',
  Archived: 'border-border bg-muted text-muted-foreground',
};

export const EDUCATOR_COURSE_TASKS: CourseTask[] = [
  // ── To Do — assigned by admin, awaiting the educator to start writing ────────
  {
    id: 'ct1',
    title: 'Innovative Learning Toolkit for Educators',
    description:
      'Planning a practical course on innovative facilitation methods for daily lesson planning and classroom workflows.',
    category: 'Innovative Learning',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    status: 'To Do',
    priority: 'High',
    dueDate: 'May 30, 2026',
  },
  {
    id: 'ct2',
    title: 'Leadership Analytics: Measuring Team Impact',
    description:
      'Planning dashboards, tracking models, and reporting lessons for community and organizational leaders.',
    category: 'Leadership Development',
    price: '$39',
    assignedBy: 'Sarah Wilson',
    status: 'To Do',
    priority: 'High',
    dueDate: 'May 30, 2026',
  },
  {
    id: 'ct3',
    title: 'Khmer Language Basics for New Teachers',
    description:
      'Planning beginner-friendly Khmer language and literature lessons for teachers building their first unit.',
    category: 'Khmer Literature',
    price: 'Free',
    assignedBy: 'Sarah Wilson',
    status: 'To Do',
    priority: 'High',
    dueDate: 'May 30, 2026',
  },
  {
    id: 'ct4',
    title: 'Community Outreach Campaign Strategy',
    description:
      'Planning a strategy-first course covering campaign goals, channels, budgets, and performance reviews.',
    category: 'Leadership',
    price: '$24.99',
    assignedBy: 'Sarah Wilson',
    status: 'To Do',
    priority: 'High',
    dueDate: 'May 30, 2026',
  },
  {
    id: 'ct5',
    title: 'Foundations of Child Development',
    description:
      'Planning core developmental-stage concepts, milestones, and real-world caregiver examples.',
    category: 'Child Development',
    price: '$34',
    assignedBy: 'Sarah Wilson',
    status: 'To Do',
    priority: 'High',
    dueDate: 'May 30, 2026',
  },

  // ── In Writing — educator is actively drafting the content ───────────────────
  {
    id: 'ct6',
    title: 'Innovative Learning Fundamentals',
    description:
      'Building lessons on learner-centered design, lesson wireframes, engagement systems, and classroom piloting.',
    category: 'Innovative Learning',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'High',
    dueDate: 'Jun 2, 2026',
    thumbnailUrl: '/image/Innovative_Learning_Essentials.png',
  },
  {
    id: 'ct7',
    title: 'Full Leadership Development Bootcamp',
    description:
      'Currently editing modules for foundational leadership skills, mentoring, feedback systems, and program rollout.',
    category: 'Leadership Development',
    price: '$79',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'High',
    dueDate: 'Jun 5, 2026',
    thumbnailUrl: '/image/Leadership_Development_Practical_Guide.png',
  },
  {
    id: 'ct8',
    title: 'Facilitation Techniques for Community Teams',
    description:
      'Writing practical facilitation patterns for meetings, community sessions, and outreach operations.',
    category: 'Leadership',
    price: '$49',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'Medium',
    dueDate: 'Jun 6, 2026',
    thumbnailUrl: '/image/Full_Community_Leadership_Program.png',
  },
  {
    id: 'ct9',
    title: 'Program Design Essentials',
    description:
      'Drafting curriculum discovery, roadmap planning, learner personas, prioritization, and launch lessons.',
    category: 'Innovative Learning',
    price: '$44.99',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'Medium',
    dueDate: 'Jun 8, 2026',
    thumbnailUrl: '/image/Innovative_Teaching_Handbook.png',
  },
  {
    id: 'ct10',
    title: 'Storytelling with Khmer Oral Tradition',
    description:
      'Preparing oral-storytelling lessons focused on performance, audience engagement, and cultural context.',
    category: 'Khmer Literature',
    price: '$59',
    assignedBy: 'Sarah Wilson',
    status: 'In Writing',
    priority: 'Low',
    dueDate: 'Jun 10, 2026',
    thumbnailUrl: '/image/Khmer_Poetry_and_Oral_Tradition.png',
  },

  // ── Under Review — submitted, awaiting the admin decision ────────────────────
  {
    id: 'ct12',
    title: 'Curriculum Design Handoff',
    description:
      'Submitted for admin review with lessons on lesson components, pacing guides, specs, and classroom-ready handoff.',
    category: 'Innovative Learning',
    price: '$35',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'High',
    dueDate: 'May 25, 2026',
    thumbnailUrl: '/image/Advanced_Innovative_Learning_Patterns.png',
    reviewState: 'Reject',
    submittedAgo: '2 days ago',
    reviewFeedback: [
      {
        itemId: 'd1',
        lessonTitle: 'Lesson Pacing Guide',
        itemTitle: 'Lesson Pacing Guide',
        status: 'rejected',
        note: 'This reads as generic curriculum theory, not a classroom-ready handoff lesson. Rewrite it around actual handoff artifacts — pacing checklists, activity specs, facilitation notes.',
      },
      {
        itemId: 'v1',
        lessonTitle: 'Classroom Basics Introduction',
        itemTitle: 'Classroom Basics Introduction',
        status: 'rejected',
        note: 'Wrong audience — this assumes the viewer has never taught before. Replace with a walkthrough of translating a lesson plan into a live classroom session.',
      },
    ],
  },
  {
    id: 'ct13',
    title: 'Community Program Management Basics',
    description:
      'Submitted for admin review with practical planning cycles, task boards, check-ins, and retrospective lessons.',
    category: 'Leadership',
    price: 'Free',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'Medium',
    dueDate: 'May 23, 2026',
    thumbnailUrl: '/image/Introduction_to_leadership.png',
    reviewState: 'Under Review',
    submittedAgo: '4 days ago',
  },
  {
    id: 'ct14',
    title: 'Simple Classroom Routines & Rituals',
    description:
      'Submitted for admin review with routine-building examples for teachers and caregivers of young children.',
    category: 'Child Development',
    price: '$22',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'Medium',
    dueDate: 'May 21, 2026',
    thumbnailUrl: '/image/Foundations_of_Child_Development.png',
    reviewState: 'Under Review',
    submittedAgo: '6 days ago',
  },
  {
    id: 'ct15',
    title: 'Innovative Online Teaching Methods',
    description:
      'Submitted for admin review with lesson planning, learner engagement, assessments, and feedback loops.',
    category: 'Innovative Learning',
    price: '$27',
    assignedBy: 'Sarah Wilson',
    status: 'Under Review',
    priority: 'Low',
    dueDate: 'May 20, 2026',
    thumbnailUrl: '/image/Innovative_Learning_Essentials.png',
    reviewState: 'Under Review',
    submittedAgo: '1 week ago',
  },

  // ── Published — approved by admin, live for learners ─────────────────────────
  // Approved with no lingering admin note (ct11) lives here only. Approved
  // with a note still attached (ct16) also cross-lists under "Under Review"
  // so the educator doesn't lose track of the feedback.
  {
    id: 'ct11',
    title: 'Child Safety Awareness for Teams',
    description:
      'Approved and publicly available with modules on safeguarding, healthy boundaries, digital safety, and reporting concerns.',
    category: 'Child Development',
    price: '$19',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'High',
    dueDate: 'Published May 27',
    thumbnailUrl: '/image/Child_Psychology_A-Z_Growth_and_Behavior.png',
    reviewState: 'Approved',
    students: 412,
    revenue: '$7,828',
    rating: 4.5,
    updatedAgo: '1 day ago',
  },
  {
    id: 'ct16',
    title: 'Leadership Masterclass for Program Directors',
    description:
      'Approved and publicly available with advanced coaching patterns, mentoring structures, governance, and performance lessons.',
    category: 'Leadership Development',
    price: '$89',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 10',
    thumbnailUrl: '/image/Advanced_Leadership_certificate.png',
    reviewState: 'Approved',
    reviewFeedback: [
      {
        itemId: 'a2',
        lessonTitle: 'Session Planning Basics',
        itemTitle: 'Redesign a Mentoring Session Plan',
        status: 'approved',
        note: 'Solid handoff-ready assignment — nice pairing with the feedback checklist. No changes needed, just flagging it as a strong example for future courses.',
      },
    ],
    students: 1842,
    revenue: '$163,938',
    rating: 4.9,
    updatedAgo: '2 days ago',
  },
  {
    id: 'ct17',
    title: 'Storytelling for Community Outreach',
    description:
      'Approved course teaching narrative-driven outreach planning, message briefs, editing, and program consistency.',
    category: 'Leadership',
    price: '$49',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 7',
    thumbnailUrl: '/image/Global_Leadership_Excellence.png',
    students: 1260,
    revenue: '$61,740',
    rating: 4.8,
    updatedAgo: '5 days ago',
  },
  {
    id: 'ct18',
    title: 'Khmer Literature Starter Kit',
    description:
      'Approved public course covering close reading, poetic forms, text analysis, and reflection workflows.',
    category: 'Khmer Literature',
    price: '$59',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 5',
    thumbnailUrl: '/image/Complete_Khmer_literature.png',
    students: 980,
    revenue: '$57,820',
    rating: 4.7,
    updatedAgo: '1 week ago',
  },
  {
    id: 'ct19',
    title: 'Program Identity for New Community Initiatives',
    description:
      'Approved public course on positioning, messaging, community segments, and launch storytelling.',
    category: 'Leadership',
    price: '$39',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 2',
    thumbnailUrl: '/image/Full_Community_Leadership_Program.png',
    students: 740,
    revenue: '$28,860',
    rating: 4.6,
    updatedAgo: '10 days ago',
  },
  {
    id: 'ct20',
    title: 'Innovative Instructional Design for Digital Courses',
    description:
      'Approved public course for educators designing outcomes, activities, assessments, and course structure.',
    category: 'Innovative Learning',
    price: 'Free',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published Apr 28',
    thumbnailUrl: '/image/Innovative_Teaching_Handbook.png',
    students: 1560,
    revenue: '$0',
    rating: 4.8,
    updatedAgo: '2 weeks ago',
  },

  // ── Archived — retired, editable for future resubmission ─────────────────────
  {
    id: 'ct21',
    title: 'Legacy Classroom Bulletin Management',
    description:
      'Retired course kept for records. Editing is locked and only Admin can restore or remove it.',
    category: 'Innovative Learning',
    price: '$19',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Mar 2',
    thumbnailUrl: '/image/Innovative_Learning_Essentials.png',
  },
  {
    id: 'ct22',
    title: 'Basic Parent Newsletter Tools',
    description:
      'Older caregiver-communication workflow course archived after the curriculum moved to a newer version.',
    category: 'Child Development',
    price: '$15',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Feb 18',
    thumbnailUrl: '/image/Early_Childhood_Assessment_Guide.png',
  },
  {
    id: 'ct23',
    title: 'Classroom Presentation Basics',
    description:
      'Archived teaching fundamentals course retained for historical review.',
    category: 'Innovative Learning',
    price: 'Free',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Feb 4',
    thumbnailUrl: '/image/Advanced_Innovative_Learning_Patterns.png',
  },
  {
    id: 'ct24',
    title: 'Small Community Program Budgeting Starter',
    description:
      'Archived starter course replaced by the current leadership analytics track.',
    category: 'Leadership',
    price: '$25',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Jan 22',
    thumbnailUrl: '/image/Introduction_to_leadership.png',
  },
  {
    id: 'ct25',
    title: 'Literature Portfolio Workshop',
    description:
      'Retired workshop course. Public edits and educator changes are disabled.',
    category: 'Khmer Literature',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    status: 'Archived',
    priority: 'Low',
    dueDate: 'Archived Jan 9',
    thumbnailUrl: '/image/Complete_Storytelling_Bootcamp.png',
  },

  // ── Published — backs the dashboard's Top Courses / Completion Rates
  // widgets (see DASHBOARD_TOP_COURSES / COMPLETION_RATES) so each row
  // there links to a real course instead of a dead id. ─────────────────────
  {
    id: 'ct26',
    title: 'Leadership Masterclass',
    description:
      'Flagship leadership course covering coaching, delegation, and team performance for program leads.',
    category: 'Leadership Development',
    price: '$79',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 12',
    students: 1842,
    revenue: '$145,518',
    rating: 4.9,
    updatedAgo: '1 day ago',
  },
  {
    id: 'ct27',
    title: 'Child Development Fundamentals',
    description:
      'Core child-development theory and classroom practice for educators working with young learners.',
    category: 'Child Development',
    price: '$59',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 9',
    students: 1203,
    revenue: '$70,977',
    rating: 4.7,
    updatedAgo: '3 days ago',
  },
  {
    id: 'ct28',
    title: 'Khmer Literature Deep Dive',
    description:
      'An in-depth study of classic and contemporary Khmer literature, from close reading to critical analysis.',
    category: 'Khmer Literature',
    price: '$49',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published May 6',
    students: 876,
    revenue: '$42,924',
    rating: 4.8,
    updatedAgo: '4 days ago',
  },
  {
    id: 'ct29',
    title: 'Innovative Learning Essentials',
    description:
      'Foundational strategies for designing engaging, technology-enabled learning experiences.',
    category: 'Innovative Learning',
    price: '$39',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published Apr 30',
    students: 654,
    revenue: '$25,506',
    rating: 4.6,
    updatedAgo: '6 days ago',
  },
  {
    id: 'ct30',
    title: 'Advanced Khmer Poetry',
    description:
      'Advanced study of Khmer poetic form, meter, and performance for experienced literature students.',
    category: 'Khmer Literature',
    price: '$69',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published Apr 24',
    students: 521,
    revenue: '$35,949',
    rating: 4.5,
    updatedAgo: '1 week ago',
  },
  {
    id: 'ct31',
    title: 'Mentoring for Program Leads',
    description:
      'Practical mentoring frameworks and coaching conversations for community program leads.',
    category: 'Leadership Development',
    price: '$45',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published Apr 18',
    students: 438,
    revenue: '$19,710',
    rating: 4.7,
    updatedAgo: '2 weeks ago',
  },
  {
    id: 'ct32',
    title: 'Classroom Assessment Design',
    description:
      'Designing fair, actionable assessments — from rubrics to formative checks — for everyday classrooms.',
    category: 'Innovative Learning',
    price: '$35',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published Apr 11',
    students: 312,
    revenue: '$10,920',
    rating: 4.4,
    updatedAgo: '3 weeks ago',
  },
  {
    id: 'ct33',
    title: 'Storytelling in Practice',
    description:
      'Hands-on storytelling techniques for community outreach, classroom engagement, and program messaging.',
    category: 'Leadership',
    price: '$55',
    assignedBy: 'Sarah Wilson',
    status: 'Published',
    priority: 'Low',
    dueDate: 'Published Apr 3',
    students: 289,
    revenue: '$15,895',
    rating: 4.8,
    updatedAgo: '1 month ago',
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
    course: 'Complete Khmer Literature Bootcamp',
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
    course: 'Complete Khmer Literature Bootcamp',
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
    course: 'Advanced Khmer Poetry',
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
    course: 'Early Childhood Development, Play & Care',
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
    course: 'Complete Khmer Literature Bootcamp',
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
    course: 'Leadership Development – Full Program',
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
    course: 'Advanced Khmer Poetry',
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
    course: 'Early Childhood Development, Play & Care',
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
    course: 'Leadership Development – Full Program',
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
    course: 'Complete Khmer Literature Bootcamp',
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
    course: 'Advanced Khmer Poetry',
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
    course: 'Early Childhood Development, Play & Care',
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
    course: 'Leadership Development – Full Program',
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
    course: 'Complete Khmer Literature Bootcamp',
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
    course: 'Advanced Khmer Poetry',
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
    course: 'Early Childhood Development, Play & Care',
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
    course: 'Complete Khmer Literature Bootcamp',
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
    course: 'Leadership Development – Full Program',
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
    course: 'Advanced Khmer Poetry',
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
    course: 'Complete Khmer Literature Bootcamp',
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
    course: 'Khmer Literature Bootcamp',
    time: '30m ago',
  },
  {
    student: 'Marcus Rivera',
    action: 'Submitted quiz',
    course: 'Leadership Development',
    time: '1h ago',
  },
  {
    student: 'David Kim',
    action: 'Enrolled',
    course: 'Early Childhood Development',
    time: '6h ago',
  },
  {
    student: 'Sopheaktra Meng',
    action: 'Left a review ★★★★★',
    course: 'Khmer Literature Bootcamp',
    time: '8h ago',
  },
  {
    student: 'Emily Chen',
    action: 'Completed course',
    course: 'Advanced Khmer Poetry',
    time: '1d ago',
  },
];

export const TOP_COURSES = [
  {
    title: 'Complete Khmer Literature Bootcamp',
    enrolled: 342,
    completion: 68,
  },
  { title: 'Advanced Khmer Poetry', enrolled: 215, completion: 74 },
  {
    title: 'Early Childhood Development, Play & Care',
    enrolled: 187,
    completion: 60,
  },
  {
    title: 'Leadership Development – Full Program',
    enrolled: 98,
    completion: 42,
  },
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
    href: '/educator/courses',
  },
  {
    label: 'Monthly Earnings',
    value: '$7,960',
    change: '+24%',
    icon: DollarSign,
    iconBg: 'bg-brand-navy',
    gradient: 'from-emerald-500 to-teal-800',
    href: '/educator/earnings',
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

// `id` matches the backing `CourseTask` in EDUCATOR_COURSE_TASKS (ct26-ct33)
// so each dashboard row links to a real course instead of a dead id.
export const DASHBOARD_TOP_COURSES = [
  { id: 'ct26', title: 'Leadership Masterclass', students: 1842, rating: 4.9 },
  {
    id: 'ct27',
    title: 'Child Development Fundamentals',
    students: 1203,
    rating: 4.7,
  },
  {
    id: 'ct28',
    title: 'Khmer Literature Deep Dive',
    students: 876,
    rating: 4.8,
  },
  {
    id: 'ct29',
    title: 'Innovative Learning Essentials',
    students: 654,
    rating: 4.6,
  },
  { id: 'ct30', title: 'Advanced Khmer Poetry', students: 521, rating: 4.5 },
  {
    id: 'ct31',
    title: 'Mentoring for Program Leads',
    students: 438,
    rating: 4.7,
  },
  {
    id: 'ct32',
    title: 'Classroom Assessment Design',
    students: 312,
    rating: 4.4,
  },
  {
    id: 'ct33',
    title: 'Storytelling in Practice',
    students: 289,
    rating: 4.8,
  },
];

export const COMPLETION_RATES = [
  { id: 'ct26', title: 'Leadership Masterclass', rate: 74 },
  { id: 'ct27', title: 'Child Development Fundamentals', rate: 68 },
  { id: 'ct28', title: 'Khmer Literature Deep Dive', rate: 81 },
  { id: 'ct29', title: 'Innovative Learning Essentials', rate: 59 },
  { id: 'ct30', title: 'Advanced Khmer Poetry', rate: 71 },
  { id: 'ct31', title: 'Mentoring for Program Leads', rate: 63 },
  { id: 'ct32', title: 'Classroom Assessment Design', rate: 55 },
  { id: 'ct33', title: 'Storytelling in Practice', rate: 77 },
];

export const QUIZ_ANALYTICS = [
  {
    title: 'Introduction Quiz',
    difficult: 'Poetic meter rules',
    completion: 82,
    avgScore: 76,
    passRate: 71,
  },
  {
    title: 'Literature Assessment',
    difficult: 'Classical form structure',
    completion: 64,
    avgScore: 68,
    passRate: 58,
  },
  {
    title: 'Leadership Patterns Review',
    difficult: 'Delegation frameworks',
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
