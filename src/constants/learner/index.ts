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
  /** Redeemable code that grants free enrollment (see Explore's "Redeem Code"). */
  code?: string;
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
    code: 'LEAD-01',
    thumbnail: '/image/Introduction_to_leadership.png',
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
    code: 'CRIT-02',
    thumbnail: '/image/Critical_thinking_and_problem_solving.png',
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
    code: 'COMM-03',
    thumbnail: '/image/Public_speaking_mastery.png',
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
    code: 'STEM-04',
    thumbnail: '/image/Australian_Curriculum_STEM_Foundation.png',
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
    code: 'LEAD-05',
    thumbnail: '/image/Global_Leadership_Excellence.png',
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
    code: 'INNO-06',
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
    code: 'LEAD-07',
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
    code: 'STEM-08',
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
    code: 'COMM-09',
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
    code: 'LEAD-10',
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
    code: 'CRIT-11',
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
    code: 'CRIT-12',
  },
];

export const EXPLORE_CATEGORIES = [
  'All',
  'Khmer Literature',
  'Leadership',
  'Child Development',
  'Leadership Development',
  'Innovative Learning',
];

export const EXPLORE_COURSES: Course[] = [
  {
    id: 'e1',
    title: 'The Complete Khmer Literature Course',
    author: 'Sok Chanthou',
    level: 'Beginner',
    category: 'Khmer Literature',
    rating: 4.9,
    hours: 69,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'A structured course through classical and modern Khmer literature — poetry, prose, and oral tradition — with guided readings and applied writing practice.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'KHLT-01',
    thumbnail: '/image/Complete_Khmer_literature.png',
  },
  {
    id: 'e2',
    title: 'Foundations of Child Development',
    author: 'Dr. Ratanak Sok',
    level: 'Intermediate',
    category: 'Child Development',
    rating: 4.8,
    hours: 48,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Understand how young children grow, learn, and thrive — covering developmental stages, play-based learning, and nurturing home environments.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'CDEV-02',
    thumbnail: '/image/Foundations_of_Child_Development.png',
  },
  {
    id: 'e3',
    title: 'Khmer Poetry and Oral Tradition',
    author: 'Chenda Prak',
    level: 'Beginner',
    category: 'Khmer Literature',
    rating: 4.7,
    hours: 25,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Explore the rhythm and meaning of Khmer poetic forms — from classical Bat Kambot to modern free verse — with recitation practice and literary analysis.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'KHLT-03',
    thumbnail: '/image/Khmer_Poetry_and_Oral_Tradition.png',
  },
  {
    id: 'e4',
    title: 'Leadership Development: The Practical Guide',
    author: 'Vandy Chhorn',
    level: 'Intermediate',
    category: 'Leadership Development',
    rating: 4.8,
    hours: 23,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Build the coaching, delegation, and decision-making skills needed to grow from individual contributor to confident team leader.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'LDEV-04',
    thumbnail: '/image/Leadership_Development_Practical_Guide.png',
  },
  {
    id: 'e5',
    title: 'Innovative Learning Essentials',
    author: 'Sophea Ly',
    level: 'Beginner',
    category: 'Innovative Learning',
    rating: 4.6,
    hours: 16,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Learn practical methods for designing engaging, learner-centered lessons — project-based learning, active facilitation, and creative assessment.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'INLR-05',
    thumbnail: '/image/Innovative_Learning_Essentials.png',
  },
  {
    id: 'e6',
    title: 'Complete Storytelling Bootcamp',
    author: 'Chenda Prak',
    level: 'Beginner',
    category: 'Khmer Literature',
    rating: 4.8,
    hours: 22,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Learn the fundamentals of Khmer storytelling and progress toward crafting original short stories and folktale adaptations.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'KHLT-06',
    thumbnail: '/image/Complete_Storytelling_Bootcamp.png',
  },
  {
    id: 'e7',
    title: 'Advanced Leadership Certification',
    author: 'Vandy Chhorn',
    level: 'Advanced',
    category: 'Leadership Development',
    rating: 4.7,
    hours: 28,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Prepare for advanced leadership certification with deep dives into strategic planning, conflict resolution, organizational culture, and mentoring.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'LDEV-07',
    thumbnail: '/image/Advanced_Leadership_certificate.png',
  },
  {
    id: 'e8',
    title: 'Full Community Leadership Program',
    author: 'Dara Kim',
    level: 'Advanced',
    category: 'Leadership',
    rating: 4.9,
    hours: 32,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Build community leadership programs from the ground up — covering civic engagement, youth mentorship, and grassroots organizing.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'LDRS-08',
    thumbnail: '/image/Full_Community_Leadership_Program.png',
  },
  {
    id: 'e9',
    title: 'Child Psychology A-Z: Growth & Behavior',
    author: 'Dr. Ratanak Sok',
    level: 'Intermediate',
    category: 'Child Development',
    rating: 4.9,
    hours: 44,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Master core concepts in child psychology including attachment, emotional regulation, behavioral guidance, and inclusive early education.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'CDEV-09',
    thumbnail: '/image/Child_Psychology_A-Z_Growth_and_Behavior.png',
  },
  {
    id: 'e10',
    title: 'Khmer Folktales Reading Pack',
    author: 'Sina Meas',
    level: 'Beginner',
    category: 'Khmer Literature',
    rating: 4.7,
    hours: 0,
    documents: 8,
    courseType: 'text-image',
    price: 49,
    originalPrice: 99,
    description:
      'A document-first course with structured readings, checkpoints, and short quizzes exploring beloved Khmer folktales.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'KHLT-10',
    thumbnail: '/image/Khmer_Poetry_and_Oral_Tradition.png',
  },
  {
    id: 'e11',
    title: 'Community Leadership Playbook',
    author: 'Dara Kim',
    level: 'Intermediate',
    category: 'Leadership',
    rating: 4.8,
    hours: 0,
    documents: 12,
    courseType: 'text-image',
    price: 49,
    originalPrice: 99,
    description:
      'Learn core community-organizing skills through case-study documents, worksheets, and review quizzes.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'LDRS-11',
    thumbnail: '/image/Complete_Storytelling_Bootcamp.png',
  },
  {
    id: 'e12',
    title: 'Innovative Teaching Handbook',
    author: 'Sophea Ly',
    level: 'Beginner',
    category: 'Innovative Learning',
    rating: 4.9,
    hours: 0,
    documents: 10,
    courseType: 'text-image',
    price: 49,
    originalPrice: 99,
    description:
      'A practical reading-based handbook for designing creative lessons and evaluating learner engagement.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'INLR-12',
    thumbnail: '/image/Innovative_Teaching_Handbook.png',
  },
  {
    id: 'e13',
    title: 'Early Childhood Assessment Guide',
    author: 'Nary Chan',
    level: 'Advanced',
    category: 'Child Development',
    rating: 4.6,
    hours: 0,
    documents: 9,
    courseType: 'text-image',
    price: 49,
    originalPrice: 99,
    description:
      'Document lessons for parents and educators covering developmental milestones, observation, and assessment.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'CDEV-13',
    thumbnail: '/image/Early_Childhood_Assessment_Guide.png',
  },
  {
    id: 'e14',
    title: 'Leadership Development for Educators',
    author: 'Vandy Chhorn',
    level: 'Advanced',
    category: 'Leadership Development',
    rating: 4.7,
    hours: 19,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Deep-dive into mentoring frameworks, feedback culture, succession planning, and leading teaching teams.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'LDEV-14',
    thumbnail: '/image/Advanced_Leadership_certificate.png',
  },
  {
    id: 'e15',
    title: 'Advanced Innovative Learning Patterns',
    author: 'Sophea Ly',
    level: 'Advanced',
    category: 'Innovative Learning',
    rating: 4.9,
    hours: 18,
    courseType: 'mixed',
    price: 49,
    originalPrice: 99,
    description:
      'Master blended learning models, inquiry-based facilitation, and advanced techniques for designing transformative learning experiences.',
    progress: 0,
    enrolled: false,
    completed: false,
    code: 'INLR-15',
    thumbnail: '/image/Advanced_Innovative_Learning_Patterns.png',
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

/* ── Overview dashboard data ── */

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
    courseTitle: 'Advanced Innovative Learning Patterns',
    fullTitle: 'Advanced Innovative Learning Patterns',
    completedDate: 'January 2026',
    certificateId: 'CLP-8-2026',
    verified: false,
    instructor: 'Sophea Ly',
    theme: 'navy',
  },
  {
    id: 'c2',
    courseTitle: 'Community Leadership',
    fullTitle: 'Full Community Leadership Program',
    completedDate: 'January 2026',
    certificateId: 'CLP-10-2026',
    verified: false,
    instructor: 'Dara Kim',
    theme: 'blue',
  },
  {
    id: 'c3',
    courseTitle: 'Complete Khmer Literature Bootcamp',
    fullTitle: 'Complete Khmer Language & Literature Bootcamp',
    completedDate: 'January 2026',
    certificateId: 'CLP-1-2026',
    verified: false,
    instructor: 'Sok Chanthou',
    theme: 'red',
  },
  {
    id: 'c4',
    courseTitle: 'Child Psychology A-Z',
    fullTitle: 'Child Psychology A-Z: Growth & Behavior',
    completedDate: 'January 2026',
    certificateId: 'CLP-2-2026',
    verified: false,
    instructor: 'Dr. Ratanak Sok',
    theme: 'teal',
  },
];
