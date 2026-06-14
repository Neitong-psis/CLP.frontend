export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

export type SectionType = 'text' | 'image' | 'video' | 'quiz' | 'assignment';

export interface ContentSection {
  id: string;
  type: SectionType;
  text: string;
  imageUrl: string;
  videoTitle: string;
  videoUrl: string;
  question: string;
  answerFormat: 'single' | 'multiple';
  options: QuizOption[];
  assignmentDesc: string;
  dueDate: string;
  submissionType: string;
}

export interface Lesson {
  id: string;
  title: string;
  expanded: boolean;
  sections: ContentSection[];
}

export interface CourseModule {
  id: string;
  title: string;
  expanded: boolean;
  lessons: Lesson[];
}

export interface CourseInfo {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  pricingType: string;
  price: string;
  thumbnail: string;
}
