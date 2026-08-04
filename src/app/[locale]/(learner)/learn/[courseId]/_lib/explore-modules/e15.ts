import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course e15: Advanced Innovative Learning Patterns ─────────────────────────

export const E15_MODULES: ReviewModule[] = [
  {
    id: 'e15_m1',
    title: 'Module 1: Blended and Inquiry-Based Models',
    lessons: [
      {
        id: 'e15_l1',
        title: 'Designing Blended Learning Models',
        documents: [],
        videos: [
          {
            id: 'e15_v1',
            kind: 'video',
            title: 'Designing Blended Learning Models',
            duration: '19 min',
            intro:
              'Blended learning combines the best of in-person and independent digital learning — when it is designed deliberately rather than bolted together.',
            topics: [
              'Common blended learning models (station rotation, flipped, flex)',
              'Choosing which content works best independently vs. in person',
              'Sequencing independent and in-person work to reinforce each other',
              'Common blended learning design mistakes',
            ],
            moments: [
              { time: '0:00', label: 'What blended learning actually means' },
              { time: '5:00', label: 'Common blended models' },
              {
                time: '11:00',
                label: 'Choosing independent vs. in-person content',
              },
              { time: '16:00', label: 'Common design mistakes' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e15_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Blended Learning Models Quiz',
            forLesson: 'Designing Blended Learning Models',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of blended learning model design.',
            questions: [
              {
                question:
                  'Effective blended learning design primarily requires:',
                options: [
                  'Simply adding any digital tool to an in-person class',
                  'Deliberately deciding which content fits independent work vs. in-person time',
                  'Removing all in-person instruction',
                  'Removing all independent work',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In a "flipped" blended model, direct instruction typically happens:',
                options: [
                  'Only during class time',
                  'Independently, often before class, freeing class time for application',
                  'Never',
                  'Only through group work',
                ],
                correctIndex: 1,
              },
              {
                question: 'A common mistake in blended learning design is:',
                options: [
                  'Sequencing independent and in-person work to reinforce each other',
                  'Treating the digital and in-person components as disconnected rather than sequenced together',
                  'Choosing content deliberately for each mode',
                  'Reviewing the design for coherence',
                ],
                correctIndex: 1,
              },
              {
                question: 'Station rotation as a blended model involves:',
                options: [
                  'Learners staying in one fixed seat all class',
                  'Learners moving through different learning modes/stations, some independent and some facilitated',
                  'Only online learning with no rotation',
                  'Eliminating group work entirely',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e15_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Blended Unit Outline',
            forLesson: 'Designing Blended Learning Models',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Outline a one-week blended learning unit for a topic of your choice, specifying which activities happen independently and which happen in person, and why each was placed there.',
            requirements: [
              'Clear split between independent and in-person activities',
              'Reasoning given for at least three placement decisions',
              'Activities sequenced so each mode reinforces the other',
            ],
          },
        ],
      },
      {
        id: 'e15_l2',
        title: 'Inquiry-Based Facilitation',
        documents: [],
        videos: [
          {
            id: 'e15_v2',
            kind: 'video',
            title: 'Inquiry-Based Facilitation',
            duration: '20 min',
            intro:
              "Inquiry-based learning puts learners in the driver's seat of their own questions. Facilitating it well is harder than it looks — and different from teaching content directly.",
            topics: [
              'The inquiry cycle: question, investigate, construct, reflect',
              'Resisting the urge to give the answer too soon',
              'Scaffolding inquiry without controlling its outcome',
              'Assessing learning that emerges from open inquiry',
            ],
            moments: [
              { time: '0:00', label: 'The inquiry cycle' },
              { time: '5:30', label: 'Resisting the urge to answer' },
              { time: '11:30', label: 'Scaffolding without controlling' },
              { time: '16:30', label: 'Assessing open inquiry' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e15_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Inquiry-Based Facilitation Quiz',
            forLesson: 'Inquiry-Based Facilitation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of facilitating inquiry-based learning.',
            questions: [
              {
                question: 'The inquiry cycle typically moves through:',
                options: [
                  'Lecture, test, grade, repeat',
                  'Question, investigate, construct understanding, reflect',
                  'Only memorization and recall',
                  'A fixed answer given upfront',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A common facilitation challenge in inquiry-based learning is:',
                options: [
                  "Giving the answer too soon, short-circuiting the learner's own discovery",
                  'Letting learners ask too many questions',
                  'Providing no structure at all being the goal',
                  'Avoiding reflection entirely',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'Scaffolding an inquiry without controlling its outcome means:',
                options: [
                  'Directing learners to one predetermined conclusion',
                  'Providing support and structure while still letting learners reach their own conclusions',
                  'Removing all support',
                  'Grading only the final answer',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Assessing learning from open inquiry should focus on:',
                options: [
                  'Only whether the final answer matches a single expected answer',
                  'The quality of reasoning, investigation, and reflection, not just the final answer',
                  'Ignoring the process entirely',
                  'Speed of completion only',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e15_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Facilitate a Mini Inquiry Cycle',
            forLesson: 'Inquiry-Based Facilitation',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Plan a mini inquiry-based activity around a genuine open question, mapping out how you would scaffold each stage of the inquiry cycle without giving away the answer.',
            requirements: [
              'A genuine open question posed, not one with an obvious single answer',
              'All four inquiry cycle stages addressed',
              'At least one deliberate scaffold described that avoids giving away the answer',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e15_m2',
    title: 'Module 2: Transformative Design',
    lessons: [
      {
        id: 'e15_l3',
        title: 'Transformative Learning Design',
        documents: [],
        videos: [
          {
            id: 'e15_v3',
            kind: 'video',
            title: 'Transformative Learning Design',
            duration: '18 min',
            intro:
              'Transformative learning goes beyond adding knowledge — it can reshape how a learner sees themselves or the world. Learn what makes learning experiences transformative.',
            topics: [
              'Transformative vs. informational learning',
              'Disorienting dilemmas as a trigger for transformation',
              'Creating space for critical reflection',
              'Supporting learners through the discomfort of a shifting perspective',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Transformative vs. informational learning',
              },
              { time: '4:30', label: 'Disorienting dilemmas' },
              { time: '9:30', label: 'Space for critical reflection' },
              {
                time: '14:00',
                label: 'Supporting learners through discomfort',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e15_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Transformative Learning Design Quiz',
            forLesson: 'Transformative Learning Design',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of transformative learning design.',
            questions: [
              {
                question:
                  'Transformative learning differs from purely informational learning in that it:',
                options: [
                  'Only adds new facts',
                  'Can reshape how a learner sees themselves or the world, not just what they know',
                  'Never involves discomfort',
                  'Is identical to memorization',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A "disorienting dilemma" in transformative learning theory is:',
                options: [
                  'A distraction to avoid',
                  "An experience that challenges a learner's existing assumptions, prompting reflection",
                  'A grading rubric',
                  'A scheduling conflict',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Critical reflection in transformative learning design should:',
                options: [
                  'Be skipped to save time',
                  'Be deliberately built into the learning experience, not left to chance',
                  'Only happen for advanced learners',
                  'Replace the disorienting dilemma entirely',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Supporting learners through the discomfort of a shifting perspective is important because:',
                options: [
                  'Discomfort should always be avoided in learning',
                  'Transformation often requires sitting with productive discomfort rather than avoiding it',
                  'Discomfort has no role in learning',
                  'Learners never experience discomfort during transformation',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e15_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Transformative Learning Moment',
            forLesson: 'Transformative Learning Design',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Design a learning experience built around a genuine disorienting dilemma related to a topic of your choice, including a structured reflection activity to help learners process it.',
            requirements: [
              'A specific disorienting dilemma described',
              'A structured critical reflection activity included',
              'A plan for supporting learners who find the experience uncomfortable',
            ],
          },
        ],
      },
      {
        id: 'e15_l4',
        title: 'Evaluating and Iterating on Learning Design',
        documents: [],
        videos: [
          {
            id: 'e15_v4',
            kind: 'video',
            title: 'Evaluating and Iterating on Learning Design',
            duration: '17 min',
            intro:
              'Even advanced, thoughtfully designed learning experiences need honest evaluation and iteration. Close the course by learning how to systematically improve your own designs.',
            topics: [
              'Building in evaluation from the start of a design, not as an afterthought',
              'Gathering evidence of impact beyond satisfaction surveys',
              'Distinguishing a design flaw from a one-time implementation issue',
              'Iterating on a learning design across multiple cycles',
            ],
            moments: [
              { time: '0:00', label: 'Evaluation from the start, not the end' },
              { time: '4:30', label: 'Evidence beyond satisfaction surveys' },
              { time: '9:00', label: 'Design flaw vs. implementation issue' },
              { time: '13:00', label: 'Iterating across cycles' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e15_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Evaluating Learning Design Quiz',
            forLesson: 'Evaluating and Iterating on Learning Design',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of evaluating and iterating on learning design.',
            questions: [
              {
                question:
                  'Building evaluation into a design from the start, rather than as an afterthought, helps by:',
                options: [
                  'Having no real benefit',
                  'Ensuring you can actually tell whether the design achieved its intended effect',
                  'Making the design more complicated with no payoff',
                  'Replacing the need for a learning goal',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Relying only on learner satisfaction surveys to evaluate a design risks:',
                options: [
                  'Capturing the full picture of learning impact',
                  'Missing whether real learning outcomes were actually achieved',
                  'Being too rigorous',
                  'Having no risk at all',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Distinguishing a design flaw from a one-time implementation issue matters because it:',
                options: [
                  'Has no bearing on what to change next',
                  'Determines whether you should redesign the experience or just improve delivery next time',
                  'Always points to the same fix',
                  'Is impossible to determine',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Iterating on a learning design across multiple cycles means:',
                options: [
                  'Using the exact same design forever without changes',
                  'Refining the design repeatedly based on evidence from each cycle',
                  'Redesigning from scratch every single time',
                  'Skipping evaluation between cycles',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e15_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Evaluation and Iteration Plan',
            forLesson: 'Evaluating and Iterating on Learning Design',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'For a learning design you created earlier in this course, propose an evaluation plan (beyond a satisfaction survey) and describe how you would decide whether any issues found were design flaws or implementation issues.',
            requirements: [
              'An evaluation method proposed beyond a satisfaction survey',
              'A clear method for distinguishing design flaws from implementation issues',
              'At least one planned iteration based on hypothetical findings',
            ],
          },
        ],
      },
    ],
  },
];
