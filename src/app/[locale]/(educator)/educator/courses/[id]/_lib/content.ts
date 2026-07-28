// Compact curriculum model for the educator course-review experience.
// Hierarchy mirrors the Create Course flow: Module → Lesson → Content items.

import type { JSONContent } from '@tiptap/react';
import { richDoc } from '@/lib/utils/richDoc';

export type ReviewItemKind = 'document' | 'video' | 'quiz' | 'assignment';
export type ReviewItemStatus = 'Ready' | 'Draft';

interface BaseItem {
  id: string;
  title: string;
}

export interface DocumentItem extends BaseItem {
  kind: 'document';
  readTime: string;
  /** Tiptap document JSON — the same shape the RichEditor authoring tool
   *  produces, rendered read-only via `RichContentViewer`. Preferred for new
   *  content; takes priority over the legacy fields below when present. */
  content?: JSONContent;
  /** Legacy plain-structure fields, still used by the existing course
   *  catalog (course-modules.ts / explore-modules.ts) — `DocumentPanel`
   *  converts these into equivalent rich-text rendering at render time via
   *  `legacyDocumentToRichDoc`, so that catalog doesn't need a mass rewrite. */
  intro?: string;
  objectives?: string[];
  sections?: { heading: string; text: string; tip?: string }[];
  takeaways?: string[];
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
    title: 'Module 1: Innovative Learning Foundations',
    lessons: [
      {
        id: 'l1',
        title: 'Lesson Design Fundamentals',
        documents: [
          {
            id: 'd1',
            kind: 'document',
            title: 'Lesson Design Fundamentals',
            readTime: '3 – 8 min read',
            content: richDoc.doc(
              richDoc.paragraph(
                'A concise reading guide for ',
                { text: 'backward design', bold: true },
                ', pacing, and learning objectives that keep a lesson focused.',
              ),
              richDoc.heading(2, "What You'll Learn"),
              richDoc.bulletList([
                [
                  'Understand backward design and why it starts with learning objectives',
                ],
                [
                  'Apply the "one objective per activity" principle to keep lessons focused',
                ],
                [
                  'Structure a lesson plan for steady pacing from opening to close',
                ],
              ]),
              richDoc.heading(2, 'What is Backward Design?'),
              richDoc.paragraph(
                'Backward design means starting with the ',
                { text: 'outcome you want learners to reach', bold: true },
                ' before choosing any activity. Begin by asking: what should the learner be able to do by the end of this lesson? Build everything else — the hook, the activities, the assessment — to serve that outcome.',
              ),
              richDoc.blockquote(
                'Write the learning objective before you write a single slide. Constraints drive clarity.',
              ),
              richDoc.heading(2, 'Pacing a Lesson'),
              richDoc.paragraph(
                'Pacing determines where attention rises and falls. Common checkpoints are the ',
                {
                  text: 'opening hook, guided practice, a mid-lesson check, and a closing recap',
                  bold: true,
                },
                '. Resist adding a new activity every time energy dips — instead, let the learning objective determine where the lesson naturally needs a change of pace.',
              ),
              richDoc.heading(2, 'Readable Lesson Plans'),
              richDoc.paragraph(
                'Keep each section of your lesson plan to ',
                { text: 'one idea at a time', bold: true },
                ' so a substitute teacher or co-facilitator can follow it without extra explanation. Write objectives in plain, observable language. When reviewing, slow down at each heading and ask what changed from the previous idea — this habit improves both lesson writing and self-review.',
              ),
              richDoc.blockquote(
                { text: 'Key takeaway:', italic: true },
                " finish the reading before opening the quiz. The question wording assumes you've read every section.",
              ),
              richDoc.heading(2, 'Key Takeaways'),
              richDoc.bulletList([
                [
                  'Start every lesson from the intended outcome and design backward from there',
                ],
                [
                  'Pacing checkpoints should follow the learning objective, not a fixed clock',
                ],
                [
                  'Plain, observable objectives make lessons easier to teach, review, and improve',
                ],
              ]),
            ),
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'q3',
            kind: 'quiz',
            title: 'Lesson Design Quiz',
            status: 'Ready',
            forLesson: 'Lesson Design Fundamentals',
            totalQuestions: 6,
            estimatedMinutes: 9,
            description:
              'Confirm your grasp of backward design, pacing, and objective-writing from the Lesson Design Fundamentals document.',
            questions: [
              {
                question:
                  'Which approach should you start with when designing a lesson?',
                options: [
                  'Backward design, starting from the objective',
                  'Activity-first design',
                  'Slide-first design',
                  'Assessment as an afterthought',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'About how long should an opening hook typically last?',
                options: [
                  'The first 5 minutes',
                  'Half of the lesson',
                  'The entire first hour',
                  'Hooks are unnecessary',
                ],
                correctIndex: 0,
              },
              {
                question: 'What is a "learning objective" in backward design?',
                options: [
                  'A grading rubric category',
                  'A statement of what learners should be able to do by the end of the lesson',
                  'A list of classroom rules',
                  'A textbook chapter title',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which technique keeps a lesson focused?',
                options: [
                  'Adding as many activities as possible',
                  'One objective per activity',
                  'Skipping the recap to save time',
                  'Testing before teaching',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which checkpoint helps you notice if learners are following along mid-lesson?',
                options: [
                  'A mid-lesson check (quick question or discussion)',
                  'The final exam',
                  'The course syllabus',
                  'The enrolment form',
                ],
                correctIndex: 0,
              },
              {
                question: 'What is the purpose of a lesson-closing recap?',
                options: [
                  'To assign homework only',
                  'To reinforce the objective and consolidate learning before class ends',
                  'To introduce a brand new topic',
                  'To take attendance',
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
            title: 'Lesson Design Reflection',
            status: 'Ready',
            forLesson: 'Lesson Design Fundamentals',
            dueDate: 'Jun 2',
            submission: 'Text response',
            instructions:
              'Write a 300 – 400 word reflection on what you learned from the Lesson Design Fundamentals document. Describe one concrete change you will make to a lesson you are currently planning.',
            requirements: [
              '300 – 400 words (submissions outside this range will not be marked)',
              'Reference at least two specific concepts from the lesson',
              'Describe one concrete change you will apply to a real lesson plan',
              'Clear paragraph structure: introduction, body, and conclusion',
            ],
          },
        ],
      },
      {
        id: 'l2',
        title: 'Learner Engagement Basics',
        documents: [],
        videos: [
          {
            id: 'v1',
            kind: 'video',
            title: 'Learner Engagement Basics',
            duration: '12 min',
            youtubeId: 'it1rTvBcfRg',
            intro:
              'Meet the building blocks of every engaging lesson: hooks, questions, participation structures, and closure.',
            topics: [
              'Anatomy of a lesson hook — curiosity, relevance, and surprise',
              'Lesson structure: opening, core activity, and closing recap',
              'Participation structures: think-pair-share, cold-call, and quick polls',
              'Common engagement blockers and how to avoid them',
            ],
            moments: [
              { time: '0:00', label: 'Introduction & why engagement matters' },
              { time: '1:45', label: 'Anatomy of a strong lesson hook' },
              { time: '4:20', label: 'Lesson structure overview' },
              { time: '7:10', label: 'Participation structures that work' },
              { time: '10:30', label: 'Putting it all together' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'q1',
            kind: 'quiz',
            title: 'Learner Engagement Quiz',
            status: 'Ready',
            forLesson: 'Learner Engagement Basics',
            totalQuestions: 10,
            estimatedMinutes: 15,
            description:
              'Test your understanding of lesson hooks, participation structures, and engagement fundamentals.',
            questions: [
              {
                question: 'What is a lesson hook?',
                options: [
                  'A grading tool',
                  'A seating chart',
                  'An opening moment that captures learner curiosity',
                  'A homework tracker',
                ],
                correctIndex: 2,
              },
              {
                question: 'Which part of a lesson typically comes first?',
                options: [
                  'Closing recap',
                  'Assessment',
                  'Opening hook',
                  'Independent practice',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which participation structure asks learners to think alone, then discuss with a partner?',
                options: [
                  'Cold-call',
                  'Think-pair-share',
                  'Silent reading',
                  'Lecture',
                ],
                correctIndex: 1,
              },
              {
                question: 'What is the purpose of a closing recap?',
                options: [
                  'To assign extra homework',
                  'To reinforce the lesson objective',
                  'To start a new topic',
                  'To take attendance',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which structure gives every learner a planned chance to respond, not just volunteers?',
                options: [
                  'Free-for-all discussion',
                  'Cold-call (equitable, planned)',
                  'Silent independent work',
                  'Optional Q&A',
                ],
                correctIndex: 1,
              },
              {
                question: 'What does a quick poll during a lesson provide?',
                options: [
                  'A final grade',
                  'Immediate insight into learner understanding',
                  'A break from learning',
                  'A seating assignment',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What is the purpose of stating the lesson objective at the start?',
                options: [
                  'It links the lesson to outside resources',
                  'It sets learner expectations for what they will be able to do',
                  'It replaces the need for activities',
                  'It defines the classroom seating chart',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which is a common engagement blocker?',
                options: [
                  'Clear instructions',
                  'One long, uninterrupted lecture',
                  'Frequent check-ins',
                  'Varied activity types',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which technique helps quieter learners participate?',
                options: [
                  'Cold-calling without warning',
                  'Think time before sharing',
                  'Grading participation only by volume',
                  'Skipping discussion entirely',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Which element ties a lesson's opening, activities, and closing together?",
                options: [
                  'The classroom seating chart',
                  'The stated learning objective',
                  'The bell schedule',
                  'The attendance sheet',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a1',
            kind: 'assignment',
            title: 'Design a Lesson Opening',
            status: 'Ready',
            forLesson: 'Learner Engagement Basics',
            dueDate: 'May 28',
            submission: 'File or link upload',
            instructions:
              'Submit a short lesson opening — hook, objective statement, and first participation structure — for a topic of your choice.',
            requirements: [
              'Use at least one hook technique from the lesson (curiosity, relevance, or surprise)',
              'Include a clear, observable learning objective statement',
              'Build in one participation structure that involves the whole group',
              'Have a peer review the opening for clarity before submitting',
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Structuring an Active Lesson',
        documents: [],
        videos: [
          {
            id: 'v2',
            kind: 'video',
            title: 'Structuring an Active Lesson',
            duration: '15 min',
            youtubeId: 'AGDDdsiZ0Ko',
            intro:
              'Sequence a lesson with a clear arc, active-learning techniques, and a few reliable pacing patterns that work in any classroom.',
            topics: [
              'The lesson arc: opening, guided practice, independent practice, closing',
              'Active-learning techniques for whole-group moments',
              'Small-group and station-based activity design',
              'Pacing patterns for whole-group, small-group, and independent work',
            ],
            moments: [
              { time: '0:00', label: 'Overview of the lesson arc' },
              {
                time: '2:30',
                label: 'Guided vs. independent practice in action',
              },
              {
                time: '5:00',
                label: 'Active learning: think-alouds & gallery walks',
              },
              { time: '9:45', label: 'Small groups: roles, timing, and gaps' },
              {
                time: '13:00',
                label: 'Pacing patterns for mixed-ability classrooms',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'q2',
            kind: 'quiz',
            title: 'Active Lesson Design Quiz',
            status: 'Ready',
            forLesson: 'Structuring an Active Lesson',
            totalQuestions: 8,
            estimatedMinutes: 12,
            description:
              'Assess your knowledge of the lesson arc, active-learning techniques, and small-group design.',
            questions: [
              {
                question: 'Which sequence best describes a typical lesson arc?',
                options: [
                  'Independent practice, then hook, then guided practice',
                  'Opening hook, guided practice, independent practice, closing',
                  'Assessment, then lesson, then objective',
                  'Closing, opening, then practice',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What does "gradual release of responsibility" mean in guided practice?',
                options: [
                  'Learners work alone from the start',
                  'The teacher models, then supports, then learners work independently',
                  'The teacher never intervenes',
                  'Learners grade each other immediately',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which activity type asks small groups to rotate through different tasks?',
                options: [
                  'Lecture',
                  'Station-based activity',
                  'Silent reading',
                  'Whole-group quiz',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In small-group design, what should you assign to keep groups accountable?',
                options: [
                  'Nothing — groups self-organise',
                  'Clear roles and a time limit',
                  'A single leader who does all the work',
                  'No shared goal',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which technique keeps a large group actively thinking during a lecture segment?',
                options: [
                  'A think-aloud or turn-and-talk',
                  'A 30-minute uninterrupted lecture',
                  'Silent note-taking only',
                  'Removing all questions',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'What determines how a lesson should be paced across whole-group, small-group, and independent work?',
                options: [
                  'A fixed classroom clock only',
                  'The learning objective and learner readiness',
                  'Whichever the teacher prefers that day',
                  'The length of the textbook chapter',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which pattern best supports a mixed-ability classroom?',
                options: [
                  'One-size-fits-all pacing for every learner',
                  'Flexible grouping with adjustable task difficulty',
                  'Only whole-group instruction',
                  'Removing independent practice entirely',
                ],
                correctIndex: 1,
              },
              {
                question: 'What is the purpose of a gallery walk activity?',
                options: [
                  "Letting learners silently review and respond to peers' work",
                  'Collecting homework',
                  'Replacing assessment entirely',
                  'Assigning seating for the term',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a2',
            kind: 'assignment',
            title: 'Redesign a Lesson Sequence',
            status: 'Ready',
            forLesson: 'Structuring an Active Lesson',
            dueDate: 'May 30',
            submission: 'File or link upload',
            instructions:
              'Take the provided lecture-only lesson plan and redesign it to include active-learning techniques using the full lesson arc.',
            requirements: [
              'Apply the full lesson arc: opening hook, guided practice, independent practice, closing',
              'Include at least one active-learning or small-group technique from the lesson',
              'Keep each activity segment to a realistic, stated time block',
              'Submit a timed run-through plan for a 45-minute, a 60-minute, and a 90-minute version',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'm2',
    title: 'Module 2: Applied Innovative Learning',
    lessons: [
      {
        id: 'l4',
        title: 'Inclusive Classroom Practices',
        documents: [
          {
            id: 'd2',
            kind: 'document',
            title: 'Inclusive Classroom Practices',
            readTime: '4 – 6 min read',
            content: richDoc.doc(
              richDoc.paragraph(
                'Quick reference for Universal Design for Learning, accommodations, and creating a classroom where every learner can participate to meet ',
                { text: 'inclusive teaching standards', bold: true },
                '.',
              ),
              richDoc.heading(2, "What You'll Learn"),
              richDoc.bulletList([
                ['Identify common participation barriers in a classroom'],
                [
                  'Apply Universal Design for Learning (UDL) principles correctly',
                ],
                [
                  'Provide accommodations without singling out individual learners',
                ],
              ]),
              richDoc.heading(2, 'Universal Design for Learning'),
              richDoc.paragraph(
                'Every lesson should offer multiple means of ',
                {
                  text: 'engagement, representation, and action',
                  bold: true,
                },
                '. Offer content through more than one channel — spoken, written, visual — so learners with different needs and preferences can access it. Never rely on a single format to convey a core idea; always pair it with an alternative such as a visual, written summary, or peer explanation.',
              ),
              richDoc.blockquote(
                'Run a quick access check before every lesson: can a learner who cannot hear, see, or move easily still fully participate?',
              ),
              richDoc.heading(2, 'Participation & Physical Access'),
              richDoc.paragraph(
                'Every activity — discussion, group work, worksheet — must be reachable by learners with different ',
                {
                  text: 'mobility, sensory, or processing needs',
                  bold: true,
                },
                '. ',
                {
                  text: 'Never remove an accommodation',
                  italic: true,
                },
                ' without offering a clearly explained alternative.',
              ),
              richDoc.heading(2, 'Clear Instructions & Labels'),
              richDoc.paragraph(
                'Use plain, direct language for instructions: state the task, the expected output, and the time limit. Label every station or material clearly so no learner has to guess what to do next.',
              ),
              richDoc.blockquote(
                "Inclusion is far easier when it's part of the first draft of a lesson plan. Retrofitting accommodations into a finished lesson is costly.",
              ),
              richDoc.heading(2, 'Key Takeaways'),
              richDoc.bulletList([
                [
                  'Inclusion starts with UDL principles — individual accommodations are a patch, not a foundation',
                ],
                [
                  'Offer content through at least two different channels in every lesson',
                ],
                [
                  'Every activity must be fully accessible without requiring a specific accommodation request',
                ],
              ]),
            ),
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'q5',
            kind: 'quiz',
            title: 'Inclusive Practices Quiz',
            status: 'Ready',
            forLesson: 'Inclusive Classroom Practices',
            totalQuestions: 5,
            estimatedMinutes: 8,
            description:
              'Test your knowledge of UDL principles, accommodations, and inclusive instruction from the Inclusive Classroom Practices document.',
            questions: [
              {
                question: 'What does UDL stand for?',
                options: [
                  'Unified Discussion Learning',
                  'Universal Design for Learning',
                  'Uniform Delivery of Lessons',
                  'Universal Deadline List',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What is the recommended minimum number of channels for offering lesson content?',
                options: [
                  'Exactly one',
                  'At least two',
                  'None are required',
                  'Only for advanced learners',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which best describes an inclusive instruction habit?',
                options: [
                  'Assume all learners process instructions the same way',
                  'State the task, expected output, and time limit clearly',
                  'Give instructions only once, quickly',
                  'Rely on peer learners to explain instructions',
                ],
                correctIndex: 1,
              },
              {
                question: 'What must every classroom activity be?',
                options: [
                  'Optional for learners with accommodations',
                  'Reachable by learners with different mobility, sensory, or processing needs',
                  'Timed identically regardless of task complexity',
                  'Designed for only the fastest learners',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What should never be the sole way to convey information in a lesson?',
                options: [
                  'Written text',
                  'Spoken words',
                  'Visual images',
                  'Any single format alone',
                ],
                correctIndex: 3,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a5',
            kind: 'assignment',
            title: 'Inclusion Audit Checklist',
            status: 'Ready',
            forLesson: 'Inclusive Classroom Practices',
            dueDate: 'Jun 8',
            submission: 'File or link upload',
            instructions:
              'Perform an inclusion audit on a lesson plan of your choice using Universal Design for Learning principles.',
            requirements: [
              'Audit at least 5 activities from the same lesson plan',
              'Check and document available channels (spoken, written, visual) for each activity',
              'Test whether each activity is reachable by learners with different mobility or sensory needs',
              'Document at least 3 distinct inclusion gaps with suggested fixes',
            ],
          },
        ],
      },
      {
        id: 'l5',
        title: 'Formative Assessment & Feedback Loops',
        documents: [],
        videos: [
          {
            id: 'v3',
            kind: 'video',
            title: 'Formative Assessment & Feedback Loops',
            duration: '18 min',
            youtubeId: 'zofMnllkVfI',
            intro:
              'Use quick-check techniques to see what learners actually understand, and close the loop with feedback that changes what happens next.',
            topics: [
              'Why formative checks catch misunderstanding before it compounds',
              'Low-stakes techniques: exit tickets, thumbs-up polls, one-sentence summaries',
              "Turning check results into the next day's lesson plan",
              'Giving feedback that learners can act on immediately',
            ],
            moments: [
              { time: '0:00', label: 'Why formative assessment matters today' },
              { time: '3:15', label: 'Quick-check techniques in action' },
              { time: '7:40', label: 'Reading the results and adjusting pace' },
              { time: '12:20', label: 'Feedback that learners can act on' },
              { time: '16:00', label: 'Building your own feedback loop' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'q4',
            kind: 'quiz',
            title: 'Formative Assessment Quiz',
            status: 'Ready',
            forLesson: 'Formative Assessment & Feedback Loops',
            totalQuestions: 7,
            estimatedMinutes: 10,
            description:
              'Evaluate your understanding of formative checks, feedback loops, and adjusting instruction in response to results.',
            questions: [
              {
                question:
                  'What is the primary benefit of a formative check like an exit ticket?',
                options: [
                  'Catch misunderstanding before it compounds',
                  'Replace the need for any final assessment',
                  'Assign a final grade',
                  'Take attendance',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'When introducing a new formative-check routine, you should:',
                options: [
                  'Replace every existing routine at once',
                  'Start with one routine and expand gradually',
                  'Only use it for advanced learners',
                  'Avoid it for complex topics',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which technique is best suited as a quick, low-stakes check?',
                options: [
                  'A cumulative final exam',
                  'A one-sentence exit-ticket summary',
                  'A term-long portfolio',
                  'A parent conference',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What should you do after collecting formative-check results?',
                options: [
                  'File them without review',
                  'Adjust the next lesson based on what the results show',
                  'Grade them for the report card',
                  'Ignore results below a certain score',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "What is the main advantage of connecting formative checks directly to the next lesson's plan?",
                options: [
                  'It removes the need to plan ahead',
                  'It lets the teacher skip re-teaching entirely',
                  'It closes the loop between what learners showed and what happens next',
                  'It replaces the need for a lesson objective',
                ],
                correctIndex: 2,
              },
              {
                question:
                  "Which decision should always remain under the teacher's direct judgement, even with a formative-check routine in place?",
                options: [
                  'Formatting the exit-ticket template',
                  'Sending a reminder to complete the check',
                  'Deciding whether to re-teach a concept before moving on',
                  'Collecting a one-word answer',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'What habit best ensures feedback loops keep improving instruction over time?',
                options: [
                  'Never changing the check questions',
                  'Regularly reviewing check results and adjusting the plan',
                  'Trusting that learners will self-correct',
                  'Using as many different checks as possible at once',
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
            title: 'Design a Feedback Loop',
            status: 'Ready',
            forLesson: 'Formative Assessment & Feedback Loops',
            dueDate: 'Jun 5',
            submission: 'File or link upload',
            instructions:
              'Design a formative-check routine that surfaces misunderstanding in a real or hypothetical lesson, and describe how the results would change your next lesson.',
            requirements: [
              'Identify one specific concept that is easy to misunderstand',
              'Name at least one concrete formative-check technique that surfaces it',
              'Provide numbered step-by-step implementation instructions',
              'Describe how results below and above expectation would each change your next lesson',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'm3',
    title: 'Module 3: Leadership & Communication',
    lessons: [
      {
        id: 'l6',
        title: 'Leadership Styles',
        documents: [],
        videos: [
          {
            id: 'v4',
            kind: 'video',
            title: 'Leadership Styles',
            duration: '14 min',
            youtubeId: 'bE6o1ANDED0',
            intro:
              'Explore the four core leadership styles — directive, coaching, supportive, and delegating — and learn when each drives the best outcomes.',
            topics: [
              'What defines a leadership style and why it matters',
              'Directive leadership: clear expectations and accountability',
              'Coaching and supportive approaches for growing teams',
              'Situational leadership — matching style to team readiness',
            ],
            moments: [
              { time: '0:00', label: 'Why leadership style shapes results' },
              { time: '2:10', label: 'Directive leadership in practice' },
              { time: '5:30', label: 'Coaching and mentoring techniques' },
              { time: '9:00', label: 'Supportive and delegating styles' },
              {
                time: '12:20',
                label: 'Choosing the right style situationally',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'q6',
            kind: 'quiz',
            title: 'Leadership Styles Quiz',
            status: 'Ready',
            forLesson: 'Leadership Styles',
            totalQuestions: 7,
            estimatedMinutes: 10,
            description:
              'Test your understanding of the four core leadership styles and when to apply each one.',
            questions: [
              {
                question:
                  'Which leadership style provides the most structured guidance and clear expectations?',
                options: ['Delegating', 'Supportive', 'Directive', 'Coaching'],
                correctIndex: 2,
              },
              {
                question: 'When is a coaching leadership style most effective?',
                options: [
                  'When team members are highly experienced and self-sufficient',
                  'When team members need skill development and motivation',
                  'When a crisis demands immediate decisions',
                  'When the task is completely routine',
                ],
                correctIndex: 1,
              },
              {
                question: 'Situational leadership suggests you should:',
                options: [
                  'Use the same leadership style for every team member',
                  'Always delegate to experienced staff',
                  'Adapt your style to the readiness level of each individual',
                  'Focus only on task completion, not relationships',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'A new employee struggling with their first complex task needs which leadership approach?',
                options: [
                  'Delegating',
                  'Directive',
                  'Supportive',
                  'Laissez-faire',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which style gives experienced team members the most autonomy?',
                options: ['Coaching', 'Directive', 'Supportive', 'Delegating'],
                correctIndex: 3,
              },
              {
                question:
                  'What is the primary goal of a supportive leadership style?',
                options: [
                  'Maximise task completion speed',
                  'Build team confidence and morale',
                  'Reduce the need for communication',
                  'Enforce strict compliance with procedures',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which statement best describes transformational leadership?',
                options: [
                  'Focus on maintaining existing processes',
                  'Reward and punish based on performance only',
                  'Inspire teams toward a shared vision and promote growth',
                  'Manage by exception — only intervene when something fails',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a6',
            kind: 'assignment',
            title: 'Leadership Style Self-Assessment',
            status: 'Ready',
            forLesson: 'Leadership Styles',
            dueDate: 'Jun 15',
            submission: 'Text response',
            instructions:
              'Reflect on a real or hypothetical leadership situation. Identify which style you used (or would use), explain why, and describe the outcome you expect.',
            requirements: [
              '400 – 500 words — stay within the range',
              'Identify a specific leadership style from the lesson by name',
              'Describe the situation, team context, and your rationale',
              'Evaluate one strength and one risk of the style chosen',
            ],
          },
        ],
      },
      {
        id: 'l7',
        title: 'Effective Communication',
        documents: [
          {
            id: 'd3',
            kind: 'document',
            title: 'Effective Communication',
            readTime: '5 – 7 min read',
            content: richDoc.doc(
              richDoc.paragraph(
                'A practical guide to ',
                { text: 'active listening', bold: true },
                ', clear messaging, and giving feedback that builds — not breaks — relationships.',
              ),
              richDoc.heading(2, "What You'll Learn"),
              richDoc.bulletList([
                [
                  'Apply active listening techniques in workplace conversations',
                ],
                ['Structure clear, concise messages for different audiences'],
                [
                  'Deliver and receive constructive feedback using a structured model',
                ],
              ]),
              richDoc.heading(2, 'Active Listening'),
              richDoc.paragraph(
                'Listening is not waiting for your turn to speak. True active listening means paying full attention, suspending judgment, and confirming understanding before responding. Use verbal affirmations (',
                { text: '"I see", "Go on"', italic: true },
                ') and paraphrase what you heard before adding your own point.',
              ),
              richDoc.blockquote(
                'Put away your phone during one-on-one conversations. Undivided attention is the most visible signal of respect.',
              ),
              richDoc.heading(2, 'Structuring Clear Messages'),
              richDoc.paragraph(
                'Before sending any written or spoken message, identify: what action or decision is needed, by whom, and by when. Lead with the most important point (',
                { text: 'bottom-line up front', bold: true },
                '), then provide context and supporting detail. Avoid jargon when communicating cross-functionally.',
              ),
              richDoc.heading(2, 'Giving & Receiving Feedback'),
              richDoc.paragraph(
                'Use the ',
                { text: 'SBI model', bold: true },
                ' — Situation, Behaviour, Impact. Describe the specific situation ("In yesterday\'s meeting"), the observable behaviour ("when you interrupted twice"), and the impact ("the speaker lost their train of thought and the team missed key information"). End by inviting a response.',
              ),
              richDoc.blockquote(
                'When receiving feedback, resist the urge to defend immediately. Write it down, say thank you, then reflect before responding.',
              ),
              richDoc.heading(2, 'Key Takeaways'),
              richDoc.bulletList([
                [
                  'Active listening requires deliberate attention — it is a skill, not a default state',
                ],
                [
                  'Lead every message with the most important point, then add context',
                ],
                [
                  'Feedback is most effective when tied to specific behaviours, not personality',
                ],
              ]),
            ),
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'q7',
            kind: 'quiz',
            title: 'Effective Communication Quiz',
            status: 'Ready',
            forLesson: 'Effective Communication',
            totalQuestions: 6,
            estimatedMinutes: 9,
            description:
              'Assess your understanding of active listening, message structure, and the SBI feedback model.',
            questions: [
              {
                question:
                  'What does "bottom-line up front" mean in communication?',
                options: [
                  'Start with background context before making your point',
                  'Always send written messages instead of speaking',
                  'State your most important point first, then provide detail',
                  'Keep all messages under five sentences',
                ],
                correctIndex: 2,
              },
              {
                question: 'In the SBI feedback model, what does "B" stand for?',
                options: ['Background', 'Behaviour', 'Benefit', 'Budget'],
                correctIndex: 1,
              },
              {
                question: 'Which is a sign of active listening?',
                options: [
                  'Preparing your reply while the other person is still speaking',
                  'Paraphrasing what you heard before responding',
                  'Keeping the conversation as short as possible',
                  'Nodding continuously without asking questions',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Why should you avoid jargon in cross-functional communication?',
                options: [
                  'Jargon makes messages longer than necessary',
                  'It is always incorrect grammar',
                  'Not everyone shares the same technical vocabulary',
                  'Plain language is required by law in most organisations',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'When receiving criticism, the best immediate response is to:',
                options: [
                  'Defend your actions immediately to set the record straight',
                  'Ignore it if you disagree',
                  'Write it down, thank the person, and reflect before responding',
                  'Ask colleagues if they agree with the feedback',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which of the following best demonstrates active listening?',
                options: [
                  '"I already know this topic, so I skipped ahead."',
                  '"Let me make sure I understood — you said the deadline moved to Friday?"',
                  '"Can you send me an email instead?"',
                  '"I agree with everything you said."',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a7',
            kind: 'assignment',
            title: 'Feedback Conversation Role Play',
            status: 'Ready',
            forLesson: 'Effective Communication',
            dueDate: 'Jun 18',
            submission: 'Text response',
            instructions:
              'Write a realistic workplace dialogue (300 – 400 words) in which you deliver feedback to a colleague using the SBI model. Then write a brief reflection (100 – 150 words) on what you learned.',
            requirements: [
              'Dialogue must use the SBI model correctly: Situation, Behaviour, Impact',
              "Include the colleague's response and your follow-up",
              'Reflection must identify one thing you would improve in a real conversation',
              'Total word count: 400 – 550 words across dialogue and reflection',
            ],
          },
        ],
      },
      {
        id: 'l8',
        title: 'Presenting with Confidence',
        documents: [],
        videos: [
          {
            id: 'v5',
            kind: 'video',
            title: 'Presenting with Confidence',
            duration: '16 min',
            youtubeId: 'tShavGuo0_E',
            intro:
              'Control nerves, structure your story, and deliver it in a way that moves people to action — from small team updates to large-stage talks.',
            topics: [
              'Reframing nerves as performance energy',
              'Structuring a presentation: opening hook, core argument, clear CTA',
              'Vocal variety — pace, pitch, and deliberate pausing',
              'Reading the room and adapting on the fly',
            ],
            moments: [
              { time: '0:00', label: 'Turning anxiety into energy' },
              { time: '2:45', label: 'The three-part story structure' },
              { time: '6:30', label: 'Vocal variety and pause technique' },
              { time: '10:00', label: 'Body language and eye contact' },
              { time: '13:40', label: 'Handling questions confidently' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'q8',
            kind: 'quiz',
            title: 'Presenting with Confidence Quiz',
            status: 'Ready',
            forLesson: 'Presenting with Confidence',
            totalQuestions: 6,
            estimatedMinutes: 8,
            description:
              'Test your knowledge of presentation structure, vocal delivery, and managing nerves under pressure.',
            questions: [
              {
                question:
                  'What is the purpose of an opening hook in a presentation?',
                options: [
                  "To introduce the speaker's credentials",
                  'To immediately capture audience attention and establish relevance',
                  'To outline the full agenda',
                  'To display the title slide',
                ],
                correctIndex: 1,
              },
              {
                question: 'How should you reframe presentation nerves?',
                options: [
                  'Suppress them by breathing very slowly',
                  'Accept that nervousness will ruin your delivery',
                  'Channel them as energy that sharpens your focus and presence',
                  'Avoid presentations until you feel confident',
                ],
                correctIndex: 2,
              },
              {
                question: 'What does "vocal variety" mean in public speaking?',
                options: [
                  'Switching languages during the talk',
                  'Using different accents to engage the audience',
                  'Varying pace, pitch, and volume to maintain listener interest',
                  'Avoiding filler words like "um" and "uh"',
                ],
                correctIndex: 2,
              },
              {
                question: 'A deliberate pause in a presentation is used to:',
                options: [
                  'Signal that the speaker has forgotten their lines',
                  'Let the audience read ahead on the slides',
                  'Emphasise an important point and give the audience time to absorb it',
                  'Reduce the overall length of the talk',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'When handling a challenging question from the audience, you should:',
                options: [
                  'Deflect immediately and move to the next point',
                  'Make up a plausible answer to maintain confidence',
                  'Acknowledge the question, take a breath, and respond calmly or defer honestly',
                  'Skip it and say "we\'ll cover that offline"',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'What is the primary purpose of a clear call to action (CTA) at the end of a presentation?',
                options: [
                  'To summarise everything that was said',
                  'To tell the audience what you want them to do next',
                  'To thank the audience for attending',
                  'To show remaining slides that were cut for time',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'a8',
            kind: 'assignment',
            title: '3-Minute Presentation Script',
            status: 'Ready',
            forLesson: 'Presenting with Confidence',
            dueDate: 'Jun 22',
            submission: 'File or link upload',
            instructions:
              'Write a complete script for a 3-minute presentation on a topic of your choice. Apply the three-part structure from the lesson: opening hook, core argument, and call to action.',
            requirements: [
              'Opening hook that captures attention within the first 20 seconds',
              'Core argument supported by at least two concrete examples or data points',
              'A single, specific call to action in the closing',
              'Marked pauses (e.g. [pause]) and vocal emphasis (e.g. [slow down]) throughout',
            ],
          },
        ],
      },
    ],
  },
];
