import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course e4: Leadership Development: The Practical Guide ──────────────────

export const E4_MODULES: ReviewModule[] = [
  {
    id: 'e4_m1',
    title: 'Module 1: Core Leadership Skills',
    lessons: [
      {
        id: 'e4_l1',
        title: 'Coaching Conversations',
        documents: [],
        videos: [
          {
            id: 'e4_v1',
            kind: 'video',
            title: 'Coaching Conversations',
            duration: '18 min',
            intro:
              "Coaching turns a manager from a decision-dispenser into someone who grows their team's own judgment. Learn the core coaching conversation structure.",
            topics: [
              'The difference between coaching and directing',
              'Asking questions that build ownership',
              'The GROW model for coaching conversations',
              'Common coaching conversation pitfalls',
            ],
            moments: [
              { time: '0:00', label: 'Coaching vs. directing' },
              { time: '5:00', label: 'Questions that build ownership' },
              { time: '10:30', label: 'The GROW model' },
              { time: '15:00', label: 'Common pitfalls to avoid' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e4_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Coaching Conversations Quiz',
            forLesson: 'Coaching Conversations',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of coaching fundamentals.',
            questions: [
              {
                question:
                  'Coaching differs from directing primarily because it:',
                options: [
                  'Always takes less time',
                  "Builds the other person's own judgment rather than supplying the answer",
                  'Requires no conversation',
                  'Is only used with senior staff',
                ],
                correctIndex: 1,
              },
              {
                question: 'In the GROW model, the "R" stands for:',
                options: [
                  'Rules',
                  'Reality — the current situation',
                  'Reward',
                  'Reporting',
                ],
                correctIndex: 1,
              },
              {
                question: 'A well-designed coaching question tends to be:',
                options: [
                  'Closed and leading toward one answer',
                  'Open-ended, prompting the other person to think it through',
                  'Rhetorical with no real answer expected',
                  'Framed as an order',
                ],
                correctIndex: 1,
              },
              {
                question: 'A common coaching pitfall is:',
                options: [
                  'Asking too many open questions',
                  'Jumping in to give the answer before the person has a chance to think',
                  'Listening without interrupting',
                  'Letting silence sit for a moment',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e4_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Script a Coaching Conversation',
            forLesson: 'Coaching Conversations',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Using the GROW model, script a coaching conversation for a team member who is struggling to meet a deadline, writing out your questions for each stage.',
            requirements: [
              'All four GROW stages represented with specific questions',
              'Questions are open-ended, not leading',
              'A brief note on how you would handle a defensive response',
            ],
          },
        ],
      },
      {
        id: 'e4_l2',
        title: 'Delegation That Works',
        documents: [],
        videos: [
          {
            id: 'e4_v2',
            kind: 'video',
            title: 'Delegation That Works',
            duration: '17 min',
            intro:
              'Poor delegation either dumps tasks with no support or hoards control. Learn to delegate in a way that develops your team.',
            topics: [
              'Matching task ownership to skill and readiness',
              'The difference between delegating tasks and delegating outcomes',
              'Setting clear expectations without micromanaging',
              'Following up without taking work back',
            ],
            moments: [
              { time: '0:00', label: 'Why delegation fails' },
              { time: '4:30', label: 'Matching task to readiness' },
              { time: '9:00', label: 'Tasks vs. outcomes' },
              { time: '13:00', label: 'Following up well' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e4_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Delegation Quiz',
            forLesson: 'Delegation That Works',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of effective delegation.',
            questions: [
              {
                question: 'Effective delegation matches:',
                options: [
                  'Every task to the most senior person available',
                  "The task's demands to the team member's current skill and readiness",
                  'Tasks randomly to whoever is free',
                  'Only unpleasant tasks to junior staff',
                ],
                correctIndex: 1,
              },
              {
                question: 'Delegating an outcome rather than a task means:',
                options: [
                  'Specifying every step in detail',
                  'Defining the result needed and leaving the method to the person doing it',
                  'Doing the work yourself instead',
                  'Avoiding any check-ins',
                ],
                correctIndex: 1,
              },
              {
                question: 'Micromanaging after delegating a task typically:',
                options: [
                  'Builds trust and ownership',
                  'Undermines the ownership the delegation was meant to build',
                  'Has no effect on the team member',
                  'Is always necessary',
                ],
                correctIndex: 1,
              },
              {
                question: 'A good follow-up on a delegated task should:',
                options: [
                  'Take the task back at the first sign of difficulty',
                  'Check progress and offer support without reclaiming ownership',
                  'Never happen once delegated',
                  'Only happen after the deadline has passed',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e4_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Delegation Plan',
            forLesson: 'Delegation That Works',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Pick a task you currently do yourself and write a delegation plan: who you would delegate it to, the outcome you would define, and two check-in points.',
            requirements: [
              'Task and delegate clearly identified',
              'Outcome defined rather than a step-by-step task list',
              'Two specific check-in points described',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e4_m2',
    title: 'Module 2: Growing Into Leadership',
    lessons: [
      {
        id: 'e4_l3',
        title: 'Decision-Making Under Uncertainty',
        documents: [],
        videos: [
          {
            id: 'e4_v3',
            kind: 'video',
            title: 'Decision-Making Under Uncertainty',
            duration: '19 min',
            intro:
              'Leaders rarely get to decide with complete information. Learn a practical framework for deciding well when the picture is incomplete.',
            topics: [
              'Reversible vs. irreversible decisions',
              'Gathering "enough" information without stalling',
              'Involving others without losing decisiveness',
              'Deciding, then reviewing the outcome honestly',
            ],
            moments: [
              { time: '0:00', label: 'Why uncertainty is the normal case' },
              { time: '5:00', label: 'Reversible vs. irreversible decisions' },
              { time: '11:00', label: 'Involving others efficiently' },
              { time: '16:00', label: 'Reviewing decisions honestly' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e4_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Decision-Making Quiz',
            forLesson: 'Decision-Making Under Uncertainty',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of decision-making under uncertainty.',
            questions: [
              {
                question:
                  'A reversible decision, compared to an irreversible one, generally warrants:',
                options: [
                  'The same amount of deliberation regardless',
                  'Faster action, since mistakes can be corrected',
                  'No action at all',
                  'Only committee approval',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Waiting for complete information before deciding is risky because:',
                options: [
                  'Complete information is usually available quickly',
                  'Complete information rarely exists, and delay itself has a cost',
                  'It always leads to a better decision',
                  "It removes the leader's responsibility",
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Involving others in a decision without losing decisiveness means:',
                options: [
                  'Letting every stakeholder veto the outcome',
                  'Seeking relevant input while still owning the final call',
                  'Deciding entirely alone with no input',
                  'Delaying indefinitely until consensus forms',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Reviewing a past decision honestly, even a good one, helps a leader:',
                options: [
                  'Assign blame for any bad outcome',
                  'Improve judgment for future decisions regardless of outcome',
                  'Avoid ever deciding again',
                  'Prove the decision was correct',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e4_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Decide and Defend',
            forLesson: 'Decision-Making Under Uncertainty',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Given a provided scenario with incomplete information, make a decision, classify it as reversible or irreversible, and explain your reasoning and what you would review afterward.',
            requirements: [
              'A clear decision stated',
              'Reversible/irreversible classification justified',
              'A plan for reviewing the outcome after the fact',
            ],
          },
        ],
      },
      {
        id: 'e4_l4',
        title: 'From Individual Contributor to Team Leader',
        documents: [],
        videos: [
          {
            id: 'e4_v4',
            kind: 'video',
            title: 'From Individual Contributor to Team Leader',
            duration: '16 min',
            intro:
              'The jump from doing the work yourself to leading others who do it is one of the hardest transitions in a career. Understand what actually changes.',
            topics: [
              'Why individual excellence does not automatically transfer to leadership',
              'Shifting identity from "doer" to "multiplier"',
              'Letting go of tasks you were good at',
              'Building credibility with a new team',
            ],
            moments: [
              { time: '0:00', label: 'Why the transition is hard' },
              { time: '4:00', label: 'From doer to multiplier' },
              { time: '8:00', label: 'Letting go of familiar work' },
              { time: '12:00', label: 'Building credibility as a new leader' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e4_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Transition to Team Leader Quiz',
            forLesson: 'From Individual Contributor to Team Leader',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of the transition into team leadership.',
            questions: [
              {
                question: 'Being excellent as an individual contributor:',
                options: [
                  'Automatically makes someone a good leader',
                  'Does not automatically transfer to leadership skill',
                  'Is a requirement for all leadership roles',
                  'Guarantees team trust immediately',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Thinking of yourself as a "multiplier" as a new leader means:',
                options: [
                  'Doing all the work yourself, faster',
                  'Measuring success by what your team accomplishes, not just what you personally produce',
                  'Avoiding all delegation',
                  'Working alone to set an example',
                ],
                correctIndex: 1,
              },
              {
                question: 'A common struggle for new leaders is:',
                options: [
                  'Having too much free time',
                  'Letting go of tasks they were personally skilled at and enjoyed',
                  'Never having any tasks to do',
                  'Being unable to communicate at all',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'New leaders typically build credibility with their team by:',
                options: [
                  'Demanding respect based on title alone',
                  'Demonstrating consistency, fairness, and genuine support over time',
                  'Avoiding all difficult conversations',
                  "Taking credit for the team's work",
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e4_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Leadership Transition Reflection',
            forLesson: 'From Individual Contributor to Team Leader',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Write a reflection identifying one task you (or a leader you know) would need to let go of when moving into a team-lead role, and describe two specific actions to build credibility with a new team in the first month.',
            requirements: [
              'One specific task to let go of identified with reasoning',
              'Two concrete credibility-building actions described',
              'Reflection grounded in a real or realistic scenario',
            ],
          },
        ],
      },
    ],
  },
];
