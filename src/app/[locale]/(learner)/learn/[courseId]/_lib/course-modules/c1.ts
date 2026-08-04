import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

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
