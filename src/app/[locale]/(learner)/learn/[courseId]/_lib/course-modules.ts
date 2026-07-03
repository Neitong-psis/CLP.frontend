// Per-course curriculum content for the learner course player.
// Each enrolled course has unique topic-matched content.
// Item IDs are prefixed (c1_–c12_, e1_–e15_) to ensure global uniqueness.
// Explore-course modules live in explore-modules.ts.

import type { ReviewModule } from '../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 1: Introduction to Leadership ─────────────────────────────────────

export const C1_MODULES: ReviewModule[] = [
  {
    id: 'c1_m1',
    title: 'Module 1: Foundations of Leadership',
    lessons: [
      {
        id: 'c1_l1',
        title: 'What is Leadership?',
        documents: [
          {
            id: 'c1_d1',
            kind: 'document',
            title: 'What is Leadership?',
            readTime: '5 – 7 min read',
            intro:
              'A clear-eyed look at what leadership actually is — and what it is not — drawing on research and real-world practice.',
            objectives: [
              'Define leadership and distinguish it from authority and position',
              'Identify the five core characteristics shared by effective leaders',
            ],
            sections: [
              {
                heading: 'Defining Leadership',
                text: 'Leadership is the ability to influence people to move toward a shared goal. It is not a title or a position. A junior team member who rallies colleagues around a new approach is leading; a vice-president who merely enforces rules is managing. True leadership requires voluntary followership — people move with you because they choose to, not because they must.',
                tip: 'Think of someone who influenced you without having formal authority over you. What did they do differently? That gap is leadership.',
              },
              {
                heading: 'Five Core Traits of Effective Leaders',
                text: "Research consistently identifies five traits: self-awareness (knowing your strengths and blind spots), integrity (doing what you say), empathy (understanding others' perspectives), decisive thinking (making sound decisions under uncertainty), and accountability (owning results — good and bad). No one is born with all five. They are all learnable.",
              },
            ],
            takeaways: [
              'Leadership is influence, not authority — it is earned, not assigned',
              'The five core leadership traits are learnable skills, not fixed personality traits',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c1_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'What is Leadership? Quiz',
            forLesson: 'What is Leadership?',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of what leadership is and how it differs from management.',
            questions: [
              {
                question: 'What is the most accurate definition of leadership?',
                options: [
                  'Holding a senior position',
                  'The ability to influence others toward a shared goal',
                  'Making all major decisions',
                  'Managing resources efficiently',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which best distinguishes leadership from management?',
                options: [
                  'Leaders focus on efficiency; managers on vision',
                  'Leaders require a formal title',
                  'Leaders inspire voluntary followership; managers enforce compliance',
                  'Management is always more important',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which trait involves owning both positive and negative outcomes?',
                options: [
                  'Empathy',
                  'Self-awareness',
                  'Accountability',
                  'Decisiveness',
                ],
                correctIndex: 2,
              },
              {
                question: 'Self-awareness in a leader means:',
                options: [
                  'Always knowing the right answer',
                  'Knowing your strengths, weaknesses, and blind spots',
                  'Being confident in all situations',
                  'Hiding vulnerabilities',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'According to the reading, the five core leadership traits are:',
                options: [
                  'Inborn and cannot be developed',
                  'Only relevant for senior executives',
                  'Learnable skills that develop over time',
                  'Relevant only in crisis situations',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c1_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Leadership Definition Essay',
            forLesson: 'What is Leadership?',
            dueDate: 'Jul 5',
            submission: 'Text response',
            instructions:
              'Write a 300 – 400 word personal definition of leadership, grounded in the lesson but informed by your own experience.',
            requirements: [
              'Define leadership in your own words using at least two concepts from the reading',
              'Include a real or observed example that illustrates your definition',
              'Address how your definition differs from simply holding authority',
            ],
          },
        ],
      },
      {
        id: 'c1_l2',
        title: 'Leadership vs. Management',
        documents: [],
        videos: [
          {
            id: 'c1_v1',
            kind: 'video',
            title: 'Leadership vs. Management',
            duration: '13 min',
            intro:
              'Unpack the critical difference between leading and managing — and why great organisations need both.',
            topics: [
              'The core distinction: vision vs. execution',
              'When to lead and when to manage in practice',
              'Common mistakes when the roles are conflated',
              'Developing your capacity for both simultaneously',
            ],
            moments: [
              { time: '0:00', label: 'Why the distinction matters' },
              { time: '2:40', label: 'Vision vs. execution explained' },
              { time: '6:10', label: 'Real workplace examples' },
              { time: '10:30', label: 'Building both skill sets' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c1_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Leadership vs. Management Quiz',
            forLesson: 'Leadership vs. Management',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Assess your ability to distinguish leadership from management and apply both in context.',
            questions: [
              {
                question: 'Which is primarily a management function?',
                options: [
                  'Setting the long-term vision',
                  'Inspiring a team through uncertainty',
                  'Scheduling resources and tracking milestones',
                  'Identifying a new strategic opportunity',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'A team lead who only tracks tasks and ignores team morale is:',
                options: [
                  'Effectively supplementing leadership',
                  'Over-indexing on management at the expense of leadership',
                  'Practising good situational leadership',
                  'Correct for a start-up environment',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which scenario primarily requires leadership?',
                options: [
                  'Updating the project tracker',
                  'Rallying a demoralised team after a launch failure',
                  'Approving timesheets',
                  'Reporting KPIs to the board',
                ],
                correctIndex: 1,
              },
              {
                question: 'Why do great organisations need both?',
                options: [
                  'Leadership handles day-to-day; management handles vision',
                  'Direction without execution is incomplete; execution without direction is purposeless',
                  'Only senior staff need to lead',
                  'The roles are identical in practice',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which word best captures the primary function of a leader?',
                options: ['Control', 'Inspire', 'Enforce', 'Document'],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c1_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Leader vs. Manager Analysis',
            forLesson: 'Leadership vs. Management',
            dueDate: 'Jul 7',
            submission: 'Text response',
            instructions:
              'Describe a real or hypothetical scenario that required both leadership and management at different stages. Explain which was needed when and why.',
            requirements: [
              'Scenario must clearly involve both roles at different points',
              'Label which actions are leadership and which are management',
              'Explain what would go wrong if one role were absent',
            ],
          },
        ],
      },
      {
        id: 'c1_l3',
        title: 'Building Trust & Credibility',
        documents: [
          {
            id: 'c1_d2',
            kind: 'document',
            title: 'Building Trust & Credibility',
            readTime: '4 – 6 min read',
            intro:
              'Trust is the foundation of every high-performing team. Learn what builds it, what destroys it, and how to repair it.',
            objectives: [
              'Identify behaviours that build and erode trust in a team',
              'Apply a trust-rebuilding approach after a credibility breach',
            ],
            sections: [
              {
                heading: 'What Builds Trust',
                text: "Trust is built through consistent small actions over time: following through on commitments (even minor ones), being transparent when you don't know the answer, and acknowledging others' contributions publicly. People trust leaders who are predictable and honest far more than those who are impressive but erratic.",
                tip: 'Your team notices whether you do what you say. Track your own commitments the same way you track deliverables.',
              },
              {
                heading: 'What Destroys Trust — and How to Repair It',
                text: "Trust erodes through broken promises, blame-shifting, and hidden agendas. When trust breaks, the fastest repair is a direct, specific acknowledgement (\"I said I'd respond by Thursday and I didn't — I'm sorry\"), followed by a concrete behaviour change. Vague apologies without change make things worse.",
              },
            ],
            takeaways: [
              'Trust is built through consistent small actions, not grand gestures',
              'Repairing broken trust requires a specific acknowledgement and a visible behaviour change',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c1_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Building Trust Quiz',
            forLesson: 'Building Trust & Credibility',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of trust-building behaviours and how to rebuild credibility.',
            questions: [
              {
                question: 'Which behaviour most consistently builds trust?',
                options: [
                  'Giving large bonuses after success',
                  'Following through on commitments, including minor ones',
                  'Always projecting confidence',
                  'Avoiding conflict',
                ],
                correctIndex: 1,
              },
              {
                question: 'The most effective way to repair broken trust is:',
                options: [
                  'A general apology and moving forward',
                  'Ignoring the incident and performing well later',
                  'A specific acknowledgement and a visible behaviour change',
                  'Explaining at length why it happened',
                ],
                correctIndex: 2,
              },
              {
                question:
                  "Transparency when you don't know the answer builds trust because:",
                options: [
                  'It signals weakness which humanises the leader',
                  'It demonstrates honesty and predictability',
                  'It delays decision-making, which teams appreciate',
                  'It avoids accountability',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which behaviour most quickly erodes trust?',
                options: [
                  'Making a mistake and owning it',
                  'Consistently shifting blame to others',
                  'Setting ambitious goals',
                  'Providing direct feedback',
                ],
                correctIndex: 1,
              },
              {
                question: 'People trust leaders who are:',
                options: [
                  'Impressive and occasionally unpredictable',
                  'Predictable and honest',
                  'Always decisive and never wrong',
                  'Always in control',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c1_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Trust Audit',
            forLesson: 'Building Trust & Credibility',
            dueDate: 'Jul 9',
            submission: 'Text response',
            instructions:
              'Reflect on a situation where trust was broken in a team. Describe what happened and how it could be repaired using the lesson framework.',
            requirements: [
              'Identify at least two specific trust-eroding behaviours from the incident',
              'Apply the repair framework: specific acknowledgement + behaviour change',
              'Describe one concrete action to prevent a recurrence',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c1_m2',
    title: 'Module 2: Leading People',
    lessons: [
      {
        id: 'c1_l4',
        title: 'Motivation Theories',
        documents: [],
        videos: [
          {
            id: 'c1_v2',
            kind: 'video',
            title: 'Motivation Theories',
            duration: '15 min',
            intro:
              'Explore the key theories of motivation and learn how to apply them to bring out the best in your team.',
            topics: [
              "Maslow's Hierarchy of Needs in a workplace context",
              "Herzberg's Two-Factor Theory: hygiene vs. motivators",
              'Self-Determination Theory: autonomy, competence, relatedness',
              'Practical tools for diagnosing what motivates each team member',
            ],
            moments: [
              { time: '0:00', label: 'Why motivation matters for leaders' },
              { time: '3:00', label: "Maslow's hierarchy applied to work" },
              {
                time: '7:20',
                label: 'Herzberg: what demotivates vs. what drives',
              },
              {
                time: '11:40',
                label: 'SDT and individual motivation diagnosis',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c1_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Motivation Theories Quiz',
            forLesson: 'Motivation Theories',
            totalQuestions: 5,
            estimatedMinutes: 8,
            description:
              'Test your grasp of the major motivation theories and how to apply them in leadership.',
            questions: [
              {
                question:
                  "In Maslow's hierarchy, which need must be satisfied before self-actualisation?",
                options: ['Physiological', 'Esteem', 'Safety', 'Belonging'],
                correctIndex: 1,
              },
              {
                question: 'According to Herzberg, "hygiene factors" are:',
                options: [
                  'The primary motivators that drive performance',
                  "Factors whose absence causes dissatisfaction but whose presence doesn't motivate",
                  'Personal values that drive intrinsic motivation',
                  'External rewards such as bonuses',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Self-Determination Theory identifies three core psychological needs as:',
                options: [
                  'Pay, recognition, and security',
                  'Autonomy, competence, and relatedness',
                  'Status, power, and achievement',
                  'Feedback, clarity, and challenge',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A team member who is highly motivated by learning new skills primarily values:',
                options: [
                  'Relatedness',
                  'Hygiene factors',
                  'Competence',
                  'Esteem',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which approach best helps a leader diagnose what motivates each team member?',
                options: [
                  'Assuming everyone is motivated by money',
                  'Applying the same incentive to all',
                  'Asking individuals directly about what energises their work',
                  'Waiting until performance drops',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c1_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Motivation Diagnosis',
            forLesson: 'Motivation Theories',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Choose two different team members (real or hypothetical). Diagnose what motivates each using one of the theories covered. Describe how you would adapt your leadership approach for each.',
            requirements: [
              'Name and briefly justify the motivation theory used',
              'Describe the motivation profile of each person',
              'Explain one specific leadership action you would take differently for each person',
            ],
          },
        ],
      },
      {
        id: 'c1_l5',
        title: 'Conflict Resolution',
        documents: [
          {
            id: 'c1_d3',
            kind: 'document',
            title: 'Conflict Resolution',
            readTime: '5 – 6 min read',
            intro:
              'Conflict is inevitable in teams. What separates effective leaders is how quickly and fairly they resolve it.',
            objectives: [
              'Recognise the common sources of team conflict and their warning signs',
              'Apply a structured resolution approach to navigate interpersonal conflict',
            ],
            sections: [
              {
                heading: 'Why Conflict Happens',
                text: 'Most workplace conflict has one of three roots: unclear expectations (people have different assumptions about who does what), scarce resources (two people want the same budget, time, or recognition), or personality friction (different working styles or values). Naming the root cause early is the first step toward resolution.',
                tip: 'When mediating conflict, separate the people from the problem. The conflict is between perspectives, not between personalities.',
              },
              {
                heading: 'A Structured Resolution Approach',
                text: 'Effective leaders use a four-step approach: (1) Create a private space for each person to share their perspective without interruption. (2) Identify the underlying interests — what each person actually needs, not just their stated position. (3) Generate options that could address both sets of interests. (4) Agree on a specific, actionable resolution and check back in within a week.',
              },
            ],
            takeaways: [
              'Naming the root cause of conflict (expectations, resources, or personality) guides the resolution strategy',
              'Focus on underlying interests, not stated positions, to find durable solutions',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c1_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Conflict Resolution Quiz',
            forLesson: 'Conflict Resolution',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your knowledge of conflict sources and the structured resolution approach.',
            questions: [
              {
                question:
                  'Which is NOT one of the three common roots of workplace conflict?',
                options: [
                  'Unclear expectations',
                  'Personality friction',
                  'Scarce resources',
                  'High team morale',
                ],
                correctIndex: 3,
              },
              {
                question:
                  'What does "separating the people from the problem" mean?',
                options: [
                  'Assigning blame clearly to one party',
                  'Recognising the conflict is between perspectives, not personalities',
                  'Removing one person from the team',
                  'Handling conflict privately without anyone present',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In the resolution approach, "underlying interests" refers to:',
                options: [
                  'The stated demands of each party',
                  'What each person actually needs, beyond their stated position',
                  "The leader's preferred outcome",
                  'HR policy requirements',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What is the correct order of the four-step resolution approach?',
                options: [
                  'Generate options → identify interests → hear perspectives → agree on resolution',
                  'Hear perspectives → identify interests → generate options → agree on resolution',
                  'Agree on resolution → hear perspectives → identify interests → generate options',
                  'Identify interests → generate options → hear perspectives → agree on resolution',
                ],
                correctIndex: 1,
              },
              {
                question: 'After agreeing on a resolution, the leader should:',
                options: [
                  "Assume it's solved and move on",
                  'Document it in a formal reprimand',
                  'Check back within a week to confirm it holds',
                  'Announce the resolution to the wider team',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c1_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Conflict Resolution Scenario',
            forLesson: 'Conflict Resolution',
            dueDate: 'Jul 14',
            submission: 'Text response',
            instructions:
              'Write a 350 – 450 word walkthrough of how you would resolve a specific team conflict using the four-step approach from the lesson.',
            requirements: [
              'Describe the conflict scenario including its root cause',
              'Apply each of the four steps explicitly in your response',
              'Identify the underlying interests of each party and the agreed resolution',
            ],
          },
        ],
      },
      {
        id: 'c1_l6',
        title: 'Delegating Effectively',
        documents: [],
        videos: [
          {
            id: 'c1_v3',
            kind: 'video',
            title: 'Delegating Effectively',
            duration: '12 min',
            intro:
              'Delegation is one of the hardest leadership skills to master — and one of the most powerful. Learn how to do it well.',
            topics: [
              'Why leaders struggle to delegate and how to overcome reluctance',
              'Matching the right task to the right person',
              'Setting clear expectations without micromanaging',
              'Following up and giving feedback after delegation',
            ],
            moments: [
              { time: '0:00', label: 'The delegation paradox' },
              { time: '2:30', label: 'Task-person matching framework' },
              {
                time: '6:00',
                label: 'Setting expectations without micromanaging',
              },
              { time: '9:40', label: 'Follow-up and feedback loops' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c1_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Delegating Effectively Quiz',
            forLesson: 'Delegating Effectively',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Assess your understanding of effective delegation principles and practices.',
            questions: [
              {
                question: 'Why do many leaders struggle to delegate?',
                options: [
                  'They prefer easy tasks',
                  'They fear losing control or believe they do it better themselves',
                  'Delegation is against company policy',
                  'Their teams are always too busy',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When matching a task to a person for delegation, you should consider:',
                options: [
                  'Who has the most free time regardless of skill',
                  "The person's skill level, development goals, and current capacity",
                  'Always giving tasks to the most senior person available',
                  'Delegating randomly to keep it fair',
                ],
                correctIndex: 1,
              },
              {
                question: 'Clear expectations in delegation include:',
                options: [
                  'Vague direction so the person can be creative',
                  'The desired outcome, deadline, and quality standard',
                  'A step-by-step instruction list for every decision',
                  'Daily check-in meetings',
                ],
                correctIndex: 1,
              },
              {
                question: 'Micromanaging after delegation:',
                options: [
                  'Ensures quality and builds team confidence',
                  'Defeats the purpose of delegation and undermines trust',
                  'Is required for junior team members',
                  'Is best practice in high-stakes projects',
                ],
                correctIndex: 1,
              },
              {
                question: 'Effective follow-up after delegation should:',
                options: [
                  'Happen only when something goes wrong',
                  'Be pre-agreed and tied to milestones, not constant surveillance',
                  'Replace the initial briefing',
                  'Be done by a third party to remain objective',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c1_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Delegation Plan',
            forLesson: 'Delegating Effectively',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Identify a real or realistic task you could delegate. Write a structured delegation plan covering task selection, person selection, expectation-setting, and follow-up.',
            requirements: [
              'Justify why this task is appropriate for delegation',
              'Explain why you chose this specific person (skills, capacity, development)',
              'Define the expected outcome, deadline, and how you will follow up',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c1_m3',
    title: 'Module 3: Growing as a Leader',
    lessons: [
      {
        id: 'c1_l7',
        title: 'Feedback & Coaching',
        documents: [],
        videos: [
          {
            id: 'c1_v4',
            kind: 'video',
            title: 'Feedback & Coaching',
            duration: '14 min',
            intro:
              'Learn how to give feedback that develops people and how to coach for sustained performance improvement.',
            topics: [
              'The difference between feedback and coaching conversations',
              'The SBI feedback model: Situation, Behaviour, Impact',
              'Coaching questions that unlock self-directed improvement',
              'When to give feedback and when to coach instead',
            ],
            moments: [
              { time: '0:00', label: 'Feedback vs. coaching: key differences' },
              { time: '3:10', label: 'The SBI model in practice' },
              { time: '7:30', label: 'Powerful coaching questions' },
              { time: '11:50', label: 'Choosing the right intervention' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c1_q7',
            kind: 'quiz',
            status: 'Ready',
            title: 'Feedback & Coaching Quiz',
            forLesson: 'Feedback & Coaching',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of the SBI model and the difference between feedback and coaching.',
            questions: [
              {
                question: 'In the SBI feedback model, "B" stands for:',
                options: ['Background', 'Behaviour', 'Benefit', 'Budget'],
                correctIndex: 1,
              },
              {
                question: 'A coaching conversation primarily aims to:',
                options: [
                  'Tell the person exactly what to do differently',
                  'Unlock self-directed insight and improvement in the person',
                  'Evaluate past performance formally',
                  'Replace formal feedback entirely',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which is the correct order of SBI?',
                options: [
                  'Behaviour → Situation → Impact',
                  'Impact → Behaviour → Situation',
                  'Situation → Behaviour → Impact',
                  'Situation → Impact → Behaviour',
                ],
                correctIndex: 2,
              },
              {
                question: 'Coaching questions are most effective when they:',
                options: [
                  'Lead the person to the answer you already have in mind',
                  'Are open-ended and invite reflection',
                  'Assign blame for a past mistake',
                  'Are answered with yes or no',
                ],
                correctIndex: 1,
              },
              {
                question: 'When should feedback be used rather than coaching?',
                options: [
                  'When the person needs to discover an insight themselves',
                  'When a specific behaviour needs to change quickly and clearly',
                  'Coaching is always better than direct feedback',
                  'When the person performs well consistently',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c1_a7',
            kind: 'assignment',
            status: 'Ready',
            title: 'Feedback & Coaching Dialogue',
            forLesson: 'Feedback & Coaching',
            dueDate: 'Jul 20',
            submission: 'Text response',
            instructions:
              'Write one SBI feedback exchange and one coaching conversation (each 150 – 200 words) for two different performance situations.',
            requirements: [
              'SBI exchange must include all three components labelled clearly',
              'Coaching conversation must use at least two open-ended questions',
              "Include the team member's response in each exchange",
            ],
          },
        ],
      },
      {
        id: 'c1_l8',
        title: 'Personal Leadership Development Plan',
        documents: [
          {
            id: 'c1_d4',
            kind: 'document',
            title: 'Personal Leadership Development Plan',
            readTime: '5 – 7 min read',
            intro:
              'A guide to building a deliberate, practical plan for your ongoing growth as a leader.',
            objectives: [
              'Identify your current leadership strengths and priority development areas',
              'Design a 90-day personal leadership development plan with measurable milestones',
            ],
            sections: [
              {
                heading: 'Starting with Self-Assessment',
                text: 'Before planning growth, you need an honest baseline. Use the five traits from Module 1 (self-awareness, integrity, empathy, decisive thinking, accountability) as your framework. For each, rate yourself 1–5 and gather one piece of evidence for your rating. The goal is not to be harsh — it is to be honest. High self-awareness is itself a leadership strength.',
                tip: 'Ask a trusted colleague or manager to rate you on the same traits. The gap between self-assessment and external perception is often the most valuable data.',
              },
              {
                heading: 'Designing the 90-Day Plan',
                text: "A useful leadership development plan has three components: a focus area (the one trait you will prioritise this quarter), a concrete practice (what you will actually do differently each week), and a measurable milestone (how you will know you've improved by day 90). Narrow focus beats vague intentions. One trait, one habit, one milestone.",
              },
            ],
            takeaways: [
              'Honest self-assessment paired with external feedback creates the most accurate development baseline',
              'Narrow focus on one trait, one weekly practice, and one 90-day milestone produces real change',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c1_q8',
            kind: 'quiz',
            status: 'Ready',
            title: 'Personal Leadership Development Quiz',
            forLesson: 'Personal Leadership Development Plan',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your ability to design and evaluate a personal leadership development plan.',
            questions: [
              {
                question:
                  'What is the recommended starting point for a leadership development plan?',
                options: [
                  'Setting goals before assessing your current state',
                  'An honest self-assessment against core leadership traits',
                  "Copying a senior leader's approach",
                  'Waiting for annual performance review feedback',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Why seek external feedback during a self-assessment?',
                options: [
                  'To validate that your self-rating is correct',
                  'The gap between self-perception and external perception is valuable development data',
                  'To create a paper trail for HR purposes',
                  'External feedback is always more accurate than self-assessment',
                ],
                correctIndex: 1,
              },
              {
                question: 'A 90-day leadership plan should prioritise:',
                options: [
                  'All five core traits simultaneously',
                  'One trait, one weekly practice, and one measurable milestone',
                  'Only the traits rated 5 out of 5',
                  'Traits that are easiest to improve quickly',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A "measurable milestone" in a development plan means:',
                options: [
                  'A vague aspiration like "become a better listener"',
                  'A specific, observable sign of improvement by a set date',
                  'Completing a leadership course',
                  'Receiving a promotion',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Why is narrow focus recommended over broad development goals?',
                options: [
                  'Narrow focus is easier and requires less effort',
                  'One habit practised consistently produces more change than many habits started but not sustained',
                  'Broad goals distract managers',
                  'Leaders should only work on one skill their entire career',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c1_a8',
            kind: 'assignment',
            status: 'Ready',
            title: 'My 90-Day Leadership Plan',
            forLesson: 'Personal Leadership Development Plan',
            dueDate: 'Jul 23',
            submission: 'File or link upload',
            instructions:
              'Create your personal 90-day leadership development plan using the framework from this lesson.',
            requirements: [
              'Self-assessment scores (1–5) for all five core leadership traits with evidence',
              'One chosen focus trait with justification for why it is the priority',
              'A specific weekly practice and a measurable day-90 milestone',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 2: Critical Thinking & Problem Solving ────────────────────────────

export const C2_MODULES: ReviewModule[] = [
  {
    id: 'c2_m1',
    title: 'Module 1: Foundations of Critical Thinking',
    lessons: [
      {
        id: 'c2_l1',
        title: 'What is Critical Thinking?',
        documents: [
          {
            id: 'c2_d1',
            kind: 'document',
            title: 'What is Critical Thinking?',
            readTime: '4 – 6 min read',
            intro:
              'Critical thinking is the disciplined practice of analysing information objectively to form a reasoned judgement. Here is what it actually involves.',
            objectives: [
              'Define critical thinking and its key components',
              'Distinguish critical thinking from ordinary thinking and gut-feel decision-making',
            ],
            sections: [
              {
                heading: 'What Critical Thinking Is',
                text: 'Critical thinking involves questioning assumptions, evaluating evidence, considering multiple perspectives, and drawing conclusions that are proportionate to what the evidence actually supports. It is not scepticism for its own sake — it is disciplined reasoning. A critical thinker does not just doubt everything; they apply standards of logic and evidence before accepting or rejecting a claim.',
                tip: 'Before accepting any claim, ask: What is the evidence? Is the source reliable? Are there alternative explanations?',
              },
              {
                heading: 'Critical Thinking vs. Instinct',
                text: 'Instinctive thinking is fast, automatic, and often right in familiar situations. Critical thinking is slow, deliberate, and necessary when the situation is novel, complex, or high-stakes. The goal is not to eliminate intuition but to know when to engage slower, more deliberate analysis — especially when the consequences of being wrong are significant.',
              },
            ],
            takeaways: [
              'Critical thinking is disciplined reasoning, not reflexive doubt',
              'Use slower critical analysis when the situation is novel, complex, or high-stakes',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c2_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'What is Critical Thinking? Quiz',
            forLesson: 'What is Critical Thinking?',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Confirm your understanding of what critical thinking is and when to apply it.',
            questions: [
              {
                question: 'Critical thinking is best described as:',
                options: [
                  'Doubting everything you hear',
                  'Disciplined reasoning using evidence and logic to form judgements',
                  'Trusting your instincts over data',
                  'Arguing against the majority view',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which question best reflects critical thinking?',
                options: [
                  '"Everyone agrees, so it must be true."',
                  '"I feel strongly about this, so I\'ll go with it."',
                  '"What is the evidence, and are there alternative explanations?"',
                  '"This is the way we\'ve always done it."',
                ],
                correctIndex: 2,
              },
              {
                question: 'Instinctive thinking is most reliable when:',
                options: [
                  'The situation is novel and high-stakes',
                  'The consequences of error are severe',
                  'The situation is familiar and routine',
                  'You have no time to gather evidence',
                ],
                correctIndex: 2,
              },
              {
                question: 'Critical thinking draws conclusions that are:',
                options: [
                  'Stronger than the evidence warrants',
                  'Proportionate to what the evidence actually supports',
                  'Based primarily on personal values',
                  'Always pessimistic',
                ],
                correctIndex: 1,
              },
              {
                question: 'The goal of critical thinking is to:',
                options: [
                  'Replace intuition entirely',
                  'Know when slower, more deliberate analysis is needed',
                  'Prove other people wrong',
                  'Avoid making any decisions',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Claim Analysis',
            forLesson: 'What is Critical Thinking?',
            dueDate: 'Jul 5',
            submission: 'Text response',
            instructions:
              'Find a claim from a news article, report, or social media post. Apply the three critical-thinking questions from the lesson and write a 250 – 350 word analysis.',
            requirements: [
              'State the original claim clearly and cite its source',
              'Answer all three questions: What is the evidence? Is the source reliable? Are there alternative explanations?',
              'State your reasoned conclusion proportionate to the evidence',
            ],
          },
        ],
      },
      {
        id: 'c2_l2',
        title: 'Cognitive Biases',
        documents: [],
        videos: [
          {
            id: 'c2_v1',
            kind: 'video',
            title: 'Cognitive Biases',
            duration: '16 min',
            intro:
              'Our brains take mental shortcuts that systematically distort our thinking. Learn to spot the most common biases before they distort your decisions.',
            topics: [
              'What cognitive biases are and why they exist',
              'Confirmation bias: seeking information that confirms what we already believe',
              'Anchoring, availability heuristic, and sunk cost fallacy',
              'Practical debiasing strategies for high-stakes decisions',
            ],
            moments: [
              { time: '0:00', label: 'Why biases are features, not bugs' },
              { time: '3:20', label: 'Confirmation bias in the workplace' },
              { time: '8:00', label: 'Anchoring and availability heuristic' },
              { time: '12:30', label: 'Practical debiasing techniques' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c2_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cognitive Biases Quiz',
            forLesson: 'Cognitive Biases',
            totalQuestions: 5,
            estimatedMinutes: 8,
            description:
              'Test your knowledge of common cognitive biases and strategies to counter them.',
            questions: [
              {
                question: 'Confirmation bias occurs when you:',
                options: [
                  'Consider all available evidence equally',
                  'Seek information that confirms your existing belief and discount contradicting evidence',
                  'Make decisions based on the most recent event',
                  'Overestimate the probability of rare events',
                ],
                correctIndex: 1,
              },
              {
                question: 'The sunk cost fallacy involves:',
                options: [
                  'Overvaluing future gains',
                  'Continuing a losing course of action because of past investment',
                  'Estimating based on the first number you hear',
                  'Thinking something is more common because it comes to mind easily',
                ],
                correctIndex: 1,
              },
              {
                question: 'Anchoring bias means initial information:',
                options: [
                  'Is always ignored in favour of later data',
                  'Disproportionately influences subsequent judgements',
                  'Is the most accurate form of data',
                  'Only affects financial decisions',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which strategy best counters confirmation bias?',
                options: [
                  'Making faster decisions',
                  'Deliberately seeking disconfirming evidence',
                  'Trusting your first instinct',
                  'Polling the entire team',
                ],
                correctIndex: 1,
              },
              {
                question: 'Cognitive biases exist because:',
                options: [
                  'People are fundamentally irrational',
                  'Mental shortcuts evolved to enable faster decisions in familiar situations',
                  'Education levels are too low',
                  'Emotions always override reason',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Bias Spotting Journal',
            forLesson: 'Cognitive Biases',
            dueDate: 'Jul 7',
            submission: 'Text response',
            instructions:
              'Over two days, notice and record three instances where you or someone else may have exhibited a cognitive bias. For each, name the bias and describe how it affected thinking or a decision.',
            requirements: [
              'Identify three separate instances with the specific bias named',
              'Describe the context and how the bias manifested',
              'Suggest how debiasing could have improved the thinking in each case',
            ],
          },
        ],
      },
      {
        id: 'c2_l3',
        title: 'Evaluating Arguments',
        documents: [
          {
            id: 'c2_d2',
            kind: 'document',
            title: 'Evaluating Arguments',
            readTime: '5 – 6 min read',
            intro:
              'Not all arguments are equal. Learn how to assess the structure, premises, and evidence behind any claim.',
            objectives: [
              'Identify the structure of a logical argument (premises and conclusion)',
              "Evaluate whether an argument's conclusion follows from its premises",
            ],
            sections: [
              {
                heading: 'Anatomy of an Argument',
                text: 'Every argument has two parts: premises (the supporting reasons) and a conclusion (the claim being made). A valid argument is one where if the premises are true, the conclusion must be true. A sound argument is valid AND the premises are actually true. Many persuasive-sounding arguments are valid but not sound because one or more premises are false or unverified.',
                tip: 'When evaluating an argument, write out the premises explicitly. Hidden premises are where most logical errors hide.',
              },
              {
                heading: 'Common Logical Fallacies',
                text: "Ad hominem attacks the person rather than the argument. Straw man misrepresents the opponent's position. False dilemma presents only two options when more exist. Appeal to authority uses a name rather than evidence. Spotting these fallacies lets you separate the argument's logical structure from the emotional packaging around it.",
              },
            ],
            takeaways: [
              'A sound argument requires both valid logic and true premises',
              'Identifying logical fallacies protects you from being persuaded by emotion or misdirection',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c2_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Evaluating Arguments Quiz',
            forLesson: 'Evaluating Arguments',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Assess your ability to evaluate argument structure and identify logical fallacies.',
            questions: [
              {
                question: 'A "sound" argument is one that is:',
                options: [
                  'Emotionally compelling and well-delivered',
                  'Valid in structure AND has true premises',
                  'Supported by an expert authority',
                  'Difficult to disprove',
                ],
                correctIndex: 1,
              },
              {
                question: 'Ad hominem is a fallacy that:',
                options: [
                  'Presents a false binary choice',
                  'Attacks the person rather than the argument',
                  "Misrepresents the opponent's position",
                  'Relies on popular opinion',
                ],
                correctIndex: 1,
              },
              {
                question: 'A straw man fallacy involves:',
                options: [
                  'Using irrelevant statistics',
                  "Misrepresenting an opponent's argument to make it easier to attack",
                  'Claiming authority without expertise',
                  'Oversimplifying a complex issue into two options',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "If an argument's premises are true and its logic is valid, the argument is:",
                options: ['Fallacious', 'Unsound', 'Sound', 'Speculative'],
                correctIndex: 2,
              },
              {
                question: 'Where do most logical errors in arguments hide?',
                options: [
                  'In the conclusion',
                  'In premises that are unstated or assumed',
                  'In the use of statistics',
                  'In the emotional language used',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Argument Deconstruction',
            forLesson: 'Evaluating Arguments',
            dueDate: 'Jul 9',
            submission: 'Text response',
            instructions:
              'Find a persuasive argument (advertisement, opinion article, or debate transcript). Break it down into premises and conclusion, evaluate its soundness, and identify any fallacies.',
            requirements: [
              "State the argument's premises and conclusion explicitly",
              'Assess whether each premise is true and the logic is valid',
              'Identify at least one fallacy if present, or explain why the argument is sound',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c2_m2',
    title: 'Module 2: Problem-Solving Frameworks',
    lessons: [
      {
        id: 'c2_l4',
        title: 'Structured Problem Solving',
        documents: [],
        videos: [
          {
            id: 'c2_v2',
            kind: 'video',
            title: 'Structured Problem Solving',
            duration: '15 min',
            intro:
              'Move from reacting to problems to solving them systematically with a repeatable framework.',
            topics: [
              'Why unstructured problem solving leads to recurring issues',
              'The five-step problem-solving process: Define → Analyse → Generate → Evaluate → Implement',
              'Root cause analysis: the 5 Whys technique',
              'Avoiding the trap of solving symptoms instead of causes',
            ],
            moments: [
              { time: '0:00', label: 'The cost of reactive problem-solving' },
              { time: '2:50', label: 'Five-step framework overview' },
              { time: '6:20', label: 'Root cause analysis with 5 Whys' },
              { time: '11:00', label: 'Avoiding symptom fixes' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c2_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Structured Problem Solving Quiz',
            forLesson: 'Structured Problem Solving',
            totalQuestions: 5,
            estimatedMinutes: 8,
            description:
              'Test your knowledge of the five-step problem-solving process and root cause analysis.',
            questions: [
              {
                question: 'The first step in structured problem solving is:',
                options: [
                  'Generate solutions',
                  'Analyse causes',
                  'Define the problem clearly',
                  'Implement the best option',
                ],
                correctIndex: 2,
              },
              {
                question: 'The 5 Whys technique is used to:',
                options: [
                  'Generate five alternative solutions',
                  'Identify the root cause of a problem by asking "why" repeatedly',
                  'Evaluate five potential risks',
                  'Decide which team member caused the issue',
                ],
                correctIndex: 1,
              },
              {
                question: 'Solving symptoms rather than root causes leads to:',
                options: [
                  'Faster resolution',
                  'Sustainable improvement',
                  'Recurring problems',
                  'Lower costs',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which step comes after generating options in the five-step process?',
                options: ['Define', 'Analyse', 'Evaluate', 'Implement'],
                correctIndex: 2,
              },
              {
                question: 'A well-defined problem statement should:',
                options: [
                  'Include the preferred solution',
                  'Be vague to allow flexibility',
                  'Describe the gap between current and desired state',
                  'Focus on who caused the problem',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Problem-Solving Walkthrough',
            forLesson: 'Structured Problem Solving',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Apply the five-step framework to a real or realistic problem you face. Walk through each step explicitly.',
            requirements: [
              'Define the problem as a gap between current and desired state',
              'Apply the 5 Whys to identify the root cause',
              'Generate at least three solution options and evaluate each briefly',
            ],
          },
        ],
      },
      {
        id: 'c2_l5',
        title: 'Decision-Making Models',
        documents: [
          {
            id: 'c2_d3',
            kind: 'document',
            title: 'Decision-Making Models',
            readTime: '5 – 7 min read',
            intro:
              'Different decisions require different approaches. Learn three proven models and when to use each.',
            objectives: [
              'Distinguish between rational, intuitive, and bounded rationality decision-making models',
              'Select the appropriate decision-making model based on context and information availability',
            ],
            sections: [
              {
                heading: 'Three Models for Different Contexts',
                text: 'The rational model assumes you have complete information and unlimited time: identify all options, evaluate each against criteria, choose the optimal one. The bounded rationality model (Herbert Simon) recognises that in reality you have limited time and information — so you "satisfice": find an option that is good enough rather than optimal. Intuitive decision-making draws on pattern recognition from experience and is most reliable in familiar situations under time pressure.',
                tip: 'Map your decision against two axes: How much time do you have? How much information is available? The quadrant tells you which model to use.',
              },
              {
                heading: 'Decision Criteria and Trade-Offs',
                text: 'Even with a model, you need decision criteria: what factors matter most (cost, speed, risk, stakeholder impact)? Assign relative weights to each. A decision matrix helps you score each option against weighted criteria and surfaces the most defensible choice — not necessarily the "right" one, but one you can justify systematically.',
              },
            ],
            takeaways: [
              'Match the decision model to the available time and information, not to habit',
              'A decision matrix makes trade-offs visible and the final choice more defensible',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c2_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Decision-Making Models Quiz',
            forLesson: 'Decision-Making Models',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of rational, intuitive, and bounded rationality models.',
            questions: [
              {
                question: '"Satisficing" is associated with:',
                options: [
                  'The rational model',
                  'Bounded rationality',
                  'Intuitive decision-making',
                  'The Pareto principle',
                ],
                correctIndex: 1,
              },
              {
                question: 'Intuitive decision-making is most reliable when:',
                options: [
                  'The situation is novel and unfamiliar',
                  'You have complete information and unlimited time',
                  'The situation is familiar and time is short',
                  'Stakes are extremely high and unique',
                ],
                correctIndex: 2,
              },
              {
                question: 'A decision matrix helps by:',
                options: [
                  'Automating the final decision',
                  'Making trade-offs visible and choices more defensible',
                  'Eliminating the need for criteria',
                  'Guaranteeing the optimal outcome',
                ],
                correctIndex: 1,
              },
              {
                question: 'The rational decision model assumes:',
                options: [
                  'Time is always limited',
                  'You will satisfice, not optimise',
                  'Complete information and unlimited time',
                  'Experience is the primary input',
                ],
                correctIndex: 2,
              },
              {
                question: 'Decision criteria should be:',
                options: [
                  'The same for every type of decision',
                  'Weighted to reflect what matters most in the specific context',
                  'Set after reviewing all options',
                  'Defined by the most senior stakeholder only',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Decision Matrix',
            forLesson: 'Decision-Making Models',
            dueDate: 'Jul 14',
            submission: 'File or link upload',
            instructions:
              'Create a weighted decision matrix for a real or hypothetical decision with at least three options. Submit the matrix and a 150-word explanation of your conclusion.',
            requirements: [
              'Minimum three options and four weighted criteria',
              'Scores and weighted totals calculated correctly',
              'Written explanation of why the highest-scoring option is or is not the final choice',
            ],
          },
        ],
      },
      {
        id: 'c2_l6',
        title: 'Creative Ideation',
        documents: [],
        videos: [
          {
            id: 'c2_v3',
            kind: 'video',
            title: 'Creative Ideation',
            duration: '13 min',
            intro:
              'Creativity is a process, not a personality trait. Learn structured techniques for generating more and better ideas.',
            topics: [
              'Why quantity of ideas precedes quality: divergent thinking',
              'Brainstorming rules that actually work',
              'SCAMPER: Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse',
              'Moving from ideation to selection without killing good ideas early',
            ],
            moments: [
              { time: '0:00', label: 'Creativity is a process' },
              {
                time: '2:40',
                label: 'Divergent thinking and brainstorming rules',
              },
              { time: '6:30', label: 'SCAMPER technique walkthrough' },
              {
                time: '10:20',
                label: 'Idea selection without premature elimination',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c2_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Creative Ideation Quiz',
            forLesson: 'Creative Ideation',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of divergent thinking and ideation techniques.',
            questions: [
              {
                question: 'Divergent thinking means:',
                options: [
                  'Evaluating and narrowing down options quickly',
                  'Generating many ideas without immediate judgement',
                  'Sticking to proven solutions',
                  'Identifying the single best answer',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which brainstorming rule produces the most ideas?',
                options: [
                  'Evaluate each idea immediately',
                  'Allow only realistic, implementable ideas',
                  "Defer judgement and build on others' ideas",
                  'Limit contributions to experts',
                ],
                correctIndex: 2,
              },
              {
                question: 'In SCAMPER, the "R" stands for:',
                options: ['Repeat', 'Refine', 'Remove', 'Reverse'],
                correctIndex: 3,
              },
              {
                question:
                  'Why should idea selection be separate from idea generation?',
                options: [
                  'Selection takes less time when done simultaneously',
                  'Evaluating too early kills unconventional ideas before they can develop',
                  'Creative people prefer combined phases',
                  "Selection criteria don't apply to divergent thinking",
                ],
                correctIndex: 1,
              },
              {
                question: 'SCAMPER is best described as:',
                options: [
                  'A rapid decision-making tool',
                  'A structured trigger for generating creative variations on existing ideas',
                  'A visual mapping technique',
                  'A problem-definition framework',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'SCAMPER Ideation Session',
            forLesson: 'Creative Ideation',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Choose an existing product, service, or process. Apply the SCAMPER technique to generate at least one idea per letter (7 ideas minimum). Then select the two most promising and explain why.',
            requirements: [
              'At least one idea generated for each of the 7 SCAMPER prompts',
              'Ideas should be specific and feasible, not generic',
              'Two selected ideas must include a brief justification for each',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c2_m3',
    title: 'Module 3: Applied Thinking',
    lessons: [
      {
        id: 'c2_l7',
        title: 'Logical Reasoning',
        documents: [
          {
            id: 'c2_d4',
            kind: 'document',
            title: 'Logical Reasoning',
            readTime: '4 – 6 min read',
            intro:
              'Logical reasoning is the bridge between evidence and conclusion. Learn the two main types and when each applies.',
            objectives: [
              'Distinguish between deductive and inductive reasoning',
              'Identify when each reasoning type is appropriate and its limitations',
            ],
            sections: [
              {
                heading: 'Deductive vs. Inductive Reasoning',
                text: 'Deductive reasoning moves from general principles to specific conclusions: if all the premises are true and the logic is valid, the conclusion is guaranteed. Inductive reasoning moves from specific observations to general principles: multiple observations suggest a pattern, but the conclusion is probable rather than certain. Most real-world problem-solving combines both — deduction to test hypotheses, induction to generate them.',
                tip: "If your conclusion must be true given true premises, you're thinking deductively. If it's probably true based on observations, you're thinking inductively.",
              },
              {
                heading: 'Abductive Reasoning — The Third Type',
                text: 'Abductive reasoning selects the simplest and most likely explanation for an incomplete set of observations. Doctors use it constantly: given these symptoms, what is the most plausible diagnosis? It is not guaranteed to be correct, but it is practical and efficient when complete information is unavailable. Always stay open to revising an abductive conclusion as new evidence arrives.',
              },
            ],
            takeaways: [
              'Deductive conclusions are guaranteed if premises are true; inductive conclusions are probable',
              'Abductive reasoning selects the most plausible explanation when information is incomplete',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c2_q7',
            kind: 'quiz',
            status: 'Ready',
            title: 'Logical Reasoning Quiz',
            forLesson: 'Logical Reasoning',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of deductive, inductive, and abductive reasoning.',
            questions: [
              {
                question: 'Deductive reasoning produces a conclusion that is:',
                options: [
                  'Probable based on observations',
                  'Guaranteed if premises are true and logic is valid',
                  'The simplest explanation of available data',
                  'Based on the opinions of experts',
                ],
                correctIndex: 1,
              },
              {
                question: 'Inductive reasoning moves from:',
                options: [
                  'General principles to specific conclusions',
                  'Specific observations to general principles',
                  'Hypotheses to experiments',
                  'Symptoms to diagnoses',
                ],
                correctIndex: 1,
              },
              {
                question: 'Abductive reasoning is best described as:',
                options: [
                  'Logically guaranteed deduction',
                  'Pattern recognition from large datasets',
                  'Selecting the most plausible explanation for incomplete observations',
                  'Using authority to justify conclusions',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which profession most commonly uses abductive reasoning?',
                options: [
                  'Mathematicians proving theorems',
                  'Doctors forming diagnoses from symptoms',
                  'Auditors verifying financial statements',
                  'Engineers following design specifications',
                ],
                correctIndex: 1,
              },
              {
                question: 'An abductive conclusion should be:',
                options: [
                  'Treated as certain once formed',
                  'Open to revision as new evidence arrives',
                  'Always confirmed by deductive reasoning first',
                  'Rejected if it seems too simple',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a7',
            kind: 'assignment',
            status: 'Ready',
            title: 'Reasoning Type Analysis',
            forLesson: 'Logical Reasoning',
            dueDate: 'Jul 20',
            submission: 'Text response',
            instructions:
              'Find one example each of deductive, inductive, and abductive reasoning in a professional or everyday context. Write a 250-word analysis explaining why each qualifies as that type.',
            requirements: [
              'One distinct example per reasoning type (three total)',
              'Each example must identify the premises/observations and the conclusion',
              'Explain what would make the conclusion fail for each type',
            ],
          },
        ],
      },
      {
        id: 'c2_l8',
        title: 'Case Analysis',
        documents: [],
        videos: [
          {
            id: 'c2_v4',
            kind: 'video',
            title: 'Case Analysis',
            duration: '14 min',
            intro:
              'Case analysis is how critical thinkers work through complex, real-world npproblems with incomplete information.',
            topics: [
              'The case analysis process: situation, complication, question, answer',
              'Structuring your analysis before writing or presenting',
              'Using frameworks (SWOT, stakeholder mapping, cost-benefit) selectively',
              'Communicating your analysis clearly to different audiences',
            ],
            moments: [
              { time: '0:00', label: 'Why case analysis matters' },
              {
                time: '2:30',
                label: 'SCQA: situation, complication, question, answer',
              },
              { time: '6:50', label: 'Choosing the right framework' },
              { time: '11:00', label: 'Communicating your analysis' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c2_q8',
            kind: 'quiz',
            status: 'Ready',
            title: 'Case Analysis Quiz',
            forLesson: 'Case Analysis',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your grasp of case analysis structure and framework selection.',
            questions: [
              {
                question: 'In the SCQA structure, "C" stands for:',
                options: ['Context', 'Conclusion', 'Complication', 'Criteria'],
                correctIndex: 2,
              },
              {
                question: 'A "complication" in SCQA is:',
                options: [
                  'A calculation error in the data',
                  'The tension or challenge that makes the situation require a decision',
                  'A weakness in the proposed solution',
                  'A conflict between stakeholders',
                ],
                correctIndex: 1,
              },
              {
                question: 'Analytical frameworks should be:',
                options: [
                  'Applied to every case regardless of context',
                  'Selected selectively based on what the case requires',
                  'Avoided in favour of pure intuition',
                  'Always used in combination',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When communicating a case analysis to a non-expert audience, you should:',
                options: [
                  'Include all technical detail to demonstrate thoroughness',
                  'Use jargon to establish credibility',
                  'Lead with the answer and then support it with key evidence',
                  'Present every option you considered',
                ],
                correctIndex: 2,
              },
              {
                question: 'A SWOT analysis is most useful for:',
                options: [
                  'Calculating the financial return on a decision',
                  "Mapping an organisation's internal and external strategic position",
                  'Ranking stakeholder priorities',
                  'Testing the logical validity of an argument',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a8',
            kind: 'assignment',
            status: 'Ready',
            title: 'Mini Case Analysis',
            forLesson: 'Case Analysis',
            dueDate: 'Jul 23',
            submission: 'File or link upload',
            instructions:
              'Conduct a structured analysis of a real or hypothetical business situation using the SCQA framework. Submit a 400 – 500 word written analysis.',
            requirements: [
              'Explicitly label and complete all four SCQA components',
              'Apply at least one analytical framework (SWOT, stakeholder map, or cost-benefit) to support your answer',
              'State a clear, specific recommendation with one risk and how to mitigate it',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 3: Public Speaking Mastery ────────────────────────────────────────

export const C3_MODULES: ReviewModule[] = [
  {
    id: 'c3_m1',
    title: 'Module 1: Speaking Foundations',
    lessons: [
      {
        id: 'c3_l1',
        title: 'Overcoming Stage Fright',
        documents: [
          {
            id: 'c3_d1',
            kind: 'document',
            title: 'Overcoming Stage Fright',
            readTime: '4 – 6 min read',
            intro:
              'Stage fright is universal — and manageable. Learn what causes it and how to redirect it into performance energy.',
            objectives: [
              'Understand the physiological basis of stage fright',
              'Apply three proven techniques to manage anxiety before and during a talk',
            ],
            sections: [
              {
                heading: 'Why Stage Fright Happens',
                text: 'Stage fright is your fight-or-flight response triggered by perceived threat — in this case, social evaluation. Your body releases adrenaline, raising your heart rate and sharpening your senses. This is not a malfunction; it is preparation. The difference between nervous speakers and confident ones is not the absence of adrenaline — it is what they do with it.',
                tip: 'Reframe "I am nervous" as "I am excited." The physiological state is identical; the label changes how you perform.',
              },
              {
                heading: 'Three Techniques That Work',
                text: 'First: controlled breathing — four counts in, hold four, out four — activates the parasympathetic nervous system and slows the physical symptoms. Second: power posing for two minutes before going on stage reduces cortisol and increases confidence. Third: preparation — the single strongest predictor of reduced anxiety is knowing your material so well that delivery becomes automatic.',
              },
            ],
            takeaways: [
              'Stage fright is adrenaline — redirect it rather than suppress it',
              'Preparation is the most reliable cure for presentation anxiety',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c3_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Overcoming Stage Fright Quiz',
            forLesson: 'Overcoming Stage Fright',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your understanding of stage fright and how to manage it.',
            questions: [
              {
                question: 'Stage fright is caused by:',
                options: [
                  'A character flaw',
                  'The fight-or-flight response triggered by perceived social evaluation',
                  'Lack of intelligence',
                  'Too much preparation',
                ],
                correctIndex: 1,
              },
              {
                question: 'Controlled breathing helps with stage fright by:',
                options: [
                  'Eliminating adrenaline',
                  'Activating the parasympathetic nervous system',
                  'Making you speak faster',
                  'Replacing preparation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Reframing "I am nervous" as "I am excited" works because:',
                options: [
                  'Excitement is easier to feel',
                  'The physiological state is identical — only the label changes',
                  'It suppresses the fear response',
                  'Audiences prefer excited speakers',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The strongest predictor of reduced presentation anxiety is:',
                options: [
                  'Memorising a script word-for-word',
                  'Knowing your material so well that delivery becomes automatic',
                  'Avoiding eye contact with the audience',
                  'Speaking in front of a mirror daily',
                ],
                correctIndex: 1,
              },
              {
                question: 'Power posing before a talk is reported to:',
                options: [
                  'Slow heart rate to zero',
                  'Reduce cortisol and increase confidence',
                  'Replace the need for preparation',
                  'Eliminate all nerves permanently',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Anxiety Audit',
            forLesson: 'Overcoming Stage Fright',
            dueDate: 'Jul 5',
            submission: 'Text response',
            instructions:
              'Describe a past speaking situation where you felt nervous. Identify what triggered it and apply two techniques from this lesson to reframe the experience.',
            requirements: [
              'Identify the specific trigger (evaluation, unfamiliar topic, large audience, etc.)',
              'Explain how you would apply two techniques from the lesson',
              'State one concrete change you will make before your next public talk',
            ],
          },
        ],
      },
      {
        id: 'c3_l2',
        title: 'Structuring Your Talk',
        documents: [],
        videos: [
          {
            id: 'c3_v1',
            kind: 'video',
            title: 'Structuring Your Talk',
            duration: '14 min',
            intro:
              'A clear structure is what separates a talk people remember from one they forget.',
            topics: [
              'The three-part structure: opening hook, core argument, call to action',
              'The rule of three: why three points are easier to remember than four',
              'Signposting — verbal cues that help audiences follow along',
              'How to craft a strong opening and a memorable close',
            ],
            moments: [
              { time: '0:00', label: 'Why structure determines recall' },
              { time: '3:00', label: 'Opening hook techniques' },
              { time: '7:30', label: 'The rule of three' },
              { time: '11:40', label: 'Signposting and strong closes' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c3_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Structuring Your Talk Quiz',
            forLesson: 'Structuring Your Talk',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description: 'Test your knowledge of effective talk structure.',
            questions: [
              {
                question: 'The three-part talk structure consists of:',
                options: [
                  'Introduction, examples, conclusion',
                  'Opening hook, core argument, call to action',
                  'Problem, solution, evidence',
                  'Greeting, content, goodbye',
                ],
                correctIndex: 1,
              },
              {
                question: 'Why does the rule of three work for audiences?',
                options: [
                  'Three points fill a 10-minute slot',
                  'Human working memory handles three chunks well',
                  'Audiences expect exactly three points',
                  'Three is always the correct number of ideas',
                ],
                correctIndex: 1,
              },
              {
                question: 'Signposting in a talk means:',
                options: [
                  'Using presentation slides',
                  'Verbal cues that tell the audience where you are in the structure',
                  'Pointing at visual aids frequently',
                  'Repeating your opening hook',
                ],
                correctIndex: 1,
              },
              {
                question: 'A strong opening hook should:',
                options: [
                  'Thank the audience for attending',
                  'Review the agenda in detail',
                  'Capture attention immediately and establish relevance',
                  'Introduce all three points upfront',
                ],
                correctIndex: 2,
              },
              {
                question: 'A strong close should:',
                options: [
                  'Summarise every point made',
                  'End with "any questions?"',
                  'Restate the opening hook and deliver a clear call to action',
                  'Trail off naturally to signal the end',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Talk Outline',
            forLesson: 'Structuring Your Talk',
            dueDate: 'Jul 7',
            submission: 'File or link upload',
            instructions:
              'Create a structured outline for a 5-minute talk on a topic of your choice. Include the opening hook, three core points with supporting evidence, and a call to action.',
            requirements: [
              'Opening hook written in full (not just described)',
              'Three main points each supported by one piece of evidence',
              'Call to action that is specific and actionable',
            ],
          },
        ],
      },
      {
        id: 'c3_l3',
        title: 'Voice & Delivery',
        documents: [],
        videos: [
          {
            id: 'c3_v2',
            kind: 'video',
            title: 'Voice & Delivery',
            duration: '12 min',
            intro:
              'Your voice is your primary instrument as a speaker. Learn to use pace, pitch, and pause deliberately.',
            topics: [
              'Vocal variety: pace, pitch, and volume',
              'The power of the deliberate pause',
              'Eliminating filler words (um, uh, like, so)',
              'Eye contact and physical presence on stage',
            ],
            moments: [
              { time: '0:00', label: 'Your voice as an instrument' },
              { time: '2:30', label: 'Pace, pitch, and volume in practice' },
              { time: '6:00', label: 'Using pauses deliberately' },
              { time: '9:30', label: 'Eye contact and stage presence' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c3_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Voice & Delivery Quiz',
            forLesson: 'Voice & Delivery',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your understanding of vocal delivery techniques.',
            questions: [
              {
                question: 'Vocal variety refers to:',
                options: [
                  'Using different accents',
                  'Varying pace, pitch, and volume to sustain audience interest',
                  'Switching languages for effect',
                  'Speaking at a consistent rate',
                ],
                correctIndex: 1,
              },
              {
                question: 'A deliberate pause in a speech is used to:',
                options: [
                  'Fill silence while remembering the next point',
                  'Emphasise a point and give the audience time to absorb it',
                  'Indicate the talk is nearly over',
                  'Signal a topic change to a new slide',
                ],
                correctIndex: 1,
              },
              {
                question: 'Filler words (um, uh, like) are best eliminated by:',
                options: [
                  'Speaking faster so they go unnoticed',
                  'Replacing them with deliberate pauses',
                  'Writing out every word in full and memorising it',
                  'Only speaking on familiar topics',
                ],
                correctIndex: 1,
              },
              {
                question: 'Effective eye contact in a talk means:',
                options: [
                  'Staring at one friendly audience member throughout',
                  'Looking briefly at individuals across different parts of the room',
                  "Looking slightly above the audience's heads",
                  'Focusing on slides rather than people',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Speaking too fast in a presentation signals to the audience:',
                options: [
                  'Confidence and expertise',
                  'Anxiety or insufficient preparation time',
                  'Enthusiasm for the topic',
                  'That you respect their time',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Recorded Delivery Practice',
            forLesson: 'Voice & Delivery',
            dueDate: 'Jul 9',
            submission: 'File or link upload',
            instructions:
              'Record a 2-minute section of a talk on any topic. Submit the recording or a written self-assessment identifying three delivery strengths and two areas to improve.',
            requirements: [
              'Assess your pace, pitch, and use of pauses specifically',
              'Count filler words used and set a target for your next attempt',
              'Describe one physical delivery change (eye contact, posture, gesture) you will practise',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c3_m2',
    title: 'Module 2: Advanced Techniques',
    lessons: [
      {
        id: 'c3_l4',
        title: 'Storytelling for Speakers',
        documents: [
          {
            id: 'c3_d2',
            kind: 'document',
            title: 'Storytelling for Speakers',
            readTime: '4 – 5 min read',
            intro:
              'Stories activate more of the brain than statistics. Learn how to use narrative to make your message stick.',
            objectives: [
              "Identify the five elements of a compelling speaker's story",
              'Apply story structure to turn a data point into a memorable narrative',
            ],
            sections: [
              {
                heading: 'Why Stories Work',
                text: 'When you hear a statistic, only the language processing areas of your brain activate. When you hear a story, the sensory and motor cortex also light up — you literally experience the narrative. This is why audiences remember "a nurse who saved a child" long after they forget "healthcare worker retention statistics." Stories create memory through experience.',
                tip: 'For every key data point in your talk, ask: is there a human story that makes this number real?',
              },
              {
                heading: 'The Five Elements',
                text: "A memorable speaker's story needs: a relatable protagonist (not necessarily yourself), a specific situation or moment (not a vague generalisation), a conflict or tension (what was at stake), a turning point (what changed), and a clear takeaway tied to your argument. Missing any one of these makes the story feel incomplete.",
              },
            ],
            takeaways: [
              'Stories engage more brain regions than facts — they create memory through experience',
              "Every speaker's story needs: protagonist, situation, conflict, turning point, takeaway",
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c3_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Storytelling Quiz',
            forLesson: 'Storytelling for Speakers',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your understanding of storytelling techniques for public speaking.',
            questions: [
              {
                question: 'Why do stories improve message retention?',
                options: [
                  'They are shorter than data',
                  'They activate more brain regions including sensory and motor cortex',
                  'Audiences prefer entertainment to information',
                  'Stories are less challenging to prepare',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Which element creates the emotional engagement in a speaker's story?",
                options: [
                  "The protagonist's name",
                  'The conflict or tension — what was at stake',
                  'The number of people involved',
                  "The speaker's personal opinion",
                ],
                correctIndex: 1,
              },
              {
                question: 'The "turning point" in a story refers to:',
                options: [
                  'When the speaker changes topic',
                  'The moment something changes for the protagonist',
                  'The call to action at the end',
                  'The introduction of a second character',
                ],
                correctIndex: 1,
              },
              {
                question: 'A story in a talk must end with:',
                options: [
                  'Applause from the audience',
                  'A clear takeaway tied to your core argument',
                  'A question for the audience',
                  'A description of what happened next',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'To make a statistic memorable in a talk, you should:',
                options: [
                  'Display it in a large font on a slide',
                  'Repeat it three times',
                  'Pair it with a human story that illustrates the number',
                  'Use a more impressive-sounding statistic',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Story Design',
            forLesson: 'Storytelling for Speakers',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design a 90-second story you could use in a professional talk. Apply all five elements from the lesson and show how the story connects to a specific argument.',
            requirements: [
              'All five story elements labelled explicitly',
              'Story length: 200 – 250 words written out in full',
              'One sentence explaining which argument the story supports',
            ],
          },
        ],
      },
      {
        id: 'c3_l5',
        title: 'Slides & Visual Aids',
        documents: [],
        videos: [
          {
            id: 'c3_v3',
            kind: 'video',
            title: 'Slides & Visual Aids',
            duration: '11 min',
            intro:
              'Most slides hurt more than they help. Learn to design visuals that support your message instead of replacing it.',
            topics: [
              'The "slide as aid" principle: you are the presentation, not the slides',
              'One idea per slide: why density kills comprehension',
              'When to use text, visuals, and data charts',
              'The slide design principles that always work',
            ],
            moments: [
              { time: '0:00', label: 'Why most slides are harmful' },
              { time: '2:20', label: 'One idea per slide' },
              { time: '5:40', label: 'Choosing text vs. visuals' },
              { time: '8:30', label: 'Design principles that always work' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c3_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Slides & Visual Aids Quiz',
            forLesson: 'Slides & Visual Aids',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your understanding of effective slide design principles.',
            questions: [
              {
                question: 'The "slide as aid" principle means:',
                options: [
                  'Slides should contain all your talk content',
                  'You are the presentation — slides support, not replace, your message',
                  'Visual aids are optional for short talks',
                  'Slides should always use bullet points',
                ],
                correctIndex: 1,
              },
              {
                question: 'Why does density on slides kill comprehension?',
                options: [
                  'Audiences read slower than speakers talk',
                  'Audiences cannot split attention between reading and listening effectively',
                  'Dense slides indicate poor preparation',
                  'Fonts become too small on large screens',
                ],
                correctIndex: 1,
              },
              {
                question: 'The one-idea-per-slide principle means:',
                options: [
                  'You need more slides than usual',
                  'Each slide communicates a single clear point',
                  'Slides should have one word each',
                  'Topics should never span more than one slide',
                ],
                correctIndex: 1,
              },
              {
                question: 'When is a data chart most appropriate on a slide?',
                options: [
                  'When you want to impress with complex data',
                  "When a visual comparison makes the data's meaning faster to grasp",
                  'As a substitute for explaining the data verbally',
                  'When you have no other content for that slide',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which slide design principle always improves clarity?',
                options: [
                  'Use at least three different font styles per slide',
                  'Maximise the amount of content to show thoroughness',
                  'High contrast between text and background',
                  'Include your logo and date on every slide',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Slide Redesign',
            forLesson: 'Slides & Visual Aids',
            dueDate: 'Jul 14',
            submission: 'File or link upload',
            instructions:
              'Take any existing slide deck (your own or a public one) and redesign three slides applying the principles from this lesson. Submit before/after screenshots with a written explanation of each change.',
            requirements: [
              'Three before/after slide pairs submitted',
              'Each change explained using a principle from the lesson',
              'At least one slide changed from text-heavy to visual-first',
            ],
          },
        ],
      },
      {
        id: 'c3_l6',
        title: 'Audience Engagement',
        documents: [
          {
            id: 'c3_d3',
            kind: 'document',
            title: 'Audience Engagement',
            readTime: '4 – 5 min read',
            intro:
              'An engaged audience listens more deeply and retains more. Learn proven techniques for keeping them active throughout your talk.',
            objectives: [
              'Apply at least three audience engagement techniques appropriate to different talk formats',
              'Handle unexpected audience reactions calmly and professionally',
            ],
            sections: [
              {
                heading: 'Engagement Techniques',
                text: 'Rhetorical questions force mental participation: "How many of you have sat through a 90-minute presentation and retained almost nothing?" You don\'t need a raised hand — the audience answers internally. Polling (show-of-hands or digital) creates investment. Strategic pauses after key points give the audience time to make their own connections. References to the specific audience (their industry, their city, their role) signal that this talk was prepared for them.',
                tip: 'Use audience engagement early — the first two minutes determine whether people are with you for the whole talk.',
              },
              {
                heading: 'Handling Unexpected Reactions',
                text: 'A hostile question, a technical failure, or audience laughter at the wrong moment — these happen. The key is not to panic or apologise excessively. Pause, breathe, and respond calmly. For hostile questions: acknowledge the perspective ("That\'s a fair challenge"), answer directly without defensiveness, and move on. Never argue with an audience member. Offer to continue the discussion offline if needed.',
              },
            ],
            takeaways: [
              'Engagement techniques (rhetorical questions, polling, pauses, audience references) activate active listening',
              'Respond to unexpected reactions calmly: pause, acknowledge, answer, move on',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c3_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Audience Engagement Quiz',
            forLesson: 'Audience Engagement',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your knowledge of audience engagement and handling unexpected reactions.',
            questions: [
              {
                question: 'A rhetorical question engages the audience by:',
                options: [
                  'Giving the speaker time to think',
                  'Forcing mental participation — the audience answers internally',
                  'Inviting hands to be raised',
                  'Signalling a section transition',
                ],
                correctIndex: 1,
              },
              {
                question: 'Audience engagement should begin:',
                options: [
                  'After you have established credibility — usually 10 minutes in',
                  'Only during a Q&A at the end',
                  'Early — within the first two minutes',
                  'In the final summarising section',
                ],
                correctIndex: 2,
              },
              {
                question: 'When handling a hostile question, you should NOT:',
                options: [
                  "Acknowledge the questioner's perspective",
                  'Argue with the audience member directly',
                  'Answer directly and move on',
                  'Offer to discuss further offline',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Referencing the specific audience (their industry, city, or role) works because:',
                options: [
                  'It shows you researched them',
                  'It signals the talk was specifically prepared for them, increasing relevance',
                  'It distracts from weaker content',
                  'It meets a presentation requirement',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When technology fails during your talk, the best response is to:',
                options: [
                  'Apologise repeatedly and wait for IT',
                  'Panic and ask the audience what to do',
                  'Pause calmly, acknowledge the issue briefly, and continue without the technology',
                  'End the talk early',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Engagement Plan',
            forLesson: 'Audience Engagement',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Take the talk outline you created in Lesson 2. Add at least three specific engagement moments and write a 100-word plan for handling one likely unexpected reaction.',
            requirements: [
              'Three engagement techniques identified with exact placement in the talk',
              'Each technique matched to the appropriate type (rhetorical question, poll, pause, reference)',
              'Unexpected-reaction plan covers: acknowledgement, response, and how you move on',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c3_m3',
    title: 'Module 3: Real-World Speaking',
    lessons: [
      {
        id: 'c3_l7',
        title: 'Impromptu Speaking',
        documents: [],
        videos: [
          {
            id: 'c3_v4',
            kind: 'video',
            title: 'Impromptu Speaking',
            duration: '13 min',
            intro:
              "The most valuable speaking skill is the one you can't prepare for. Learn frameworks for thinking on your feet.",
            topics: [
              'Why impromptu speaking feels so hard and how to reframe it',
              'PREP: Point, Reason, Example, Point — for instant structure',
              'STAR: Situation, Task, Action, Result — for story-based answers',
              'Buying yourself thinking time without seeming unprepared',
            ],
            moments: [
              { time: '0:00', label: 'Why impromptu feels different' },
              { time: '2:30', label: 'The PREP framework' },
              { time: '6:10', label: 'STAR for behavioural questions' },
              { time: '10:00', label: 'Buying thinking time gracefully' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c3_q7',
            kind: 'quiz',
            status: 'Ready',
            title: 'Impromptu Speaking Quiz',
            forLesson: 'Impromptu Speaking',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your knowledge of impromptu speaking frameworks.',
            questions: [
              {
                question: 'In the PREP framework, the second "P" stands for:',
                options: ['Pause', 'Perspective', 'Point (restated)', 'Proof'],
                correctIndex: 2,
              },
              {
                question: 'STAR is most useful for:',
                options: [
                  'Structuring a keynote',
                  'Answering behavioural or situational questions with a story',
                  'Designing presentation slides',
                  'Responding to hostile audiences',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A good way to buy thinking time without appearing unprepared is to:',
                options: [
                  'Say "I don\'t know" and move on',
                  'Repeat the question and take a brief pause',
                  'Look at your notes for 30 seconds',
                  'Ask the audience what they think',
                ],
                correctIndex: 1,
              },
              {
                question: 'PREP stands for:',
                options: [
                  'Point, Reason, Example, Point',
                  'Prepare, Rehearse, Execute, Polish',
                  'Present, Review, Engage, Pause',
                  'Premise, Result, Evidence, Plan',
                ],
                correctIndex: 0,
              },
              {
                question: 'In STAR, "A" represents:',
                options: ['Audience', 'Approach', 'Action', 'Answer'],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a7',
            kind: 'assignment',
            status: 'Ready',
            title: 'PREP Response Practice',
            forLesson: 'Impromptu Speaking',
            dueDate: 'Jul 20',
            submission: 'Text response',
            instructions:
              'Write a 90-second PREP response to the prompt: "What is the most important skill for leaders today and why?" Label each element.',
            requirements: [
              'All four PREP elements labelled in your response',
              'Response length: 180 – 230 words',
              'Example in the "E" section must be concrete and specific, not hypothetical',
            ],
          },
        ],
      },
      {
        id: 'c3_l8',
        title: 'Professional Presentations',
        documents: [
          {
            id: 'c3_d4',
            kind: 'document',
            title: 'Professional Presentations',
            readTime: '5 – 6 min read',
            intro:
              'Boardroom, pitch deck, town hall, workshop — each professional format has different expectations. Here is how to navigate them.',
            objectives: [
              'Distinguish the requirements of four professional presentation formats',
              'Adapt your preparation and delivery style to the context and audience',
            ],
            sections: [
              {
                heading: 'Four Formats, Four Mindsets',
                text: 'The boardroom update: be brief, data-driven, and decision-oriented. Know what question you want answered before you begin. The investor pitch: tell a compelling story about the problem, your solution, traction, and ask. The town hall: project confidence and openness; people are looking for leadership signals as much as content. The workshop: energy and participation matter more than polish. Plan for interaction every 8 – 10 minutes.',
                tip: 'Before any professional presentation, ask: what is the one decision or action I want from this audience? Let the answer shape everything.',
              },
              {
                heading: 'Reading the Room Quickly',
                text: "Arrive early and talk to two or three people before you start. This gives you live intelligence about the audience's concerns, level of familiarity with the topic, and current mood. You can then adapt your opening: reference what you heard, adjust the level of technical detail, or shift the emphasis of your first three minutes.",
              },
            ],
            takeaways: [
              'Match your mindset and style to the specific professional format — boardroom, pitch, town hall, or workshop',
              'Arrive early and talk to attendees to gather live intelligence before you begin',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c3_q8',
            kind: 'quiz',
            status: 'Ready',
            title: 'Professional Presentations Quiz',
            forLesson: 'Professional Presentations',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your ability to match presentation style to professional context.',
            questions: [
              {
                question: 'A boardroom update should prioritise:',
                options: [
                  'Entertainment and storytelling',
                  'Brevity, data, and decision-orientation',
                  'Long context-setting to ensure everyone is aligned',
                  'Extensive Q&A time',
                ],
                correctIndex: 1,
              },
              {
                question: 'In a workshop format, what matters most?',
                options: [
                  'Polished slides and formal delivery',
                  'Energy and participation every 8 – 10 minutes',
                  'Covering all content without interruption',
                  'Speaking for at least 60 minutes',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The question to ask before any professional presentation is:',
                options: [
                  '"How long should this be?"',
                  '"What do I want to tell them?"',
                  '"What is the one decision or action I want from this audience?"',
                  '"Who in the room agrees with me already?"',
                ],
                correctIndex: 2,
              },
              {
                question: 'Arriving early before a presentation allows you to:',
                options: [
                  'Set up your slides',
                  'Gather live intelligence about audience concerns and mood',
                  'Rehearse your opening in the room',
                  'Establish authority by being first',
                ],
                correctIndex: 1,
              },
              {
                question: 'An investor pitch should primarily communicate:',
                options: [
                  "The speaker's professional credentials",
                  'A compelling story about the problem, solution, traction, and ask',
                  'Technical specifications in full detail',
                  'Historical context for the industry',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a8',
            kind: 'assignment',
            status: 'Ready',
            title: 'Format Adaptation Plan',
            forLesson: 'Professional Presentations',
            dueDate: 'Jul 23',
            submission: 'Text response',
            instructions:
              'Take one presentation topic and write a 300-word plan for delivering it in two different professional formats. Explain what changes and why.',
            requirements: [
              'Same topic adapted for two distinct formats from the lesson',
              'Changes to structure, tone, and content clearly explained for each',
              'The "one decision or action" named for each format',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 4: Australian Curriculum: STEM Foundation ────────────────────────

export const C4_MODULES: ReviewModule[] = [
  {
    id: 'c4_m1',
    title: 'Module 1: The Scientific Method',
    lessons: [
      {
        id: 'c4_l1',
        title: 'How Science Works',
        documents: [
          {
            id: 'c4_d1',
            kind: 'document',
            title: 'How Science Works',
            readTime: '5 – 7 min read',
            intro:
              'Science is a method for building reliable knowledge — not a collection of facts. Understanding the process is as important as the content.',
            objectives: [
              'Explain the steps of the scientific method and why each matters',
              'Distinguish between a hypothesis and a theory in scientific usage',
            ],
            sections: [
              {
                heading: 'The Scientific Method',
                text: 'The scientific method is a cycle: observe a phenomenon, ask a question, form a hypothesis (a testable prediction), design an experiment, collect data, analyse results, and draw a conclusion. If the conclusion contradicts the hypothesis, the hypothesis is revised — not the data. This cycle never fully ends; even well-supported theories are open to revision when new evidence emerges.',
                tip: 'A hypothesis is not a guess. It is a specific, testable prediction based on prior knowledge.',
              },
              {
                heading: 'Hypothesis vs. Theory',
                text: 'In everyday language, "theory" means a guess. In science, a theory is an explanation supported by a large body of evidence, tested repeatedly, and accepted by the scientific community. Evolution, gravity, and germ theory are theories — not guesses. A hypothesis is a specific prediction to be tested; a theory is what a confirmed body of evidence eventually supports.',
              },
            ],
            takeaways: [
              'The scientific method is a self-correcting cycle — conclusions are always open to revision by new evidence',
              'A scientific theory is well-supported by evidence, not merely a guess',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c4_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'How Science Works Quiz',
            forLesson: 'How Science Works',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of the scientific method and key scientific concepts.',
            questions: [
              {
                question: 'What is a hypothesis in science?',
                options: [
                  'A proven fact',
                  'A specific, testable prediction based on prior knowledge',
                  'A widely accepted explanation supported by extensive evidence',
                  'An opinion about an observation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What happens in science when data contradicts a hypothesis?',
                options: [
                  'The data is discarded',
                  'The hypothesis is revised',
                  'The experiment is repeated until it confirms the hypothesis',
                  'The theory is accepted as final',
                ],
                correctIndex: 1,
              },
              {
                question: 'A scientific theory is best described as:',
                options: [
                  'A guess awaiting confirmation',
                  'An unproven idea in early stages',
                  'An explanation well-supported by a large body of tested evidence',
                  'A hypothesis that has been confirmed once',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which step comes immediately after forming a hypothesis?',
                options: [
                  'Drawing a conclusion',
                  'Collecting data',
                  'Designing an experiment',
                  'Publishing results',
                ],
                correctIndex: 2,
              },
              {
                question: 'What makes the scientific method reliable?',
                options: [
                  'Scientists always agree with each other',
                  'It is self-correcting — conclusions are open to revision when new evidence emerges',
                  'Experiments are always repeatable under any conditions',
                  'Only qualified scientists can use it',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Scientific Method Mapping',
            forLesson: 'How Science Works',
            dueDate: 'Jul 5',
            submission: 'Text response',
            instructions:
              'Choose a real scientific discovery (e.g. penicillin, vaccination, plate tectonics). Map the discovery onto the steps of the scientific method and explain how each step applied.',
            requirements: [
              'All steps of the scientific method identified with the discovery mapped to each',
              'Explain what the original hypothesis was and how evidence confirmed or revised it',
              'Identify whether the outcome is now considered a hypothesis or a theory, and why',
            ],
          },
        ],
      },
      {
        id: 'c4_l2',
        title: 'Data & Measurement',
        documents: [],
        videos: [
          {
            id: 'c4_v1',
            kind: 'video',
            title: 'Data & Measurement',
            duration: '14 min',
            intro:
              'Reliable science depends on reliable measurement. Learn how to collect, classify, and evaluate data quality.',
            topics: [
              'Quantitative vs. qualitative data — and when each is appropriate',
              'Accuracy, precision, and why they are different',
              'Variables: independent, dependent, and controlled',
              'Sources of measurement error and how to minimise them',
            ],
            moments: [
              { time: '0:00', label: 'Why measurement matters in science' },
              { time: '2:50', label: 'Quantitative vs. qualitative data' },
              { time: '6:20', label: 'Accuracy vs. precision explained' },
              { time: '10:40', label: 'Controlling variables' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c4_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Data & Measurement Quiz',
            forLesson: 'Data & Measurement',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your knowledge of data types, measurement quality, and experimental variables.',
            questions: [
              {
                question: 'Which of the following is quantitative data?',
                options: [
                  'The colour of a solution',
                  'The smell of a reaction',
                  'The temperature in degrees Celsius',
                  'A description of texture',
                ],
                correctIndex: 2,
              },
              {
                question: 'Accuracy refers to:',
                options: [
                  'How consistent repeated measurements are',
                  'How close a measurement is to the true value',
                  'The smallest unit a measuring tool can detect',
                  'The range of values in a dataset',
                ],
                correctIndex: 1,
              },
              {
                question: 'The independent variable in an experiment is:',
                options: [
                  'The variable the experimenter measures',
                  'The variable the experimenter changes deliberately',
                  'Variables kept the same in all conditions',
                  'The predicted outcome of the experiment',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Controlled variables are kept constant in an experiment to:',
                options: [
                  'Speed up data collection',
                  'Ensure changes in the dependent variable are caused only by the independent variable',
                  'Improve the accuracy of the measuring instrument',
                  'Reduce the sample size needed',
                ],
                correctIndex: 1,
              },
              {
                question: 'Precision in measurement means:',
                options: [
                  'The measurement is close to the true value',
                  'Repeated measurements give consistent results with each other',
                  'The measuring instrument is properly calibrated',
                  'Only one measurement is needed',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Variable Identification',
            forLesson: 'Data & Measurement',
            dueDate: 'Jul 7',
            submission: 'Text response',
            instructions:
              'Design the outline of an experiment to test whether plant growth is affected by the amount of sunlight received. Identify and justify all variables and the type of data you would collect.',
            requirements: [
              'Independent, dependent, and at least two controlled variables named and justified',
              'Data collection method described (what you measure, how, and how often)',
              'Explain whether accuracy or precision is harder to achieve in this experiment and why',
            ],
          },
        ],
      },
      {
        id: 'c4_l3',
        title: 'Experimental Design',
        documents: [
          {
            id: 'c4_d2',
            kind: 'document',
            title: 'Experimental Design',
            readTime: '4 – 6 min read',
            intro:
              'A well-designed experiment produces results you can trust. A poorly designed one produces noise that looks like data.',
            objectives: [
              'Design a fair test by controlling variables and using control groups',
              'Identify sources of bias that can invalidate experimental results',
            ],
            sections: [
              {
                heading: 'Fair Tests and Control Groups',
                text: 'A fair test changes only one variable at a time — the independent variable — while holding all others constant. A control group is identical to the experimental group except it does not receive the treatment. It provides a baseline that isolates the effect of the independent variable. Without a control group, you cannot know whether changes are caused by the treatment or by something else entirely.',
                tip: "Ask: what else could cause the change I'm observing? Each answer is a potential variable that needs to be controlled.",
              },
              {
                heading: 'Sources of Bias',
                text: 'Experimenter bias occurs when the researcher unconsciously influences results — for example, by measuring ambiguous outcomes differently depending on the expected result. Selection bias occurs when the sample is not representative of the population. Publication bias occurs when positive results are published and negative results are not — skewing the scientific record. Blind and double-blind designs eliminate the first; random sampling reduces the second.',
              },
            ],
            takeaways: [
              'A control group isolates the effect of the independent variable by providing a baseline',
              'Blind and double-blind designs counter experimenter bias',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c4_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Experimental Design Quiz',
            forLesson: 'Experimental Design',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your ability to design fair experiments and identify sources of bias.',
            questions: [
              {
                question: 'What is the purpose of a control group?',
                options: [
                  'To receive the strongest version of the treatment',
                  'To provide a baseline that isolates the effect of the independent variable',
                  'To increase the sample size',
                  'To test a secondary hypothesis',
                ],
                correctIndex: 1,
              },
              {
                question: 'A fair test changes:',
                options: [
                  'All variables simultaneously',
                  'Only one variable at a time while holding others constant',
                  'Only the dependent variable',
                  'The control group and experimental group equally',
                ],
                correctIndex: 1,
              },
              {
                question: 'Experimenter bias can be reduced by:',
                options: [
                  'Increasing the sample size',
                  'Using a blind or double-blind design',
                  'Repeating the experiment more times',
                  'Publishing the hypothesis before collecting data',
                ],
                correctIndex: 1,
              },
              {
                question: 'Selection bias occurs when:',
                options: [
                  'The experimenter influences the results',
                  'The sample is not representative of the population',
                  'Positive results are published more than negative ones',
                  'Data is collected with inaccurate instruments',
                ],
                correctIndex: 1,
              },
              {
                question: 'In a double-blind experiment:',
                options: [
                  'Neither participants nor researchers know who is in which group',
                  'Only the participants know which group they are in',
                  'Only the researchers know the group assignments',
                  'The control group is blind to the hypothesis',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Experiment Critique',
            forLesson: 'Experimental Design',
            dueDate: 'Jul 9',
            submission: 'Text response',
            instructions:
              'Find a simple experiment described in a news article, science blog, or textbook. Evaluate its design: identify the control group, list potential biases, and suggest one improvement.',
            requirements: [
              'Identify the independent variable, dependent variable, and control group',
              'Name at least two potential sources of bias in the experiment',
              'Propose one specific design change that would reduce the most serious bias',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c4_m2',
    title: 'Module 2: Technology & Engineering',
    lessons: [
      {
        id: 'c4_l4',
        title: 'Design Thinking in Engineering',
        documents: [],
        videos: [
          {
            id: 'c4_v2',
            kind: 'video',
            title: 'Design Thinking in Engineering',
            duration: '14 min',
            intro:
              'Engineering is structured problem-solving. Design thinking gives you a repeatable human-centred process.',
            topics: [
              'The five stages of design thinking: Empathise, Define, Ideate, Prototype, Test',
              'Why empathy comes first — understanding the user before designing the solution',
              'Rapid prototyping: cheap, fast tests before expensive commits',
              'Iteration: why the first design is always a draft',
            ],
            moments: [
              { time: '0:00', label: 'What is design thinking?' },
              { time: '2:40', label: 'Empathise and Define stages' },
              { time: '6:30', label: 'Ideate and rapid prototyping' },
              { time: '11:00', label: 'Testing and iteration cycles' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c4_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Design Thinking Quiz',
            forLesson: 'Design Thinking in Engineering',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of the design thinking process.',
            questions: [
              {
                question: 'The correct order of design thinking stages is:',
                options: [
                  'Define → Empathise → Ideate → Prototype → Test',
                  'Empathise → Define → Ideate → Prototype → Test',
                  'Ideate → Empathise → Define → Prototype → Test',
                  'Prototype → Empathise → Define → Ideate → Test',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Why does the design thinking process begin with empathy?',
                options: [
                  'It is the easiest stage to complete',
                  "Understanding the user's real needs prevents building the wrong solution",
                  'Empathy generates the most creative ideas',
                  'It is required by engineering standards',
                ],
                correctIndex: 1,
              },
              {
                question: 'Rapid prototyping means:',
                options: [
                  'Building the final product quickly',
                  'Creating cheap, fast versions to test ideas before expensive commits',
                  'Skipping the ideation stage',
                  'Using computer simulation only',
                ],
                correctIndex: 1,
              },
              {
                question: 'Iteration in engineering means:',
                options: [
                  'Repeating the same solution until it works',
                  'Refining and improving designs based on test feedback',
                  'Starting the project again from scratch',
                  'Testing only the final prototype',
                ],
                correctIndex: 1,
              },
              {
                question: 'In the Define stage, engineers:',
                options: [
                  'Build the first version of the product',
                  'Frame a clear problem statement based on what they learned during Empathise',
                  'Generate as many ideas as possible',
                  'Test the prototype with users',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design Challenge',
            forLesson: 'Design Thinking in Engineering',
            dueDate: 'Jul 12',
            submission: 'File or link upload',
            instructions:
              'Apply the five design thinking stages to a simple problem of your choice (e.g. a better water bottle, a school timetable, a public transport solution). Document each stage.',
            requirements: [
              'All five stages documented with specific outputs at each',
              'Problem statement written in the form: "How might we [action] for [user] so that [outcome]?"',
              'Simple prototype described (sketch, diagram, or physical model) with a test plan',
            ],
          },
        ],
      },
      {
        id: 'c4_l5',
        title: 'Introduction to Coding',
        documents: [
          {
            id: 'c4_d3',
            kind: 'document',
            title: 'Introduction to Coding',
            readTime: '5 – 6 min read',
            intro:
              'Code is how humans give precise instructions to computers. Understanding the fundamentals opens up every digital technology.',
            objectives: [
              'Understand what algorithms are and how they translate into code',
              'Identify four core programming concepts: variables, conditions, loops, and functions',
            ],
            sections: [
              {
                heading: 'Algorithms and Code',
                text: 'An algorithm is a precise, ordered sequence of steps for solving a problem. Code translates an algorithm into a language a computer can execute. Every program you use — from a search engine to a traffic light controller — is an algorithm expressed in code. The key to learning coding is learning to think algorithmically: breaking a complex problem into small, ordered, unambiguous steps.',
                tip: 'Before writing a single line of code, write the algorithm in plain English. The coding part is just translation.',
              },
              {
                heading: 'Four Core Concepts',
                text: 'Variables store data that can change during execution. Conditions (if/else) let the program make decisions based on data. Loops (for/while) repeat actions until a condition is met. Functions package a sequence of steps into a named block that can be reused. These four concepts appear in every programming language — learn them in any language and you understand the foundation of all of them.',
              },
            ],
            takeaways: [
              'Algorithmic thinking — breaking problems into ordered steps — is the core skill of coding',
              'Variables, conditions, loops, and functions are the four universal programming building blocks',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c4_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Introduction to Coding Quiz',
            forLesson: 'Introduction to Coding',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of core programming concepts.',
            questions: [
              {
                question: 'An algorithm is:',
                options: [
                  'A programming language',
                  'A precise, ordered sequence of steps for solving a problem',
                  'A type of computer hardware',
                  'A debugging tool',
                ],
                correctIndex: 1,
              },
              {
                question: 'A variable in programming is used to:',
                options: [
                  'Make a decision based on a condition',
                  'Repeat an action until a condition is met',
                  'Store data that can change during execution',
                  'Package steps into a reusable block',
                ],
                correctIndex: 2,
              },
              {
                question: 'A loop is used to:',
                options: [
                  'Store a data value for later use',
                  'Execute a sequence only if a condition is true',
                  'Repeat a set of actions until a condition is met',
                  'Name a reusable block of code',
                ],
                correctIndex: 2,
              },
              {
                question: 'Functions in code are primarily used to:',
                options: [
                  'Store numbers and strings',
                  'Make binary decisions',
                  'Create cycles in program execution',
                  'Package reusable steps into a named, callable block',
                ],
                correctIndex: 3,
              },
              {
                question: 'Which approach is recommended before writing code?',
                options: [
                  'Open the coding environment first',
                  'Write the algorithm in plain English before translating it',
                  'Choose the programming language first',
                  'Search for similar code online to copy',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Algorithm Design',
            forLesson: 'Introduction to Coding',
            dueDate: 'Jul 14',
            submission: 'Text response',
            instructions:
              'Write an algorithm in plain English for one of the following: making a cup of tea, sorting a list of names alphabetically, or finding the highest score in a list. Then identify which of the four core concepts (variables, conditions, loops, functions) you used.',
            requirements: [
              'Algorithm written in numbered, unambiguous steps',
              'At least two of the four core concepts identified and labelled in the algorithm',
              'Explain what would happen if one step were removed or changed',
            ],
          },
        ],
      },
      {
        id: 'c4_l6',
        title: 'Engineering Problem-Solving',
        documents: [],
        videos: [
          {
            id: 'c4_v3',
            kind: 'video',
            title: 'Engineering Problem-Solving',
            duration: '13 min',
            intro:
              'Engineers solve problems with constraints — budget, materials, time, safety. Learn how to work within constraints creatively.',
            topics: [
              'Defining engineering constraints and trade-offs',
              'Systems thinking: how components interact',
              'Failure analysis: what engineers learn from things that go wrong',
              'The role of safety factors in engineering design',
            ],
            moments: [
              { time: '0:00', label: 'Constraints as design inputs' },
              { time: '2:50', label: 'Systems thinking overview' },
              { time: '6:30', label: 'Failure analysis and learning' },
              { time: '10:20', label: 'Safety factors in practice' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c4_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Engineering Problem-Solving Quiz',
            forLesson: 'Engineering Problem-Solving',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of engineering constraints, systems thinking, and failure analysis.',
            questions: [
              {
                question: 'Engineering constraints are best thought of as:',
                options: [
                  'Obstacles that prevent creative solutions',
                  'Design inputs that shape and focus the solution space',
                  'Limitations set by clients with no technical basis',
                  'Rules that are usually bent in practice',
                ],
                correctIndex: 1,
              },
              {
                question: 'Systems thinking in engineering means:',
                options: [
                  'Following a systematic checklist',
                  'Understanding how components interact and affect each other',
                  'Testing one component in isolation',
                  'Designing systems that replace human workers',
                ],
                correctIndex: 1,
              },
              {
                question: 'Failure analysis helps engineers by:',
                options: [
                  'Assigning blame for design errors',
                  'Providing data for legal proceedings',
                  'Revealing how and why systems fail so future designs avoid the same issues',
                  'Documenting completed projects for compliance',
                ],
                correctIndex: 2,
              },
              {
                question: 'A safety factor in engineering design:',
                options: [
                  'Doubles the project timeline',
                  'Provides a margin between the expected load and the design capacity',
                  'Ensures the project stays under budget',
                  'Is required only for bridges and aircraft',
                ],
                correctIndex: 1,
              },
              {
                question: 'A trade-off in engineering design means:',
                options: [
                  'An engineer changes their mind about a solution',
                  'Choosing one design quality (speed, cost, strength) at the expense of another',
                  'Two engineers disagree on the best approach',
                  'The budget is cut during construction',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Constraint Analysis',
            forLesson: 'Engineering Problem-Solving',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Choose a real engineering structure or product (bridge, phone, water filtration system, etc.). Identify three constraints that shaped its design and one trade-off the engineers had to make.',
            requirements: [
              'Three constraints named with a brief explanation of how each shaped the design',
              'One specific trade-off explained: what was gained and what was sacrificed',
              'Identify one real or potential failure mode and what safety factor addresses it',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c4_m3',
    title: 'Module 3: Mathematical Thinking',
    lessons: [
      {
        id: 'c4_l7',
        title: 'Mathematical Reasoning',
        documents: [
          {
            id: 'c4_d4',
            kind: 'document',
            title: 'Mathematical Reasoning',
            readTime: '4 – 6 min read',
            intro:
              'Mathematics is a language for describing patterns and relationships. Mathematical reasoning is the ability to think precisely within that language.',
            objectives: [
              'Distinguish between deductive mathematical proof and numerical estimation',
              'Apply ratio and proportion reasoning to real-world quantitative problems',
            ],
            sections: [
              {
                heading: 'Proof vs. Estimation',
                text: 'A mathematical proof shows that something must be true for all cases — it leaves no room for exceptions. Numerical estimation shows that something is approximately true for the cases measured. Both are valuable: proof gives certainty, estimation gives speed. Engineers use estimation constantly (Fermi problems, order-of-magnitude checks) to catch errors before committing to calculation.',
                tip: 'Before solving any quantitative problem, estimate the answer first. If your calculation differs from your estimate by more than a factor of 10, check for an error.',
              },
              {
                heading: 'Ratio and Proportion',
                text: 'Ratio compares two quantities: 3:1 means one quantity is three times the other. Proportion states that two ratios are equal: 3/6 = 1/2. Proportional reasoning is the foundation of scaling (a map is a proportional model of reality), concentration (a 20% solution contains 20 g of solute per 100 g of solution), and percentage change. These appear in STEM, economics, and everyday decision-making.',
              },
            ],
            takeaways: [
              'Estimate first; if your calculation is wildly different, there is an error to find',
              'Proportional reasoning underpins scaling, concentration, and percentage — master it once, apply it everywhere',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c4_q7',
            kind: 'quiz',
            status: 'Ready',
            title: 'Mathematical Reasoning Quiz',
            forLesson: 'Mathematical Reasoning',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description: 'Test your mathematical reasoning skills.',
            questions: [
              {
                question:
                  'A mathematical proof is different from a numerical estimate because:',
                options: [
                  'Proofs use more complex equations',
                  'A proof shows something must be true for ALL cases, not just measured cases',
                  'Estimates are always more accurate',
                  'Proofs are only used in pure mathematics',
                ],
                correctIndex: 1,
              },
              {
                question: 'A ratio of 4:1 means:',
                options: [
                  'The two quantities are equal',
                  'One quantity is four times the other',
                  'The first quantity is one quarter of the second',
                  'The quantities differ by four units',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'If the ratio of students to teachers is 25:1 and there are 4 teachers, how many students are there?',
                options: ['21', '29', '100', '6'],
                correctIndex: 2,
              },
              {
                question: 'A 15% solution contains:',
                options: [
                  '15 g of solute per 1000 g of solution',
                  '15 g of solute per 100 g of solution',
                  '1.5 g of solute per 100 g of solution',
                  '15 g of solvent per 100 g of solution',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Order-of-magnitude estimation is used by engineers to:',
                options: [
                  'Produce the final answer for a report',
                  'Catch calculation errors before committing to detailed calculation',
                  'Replace mathematical proof',
                  'Impress clients with quick thinking',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a7',
            kind: 'assignment',
            status: 'Ready',
            title: 'Fermi Problem',
            forLesson: 'Mathematical Reasoning',
            dueDate: 'Jul 20',
            submission: 'Text response',
            instructions:
              'Estimate the answer to one Fermi problem: "How many piano tuners are there in Phnom Penh?" Show your reasoning step by step.',
            requirements: [
              'Estimate broken into numbered steps with each assumption stated',
              'Each assumption justified with a reasonable basis',
              'Final estimate given as an order of magnitude (e.g. "approximately 10–30")',
            ],
          },
        ],
      },
      {
        id: 'c4_l8',
        title: 'Applied Mathematics',
        documents: [],
        videos: [
          {
            id: 'c4_v4',
            kind: 'video',
            title: 'Applied Mathematics',
            duration: '14 min',
            intro:
              'Mathematics becomes powerful when it is applied to real problems — in data, engineering, finance, and science.',
            topics: [
              'Statistics fundamentals: mean, median, mode, and what each tells you',
              'Probability: calculating likelihood and using it in decisions',
              'Graph interpretation: reading trends, correlations, and outliers',
              'Using mathematics as a checking tool in engineering and science',
            ],
            moments: [
              { time: '0:00', label: 'Why applied mathematics matters' },
              { time: '2:40', label: 'Mean, median, mode in context' },
              { time: '6:20', label: 'Probability and decision-making' },
              { time: '10:30', label: 'Reading graphs and correlations' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c4_q8',
            kind: 'quiz',
            status: 'Ready',
            title: 'Applied Mathematics Quiz',
            forLesson: 'Applied Mathematics',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your ability to apply mathematical concepts to real-world problems.',
            questions: [
              {
                question: 'The median of a dataset is:',
                options: [
                  'The most frequently occurring value',
                  'The sum of all values divided by the count',
                  'The middle value when data is sorted in order',
                  'The difference between the largest and smallest values',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which measure is least affected by outliers (extreme values)?',
                options: ['Mean', 'Median', 'Range', 'Sum'],
                correctIndex: 1,
              },
              {
                question: 'A correlation between two variables means:',
                options: [
                  'One variable causes the other to change',
                  'The two variables tend to move together, but causation is not implied',
                  'The data is normally distributed',
                  'The relationship is linear',
                ],
                correctIndex: 1,
              },
              {
                question: 'A probability of 0.25 means an event:',
                options: [
                  'Will not happen',
                  'Will happen 25 times out of every 100',
                  'Is equally likely to happen or not',
                  'Is certain to happen',
                ],
                correctIndex: 1,
              },
              {
                question: 'An outlier in a dataset should be:',
                options: [
                  'Automatically removed from the analysis',
                  'Investigated to determine whether it represents real data or a measurement error',
                  'Treated as the most important data point',
                  'Replaced with the mean value',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a8',
            kind: 'assignment',
            status: 'Ready',
            title: 'Data Interpretation',
            forLesson: 'Applied Mathematics',
            dueDate: 'Jul 23',
            submission: 'File or link upload',
            instructions:
              'Find a publicly available dataset (e.g. from a government website or news report). Calculate the mean and median, identify any outliers, and write a 200-word interpretation of what the data shows.',
            requirements: [
              'Mean and median calculated correctly and shown with working',
              'At least one outlier identified and explained',
              'Interpretation states one conclusion supported by the data and one limitation of the data',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 5: Global Leadership Excellence ───────────────────────────────────

export const C5_MODULES: ReviewModule[] = [
  {
    id: 'c5_m1',
    title: 'Module 1: Global Mindset',
    lessons: [
      {
        id: 'c5_l1',
        title: 'Global Leadership Foundations',
        documents: [
          {
            id: 'c5_d1',
            kind: 'document',
            title: 'Global Leadership Foundations',
            readTime: '5 – 6 min read',
            intro:
              'Global leaders operate across borders, cultures, and time zones. The foundation is a mindset — not just a passport stamp.',
            objectives: [
              'Define the global leadership mindset and its distinguishing characteristics',
              'Identify the core competencies that separate locally effective leaders from globally effective ones',
            ],
            sections: [
              {
                heading: 'What Makes a Leader Global',
                text: 'A global leader does not just travel internationally. They actively cultivate curiosity about different ways of thinking, comfort with ambiguity, and the ability to build trust across cultural boundaries. Research by Javidan et al. identifies three dimensions of global mindset: intellectual (knowledge of global business), psychological (openness to different cultures), and social (ability to connect with people from other cultures). Developing all three is intentional work.',
                tip: 'Measure your global mindset not by where you have been, but by how genuinely curious you are about perspectives different from your own.',
              },
              {
                heading: 'Global vs. Local Leadership Competencies',
                text: 'Local leadership competencies — clear communication, accountability, empathy — remain essential globally. But global leaders also need: cultural intelligence (reading cultural cues accurately), systemic thinking (understanding how decisions ripple across markets), and adaptive communication (adjusting style without losing authenticity). The failure mode for locally great leaders going global is assuming that what worked at home will work everywhere.',
              },
            ],
            takeaways: [
              'Global mindset has three dimensions: intellectual, psychological, and social — all are developable',
              'Local leadership skills are necessary but not sufficient for global effectiveness',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c5_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Global Leadership Foundations Quiz',
            forLesson: 'Global Leadership Foundations',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of global leadership mindset and competencies.',
            questions: [
              {
                question:
                  'The psychological dimension of global mindset refers to:',
                options: [
                  'Knowledge of global business environments',
                  'Openness to different cultures and ways of thinking',
                  'Ability to build relationships across cultural boundaries',
                  'Fluency in multiple languages',
                ],
                correctIndex: 1,
              },
              {
                question: 'Cultural intelligence is:',
                options: [
                  'The ability to speak multiple languages',
                  'Reading cultural cues accurately and adapting your behaviour accordingly',
                  'Knowing historical facts about different countries',
                  'Avoiding cultural topics in professional settings',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The most common failure mode for locally great leaders going global is:',
                options: [
                  'Spending too much time learning the new culture',
                  'Assuming that what worked at home will work everywhere',
                  'Being too adaptable and losing their leadership identity',
                  'Focusing too much on systemic thinking',
                ],
                correctIndex: 1,
              },
              {
                question: 'Adaptive communication in a global context means:',
                options: [
                  'Using a translator for all important conversations',
                  'Adjusting style without losing authenticity',
                  'Speaking more slowly with non-native speakers',
                  'Avoiding idioms and humour entirely',
                ],
                correctIndex: 1,
              },
              {
                question: 'Global mindset is best measured by:',
                options: [
                  'Number of countries visited',
                  'Number of languages spoken',
                  'Genuine curiosity about perspectives different from your own',
                  'Years of international work experience',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Global Mindset Self-Assessment',
            forLesson: 'Global Leadership Foundations',
            dueDate: 'Jul 5',
            submission: 'Text response',
            instructions:
              'Rate yourself 1–5 on each of the three global mindset dimensions (intellectual, psychological, social). For each, provide one piece of evidence and one specific development action.',
            requirements: [
              'Self-rating on all three dimensions with evidence for each',
              'One development action per dimension that is concrete and time-bound',
              'Identify which dimension is your most critical gap for your career context',
            ],
          },
        ],
      },
      {
        id: 'c5_l2',
        title: 'Cultural Intelligence',
        documents: [],
        videos: [
          {
            id: 'c5_v1',
            kind: 'video',
            title: 'Cultural Intelligence',
            duration: '15 min',
            intro:
              'Cultural intelligence (CQ) is the ability to work effectively with people from different cultural backgrounds. It is learnable — and measurable.',
            topics: [
              'The four CQ capabilities: drive, knowledge, strategy, and action',
              "Hofstede's cultural dimensions: power distance, individualism, uncertainty avoidance",
              'Common cross-cultural misunderstandings and how to navigate them',
              'Building CQ through deliberate practice',
            ],
            moments: [
              { time: '0:00', label: 'Why CQ matters more than IQ globally' },
              { time: '3:00', label: 'Four CQ capabilities' },
              { time: '7:30', label: "Hofstede's dimensions explained" },
              { time: '12:00', label: 'Building CQ deliberately' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c5_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cultural Intelligence Quiz',
            forLesson: 'Cultural Intelligence',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              "Test your knowledge of cultural intelligence and Hofstede's cultural dimensions.",
            questions: [
              {
                question: 'CQ Drive refers to:',
                options: [
                  'The knowledge of cultural norms and values',
                  'The motivation and confidence to adapt to different cultural contexts',
                  'The ability to adapt behaviour in cross-cultural interactions',
                  'The planning and awareness before cross-cultural encounters',
                ],
                correctIndex: 1,
              },
              {
                question: 'A culture with high power distance:',
                options: [
                  'Values equality between all hierarchical levels',
                  'Accepts and expects unequal distribution of power',
                  'Has no formal leadership structures',
                  'Resists any form of authority',
                ],
                correctIndex: 1,
              },
              {
                question: 'Hofstede\'s "individualism" dimension measures:',
                options: [
                  'How competitive individuals are in a culture',
                  'The degree to which people see themselves as independent vs. part of a collective',
                  'How much personal space people prefer',
                  'The tolerance for rule-breaking in a society',
                ],
                correctIndex: 1,
              },
              {
                question: 'CQ Action is:',
                options: [
                  'The motivation to engage with different cultures',
                  'The knowledge base of cultural facts',
                  'The ability to actually adapt verbal and non-verbal behaviour in cross-cultural interactions',
                  'Strategic planning before a cross-cultural meeting',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'CQ is described as "learnable and measurable" because:',
                options: [
                  'It is assessed by passport stamps and travel experience',
                  'Research shows deliberate practice systematically improves all four CQ capabilities',
                  'Language learning is the primary input',
                  'CQ tests are standardised internationally',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Cultural Comparison',
            forLesson: 'Cultural Intelligence',
            dueDate: 'Jul 7',
            submission: 'Text response',
            instructions:
              "Compare two cultures (one you are familiar with, one you are less familiar with) on two of Hofstede's dimensions. Describe how the differences would affect a leadership interaction.",
            requirements: [
              'Two specific Hofstede dimensions used with definitions',
              'Comparison covers both cultures for each dimension',
              'One concrete leadership interaction described differently for each culture',
            ],
          },
        ],
      },
      {
        id: 'c5_l3',
        title: 'Cross-Cultural Communication',
        documents: [
          {
            id: 'c5_d2',
            kind: 'document',
            title: 'Cross-Cultural Communication',
            readTime: '4 – 6 min read',
            intro:
              'What counts as clear, respectful communication varies dramatically across cultures. What is direct in one culture is rude in another.',
            objectives: [
              'Distinguish high-context and low-context communication cultures',
              'Adapt communication style without losing your core message',
            ],
            sections: [
              {
                heading: 'High-Context vs. Low-Context Communication',
                text: 'In low-context cultures (Germany, USA, Australia), communication is direct and explicit — meaning is in the words. In high-context cultures (Japan, Cambodia, China, many Middle Eastern cultures), communication relies heavily on relationship, tone, gesture, and what is not said. Silence can mean disagreement. A "yes" can mean "I heard you" rather than "I agree." Misreading these signals causes costly misunderstandings in global business.',
                tip: 'When working with a high-context culture, pay as much attention to what is NOT said as to what is said.',
              },
              {
                heading: 'Adapting Without Losing Your Message',
                text: 'Adaptation does not mean becoming someone you are not. It means adjusting the channel and the style while keeping the content intact. In a high-context setting: spend more time on relationship-building before business, use indirect language for disagreement, and allow silence. In a low-context setting: be explicit about next steps, confirm decisions in writing, and express disagreement directly as expected.',
              },
            ],
            takeaways: [
              'High-context cultures embed meaning in relationship and subtext; low-context cultures embed it in explicit words',
              'Adapt communication style without losing content — change the channel, not the message',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c5_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cross-Cultural Communication Quiz',
            forLesson: 'Cross-Cultural Communication',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of high-context and low-context communication styles.',
            questions: [
              {
                question: 'In a high-context culture, communication relies on:',
                options: [
                  'Explicit written agreements',
                  'Relationship, tone, gesture, and what is left unsaid',
                  'Direct verbal statements of fact',
                  'Formal titles and hierarchical address',
                ],
                correctIndex: 1,
              },
              {
                question: 'In a low-context culture, a direct "no" is:',
                options: [
                  'Considered offensive and avoided',
                  'Unusual and mostly reserved for close relationships',
                  'A clear, expected, and acceptable response',
                  'Always followed by an elaborate explanation',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'When a high-context culture partner says "yes" in a meeting, it most likely means:',
                options: [
                  'Full agreement with the proposal',
                  '"I heard you" — agreement is unclear',
                  'The project can begin immediately',
                  'All team members are aligned',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Adapting to a high-context communication culture means:',
                options: [
                  'Translating all materials into the local language',
                  'Spending more time on relationship-building before business discussion',
                  'Eliminating all indirect language from your vocabulary',
                  'Only communicating in writing',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The principle "change the channel, not the message" means:',
                options: [
                  'Use different media for different cultures',
                  'Adjust your communication style while keeping the core content intact',
                  'Use high-context signals in all cultures',
                  'Simplify your message for non-native speakers',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Communication Adaptation',
            forLesson: 'Cross-Cultural Communication',
            dueDate: 'Jul 9',
            submission: 'Text response',
            instructions:
              'Write the same difficult message (e.g. declining a proposal, delivering critical feedback) twice — once for a low-context audience and once for a high-context audience. Annotate the differences.',
            requirements: [
              'Same core message delivered in both versions',
              'Differences annotated with reference to the high/low-context distinction',
              'Explain which version required more preparation and why',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c5_m2',
    title: 'Module 2: Strategic Global Leadership',
    lessons: [
      {
        id: 'c5_l4',
        title: 'Vision & Strategy',
        documents: [],
        videos: [
          {
            id: 'c5_v2',
            kind: 'video',
            title: 'Vision & Strategy',
            duration: '14 min',
            intro:
              'A compelling vision gives people a reason to follow you across time zones and cultural boundaries.',
            topics: [
              'What makes a vision compelling across cultures',
              'Strategy as a theory of winning — how to build one',
              'Translating global strategy into local execution',
              'Measuring strategic progress in a global organisation',
            ],
            moments: [
              { time: '0:00', label: 'Vision as cross-cultural glue' },
              { time: '3:10', label: 'What makes strategy coherent' },
              { time: '7:30', label: 'Global strategy → local execution' },
              { time: '11:50', label: 'Measuring strategic progress' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c5_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Vision & Strategy Quiz',
            forLesson: 'Vision & Strategy',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of vision-setting and strategy development in a global context.',
            questions: [
              {
                question: 'A compelling organisational vision should:',
                options: [
                  'Be specific enough to serve as an annual plan',
                  'Be aspirational, clear, and resonate across cultural boundaries',
                  'Be changed every quarter to reflect new priorities',
                  'Be created by the CEO without input from the organisation',
                ],
                correctIndex: 1,
              },
              {
                question: 'Strategy is best defined as:',
                options: [
                  'A detailed operational plan',
                  'A theory of how the organisation will win given its competitive environment',
                  'An annual budget allocation process',
                  'A set of values and principles',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Translating global strategy into local execution requires:',
                options: [
                  'Identical implementation across all markets',
                  'Adapting tactics to local context while maintaining strategic intent',
                  'Separate strategies for every country',
                  'Centralising all decisions at headquarters',
                ],
                correctIndex: 1,
              },
              {
                question: 'A leading indicator for strategic progress is:',
                options: [
                  "Last year's financial results",
                  'An early metric that predicts whether you will achieve the strategic goal',
                  'The number of strategic initiatives launched',
                  'Board approval of the annual plan',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What is the primary risk when a global strategy is not adapted for local execution?',
                options: [
                  'The strategy becomes too expensive',
                  'Local teams execute brilliantly but toward the wrong objective',
                  'Headquarters loses visibility of local performance',
                  'The strategy cannot be measured',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Vision Statement',
            forLesson: 'Vision & Strategy',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Write a vision statement for a real or hypothetical global organisation and a two-sentence strategy statement that explains how it will achieve the vision. Assess whether the vision would resonate across cultures.',
            requirements: [
              'Vision statement in one clear sentence (no jargon)',
              'Strategy statement specifies the competitive choice being made',
              'Cultural resonance assessment for at least two different cultural contexts',
            ],
          },
        ],
      },
      {
        id: 'c5_l5',
        title: 'Change Management',
        documents: [
          {
            id: 'c5_d3',
            kind: 'document',
            title: 'Change Management',
            readTime: '5 – 6 min read',
            intro:
              'Most change initiatives fail — not because the strategy is wrong, but because of how (or how poorly) the change is managed.',
            objectives: [
              "Apply Kotter's 8-step change model to a global transformation",
              'Identify the most common reasons change initiatives fail and how to prevent them',
            ],
            sections: [
              {
                heading: "Kotter's 8-Step Change Model",
                text: 'Kotter identifies eight steps: (1) Create urgency, (2) Form a guiding coalition, (3) Develop a vision for change, (4) Communicate the vision, (5) Remove obstacles, (6) Create short-term wins, (7) Build on the change, (8) Anchor the change in culture. The model is sequential — skipping steps, especially urgency and coalition-building, is the most common reason change initiatives stall or reverse.',
                tip: "Short-term wins (step 6) are not optional. They prove the change is working and sustain the coalition's momentum.",
              },
              {
                heading: 'Why Change Fails',
                text: 'The top reasons: (1) Insufficient urgency — people do not believe change is necessary. (2) No guiding coalition — the change depends on one champion who leaves. (3) Poor communication — the vision is announced once and then forgotten. (4) Underestimating resistance — resistance is treated as obstruction rather than as feedback about implementation gaps. (5) Declaring victory too soon — reverting to old habits once pressure eases.',
              },
            ],
            takeaways: [
              "Kotter's model is sequential — skipping urgency and coalition-building causes most change failures",
              'Resistance to change is feedback about implementation gaps — treat it as data, not obstruction',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c5_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Change Management Quiz',
            forLesson: 'Change Management',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              "Test your understanding of Kotter's change model and why change initiatives fail.",
            questions: [
              {
                question:
                  "In Kotter's model, what must come before forming the guiding coalition?",
                options: [
                  'Developing the change vision',
                  'Creating urgency',
                  'Communicating the vision',
                  'Removing obstacles',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Short-term wins in a change process are important because:',
                options: [
                  'They allow the change leader to declare victory early',
                  'They prove the change is working and sustain momentum',
                  'They are the final step before anchoring change in culture',
                  'They replace the need for a guiding coalition',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What is the most effective way to handle resistance to change?',
                options: [
                  'Ignore it and continue with implementation',
                  'Replace resistant team members',
                  'Treat it as feedback about implementation gaps',
                  'Delay the change until resistance disappears',
                ],
                correctIndex: 2,
              },
              {
                question: 'A change initiative most commonly fails because:',
                options: [
                  'The strategy is technically incorrect',
                  "Insufficient urgency — people don't believe change is necessary",
                  'The budget is too small',
                  'The change leader lacks seniority',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Anchoring change in culture (Kotter's step 8) means:",
                options: [
                  'Publishing a new company culture document',
                  'The new way of working becomes the default and is reinforced in hiring and promotion',
                  'Change is now permanent and no further action is needed',
                  'A culture survey is conducted after the change',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Change Plan',
            forLesson: 'Change Management',
            dueDate: 'Jul 14',
            submission: 'Text response',
            instructions:
              "Apply Kotter's 8-step model to a change you would like to drive in a real or hypothetical organisation. For each step, describe one specific action you would take.",
            requirements: [
              'All eight steps addressed with one specific action each',
              'Step 1 (urgency) supported by a data point or business case',
              'Identify the step where you anticipate the most resistance and how you will address it',
            ],
          },
        ],
      },
      {
        id: 'c5_l6',
        title: 'Building Global Teams',
        documents: [],
        videos: [
          {
            id: 'c5_v3',
            kind: 'video',
            title: 'Building Global Teams',
            duration: '13 min',
            intro:
              'Global teams are more creative and more challenging to lead than local ones. The key is designing the team as carefully as you design the strategy.',
            topics: [
              'Why diverse teams outperform homogeneous ones — and when they struggle',
              'The trust-building challenge in virtual global teams',
              'Setting team norms that work across time zones and cultures',
              'Communication tools and rhythms for distributed leadership',
            ],
            moments: [
              { time: '0:00', label: 'The diversity performance paradox' },
              { time: '3:00', label: 'Trust-building in virtual teams' },
              { time: '6:40', label: 'Setting global team norms' },
              {
                time: '10:20',
                label: 'Communication rhythms for distributed teams',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c5_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Building Global Teams Quiz',
            forLesson: 'Building Global Teams',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of global team dynamics and virtual leadership.',
            questions: [
              {
                question:
                  'Research shows diverse teams outperform homogeneous teams when:',
                options: [
                  'All members share the same working style',
                  'The team has processes for integrating different perspectives',
                  'Diversity is limited to nationality rather than function',
                  'The team leader is from the majority cultural group',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The primary trust-building challenge in virtual global teams is:',
                options: [
                  'Language barriers in written communication',
                  'The absence of informal, spontaneous interactions that build relationship',
                  'Different time zones making synchronous work impossible',
                  'Different salary levels across countries',
                ],
                correctIndex: 1,
              },
              {
                question: 'Team norms for a global team should be:',
                options: [
                  "Inherited from headquarters' practices",
                  'Explicitly negotiated by the team, not assumed',
                  'Set by the most senior member',
                  'Based on the culture of the team leader',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'An effective communication rhythm for a distributed global team includes:',
                options: [
                  'Daily all-hands meetings across all time zones',
                  'Ad hoc communication whenever something comes up',
                  'A predictable cadence of synchronous and asynchronous touchpoints agreed in advance',
                  'Email only, to create a written record',
                ],
                correctIndex: 2,
              },
              {
                question: 'The "diversity performance paradox" refers to:',
                options: [
                  'Diverse teams are always better at everything',
                  'Diversity improves creativity but increases coordination costs if not managed',
                  'Performance improves only when diversity is mandated',
                  'Cultural diversity and cognitive diversity always produce the same results',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Team Charter',
            forLesson: 'Building Global Teams',
            dueDate: 'Jul 17',
            submission: 'File or link upload',
            instructions:
              'Draft a one-page team charter for a hypothetical global team of five people in three different countries and time zones.',
            requirements: [
              'Communication tools and cadence (synchronous and asynchronous) specified',
              'At least four explicit team norms covering decision-making, conflict, responsiveness, and meetings',
              'Trust-building approach for the first 30 days described',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c5_m3',
    title: 'Module 3: Leading for Impact',
    lessons: [
      {
        id: 'c5_l7',
        title: 'Ethical Leadership',
        documents: [
          {
            id: 'c5_d4',
            kind: 'document',
            title: 'Ethical Leadership',
            readTime: '5 – 6 min read',
            intro:
              'Ethical leaders do the right thing when no one is watching — and set the conditions for others to do the same.',
            objectives: [
              'Define ethical leadership and its impact on organisational culture',
              'Apply a structured ethical decision-making framework to a dilemma',
            ],
            sections: [
              {
                heading: 'What Ethical Leadership Is',
                text: 'Ethical leadership goes beyond compliance. A compliant leader avoids breaking rules. An ethical leader actively creates conditions in which people are encouraged to raise concerns, empowered to say no to shortcuts, and recognised for integrity not just results. The ethical tone of an organisation is set at the top — but maintained at every level. When leaders cut ethical corners "just this once," they signal to everyone that results justify any means.',
                tip: 'If you would be uncomfortable seeing your decision reported on the front page of a newspaper, reconsider it.',
              },
              {
                heading: 'Ethical Decision-Making Framework',
                text: 'When facing an ethical dilemma, apply three lenses: (1) Consequences — who is helped and harmed, and how much? (2) Rights and duties — does the action respect the rights of everyone affected? (3) Character — would a person of good character make this decision? No single lens is always sufficient; the most robust ethical decisions hold up under all three.',
              },
            ],
            takeaways: [
              'Ethical tone is set at the top — leaders who cut corners signal that results justify any means',
              'Test decisions against three lenses: consequences, rights, and character',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c5_q7',
            kind: 'quiz',
            status: 'Ready',
            title: 'Ethical Leadership Quiz',
            forLesson: 'Ethical Leadership',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of ethical leadership principles and decision-making.',
            questions: [
              {
                question: 'Ethical leadership differs from compliance by:',
                options: [
                  'Following all legal rules without exception',
                  'Actively creating conditions where people are empowered to act with integrity',
                  'Punishing rule-breakers more severely',
                  'Delegating all ethical decisions to HR',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When a leader cuts ethical corners "just this once," the signal to the team is:',
                options: [
                  "This is a rare exception and won't happen again",
                  'Results justify the means — others can apply the same logic',
                  'The leader is under unusual pressure and needs support',
                  'The rule was probably wrong anyway',
                ],
                correctIndex: 1,
              },
              {
                question: 'The "newspaper front page" test is used to:',
                options: [
                  'Evaluate whether a decision will generate positive press',
                  'Check whether you would be comfortable with the decision being public',
                  'Assess the reputational risk of a product launch',
                  'Determine whether to involve PR in a decision',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The consequences lens in ethical decision-making asks:',
                options: [
                  "Does the action respect everyone's rights?",
                  'Would a person of good character make this decision?',
                  'Who is helped and harmed, and by how much?',
                  'Is the action legally permitted?',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Why is using all three ethical lenses (consequences, rights, character) recommended?',
                options: [
                  'It satisfies three different regulatory requirements',
                  'Each lens can be blind to what the others reveal — together they are more robust',
                  'Three lenses is the legal minimum for due diligence',
                  'It speeds up the decision-making process',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a7',
            kind: 'assignment',
            status: 'Ready',
            title: 'Ethical Dilemma Analysis',
            forLesson: 'Ethical Leadership',
            dueDate: 'Jul 20',
            submission: 'Text response',
            instructions:
              'Describe a real or hypothetical ethical dilemma in a business or leadership context. Apply all three ethical lenses and state your decision with justification.',
            requirements: [
              'Dilemma clearly described with all affected parties named',
              'All three lenses applied with specific reasoning for each',
              'Final decision stated and one potential unintended consequence acknowledged',
            ],
          },
        ],
      },
      {
        id: 'c5_l8',
        title: 'Legacy & Sustainability',
        documents: [],
        videos: [
          {
            id: 'c5_v4',
            kind: 'video',
            title: 'Legacy & Sustainability',
            duration: '13 min',
            intro:
              'The measure of a great leader is what happens after they leave. Build the conditions for sustainable impact.',
            topics: [
              'Defining legacy: what leaders leave behind beyond results',
              'Building organisational capability that outlasts the leader',
              'Sustainable leadership: avoiding burnout and modelling balance',
              'Developing the next generation of leaders as a core leadership responsibility',
            ],
            moments: [
              { time: '0:00', label: 'Legacy vs. results' },
              {
                time: '2:50',
                label: 'Building lasting organisational capability',
              },
              {
                time: '6:30',
                label: 'Sustainable leadership and avoiding burnout',
              },
              { time: '10:20', label: 'Developing the next generation' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c5_q8',
            kind: 'quiz',
            status: 'Ready',
            title: 'Legacy & Sustainability Quiz',
            forLesson: 'Legacy & Sustainability',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of leadership legacy and sustainable leadership practices.',
            questions: [
              {
                question: "A leader's legacy is best measured by:",
                options: [
                  'Revenue growth during their tenure',
                  'Awards and recognition received',
                  'The capability and culture the organisation retains after they leave',
                  'The number of people they directly managed',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Building organisational capability that outlasts a leader requires:',
                options: [
                  'Keeping all strategic knowledge with the leader',
                  'Developing other leaders who can carry the work forward',
                  'Ensuring the leader stays in role as long as possible',
                  'Centralising all decision-making to maintain consistency',
                ],
                correctIndex: 1,
              },
              {
                question: 'Sustainable leadership means:',
                options: [
                  'Leading environmentally sustainable organisations',
                  'Maintaining the pace of leading over time by modelling balance and avoiding burnout',
                  'Maximising short-term output at all costs',
                  'Leading until retirement without any development change',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Developing the next generation of leaders is a leadership responsibility because:',
                options: [
                  'It satisfies a HR requirement',
                  'Leadership continuity is a strategic risk if not managed',
                  'Junior leaders always need direct oversight',
                  "It reduces the current leader's workload immediately",
                ],
                correctIndex: 1,
              },
              {
                question: 'A leader focused only on short-term results risks:',
                options: [
                  'Being too popular with the team',
                  'Creating a culture where long-term capability and sustainability are sacrificed for quarterly outcomes',
                  'Receiving excessive recognition',
                  'Growing the organisation too quickly',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a8',
            kind: 'assignment',
            status: 'Ready',
            title: 'Legacy Statement',
            forLesson: 'Legacy & Sustainability',
            dueDate: 'Jul 23',
            submission: 'Text response',
            instructions:
              'Write a 300-word personal legacy statement: what you want to be known for as a leader, what capability you want to leave behind, and one specific action you will take in the next 90 days toward that legacy.',
            requirements: [
              'Legacy defined beyond titles and results — focused on people and culture',
              'One specific capability you will build in others named',
              '90-day action is concrete, measurable, and starts within the week',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 6: Digital Innovation & Entrepreneurship ──────────────────────────

export const C6_MODULES: ReviewModule[] = [
  {
    id: 'c6_m1',
    title: 'Module 1: Foundations of Digital Innovation',
    lessons: [
      {
        id: 'c6_l1',
        title: 'The Innovation Mindset',
        documents: [
          {
            id: 'c6_d1',
            kind: 'document',
            title: 'The Innovation Mindset',
            readTime: '4 – 5 min read',
            intro:
              'Innovation is not a talent — it is a practice. Learn the habits and mindsets that make organisations consistently innovative.',
            objectives: [
              'Define innovation and distinguish it from invention',
              'Apply a growth mindset to overcome fear of failure in creative work',
            ],
            sections: [
              {
                heading: 'Innovation vs. Invention',
                text: 'Invention creates something new. Innovation creates value from something new (or old). Most transformative innovations — the iPhone, Airbnb, Uber — recombined existing technologies in new ways for underserved needs. The innovation mindset asks: what problem are people struggling with, and what already exists that could solve it differently?',
                tip: 'Look for friction. Wherever customers tolerate inconvenience, there is an innovation opportunity.',
              },
              {
                heading: 'Embracing Failure as Data',
                text: 'Fear of failure is the primary inhibitor of innovation in organisations. The antidote is not recklessness — it is systematic learning from small, fast experiments. Amazon\'s Jeff Bezos calls this "failing forward": each failed experiment teaches something that improves the next. The goal is not zero failures; it is high-quality learning per dollar spent on experiments.',
              },
            ],
            takeaways: [
              'Innovation creates value by recombining existing elements for underserved needs',
              'Systematic learning from small experiments converts failure from threat into data',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c6_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Innovation Mindset Quiz',
            forLesson: 'The Innovation Mindset',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of the innovation mindset.',
            questions: [
              {
                question: 'Innovation is best defined as:',
                options: [
                  'Creating something that has never existed before',
                  'Creating value from new or recombined ideas to solve real problems',
                  'Patenting original inventions',
                  'Disrupting an existing market',
                ],
                correctIndex: 1,
              },
              {
                question: 'Most transformative innovations succeed by:',
                options: [
                  'Inventing entirely new technologies',
                  'Recombining existing technologies for underserved needs',
                  'Having the largest R&D budget',
                  'Launching in the biggest possible market first',
                ],
                correctIndex: 1,
              },
              {
                question: '"Failing forward" means:',
                options: [
                  'Accepting failure as inevitable and moving on',
                  'Extracting systematic learning from each experiment to improve the next',
                  'Publishing failure stories publicly',
                  'Failing at low cost before succeeding at high cost',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The primary inhibitor of innovation in organisations is:',
                options: [
                  'Lack of budget',
                  'Too many ideas without focus',
                  'Fear of failure',
                  'Insufficient technology',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Friction Mapping',
            forLesson: 'The Innovation Mindset',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Identify three "friction points" — situations where customers or users tolerate inconvenience — in any industry. For each, describe one innovation that could remove the friction.',
            requirements: [
              'Three friction points identified with the user/customer named',
              'One potential innovation per friction point described at a concept level',
              'Explain whether your innovation is an invention or a recombination of existing elements',
            ],
          },
        ],
      },
      {
        id: 'c6_l2',
        title: 'Digital Business Models',
        documents: [],
        videos: [
          {
            id: 'c6_v1',
            kind: 'video',
            title: 'Digital Business Models',
            duration: '13 min',
            intro:
              'Digital technology has created entirely new ways for businesses to create, deliver, and capture value. Learn the dominant models.',
            topics: [
              'Platform vs. pipeline business models — and why platforms win at scale',
              'The freemium model: converting free users to paying customers',
              'Subscription economics: why recurring revenue changes everything',
              'Marketplace models: two-sided networks and liquidity',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Why digital business models differ fundamentally',
              },
              { time: '3:20', label: 'Platform vs. pipeline' },
              { time: '7:00', label: 'Freemium and subscription economics' },
              { time: '10:30', label: 'Marketplace dynamics' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c6_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Digital Business Models Quiz',
            forLesson: 'Digital Business Models',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of digital business model types.',
            questions: [
              {
                question: 'A platform business model creates value by:',
                options: [
                  'Building and selling a product directly',
                  'Facilitating interactions between two or more user groups',
                  'Offering a subscription to a software service',
                  'Providing a freemium tier to attract users',
                ],
                correctIndex: 1,
              },
              {
                question: 'The freemium model works when:',
                options: [
                  'All users eventually pay',
                  'A small percentage of free users convert to paid, subsidised by the majority',
                  'The free tier has significant limitations',
                  'The product is too expensive for most users',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Subscription revenue is attractive to businesses primarily because:',
                options: [
                  'It generates more revenue than one-time purchases',
                  'It is predictable and creates ongoing customer relationships',
                  'Subscribers are easier to acquire than one-time buyers',
                  'It eliminates customer service costs',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The "liquidity problem" in marketplace models refers to:',
                options: [
                  'Running out of investment capital',
                  'Difficulty attracting both supply and demand sides simultaneously',
                  'Inability to process payments at scale',
                  'High churn from existing marketplace participants',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Business Model Canvas',
            forLesson: 'Digital Business Models',
            dueDate: 'Jul 10',
            submission: 'File or link upload',
            instructions:
              'Choose a real digital company (e.g. Spotify, Airbnb, Grab). Identify its business model type and map its value proposition, customer segments, and revenue streams.',
            requirements: [
              'Business model type identified and justified',
              "Value proposition stated in one sentence from the customer's perspective",
              'At least two revenue streams described with how each works',
            ],
          },
        ],
      },
      {
        id: 'c6_l3',
        title: 'Lean Startup Methodology',
        documents: [
          {
            id: 'c6_d2',
            kind: 'document',
            title: 'Lean Startup Methodology',
            readTime: '4 – 5 min read',
            intro:
              'The Lean Startup method replaces "build it and they will come" with "test before you build." It is the dominant framework for digital product development.',
            objectives: [
              'Apply the Build-Measure-Learn loop to a product idea',
              'Define a Minimum Viable Product (MVP) for a specific customer hypothesis',
            ],
            sections: [
              {
                heading: 'Build-Measure-Learn',
                text: 'The core loop: (1) Build the smallest thing that tests your riskiest assumption. (2) Measure what actually happens when real users encounter it. (3) Learn — either validate your hypothesis and persevere, or invalidate it and pivot. The loop should run as fast as possible; speed of learning is the primary competitive advantage in the early stages of a startup.',
                tip: 'The riskiest assumption is the one whose failure would kill the business. Test that first.',
              },
              {
                heading: 'Minimum Viable Product',
                text: "An MVP is not a bad version of the product. It is the smallest experiment that tests whether customers value the core proposition. Dropbox's MVP was a demo video — no product existed. Zappos' MVP was a website with shoe photos; the founder bought shoes at retail and shipped them manually when orders came in. Neither built technology until they had validated demand.",
              },
            ],
            takeaways: [
              'The Build-Measure-Learn loop prioritises speed of validated learning above all else',
              'An MVP tests demand before committing resources to build the full solution',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c6_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Lean Startup Quiz',
            forLesson: 'Lean Startup Methodology',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of the Lean Startup methodology.',
            questions: [
              {
                question: 'The correct order of the Lean Startup loop is:',
                options: [
                  'Learn → Build → Measure',
                  'Build → Measure → Learn',
                  'Measure → Learn → Build',
                  'Test → Build → Launch',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A Minimum Viable Product (MVP) is primarily used to:',
                options: [
                  'Launch the product with minimum features',
                  'Test the riskiest assumption with minimum resources',
                  'Satisfy early adopters while the full product is built',
                  'Demonstrate traction to investors',
                ],
                correctIndex: 1,
              },
              {
                question: 'The "riskiest assumption" to test first is:',
                options: [
                  'Whether the technology can be built',
                  'The assumption whose failure would kill the business',
                  'Whether investors will fund the company',
                  'Whether the team can execute the plan',
                ],
                correctIndex: 1,
              },
              {
                question: "Dropbox's video MVP proved:",
                options: [
                  'The technology was technically feasible',
                  'Demand existed before a real product was built',
                  'The pricing model was correct',
                  'Investors would back the company',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'MVP Design',
            forLesson: 'Lean Startup Methodology',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design an MVP for a business idea of your choice. Identify the riskiest assumption and describe the smallest experiment that would test it.',
            requirements: [
              'Business idea stated in one sentence with the target customer named',
              'Riskiest assumption identified and justified',
              'MVP described: what it is, what you measure, and what would constitute validation vs. invalidation',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c6_m2',
    title: 'Module 2: Growing a Digital Venture',
    lessons: [
      {
        id: 'c6_l4',
        title: 'Product-Market Fit',
        documents: [],
        videos: [
          {
            id: 'c6_v2',
            kind: 'video',
            title: 'Product-Market Fit',
            duration: '12 min',
            intro:
              'Product-market fit is the moment when a product resonates strongly with a specific market. Everything before it is a search; everything after it is execution.',
            topics: [
              'How to know when you have product-market fit',
              'Sean Ellis\'s 40% rule and the "very disappointed" test',
              'Retention curves as the definitive PMF signal',
              'What to do before and after finding PMF',
            ],
            moments: [
              { time: '0:00', label: 'What product-market fit actually means' },
              { time: '2:40', label: 'The 40% rule test' },
              { time: '6:00', label: 'Reading retention curves' },
              { time: '9:30', label: 'Pre-PMF vs. post-PMF priorities' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c6_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Product-Market Fit Quiz',
            forLesson: 'Product-Market Fit',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of product-market fit signals.',
            questions: [
              {
                question:
                  "Sean Ellis's 40% rule states that PMF is indicated when:",
                options: [
                  '40% of users pay for the product',
                  '40% or more of users would be "very disappointed" if the product disappeared',
                  '40% of revenue comes from organic referrals',
                  '40% month-over-month growth is sustained',
                ],
                correctIndex: 1,
              },
              {
                question: 'A flat retention curve indicates:',
                options: [
                  'Strong product-market fit — users are staying',
                  'Users are churning to zero — no product-market fit',
                  'Growth is accelerating',
                  'The product needs a pricing change',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Before finding product-market fit, founders should prioritise:',
                options: [
                  'Scaling and marketing',
                  'Hiring a large team',
                  'Validating who the product is for and why they need it',
                  'Raising as much capital as possible',
                ],
                correctIndex: 2,
              },
              {
                question: 'Product-market fit is best described as:',
                options: [
                  'A specific revenue milestone',
                  'The moment a product resonates strongly with a specific market segment',
                  'When a product is profitable',
                  'When user growth exceeds team growth',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'PMF Assessment',
            forLesson: 'Product-Market Fit',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Choose a product you use regularly. Assess whether it has product-market fit using the "very disappointed" test and retention reasoning. Justify your answer.',
            requirements: [
              'Product named with its target user segment specified',
              'Apply the "very disappointed" test with your estimate of the percentage and reasoning',
              'Describe one retention signal that supports your PMF assessment',
            ],
          },
        ],
      },
      {
        id: 'c6_l5',
        title: 'Growth Strategies',
        documents: [
          {
            id: 'c6_d3',
            kind: 'document',
            title: 'Growth Strategies',
            readTime: '4 – 5 min read',
            intro:
              'Growth is not magic — it is a system. Learn the three sustainable growth engines and how to build the right one for your business.',
            objectives: [
              'Identify which of the three growth engines fits a specific business model',
              'Apply North Star Metric thinking to focus a team on the metric that drives long-term growth',
            ],
            sections: [
              {
                heading: 'Three Growth Engines',
                text: 'Viral growth: each user brings in more than one new user (K-factor > 1). This is the rarest and most powerful engine — WhatsApp, Instagram. Sticky growth: users return and expand usage over time — SaaS products with high switching costs. Paid growth: you acquire users via paid channels and the lifetime value (LTV) exceeds the acquisition cost (CAC). Most sustainable businesses combine sticky retention with one acquisition engine.',
                tip: 'Before investing in paid acquisition, make sure retention is working. Paying to fill a leaky bucket is the most expensive mistake in growth.',
              },
              {
                heading: 'North Star Metric',
                text: "A North Star Metric is the single number that best captures the core value your product delivers to customers. Airbnb's is nights booked. Spotify's is time spent listening. Facebook's was daily active users. The NSM aligns all teams — product, engineering, marketing — around the same goal. Every sub-metric and project should be justified by its impact on the NSM.",
              },
            ],
            takeaways: [
              'Three growth engines: viral (K>1), sticky (high retention), paid (LTV > CAC)',
              'A North Star Metric aligns all teams around the one number that reflects core customer value',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c6_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Growth Strategies Quiz',
            forLesson: 'Growth Strategies',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of digital growth strategies.',
            questions: [
              {
                question: 'Viral growth (K-factor > 1) means:',
                options: [
                  'The product grows faster than competitors',
                  'Each user brings in more than one new user on average',
                  'Growth comes primarily from social media',
                  'The product has positive word-of-mouth',
                ],
                correctIndex: 1,
              },
              {
                question: 'Paid growth is sustainable when:',
                options: [
                  'The company has enough marketing budget',
                  'Customer lifetime value (LTV) exceeds acquisition cost (CAC)',
                  'The product is in a high-growth market',
                  'The paid channel has low competition',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Investing heavily in paid acquisition before fixing retention is dangerous because:',
                options: [
                  'Paid channels become more expensive over time',
                  'You are filling a leaky bucket — acquired users churn before generating value',
                  'Investors prefer organic growth',
                  'Paid acquisition requires a large team',
                ],
                correctIndex: 1,
              },
              {
                question: 'A North Star Metric is chosen because:',
                options: [
                  'It is easy to measure weekly',
                  'It is reported to investors each quarter',
                  'It best captures the core value the product delivers to customers',
                  'It is the metric the CEO monitors personally',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Growth Engine Analysis',
            forLesson: 'Growth Strategies',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Choose a digital company and identify which growth engine(s) it uses. Then propose a North Star Metric and justify your choice.',
            requirements: [
              'Growth engine(s) identified with evidence',
              'North Star Metric proposed in a single measurable statement',
              'Justify why the NSM captures core customer value for this specific business',
            ],
          },
        ],
      },
      {
        id: 'c6_l6',
        title: 'Funding & Financial Basics',
        documents: [],
        videos: [
          {
            id: 'c6_v3',
            kind: 'video',
            title: 'Funding & Financial Basics',
            duration: '13 min',
            intro:
              'Understanding funding stages and startup financial fundamentals prevents entrepreneurs from running out of money at the worst possible moment.',
            topics: [
              'Funding stages: bootstrapping, friends & family, angel, seed, Series A+',
              'Unit economics: CAC, LTV, and payback period',
              'Burn rate and runway — how long until you run out of money',
              'When to raise vs. when to grow from revenue',
            ],
            moments: [
              { time: '0:00', label: 'Funding stage overview' },
              { time: '3:10', label: 'Unit economics fundamentals' },
              { time: '7:20', label: 'Burn rate and runway' },
              { time: '10:40', label: 'Raise vs. revenue growth decision' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c6_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Funding & Financial Basics Quiz',
            forLesson: 'Funding & Financial Basics',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of startup funding and financial concepts.',
            questions: [
              {
                question: 'Runway is defined as:',
                options: [
                  'The time until the next funding round',
                  'How long the company can operate before running out of cash at the current burn rate',
                  'The maximum monthly spending allowed by investors',
                  'The period before a startup reaches profitability',
                ],
                correctIndex: 1,
              },
              {
                question: 'CAC (Customer Acquisition Cost) is calculated as:',
                options: [
                  'Total revenue divided by number of customers',
                  'Total sales and marketing spend divided by new customers acquired in the period',
                  'Average revenue per user minus cost of goods',
                  'Monthly recurring revenue minus churn',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A healthy LTV:CAC ratio for a SaaS business is typically:',
                options: [
                  '1:1 (LTV equals CAC)',
                  'Greater than 3:1 (LTV is at least 3x the acquisition cost)',
                  '10:1 (LTV is 10x CAC — the higher the better)',
                  'Less than 1:1 (acquiring cheaply is always best)',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The best time to raise external funding is generally:',
                options: [
                  'When the company is running out of cash',
                  'When you have enough leverage — traction that makes investors compete to invest',
                  'Before the product is built, to fund development',
                  'After reaching profitability',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Unit Economics Model',
            forLesson: 'Funding & Financial Basics',
            dueDate: 'Jul 19',
            submission: 'File or link upload',
            instructions:
              'Build a simple unit economics model for a hypothetical subscription business. Calculate CAC, LTV, payback period, and 12-month runway with stated assumptions.',
            requirements: [
              'CAC, LTV, and payback period calculated with assumptions stated',
              'Runway calculated using a monthly burn rate you define',
              'Identify one change (to pricing, churn, or CAC) that would improve the economics most',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 7: Environmental Leadership ───────────────────────────────────────

export const C7_MODULES: ReviewModule[] = [
  {
    id: 'c7_m1',
    title: 'Module 1: Understanding Environmental Challenges',
    lessons: [
      {
        id: 'c7_l1',
        title: 'Climate Science Fundamentals',
        documents: [
          {
            id: 'c7_d1',
            kind: 'document',
            title: 'Climate Science Fundamentals',
            readTime: '5 – 6 min read',
            intro:
              'Effective environmental leadership starts with understanding the science. Here is what the evidence actually says.',
            objectives: [
              'Explain the greenhouse effect and the role of human activity in climate change',
              'Distinguish between climate and weather and interpret scientific consensus',
            ],
            sections: [
              {
                heading: 'The Greenhouse Effect',
                text: "The Earth's atmosphere acts like a blanket: greenhouse gases (CO2, methane, nitrous oxide, water vapour) absorb outgoing infrared radiation and re-emit it in all directions, including back to the surface. This keeps the planet warm enough to sustain life. Human industrial activity since 1750 has increased atmospheric CO2 from 280 ppm to over 420 ppm — a 50% increase, driving an enhanced greenhouse effect and global average temperature increase of approximately 1.2°C above pre-industrial levels.",
                tip: 'Global average temperature rise of 1.5°C is a critical threshold: above it, the frequency and severity of extreme weather events increases dramatically.',
              },
              {
                heading: 'Climate vs. Weather',
                text: 'Weather is what happens on a given day; climate is the pattern over decades. A cold winter does not contradict climate change any more than one expensive meal contradicts inflation. Climate science measures trends over 30+ years. The scientific consensus — represented by 97%+ of actively publishing climate scientists and every major scientific organisation globally — is that current warming is primarily human-caused.',
              },
            ],
            takeaways: [
              'Human activity has increased atmospheric CO2 by 50% since industrialisation, driving ~1.2°C warming',
              '97%+ of climate scientists agree: current warming is primarily human-caused',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c7_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Climate Science Quiz',
            forLesson: 'Climate Science Fundamentals',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of climate science fundamentals.',
            questions: [
              {
                question: 'The greenhouse effect works by:',
                options: [
                  'Blocking sunlight from reaching Earth',
                  'Trapping heat in the atmosphere by absorbing and re-emitting infrared radiation',
                  'Reducing the ozone layer',
                  'Increasing solar activity',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Since industrialisation, atmospheric CO2 has increased by approximately:',
                options: ['10%', '25%', '50%', '100%'],
                correctIndex: 2,
              },
              {
                question: 'The 1.5°C warming threshold is significant because:',
                options: [
                  'It is the point of irreversible ice cap melting',
                  'Above it, extreme weather events increase dramatically in frequency and severity',
                  'It triggers automatic international climate agreements',
                  'It is the maximum warming the greenhouse effect can produce',
                ],
                correctIndex: 1,
              },
              {
                question: 'Scientific consensus on climate change means:',
                options: [
                  'All scientists agree on every detail of climate projections',
                  '97%+ of actively publishing climate scientists agree it is primarily human-caused',
                  'The UN has voted to accept the science officially',
                  'Climate models have been proven 100% accurate',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Carbon Footprint Audit',
            forLesson: 'Climate Science Fundamentals',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Estimate your personal annual carbon footprint across three categories (transport, diet, and home energy). Identify your largest source and one realistic reduction.',
            requirements: [
              'Estimate for each of the three categories with reasoning',
              'Identify the largest single source of your footprint',
              'One specific, measurable reduction action with estimated CO2 impact',
            ],
          },
        ],
      },
      {
        id: 'c7_l2',
        title: 'Sustainability Frameworks',
        documents: [],
        videos: [
          {
            id: 'c7_v1',
            kind: 'video',
            title: 'Sustainability Frameworks',
            duration: '13 min',
            intro:
              'Sustainability is now a strategic imperative, not just a values statement. Learn the frameworks leaders use to manage it.',
            topics: [
              'The triple bottom line: people, planet, profit',
              'The UN Sustainable Development Goals (SDGs) and their business relevance',
              'ESG (Environmental, Social, Governance) as an investor and stakeholder lens',
              'Circular economy principles: from "take-make-waste" to closed loops',
            ],
            moments: [
              { time: '0:00', label: 'Why sustainability is now strategic' },
              { time: '2:50', label: 'Triple bottom line and SDGs' },
              { time: '6:30', label: 'ESG as a leadership framework' },
              { time: '10:20', label: 'Circular economy in practice' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c7_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Sustainability Frameworks Quiz',
            forLesson: 'Sustainability Frameworks',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of sustainability frameworks.',
            questions: [
              {
                question: 'The triple bottom line measures performance across:',
                options: [
                  'Revenue, cost, and profit',
                  'People, planet, and profit',
                  'Economic, social, and cultural outcomes',
                  'Short, medium, and long-term results',
                ],
                correctIndex: 1,
              },
              {
                question: 'ESG investing considers:',
                options: [
                  'Only environmental factors',
                  'Environmental, Social, and Governance factors in investment decisions',
                  'Ethical, Sustainable, and Green criteria',
                  'Economic, Social, and Geographic factors',
                ],
                correctIndex: 1,
              },
              {
                question: 'A circular economy aims to:',
                options: [
                  'Maximise output with minimum labour cost',
                  'Eliminate waste by keeping materials in use through closed loops',
                  'Circulate products through multiple retail channels',
                  'Reduce production to sustainable levels',
                ],
                correctIndex: 1,
              },
              {
                question: 'The UN SDGs are relevant to businesses because:',
                options: [
                  'All companies must report SDG progress by law',
                  'They identify global problems that also represent business opportunities and risks',
                  'They replace national regulatory frameworks',
                  'They apply only to companies with 500+ employees',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'SDG Alignment',
            forLesson: 'Sustainability Frameworks',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Choose any organisation (your own, an employer, or a public company). Identify two SDGs most relevant to its operations and describe one action it currently takes (or should take) toward each.',
            requirements: [
              'Two SDGs named with numbers and titles',
              "Relevance to the organisation's operations explained",
              'One existing or proposed action per SDG with a measurable outcome',
            ],
          },
        ],
      },
      {
        id: 'c7_l3',
        title: 'Leading Environmental Change',
        documents: [
          {
            id: 'c7_d2',
            kind: 'document',
            title: 'Leading Environmental Change',
            readTime: '4 – 5 min read',
            intro:
              'Environmental leadership requires the skills to turn sustainability commitments into operational reality — inside organisations and across supply chains.',
            objectives: [
              'Apply stakeholder mapping to an environmental initiative',
              'Design a measurable sustainability commitment using SMART criteria',
            ],
            sections: [
              {
                heading: 'Stakeholder-Centred Sustainability',
                text: 'Environmental initiatives fail most often not because of technical difficulty but because of stakeholder misalignment. Employees, investors, regulators, customers, and local communities all have different stakes in sustainability outcomes. Effective environmental leaders map stakeholders early, identify conflicting interests, and design initiatives that create value for the most influential groups while managing trade-offs for others.',
                tip: 'Frame environmental initiatives in terms of business value to the stakeholder, not just values. "Reducing energy use by 20% cuts operating costs by $X" lands better than "it\'s the right thing to do."',
              },
              {
                heading: 'Measuring What Matters',
                text: 'Sustainability commitments without measurement are just intentions. The GHG Protocol provides the global standard for carbon accounting across three scopes. Scope 1: direct emissions from owned operations. Scope 2: indirect emissions from purchased energy. Scope 3: all other indirect emissions — supply chain, product use, disposal. For most organisations, Scope 3 represents 70–90% of total emissions, making supplier engagement a strategic priority.',
              },
            ],
            takeaways: [
              'Environmental initiatives fail most often from stakeholder misalignment, not technical difficulty',
              "Scope 3 emissions represent 70–90% of most organisations' total footprint — supply chain engagement is essential",
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c7_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Environmental Leadership Quiz',
            forLesson: 'Leading Environmental Change',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of leading environmental change initiatives.',
            questions: [
              {
                question:
                  'Environmental initiatives most often fail because of:',
                options: [
                  'Insufficient funding',
                  'Technical complexity beyond current capability',
                  'Stakeholder misalignment',
                  'Regulatory obstacles',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Framing environmental initiatives in terms of business value means:',
                options: [
                  'Ignoring environmental benefits to focus on profit',
                  'Connecting the sustainability outcome to cost savings, risk reduction, or revenue',
                  'Only pursuing initiatives that are immediately profitable',
                  'Avoiding sustainability language in business communication',
                ],
                correctIndex: 1,
              },
              {
                question: 'Scope 3 emissions include:',
                options: [
                  'Emissions from owned company vehicles',
                  'Purchased electricity and heat',
                  'All indirect emissions from the value chain — supply chain, product use, disposal',
                  'Emissions from employee commuting only',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'For most organisations, which emission scope is largest?',
                options: [
                  'Scope 1 (direct operations)',
                  'Scope 2 (purchased energy)',
                  'Scope 3 (value chain)',
                  'All scopes are typically equal',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Sustainability Initiative Design',
            forLesson: 'Leading Environmental Change',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design a SMART sustainability initiative for a real or hypothetical organisation. Map the key stakeholders and explain how you would frame the initiative for each group.',
            requirements: [
              'SMART goal stated (Specific, Measurable, Achievable, Relevant, Time-bound)',
              'Three stakeholders identified with their primary interest in the initiative',
              'How you would frame the initiative differently for each stakeholder group',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c7_m2',
    title: 'Module 2: Environmental Strategy in Practice',
    lessons: [
      {
        id: 'c7_l4',
        title: 'Net Zero Strategy',
        documents: [],
        videos: [
          {
            id: 'c7_v2',
            kind: 'video',
            title: 'Net Zero Strategy',
            duration: '13 min',
            intro:
              'Net zero is the defining sustainability commitment of the decade. Learn what it actually requires and how to build a credible pathway.',
            topics: [
              'Net zero vs. carbon neutral vs. carbon negative — what each means',
              'Science-Based Targets Initiative (SBTi) and credible commitments',
              'The role of carbon offsets — and their limitations',
              'Building a net zero roadmap: reduction first, then removal',
            ],
            moments: [
              { time: '0:00', label: 'Net zero definitions and confusion' },
              { time: '3:00', label: 'Science-Based Targets' },
              { time: '6:40', label: 'Carbon offsets: value and limits' },
              { time: '10:20', label: 'Building a credible roadmap' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c7_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Net Zero Strategy Quiz',
            forLesson: 'Net Zero Strategy',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of net zero strategy.',
            questions: [
              {
                question: 'Net zero means:',
                options: [
                  'Zero emissions from all company operations',
                  'Balancing emissions produced with emissions removed from the atmosphere',
                  'Purchasing enough carbon offsets to cancel all emissions',
                  'Only emitting what renewable energy can offset',
                ],
                correctIndex: 1,
              },
              {
                question: 'Science-Based Targets (SBTi) are valuable because:',
                options: [
                  'They are cheaper than self-set targets',
                  'They align corporate commitments with what climate science says is needed to limit warming',
                  'They are legally required in most countries',
                  'They automatically certify a company as net zero',
                ],
                correctIndex: 1,
              },
              {
                question: 'Carbon offsets should primarily be used:',
                options: [
                  'As the main strategy for achieving net zero',
                  'To offset residual hard-to-abate emissions after maximum reduction efforts',
                  'Instead of operational emission reductions',
                  'Only for Scope 1 emissions',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The correct priority order for a net zero roadmap is:',
                options: [
                  'Remove → Offset → Reduce',
                  'Offset → Reduce → Remove',
                  'Reduce first, then remove residual emissions',
                  'All three should be pursued simultaneously with equal emphasis',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Net Zero Gap Analysis',
            forLesson: 'Net Zero Strategy',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Research the net zero commitment of a publicly listed company. Evaluate its credibility against three criteria: scope coverage, timeline, and reduction vs. offset ratio.',
            requirements: [
              "Company's stated net zero commitment summarised",
              'Evaluated against all three criteria with evidence from public disclosures',
              'Rate the commitment as credible, partially credible, or greenwashing — with justification',
            ],
          },
        ],
      },
      {
        id: 'c7_l5',
        title: 'Green Innovation',
        documents: [
          {
            id: 'c7_d3',
            kind: 'document',
            title: 'Green Innovation',
            readTime: '4 – 5 min read',
            intro:
              'The most durable environmental solutions are those embedded in business models, not bolt-on CSR programmes. Green innovation creates competitive advantage while reducing impact.',
            objectives: [
              'Identify opportunities for green innovation within existing business models',
              'Distinguish between incremental eco-efficiency and transformative green innovation',
            ],
            sections: [
              {
                heading: 'Two Types of Green Innovation',
                text: 'Eco-efficiency is doing the same things with less impact: LED lighting, fuel-efficient trucks, paperless processes. These are important but limited — you can only be so efficient before hitting a ceiling. Green innovation redesigns the underlying system: Interface Carpet\'s "Mission Zero" replaced the take-make-waste model with modular tiles designed for perpetual reuse. Unilever\'s concentrated laundry products reduced packaging and water 50%+ by redesigning the formula, not just the packaging.',
                tip: 'Ask: what would our product look like if we designed for zero waste from the start? That question leads to green innovation, not just eco-efficiency.',
              },
              {
                heading: 'Business Case for Green Innovation',
                text: 'The business case for green innovation operates across three dimensions: cost (energy, waste, and resource costs decline), revenue (premium pricing for sustainable products and access to ESG-focused investors and procurement), and risk (regulatory exposure, supply chain resilience, and reputational risk all improve). Organisations that wait for regulation to force action typically spend more and gain less than those who move proactively.',
              },
            ],
            takeaways: [
              'Eco-efficiency reduces impact; green innovation redesigns the system — both are needed, but only the latter creates competitive advantage',
              'Green innovation improves costs, revenue, and risk simultaneously',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c7_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Green Innovation Quiz',
            forLesson: 'Green Innovation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of green innovation concepts.',
            questions: [
              {
                question:
                  'Eco-efficiency differs from green innovation because:',
                options: [
                  'Eco-efficiency is cheaper to implement',
                  'Eco-efficiency does the same thing with less impact; green innovation redesigns the system',
                  'Green innovation only applies to manufacturing',
                  'Eco-efficiency is required by regulation; green innovation is optional',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Green innovation creates competitive advantage primarily by:',
                options: [
                  'Qualifying for government subsidies',
                  'Reducing costs, creating premium revenue, and reducing risk simultaneously',
                  'Making the company appear more ethical than competitors',
                  'Cutting R&D costs through simpler product designs',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Organisations that wait for regulation to force environmental action typically:',
                options: [
                  'Pay less because they have more time to prepare',
                  'Spend more and gain less than proactive movers',
                  'Benefit from watching competitors make costly mistakes first',
                  'Face no disadvantage if they comply when required',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The design question that leads to green innovation (not just eco-efficiency) is:',
                options: [
                  '"How can we use 10% less energy?"',
                  '"What would this product look like if designed for zero waste from the start?"',
                  '"How do we offset our remaining emissions?"',
                  '"What sustainability standard should we certify against?"',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Green Innovation Brief',
            forLesson: 'Green Innovation',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Choose a product or service in any industry. Identify one eco-efficiency improvement and one green innovation opportunity. Write a 200-word business case for the green innovation.',
            requirements: [
              'Eco-efficiency improvement described (what, estimated impact)',
              'Green innovation described: how it redesigns the underlying system',
              'Business case covers cost, revenue, and risk dimensions for the green innovation',
            ],
          },
        ],
      },
      {
        id: 'c7_l6',
        title: 'Environmental Communication & Advocacy',
        documents: [],
        videos: [
          {
            id: 'c7_v3',
            kind: 'video',
            title: 'Environmental Communication & Advocacy',
            duration: '12 min',
            intro:
              'How environmental leaders communicate is as important as what they communicate. Greenwashing destroys trust; authentic communication builds it.',
            topics: [
              'Greenwashing: what it is, how it happens, and why it backfires',
              'Communicating uncertainty honestly without undermining credibility',
              'Internal advocacy: building the business case for sustainability',
              'External advocacy: engaging media, regulators, and communities',
            ],
            moments: [
              { time: '0:00', label: 'What is greenwashing?' },
              { time: '2:50', label: 'Honest uncertainty communication' },
              { time: '6:30', label: 'Internal business case' },
              { time: '9:40', label: 'External advocacy principles' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c7_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Environmental Communication Quiz',
            forLesson: 'Environmental Communication & Advocacy',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of environmental communication and greenwashing.',
            questions: [
              {
                question: 'Greenwashing is harmful primarily because:',
                options: [
                  'It violates advertising standards in most countries',
                  'It destroys trust when discovered and slows real progress by rewarding symbolic action',
                  'It makes authentic sustainable brands less competitive',
                  'It is illegal in the European Union',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Communicating scientific uncertainty honestly means:',
                options: [
                  'Admitting that climate science is not settled',
                  'Stating the range and confidence level of predictions rather than hiding uncertainty',
                  'Avoiding specific claims about environmental impact',
                  'Only making claims that have 100% scientific certainty',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When building an internal business case for sustainability, the most persuasive framing is:',
                options: [
                  'Moral responsibility to future generations',
                  'Regulatory compliance requirements',
                  'Quantified business value: cost savings, revenue, and risk reduction',
                  'Competitor benchmarking showing you are behind',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'A credible external sustainability claim should include:',
                options: [
                  'Only positive outcomes and progress',
                  'Specific, measurable commitments with third-party verification where possible',
                  'Emotional appeals to environmental values',
                  'Comparison with the worst performers in the industry',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Sustainability Communication Audit',
            forLesson: 'Environmental Communication & Advocacy',
            dueDate: 'Jul 19',
            submission: 'Text response',
            instructions:
              'Find a sustainability claim from a real company (website, annual report, or advertisement). Evaluate whether it is authentic or greenwashing and rewrite it to meet the credibility standard from this lesson.',
            requirements: [
              'Original claim quoted accurately with source cited',
              'Greenwashing evaluation against three specific criteria',
              'Rewritten version that is specific, measurable, and honestly qualified',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 8: Data-Driven Decision Making ─────────────────────────────────────

export const C8_MODULES: ReviewModule[] = [
  {
    id: 'c8_m1',
    title: 'Module 1: Data Thinking',
    lessons: [
      {
        id: 'c8_l1',
        title: 'From Intuition to Evidence',
        documents: [
          {
            id: 'c8_d1',
            kind: 'document',
            title: 'From Intuition to Evidence',
            readTime: '4 – 5 min read',
            intro:
              'Data-driven decision making does not replace judgment — it disciplines it. Learn where intuition fails and where data helps most.',
            objectives: [
              'Identify the cognitive biases that undermine intuitive decisions',
              'Apply a decision-quality framework to distinguish good decisions from good outcomes',
            ],
            sections: [
              {
                heading: 'When Intuition Fails',
                text: 'Human intuition evolved for a world of small groups, immediate threats, and visible cause-and-effect. It systematically fails in environments with large samples, delayed feedback, and hidden variables — which describes most modern business decisions. Confirmation bias (seeking information that confirms existing beliefs), availability bias (overweighting recent and memorable events), and anchoring (being disproportionately influenced by the first number heard) are the three most costly cognitive errors in business decision-making.',
                tip: 'The question is not "should I trust data or my gut?" It is "which kinds of decisions does each handle better?"',
              },
              {
                heading: 'Decision Quality vs. Outcome Quality',
                text: 'A good decision can produce a bad outcome (bad luck). A bad decision can produce a good outcome (good luck). Confusing these is one of the most dangerous errors in management — it leads to reinforcing bad decision processes that happened to work and abandoning good ones that happened to fail. Decision quality is measured by the process: was the right information gathered, were the right options considered, was uncertainty acknowledged honestly?',
              },
            ],
            takeaways: [
              'Three most costly cognitive biases in decisions: confirmation bias, availability bias, and anchoring',
              'Evaluate the decision process, not just the outcome — good process with bad outcome is still a good decision',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c8_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Decision Thinking Quiz',
            forLesson: 'From Intuition to Evidence',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of cognitive biases in decision-making.',
            questions: [
              {
                question: 'Confirmation bias in decision-making means:',
                options: [
                  'Making decisions based on confirmed data only',
                  'Seeking information that confirms existing beliefs and discounting contradictory evidence',
                  'Confirming decisions with multiple stakeholders before acting',
                  'Only using data that has been peer-reviewed',
                ],
                correctIndex: 1,
              },
              {
                question: 'Anchoring bias occurs when:',
                options: [
                  'You rely too heavily on the first number or piece of information encountered',
                  'You anchor your decision to company strategy',
                  'You use historical averages as the baseline',
                  'You are anchored to a specific decision-making framework',
                ],
                correctIndex: 0,
              },
              {
                question: 'A good decision that produces a bad outcome means:',
                options: [
                  'The decision was actually bad — outcomes reveal process quality',
                  'The decision process was sound but the outcome was affected by factors outside the model',
                  'The data used was incorrect',
                  'The decision needs to be revisited immediately',
                ],
                correctIndex: 1,
              },
              {
                question: 'Decision quality is best measured by:',
                options: [
                  'The outcome — whether the decision led to profit or loss',
                  'The process — whether the right information was gathered and options considered',
                  'The speed of implementation',
                  'Whether stakeholders agreed with the decision',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Bias Audit',
            forLesson: 'From Intuition to Evidence',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Recall a decision you or an organisation made that turned out to be wrong. Analyse it for cognitive biases and redesign the decision process to reduce the identified biases.',
            requirements: [
              'Decision described with its outcome',
              'At least two cognitive biases identified with specific evidence of their influence',
              'Redesigned process: one change per bias that would reduce its influence',
            ],
          },
        ],
      },
      {
        id: 'c8_l2',
        title: 'Working with Data',
        documents: [],
        videos: [
          {
            id: 'c8_v1',
            kind: 'video',
            title: 'Working with Data',
            duration: '14 min',
            intro:
              'Good decisions require good data. Learn to assess data quality, read basic analyses, and avoid the most common analytical mistakes.',
            topics: [
              'Data quality dimensions: accuracy, completeness, timeliness, and consistency',
              'Descriptive vs. diagnostic vs. predictive analytics — which to use when',
              'Correlation vs. causation — the most dangerous confusion in data analysis',
              "Simpson's paradox and why aggregated data can lie",
            ],
            moments: [
              { time: '0:00', label: 'Data quality dimensions' },
              { time: '3:10', label: 'Types of analytics' },
              { time: '7:00', label: 'Correlation vs. causation' },
              { time: '10:30', label: "Simpson's paradox illustrated" },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c8_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Working with Data Quiz',
            forLesson: 'Working with Data',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of data quality and analytics types.',
            questions: [
              {
                question: 'Descriptive analytics answers the question:',
                options: [
                  '"Why did it happen?"',
                  '"What happened?"',
                  '"What will happen?"',
                  '"What should we do?"',
                ],
                correctIndex: 1,
              },
              {
                question: 'A correlation between two variables proves:',
                options: [
                  'That one variable causes the other to change',
                  'That the two variables tend to move together — causation is not established',
                  'That both variables are influenced by a third factor',
                  'That the relationship will continue in the future',
                ],
                correctIndex: 1,
              },
              {
                question: "Simpson's paradox occurs when:",
                options: [
                  'A trend appears in data subgroups but reverses when the groups are combined',
                  'Two datasets with the same mean have different distributions',
                  'A correlation disappears when controlling for a third variable',
                  'Data from two different time periods cannot be compared directly',
                ],
                correctIndex: 0,
              },
              {
                question: 'Data timeliness refers to:',
                options: [
                  'How quickly data is processed after collection',
                  'Whether the data accurately reflects current reality for the purpose it is being used for',
                  'The time required to run an analysis',
                  'How often data is updated in the database',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Correlation Analysis',
            forLesson: 'Working with Data',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Find a real example (from news, research, or business) where correlation was incorrectly presented as causation. Explain the correct interpretation and identify one possible confounding variable.',
            requirements: [
              'Real example cited with source',
              'Explain why the correlation does not establish causation',
              'One plausible confounding variable that could explain the relationship',
            ],
          },
        ],
      },
      {
        id: 'c8_l3',
        title: 'Building Data Culture',
        documents: [
          {
            id: 'c8_d2',
            kind: 'document',
            title: 'Building Data Culture',
            readTime: '4 – 5 min read',
            intro:
              'Tools alone do not create data-driven organisations. Culture does. Learn how leaders build environments where evidence wins over HiPPO.',
            objectives: [
              'Define data culture and the leadership behaviours that create it',
              'Identify the organisational barriers to data-driven decision making and how to remove them',
            ],
            sections: [
              {
                heading: 'HiPPO and Data Culture',
                text: 'HiPPO stands for Highest-Paid Person\'s Opinion. In organisations without data culture, decisions follow whoever is most senior, regardless of evidence. A data culture replaces this with norms where any team member can challenge a decision with data, where "I have a feeling" is treated differently from "the data suggests," and where leaders model curiosity by asking "what does the evidence say?" before expressing their own opinion.',
                tip: 'Leaders who announce their opinion first kill data culture. Ask the question first. Share your view after the data has been presented.',
              },
              {
                heading: 'Organisational Barriers',
                text: "Four common barriers to data culture: (1) Data silos — different departments own data that no one else can access. (2) Fear of being wrong — people suppress unfavourable data to avoid accountability. (3) Analysis paralysis — waiting for perfect data before deciding. (4) No feedback loops — decisions are made but their outcomes are never measured, so learning is impossible. The leader's job is to remove each of these through structural and behavioural change.",
              },
            ],
            takeaways: [
              "HiPPO culture (Highest-Paid Person's Opinion) is the enemy of data-driven decisions — leaders must ask first, then share their view",
              'Four barriers: data silos, fear of being wrong, analysis paralysis, and no feedback loops',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c8_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Data Culture Quiz',
            forLesson: 'Building Data Culture',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of data culture and organisational barriers.',
            questions: [
              {
                question: 'HiPPO in organisations refers to:',
                options: [
                  'A data visualisation tool',
                  "Decisions following the Highest-Paid Person's Opinion regardless of evidence",
                  'A high-performance data processing system',
                  'Hierarchical Permission Protocol for Organisational data',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A leader who asks for data BEFORE sharing their own opinion is:',
                options: [
                  'Showing indecisiveness',
                  'Protecting data culture by ensuring evidence is heard first',
                  'Failing to provide leadership',
                  'Slowing down decision-making unnecessarily',
                ],
                correctIndex: 1,
              },
              {
                question: 'Analysis paralysis refers to:',
                options: [
                  'A technical failure in analytics systems',
                  'Waiting for perfect data before making any decision, causing inaction',
                  'Running too many analyses simultaneously',
                  'Paralysing an organisation with too many dashboards',
                ],
                correctIndex: 1,
              },
              {
                question: 'Data silos harm decision-making by:',
                options: [
                  'Causing data to become outdated quickly',
                  'Preventing relevant information from reaching the people who need it',
                  'Requiring expensive data integration projects',
                  'Making data too accessible, increasing security risk',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Data Culture Assessment',
            forLesson: 'Building Data Culture',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Assess the data culture of an organisation you know (your workplace, university, or a case study). Rate it 1–5 on each of the four barriers and propose one action to address the most critical barrier.',
            requirements: [
              'Rating on all four barriers with specific evidence for each',
              'Most critical barrier identified and justified',
              'One concrete action that would reduce the barrier, with a way to measure its impact',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c8_m2',
    title: 'Module 2: Applied Data Decision Making',
    lessons: [
      {
        id: 'c8_l4',
        title: 'A/B Testing & Experimentation',
        documents: [],
        videos: [
          {
            id: 'c8_v2',
            kind: 'video',
            title: 'A/B Testing & Experimentation',
            duration: '13 min',
            intro:
              'A/B testing lets you replace opinions with evidence. Learn how to run experiments that produce trustworthy answers.',
            topics: [
              'What A/B testing is and when to use it',
              'Statistical significance: what it means and common misconceptions',
              'Sample size, run time, and why both matter',
              'Common A/B testing mistakes that invalidate results',
            ],
            moments: [
              { time: '0:00', label: 'What is A/B testing?' },
              { time: '2:40', label: 'Statistical significance explained' },
              { time: '6:30', label: 'Sample size and run time' },
              { time: '10:20', label: 'Common mistakes' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c8_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'A/B Testing Quiz',
            forLesson: 'A/B Testing & Experimentation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of A/B testing principles.',
            questions: [
              {
                question: 'Statistical significance (p < 0.05) means:',
                options: [
                  'There is a 95% chance the result is correct',
                  'If there were no real effect, results this extreme would occur less than 5% of the time by chance',
                  'The experiment is 95% complete',
                  'The business impact is significant enough to act on',
                ],
                correctIndex: 1,
              },
              {
                question: 'Why does sample size matter in A/B testing?',
                options: [
                  'Larger samples are always more expensive',
                  'Small samples cannot detect small effects reliably — they have insufficient statistical power',
                  'Regulators require minimum sample sizes for valid experiments',
                  'Larger samples run faster',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Stopping an A/B test early when you see a winning result is problematic because:',
                options: [
                  'It is unethical to end experiments early',
                  'Early results are typically more extreme than final results — false positives increase',
                  'The test needs a minimum runtime regardless of results',
                  'Statistical significance cannot be calculated for partial data',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In a valid A/B test, the only thing that should differ between groups A and B is:',
                options: [
                  'The sample size in each group',
                  'The one variable being tested',
                  'The time period of observation',
                  'The geographic region of users',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Experiment Design',
            forLesson: 'A/B Testing & Experimentation',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Design an A/B test for a real or hypothetical product decision (e.g. a different call-to-action button, email subject line, or pricing page). Specify the hypothesis, metric, and success criteria.',
            requirements: [
              'Hypothesis stated in the form: "Changing X will increase Y by Z%"',
              'Primary metric defined with how it is measured',
              'Success threshold and minimum runtime defined with reasoning',
            ],
          },
        ],
      },
      {
        id: 'c8_l5',
        title: 'Data Visualisation for Decisions',
        documents: [
          {
            id: 'c8_d3',
            kind: 'document',
            title: 'Data Visualisation for Decisions',
            readTime: '4 – 5 min read',
            intro:
              'The right chart can make a complex dataset instantly obvious. The wrong chart can hide the truth in plain sight.',
            objectives: [
              'Match the right chart type to the type of data comparison being made',
              'Apply the principle of "data-ink ratio" to create clear, honest visualisations',
            ],
            sections: [
              {
                heading: 'Choosing the Right Chart',
                text: 'Four main comparison types and the charts that serve them: (1) Distribution — histogram, box plot. (2) Composition — stacked bar, pie chart (use sparingly). (3) Relationship — scatter plot, bubble chart. (4) Comparison over time — line chart for trends, bar chart for discrete periods. The most common mistake is using a pie chart for more than 4–5 categories (slices become meaningless) and using bar charts for continuous time trends (use a line instead).',
                tip: "If you can't describe in one sentence what the chart is showing, the chart design needs to change, not the description.",
              },
              {
                heading: 'Data-Ink Ratio',
                text: 'Edward Tufte\'s principle: maximise the ratio of "data ink" (ink that represents actual data) to "non-data ink" (gridlines, borders, background colours, 3D effects, decorations). Remove every element that does not help the reader understand the data. 3D charts are the most egregious offenders — they distort proportions and add no information. The best chart is the simplest one that makes the pattern visible.',
              },
            ],
            takeaways: [
              'Match chart type to comparison type: distribution, composition, relationship, or time comparison',
              'Maximise data-ink ratio: remove everything that does not help the reader understand the data',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c8_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Data Visualisation Quiz',
            forLesson: 'Data Visualisation for Decisions',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your ability to select and evaluate data visualisations.',
            questions: [
              {
                question:
                  'For showing a trend over time with continuous data, the best chart is:',
                options: [
                  'A pie chart',
                  'A bar chart',
                  'A line chart',
                  'A scatter plot',
                ],
                correctIndex: 2,
              },
              {
                question: 'The data-ink ratio principle states:',
                options: [
                  'Use as much ink as possible to make charts visually impressive',
                  'Maximise the proportion of ink that represents actual data, and minimise decoration',
                  'Charts should use black ink only for maximum clarity',
                  'Data density should always be maximised',
                ],
                correctIndex: 1,
              },
              {
                question: '3D charts are generally harmful because:',
                options: [
                  'They are harder to create than 2D charts',
                  'They distort proportions and add no additional information',
                  'They are not supported by most chart software',
                  'They require more colour than 2D alternatives',
                ],
                correctIndex: 1,
              },
              {
                question: 'A pie chart is inappropriate when:',
                options: [
                  'Showing composition as a percentage of a whole',
                  'There are more than 4–5 categories to display',
                  'The data is from a single time period',
                  'All slices are of similar size',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Chart Critique',
            forLesson: 'Data Visualisation for Decisions',
            dueDate: 'Jul 17',
            submission: 'File or link upload',
            instructions:
              'Find two charts in real publications (news, business reports, academic papers). Critique each: identify the chart type, whether it matches the data, and one improvement. Redraw or describe the improved version.',
            requirements: [
              'Two charts found with sources cited',
              'Chart type identified and evaluated against the data it shows',
              'One specific improvement per chart with reasoning from the lesson',
            ],
          },
        ],
      },
      {
        id: 'c8_l6',
        title: 'Building a Decision Dashboard',
        documents: [],
        videos: [
          {
            id: 'c8_v3',
            kind: 'video',
            title: 'Building a Decision Dashboard',
            duration: '12 min',
            intro:
              'A well-designed dashboard accelerates decision-making by putting the right metrics in front of the right people at the right time.',
            topics: [
              'The difference between a reporting dashboard and a decision dashboard',
              'Hierarchy of metrics: strategic, operational, and diagnostic',
              'Leading vs. lagging indicators and why you need both',
              'Common dashboard design failures and how to avoid them',
            ],
            moments: [
              { time: '0:00', label: 'Reporting vs. decision dashboards' },
              { time: '2:50', label: 'Metric hierarchy design' },
              { time: '6:30', label: 'Leading vs. lagging indicators' },
              { time: '9:40', label: 'Common failures' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c8_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Decision Dashboard Quiz',
            forLesson: 'Building a Decision Dashboard',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of dashboard design principles.',
            questions: [
              {
                question:
                  'A decision dashboard differs from a reporting dashboard by:',
                options: [
                  'Using more interactive features',
                  'Surfacing the specific metrics that trigger action, not just recording what happened',
                  'Including real-time data',
                  'Being available to all employees rather than just executives',
                ],
                correctIndex: 1,
              },
              {
                question: 'A leading indicator is:',
                options: [
                  'The most important metric on the dashboard',
                  'A metric that predicts future outcomes before they occur',
                  'Revenue or profit — the ultimate business outcomes',
                  'A metric that is always positive',
                ],
                correctIndex: 1,
              },
              {
                question: 'Why do dashboards with 30+ metrics typically fail?',
                options: [
                  'They are technically difficult to maintain',
                  'The signal is lost in noise — users cannot identify what requires action',
                  'They load too slowly for real-time use',
                  'Stakeholders disagree on which metrics to include',
                ],
                correctIndex: 1,
              },
              {
                question: 'A lagging indicator measures:',
                options: [
                  'Outcomes that have already occurred — results of past decisions',
                  'Metrics that are always reported late',
                  'Data that lags behind real-world events due to collection delays',
                  'Financial metrics that are slow to change',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Dashboard Blueprint',
            forLesson: 'Building a Decision Dashboard',
            dueDate: 'Jul 19',
            submission: 'File or link upload',
            instructions:
              'Design a decision dashboard for a real or hypothetical business function (sales, operations, customer service, etc.). Include one strategic metric, two operational metrics, and two leading indicators.',
            requirements: [
              'Five metrics total with definitions and how each is measured',
              'Each metric labelled as strategic, operational, leading, or lagging',
              'Explain what action each metric should trigger when it goes below threshold',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 9: Cross-Cultural Communication ────────────────────────────────────

export const C9_MODULES: ReviewModule[] = [
  {
    id: 'c9_m1',
    title: 'Module 1: Culture & Communication Foundations',
    lessons: [
      {
        id: 'c9_l1',
        title: 'Understanding Culture',
        documents: [
          {
            id: 'c9_d1',
            kind: 'document',
            title: 'Understanding Culture',
            readTime: '4 – 5 min read',
            intro:
              'Culture is the invisible operating system that shapes how people think, communicate, and make decisions. Understanding it is the foundation of effective cross-cultural communication.',
            objectives: [
              "Define culture using Hofstede's iceberg model",
              'Identify how cultural assumptions create communication misunderstandings',
            ],
            sections: [
              {
                heading: 'The Cultural Iceberg',
                text: 'The visible part of culture — food, dress, language, celebrations — is just the tip. Below the surface: values, beliefs about time and hierarchy, attitudes to conflict and ambiguity, concepts of face and shame, and expectations of relationships in business. These invisible elements cause the most serious cross-cultural misunderstandings because both parties are unaware they are operating from different assumptions.',
                tip: 'When something feels rude or confusing in a cross-cultural interaction, assume a cultural explanation before assuming bad intent.',
              },
              {
                heading: 'Cultural Assumptions in Communication',
                text: 'Direct vs. indirect communication is the most frequently cited dimension. But equally important are attitudes to: silence (comfortable vs. uncomfortable), disagreement (expressed directly vs. indirectly), hierarchy in conversation (junior defers entirely vs. all views expected), and time (monochronic: one task at a time, strict scheduling vs. polychronic: multiple things simultaneously, flexible scheduling). None of these is correct or incorrect — they are simply different.',
              },
            ],
            takeaways: [
              'Cultural misunderstandings usually stem from invisible values and assumptions, not visible differences',
              'Assume cultural explanation before bad intent when something feels wrong in cross-cultural interaction',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c9_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Understanding Culture Quiz',
            forLesson: 'Understanding Culture',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of cultural models.',
            questions: [
              {
                question: 'The "iceberg" model of culture refers to:',
                options: [
                  'Cold climates having more formal cultures',
                  'Visible cultural elements being just the surface; invisible values and assumptions lying beneath',
                  'Culture being difficult to change',
                  'Cultural differences growing over time like an iceberg',
                ],
                correctIndex: 1,
              },
              {
                question: 'A monochronic attitude to time means:',
                options: [
                  'Time zones are strictly observed',
                  'One task is completed at a time with strict scheduling and punctuality',
                  'Multiple relationships are maintained simultaneously',
                  'Time is seen as a renewable resource',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When something feels rude in a cross-cultural interaction, you should first:',
                options: [
                  'Correct the behaviour immediately',
                  'Assume bad intent and respond assertively',
                  'Assume a cultural explanation before assuming bad intent',
                  'Ask a local colleague to intervene',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'In a high-hierarchy communication culture, junior employees typically:',
                options: [
                  'Challenge senior views openly to show engagement',
                  'Defer to senior views and avoid direct disagreement',
                  'Communicate only in writing',
                  'Address seniors by first name to signal equality',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Cultural Self-Profile',
            forLesson: 'Understanding Culture',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Map your own cultural communication style on four dimensions from the lesson: direct/indirect, hierarchy, time attitude, and silence comfort. Identify which dimension most often causes friction in cross-cultural settings.',
            requirements: [
              'Self-rating on all four dimensions with a specific example for each',
              'Dimension that most often causes friction identified and justified',
              'One awareness practice you will adopt based on this profile',
            ],
          },
        ],
      },
      {
        id: 'c9_l2',
        title: 'Verbal & Non-Verbal Communication Across Cultures',
        documents: [],
        videos: [
          {
            id: 'c9_v1',
            kind: 'video',
            title: 'Verbal & Non-Verbal Communication Across Cultures',
            duration: '13 min',
            intro:
              'What you say and how you say it — including body language, eye contact, and silence — carries entirely different meanings across cultural contexts.',
            topics: [
              'Direct vs. indirect language: how cultures signal disagreement, refusal, and uncertainty',
              'Non-verbal signals: eye contact, personal space, gestures, and their cultural meanings',
              'Silence as communication: what it signals in different contexts',
              'Language proficiency and the ethics of communication across language barriers',
            ],
            moments: [
              { time: '0:00', label: 'Language and meaning across cultures' },
              { time: '3:00', label: 'Non-verbal signals compared' },
              { time: '6:30', label: 'Silence in different cultures' },
              {
                time: '10:00',
                label: 'Communicating across language barriers ethically',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c9_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Verbal & Non-Verbal Communication Quiz',
            forLesson: 'Verbal & Non-Verbal Communication Across Cultures',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of cross-cultural verbal and non-verbal communication.',
            questions: [
              {
                question:
                  'In many East Asian cultures, silence in a conversation often signals:',
                options: [
                  'Boredom or disengagement',
                  'Respect, thoughtfulness, or polite disagreement',
                  'Lack of language proficiency',
                  'Agreement with what was said',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Using simple vocabulary with non-native speakers is best characterised as:',
                options: [
                  'Condescending — they should manage',
                  "Respectful communication that maximises clarity without reducing the other person's dignity",
                  'Required by international communication standards',
                  'Appropriate only in writing, not spoken conversation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In high-context cultures, disagreement is often expressed:',
                options: [
                  'Directly and immediately',
                  'Through indirect signals: hesitation, silence, changing the subject',
                  'In writing rather than verbally',
                  'Through a third-party intermediary',
                ],
                correctIndex: 1,
              },
              {
                question: 'Gestures are most reliably interpreted when:',
                options: [
                  'Used with confident body language',
                  "You know the specific cultural meaning in the receiver's context",
                  "They mirror the other person's gestures",
                  'They are kept to a minimum in any cultural context',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Communication Observation',
            forLesson: 'Verbal & Non-Verbal Communication Across Cultures',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Observe a real or filmed cross-cultural interaction. Identify three moments where verbal or non-verbal signals could be misread and explain the likely cultural interpretation on each side.',
            requirements: [
              'Three specific moments described with the cultural context of each party',
              'Likely misinterpretation on each side explained',
              'One practical adaptation that would reduce misunderstanding in each moment',
            ],
          },
        ],
      },
      {
        id: 'c9_l3',
        title: 'Building Cross-Cultural Relationships',
        documents: [
          {
            id: 'c9_d2',
            kind: 'document',
            title: 'Building Cross-Cultural Relationships',
            readTime: '4 – 5 min read',
            intro:
              'Trust is built differently across cultures. In some contexts, it precedes business; in others, it follows successful business. Knowing the difference changes how you build professional relationships globally.',
            objectives: [
              'Distinguish relationship-first and task-first cultures in a professional context',
              'Apply strategies for building trust with counterparts from different cultural backgrounds',
            ],
            sections: [
              {
                heading: 'Relationship-First vs. Task-First Cultures',
                text: 'In relationship-first cultures (Brazil, China, Saudi Arabia, many African contexts), trust is personal and must be built before business can proceed. Jumping into the agenda on a first meeting signals distrust. In task-first cultures (Germany, Scandinavia, USA), trust is built through competent professional performance — relationship follows successful work. Neither is superior; what matters is knowing which culture you are operating in and adapting accordingly.',
                tip: 'When in doubt, invest more time in relationship-building than you think is necessary. The cost of being too relational is low; the cost of being too transactional is high.',
              },
              {
                heading: 'Trust Repair Across Cultures',
                text: 'When trust breaks down in cross-cultural relationships, the repair path differs. In individualist cultures, a direct apology and corrective action usually suffices. In collectivist cultures, trust repair often requires an intermediary (a mutually trusted third party), a face-saving frame for the other party, and more time — because trust was personal, not transactional, and cannot be rebuilt in a single meeting.',
              },
            ],
            takeaways: [
              'Relationship-first cultures require trust before business; task-first cultures build trust through performance — adapt to the context',
              'Trust repair in collectivist cultures requires an intermediary, face-saving, and time',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c9_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cross-Cultural Relationships Quiz',
            forLesson: 'Building Cross-Cultural Relationships',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of cross-cultural relationship building.',
            questions: [
              {
                question:
                  'In relationship-first cultures, jumping straight to the business agenda in a first meeting signals:',
                options: [
                  'Professionalism and respect for their time',
                  'Distrust — relationships must precede business',
                  'An international standard of efficiency',
                  'Confidence in the proposal',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In task-first cultures, trust is primarily built by:',
                options: [
                  'Investing time in personal relationship before work begins',
                  'Competent professional performance — trust follows successful collaboration',
                  'Formal introductions by a trusted mutual contact',
                  "Showing knowledge of the other person's culture",
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When trust breaks down in a collectivist culture, repair typically requires:',
                options: [
                  'A direct, immediate apology',
                  'A mutually trusted intermediary and face-saving framing',
                  'A written formal apology sent to all stakeholders',
                  'A restart from the beginning of the business relationship',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The advice "invest more time in relationship-building than you think necessary" is given because:',
                options: [
                  'Relationship-first cultures are the global majority',
                  'Being too relational costs little; being too transactional costs the relationship',
                  'It is always more polite than being direct',
                  'International norms require extended relationship-building periods',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Relationship Strategy',
            forLesson: 'Building Cross-Cultural Relationships',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Plan a first meeting with a counterpart from a relationship-first culture (choose a specific country). Describe how you would structure the meeting differently from your usual approach.',
            requirements: [
              'Specific country and its relationship-first characteristics described',
              'Meeting structure: what you would do differently in the first 30 minutes',
              'One topic or question you would avoid until trust is established, and why',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c9_m2',
    title: 'Module 2: Cross-Cultural Communication in Practice',
    lessons: [
      {
        id: 'c9_l4',
        title: 'Cross-Cultural Negotiation',
        documents: [],
        videos: [
          {
            id: 'c9_v2',
            kind: 'video',
            title: 'Cross-Cultural Negotiation',
            duration: '14 min',
            intro:
              'Negotiation styles differ fundamentally across cultures. What is assertive in one culture is aggressive in another; what is reasonable in one culture is weakness in another.',
            topics: [
              'Win-win vs. win-lose negotiation orientations across cultures',
              'The role of face, hierarchy, and intermediaries in negotiation',
              'How cultures treat deadlines and final offers differently',
              'Tactics for preparing for and conducting cross-cultural negotiations',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Cultural negotiation orientation differences',
              },
              { time: '3:20', label: 'Face and hierarchy in negotiation' },
              { time: '7:00', label: 'Deadlines and final offers' },
              { time: '10:30', label: 'Preparation tactics' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c9_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cross-Cultural Negotiation Quiz',
            forLesson: 'Cross-Cultural Negotiation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of cross-cultural negotiation dynamics.',
            questions: [
              {
                question:
                  'In many Asian negotiation contexts, the role of hierarchy means:',
                options: [
                  'Junior team members lead negotiations',
                  'Decisions are made in the room regardless of seniority',
                  'The most senior person present rarely speaks first — their role is to observe and decide',
                  'Seniority determines who speaks most frequently',
                ],
                correctIndex: 2,
              },
              {
                question: '"Face" in negotiation contexts means:',
                options: [
                  'Physical appearance during negotiations',
                  'Social reputation, dignity, and respect — protecting it is a priority',
                  'The front-facing position in a meeting room',
                  'Masking your true negotiating position',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When a counterpart in a high-context culture says "that will be difficult" about your proposal, they most likely mean:',
                options: [
                  'They need more time to calculate costs',
                  'No — they are declining indirectly to preserve face',
                  'They agree in principle but need more details',
                  'They will take it back for committee review',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A "final offer" deadline should be used in cross-cultural negotiations:',
                options: [
                  'As a standard closing tactic in all contexts',
                  'Cautiously — some cultures treat deadlines as negotiating positions, not absolute limits',
                  'Only in writing, never verbally',
                  'After at least three rounds of negotiation',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Negotiation Preparation',
            forLesson: 'Cross-Cultural Negotiation',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Prepare for a hypothetical negotiation with a counterpart from Japan or Brazil (choose one). Describe five specific adaptations to your usual negotiation approach.',
            requirements: [
              'Country selected with its key negotiation cultural characteristics described',
              'Five specific adaptations to your approach with reasoning for each',
              'Identify one tactic from your usual approach that you would avoid and why',
            ],
          },
        ],
      },
      {
        id: 'c9_l5',
        title: 'Managing Cross-Cultural Conflict',
        documents: [
          {
            id: 'c9_d3',
            kind: 'document',
            title: 'Managing Cross-Cultural Conflict',
            readTime: '4 – 5 min read',
            intro:
              "Cross-cultural conflict often feels more intense than it is because both parties misread the other's cultural signals as intentional provocation.",
            objectives: [
              'Apply a culturally sensitive conflict resolution process',
              'Distinguish task conflict (healthy) from relationship conflict (damaging) in cross-cultural teams',
            ],
            sections: [
              {
                heading: 'Why Cross-Cultural Conflict Escalates',
                text: "Most cross-cultural conflict begins as a small misunderstanding — a silence read as disagreement, a directness read as aggression, a delay read as disrespect. Because neither party has the cultural frame to interpret the other's behaviour charitably, each escalates defensively. The fastest de-escalation is to name what you are experiencing (\"I noticed you went quiet — I want to make sure I'm communicating clearly\") without assuming the other party's motive.",
                tip: 'Describe behaviour, not character. "The meeting started 30 minutes late" is a fact. "You don\'t respect my time" is an attribution — and likely wrong.',
              },
              {
                heading: 'Task vs. Relationship Conflict',
                text: 'Task conflict — disagreement about work, methods, and priorities — is healthy and improves decisions when managed well. Relationship conflict — personal friction and distrust — degrades performance. Cross-cultural conflicts frequently convert from task to relationship because culturally normal behaviours are misread as personal disrespect. The intervention is to reframe the conflict at the task level ("we have a disagreement about the approach, not about each other") and use cultural context to explain the behaviour.',
              },
            ],
            takeaways: [
              "Cross-cultural conflict escalates when cultural behaviour is misread as personal provocation — name the behaviour, don't attribute motive",
              'Reframe from relationship conflict to task conflict: "disagreement about the approach, not about each other"',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c9_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cross-Cultural Conflict Quiz',
            forLesson: 'Managing Cross-Cultural Conflict',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of cross-cultural conflict management.',
            questions: [
              {
                question: 'Cross-cultural conflict most commonly begins as:',
                options: [
                  'A deliberate act of cultural disrespect',
                  'A small misunderstanding where cultural signals are misread as intentional',
                  'A language barrier that prevents clear communication',
                  'A disagreement about organisational goals',
                ],
                correctIndex: 1,
              },
              {
                question:
                  '"Describe behaviour, not character" in conflict means:',
                options: [
                  "Focus on what happened, not on interpreting the other person's motives or personality",
                  'Write a formal description of the incident for HR',
                  'Avoid all personal language in conflict discussions',
                  'Use only objective data in conflict conversations',
                ],
                correctIndex: 0,
              },
              {
                question: 'Task conflict in cross-cultural teams is:',
                options: [
                  'Always damaging and should be avoided',
                  'Healthy when managed — it improves decisions by surfacing different perspectives',
                  'Less common than relationship conflict',
                  'Best resolved by the most senior person present',
                ],
                correctIndex: 1,
              },
              {
                question: 'Reframing from relationship to task conflict means:',
                options: [
                  'Ignoring the personal dimension of the conflict',
                  'Stating: "we have a disagreement about the approach, not about each other"',
                  'Delegating the conflict to a neutral mediator',
                  'Focusing on the financial impact of the conflict instead',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Conflict Script',
            forLesson: 'Managing Cross-Cultural Conflict',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Write a 200-word script for addressing a cross-cultural conflict. The situation: a team member from a high-context culture has been consistently silent in meetings, which their low-context manager has interpreted as disengagement.',
            requirements: [
              "Script written from the manager's perspective",
              'Uses behaviour description, not character attribution',
              "Explicitly reframes from relationship to task level and invites the team member's perspective",
            ],
          },
        ],
      },
      {
        id: 'c9_l6',
        title: 'Inclusive Cross-Cultural Workplaces',
        documents: [],
        videos: [
          {
            id: 'c9_v3',
            kind: 'video',
            title: 'Inclusive Cross-Cultural Workplaces',
            duration: '12 min',
            intro:
              'Diversity without inclusion is noise. Learn how to design work environments where people from all cultural backgrounds can contribute at their best.',
            topics: [
              'The difference between diversity, equity, and inclusion',
              'Structural vs. interpersonal barriers to inclusion for multicultural employees',
              'Meeting design for cross-cultural inclusion',
              'Leader behaviours that signal belonging across cultures',
            ],
            moments: [
              { time: '0:00', label: 'Diversity vs. inclusion distinction' },
              { time: '2:50', label: 'Structural barriers to inclusion' },
              { time: '6:30', label: 'Inclusive meeting design' },
              {
                time: '9:40',
                label: 'Leader behaviours that signal belonging',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c9_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Inclusive Workplaces Quiz',
            forLesson: 'Inclusive Cross-Cultural Workplaces',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of cross-cultural inclusion.',
            questions: [
              {
                question: 'Diversity without inclusion means:',
                options: [
                  'A company with employees from many countries but no inclusive practices',
                  'Having diverse perspectives but not diverse people',
                  'Hiring diverse employees who are then required to assimilate to the dominant culture',
                  'A company that values diversity in theory but not practice',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'A structural barrier to cross-cultural inclusion is:',
                options: [
                  'Personal prejudice from colleagues',
                  'Networking events scheduled in ways that systematically exclude some cultural groups',
                  'Unconscious bias in individual decision-making',
                  'Language accents affecting perceived credibility',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'For inclusive cross-cultural meetings, which practice is most effective?',
                options: [
                  'Conducting all meetings in the dominant language without accommodation',
                  'Circulating agendas in advance to allow non-native speakers to prepare contributions',
                  'Requiring all participants to speak the same amount',
                  'Avoiding silence with constant facilitation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A leader behaviour that signals belonging across cultures is:',
                options: [
                  'Treating all employees identically regardless of background',
                  'Proactively seeking input from those who are less likely to speak first in the dominant culture',
                  'Celebrating only locally significant cultural events',
                  'Avoiding cultural topics to prevent discomfort',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Inclusion Audit',
            forLesson: 'Inclusive Cross-Cultural Workplaces',
            dueDate: 'Jul 19',
            submission: 'Text response',
            instructions:
              'Conduct a brief inclusion audit of a team, class, or organisation you are part of. Identify two structural and two interpersonal barriers to cross-cultural inclusion and propose one action to address each.',
            requirements: [
              'Two structural and two interpersonal barriers identified with specific examples',
              'One action proposed per barrier',
              'Actions prioritised by expected impact vs. difficulty to implement',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 10: Community Impact & Social Change ───────────────────────────────

export const C10_MODULES: ReviewModule[] = [
  {
    id: 'c10_m1',
    title: 'Module 1: Social Change Foundations',
    lessons: [
      {
        id: 'c10_l1',
        title: 'Theories of Change',
        documents: [
          {
            id: 'c10_d1',
            kind: 'document',
            title: 'Theories of Change',
            readTime: '4 – 5 min read',
            intro:
              'Every effective social initiative has an explicit theory of change — a logic map from activities to outcomes. Without it, you are hoping, not planning.',
            objectives: [
              'Construct a theory of change for a social initiative',
              'Distinguish between outputs, outcomes, and impact in the social sector',
            ],
            sections: [
              {
                heading: 'What is a Theory of Change?',
                text: 'A theory of change is the explicit logic: "If we do X with Y resources, we will achieve Z outcome, because of these assumptions." It maps the pathway from activities (what you do) → outputs (what you produce) → outcomes (changes in knowledge, skills, behaviour) → impact (long-term changes in social conditions). Most failed social programmes fail because they measure outputs (meals served, workshops held) while hoping for impact (reduced poverty, better health), without testing the assumptions in between.',
                tip: 'State your assumptions explicitly — they are the most valuable part of a theory of change because they show you what to test.',
              },
              {
                heading: 'Outputs vs. Outcomes vs. Impact',
                text: 'A literacy programme\'s output is "200 adults completed a 12-week reading course." Its outcome is "participants can read at a Grade 5 level." Its impact is "participants access better employment and pass this advantage to their children." Impact typically takes years to measure; outcomes take months; outputs are immediate. Funders often measure outputs; communities experience impact. Good evaluation measures all three.',
              },
            ],
            takeaways: [
              'A theory of change maps assumptions explicitly — making them visible makes them testable',
              'Outputs are what you produce; outcomes are immediate changes; impact is long-term social change',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c10_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Theories of Change Quiz',
            forLesson: 'Theories of Change',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of theories of change and programme logic.',
            questions: [
              {
                question: 'A theory of change is most valuable because:',
                options: [
                  'It satisfies funder reporting requirements',
                  'It makes assumptions explicit, making them visible and testable',
                  'It guarantees that activities will produce the desired impact',
                  'It simplifies complex social problems into manageable steps',
                ],
                correctIndex: 1,
              },
              {
                question: 'In a theory of change, "outcomes" refers to:',
                options: [
                  'The ultimate long-term social change achieved',
                  'Immediate changes in knowledge, skills, or behaviour resulting from the programme',
                  'The activities carried out by the programme',
                  'The quantitative products delivered (workshops, meals, etc.)',
                ],
                correctIndex: 1,
              },
              {
                question: 'Most failed social programmes fail because:',
                options: [
                  'They receive insufficient funding',
                  'They measure outputs while hoping for impact without testing the assumptions between',
                  'Their theory of change is too complex',
                  'They target the wrong population',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Impact in social change initiatives is best described as:',
                options: [
                  'The immediate results visible after the programme ends',
                  'Long-term changes in social conditions that take years to materialise',
                  'The total number of people reached',
                  'Whether funders continue to provide support',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Theory of Change Map',
            forLesson: 'Theories of Change',
            dueDate: 'Jul 8',
            submission: 'File or link upload',
            instructions:
              'Create a theory of change for a real or hypothetical social initiative. Show the pathway from activities to outputs to outcomes to impact, with key assumptions listed at each step.',
            requirements: [
              'All four levels (activities, outputs, outcomes, impact) clearly shown',
              'At least two assumptions stated per level',
              'One assumption identified as the most critical — and a way to test it described',
            ],
          },
        ],
      },
      {
        id: 'c10_l2',
        title: 'Community Engagement',
        documents: [],
        videos: [
          {
            id: 'c10_v1',
            kind: 'video',
            title: 'Community Engagement',
            duration: '13 min',
            intro:
              'The most effective social initiatives are designed with communities, not for them. Learn the principles and practices of genuine community engagement.',
            topics: [
              'The participation ladder: from manipulation to citizen control',
              'Asset-Based Community Development (ABCD) vs. needs-based approaches',
              'Engaging hard-to-reach and marginalised community members',
              'How to conduct a meaningful community consultation',
            ],
            moments: [
              { time: '0:00', label: 'Doing "with" not "for" communities' },
              { time: '3:00', label: 'The participation ladder' },
              { time: '6:30', label: 'Asset-based vs. needs-based approaches' },
              { time: '10:20', label: 'Engaging marginalised voices' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c10_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Community Engagement Quiz',
            forLesson: 'Community Engagement',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of community engagement principles.',
            questions: [
              {
                question:
                  'The highest level of the participation ladder represents:',
                options: [
                  'Expert-led consultation with community feedback',
                  'Community members controlling the design and decision-making',
                  'Tokenistic participation that satisfies funder requirements',
                  'Government-led community planning processes',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Asset-Based Community Development (ABCD) differs from needs-based approaches by:',
                options: [
                  'Starting with what the community already has and can do, rather than what it lacks',
                  'Using more sophisticated assessment tools',
                  'Focusing on economic development rather than social issues',
                  'Requiring external funding before any action is taken',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'To engage hard-to-reach community members, the most effective approach is:',
                options: [
                  'Increasing the frequency of standard consultation events',
                  'Going to where they already are, in forms that fit their lives',
                  'Requiring attendance through formal community structures',
                  'Offering financial incentives for participation',
                ],
                correctIndex: 1,
              },
              {
                question: 'Tokenistic community engagement means:',
                options: [
                  'Using local language in consultation materials',
                  'Participation that appears meaningful but does not influence real decisions',
                  'Involving community members in programme evaluation',
                  'Paying community members for their time and expertise',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Community Consultation Plan',
            forLesson: 'Community Engagement',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Design a community consultation process for a social initiative of your choice. Show how you would apply at least two principles from this lesson to move beyond tokenistic participation.',
            requirements: [
              'Initiative and target community described',
              'Two principles applied with specific consultation activities designed around them',
              'One group likely to be hard-to-reach identified with a specific strategy to include them',
            ],
          },
        ],
      },
      {
        id: 'c10_l3',
        title: 'Social Enterprise Models',
        documents: [
          {
            id: 'c10_d2',
            kind: 'document',
            title: 'Social Enterprise Models',
            readTime: '4 – 5 min read',
            intro:
              'Social enterprises create social impact through business models — they are self-sustaining because they generate revenue, not just grants.',
            objectives: [
              'Distinguish between the major social enterprise models and their trade-offs',
              'Apply a viability test to a social enterprise concept',
            ],
            sections: [
              {
                heading: 'Social Enterprise Models',
                text: 'The spectrum runs from pure charity (100% grants) to profit-for-purpose (revenue cross-subsidises social mission) to social business (all revenue, mission embedded in operations) to corporate social responsibility (profit-first with social add-on). Key models include: (1) BOPA (Buy One, Pay for Another) — customer purchases fund social recipients. (2) Employment integration — social mission is providing jobs to disadvantaged groups. (3) Cross-subsidy — market-rate clients subsidise below-cost social clients (Aravind Eye Hospital). (4) Licensing — IP licensed to governments or NGOs.',
                tip: 'Test viability before mission. A social enterprise that runs out of money helps no one.',
              },
              {
                heading: 'The Viability Test',
                text: 'Three conditions for a sustainable social enterprise: (1) The social mission is embedded in the business model, not bolted on. (2) Revenue exceeds costs at a scale that can be reached. (3) The social outcome gets better — not just maintained — as the business grows. If growth dilutes the social mission, the model is not social enterprise — it is commercial enterprise with a social story.',
              },
            ],
            takeaways: [
              'Social enterprise viability requires: mission embedded in model, revenue exceeding costs at reachable scale, and social outcome improving with growth',
              'Test viability before mission — a social enterprise that runs out of money helps no one',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c10_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Social Enterprise Quiz',
            forLesson: 'Social Enterprise Models',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of social enterprise models.',
            questions: [
              {
                question: 'A cross-subsidy social enterprise model works by:',
                options: [
                  'Subsidising its own operations through government grants',
                  'Charging market-rate clients at a premium to subsidise below-cost social clients',
                  'Cross-selling commercial products to fund a separate social programme',
                  'Sharing revenue equally between commercial and social activities',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The viability test for a social enterprise requires that:',
                options: [
                  'The enterprise receives no government funding',
                  'Social outcomes improve — not just continue — as the business grows',
                  'The enterprise becomes publicly listed within 10 years',
                  'Commercial revenue accounts for 100% of income',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A social enterprise where the social mission is "bolted on" (not embedded) risks:',
                options: [
                  'Regulatory scrutiny of its not-for-profit status',
                  'The social mission being cut when commercial pressure increases',
                  'Attracting investors who do not value social impact',
                  'Growing too fast for the social mission to keep pace',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Employment integration as a social enterprise model means:',
                options: [
                  'Hiring standard employees at below-market wages',
                  'The social mission IS the provision of employment to disadvantaged groups',
                  'Employees volunteer rather than receive pay',
                  'The workforce is employed by the government but deployed to the enterprise',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Social Enterprise Concept',
            forLesson: 'Social Enterprise Models',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design a social enterprise concept addressing a community need of your choice. Apply the viability test and identify the model type.',
            requirements: [
              'Social need and target community named',
              'Revenue model described with how it generates income',
              'Viability test applied: mission embeddedness, cost-revenue at scale, social outcome with growth',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c10_m2',
    title: 'Module 2: Impact Measurement & Scaling',
    lessons: [
      {
        id: 'c10_l4',
        title: 'Measuring Social Impact',
        documents: [],
        videos: [
          {
            id: 'c10_v2',
            kind: 'video',
            title: 'Measuring Social Impact',
            duration: '13 min',
            intro:
              'What gets measured gets managed — but in social change, measuring the wrong thing can actively harm the communities you are trying to help.',
            topics: [
              'Social Return on Investment (SROI) — methodology and limits',
              'Randomised Control Trials (RCTs) in social programmes — when they work',
              'Qualitative evidence: stories, case studies, and their role in impact evaluation',
              'The balance between rigorous evaluation and programme cost',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Why measurement is hard in social change',
              },
              { time: '2:50', label: 'SROI methodology' },
              { time: '6:30', label: 'RCTs in social programmes' },
              { time: '10:20', label: 'Qualitative evidence' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c10_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Social Impact Measurement Quiz',
            forLesson: 'Measuring Social Impact',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of social impact measurement methods.',
            questions: [
              {
                question: 'Social Return on Investment (SROI) measures:',
                options: [
                  'The financial profit of a social enterprise',
                  'The value of social outcomes relative to the investment required to achieve them',
                  'The number of people directly reached by a programme',
                  'The reputational return for corporate funders',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A Randomised Control Trial (RCT) in social programmes is valuable because:',
                options: [
                  'It is the cheapest evaluation method',
                  'It is the gold standard for establishing causation — controlling for confounding variables',
                  'It captures the experience of individual beneficiaries',
                  'It satisfies all funder reporting requirements',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The main limitation of RCTs in social programmes is:',
                options: [
                  'They are not accepted by international funders',
                  'They are expensive, time-consuming, and sometimes ethically problematic (control group denial of service)',
                  'They only measure financial outcomes',
                  'They require government approval in most countries',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Qualitative evidence (stories, case studies) is valuable in impact evaluation because:',
                options: [
                  'It is easier to collect than quantitative data',
                  'It captures nuance, context, and unintended consequences that numbers miss',
                  'Funders always prefer stories to numbers',
                  'It is more rigorous than quantitative methods',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Measurement Framework',
            forLesson: 'Measuring Social Impact',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Design a measurement framework for the social enterprise from Lesson 3. Choose two quantitative indicators and one qualitative approach. Justify each choice.',
            requirements: [
              'Two quantitative indicators defined with how they are measured and by whom',
              'One qualitative approach described (interview, case study, etc.) with the question it answers',
              'Explain how you would balance rigour with evaluation cost',
            ],
          },
        ],
      },
      {
        id: 'c10_l5',
        title: 'Advocacy & Policy Change',
        documents: [
          {
            id: 'c10_d3',
            kind: 'document',
            title: 'Advocacy & Policy Change',
            readTime: '4 – 5 min read',
            intro:
              'Programme-level change helps individuals. Policy-level change helps populations. Effective community leaders work at both levels.',
            objectives: [
              'Distinguish between service delivery, advocacy, and systems change',
              'Apply a policy change strategy using the policy window framework',
            ],
            sections: [
              {
                heading: 'Three Levels of Change',
                text: 'Service delivery meets immediate need — food bank, housing support, health clinic. Advocacy changes the conditions that create need — lobbying for affordable housing policy, minimum wage increases, equitable school funding. Systems change challenges the underlying power structures and norms — the hardest and most durable form of change. Effective social change organisations typically work at all three levels simultaneously, using service delivery evidence to inform advocacy, and using advocacy wins to shift systems.',
                tip: 'Document what you see on the ground. That evidence is your most powerful advocacy tool at the policy level.',
              },
              {
                heading: "Kingdon's Policy Window",
                text: "John Kingdon's model identifies three streams that must converge for policy change: the Problem stream (the issue is on the agenda), the Policy stream (a workable solution is available), and the Politics stream (the political will exists). A policy window opens when all three converge — often triggered by a crisis, election, or champion entering government. Effective advocates prepare solutions in advance and wait for the window. When it opens, slow-moving campaigns are irrelevant.",
              },
            ],
            takeaways: [
              'Ground-level evidence from service delivery is the most powerful advocacy tool',
              "Kingdon's policy window: when problem, policy, and politics converge, change happens fast — prepare in advance",
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c10_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Advocacy & Policy Quiz',
            forLesson: 'Advocacy & Policy Change',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of advocacy and policy change strategies.',
            questions: [
              {
                question: 'Systems change differs from service delivery by:',
                options: [
                  'Operating at a larger geographic scale',
                  'Challenging the underlying power structures and norms that create need',
                  'Requiring government partnership',
                  'Focusing on economic outcomes rather than social ones',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "In Kingdon's policy window model, change happens when:",
                options: [
                  'Enough funding has been raised for a lobbying campaign',
                  'Problem, Policy, and Politics streams converge simultaneously',
                  'A crisis makes the public aware of an issue',
                  'The political party sympathetic to the cause wins an election',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Ground-level evidence from service delivery is valuable for advocacy because:',
                options: [
                  'It satisfies government evidence requirements',
                  'It documents real cases that make abstract policy arguments concrete and credible',
                  'It is free to collect',
                  'Government funders require it for ongoing programme support',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Effective advocates prepare policy solutions in advance because:',
                options: [
                  'Policy windows open slowly, giving time to respond',
                  'When a policy window opens, it may close quickly — only pre-prepared solutions can move fast enough',
                  'Governments require 12-month notice for policy input',
                  'Preparation signals credibility to political champions',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Advocacy Strategy',
            forLesson: 'Advocacy & Policy Change',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              "Choose a social issue you care about. Apply Kingdon's three-stream model to map the current state and identify what conditions would open a policy window.",
            requirements: [
              'Current state of each stream (problem, policy, politics) assessed',
              'One intervention point identified to advance the weakest stream',
              'One piece of ground-level evidence that would strengthen the problem stream',
            ],
          },
        ],
      },
      {
        id: 'c10_l6',
        title: 'Scaling Social Impact',
        documents: [],
        videos: [
          {
            id: 'c10_v3',
            kind: 'video',
            title: 'Scaling Social Impact',
            duration: '12 min',
            intro:
              'Scaling is not just growing bigger — it is increasing impact per dollar, per year. Learn the pathways to scale social change.',
            topics: [
              'Five pathways to scale: dissemination, affiliation, licensing, government adoption, and open source',
              'When to scale and when to deepen — the premature scaling trap',
              'Maintaining mission fidelity through growth',
              'The role of partnerships in scaling social impact',
            ],
            moments: [
              { time: '0:00', label: 'What scaling social impact means' },
              { time: '3:00', label: 'Five scaling pathways' },
              { time: '6:40', label: 'Premature scaling trap' },
              { time: '10:00', label: 'Mission fidelity through growth' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c10_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Scaling Social Impact Quiz',
            forLesson: 'Scaling Social Impact',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of social impact scaling strategies.',
            questions: [
              {
                question: 'Scaling social impact means:',
                options: [
                  "Growing the organisation's headcount and budget",
                  'Increasing the number of offices and locations',
                  'Increasing the social impact achieved per dollar or per year',
                  'Attracting more media attention to the cause',
                ],
                correctIndex: 2,
              },
              {
                question: 'Government adoption as a scaling pathway works by:',
                options: [
                  "The government funding the organisation's expansion directly",
                  'Government incorporating the programme into official policy and delivery',
                  'Lobbying government to mandate the programme nationwide',
                  'Partnering with government ministries for data sharing',
                ],
                correctIndex: 1,
              },
              {
                question: 'Premature scaling means:',
                options: [
                  'Growing too slowly and losing momentum',
                  'Scaling before the model is proven — before outcomes are consistently achieved',
                  'Expanding into too many geographic areas at once',
                  'Hiring too many staff before funding is confirmed',
                ],
                correctIndex: 1,
              },
              {
                question: 'The open-source scaling pathway involves:',
                options: [
                  'Publishing your programme design freely for others to adapt and use',
                  'Open recruitment of volunteers from the general public',
                  'Making your data publicly available',
                  'Removing intellectual property protection from your social technology',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Scaling Strategy',
            forLesson: 'Scaling Social Impact',
            dueDate: 'Jul 19',
            submission: 'Text response',
            instructions:
              'For the social enterprise from Lesson 3, choose the most appropriate scaling pathway and justify your choice. Identify the most important condition that must be true before scaling begins.',
            requirements: [
              'Scaling pathway chosen with at least two reasons it fits this specific model',
              'Alternative pathway considered and rejected with reasoning',
              'Prerequisite condition for scaling named with how you would assess readiness',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 11: Advanced Research Methods ──────────────────────────────────────

export const C11_MODULES: ReviewModule[] = [
  {
    id: 'c11_m1',
    title: 'Module 1: Research Design',
    lessons: [
      {
        id: 'c11_l1',
        title: 'Research Questions & Design',
        documents: [
          {
            id: 'c11_d1',
            kind: 'document',
            title: 'Research Questions & Design',
            readTime: '5 – 6 min read',
            intro:
              'A research question determines everything that follows. A poorly formed question produces elegant methods applied to a meaningless answer.',
            objectives: [
              'Formulate a research question that is specific, answerable, and significant',
              'Select an appropriate research design (qualitative, quantitative, or mixed methods) for a given question',
            ],
            sections: [
              {
                heading: 'What Makes a Good Research Question',
                text: 'A good research question has four properties: (1) Specific — narrow enough to be answerable. "What causes poverty?" is a topic; "What is the relationship between maternal education and under-5 mortality in rural Cambodia 2015–2023?" is a question. (2) Answerable — there is a feasible method to collect the evidence needed. (3) Significant — the answer would contribute new knowledge or resolve a genuine debate. (4) Ethical — the research does not harm participants.',
                tip: 'Write your research question in a single sentence. If you cannot, the question is not yet specific enough.',
              },
              {
                heading: 'Qualitative vs. Quantitative Design',
                text: 'Quantitative research tests hypotheses using numerical data and statistical analysis — best for "how many," "how often," and "is there a relationship between." Qualitative research explores meaning, experience, and process using language, observation, and interpretation — best for "why," "how does it feel," and "what is happening here." Mixed methods use both. The choice is determined by the question, not by the researcher\'s preference.',
              },
            ],
            takeaways: [
              'A research question must be specific, answerable, significant, and ethical — not just interesting',
              'The research question determines the design; qualitative explores meaning, quantitative tests hypotheses',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c11_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Research Design Quiz',
            forLesson: 'Research Questions & Design',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your ability to formulate research questions and select designs.',
            questions: [
              {
                question:
                  'Which of the following is the strongest research question?',
                options: [
                  '"What causes climate change?"',
                  '"How does climate change affect people?"',
                  '"What is the association between urban heat island temperature and heat-related hospitalisations in Phnom Penh 2018–2022?"',
                  '"Is climate change a global problem?"',
                ],
                correctIndex: 2,
              },
              {
                question: 'Qualitative research is most appropriate for:',
                options: [
                  'Testing whether a drug reduces blood pressure',
                  'Counting the frequency of a behaviour in a large population',
                  'Exploring how refugees experience the asylum process',
                  'Comparing test scores across school districts',
                ],
                correctIndex: 2,
              },
              {
                question: 'A research question is "answerable" if:',
                options: [
                  'The answer is already known',
                  'There is a feasible method to collect the evidence needed to answer it',
                  'It can be answered with a yes or no',
                  'Most people in the field agree on the answer',
                ],
                correctIndex: 1,
              },
              {
                question: 'Mixed methods research is most valuable when:',
                options: [
                  'The researcher has more funding than needed for one approach',
                  "One method can confirm the other's findings",
                  'The question requires both hypothesis testing and meaning exploration',
                  'The field has no existing quantitative data',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Research Question Development',
            forLesson: 'Research Questions & Design',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Starting from a broad topic of your choice, narrow it to a specific research question in three iterations. Justify your final design choice (qualitative, quantitative, or mixed methods).',
            requirements: [
              'Three successive iterations shown with each refinement explained',
              'Final question assessed against all four quality criteria',
              'Design choice justified with reference to what the question requires',
            ],
          },
        ],
      },
      {
        id: 'c11_l2',
        title: 'Literature Review',
        documents: [],
        videos: [
          {
            id: 'c11_v1',
            kind: 'video',
            title: 'Conducting a Literature Review',
            duration: '13 min',
            intro:
              'A literature review is not a summary of everything ever written on a topic. It is a structured argument about the state of knowledge and where your study contributes.',
            topics: [
              'Systematic vs. narrative literature reviews — when to use each',
              'Database search strategy: keywords, Boolean operators, and filters',
              'Critical evaluation of sources: authority, currency, and methodological quality',
              'Synthesising literature into an argument, not a list of summaries',
            ],
            moments: [
              { time: '0:00', label: 'What a literature review actually is' },
              { time: '2:50', label: 'Systematic vs. narrative review' },
              { time: '6:30', label: 'Search strategy and source quality' },
              { time: '10:20', label: 'Synthesis as argument' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c11_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Literature Review Quiz',
            forLesson: 'Literature Review',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of literature review methods.',
            questions: [
              {
                question:
                  'A systematic literature review differs from a narrative review by:',
                options: [
                  'Including more sources',
                  'Using a reproducible, pre-specified search strategy to minimise bias',
                  'Focusing on more recent publications',
                  'Being conducted by a team rather than an individual',
                ],
                correctIndex: 1,
              },
              {
                question: 'The Boolean operator "AND" in a database search:',
                options: [
                  'Broadens the search by including either term',
                  'Narrows the search by requiring both terms to appear',
                  'Excludes the second term from results',
                  'Is interchangeable with "OR"',
                ],
                correctIndex: 1,
              },
              {
                question: 'Synthesis in a literature review means:',
                options: [
                  'Providing a summary of each source in sequence',
                  'Building an argument from across sources about what is known and contested',
                  'Including only peer-reviewed sources',
                  'Translating sources from other languages',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The "currency" criterion for evaluating a source refers to:',
                options: [
                  'Whether the publication is in a high-impact journal',
                  'Whether the information is recent enough to be relevant for the current question',
                  'Whether the source is freely accessible',
                  'Whether the author is currently active in the field',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Mini Literature Review',
            forLesson: 'Literature Review',
            dueDate: 'Jul 10',
            submission: 'File or link upload',
            instructions:
              'Conduct a targeted literature search on your research question from Lesson 1. Find five relevant sources, evaluate each for quality, and write a 300-word synthesis that identifies what is known and what is contested.',
            requirements: [
              'Five sources cited with quality evaluation for each (authority, currency, methodology)',
              'Synthesis written as an argument, not a source-by-source summary',
              'The gap your research question addresses identified from the synthesis',
            ],
          },
        ],
      },
      {
        id: 'c11_l3',
        title: 'Ethical Research Practice',
        documents: [
          {
            id: 'c11_d2',
            kind: 'document',
            title: 'Ethical Research Practice',
            readTime: '4 – 5 min read',
            intro:
              'Research ethics protects participants, preserves the integrity of knowledge, and maintains public trust in research institutions.',
            objectives: [
              'Apply the four principles of research ethics to a study design',
              'Identify when informed consent processes require special attention',
            ],
            sections: [
              {
                heading: 'Four Principles of Research Ethics',
                text: 'Beneficence: the research should produce benefit. Non-maleficence: the research should not harm. Autonomy: participants should make an informed, voluntary choice to participate. Justice: the burdens and benefits of research should be distributed fairly — vulnerable populations should not bear disproportionate research burden for benefits that accrue to others.',
                tip: 'In research with vulnerable populations (children, prisoners, refugees), assume a higher ethical standard is required unless you can specifically argue otherwise.',
              },
              {
                heading: 'Informed Consent',
                text: 'Informed consent requires that participants understand: (1) what the research involves, (2) the foreseeable risks and benefits, (3) that participation is voluntary and can be withdrawn at any time, (4) how their data will be used and protected, and (5) who to contact with concerns. Written consent is the standard; verbal consent is acceptable when literacy is limited, when the population is culturally averse to written agreements, or when requiring it creates greater risk than it prevents.',
              },
            ],
            takeaways: [
              'Four principles: beneficence, non-maleficence, autonomy, justice — all must be satisfied',
              'Informed consent has five elements; written is standard but verbal is acceptable in specified contexts',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c11_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Research Ethics Quiz',
            forLesson: 'Ethical Research Practice',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of research ethics principles.',
            questions: [
              {
                question: 'The justice principle in research ethics requires:',
                options: [
                  'All research data to be made publicly available',
                  'That burdens and benefits of research are distributed fairly across populations',
                  'Equal pay for research participants',
                  'Justice sector approval before conducting research on crime',
                ],
                correctIndex: 1,
              },
              {
                question: 'Informed consent requires that participation is:',
                options: [
                  'Confirmed in writing under all circumstances',
                  'Mandatory for research to proceed',
                  'Voluntary and can be withdrawn at any time without penalty',
                  'Irreversible once given',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'When conducting research with refugees, you should assume:',
                options: [
                  'Standard ethical protocols are sufficient',
                  "A higher ethical standard is required given the population's vulnerability",
                  'Verbal consent is never appropriate',
                  'Government approval replaces ethics board review',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Verbal rather than written consent is appropriate when:',
                options: [
                  'The researcher prefers a simpler process',
                  'Requiring written consent would create greater risk than it prevents (e.g. in contexts with political risk)',
                  'Participants are over 18',
                  'The research is funded by government',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Ethics Review',
            forLesson: 'Ethical Research Practice',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Write an ethics review for your research question from Lesson 1. Apply all four principles and design an appropriate informed consent process.',
            requirements: [
              'All four principles addressed with specific risks and mitigations for this study',
              'Informed consent process designed with all five elements included',
              'Identify the most significant ethical risk and how you would manage it',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c11_m2',
    title: 'Module 2: Data Collection & Analysis',
    lessons: [
      {
        id: 'c11_l4',
        title: 'Qualitative Methods',
        documents: [],
        videos: [
          {
            id: 'c11_v2',
            kind: 'video',
            title: 'Qualitative Data Collection Methods',
            duration: '14 min',
            intro:
              'Qualitative methods generate rich data about meaning, experience, and context. Learn to design and conduct effective interviews and focus groups.',
            topics: [
              'Semi-structured interviews: design and practice',
              'Focus groups: facilitation and group dynamics',
              'Observation and ethnography: being in the field',
              'Thematic analysis: moving from data to findings',
            ],
            moments: [
              { time: '0:00', label: 'Qualitative methods overview' },
              { time: '2:50', label: 'Semi-structured interview design' },
              { time: '7:00', label: 'Focus group facilitation' },
              { time: '11:00', label: 'Thematic analysis introduction' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c11_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Qualitative Methods Quiz',
            forLesson: 'Qualitative Methods',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of qualitative data collection and analysis.',
            questions: [
              {
                question:
                  'A semi-structured interview guide is "semi-structured" because:',
                options: [
                  'It is half the length of a structured interview',
                  'It has prepared questions but allows probing and follow-up based on responses',
                  'It is conducted in two sessions',
                  'Questions are given to the participant in advance',
                ],
                correctIndex: 1,
              },
              {
                question: 'Focus groups are most useful for:',
                options: [
                  'Collecting sensitive personal information',
                  'Exploring shared experiences and social norms within a group',
                  'Establishing statistical prevalence of a behaviour',
                  'Confirming findings from quantitative analysis',
                ],
                correctIndex: 1,
              },
              {
                question: 'Thematic analysis involves:',
                options: [
                  'Counting the frequency of words in interview transcripts',
                  'Identifying patterns of meaning across qualitative data to construct themes',
                  'Analysing the tone and sentiment of participant responses',
                  'Testing a pre-specified set of themes against interview data',
                ],
                correctIndex: 1,
              },
              {
                question: 'Saturation in qualitative research means:',
                options: [
                  'The researcher has interviewed the maximum possible sample',
                  'New data is no longer producing new themes — the theoretical model is complete',
                  'The data has been analysed by three independent researchers',
                  'All planned participants have been interviewed',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Interview Guide Design',
            forLesson: 'Qualitative Methods',
            dueDate: 'Jul 15',
            submission: 'File or link upload',
            instructions:
              'Design a semi-structured interview guide for your research question. Include an opening, 6–8 main questions, and a closing. Write three probing follow-up questions.',
            requirements: [
              'Guide opens with a rapport-building, non-threatening question',
              'Main questions are open-ended and ordered from general to specific',
              'Three probing questions designed to deepen responses to your most critical question',
            ],
          },
        ],
      },
      {
        id: 'c11_l5',
        title: 'Quantitative Analysis',
        documents: [
          {
            id: 'c11_d3',
            kind: 'document',
            title: 'Quantitative Analysis',
            readTime: '5 – 6 min read',
            intro:
              'Quantitative analysis transforms numbers into findings. Understanding which analysis fits your research question — and how to interpret the output — is the core skill.',
            objectives: [
              'Select appropriate statistical tests for common research questions',
              'Interpret the output of descriptive and inferential statistics correctly',
            ],
            sections: [
              {
                heading: 'Descriptive vs. Inferential Statistics',
                text: 'Descriptive statistics summarise your sample: measures of central tendency (mean, median, mode), measures of spread (range, standard deviation, variance), and frequencies and proportions. Inferential statistics make inferences from your sample to a larger population: t-tests compare means between two groups; ANOVA compares means across three or more groups; correlation measures the strength and direction of the relationship between two variables; regression predicts one variable from others.',
                tip: 'Always examine your data visually (histogram, scatter plot) before running inferential tests. Visual inspection catches distributional violations that invalidate many statistical assumptions.',
              },
              {
                heading: 'Interpreting p-values and Confidence Intervals',
                text: 'A p-value of 0.03 means: if there were no true effect, results this extreme would occur by chance 3% of the time. It does not mean "there is a 97% probability the hypothesis is true." Confidence intervals are often more informative: a 95% CI of [1.2, 3.4] for a treatment effect means you are 95% confident the true effect falls in this range. A narrow CI indicates a precise estimate; a wide CI indicates substantial uncertainty.',
              },
            ],
            takeaways: [
              'Always visualise data before running inferential statistics — distributional violations are most visible graphically',
              'A p-value is not a probability that the hypothesis is true — it is the probability of results this extreme if there were no effect',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c11_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Quantitative Analysis Quiz',
            forLesson: 'Quantitative Analysis',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of quantitative research methods.',
            questions: [
              {
                question: 'An ANOVA is appropriate when:',
                options: [
                  'Comparing means between exactly two groups',
                  'Measuring the strength of a relationship between two variables',
                  'Comparing means across three or more groups',
                  'Predicting a continuous outcome from multiple variables',
                ],
                correctIndex: 2,
              },
              {
                question: 'A p-value of 0.03 correctly means:',
                options: [
                  'There is a 97% probability the hypothesis is true',
                  'The result would occur by chance 3% of the time if there were no true effect',
                  'The effect size is meaningful',
                  'The result is 3% more significant than the threshold',
                ],
                correctIndex: 1,
              },
              {
                question: 'Standard deviation measures:',
                options: [
                  'The middle value in a dataset',
                  'How far data points are spread around the mean on average',
                  'The most common value in a dataset',
                  'The difference between the highest and lowest values',
                ],
                correctIndex: 1,
              },
              {
                question: 'A confidence interval that is very wide indicates:',
                options: [
                  'A large effect size',
                  'High statistical significance',
                  'Substantial uncertainty in the estimate',
                  'A very large sample was used',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Statistical Analysis Plan',
            forLesson: 'Quantitative Analysis',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Write a statistical analysis plan for a quantitative version of your research question. Specify the test you would use, the variables involved, and how you would interpret the result.',
            requirements: [
              'Research question restated in testable quantitative form',
              'Statistical test chosen with justification (what type of data, how many groups)',
              'Interpretation template: "If p < 0.05 and the effect is [direction], this means..."',
            ],
          },
        ],
      },
      {
        id: 'c11_l6',
        title: 'Writing & Disseminating Research',
        documents: [],
        videos: [
          {
            id: 'c11_v3',
            kind: 'video',
            title: 'Writing & Disseminating Research',
            duration: '12 min',
            intro:
              'Research that is not communicated is research that does not exist. Learn to write and position findings for maximum reach and impact.',
            topics: [
              'Structure of a research report: IMRaD and when to use it',
              'Writing for different audiences: academic, policy, and practitioner',
              'Open access and knowledge equity in research dissemination',
              "From findings to recommendations: the researcher's responsibility",
            ],
            moments: [
              { time: '0:00', label: 'IMRaD structure explained' },
              {
                time: '3:00',
                label: 'Writing for academic vs. policy audiences',
              },
              { time: '6:30', label: 'Open access and dissemination strategy' },
              { time: '10:00', label: 'Findings to recommendations' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c11_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Research Dissemination Quiz',
            forLesson: 'Writing & Disseminating Research',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of research writing and dissemination.',
            questions: [
              {
                question: 'IMRaD stands for:',
                options: [
                  'Introduction, Methodology, Results and Discussion',
                  'Introduction, Methods, Results and Discussion',
                  'Issue, Method, Research and Data',
                  'Introduction, Model, Results and Data',
                ],
                correctIndex: 1,
              },
              {
                question: 'A policy brief differs from an academic paper by:',
                options: [
                  'Being shorter and using more technical language',
                  'Leading with findings and recommendations rather than methodology',
                  'Not including a methods section',
                  'Being written by practitioners rather than researchers',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "The researcher's responsibility when moving from findings to recommendations is to:",
                options: [
                  'Make strong recommendations even when evidence is weak',
                  'State what the evidence supports, acknowledge its limits, and recommend actions proportional to the strength of evidence',
                  'Leave recommendations to policymakers',
                  "Ensure recommendations align with the funder's priorities",
                ],
                correctIndex: 1,
              },
              {
                question: 'Open access publishing is valued because:',
                options: [
                  'It is free for researchers to submit',
                  'It makes research available to communities who cannot afford journal subscriptions, including those studied',
                  'It guarantees faster peer review',
                  'It is required for government-funded research globally',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Research Summary',
            forLesson: 'Writing & Disseminating Research',
            dueDate: 'Jul 19',
            submission: 'File or link upload',
            instructions:
              'Write a 400-word research summary for two audiences: (1) an academic abstract; (2) a policy brief opening. The content should be the same research; the format and language should differ.',
            requirements: [
              'Academic abstract follows IMRaD structure in condensed form',
              'Policy brief leads with findings and recommendations in plain language',
              'Both versions address the same core findings but use different vocabulary and emphasis',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course 12: Creative Problem Solving ───────────────────────────────────────

export const C12_MODULES: ReviewModule[] = [
  {
    id: 'c12_m1',
    title: 'Module 1: Foundations of Creative Thinking',
    lessons: [
      {
        id: 'c12_l1',
        title: 'How Creativity Works',
        documents: [
          {
            id: 'c12_d1',
            kind: 'document',
            title: 'How Creativity Works',
            readTime: '4 – 5 min read',
            intro:
              'Creativity is not a personality trait — it is a skill that can be developed. Understanding how creative insight actually works lets you design conditions that produce it.',
            objectives: [
              'Explain the four-stage model of creative insight',
              'Identify the conditions that inhibit and enable creative thinking',
            ],
            sections: [
              {
                heading: 'The Four Stages of Creative Insight',
                text: 'Graham Wallas\'s model: (1) Preparation — absorbing deep knowledge of the domain. Creativity rarely comes from ignorance. (2) Incubation — stepping back and letting the unconscious process the problem. This is why breakthroughs happen in the shower. (3) Illumination — the "aha moment" when the solution surfaces. (4) Verification — testing and refining the idea. Most creative processes fail at stage 4: people fall in love with the idea and skip the test.',
                tip: 'Build incubation deliberately. Put a hard problem aside for 24 hours before returning to it. The unconscious continues working.',
              },
              {
                heading: 'Conditions That Inhibit Creativity',
                text: 'Time pressure (beyond a moderate level), evaluation anxiety (the fear of judgment during idea generation), functional fixedness (seeing objects and concepts only in their standard use), and rigid categories (believing certain combinations are impossible) are the main inhibitors. The creative environment removes evaluation during ideation, provides psychological safety, introduces variety and cross-domain stimulus, and allows divergent thinking before convergent analysis.',
              },
            ],
            takeaways: [
              'Creative insight has four stages: Preparation, Incubation, Illumination, Verification — skipping verification is the most common failure',
              'Build deliberate incubation: step back from hard problems to allow unconscious processing',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c12_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'How Creativity Works Quiz',
            forLesson: 'How Creativity Works',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of creative insight and its conditions.',
            questions: [
              {
                question: "In Wallas's model, incubation refers to:",
                options: [
                  'The intense preparation phase before creativity begins',
                  'The "aha moment" when the solution appears',
                  'Stepping back and allowing the unconscious to process the problem',
                  'Testing and refining a creative idea',
                ],
                correctIndex: 2,
              },
              {
                question: 'Functional fixedness inhibits creativity by:',
                options: [
                  'Making people overly focused on function rather than aesthetics',
                  'Causing people to see objects and concepts only in their standard use',
                  'Restricting access to creative tools',
                  'Making creative teams too focused on practical implementation',
                ],
                correctIndex: 1,
              },
              {
                question: 'Evaluation anxiety inhibits creativity because:',
                options: [
                  'It causes people to work faster and make more errors',
                  'Fear of judgment causes people to self-censor during idea generation',
                  "It increases conformity to the group leader's preferences",
                  'It makes people focus on quantity rather than quality of ideas',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Most creative processes fail at the Verification stage because:',
                options: [
                  'Verification requires technical skills most creatives lack',
                  'People fall in love with the idea and skip rigorous testing',
                  'The timeline runs out before verification can be completed',
                  'Verification requires a different team from those who generated the idea',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Creative Conditions Audit',
            forLesson: 'How Creativity Works',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Audit a context where you regularly try to think creatively (work, study, personal projects). Identify two conditions that inhibit your creativity and design two environmental changes to remove them.',
            requirements: [
              'Two inhibitors identified with specific examples from your context',
              'Two environmental changes proposed — one structural, one behavioural',
              'How you will deliberately build incubation into your creative process',
            ],
          },
        ],
      },
      {
        id: 'c12_l2',
        title: 'Divergent Thinking Tools',
        documents: [],
        videos: [
          {
            id: 'c12_v1',
            kind: 'video',
            title: 'Divergent Thinking Tools',
            duration: '13 min',
            intro:
              'Divergent thinking generates many possible ideas before convergent thinking selects the best. Learn the tools that reliably expand your idea space.',
            topics: [
              'Brainstorming done right — and why it is often done wrong',
              'SCAMPER: Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse',
              'Random association and forced connections',
              'The reverse brainstorm: solving by inverting the problem',
            ],
            moments: [
              { time: '0:00', label: 'Divergent vs. convergent thinking' },
              { time: '2:50', label: 'Effective brainstorming conditions' },
              { time: '6:00', label: 'SCAMPER walkthrough' },
              { time: '10:00', label: 'Reverse brainstorm technique' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c12_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Divergent Thinking Quiz',
            forLesson: 'Divergent Thinking Tools',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of divergent thinking tools.',
            questions: [
              {
                question:
                  'The most common reason brainstorming fails in groups is:',
                options: [
                  'The session is too short',
                  'Evaluation during ideation — participants self-censor due to social pressure',
                  'Too few participants',
                  'Lack of a skilled facilitator',
                ],
                correctIndex: 1,
              },
              {
                question: 'In SCAMPER, "Eliminate" asks:',
                options: [
                  'Which features could be removed to simplify the product?',
                  'Which team members are no longer needed for this project?',
                  'Which customer segments should be excluded from the market?',
                  'Which constraints should be ignored?',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'The reverse brainstorm technique generates ideas by:',
                options: [
                  'Starting from the solution and working backwards',
                  'Asking "how could we make this problem worse?" then inverting the answers',
                  'Reversing the order of a standard brainstorm session',
                  'Having different groups work on the problem independently',
                ],
                correctIndex: 1,
              },
              {
                question: 'Random association as a creativity tool works by:',
                options: [
                  'Connecting the problem to a randomly selected word or image to break fixed thinking patterns',
                  'Randomly selecting from a list of pre-generated ideas',
                  'Assigning random participants to the problem',
                  'Generating associations without any structure or facilitation',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'SCAMPER Application',
            forLesson: 'Divergent Thinking Tools',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Apply the SCAMPER technique to any existing product or service of your choice. Generate at least one idea for each SCAMPER letter and select the two most promising for development.',
            requirements: [
              'One idea per SCAMPER letter (7 ideas minimum)',
              'Ideas range from incremental to radical',
              'Two selected ideas explained with why they are most promising',
            ],
          },
        ],
      },
      {
        id: 'c12_l3',
        title: 'Problem Framing',
        documents: [
          {
            id: 'c12_d2',
            kind: 'document',
            title: 'Problem Framing',
            readTime: '4 – 5 min read',
            intro:
              'The way a problem is framed determines the range of solutions visible. Reframe the problem and you instantly expand the solution space.',
            objectives: [
              'Apply "How Might We" reframing to transform problem statements',
              'Use root-cause analysis to distinguish symptoms from underlying problems',
            ],
            sections: [
              {
                heading: 'How Might We Reframing',
                text: '"How Might We" (HMW) statements transform problem descriptions into opportunity spaces. "Patients are not taking their medication" becomes "How might we make medication-taking feel less like a chore?" "Traffic is causing commute delays" becomes "How might we make the commute the most productive part of the day?" The HMW format is aspirational enough to open possibilities but specific enough to constrain the direction of thinking.',
                tip: 'Generate multiple HMW statements for the same problem. Each reframe opens a different part of the solution space.',
              },
              {
                heading: 'Root Cause Analysis',
                text: 'The 5 Whys technique: ask "Why?" five times to move from symptom to cause. "The report was late" → Why? "The data wasn\'t ready." → Why? "The team didn\'t know the deadline." → Why? "The deadline wasn\'t communicated clearly." → Why? "There is no standard communication process for project milestones." Root cause: process gap, not a people failure. Solving the root cause prevents recurrence; solving the symptom guarantees it.',
              },
            ],
            takeaways: [
              'HMW reframing transforms problem statements into opportunity spaces — generate multiple HMWs for the same problem',
              '5 Whys: ask "why" five times to move from symptom to root cause — solving symptoms guarantees recurrence',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c12_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Problem Framing Quiz',
            forLesson: 'Problem Framing',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of problem framing techniques.',
            questions: [
              {
                question: 'The "How Might We" format is useful because:',
                options: [
                  'It provides a template for a business plan',
                  'It transforms a problem into an opportunity space that invites solution generation',
                  'It narrows the problem to the single most important issue',
                  'It is the standard format required by design agencies',
                ],
                correctIndex: 1,
              },
              {
                question: 'The 5 Whys technique is used to:',
                options: [
                  'Generate five alternative solutions to a problem',
                  'Move from a symptom to the underlying root cause by asking "why" repeatedly',
                  'Evaluate five criteria for a design decision',
                  'Identify five stakeholders affected by a problem',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Solving a symptom rather than a root cause results in:',
                options: [
                  'A faster solution that buys time for a deeper fix',
                  'The problem recurring because its underlying cause remains',
                  "A partial solution that reduces the problem's frequency",
                  'A solution that transfers the problem to a different part of the system',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Generating multiple HMW statements for the same problem is useful because:',
                options: [
                  'Funders require multiple framing options',
                  'Each reframe opens a different part of the solution space',
                  'It satisfies multiple stakeholders with different perspectives',
                  'It slows down the process to allow deeper thinking',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Reframe Challenge',
            forLesson: 'Problem Framing',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Choose a real problem from your work, study, or community. Generate five HMW reframes and conduct a 5 Whys analysis. Identify which reframe opens the most promising solution space.',
            requirements: [
              'Five HMW statements that genuinely differ from each other',
              '5 Whys analysis showing each iteration',
              'Best HMW selected with reasoning about why it opens the richest solution space',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c12_m2',
    title: 'Module 2: Creative Problem Solving in Practice',
    lessons: [
      {
        id: 'c12_l4',
        title: 'Collaborative Creativity',
        documents: [],
        videos: [
          {
            id: 'c12_v2',
            kind: 'video',
            title: 'Collaborative Creativity',
            duration: '13 min',
            intro:
              'Groups can be dramatically more creative than individuals — or dramatically less, depending on how collaboration is structured. The design of collaboration matters more than the people.',
            topics: [
              'Why groups underperform individuals in unstructured brainstorming',
              'Nominal group technique and brainwriting as alternatives',
              'Psychological safety and its role in creative teams',
              'Building creative collaboration norms that last',
            ],
            moments: [
              { time: '0:00', label: 'Group creativity: promise and pitfalls' },
              { time: '3:00', label: 'Nominal group technique' },
              { time: '6:30', label: 'Psychological safety for creativity' },
              { time: '10:20', label: 'Building lasting creative norms' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c12_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Collaborative Creativity Quiz',
            forLesson: 'Collaborative Creativity',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of group creativity dynamics.',
            questions: [
              {
                question:
                  'Groups underperform individuals in unstructured brainstorming primarily because of:',
                options: [
                  'Diversity of thinking styles creating confusion',
                  'Social loafing and evaluation apprehension — people produce fewer ideas when others are present',
                  'Lack of a clear problem statement',
                  'Insufficient time for the group to warm up',
                ],
                correctIndex: 1,
              },
              {
                question: 'Brainwriting improves on group brainstorming by:',
                options: [
                  'Adding more participants to the session',
                  'Having individuals generate ideas silently before sharing, eliminating social pressure',
                  'Requiring all ideas to be written in a specific format',
                  'Eliminating the selection stage of the creative process',
                ],
                correctIndex: 1,
              },
              {
                question: 'Psychological safety in creative teams means:',
                options: [
                  'Physical safety during experiential creativity exercises',
                  'Team members feel safe to offer ideas without fear of ridicule or punishment',
                  'The team leader approves all ideas before they are shared',
                  'Creative risk-taking is rewarded regardless of outcome',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The design of a collaborative creativity session matters more than the people because:',
                options: [
                  'Individual creativity differences are negligible',
                  'Structure either enables or suppresses creativity in ways that override individual talent',
                  'Most creative teams are similarly talented',
                  'Group dynamics are too complex to predict from individual traits',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Creativity Session Design',
            forLesson: 'Collaborative Creativity',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Design a 45-minute collaborative creativity session for a real problem. Specify the method (brainwriting, nominal group, etc.), facilitation steps, and how you will create psychological safety.',
            requirements: [
              'Session structured with a timeline and specific activities',
              'Method chosen with justification over standard brainstorming',
              'One specific facilitation move to create psychological safety at the opening',
            ],
          },
        ],
      },
      {
        id: 'c12_l5',
        title: 'Rapid Prototyping Ideas',
        documents: [
          {
            id: 'c12_d3',
            kind: 'document',
            title: 'Rapid Prototyping Ideas',
            readTime: '4 – 5 min read',
            intro:
              'A prototype is a question made physical. Rapid prototyping tests assumptions about ideas before committing resources to build them.',
            objectives: [
              'Design a minimum fidelity prototype for a creative concept',
              'Apply assumption-testing thinking to prioritise what to prototype',
            ],
            sections: [
              {
                heading: 'Fidelity and When to Use It',
                text: 'Low-fidelity prototypes (paper sketches, sticky-note mockups, role-plays, wizard-of-oz simulations) are appropriate in the early stages when you are testing whether a concept resonates — are you solving the right problem? High-fidelity prototypes (functional software, engineered samples, detailed service blueprints) are appropriate when the concept is validated and you are testing whether your specific implementation works — is this the right solution? The rule: use the lowest fidelity that produces the information you need.',
                tip: 'Never build a high-fidelity prototype of an unvalidated concept. That is expensive confirmation of what you should have tested cheaply.',
              },
              {
                heading: 'Assumption Testing',
                text: 'Before building anything, list the assumptions your idea depends on. Rank them by: how critical is this assumption (if false, the idea fails) and how uncertain are we (do we know this is true?). Prototype and test the most critical and uncertain assumptions first. This is the same logic as the Lean Startup MVP: you are not building a product, you are running an experiment to test a belief.',
              },
            ],
            takeaways: [
              'Use the lowest fidelity that produces the information you need — never build high-fidelity before validating the concept',
              'Prototype the most critical AND most uncertain assumption first',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c12_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Rapid Prototyping Quiz',
            forLesson: 'Rapid Prototyping Ideas',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of prototyping and assumption testing.',
            questions: [
              {
                question: 'A low-fidelity prototype is most appropriate when:',
                options: [
                  'You want to impress stakeholders with a realistic demo',
                  'The concept is technically complex',
                  'You are testing whether the concept resonates before committing resources',
                  'The team has insufficient technical skills for higher fidelity',
                ],
                correctIndex: 2,
              },
              {
                question: 'The rule for prototype fidelity is:',
                options: [
                  'Always start with the highest fidelity you can afford',
                  'Use the lowest fidelity that produces the information you need',
                  "Match fidelity to the stakeholder's seniority",
                  'High fidelity for customer-facing prototypes; low for internal testing',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which assumption should be prototyped first?',
                options: [
                  'The assumption that is easiest to test',
                  'The assumption that most stakeholders agree on',
                  'The assumption that is most critical AND most uncertain',
                  'The assumption with the most financial impact',
                ],
                correctIndex: 2,
              },
              {
                question: 'A "Wizard of Oz" prototype simulates:',
                options: [
                  'Complex technology through a human performing the function behind the scenes',
                  'A fantasy product concept to generate creative inspiration',
                  'A fully automated process to test efficiency',
                  'An ideation session using a structured magic-like facilitation technique',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Prototype Plan',
            forLesson: 'Rapid Prototyping Ideas',
            dueDate: 'Jul 17',
            submission: 'File or link upload',
            instructions:
              'For your most promising idea from the course so far, list five assumptions the idea depends on. Rank them by criticality and uncertainty and design a low-fidelity prototype for the top-ranked assumption.',
            requirements: [
              'Five assumptions listed with criticality and uncertainty rated for each',
              'Top-ranked assumption identified with reasoning',
              'Low-fidelity prototype described: what it is, how you would test it, and what would constitute validation',
            ],
          },
        ],
      },
      {
        id: 'c12_l6',
        title: 'From Idea to Implementation',
        documents: [],
        videos: [
          {
            id: 'c12_v3',
            kind: 'video',
            title: 'From Idea to Implementation',
            duration: '12 min',
            intro:
              'The graveyard of innovation is full of brilliant ideas that were never implemented. Learn how to bridge the gap between creative insight and real-world change.',
            topics: [
              'Why creative ideas fail in implementation — the five most common causes',
              'Building a coalition of support for a creative idea',
              'Managing the transition from divergent to convergent thinking in a team',
              'Sustaining creative momentum through setbacks',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Why ideas die between insight and implementation',
              },
              { time: '2:50', label: 'Building implementation coalitions' },
              { time: '6:30', label: 'Divergent to convergent transition' },
              { time: '10:00', label: 'Sustaining momentum' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c12_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Idea Implementation Quiz',
            forLesson: 'From Idea to Implementation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of how to move creative ideas to implementation.',
            questions: [
              {
                question:
                  'The most common reason creative ideas fail in implementation is:',
                options: [
                  'Insufficient budget to execute the idea',
                  'Lack of stakeholder alignment — the right people were not involved in design',
                  'The idea was not creative enough to generate enthusiasm',
                  'Implementation teams lack creative skills',
                ],
                correctIndex: 1,
              },
              {
                question: 'Building a coalition for a creative idea means:',
                options: [
                  'Lobbying senior management to mandate adoption',
                  'Identifying and involving key stakeholders early so they have ownership, not just awareness',
                  'Creating a team of creative champions to promote the idea',
                  'Waiting until the prototype is complete before sharing the idea',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The transition from divergent to convergent thinking in a team requires:',
                options: [
                  'A senior leader to decide which ideas proceed',
                  'Clear criteria agreed in advance for how ideas will be evaluated and selected',
                  'All team members to abandon their preferred ideas',
                  'An external facilitator to manage the transition',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Sustaining creative momentum through setbacks requires:',
                options: [
                  'Celebrating only successful outcomes',
                  'Treating setbacks as learning and maintaining narrative continuity from initial inspiration',
                  'Replacing team members who contributed to failures',
                  'Reducing ambition to achievable near-term goals',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Implementation Roadmap',
            forLesson: 'From Idea to Implementation',
            dueDate: 'Jul 19',
            submission: 'File or link upload',
            instructions:
              'Create a one-page implementation roadmap for your best idea from this course. Show the path from concept to pilot in 90 days with key milestones, stakeholders to engage, and how you will handle the first major setback.',
            requirements: [
              '90-day timeline with at least five milestones',
              'Three key stakeholders identified with how you will build their ownership',
              'Most likely setback described with a specific contingency plan',
            ],
          },
        ],
      },
    ],
  },
];
