import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course e7: Advanced Leadership Certification ─────────────────────────────

export const E7_MODULES: ReviewModule[] = [
  {
    id: 'e7_m1',
    title: 'Module 1: Strategic Leadership',
    lessons: [
      {
        id: 'e7_l1',
        title: 'Strategic Planning Fundamentals',
        documents: [],
        videos: [
          {
            id: 'e7_v1',
            kind: 'video',
            title: 'Strategic Planning Fundamentals',
            duration: '20 min',
            intro:
              'Strategic planning turns a vision into a sequenced set of priorities an organization can actually execute. Learn the core planning process.',
            topics: [
              'Vision vs. strategy vs. operational plan',
              'Setting priorities under limited resources',
              'Building a planning timeline with milestones',
              'Common strategic planning failure modes',
            ],
            moments: [
              { time: '0:00', label: 'Vision, strategy, and operations' },
              { time: '5:00', label: 'Setting priorities' },
              { time: '11:00', label: 'Building a timeline' },
              { time: '16:00', label: 'Why plans fail' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e7_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Strategic Planning Quiz',
            forLesson: 'Strategic Planning Fundamentals',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of strategic planning fundamentals.',
            questions: [
              {
                question:
                  'A vision statement differs from a strategic plan in that a vision:',
                options: [
                  'Specifies exact yearly milestones',
                  'Describes a desired future state without detailing how to get there',
                  'Is always shorter than a mission statement',
                  'Replaces the need for any planning',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Setting priorities under limited resources requires:',
                options: [
                  'Attempting every initiative simultaneously',
                  'Deliberately choosing what to focus on and what to defer',
                  'Ignoring resource constraints entirely',
                  'Assigning equal resources to every goal',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A planning timeline with milestones exists primarily to:',
                options: [
                  'Make the plan look impressive with no functional purpose',
                  'Allow progress to be checked and adjusted along the way',
                  'Replace the need for a vision',
                  'Guarantee the plan cannot fail',
                ],
                correctIndex: 1,
              },
              {
                question: 'A common reason strategic plans fail is:',
                options: [
                  'Too much stakeholder alignment',
                  'A gap between the plan and what teams actually prioritize day to day',
                  'Setting too few goals',
                  'Reviewing progress too often',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e7_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Draft a One-Page Strategic Plan',
            forLesson: 'Strategic Planning Fundamentals',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'For an organization or team you know, draft a one-page strategic plan with a vision statement, three prioritized goals, and one milestone per goal.',
            requirements: [
              'Vision statement included and distinct from the goals',
              'Exactly three prioritized goals listed',
              'One measurable milestone defined per goal',
            ],
          },
        ],
      },
      {
        id: 'e7_l2',
        title: 'Conflict Resolution',
        documents: [],
        videos: [
          {
            id: 'e7_v2',
            kind: 'video',
            title: 'Conflict Resolution',
            duration: '19 min',
            intro:
              'Unresolved conflict quietly erodes trust and performance. Learn a structured approach to resolving it before it festers.',
            topics: [
              'Identifying the real issue behind a surface conflict',
              'Interest-based vs. position-based negotiation',
              'Facilitating a difficult conversation between two team members',
              'Knowing when to escalate a conflict',
            ],
            moments: [
              { time: '0:00', label: 'Finding the real issue' },
              { time: '5:30', label: 'Interests vs. positions' },
              { time: '11:00', label: 'Facilitating a hard conversation' },
              { time: '16:00', label: 'When to escalate' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e7_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Conflict Resolution Quiz',
            forLesson: 'Conflict Resolution',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of conflict resolution.',
            questions: [
              {
                question: 'The surface disagreement in a conflict is often:',
                options: [
                  'Identical to the underlying issue',
                  'Different from the deeper interest or need actually driving it',
                  'Irrelevant to resolving the conflict',
                  'Always about resources',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Interest-based negotiation, compared to position-based negotiation, focuses on:',
                options: [
                  'Rigid stated demands',
                  "The underlying needs behind each side's stated position",
                  "Ignoring both sides' needs entirely",
                  'Whoever has more authority winning automatically',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When facilitating a conversation between two conflicting team members, a leader should generally:',
                options: [
                  'Immediately take one side',
                  'Help both parties articulate their underlying interests and find common ground',
                  'Avoid the conversation entirely',
                  'Publicly assign blame',
                ],
                correctIndex: 1,
              },
              {
                question: 'Escalating a conflict is appropriate when:',
                options: [
                  'Every disagreement occurs, no matter how small',
                  'It involves a policy violation or cannot be resolved at the current level',
                  'The leader wants to avoid involvement',
                  'Never — leaders should resolve everything themselves',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e7_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Mediate a Conflict Scenario',
            forLesson: 'Conflict Resolution',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Given a provided two-sided workplace conflict scenario, identify the underlying interest behind each stated position and write a plan for facilitating a resolution conversation.',
            requirements: [
              'Underlying interest identified for each party',
              'A structured conversation plan proposed',
              'A clear criterion for whether the conflict would need escalation',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e7_m2',
    title: 'Module 2: Culture and People',
    lessons: [
      {
        id: 'e7_l3',
        title: 'Shaping Organizational Culture',
        documents: [],
        videos: [
          {
            id: 'e7_v3',
            kind: 'video',
            title: 'Shaping Organizational Culture',
            duration: '18 min',
            intro:
              'Culture is set by what leaders repeatedly reward, tolerate, and model — not by posters on the wall. Learn how to shape it deliberately.',
            topics: [
              'Culture as observed behavior, not stated values',
              'What leaders reward and tolerate shapes culture fastest',
              'Rituals and stories that reinforce culture',
              'Diagnosing a mismatch between stated and actual culture',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Culture is what you do, not what you say',
              },
              { time: '4:30', label: 'Rewarding and tolerating' },
              { time: '9:30', label: 'Rituals and stories' },
              { time: '14:00', label: 'Diagnosing culture mismatches' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e7_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Organizational Culture Quiz',
            forLesson: 'Shaping Organizational Culture',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of shaping organizational culture.',
            questions: [
              {
                question:
                  'Organizational culture is most accurately defined by:',
                options: [
                  'The values printed in the employee handbook',
                  'What behaviors are actually rewarded and tolerated day to day',
                  'The company logo',
                  'Annual revenue figures',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'One of the fastest ways a leader shapes culture is by:',
                options: [
                  'Writing a mission statement once and never revisiting it',
                  'Consistently rewarding or tolerating specific behaviors',
                  'Ignoring behavior entirely',
                  'Hiring a consultant to write new values',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A mismatch between stated and actual culture is revealed when:',
                options: [
                  'Stated values and observed behavior consistently align',
                  'Leaders say one thing but consistently reward or tolerate the opposite',
                  'The company has no stated values',
                  'Employees never discuss culture',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Rituals and shared stories in an organization primarily serve to:',
                options: [
                  'Waste time with no purpose',
                  'Reinforce and transmit the culture to new and existing members',
                  'Replace the need for leadership',
                  'Only matter in large organizations',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e7_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Culture Diagnostic',
            forLesson: 'Shaping Organizational Culture',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'For an organization you know, identify one stated value and one specific observed behavior that either reinforces or contradicts it, and propose one concrete leadership action to close any gap found.',
            requirements: [
              'Stated value and observed behavior both specific and real',
              'Clear judgment on alignment or contradiction',
              'One concrete, actionable leadership response proposed',
            ],
          },
        ],
      },
      {
        id: 'e7_l4',
        title: 'Mentoring the Next Generation of Leaders',
        documents: [],
        videos: [
          {
            id: 'e7_v4',
            kind: 'video',
            title: 'Mentoring the Next Generation of Leaders',
            duration: '17 min',
            intro:
              'Great leaders leave behind other leaders. Learn how to structure mentoring relationships that actually develop people.',
            topics: [
              'The difference between mentoring and managing',
              'Setting a mentoring relationship up for success',
              'Giving feedback that develops rather than just corrects',
              'Knowing when to step back and let a mentee lead',
            ],
            moments: [
              { time: '0:00', label: 'Mentoring vs. managing' },
              { time: '4:00', label: 'Setting up the relationship' },
              { time: '8:30', label: 'Developmental feedback' },
              { time: '12:30', label: 'Knowing when to step back' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e7_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Mentoring Future Leaders Quiz',
            forLesson: 'Mentoring the Next Generation of Leaders',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of mentoring future leaders.',
            questions: [
              {
                question:
                  'Mentoring differs from managing primarily because mentoring:',
                options: [
                  "Focuses on the mentee's long-term growth rather than task performance alone",
                  'Always involves a formal reporting relationship',
                  'Requires no relationship building',
                  'Is identical to coaching in every respect',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'A well-set-up mentoring relationship typically starts with:',
                options: [
                  'No discussion of goals at all',
                  'Clarifying what the mentee hopes to gain and how often they will meet',
                  'Assigning tasks with deadlines',
                  "Immediate criticism of the mentee's weaknesses",
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Developmental feedback, compared to purely corrective feedback, aims to:',
                options: [
                  'Only point out what went wrong',
                  'Help the mentee build lasting judgment and capability, not just fix one instance',
                  'Avoid ever discussing mistakes',
                  'Replace all praise with criticism',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A mentor stepping back to let a mentee lead is important because it:',
                options: [
                  'Signals the mentor no longer cares',
                  "Builds the mentee's confidence and real decision-making experience",
                  'Should never happen',
                  'Only applies to senior mentees',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e7_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Mentoring Plan',
            forLesson: 'Mentoring the Next Generation of Leaders',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design a six-month mentoring plan for a rising leader, including meeting cadence, one developmental goal, and a point at which you would deliberately step back and let them lead.',
            requirements: [
              'Meeting cadence specified',
              'One clear developmental goal defined',
              'A specific point identified for stepping back, with reasoning',
            ],
          },
        ],
      },
    ],
  },
];
