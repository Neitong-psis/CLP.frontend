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
    title: 'Innovative Learning for Modern Classrooms',
    description:
      'Planning a practical course on active-learning methods, formative assessment, and engagement techniques.',
    category: 'Innovative Learning',
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
    title: 'Advanced Leadership Development Framework',
    description:
      'Draft the initial coaching model, feedback-loop structure, and succession-planning lesson.',
    category: 'Leadership Development',
    price: '$49',
    assignedBy: 'David Miller',
    priority: 'High',
    type: 'Video Content',
    dueDate: 'June 15, 2026',
    notes: 'Prepare outline for mentoring and feedback integrations.',
  },
  {
    id: 'task-3',
    status: 'todo',
    title: 'Child Development Milestones Deep Dive',
    description:
      'Outline developmental stages, observation checklists, and caregiver-guidance modules.',
    category: 'Child Development',
    price: '$39',
    assignedBy: 'Sarah Wilson',
    priority: 'Medium',
    type: 'Curriculum',
    dueDate: 'June 20, 2026',
    notes: 'Incorporate basic home-environment exercises.',
  },
  {
    id: 'task-4',
    status: 'todo',
    title: 'Khmer Poetry for Beginners',
    description:
      'Create introductory recitation exercises and quiz templates covering classical poetic forms.',
    category: 'Khmer Literature',
    price: '$19',
    assignedBy: 'Alex Johnson',
    priority: 'Low',
    type: 'Assessment',
    dueDate: 'June 28, 2026',
    notes: 'Define clear reading list for learners.',
  },
  {
    id: 'task-5',
    status: 'todo',
    title: 'Community Leadership Principles',
    description:
      'Draft civic-engagement guidelines, mentorship models, and grassroots-organizing frameworks.',
    category: 'Leadership',
    price: '$29',
    assignedBy: 'Dr. Sopheak Chan',
    priority: 'Medium',
    type: 'Guide',
    dueDate: 'July 05, 2026',
    notes: 'Include rural vs. urban community examples.',
  },

  // --- IN WRITING (5 tasks) ---
  {
    id: 'task-6',
    status: 'writing',
    title: 'Early Childhood Program Design',
    description:
      'Building lessons for play-based curriculum, caregiver communication, inclusive classrooms, and milestone tracking.',
    category: 'Child Development',
    price: '$29',
    assignedBy: 'Dr. Sopheak Chan',
    notes:
      'Draft: no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.',
  },
  {
    id: 'task-7',
    status: 'writing',
    title: 'Leadership Development Masterclass',
    description:
      'Creating curriculum exercises for coaching conversations, 360-degree feedback, and mentoring pipelines.',
    category: 'Leadership Development',
    price: '$19',
    assignedBy: 'Dr. Sopheak Chan',
    notes:
      'Draft: no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.',
  },
  {
    id: 'task-8',
    status: 'writing',
    title: 'Khmer Literature for Beginners',
    description:
      'Drafting close-reading guides, classical text summaries, and literary-analysis exercises.',
    category: 'Khmer Literature',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    notes:
      'Draft: no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.',
  },
  {
    id: 'task-9',
    status: 'writing',
    title: 'Project-Based Learning Design',
    description:
      'Creating lessons for inquiry-based units, learner reflection, and creative assessment rubrics.',
    category: 'Innovative Learning',
    price: '$15',
    assignedBy: 'Dr. Sopheak Chan',
    notes:
      'Draft: no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.',
  },
  {
    id: 'task-10',
    status: 'writing',
    title: 'Community Organizing Fundamentals',
    description:
      'Developing guidelines for grassroots organizing, volunteer coordination, and civic partnerships.',
    category: 'Leadership',
    price: '$25',
    assignedBy: 'Dr. Sopheak Chan',
    notes:
      'Draft: no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.',
  },

  // --- UNDER REVIEW (5 tasks) ---
  {
    id: 'task-11',
    status: 'review',
    title: 'Child Safety & Wellbeing Awareness',
    description:
      'Submitted for admin review with modules on safeguarding, healthy routines, and caregiver communication.',
    category: 'Child Development',
    price: '$19',
    assignedBy: 'Dr. Sopheak Chan',
    notes:
      'Review: submitted Submitted 1 day ago. Admin feedback: No revision notes yet.',
  },
  {
    id: 'task-12',
    status: 'review',
    title: 'Leadership Development Certification Prep',
    description:
      'Coaching frameworks, feedback systems, mentoring structures, and succession-planning modules.',
    category: 'Leadership Development',
    price: '$39',
    assignedBy: 'Sarah Wilson',
    notes:
      'Review: submitted Submitted 2 days ago. Admin feedback: No revision notes yet.',
  },
  {
    id: 'task-13',
    status: 'review',
    title: 'Khmer Literary Analysis Workshop',
    description:
      'Close-reading techniques, thematic analysis, poetic devices, and comparative essay structure.',
    category: 'Khmer Literature',
    price: '$49',
    assignedBy: 'David Miller',
    notes:
      'Review: submitted Submitted 3 days ago. Admin feedback: No revision notes yet.',
  },
  {
    id: 'task-14',
    status: 'review',
    title: 'Youth Leadership Essentials',
    description:
      'Civic responsibility, team organizing, public advocacy, and community-impact project lessons.',
    category: 'Leadership',
    price: '$29',
    assignedBy: 'Sarah Wilson',
    notes:
      'Review: submitted Submitted 4 days ago. Admin feedback: No revision notes yet.',
  },
  {
    id: 'task-15',
    status: 'review',
    title: 'Introduction to Innovative Learning Design',
    description:
      'Active-learning models, formative assessment, learner engagement, and reflective-practice metrics.',
    category: 'Innovative Learning',
    price: '$59',
    assignedBy: 'Alex Johnson',
    notes:
      'Review: submitted Submitted 5 days ago. Admin feedback: No revision notes yet.',
  },

  // --- PUBLISHED (5 tasks) ---
  {
    id: 'task-16',
    status: 'published',
    title: 'Leadership Development Masterclass for Educators',
    description:
      'Approved and publicly available with mentoring, coaching, and succession-planning lessons.',
    category: 'Leadership Development',
    price: '$89',
    assignedBy: 'Dr. Sopheak Chan',
    students: '1,842',
    revenue: '$163,938',
    rating: '4.9',
    updatedAt: 'Updated 2 days ago',
  },
  {
    id: 'task-17',
    status: 'published',
    title: 'Khmer Literature: The Complete Guide',
    description:
      'Learn the fundamentals of Khmer literature, including classical poetry, prose forms, and oral storytelling traditions.',
    category: 'Khmer Literature',
    price: '$49',
    assignedBy: 'Dr. Sopheak Chan',
    students: '3,412',
    revenue: '$167,188',
    rating: '4.8',
    updatedAt: 'Updated 5 days ago',
  },
  {
    id: 'task-18',
    status: 'published',
    title: 'Child Development & Early Learning',
    description:
      'Build strong foundations in early-years pedagogy, developmental milestones, and inclusive classroom practices.',
    category: 'Child Development',
    price: '$79',
    assignedBy: 'Dr. Sopheak Chan',
    students: '2,150',
    revenue: '$169,850',
    rating: '4.7',
    updatedAt: 'Updated 1 week ago',
  },
  {
    id: 'task-19',
    status: 'published',
    title: 'Community Leadership in Practice',
    description:
      'Master civic-organizing techniques to build community programs that create lasting local impact.',
    category: 'Leadership',
    price: '$29',
    assignedBy: 'Dr. Sopheak Chan',
    students: '1,120',
    revenue: '$32,480',
    rating: '4.9',
    updatedAt: 'Updated 2 weeks ago',
  },
  {
    id: 'task-20',
    status: 'published',
    title: 'Innovative Learning for Teaching Teams',
    description:
      'Learn project-based learning fundamentals, facilitation strategies, and collaborative classroom design.',
    category: 'Innovative Learning',
    price: '$19',
    assignedBy: 'Dr. Sopheak Chan',
    students: '950',
    revenue: '$18,050',
    rating: '4.6',
    updatedAt: 'Updated 3 weeks ago',
  },

  // --- ARCHIVED (5 tasks) ---
  {
    id: 'task-21',
    status: 'archived',
    title: 'Legacy Khmer Grammar Course',
    description:
      'Retired course kept for records. Editing is locked and only Admin can restore or remove it.',
    category: 'Khmer Literature',
    assignedBy: 'Dr. Sopheak Chan',
    notes:
      'Archived: no price, public visibility, or progress tracking. Content remains editable for future resubmission.',
  },
  {
    id: 'task-22',
    status: 'archived',
    title: 'Basic Parent Newsletter Workshop',
    description:
      'Older caregiver-communication course archived after the curriculum moved to a newer version.',
    category: 'Child Development',
    assignedBy: 'Dr. Sopheak Chan',
    notes:
      'Archived: no price, public visibility, or progress tracking. Content remains editable for future resubmission.',
  },
  {
    id: 'task-23',
    status: 'archived',
    title: 'Classroom Presentation Basics',
    description:
      'Archived teaching-fundamentals course retained for historical review.',
    category: 'Innovative Learning',
    assignedBy: 'Dr. Sopheak Chan',
    notes:
      'Archived: no price, public visibility, or progress tracking. Content remains editable for future resubmission.',
  },
  {
    id: 'task-24',
    status: 'archived',
    title: 'Old Community Outreach Guide',
    description:
      'Outreach strategies from 2021 archived due to updated community-engagement practices.',
    category: 'Leadership',
    assignedBy: 'Dr. Sopheak Chan',
    notes:
      'Archived: no price, public visibility, or progress tracking. Content remains editable for future resubmission.',
  },
  {
    id: 'task-25',
    status: 'archived',
    title: 'Intro to Executive Mentoring',
    description:
      'Introductory course archived due to low student engagement and curriculum revisions.',
    category: 'Leadership Development',
    assignedBy: 'Dr. Sopheak Chan',
    notes:
      'Archived: no price, public visibility, or progress tracking. Content remains editable for future resubmission.',
  },
];
