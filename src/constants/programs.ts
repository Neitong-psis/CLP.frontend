import {
  BookOpen,
  Target,
  Code2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface ProgramDetail {
  slug: string;
  title: string;
  tagline: string;
  tag: string;
  image: string;
  description: string;
  icon: LucideIcon;
  stats: { label: string; value: string }[];
  curriculum: { week: string; topic: string; description: string }[];
  outcomes: string[];
  whoIsItFor: string;
}

export const PROGRAM_DETAILS: readonly ProgramDetail[] = [
  {
    slug: 'foundation',
    title: 'Foundation Program',
    tagline: 'Build the leader within you.',
    tag: 'Ages 13–15',
    image: '/programs/Foundation_progrsm.png',
    icon: BookOpen,
    description:
      'The Foundation Program is designed for young learners aged 13–15 who are ready to take their first step into structured leadership development. Built on the Australian Curriculum framework and fully aligned with MoEYS standards, this program blends academic rigour with real-world application.',
    stats: [
      { label: 'Age Range', value: '13–15' },
      { label: 'Duration', value: '12 Weeks' },
      { label: 'Sessions', value: '24 Classes' },
      { label: 'Certificate', value: 'Australian Accredited' },
    ],
    curriculum: [
      {
        week: 'Week 1–2',
        topic: 'Leadership Foundations',
        description:
          'Discover your leadership style and build self-awareness through guided workshops.',
      },
      {
        week: 'Week 3–4',
        topic: 'Communication Skills',
        description:
          'Master public speaking, active listening, and written communication.',
      },
      {
        week: 'Week 5–6',
        topic: 'Critical Thinking',
        description:
          'Develop problem-solving frameworks and analytical reasoning techniques.',
      },
      {
        week: 'Week 7–8',
        topic: 'Teamwork & Collaboration',
        description:
          'Work in diverse teams on community-focused projects with real outcomes.',
      },
      {
        week: 'Week 9–10',
        topic: 'Community Engagement',
        description:
          'Design and execute a local impact project with mentor guidance.',
      },
      {
        week: 'Week 11–12',
        topic: 'Showcase & Certification',
        description:
          'Present your work to a panel of educators and receive your accredited certificate.',
      },
    ],
    outcomes: [
      'Confidence to speak publicly and lead discussions',
      'A structured personal development plan',
      'Australian-accredited completion certificate',
      'Foundation for Advanced Leadership pathway',
      'Practical teamwork and project experience',
      'Mentor relationship with certified educators',
    ],
    whoIsItFor:
      'Students aged 13–15 who are curious, motivated, and ready to grow. No prior leadership experience required — just a willingness to learn and contribute.',
  },
  {
    slug: 'advanced-leadership',
    title: 'Advanced Leadership',
    tagline: 'Lead with strategy. Speak with impact.',
    tag: 'Ages 16–18',
    image: '/programs/advanced_leadership.png',
    icon: Target,
    description:
      'The Advanced Leadership Program takes students aged 16–18 deeper into the disciplines of strategic thinking, executive communication, and project management. Through immersive workshops, case studies, and live mentoring sessions, participants develop the skills universities and employers actively seek.',
    stats: [
      { label: 'Age Range', value: '16–18' },
      { label: 'Duration', value: '16 Weeks' },
      { label: 'Sessions', value: '32 Classes' },
      { label: 'Certificate', value: 'ISO 9001 Certified' },
    ],
    curriculum: [
      {
        week: 'Week 1–3',
        topic: 'Strategic Thinking',
        description:
          'Frameworks for decision-making, risk assessment, and long-term planning.',
      },
      {
        week: 'Week 4–6',
        topic: 'Executive Communication',
        description:
          'Advanced public speaking, debate, negotiation, and persuasive writing.',
      },
      {
        week: 'Week 7–9',
        topic: 'Project Management',
        description:
          'Agile methodology, team leadership, and delivering results under pressure.',
      },
      {
        week: 'Week 10–12',
        topic: 'Entrepreneurship & Innovation',
        description:
          'Ideate, prototype, and pitch a solution to a real community challenge.',
      },
      {
        week: 'Week 13–14',
        topic: 'University Preparation',
        description:
          'Personal statements, interview skills, and scholarship application guidance.',
      },
      {
        week: 'Week 15–16',
        topic: 'Capstone & Certification',
        description:
          'Present a leadership portfolio to an industry panel and earn your certificate.',
      },
    ],
    outcomes: [
      'Strategic planning and executive communication skills',
      'A complete leadership portfolio for university applications',
      'ISO 9001 certified completion certificate',
      'Mentorship from Cambridge-certified educators',
      'Access to AYLA alumni network and job board',
      'Pathway to Youth Excellence and international exchange',
    ],
    whoIsItFor:
      'Students aged 16–18 who have completed the Foundation Program or demonstrate equivalent leadership experience. Ideal for those preparing for university admission.',
  },
  {
    slug: 'stem',
    title: 'STEM Excellence',
    tagline: 'Code. Build. Innovate.',
    tag: 'Innovation',
    image: '/programs/STEM.png',
    icon: Code2,
    description:
      'The STEM Excellence Program equips students with 21st-century technical skills through hands-on robotics, coding, and scientific inquiry. Aligned with STEM Alliance standards, this program prepares young innovators for the digital economy and fosters computational thinking from the ground up.',
    stats: [
      { label: 'Age Range', value: '12–18' },
      { label: 'Duration', value: '14 Weeks' },
      { label: 'Sessions', value: '28 Classes' },
      { label: 'Partner', value: 'STEM Alliance' },
    ],
    curriculum: [
      {
        week: 'Week 1–2',
        topic: 'Computational Thinking',
        description:
          'Algorithms, logic, and problem decomposition for beginners.',
      },
      {
        week: 'Week 3–5',
        topic: 'Programming Fundamentals',
        description:
          'Python and JavaScript basics through project-based challenges.',
      },
      {
        week: 'Week 6–8',
        topic: 'Robotics & Automation',
        description: 'Build and program robots to complete real-world tasks.',
      },
      {
        week: 'Week 9–10',
        topic: 'Data & AI Literacy',
        description:
          'Introduction to data analysis, machine learning concepts, and responsible AI.',
      },
      {
        week: 'Week 11–12',
        topic: 'Science Investigation',
        description:
          'Design and conduct scientific experiments using the inquiry method.',
      },
      {
        week: 'Week 13–14',
        topic: 'Innovation Showcase',
        description:
          'Present your STEM project at the AYLA Coding Challenge or Science Fair.',
      },
    ],
    outcomes: [
      'Proficiency in Python and JavaScript fundamentals',
      'Hands-on robotics build and programming experience',
      'STEM Alliance verified digital certificate',
      'Portfolio of projects for university applications',
      'Entry to AYLA Coding Challenge competition',
      'Mentorship from industry engineers and scientists',
    ],
    whoIsItFor:
      'Open to all students aged 12–18 with an interest in technology, science, or engineering. No prior coding experience required.',
  },
  {
    slug: 'youth',
    title: 'Youth Excellence',
    tagline: 'Accelerate your future.',
    tag: 'Top 5%',
    image: '/programs/Youth.png',
    icon: Sparkles,
    description:
      "Youth Excellence is AYLA's most prestigious and competitive program, reserved for the top 5% of students who have demonstrated exceptional leadership, academic performance, and community impact. This accelerated pathway combines elite leadership training with university preparation and international exchange opportunities.",
    stats: [
      { label: 'Age Range', value: '16–19' },
      { label: 'Duration', value: '20 Weeks' },
      { label: 'Sessions', value: '40 Classes' },
      { label: 'Qualification', value: 'Cambridge International' },
    ],
    curriculum: [
      {
        week: 'Week 1–4',
        topic: 'Elite Leadership Mastery',
        description:
          'Advanced seminars with visiting executives, government officials, and academics.',
      },
      {
        week: 'Week 5–8',
        topic: 'Research & Academic Writing',
        description:
          'University-level research methodology, essay writing, and citation standards.',
      },
      {
        week: 'Week 9–12',
        topic: 'International Exchange Prep',
        description:
          'Cross-cultural communication, global citizenship, and exchange program orientation.',
      },
      {
        week: 'Week 13–15',
        topic: 'Cambridge Assessment Track',
        description:
          'Preparation for Cambridge International qualifications with certified instructors.',
      },
      {
        week: 'Week 16–18',
        topic: 'Social Enterprise Project',
        description:
          'Launch a real social enterprise and present it to investors and NGO partners.',
      },
      {
        week: 'Week 19–20',
        topic: 'Graduation & Showcase',
        description:
          'Formal graduation ceremony with Cambridge-certified credentials and alumni induction.',
      },
    ],
    outcomes: [
      'Cambridge International qualification pathway',
      'Invitation to AYLA international exchange program',
      'Direct mentorship from Cambridge-certified educators',
      'Co-authored research paper for university portfolios',
      'Access to AYLA scholarship fund (up to $1,200)',
      'Permanent induction into AYLA Alumni Excellence Network',
    ],
    whoIsItFor:
      'By invitation or competitive application only. Candidates must have completed Advanced Leadership or demonstrate outstanding academic and extracurricular achievement.',
  },
];
