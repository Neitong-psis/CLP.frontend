// Compact curriculum model for the educator course-review experience.
// Hierarchy mirrors the Create Course flow: Module → Lesson → Content items.

export type ReviewItemKind = 'document' | 'video' | 'quiz' | 'assignment';
export type ReviewItemStatus = 'Ready' | 'Draft';

interface BaseItem {
  id: string;
  title: string;
}

export interface DocumentItem extends BaseItem {
  kind: 'document';
  readTime: string;
  intro: string;
  objectives: string[];
  sections: { heading: string; text: string; tip?: string }[];
  takeaways: string[];
}

export interface VideoItem extends BaseItem {
  kind: 'video';
  duration: string;
  intro: string;
  topics: string[];
  moments: { time: string; label: string }[];
  youtubeId?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuizItem extends BaseItem {
  kind: 'quiz';
  status: ReviewItemStatus;
  forLesson: string;
  totalQuestions: number;
  estimatedMinutes: number;
  description: string;
  questions: QuizQuestion[];
}

export interface AssignmentItem extends BaseItem {
  kind: 'assignment';
  status: ReviewItemStatus;
  forLesson: string;
  dueDate: string;
  submission: string;
  instructions: string;
  requirements: string[];
}

export type ReviewItem = DocumentItem | VideoItem | QuizItem | AssignmentItem;

// ── Lesson (matches the "Lesson" level in Create Course) ─────────────────────

export interface ReviewLesson {
  id: string;
  title: string;
  documents: DocumentItem[];
  videos: VideoItem[];
  quizzes: QuizItem[];
  assignments: AssignmentItem[];
}

// ── Module (contains an ordered list of lessons) ─────────────────────────────

export interface ReviewModule {
  id: string;
  title: string;
  lessons: ReviewLesson[];
}

export const ITEM_STATUS_STYLE: Record<ReviewItemStatus, string> = {
  Ready: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Draft: 'border-amber-200 bg-amber-50 text-amber-600',
};

export function lessonCount(module: ReviewModule): number {
  return module.lessons.length;
}

export function flattenItems(modules: ReviewModule[]): ReviewItem[] {
  return modules.flatMap((m) =>
    m.lessons.flatMap((l) => [
      ...l.documents,
      ...l.videos,
      ...l.quizzes,
      ...l.assignments,
    ]),
  );
}

// ── Mock data — Module → Lesson → Content ────────────────────────────────────

export const REVIEW_MODULES: ReviewModule[] = [
  {
    id: 'm1',
    title: 'Module 1: Web Foundations',
    lessons: [
      {
        id: 'l1',
        title: 'Responsive Design Guide',
        documents: [
          {
            id: 'd1',
            kind: 'document',
            title: 'Responsive Design Guide',
            readTime: '3 – 8 min read',
            intro:
              'A concise reading guide for mobile-first layouts, breakpoints, and readable content blocks.',
            objectives: [
              'Understand mobile-first design principles and why they matter',
              'Apply CSS media queries to build layouts that adapt across screens',
              'Structure content blocks for readability at every viewport size',
            ],
            sections: [
              {
                heading: 'What is Mobile-First Design?',
                text: "Mobile-first design means starting with the smallest screen in mind and progressively enhancing for larger screens. Begin by asking: does this content serve the learner on a phone? Strip away anything that doesn't. A page that works on mobile nearly always scales up to desktop gracefully.",
                tip: 'Sketch the mobile layout fully before opening any design tool. Constraints drive clarity.',
              },
              {
                heading: 'Working with Breakpoints',
                text: 'Breakpoints define where your layout shifts. Common values are 640 px (sm), 768 px (md), 1024 px (lg), and 1280 px (xl). Resist adding a breakpoint every time the design looks off — instead, let the content determine where the layout naturally needs to change.',
              },
              {
                heading: 'Readable Content Blocks',
                text: 'Limit line length to 60 – 80 characters for comfortable reading. Use a base font size of at least 16 px on body text. When reviewing, slow down at each heading and ask what changed from the previous idea — this habit improves both writing and proofreading.',
                tip: "Key takeaway: finish the reading before opening the quiz. The question wording assumes you've read every section.",
              },
            ],
            takeaways: [
              'Start every layout from the smallest viewport and enhance upward',
              'Breakpoints should follow content needs, not arbitrary pixel values',
              'Comfortable line lengths (60 – 80 chars) significantly reduce eye fatigue',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'q3',
            kind: 'quiz',
            title: 'Responsive Design Quiz',
            status: 'Ready',
            forLesson: 'Responsive Design Guide',
            totalQuestions: 6,
            estimatedMinutes: 9,
            description:
              'Confirm your grasp of mobile-first design, CSS breakpoints, and content readability from the Responsive Design Guide document.',
            questions: [
              {
                question:
                  'Which design approach should you start with for responsive layouts?',
                options: [
                  'Mobile-first',
                  'Desktop-first',
                  'Tablet-first',
                  'Largest screen first',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'What is the ideal character line length for comfortable reading?',
                options: [
                  '40 – 50 characters',
                  '100 – 120 characters',
                  '60 – 80 characters',
                  'Line length has no impact',
                ],
                correctIndex: 2,
              },
              {
                question: 'What is a CSS breakpoint?',
                options: [
                  'A bug in the stylesheet',
                  'A screen width at which the layout changes',
                  'A way to pause CSS animations',
                  'A unit of measurement',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which technique makes images responsive without distortion?',
                options: [
                  'width: auto',
                  'height: 100%',
                  'max-width: 100%',
                  'display: block',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which CSS unit is relative to the width of the viewport?',
                options: ['em', 'rem', 'vw', 'px'],
                correctIndex: 2,
              },
              {
                question:
                  'What is the purpose of the <meta name="viewport"> tag?',
                options: [
                  'It sets the page background colour',
                  'It tells mobile browsers how to scale and size the page',
                  'It links the site to a CDN',
                  'It defines the default font size',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a3',
            kind: 'assignment',
            title: 'Responsive Reading Reflection',
            status: 'Ready',
            forLesson: 'Responsive Design Guide',
            dueDate: 'Jun 2',
            submission: 'Text response',
            instructions:
              'Write a 300 – 400 word reflection on what you learned from the Responsive Design Guide. Describe one concrete change you will make to a project you are currently working on.',
            requirements: [
              '300 – 400 words (submissions outside this range will not be marked)',
              'Reference at least two specific concepts from the lesson',
              'Describe one concrete change you will apply to a real project',
              'Clear paragraph structure: introduction, body, and conclusion',
            ],
          },
        ],
      },
      {
        id: 'l2',
        title: 'HTML Introduction',
        documents: [],
        videos: [
          {
            id: 'v1',
            kind: 'video',
            title: 'HTML Introduction',
            duration: '12 min',
            youtubeId: 'it1rTvBcfRg',
            intro:
              'Meet the building blocks of every web page: elements, tags, attributes, and document structure.',
            topics: [
              'Anatomy of an HTML tag — opening, closing, self-closing',
              'Document structure: <html>, <head>, and <body>',
              'Semantic landmark elements: header, nav, main, footer',
              'Common inline vs. block-level elements',
            ],
            moments: [
              { time: '0:00', label: 'Introduction & why HTML matters' },
              { time: '1:45', label: 'Anatomy of an HTML tag' },
              { time: '4:20', label: 'Document structure overview' },
              { time: '7:10', label: 'Semantic landmark elements' },
              { time: '10:30', label: 'Putting it all together' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'q1',
            kind: 'quiz',
            title: 'HTML Basics Quiz',
            status: 'Ready',
            forLesson: 'HTML Introduction',
            totalQuestions: 10,
            estimatedMinutes: 15,
            description:
              'Test your understanding of HTML document structure, semantic elements, and tag syntax.',
            questions: [
              {
                question: 'What is HTML?',
                options: [
                  'Programming Language',
                  'Database',
                  'Markup Language',
                  'Operating System',
                ],
                correctIndex: 2,
              },
              {
                question: 'Which HTML element defines the document title?',
                options: ['<head>', '<meta>', '<title>', '<header>'],
                correctIndex: 2,
              },
              {
                question: 'Which tag is used to create a hyperlink?',
                options: ['<link>', '<a>', '<href>', '<url>'],
                correctIndex: 1,
              },
              {
                question:
                  'What is the correct HTML element for the largest heading?',
                options: ['<heading>', '<h6>', '<h1>', '<head>'],
                correctIndex: 2,
              },
              {
                question:
                  'Which element is a semantic landmark for navigation?',
                options: ['<div>', '<section>', '<nav>', '<span>'],
                correctIndex: 2,
              },
              {
                question:
                  'What does the alt attribute on an <img> tag provide?',
                options: [
                  'A tooltip shown on hover',
                  'Alternative text for screen readers and broken images',
                  'The image file path',
                  'A caption displayed below the image',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What is the purpose of the <!DOCTYPE html> declaration?',
                options: [
                  'It links an external stylesheet',
                  'It sets the page language',
                  'It tells the browser to render in standards mode',
                  'It defines the page title',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which attribute specifies the destination URL of a hyperlink?',
                options: ['src', 'href', 'link', 'url'],
                correctIndex: 1,
              },
              {
                question:
                  'Which HTML element represents an unordered (bulleted) list?',
                options: ['<ol>', '<li>', '<ul>', '<list>'],
                correctIndex: 2,
              },
              {
                question:
                  'Which HTML element defines the main content area of a document?',
                options: ['<body>', '<section>', '<article>', '<main>'],
                correctIndex: 3,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a1',
            kind: 'assignment',
            title: 'Create a Semantic Page',
            status: 'Ready',
            forLesson: 'HTML Introduction',
            dueDate: 'May 28',
            submission: 'File or link upload',
            instructions:
              'Submit a labelled HTML page structure using header, main, section, and footer elements.',
            requirements: [
              'Use at least 5 semantic HTML5 elements (header, nav, main, article, footer)',
              'Include a navigation bar with 3 or more working links',
              'Structure a main content area with at least two distinct sections',
              'Validate your HTML with the W3C Validator — zero critical errors',
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'CSS Layout Basics',
        documents: [],
        videos: [
          {
            id: 'v2',
            kind: 'video',
            title: 'CSS Layout Basics',
            duration: '15 min',
            youtubeId: 'AGDDdsiZ0Ko',
            intro:
              'Position content with the box model, flexbox, and a few reliable layout patterns that work at every screen size.',
            topics: [
              'The CSS box model: margin, padding, border, content',
              'Flexbox for one-dimensional (row or column) layouts',
              'CSS Grid for two-dimensional page layouts',
              'Responsive patterns: card grids, sidebars, content stacking',
            ],
            moments: [
              { time: '0:00', label: 'Overview of the box model' },
              {
                time: '2:30',
                label: 'margin, padding, and border in practice',
              },
              { time: '5:00', label: 'Flexbox: justify-content & align-items' },
              { time: '9:45', label: 'Grid: rows, columns, and gaps' },
              { time: '13:00', label: 'Responsive layout patterns' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'q2',
            kind: 'quiz',
            title: 'CSS Layout Quiz',
            status: 'Ready',
            forLesson: 'CSS Layout Basics',
            totalQuestions: 8,
            estimatedMinutes: 12,
            description:
              'Assess your knowledge of the CSS box model, flexbox, and grid layout systems.',
            questions: [
              {
                question: 'Which CSS property creates a flexbox container?',
                options: [
                  'display: flex',
                  'position: flex',
                  'layout: flexbox',
                  'flex: container',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'What does "justify-content: space-between" do in flexbox?',
                options: [
                  'Centers all items in the middle',
                  'Adds equal space around every item',
                  'Places equal space between items only',
                  'Stretches items to fill the container',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which CSS property controls gaps between grid items?',
                options: ['spacing', 'margin', 'padding', 'gap'],
                correctIndex: 3,
              },
              {
                question:
                  'In the CSS box model, which property controls space inside the border?',
                options: ['margin', 'padding', 'border-spacing', 'inset'],
                correctIndex: 1,
              },
              {
                question:
                  'Which CSS property aligns flex items along the cross axis?',
                options: [
                  'justify-content',
                  'align-items',
                  'flex-direction',
                  'align-self',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which CSS property controls the stacking order of overlapping elements?',
                options: ['order', 'stack', 'z-index', 'layer'],
                correctIndex: 2,
              },
              {
                question:
                  'Which CSS value makes a flex item grow to fill all remaining space?',
                options: ['flex: 0', 'flex: auto', 'flex: 1', 'flex: max'],
                correctIndex: 2,
              },
              {
                question:
                  'Which CSS display value creates a two-dimensional grid container?',
                options: [
                  'display: block',
                  'display: inline-flex',
                  'display: table',
                  'display: grid',
                ],
                correctIndex: 3,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a2',
            kind: 'assignment',
            title: 'Rebuild a Responsive Layout',
            status: 'Ready',
            forLesson: 'CSS Layout Basics',
            dueDate: 'May 30',
            submission: 'File or link upload',
            instructions:
              'Take the provided desktop-only layout file and rebuild it to be fully responsive using CSS flexbox or grid.',
            requirements: [
              'Apply mobile-first CSS with media queries at 640 px and 1024 px',
              'Use flexbox or CSS Grid for the primary page layout',
              'Ensure body text line lengths stay under 80 characters',
              'Submit screenshots at mobile (375 px), tablet (768 px), and desktop (1280 px)',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'm2',
    title: 'Module 2: Applied Smart Workflows',
    lessons: [
      {
        id: 'l4',
        title: 'Accessibility Notes',
        documents: [
          {
            id: 'd2',
            kind: 'document',
            title: 'Accessibility Notes',
            readTime: '4 – 6 min read',
            intro:
              'Quick reference for colour contrast, focus order, and labelling interactive elements to meet WCAG 2.1 AA.',
            objectives: [
              'Identify common accessibility barriers in digital interfaces',
              'Apply WCAG contrast and keyboard focus standards correctly',
              'Label interactive elements for screen reader compatibility',
            ],
            sections: [
              {
                heading: 'Colour Contrast & Typography',
                text: 'Text on a background must pass WCAG AA contrast ratio: 4.5:1 for normal text, 3:1 for large text (18 pt or 14 pt bold). Never rely on colour alone to convey meaning — always pair it with a shape, icon, or text label for users with colour blindness.',
                tip: "Use the browser's accessibility inspector to check contrast instantly without leaving the dev environment.",
              },
              {
                heading: 'Focus & Keyboard Navigation',
                text: 'Every interactive element — buttons, links, form fields — must be reachable with the Tab key and operable with Enter or Space. Never remove the focus ring without providing a clearly visible custom alternative.',
              },
              {
                heading: 'Semantic Markup & Labels',
                text: 'Use the correct HTML element for the job: <button> for actions, <a> for navigation, <nav> and <main> for landmarks. Label every input with a <label> element.',
                tip: "Accessibility is far easier when it's part of the first draft. Retrofitting a finished product is costly.",
              },
            ],
            takeaways: [
              'Accessibility starts with semantic HTML — ARIA is a patch, not a foundation',
              'Contrast ratio minimum: 4.5:1 for normal body text (WCAG AA)',
              'Every interactive element must be fully operable with the keyboard alone',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'q5',
            kind: 'quiz',
            title: 'Accessibility Practice Quiz',
            status: 'Ready',
            forLesson: 'Accessibility Notes',
            totalQuestions: 5,
            estimatedMinutes: 8,
            description:
              'Test your knowledge of WCAG guidelines, keyboard navigation, and semantic HTML from the Accessibility Notes document.',
            questions: [
              {
                question:
                  'What is the minimum contrast ratio for normal body text under WCAG AA?',
                options: ['3:1', '4.5:1', '7:1', '2:1'],
                correctIndex: 1,
              },
              {
                question:
                  'Which HTML element should you use to trigger an action?',
                options: [
                  '<div onclick>',
                  '<span>',
                  '<button>',
                  '<a href="#">',
                ],
                correctIndex: 2,
              },
              {
                question: 'What does WCAG stand for?',
                options: [
                  'Web Colour Accessibility Guide',
                  'Web Content Accessibility Guidelines',
                  'Wide Content Alignment Grid',
                  'Web Component Annotation Guide',
                ],
                correctIndex: 1,
              },
              {
                question: 'What must every interactive element be operable by?',
                options: [
                  'Mouse only',
                  'Touch screen only',
                  'Keyboard alone',
                  'Voice commands only',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'What should never be the sole way to convey information?',
                options: ['Typography', 'Icons', 'Text labels', 'Colour alone'],
                correctIndex: 3,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a5',
            kind: 'assignment',
            title: 'Accessibility Audit Checklist',
            status: 'Ready',
            forLesson: 'Accessibility Notes',
            dueDate: 'Jun 8',
            submission: 'File or link upload',
            instructions:
              'Perform an accessibility audit on a website of your choice using the WCAG 2.1 AA standard.',
            requirements: [
              'Audit at least 5 pages from the same website',
              'Check and document contrast ratios for all text elements',
              'Test keyboard navigation through every interactive element',
              'Document at least 3 distinct accessibility issues with suggested fixes',
            ],
          },
        ],
      },
      {
        id: 'l5',
        title: 'Smart Office Workflow',
        documents: [],
        videos: [
          {
            id: 'v3',
            kind: 'video',
            title: 'Smart Office Workflow',
            duration: '18 min',
            youtubeId: 'zofMnllkVfI',
            intro:
              'Use AI tools to organise office tasks, summarise long documents, and build faster daily workflows.',
            topics: [
              'Why AI-assisted workflows reduce repetitive manual work',
              'Summarising meeting notes and long documents automatically',
              'Setting up a daily task automation routine',
              'Integrating AI tools with email, calendar, and file storage',
            ],
            moments: [
              { time: '0:00', label: 'Why AI workflows matter today' },
              { time: '3:15', label: 'Summarising long documents' },
              { time: '7:40', label: 'Automating repetitive daily tasks' },
              { time: '12:20', label: 'Tool integration walkthrough' },
              { time: '16:00', label: 'Building your personal workflow' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'q4',
            kind: 'quiz',
            title: 'Smart Office Workflow Quiz',
            status: 'Ready',
            forLesson: 'Smart Office Workflow',
            totalQuestions: 7,
            estimatedMinutes: 10,
            description:
              'Evaluate your understanding of AI-powered office workflows, task automation, and tool integration.',
            questions: [
              {
                question:
                  'What is the primary benefit of AI document summarisation tools?',
                options: [
                  'Save time reviewing long documents',
                  'Replace human decision-making entirely',
                  'Translate documents automatically',
                  'Format text with perfect typography',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'When integrating AI tools into an existing workflow, you should:',
                options: [
                  'Replace all current tools at once',
                  'Start with one workflow and expand gradually',
                  'Only use AI for creative writing',
                  'Avoid automation for complex tasks',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which task is best suited for AI automation?',
                options: [
                  'Strategic decision-making',
                  'Summarising recurring meeting notes',
                  'Building interpersonal relationships',
                  'Creative problem solving',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What should you verify after setting up an AI workflow?',
                options: [
                  'That it looks impressive to colleagues',
                  'That outputs are accurate and reviewed regularly',
                  'That it runs as fast as possible',
                  'That it costs the least',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What is the main advantage of connecting AI tools to email and calendar apps?',
                options: [
                  'It deletes low-priority emails automatically',
                  'It allows AI to schedule meetings without any human input',
                  'It streamlines scheduling and follow-up reminders in one place',
                  'It replaces the need for a project manager',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which type of task should always remain under direct human control, even when AI assistance is available?',
                options: [
                  'Formatting a recurring report',
                  'Sending automated meeting reminders',
                  'Strategic decisions affecting people or budgets',
                  'Summarising a long PDF',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'What habit best ensures AI-generated outputs remain accurate over time?',
                options: [
                  'Never changing the AI prompts',
                  'Regularly reviewing and auditing AI outputs',
                  'Trusting the AI to self-correct',
                  'Using multiple AI tools simultaneously',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a4',
            kind: 'assignment',
            title: 'Draft an AI Workflow Plan',
            status: 'Ready',
            forLesson: 'Smart Office Workflow',
            dueDate: 'Jun 5',
            submission: 'File or link upload',
            instructions:
              'Design a workflow that uses at least one AI tool to automate a repetitive task in a real or hypothetical office environment.',
            requirements: [
              'Identify one specific repetitive task that an AI tool can assist with',
              'Name at least one concrete AI tool that handles this task',
              'Provide numbered step-by-step implementation instructions',
              'Estimate the time saved per week and justify your estimate',
            ],
          },
        ],
      },
    ],
  },
];
