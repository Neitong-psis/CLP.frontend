export interface EducatorTask {
  id: string;
  status: 'todo' | 'writing' | 'review' | 'published' | 'archived';
  title: string;
  description: string;
  category: string;
  price?: string;
  assignedBy: string;
  priority?: 'High' | 'Medium' | 'Low' | 'None';
  type?: string;
  dueDate?: string;
  notes?: string;
  students?: string;
  revenue?: string;
  rating?: string;
  updatedAt?: string;
}

export const EDUCATOR_TASKS: EducatorTask[] = [
  // --- TO DO (5 tasks) ---
  {
    id: 'task-1',
    status: 'todo',
    title: 'AI Productivity for Office Teams',
    description:
      'Planning a practical course on using AI tools for daily operations, research, and team workflows.',
    category: 'AI',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    priority: 'High',
    type: 'Course Creation',
    dueDate: 'May 30, 2026',
    notes: 'Open task details to review requirements before starting.',
  },
  {
    id: 'task-2',
    status: 'todo',
    title: 'Advanced Next.js Architecture',
    description:
      'Draft the initial directory structure, routing strategy, and rendering patterns lesson.',
    category: 'Web Dev',
    price: '$49',
    assignedBy: 'David Miller',
    priority: 'High',
    type: 'Video Content',
    dueDate: 'June 15, 2026',
    notes: 'Prepare outline for routing and middleware integrations.',
  },
  {
    id: 'task-3',
    status: 'todo',
    title: 'Docker & Kubernetes for Web Devs',
    description:
      'Outline containerization basics, volumes, networking, and multi-stage builds.',
    category: 'DevOps',
    price: '$39',
    assignedBy: 'Sarah Wilson',
    priority: 'Medium',
    type: 'Curriculum',
    dueDate: 'June 20, 2026',
    notes: 'Incorporate basic cloud deployment exercises.',
  },
  {
    id: 'task-4',
    status: 'todo',
    title: 'Python for Data Science',
    description:
      'Create introductory pandas and numpy programming exercises and quiz templates.',
    category: 'Data Science',
    price: '$19',
    assignedBy: 'Alex Johnson',
    priority: 'Low',
    type: 'Assessment',
    dueDate: 'June 28, 2026',
    notes: 'Define clear dataset specifications for learners.',
  },
  {
    id: 'task-5',
    status: 'todo',
    title: 'UI Design Principles',
    description:
      'Draft typography, layout guidelines, color psychology, and styling frameworks.',
    category: 'Design',
    price: '$29',
    assignedBy: 'Dr. Angela Yu',
    priority: 'Medium',
    type: 'Guide',
    dueDate: 'July 05, 2026',
    notes: 'Include mobile vs. desktop responsiveness examples.',
  },

  // --- IN WRITING (5 tasks) ---
  {
    id: 'task-6',
    status: 'writing',
    title: 'UI/UX Design Fundamentals',
    description:
      'Building lessons for user research, wireframes, design systems, usability testing, and product handoff.',
    category: 'Design',
    price: '$29',
    assignedBy: 'Dr. Angela Yu',
    notes:
      'Draft: no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.',
  },
  {
    id: 'task-7',
    status: 'writing',
    title: 'TypeScript Generics Masterclass',
    description:
      'Creating curriculum exercises for generic constraints, mapped types, utility types, and conditional logic.',
    category: 'Programming',
    price: '$19',
    assignedBy: 'Dr. Angela Yu',
    notes:
      'Draft: no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.',
  },
  {
    id: 'task-8',
    status: 'writing',
    title: 'SQL Databases for Beginners',
    description:
      'Drafting entity relationships, normalized schemas, joins, indexing, and raw aggregate transaction functions.',
    category: 'Databases',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    notes:
      'Draft: no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.',
  },
  {
    id: 'task-9',
    status: 'writing',
    title: 'Figma Prototyping Techniques',
    description:
      'Creating lessons for interactive components, hover animations, overlays, smart animate, and variable flows.',
    category: 'Design',
    price: '$15',
    assignedBy: 'Dr. Angela Yu',
    notes:
      'Draft: no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.',
  },
  {
    id: 'task-10',
    status: 'writing',
    title: 'Tailwind CSS Layout Mastery',
    description:
      'Developing guidelines for custom utility configurations, media queries, flexbox containers, and grid templates.',
    category: 'Web Dev',
    price: '$25',
    assignedBy: 'Dr. Angela Yu',
    notes:
      'Draft: no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.',
  },

  // --- UNDER REVIEW (5 tasks) ---
  {
    id: 'task-11',
    status: 'review',
    title: 'Cybersecurity Awareness for Teams',
    description:
      'Submitted for admin review with modules on phishing, passwords, device safety, and reporting incidents.',
    category: 'Security',
    price: '$19',
    assignedBy: 'Dr. Angela Yu',
    notes:
      'Review: submitted Submitted 1 day ago. Admin feedback: No revision notes yet.',
  },
  {
    id: 'task-12',
    status: 'review',
    title: 'AWS Cloud Practitioner Prep',
    description:
      'AWS basic cloud architectural framework, pricing systems, core IAM, S3, EC2, and VPC structure.',
    category: 'Cloud',
    price: '$39',
    assignedBy: 'Sarah Wilson',
    notes:
      'Review: submitted Submitted 2 days ago. Admin feedback: No revision notes yet.',
  },
  {
    id: 'task-13',
    status: 'review',
    title: 'GraphQL API Design with Node.js',
    description:
      'Resolvers, schema queries, mutations, subscriptions, dataloader optimizations, and federation setup.',
    category: 'Web Dev',
    price: '$49',
    assignedBy: 'David Miller',
    notes:
      'Review: submitted Submitted 3 days ago. Admin feedback: No revision notes yet.',
  },
  {
    id: 'task-14',
    status: 'review',
    title: 'Product Management Essentials',
    description:
      'Roadmaps, backlog grooming, agile prioritization, metrics analysis, and user persona mapping lessons.',
    category: 'Product',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    notes:
      'Review: submitted Submitted 4 days ago. Admin feedback: No revision notes yet.',
  },
  {
    id: 'task-15',
    status: 'review',
    title: 'Introduction to Machine Learning',
    description:
      'Regression models, classification algorithms, gradient descent, training sets, and model evaluation metrics.',
    category: 'Data Science',
    price: '$59',
    assignedBy: 'Alex Johnson',
    notes:
      'Review: submitted Submitted 5 days ago. Admin feedback: No revision notes yet.',
  },

  // --- PUBLISHED (5 tasks) ---
  {
    id: 'task-16',
    status: 'published',
    title: 'React Masterclass for Production Apps',
    description:
      'Approved and publicly available with production React patterns, forms, routing, and performance lessons.',
    category: 'Web Dev',
    price: '$89',
    assignedBy: 'Dr. Angela Yu',
    students: '1,842',
    revenue: '$163,938',
    rating: '4.9',
    updatedAt: 'Updated 2 days ago',
  },
  {
    id: 'task-17',
    status: 'published',
    title: 'JavaScript Basics: The Complete Guide',
    description:
      'Learn the fundamentals of JavaScript, including variables, functions, DOM manipulation, and modern ES6+ features.',
    category: 'Programming',
    price: '$49',
    assignedBy: 'Dr. Angela Yu',
    students: '3,412',
    revenue: '$167,188',
    rating: '4.8',
    updatedAt: 'Updated 5 days ago',
  },
  {
    id: 'task-18',
    status: 'published',
    title: 'Node.js & Express API Development',
    description:
      'Build fast and scalable server-side applications with Node.js, Express, and databases like MongoDB.',
    category: 'Web Dev',
    price: '$79',
    assignedBy: 'Dr. Angela Yu',
    students: '2,150',
    revenue: '$169,850',
    rating: '4.7',
    updatedAt: 'Updated 1 week ago',
  },
  {
    id: 'task-19',
    status: 'published',
    title: 'Responsive Design with CSS Flexbox & Grid',
    description:
      'Master CSS layout techniques to build gorgeous, responsive websites that look great on any screen.',
    category: 'Web Dev',
    price: '$29',
    assignedBy: 'Dr. Angela Yu',
    students: '1,120',
    revenue: '$32,480',
    rating: '4.9',
    updatedAt: 'Updated 2 weeks ago',
  },
  {
    id: 'task-20',
    status: 'published',
    title: 'Git & GitHub for Dev Teams',
    description:
      'Learn version control fundamentals, branching strategies, pull requests, and collaborate effectively with Git.',
    category: 'Programming',
    price: '$19',
    assignedBy: 'Dr. Angela Yu',
    students: '950',
    revenue: '$18,050',
    rating: '4.6',
    updatedAt: 'Updated 3 weeks ago',
  },

  // --- ARCHIVED (5 tasks) ---
  {
    id: 'task-21',
    status: 'archived',
    title: 'Legacy WordPress Site Management',
    description:
      'Retired course kept for records. Editing is locked and only Admin can restore or remove it.',
    category: 'Web Dev',
    assignedBy: 'Dr. Angela Yu',
    notes:
      'Archived: no price, public visibility, or progress tracking. Content remains editable for future resubmission.',
  },
  {
    id: 'task-22',
    status: 'archived',
    title: 'Basic Email Marketing Tools',
    description:
      'Older marketing workflow course archived after the curriculum moved to a newer version.',
    category: 'Marketing',
    assignedBy: 'Dr. Angela Yu',
    notes:
      'Archived: no price, public visibility, or progress tracking. Content remains editable for future resubmission.',
  },
  {
    id: 'task-23',
    status: 'archived',
    title: 'Classroom Presentation Basics',
    description:
      'Archived teaching fundamentals course retained for historical review.',
    category: 'Teaching',
    assignedBy: 'Dr. Angela Yu',
    notes:
      'Archived: no price, public visibility, or progress tracking. Content remains editable for future resubmission.',
  },
  {
    id: 'task-24',
    status: 'archived',
    title: 'Old SEO optimization guide',
    description:
      'SEO strategies from 2021 archived due to search engine algorithm updates.',
    category: 'Marketing',
    assignedBy: 'Dr. Angela Yu',
    notes:
      'Archived: no price, public visibility, or progress tracking. Content remains editable for future resubmission.',
  },
  {
    id: 'task-25',
    status: 'archived',
    title: 'Intro to Ruby on Rails',
    description:
      'Introductory course archived due to low student engagement and curriculum revisions.',
    category: 'Web Dev',
    assignedBy: 'Dr. Angela Yu',
    notes:
      'Archived: no price, public visibility, or progress tracking. Content remains editable for future resubmission.',
  },
];
