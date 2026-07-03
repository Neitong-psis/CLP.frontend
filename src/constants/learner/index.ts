export const MOCK_USER = {
  name: 'Sopheaktra Meng',
  email: 'sopheaktra@ayla.edu.kh',
  initials: 'SM',
  role: 'Learner',
  xp: 2840,
  xpThisWeek: 480,
  level: 6,
  nextLevelXp: 3000,
  streak: 7,
  personalBestStreak: 12,
  weeklyLearned: '7h 15m',
  dailyGoal: '1h',
  weeklyDaysCompleted: 5,
  totalWeeklyDays: 5,
  lessonsCompleted: 15,
  lessonsThisWeek: 3,
  rank: 'Top 18%',
};

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CourseType = 'mixed' | 'text-image';

export type Course = {
  id: string;
  title: string;
  author: string;
  level: CourseLevel;
  category: string;
  progress: number;
  enrolled: boolean;
  completed: boolean;
  rating: number;
  hours: number;
  modules?: number;
  lessons?: number;
  description?: string;
  price?: number;
  originalPrice?: number;
  courseType?: CourseType;
  documents?: number;
  thumbnail?: string;
};

/** Default cover used for course cards that don't set their own thumbnail. */
export const DEFAULT_COURSE_THUMBNAIL = '/image/web_design_poster.png';

export const ENROLLED_COURSES: Course[] = [
  {
    id: '1',
    title: 'Introduction to Leadership',
    author: 'Dr. Sarah Chen',
    level: 'Beginner',
    category: 'Leadership',
    progress: 65,
    enrolled: true,
    completed: false,
    rating: 4.9,
    hours: 24,
    modules: 3,
    lessons: 8,
  },
  {
    id: '2',
    title: 'Critical Thinking & Problem Solving',
    author: 'Prof. James Wright',
    level: 'Intermediate',
    category: 'Critical Thinking',
    progress: 32,
    enrolled: true,
    completed: false,
    rating: 4.7,
    hours: 18,
    modules: 3,
    lessons: 8,
  },
  {
    id: '3',
    title: 'Public Speaking Mastery',
    author: 'Emma Rodriguez',
    level: 'Beginner',
    category: 'Communication',
    progress: 20,
    enrolled: true,
    completed: false,
    rating: 4.8,
    hours: 16,
    modules: 3,
    lessons: 8,
  },
  {
    id: '4',
    title: 'Australian Curriculum: STEM Foundation',
    author: 'Dr. Michael Thompson',
    level: 'Advanced',
    category: 'STEM',
    progress: 100,
    enrolled: true,
    completed: true,
    rating: 4.9,
    hours: 36,
    modules: 3,
    lessons: 8,
  },
  {
    id: '5',
    title: 'Global Leadership Excellence',
    author: 'Dr. Sarah Chen',
    level: 'Advanced',
    category: 'Leadership',
    progress: 100,
    enrolled: true,
    completed: true,
    rating: 4.8,
    hours: 28,
    modules: 3,
    lessons: 8,
  },
];

export const ALL_COURSES: Course[] = [
  ...ENROLLED_COURSES,
  {
    id: '6',
    title: 'Digital Innovation & Entrepreneurship',
    author: 'Alex Kim',
    level: 'Intermediate',
    category: 'Innovation',
    progress: 0,
    enrolled: false,
    completed: false,
    rating: 4.6,
    hours: 20,
  },
  {
    id: '7',
    title: 'Environmental Leadership',
    author: 'Dr. Lisa Park',
    level: 'Beginner',
    category: 'Leadership',
    progress: 0,
    enrolled: false,
    completed: false,
    rating: 4.7,
    hours: 14,
  },
  {
    id: '8',
    title: 'Data-Driven Decision Making',
    author: 'Prof. Marcus Lee',
    level: 'Advanced',
    category: 'STEM',
    progress: 0,
    enrolled: false,
    completed: false,
    rating: 4.8,
    hours: 22,
  },
  {
    id: '9',
    title: 'Cross-Cultural Communication',
    author: 'Dr. Amira Hassan',
    level: 'Intermediate',
    category: 'Communication',
    progress: 0,
    enrolled: false,
    completed: false,
    rating: 4.9,
    hours: 16,
  },
  {
    id: '10',
    title: 'Community Impact & Social Change',
    author: "Robert O'Brien",
    level: 'Beginner',
    category: 'Leadership',
    progress: 0,
    enrolled: false,
    completed: false,
    rating: 4.7,
    hours: 18,
  },
  {
    id: '11',
    title: 'Advanced Research Methods',
    author: 'Prof. James Wright',
    level: 'Advanced',
    category: 'Critical Thinking',
    progress: 0,
    enrolled: false,
    completed: false,
    rating: 4.6,
    hours: 30,
  },
  {
    id: '12',
    title: 'Creative Problem Solving',
    author: 'Emma Rodriguez',
    level: 'Beginner',
    category: 'Critical Thinking',
    progress: 0,
    enrolled: false,
    completed: false,
    rating: 4.8,
    hours: 12,
  },
];

