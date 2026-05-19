export const MOCK_USER = {
  name: "Sopheaktra Meng",
  email: "sopheaktra@ayla.edu.kh",
  initials: "SM",
  role: "Learner",
  xp: 2840,
  level: 6,
  nextLevelXp: 3000,
  streak: 7,
  personalBestStreak: 12,
  weeklyLearned: "7h 15m",
  dailyGoal: "1h",
  weeklyDaysCompleted: 5,
  totalWeeklyDays: 5,
};

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

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
};

export const ENROLLED_COURSES: Course[] = [
  { id: "1", title: "Introduction to Leadership", author: "Dr. Sarah Chen", level: "Beginner", category: "Leadership", progress: 65, enrolled: true, completed: false, rating: 4.9, hours: 24 },
  { id: "2", title: "Critical Thinking & Problem Solving", author: "Prof. James Wright", level: "Intermediate", category: "Critical Thinking", progress: 32, enrolled: true, completed: false, rating: 4.7, hours: 18 },
  { id: "3", title: "Public Speaking Mastery", author: "Emma Rodriguez", level: "Beginner", category: "Communication", progress: 20, enrolled: true, completed: false, rating: 4.8, hours: 16 },
  { id: "4", title: "Australian Curriculum: STEM Foundation", author: "Dr. Michael Thompson", level: "Advanced", category: "STEM", progress: 100, enrolled: true, completed: true, rating: 4.9, hours: 36 },
  { id: "5", title: "Global Leadership Excellence", author: "Dr. Sarah Chen", level: "Advanced", category: "Leadership", progress: 100, enrolled: true, completed: true, rating: 4.8, hours: 28 },
];

export const ALL_COURSES: Course[] = [
  ...ENROLLED_COURSES,
  { id: "6", title: "Digital Innovation & Entrepreneurship", author: "Alex Kim", level: "Intermediate", category: "Innovation", progress: 0, enrolled: false, completed: false, rating: 4.6, hours: 20 },
  { id: "7", title: "Environmental Leadership", author: "Dr. Lisa Park", level: "Beginner", category: "Leadership", progress: 0, enrolled: false, completed: false, rating: 4.7, hours: 14 },
  { id: "8", title: "Data-Driven Decision Making", author: "Prof. Marcus Lee", level: "Advanced", category: "STEM", progress: 0, enrolled: false, completed: false, rating: 4.8, hours: 22 },
  { id: "9", title: "Cross-Cultural Communication", author: "Dr. Amira Hassan", level: "Intermediate", category: "Communication", progress: 0, enrolled: false, completed: false, rating: 4.9, hours: 16 },
  { id: "10", title: "Community Impact & Social Change", author: "Robert O'Brien", level: "Beginner", category: "Leadership", progress: 0, enrolled: false, completed: false, rating: 4.7, hours: 18 },
  { id: "11", title: "Advanced Research Methods", author: "Prof. James Wright", level: "Advanced", category: "Critical Thinking", progress: 0, enrolled: false, completed: false, rating: 4.6, hours: 30 },
  { id: "12", title: "Creative Problem Solving", author: "Emma Rodriguez", level: "Beginner", category: "Critical Thinking", progress: 0, enrolled: false, completed: false, rating: 4.8, hours: 12 },
];

export const EXPLORE_CATEGORIES = ["All", "Leadership", "Critical Thinking", "Communication", "STEM", "Innovation"];

export const CATEGORY_GRADIENT: Record<string, string> = {
  Leadership:        "from-blue-600 to-indigo-700",
  "Critical Thinking": "from-violet-600 to-purple-700",
  Communication:     "from-emerald-500 to-teal-600",
  STEM:              "from-orange-500 to-red-600",
  Innovation:        "from-pink-500 to-rose-600",
};

export type QuizStatus = "in-progress" | "pending" | "completed";

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
  { id: "q1", title: "Leadership Foundations", course: "Introduction to Leadership", status: "in-progress", questions: 10, passingScore: 70, timeLimit: "20m", progress: 50, deadline: "May 20, 2026" },
  { id: "q2", title: "Critical Thinking Assessment", course: "Critical Thinking & Problem Solving", status: "pending", questions: 15, passingScore: 75, timeLimit: "25m", progress: 0, deadline: "May 25, 2026" },
  { id: "q3", title: "Public Speaking Final", course: "Public Speaking Mastery", status: "completed", questions: 12, passingScore: 80, timeLimit: "20m", progress: 100, score: 94, deadline: "Completed" },
];

export const SKILLS = [
  { name: "Leadership",        progress: 78 },
  { name: "Critical Thinking", progress: 62 },
  { name: "Communication",     progress: 55 },
  { name: "STEM",              progress: 45 },
  { name: "Innovation",        progress: 28 },
];

export const WEEKLY_ACTIVITY = [
  { day: "Mon", minutes: 35 },
  { day: "Tue", minutes: 90 },
  { day: "Wed", minutes: 65 },
  { day: "Thu", minutes: 120 },
  { day: "Fri", minutes: 75 },
  { day: "Sat", minutes: 20 },
  { day: "Sun", minutes: 10 },
];

export type Certificate = {
  id: string;
  courseTitle: string;
  fullTitle: string;
  completedDate: string;
  certificateId: string;
  verified: boolean;
  instructor: string;
};

export const CERTIFICATES: Certificate[] = [
  { id: "c1", courseTitle: "STEM Foundation", fullTitle: "Australian Curriculum: STEM Foundation", completedDate: "January 2026", certificateId: "AYLA-9-2026", verified: false, instructor: "Dr. Michael Thompson" },
  { id: "c2", courseTitle: "Global Leadership", fullTitle: "Global Leadership Excellence", completedDate: "January 2026", certificateId: "AYLA-10-2026", verified: false, instructor: "Dr. Sarah Chen" },
];
