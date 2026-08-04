import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course e2: Foundations of Child Development ──────────────────────────────

export const E2_MODULES: ReviewModule[] = [
  {
    id: 'e2_m1',
    title: 'Module 1: Developmental Stages',
    lessons: [
      {
        id: 'e2_l1',
        title: 'Milestones from Infancy to Early Childhood',
        documents: [],
        videos: [
          {
            id: 'e2_v1',
            kind: 'video',
            title: 'Milestones from Infancy to Early Childhood',
            duration: '19 min',
            intro:
              'Every child moves through a predictable sequence of physical, cognitive, and social milestones. Learn to recognize typical development at each stage.',
            topics: [
              'Physical milestones from birth to age five',
              'Cognitive leaps in the first years',
              'Social and emotional milestones',
              'Recognizing typical variation vs. red flags',
            ],
            moments: [
              { time: '0:00', label: 'Why milestones matter' },
              { time: '5:00', label: 'Physical development markers' },
              { time: '10:30', label: 'Cognitive leaps' },
              { time: '15:00', label: 'When to seek further support' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e2_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Developmental Milestones Quiz',
            forLesson: 'Milestones from Infancy to Early Childhood',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of early childhood developmental milestones.',
            questions: [
              {
                question: 'A developmental milestone is best described as:',
                options: [
                  'A fixed age every child must reach exactly',
                  'A skill most children develop within a typical age range',
                  'A medical diagnosis',
                  'An IQ test result',
                ],
                correctIndex: 1,
              },
              {
                question: 'Variation in when children reach a milestone is:',
                options: [
                  'Always a sign of a serious problem',
                  'Normal within a typical range',
                  'Impossible',
                  'Only seen in cognitive milestones',
                ],
                correctIndex: 1,
              },
              {
                question: 'A "red flag" in development refers to:',
                options: [
                  'Any variation at all',
                  'A delay significant enough to warrant further evaluation',
                  "A child's favorite color",
                  'A milestone reached early',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Tracking milestones across physical, cognitive, and social domains helps caregivers:',
                options: [
                  'Only measure height and weight',
                  "See a fuller picture of a child's overall development",
                  'Ignore emotional development entirely',
                  'Replace the need for play',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e2_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Milestone Timeline',
            forLesson: 'Milestones from Infancy to Early Childhood',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Create a timeline from birth to age five noting one physical, one cognitive, and one social/emotional milestone typically reached in each age band, using course materials as a reference.',
            requirements: [
              'Timeline covers birth to age five in clear age bands',
              'At least one milestone per domain per band',
              'Sources or reasoning cited for each milestone',
            ],
          },
        ],
      },
      {
        id: 'e2_l2',
        title: 'Cognitive and Language Development',
        documents: [],
        videos: [
          {
            id: 'e2_v2',
            kind: 'video',
            title: 'Cognitive and Language Development',
            duration: '18 min',
            intro:
              'Language explodes in the early years alongside rapid cognitive growth. Understand how the two develop together.',
            topics: [
              'Stages of early language acquisition',
              'Vocabulary growth and the "word spurt"',
              "Cognitive development through Piaget's early stages",
              'How caregiver interaction shapes language growth',
            ],
            moments: [
              { time: '0:00', label: 'Language milestones overview' },
              { time: '4:30', label: 'The vocabulary spurt' },
              { time: '9:30', label: "Piaget's early stages" },
              { time: '14:00', label: "The caregiver's role" },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e2_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cognitive and Language Development Quiz',
            forLesson: 'Cognitive and Language Development',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of cognitive and language development.',
            questions: [
              {
                question: 'The "word spurt" refers to:',
                options: [
                  'A sudden slowdown in vocabulary growth',
                  'A rapid increase in vocabulary typically seen around 18-24 months',
                  'A speech disorder',
                  'A stage that only affects bilingual children',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'According to Piaget, infants primarily learn about the world through:',
                options: [
                  'Abstract reasoning',
                  'Direct sensory and motor experience',
                  'Formal instruction',
                  'Reading',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Caregiver interaction (e.g. talking, responding to babbling) tends to:',
                options: [
                  'Have no measurable effect on language development',
                  'Meaningfully support language growth',
                  'Only matter after age five',
                  'Slow down vocabulary growth',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Cognitive and language development in early childhood are best understood as:',
                options: [
                  'Entirely separate processes',
                  'Closely intertwined processes that reinforce each other',
                  'Only relevant to formal schooling',
                  'Fixed at birth',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e2_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Observe and Log Language Growth',
            forLesson: 'Cognitive and Language Development',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Observe a young child (or use a provided case study) for 20 minutes and log examples of their language use, then note what stage of language development the examples suggest.',
            requirements: [
              'At least five specific language examples logged',
              'Each example linked to a development stage discussed in this lesson',
              'A brief note on what caregiver behavior seemed to support the language observed',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e2_m2',
    title: 'Module 2: Nurturing Growth',
    lessons: [
      {
        id: 'e2_l3',
        title: 'Play-Based Learning',
        documents: [],
        videos: [
          {
            id: 'e2_v3',
            kind: 'video',
            title: 'Play-Based Learning',
            duration: '17 min',
            intro:
              'Play is not a break from learning in early childhood — it is how learning happens. Understand why and how to design for it.',
            topics: [
              'Why play is the primary vehicle for early learning',
              'Types of play: solitary, parallel, and cooperative',
              'Guided vs. free play',
              'Choosing materials that invite open-ended play',
            ],
            moments: [
              { time: '0:00', label: 'Play as learning, not a break from it' },
              { time: '4:30', label: 'Types of play by age' },
              { time: '9:00', label: 'Guided vs. free play' },
              { time: '13:00', label: 'Choosing open-ended materials' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e2_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Play-Based Learning Quiz',
            forLesson: 'Play-Based Learning',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of play-based learning.',
            questions: [
              {
                question: 'Play-based learning treats play as:',
                options: [
                  'A distraction from real learning',
                  'A primary vehicle through which young children learn',
                  'Only appropriate after age six',
                  'Irrelevant to cognitive growth',
                ],
                correctIndex: 1,
              },
              {
                question: 'Parallel play describes children who:',
                options: [
                  'Play cooperatively with shared rules',
                  'Play alongside each other without direct interaction',
                  'Never play near other children',
                  'Only play with adults',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Open-ended materials (like blocks or sand) are valued because they:',
                options: [
                  'Have only one correct way to use them',
                  'Support many different kinds of exploration and pretend scenarios',
                  'Are cheaper than other toys',
                  'Discourage creativity',
                ],
                correctIndex: 1,
              },
              {
                question: 'Guided play, compared to fully free play, involves:',
                options: [
                  'An adult dictating every step',
                  'An adult subtly shaping the play environment or asking questions while the child leads',
                  'No adult involvement whatsoever',
                  'Removing all toys',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e2_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Play-Based Activity',
            forLesson: 'Play-Based Learning',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Design one play-based activity for a specific age band that targets a stated learning goal (e.g. counting, sharing, fine motor skills), including the materials needed and how you would subtly guide it.',
            requirements: [
              'Age band and learning goal clearly stated',
              'Materials list included',
              'At least one example of a guiding question or prompt an adult could use',
            ],
          },
        ],
      },
      {
        id: 'e2_l4',
        title: 'Building a Nurturing Home Environment',
        documents: [],
        videos: [
          {
            id: 'e2_v4',
            kind: 'video',
            title: 'Building a Nurturing Home Environment',
            duration: '16 min',
            intro:
              "A child's home environment shapes their sense of security and their readiness to explore and learn. Learn the elements that matter most.",
            topics: [
              'Consistency and routine as sources of security',
              'Responsive caregiving and secure attachment',
              'Creating a safe space for exploration',
              "Balancing structure with a child's independence",
            ],
            moments: [
              { time: '0:00', label: 'Why routine matters' },
              { time: '4:00', label: 'Responsive caregiving' },
              { time: '8:00', label: 'A safe space to explore' },
              { time: '12:00', label: 'Structure vs. independence' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e2_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Nurturing Home Environment Quiz',
            forLesson: 'Building a Nurturing Home Environment',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of nurturing home environments.',
            questions: [
              {
                question:
                  'Consistent routines primarily give young children a sense of:',
                options: [
                  'Boredom',
                  'Security and predictability',
                  'Restriction with no benefit',
                  'Nothing measurable',
                ],
                correctIndex: 1,
              },
              {
                question: 'Responsive caregiving means:',
                options: [
                  "Ignoring a child's signals to build independence",
                  "Reliably noticing and responding to a child's needs and cues",
                  'Responding only when convenient',
                  'Only responding to crying',
                ],
                correctIndex: 1,
              },
              {
                question: 'A "safe space for exploration" balances:',
                options: [
                  'Total restriction with total freedom',
                  'Removing hazards while still allowing the child to explore and take small risks',
                  'Locking away all objects',
                  'Constant adult intervention',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Giving a child age-appropriate independence within a structured environment supports:',
                options: [
                  'Confidence and a sense of competence',
                  'Only chaos',
                  'Delayed development',
                  'Nothing developmentally relevant',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e2_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Home Environment Checklist',
            forLesson: 'Building a Nurturing Home Environment',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Create a checklist a caregiver could use to evaluate whether a home environment supports secure attachment, safe exploration, and healthy independence for a child of a specified age.',
            requirements: [
              'Checklist covers all three areas: attachment, safe exploration, independence',
              'At least ten concrete, actionable items',
              'Items appropriate to the age specified',
            ],
          },
        ],
      },
    ],
  },
];