export const EXPLORE_CATEGORIES = [
  'All',
  'Web Development',
  'Data Science',
  'Cloud Computing',
  'Programming',
  'DevOps',
  'Design',
];

export const EXPLORE_COURSES: Course[] = [
  {
    id: 'e1',
    title: 'The Complete JavaScript Course',
    author: 'Jonas Schmedtmann',
    level: 'Beginner',
    category: 'Programming',
    rating: 4.9,
    hours: 69,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'A structured JavaScript course covering core language concepts, practical projects, and applied patterns.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e2',
    title: 'React – The Complete Guide',
    author: 'Maximilian Schwarzmuller',
    level: 'Intermediate',
    category: 'Web Development',
    rating: 4.8,
    hours: 48,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Build production-ready React applications with Hooks, routing, state management, Next.js, and more.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e3',
    title: 'Python for Data Science and ML',
    author: 'Jose Portilla',
    level: 'Beginner',
    category: 'Data Science',
    rating: 4.7,
    hours: 25,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Learn Python for data analysis, visualization, and machine learning with Pandas, NumPy, Matplotlib.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e4',
    title: 'Docker & Kubernetes: The Practical Guide',
    author: 'Maximilian Schwarzmuller',
    level: 'Intermediate',
    category: 'DevOps',
    rating: 4.8,
    hours: 23,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Learn Docker, Docker Compose, multi-container workflows, deployment fundamentals, and orchestration.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e5',
    title: 'UI/UX Design Essentials',
    author: 'Daniel Walter Scott',
    level: 'Beginner',
    category: 'Design',
    rating: 4.6,
    hours: 16,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Learn practical UI and UX design methods, Figma workflows, design systems, and interface principles.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e6',
    title: 'Complete Python Bootcamp',
    author: 'Jose Portilla',
    level: 'Beginner',
    category: 'Programming',
    rating: 4.8,
    hours: 22,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Learn Python fundamentals and progress toward building practical applications and automation scripts.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e7',
    title: 'AWS Certified Solutions Architect',
    author: 'Stephane Maarek',
    level: 'Advanced',
    category: 'Cloud Computing',
    rating: 4.7,
    hours: 28,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Prepare for the AWS SAA exam with deep dives into EC2, S3, RDS, VPC, IAM, and more.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e8',
    title: 'Full-Stack Web Development with Next.js',
    author: 'Lee Robinson',
    level: 'Advanced',
    category: 'Web Development',
    rating: 4.9,
    hours: 32,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Build full-stack applications with Next.js App Router, server actions, Prisma, and Tailwind CSS.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e9',
    title: 'Machine Learning A-Z: Python & R',
    author: 'Kiril Eremenko',
    level: 'Intermediate',
    category: 'Data Science',
    rating: 4.9,
    hours: 44,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Master machine learning algorithms including regression, classification, clustering, and deep learning.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e10',
    title: 'Responsive Design Reading Pack',
    author: 'Sarah Wilson',
    level: 'Beginner',
    category: 'Design',
    rating: 4.7,
    hours: 0,
    documents: 8,
    courseType: 'text-image',
    price: 49,
    originalPrice: 99,
    description:
      'A document-first course with structured readings, checkpoints, and short quizzes for responsive UI design.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e11',
    title: 'Business Strategy Playbook',
    author: 'Michael Chen',
    level: 'Intermediate',
    category: 'Programming',
    rating: 4.8,
    hours: 0,
    documents: 12,
    courseType: 'text-image',
    price: 49,
    originalPrice: 99,
    description:
      'Learn core business planning through case-study documents, worksheets, and review quizzes.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e12',
    title: 'AI Prompt Writing Handbook',
    author: 'Dr. Angela Yu',
    level: 'Beginner',
    category: 'Data Science',
    rating: 4.9,
    hours: 0,
    documents: 10,
    courseType: 'text-image',
    price: 49,
    originalPrice: 99,
    description:
      'A practical reading-based handbook for writing clear AI prompts and evaluating generated outputs.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e13',
    title: 'Education Assessment Guide',
    author: 'Nora Lee',
    level: 'Advanced',
    category: 'Programming',
    rating: 4.6,
    hours: 0,
    documents: 9,
    courseType: 'text-image',
    price: 49,
    originalPrice: 99,
    description:
      'Document lessons for educators and learners covering rubric design, feedback, and assessment.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e14',
    title: 'Kubernetes for Developers',
    author: 'Bryan Krausen',
    level: 'Advanced',
    category: 'DevOps',
    rating: 4.7,
    hours: 19,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Deep-dive into Kubernetes deployments, services, config maps, secrets, and production cluster management.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
  {
    id: 'e15',
    title: 'Advanced React Patterns',
    author: 'Kent C. Dodds',
    level: 'Advanced',
    category: 'Web Development',
    rating: 4.9,
    hours: 18,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Master compound components, render props, custom hooks, and advanced React performance patterns.',
    progress: 0,
    enrolled: false,
    completed: false,
  },
];

export type QuizStatus = 'in-progress' | 'pending' | 'completed';

export type Quiz = {
  id: string;
  title: string;
  course: string;
  status: QuizStatus;
  questions: number;
  passingScore: number;
  timeLimit: string;
  progress: number;
  score?: number;
  deadline: string;
};

export const QUIZZES: Quiz[] = [
  {
    id: 'q1',
    title: 'Leadership Foundations',
    course: 'Introduction to Leadership',
    status: 'in-progress',
    questions: 10,
    passingScore: 70,
    timeLimit: '20m',
    progress: 50,
    deadline: 'May 20, 2026',
  },
  {
    id: 'q2',
    title: 'Critical Thinking Assessment',
    course: 'Critical Thinking & Problem Solving',
    status: 'pending',
    questions: 15,
    passingScore: 75,
    timeLimit: '25m',
    progress: 0,
    deadline: 'May 25, 2026',
  },
  {
    id: 'q3',
    title: 'Public Speaking Final',
    course: 'Public Speaking Mastery',
    status: 'completed',
    questions: 12,
    passingScore: 80,
    timeLimit: '20m',
    progress: 100,
    score: 94,
    deadline: 'Completed',
  },
];

export const SKILLS = [
  { name: 'Leadership', progress: 78 },
  { name: 'Critical Thinking', progress: 62 },
  { name: 'Communication', progress: 55 },
  { name: 'STEM', progress: 45 },
  { name: 'Innovation', progress: 28 },
];

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', minutes: 35 },
  { day: 'Tue', minutes: 90 },
  { day: 'Wed', minutes: 65 },
  { day: 'Thu', minutes: 120 },
  { day: 'Fri', minutes: 75 },
  { day: 'Sat', minutes: 20 },
  { day: 'Sun', minutes: 10 },
];

