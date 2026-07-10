export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface ContentSection {
  id: string;
  type: 'text' | 'image' | 'video' | 'quiz' | 'assignment';
  text: string;
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
