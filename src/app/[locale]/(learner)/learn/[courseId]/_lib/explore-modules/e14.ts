import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course e14: Leadership Development for Educators ─────────────────────────

export const E14_MODULES: ReviewModule[] = [
  {
    id: 'e14_m1',
    title: 'Module 1: Leading Teaching Teams',
    lessons: [
      {
        id: 'e14_l1',
        title: 'Building a Mentoring Framework',
        documents: [],
        videos: [
          {
            id: 'e14_v1',
            kind: 'video',
            title: 'Building a Mentoring Framework',
            duration: '18 min',
            intro:
              'Ad hoc mentoring helps a few teachers; a real framework helps an entire school. Learn how to build one that scales.',
            topics: [
              'Elements of a formal mentoring framework for educators',
              'Matching mentors and mentee teachers thoughtfully',
              'Setting clear expectations and check-in cadence',
              'Evaluating whether a mentoring framework is working',
            ],
            moments: [
              { time: '0:00', label: 'Why ad hoc mentoring is not enough' },
              { time: '4:30', label: 'Thoughtful matching' },
              { time: '9:30', label: 'Expectations and cadence' },
              { time: '14:00', label: 'Evaluating the framework' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e14_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Mentoring Framework Quiz',
            forLesson: 'Building a Mentoring Framework',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of building a teacher mentoring framework.',
            questions: [
              {
                question:
                  'A formal mentoring framework, compared to ad hoc mentoring, primarily offers:',
                options: [
                  'No real benefit over informal support',
                  'Consistency and scale across an entire staff, not just a few individuals',
                  'Less structure',
                  'A replacement for direct classroom support',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Thoughtful mentor-mentee matching for teachers should consider:',
                options: [
                  'Only seniority',
                  'Subject area, teaching context, and compatible working styles',
                  'Random assignment for fairness',
                  "Only the mentor's preference",
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A clear check-in cadence in a mentoring framework helps by:',
                options: [
                  'Making mentoring feel bureaucratic with no benefit',
                  'Ensuring the relationship has consistent, predictable support over time',
                  'Replacing the need for any goals',
                  'Only mattering in the first month',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Evaluating whether a mentoring framework is working should look at:',
                options: [
                  'Only whether meetings occurred',
                  'Whether mentee teachers show real growth and support, not just attendance',
                  'Nothing — mentoring cannot be evaluated',
                  "Only the mentor's satisfaction",
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e14_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a School Mentoring Framework',
            forLesson: 'Building a Mentoring Framework',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Design a mentoring framework outline for new teachers at a school, including matching criteria, check-in cadence, and one way you would evaluate its effectiveness after one year.',
            requirements: [
              'Matching criteria specified',
              'Check-in cadence defined',
              'An evaluation method proposed for after one year',
            ],
          },
        ],
      },
      {
        id: 'e14_l2',
        title: 'Creating a Feedback Culture',
        documents: [],
        videos: [
          {
            id: 'e14_v2',
            kind: 'video',
            title: 'Creating a Feedback Culture',
            duration: '17 min',
            intro:
              'Teaching teams grow fastest where feedback flows constantly and safely, not just during formal evaluations. Learn to build that culture.',
            topics: [
              'Why annual evaluations alone are not enough',
              'Making feedback frequent, specific, and two-way',
              'Building psychological safety for honest feedback',
              'Modeling feedback-receiving as a leader',
            ],
            moments: [
              { time: '0:00', label: 'Beyond the annual evaluation' },
              { time: '4:00', label: 'Frequent, specific, two-way feedback' },
              { time: '8:30', label: 'Building psychological safety' },
              { time: '12:30', label: 'Modeling how to receive feedback' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e14_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Feedback Culture Quiz',
            forLesson: 'Creating a Feedback Culture',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of building a feedback culture among educators.',
            questions: [
              {
                question:
                  'Relying only on an annual evaluation for feedback tends to:',
                options: [
                  'Provide enough ongoing support for growth',
                  'Miss the frequent, timely input that actually drives improvement',
                  'Be the most effective feedback method',
                  'Replace the need for any other feedback',
                ],
                correctIndex: 1,
              },
              {
                question: 'Feedback that is "two-way" means:',
                options: [
                  'Only leaders give feedback to teachers',
                  'Both leaders and teachers give and receive feedback from each other',
                  'Feedback happens twice per year',
                  'Feedback is anonymous only',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Psychological safety in a feedback culture refers to:',
                options: [
                  'A culture where mistakes are hidden out of fear',
                  'An environment where people feel safe giving and receiving honest input without fear of punishment',
                  'Avoiding feedback altogether',
                  'Only positive feedback being allowed',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A leader modeling how to receive feedback well helps by:',
                options: [
                  'Showing that feedback only flows downward',
                  'Demonstrating openness that makes it safer for others to give feedback upward',
                  'Discouraging feedback entirely',
                  'Having no effect on culture',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e14_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Feedback Culture Action Plan',
            forLesson: 'Creating a Feedback Culture',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Propose three specific actions a school leader could take in the next month to build a more frequent, two-way feedback culture among a teaching team.',
            requirements: [
              'Three specific, actionable steps proposed',
              'Each step tied to frequency, specificity, or psychological safety',
              'A brief explanation of how you would know the culture was improving',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e14_m2',
    title: 'Module 2: Long-Term Leadership',
    lessons: [
      {
        id: 'e14_l3',
        title: 'Succession Planning for Schools',
        documents: [],
        videos: [
          {
            id: 'e14_v3',
            kind: 'video',
            title: 'Succession Planning for Schools',
            duration: '19 min',
            intro:
              'Schools that depend entirely on one strong leader are fragile. Learn how to plan for leadership continuity before it becomes urgent.',
            topics: [
              'Why succession planning matters even when no departure is imminent',
              'Identifying and developing potential future leaders early',
              'Documenting institutional knowledge so it does not leave with one person',
              'Handling a leadership transition smoothly',
            ],
            moments: [
              { time: '0:00', label: "Why plan before it's urgent" },
              { time: '5:00', label: 'Identifying future leaders early' },
              { time: '10:30', label: 'Documenting institutional knowledge' },
              { time: '15:30', label: 'Handling a smooth transition' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e14_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Succession Planning Quiz',
            forLesson: 'Succession Planning for Schools',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of succession planning in schools.',
            questions: [
              {
                question:
                  'Succession planning is most valuable when it happens:',
                options: [
                  'Only after a leader has already left',
                  'Well before any departure is imminent',
                  'Never, since it is unnecessary',
                  'Only for the principal role',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A school that depends entirely on one strong leader with no succession plan is:',
                options: [
                  'Well protected against disruption',
                  'Fragile to sudden leadership loss',
                  'Guaranteed continued success',
                  'Unaffected by leadership changes',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Documenting institutional knowledge helps a school by:',
                options: [
                  'Making information harder to access',
                  'Ensuring critical knowledge does not leave when one person departs',
                  'Replacing the need for any leadership',
                  'Only mattering for large districts',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Identifying potential future leaders early allows a school to:',
                options: [
                  'Avoid ever developing new leaders',
                  'Intentionally develop their capacity well before a transition is needed',
                  'Only react after a leader unexpectedly departs',
                  'Skip mentoring entirely',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e14_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Draft a Succession Readiness Plan',
            forLesson: 'Succession Planning for Schools',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'For a leadership role at a school (real or hypothetical), identify one potential successor, one gap in their current readiness, and a development plan to close that gap over the next year.',
            requirements: [
              'A specific role and potential successor identified',
              'One clear readiness gap named',
              'A one-year development plan proposed to close the gap',
            ],
          },
        ],
      },
      {
        id: 'e14_l4',
        title: 'Leading Teaching Teams Through Change',
        documents: [],
        videos: [
          {
            id: 'e14_v4',
            kind: 'video',
            title: 'Leading Teaching Teams Through Change',
            duration: '18 min',
            intro:
              "Change — a new curriculum, a policy shift, a restructuring — tests a teaching team's trust in its leader more than almost anything else. Learn to lead it well.",
            topics: [
              'Why educators often resist top-down change',
              'Communicating the "why" behind a change clearly and early',
              'Involving teachers in shaping how change is implemented',
              'Supporting teachers through the discomfort of transition',
            ],
            moments: [
              { time: '0:00', label: 'Why change meets resistance' },
              { time: '4:30', label: 'Communicating the why' },
              { time: '9:30', label: 'Involving teachers in implementation' },
              { time: '14:00', label: 'Supporting the transition' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e14_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Leading Change Quiz',
            forLesson: 'Leading Teaching Teams Through Change',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of leading teaching teams through change.',
            questions: [
              {
                question: 'Educators often resist top-down change most when:',
                options: [
                  'The reasoning behind it is clearly communicated early',
                  'The "why" is unclear and they were not involved in shaping it',
                  'They were consulted throughout the process',
                  'The change is minor',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Communicating the "why" behind a change should generally happen:',
                options: [
                  'After the change is already fully implemented',
                  'Clearly and as early as possible',
                  'Only if teachers ask directly',
                  'Never, to avoid debate',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Involving teachers in shaping how a change is implemented tends to:',
                options: [
                  'Slow things down with no other benefit',
                  'Increase buy-in and surface practical implementation issues early',
                  'Guarantee unanimous agreement',
                  "Remove the leader's responsibility to decide",
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Supporting teachers through the discomfort of a transition includes:',
                options: [
                  'Dismissing concerns as resistance to progress',
                  'Acknowledging the difficulty while maintaining clear direction',
                  'Avoiding the topic of discomfort entirely',
                  'Only supporting teachers who agree with the change',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e14_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Plan a Change Communication',
            forLesson: 'Leading Teaching Teams Through Change',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'For a school change of your choice (e.g. a new curriculum), draft a communication plan explaining the "why," how teachers will be involved in implementation, and how you will support them through the transition.',
            requirements: [
              'Clear "why" articulated for the change',
              'A specific mechanism for teacher involvement described',
              'At least one concrete support measure for the transition period',
            ],
          },
        ],
      },
    ],
  },
];
