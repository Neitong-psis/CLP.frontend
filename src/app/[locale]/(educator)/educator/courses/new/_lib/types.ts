export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

/** A single question within a quiz section — a section can hold many. */
export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export type SectionType = 'text' | 'image' | 'video' | 'quiz' | 'assignment';

export interface ContentSection {
  id: string;
  type: SectionType;
  text: string;
  imageUrl: string;
  videoTitle: string;
  videoUrl: string;
  videoFileName: string;
  videoDescription: string;
  quizQuestions: QuizQuestion[];
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
  currency: string;
  promoCode: string;
  thumbnail: string;
}
