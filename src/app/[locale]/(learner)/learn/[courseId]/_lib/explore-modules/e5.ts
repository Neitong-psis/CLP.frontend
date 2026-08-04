import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course e5: Innovative Learning Essentials ────────────────────────────────

export const E5_MODULES: ReviewModule[] = [
  {
    id: 'e5_m1',
    title: 'Module 1: Learner-Centered Foundations',
    lessons: [
      {
        id: 'e5_l1',
        title: 'Principles of Project-Based Learning',
        documents: [],
        videos: [
          {
            id: 'e5_v1',
            kind: 'video',
            title: 'Principles of Project-Based Learning',
            duration: '16 min',
            intro:
              'Project-based learning turns lessons into real investigations. Learn the core principles that separate genuine PBL from a project in name only.',
            topics: [
              'What separates project-based learning from a "project"',
              'Driving questions that anchor a project',
              'Authentic products and audiences',
              'Assessing process, not just the final output',
            ],
            moments: [
              { time: '0:00', label: 'What genuine PBL looks like' },
              { time: '4:00', label: 'Driving questions' },
              { time: '8:30', label: 'Authentic products and audiences' },
              { time: '12:30', label: 'Assessing the process' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e5_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Project-Based Learning Quiz',
            forLesson: 'Principles of Project-Based Learning',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of project-based learning principles.',
            questions: [
              {
                question:
                  'A key feature that separates true project-based learning from a simple classroom project is:',
                options: [
                  'A due date',
                  'A driving question that requires genuine inquiry to answer',
                  'A grade at the end',
                  'A group of at least four students',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'An "authentic audience" for a student project means:',
                options: [
                  'Only the teacher will ever see it',
                  'The work is shared with a real audience beyond the classroom',
                  'No one reviews the work',
                  'The audience is always the whole school',
                ],
                correctIndex: 1,
              },
              {
                question: 'Effective PBL assessment typically includes:',
                options: [
                  'Only the final product, ignoring the process',
                  'Both the process (research, iteration) and the final product',
                  'Neither process nor product',
                  'Only whether the deadline was met',
                ],
                correctIndex: 1,
              },
              {
                question: 'A strong driving question for a project is usually:',
                options: [
                  'Answerable with a single yes/no',
                  'Open enough to require investigation and support multiple valid approaches',
                  'Identical to a textbook question',
                  'Unrelated to the learning goal',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e5_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Draft a Driving Question',
            forLesson: 'Principles of Project-Based Learning',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Choose a learning goal and draft a driving question for a project-based unit, then describe what an authentic product and audience for it could look like.',
            requirements: [
              'Driving question is open-ended and tied to the learning goal',
              'An authentic product described',
              'An authentic audience beyond the teacher identified',
            ],
          },
        ],
      },
      {
        id: 'e5_l2',
        title: 'Active Facilitation Techniques',
        documents: [],
        videos: [
          {
            id: 'e5_v2',
            kind: 'video',
            title: 'Active Facilitation Techniques',
            duration: '15 min',
            intro:
              'Facilitating a learner-centered classroom is a different skill than lecturing. Learn techniques that keep learners doing the thinking.',
            topics: [
              'Asking rather than telling',
              'Wait time and why most educators rush past it',
              'Small-group facilitation moves',
              'Redirecting without shutting down discussion',
            ],
            moments: [
              { time: '0:00', label: 'Facilitating vs. lecturing' },
              { time: '3:30', label: 'The power of wait time' },
              { time: '7:30', label: 'Small-group moves' },
              { time: '11:00', label: 'Redirecting a discussion' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e5_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Active Facilitation Quiz',
            forLesson: 'Active Facilitation Techniques',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of active facilitation techniques.',
            questions: [
              {
                question:
                  'Active facilitation, compared to lecturing, aims to:',
                options: [
                  'Have the facilitator do most of the talking',
                  'Keep learners doing the thinking and talking',
                  'Eliminate all discussion',
                  'Replace all questions with statements',
                ],
                correctIndex: 1,
              },
              {
                question: '"Wait time" after asking a question refers to:',
                options: [
                  'Answering the question yourself immediately',
                  'Pausing to give learners time to think before anyone responds',
                  'Skipping the question entirely',
                  'Calling only on the first hand raised',
                ],
                correctIndex: 1,
              },
              {
                question: 'A useful small-group facilitation move is:',
                options: [
                  'Ignoring groups once they start working',
                  'Circulating and asking probing questions rather than giving answers',
                  'Assigning all roles permanently',
                  'Never intervening under any circumstance',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Redirecting a discussion that has gone off track should:',
                options: [
                  'Shut down all further discussion',
                  'Acknowledge the point made and steer back toward the learning goal',
                  'Punish the learner who raised it',
                  'Ignore the derailment and continue anyway',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e5_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Facilitation Script',
            forLesson: 'Active Facilitation Techniques',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Write a short facilitation script for a 15-minute discussion on a topic of your choice, including at least three open-ended questions and one planned redirect if the discussion drifts.',
            requirements: [
              'At least three open-ended questions included',
              'Deliberate wait time noted after each question',
              'A planned redirect strategy described',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e5_m2',
    title: 'Module 2: Designing Engagement',
    lessons: [
      {
        id: 'e5_l3',
        title: 'Creative Assessment Methods',
        documents: [],
        videos: [
          {
            id: 'e5_v3',
            kind: 'video',
            title: 'Creative Assessment Methods',
            duration: '17 min',
            intro:
              'A single written test rarely captures what a learner actually understands. Explore assessment formats that reveal deeper learning.',
            topics: [
              'Limitations of traditional single-format testing',
              'Portfolios as an assessment tool',
              'Peer and self-assessment',
              'Choosing an assessment format that fits the learning goal',
            ],
            moments: [
              { time: '0:00', label: 'Limits of the traditional test' },
              { time: '4:30', label: 'Portfolios in practice' },
              { time: '9:30', label: 'Peer and self-assessment' },
              { time: '14:00', label: 'Matching format to goal' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e5_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Creative Assessment Quiz',
            forLesson: 'Creative Assessment Methods',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of creative assessment methods.',
            questions: [
              {
                question:
                  'A key limitation of relying solely on a single written test is:',
                options: [
                  'It always measures learning accurately',
                  'It may miss skills like creativity, collaboration, or process that a test format cannot capture',
                  'It takes too little time to grade',
                  'It has no limitations',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A portfolio as an assessment method primarily shows:',
                options: [
                  'A single snapshot in time',
                  'Growth and a body of work over time',
                  'Only the final grade',
                  'Nothing useful about the learner',
                ],
                correctIndex: 1,
              },
              {
                question: 'Peer assessment, done well, helps learners:',
                options: [
                  'Avoid ever giving feedback',
                  "Develop critical evaluation skills by assessing others' work against clear criteria",
                  "Replace the teacher's role entirely",
                  'Only criticize without structure',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Choosing an assessment format should be driven primarily by:',
                options: [
                  'Tradition alone',
                  'What best reveals whether the specific learning goal was met',
                  'Whichever format is fastest to grade',
                  'Random selection',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e5_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design an Alternative Assessment',
            forLesson: 'Creative Assessment Methods',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'For a learning goal of your choice, design an alternative to a written test (e.g. a portfolio, presentation, or peer-assessed project) including the criteria you would use to evaluate it.',
            requirements: [
              'Learning goal clearly stated',
              'Alternative assessment format described in detail',
              'At least three evaluation criteria defined',
            ],
          },
        ],
      },
      {
        id: 'e5_l4',
        title: 'Designing a Learner-Centered Lesson',
        documents: [],
        videos: [
          {
            id: 'e5_v4',
            kind: 'video',
            title: 'Designing a Learner-Centered Lesson',
            duration: '19 min',
            intro:
              'Bring the principles of this course together by designing a full lesson that puts learners, not the teacher, at the center.',
            topics: [
              'Starting a lesson design from the learning goal, not the activity',
              'Building in choice and voice for learners',
              'Structuring time for exploration and reflection',
              'Anticipating where learners will get stuck',
            ],
            moments: [
              { time: '0:00', label: 'Starting from the learning goal' },
              { time: '4:30', label: 'Building in choice and voice' },
              {
                time: '10:00',
                label: 'Structuring exploration and reflection',
              },
              { time: '15:00', label: 'Anticipating sticking points' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e5_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Learner-Centered Lesson Design Quiz',
            forLesson: 'Designing a Learner-Centered Lesson',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of designing learner-centered lessons.',
            questions: [
              {
                question:
                  'A learner-centered lesson design typically starts from:',
                options: [
                  'A fun activity with no clear goal',
                  'The specific learning goal the lesson should achieve',
                  'The length of the class period only',
                  'Whatever materials are already available',
                ],
                correctIndex: 1,
              },
              {
                question: 'Building in "choice and voice" for learners means:',
                options: [
                  'Allowing zero flexibility in how they complete the work',
                  'Giving learners meaningful options in topic, process, or product',
                  'Letting learners skip the lesson entirely',
                  'Only applies to older students',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Structuring time for reflection at the end of a lesson helps learners:',
                options: [
                  'Waste time',
                  'Consolidate and make sense of what they just learned',
                  'Forget the lesson faster',
                  'Avoid engaging with the content',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Anticipating where learners will get stuck allows a facilitator to:',
                options: [
                  'Avoid planning any support',
                  'Prepare targeted scaffolds or questions in advance',
                  'Remove the challenge from the lesson entirely',
                  'Only address problems after class ends',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e5_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Full Lesson Plan',
            forLesson: 'Designing a Learner-Centered Lesson',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design a complete learner-centered lesson plan for a topic of your choice, including the learning goal, an element of learner choice, a reflection activity, and at least one anticipated sticking point with a planned response.',
            requirements: [
              'Clear learning goal stated',
              'At least one element of learner choice included',
              'A reflection activity described',
              'One anticipated sticking point and response planned',
            ],
          },
        ],
      },
    ],
  },
];