export type CertTheme = 'navy' | 'blue' | 'red' | 'teal';

export type Certificate = {
  id: string;
  courseTitle: string;
  fullTitle: string;
  completedDate: string;
  certificateId: string;
  verified: boolean;
  instructor: string;
  theme: CertTheme;
};

/* ── Course player ── */

export type LessonType = 'video' | 'quiz';

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  completed: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseContent {
  courseId: string;
  sections: CourseSection[];
}

export const COURSE_CONTENTS: CourseContent[] = [
  {
    courseId: '1',
    sections: [
      {
        id: 's1',
        title: 'Leadership Foundations',
        lessons: [
          {
            id: 'l1',
            title: 'Welcome to Leadership',
            type: 'video',
            duration: '5:30',
            completed: true,
          },
          {
            id: 'l2',
            title: 'What Makes a Great Leader?',
            type: 'video',
            duration: '12:45',
            completed: true,
          },
          {
            id: 'l3',
            title: 'Foundation Quiz',
            type: 'quiz',
            duration: '10 min',
            completed: true,
          },
        ],
      },
      {
        id: 's2',
        title: 'Communication & Influence',
        lessons: [
          {
            id: 'l4',
            title: 'Effective Communication',
            type: 'video',
            duration: '8:20',
            completed: true,
          },
          {
            id: 'l5',
            title: 'Active Listening',
            type: 'video',
            duration: '7:15',
            completed: false,
          },
          {
            id: 'l6',
            title: 'Persuasion & Influence',
            type: 'video',
            duration: '9:40',
            completed: false,
          },
          {
            id: 'l7',
            title: 'Communication Quiz',
            type: 'quiz',
            duration: '15 min',
            completed: false,
          },
        ],
      },
      {
        id: 's3',
        title: 'Strategic Thinking',
        lessons: [
          {
            id: 'l8',
            title: 'Problem-Solving Framework',
            type: 'video',
            duration: '11:30',
            completed: false,
          },
          {
            id: 'l9',
            title: 'Decision Making Under Pressure',
            type: 'video',
            duration: '14:20',
            completed: false,
          },
          {
            id: 'l10',
            title: 'Strategy Assessment',
            type: 'quiz',
            duration: '20 min',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    courseId: '2',
    sections: [
      {
        id: 's1',
        title: 'Critical Thinking Basics',
        lessons: [
          {
            id: 'l1',
            title: 'Introduction to Critical Thinking',
            type: 'video',
            duration: '6:00',
            completed: true,
          },
          {
            id: 'l2',
            title: 'Logical Reasoning',
            type: 'video',
            duration: '10:30',
            completed: true,
          },
          {
            id: 'l3',
            title: 'Basics Quiz',
            type: 'quiz',
            duration: '10 min',
            completed: false,
          },
        ],
      },
      {
        id: 's2',
        title: 'Problem-Solving Methods',
        lessons: [
          {
            id: 'l4',
            title: 'Root Cause Analysis',
            type: 'video',
            duration: '9:15',
            completed: false,
          },
          {
            id: 'l5',
            title: 'Design Thinking',
            type: 'video',
            duration: '13:40',
            completed: false,
          },
          {
            id: 'l6',
            title: 'Case Study: Real-World Problems',
            type: 'video',
            duration: '18:00',
            completed: false,
          },
          {
            id: 'l7',
            title: 'Problem-Solving Quiz',
            type: 'quiz',
            duration: '15 min',
            completed: false,
          },
        ],
      },
      {
        id: 's3',
        title: 'Advanced Analysis',
        lessons: [
          {
            id: 'l8',
            title: 'Cognitive Biases',
            type: 'video',
            duration: '11:00',
            completed: false,
          },
          {
            id: 'l9',
            title: 'Analytical Frameworks',
            type: 'video',
            duration: '15:20',
            completed: false,
          },
          {
            id: 'l10',
            title: 'Final Assessment',
            type: 'quiz',
            duration: '20 min',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    courseId: '3',
    sections: [
      {
        id: 's1',
        title: 'Public Speaking Fundamentals',
        lessons: [
          {
            id: 'l1',
            title: 'Overcoming Stage Fright',
            type: 'video',
            duration: '7:45',
            completed: true,
          },
          {
            id: 'l2',
            title: 'Voice & Presence',
            type: 'video',
            duration: '9:30',
            completed: false,
          },
          {
            id: 'l3',
            title: 'Fundamentals Quiz',
            type: 'quiz',
            duration: '10 min',
            completed: false,
          },
        ],
      },
      {
        id: 's2',
        title: 'Structuring Your Speech',
        lessons: [
          {
            id: 'l4',
            title: 'Opening Strong',
            type: 'video',
            duration: '8:00',
            completed: false,
          },
          {
            id: 'l5',
            title: 'Storytelling Techniques',
            type: 'video',
            duration: '12:15',
            completed: false,
          },
          {
            id: 'l6',
            title: 'Closing with Impact',
            type: 'video',
            duration: '6:50',
            completed: false,
          },
          {
            id: 'l7',
            title: 'Speech Structure Quiz',
            type: 'quiz',
            duration: '15 min',
            completed: false,
          },
        ],
      },
      {
        id: 's3',
        title: 'Delivery & Practice',
        lessons: [
          {
            id: 'l8',
            title: 'Body Language',
            type: 'video',
            duration: '10:20',
            completed: false,
          },
          {
            id: 'l9',
            title: 'Handling Q&A',
            type: 'video',
            duration: '8:40',
            completed: false,
          },
          {
            id: 'l10',
            title: 'Final Performance Assessment',
            type: 'quiz',
            duration: '20 min',
            completed: false,
          },
        ],
      },
    ],
  },
];

/* ── Overview dashboard data ── */

export interface ContinueLearningData {
  courseId: string;
  courseTitle: string;
  lessonNumber: number;
  lessonTitle: string;
  progress: number;
}

export const CONTINUE_LEARNING: ContinueLearningData = {
  courseId: '1',
  courseTitle: 'Introduction to Leadership',
  lessonNumber: 8,
  lessonTitle: 'Persuasion & Influence',
  progress: 65,
};

export interface PlanGoal {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  done: boolean;
}

export const TODAY_PLAN: PlanGoal[] = [
  {
    id: 'p1',
    label: 'Learn 30 minutes',
    current: 30,
    target: 30,
    unit: 'min',
    done: true,
  },
  {
    id: 'p2',
    label: 'Watch 1 lesson',
    current: 1,
    target: 1,
    unit: 'lesson',
    done: true,
  },
  {
    id: 'p3',
    label: 'Score 80% on quiz',
    current: 80,
    target: 80,
    unit: '%',
    done: true,
  },
];

export type UpNextItemType = 'lesson' | 'quiz' | 'assignment';

export interface UpNextItem {
  id: string;
  type: UpNextItemType;
  label: string;
  title: string;
  href: string;
}

export const UP_NEXT_ITEMS: UpNextItem[] = [
  {
    id: 'u1',
    type: 'lesson',
    label: 'Lesson 9',
    title: 'Advanced Features',
    href: '/learn/introduction-to-leadership?mode=resume',
  },
  {
    id: 'u2',
    type: 'quiz',
    label: 'Quiz',
    title: 'Smart Office Workflow Quiz',
    href: '/learn/introduction-to-leadership?mode=resume',
  },
  {
    id: 'u3',
    type: 'assignment',
    label: 'Assignment',
    title: 'Draft an AI Workflow Plan',
    href: '/learn/introduction-to-leadership?mode=resume',
  },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xp: number;
}

export const RECENT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'Week Warrior',
    description: 'Completed 7-day streak',
    xp: 100,
  },
  {
    id: 'a2',
    title: 'Quiz Master',
    description: 'Scored 90% on 5 quizzes',
    xp: 150,
  },
  {
    id: 'a3',
    title: 'Quick Learner',
    description: 'Completed 10 lessons',
    xp: 200,
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'c1',
    courseTitle: 'Advanced React Patterns',
    fullTitle: 'Advanced React Patterns',
    completedDate: 'January 2026',
    certificateId: 'CLP-8-2026',
    verified: false,
    instructor: 'Kent C. Dodds',
    theme: 'navy',
  },
  {
    id: 'c2',
    courseTitle: 'Full-Stack Web Dev',
    fullTitle: 'Full-Stack Web Development with Next.js',
    completedDate: 'January 2026',
    certificateId: 'CLP-10-2026',
    verified: false,
    instructor: 'Lee Robinson',
    theme: 'blue',
  },
  {
    id: 'c3',
    courseTitle: 'Complete Web Development Bootcamp',
    fullTitle: 'Complete Web Development Bootcamp',
    completedDate: 'January 2026',
    certificateId: 'CLP-1-2026',
    verified: false,
    instructor: 'Dr. Angela Yu',
    theme: 'red',
  },
  {
    id: 'c4',
    courseTitle: 'Machine Learning A-Z',
    fullTitle: 'Machine Learning A-Z: Python & R',
    completedDate: 'January 2026',
    certificateId: 'CLP-2-2026',
    verified: false,
    instructor: 'Kiril Eremenko',
    theme: 'teal',
  },
];
