// Per-course curriculum content for explore (marketplace) courses.
// Each explore course has unique topic-matched content, mirroring the
// enrolled-course pattern in course-modules.ts. Item IDs are prefixed
// (e1_-e15_) to ensure global uniqueness.

import type { ReviewModule } from '../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course e1: The Complete Khmer Literature Course ──────────────────────────

export const E1_MODULES: ReviewModule[] = [
  {
    id: 'e1_m1',
    title: 'Module 1: Foundations of Khmer Literature',
    lessons: [
      {
        id: 'e1_l1',
        title: 'Classical Poetry Forms',
        documents: [],
        videos: [
          {
            id: 'e1_v1',
            kind: 'video',
            title: 'Classical Poetry Forms',
            duration: '18 min',
            intro:
              'A tour of the classical Khmer poetic forms and the strict metrical rules that shaped centuries of verse.',
            topics: [
              'Bat and Kaap: the core classical meters',
              'Syllable counts and rhyme schemes',
              'The role of poetry in royal and religious texts',
              'Reading classical verse aloud for meaning',
            ],
            moments: [
              { time: '0:00', label: 'Why classical forms matter' },
              { time: '4:30', label: 'Bat and Kaap explained' },
              { time: '9:15', label: 'Rhyme scheme walkthrough' },
              { time: '14:00', label: 'Reading a classical poem aloud' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e1_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Classical Poetry Forms Quiz',
            forLesson: 'Classical Poetry Forms',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of classical Khmer poetic forms.',
            questions: [
              {
                question: 'Which of these is a traditional Khmer poetic meter?',
                options: ['Sonnet', 'Bat Kambot', 'Haiku', 'Free verse'],
                correctIndex: 1,
              },
              {
                question: 'Classical Khmer poetry is most strictly defined by:',
                options: [
                  'Free rhythm with no rules',
                  'Fixed syllable counts and rhyme schemes',
                  'Random line lengths',
                  'The absence of any structure',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Classical Khmer verse was historically used most often for:',
                options: [
                  'Royal chronicles and religious texts',
                  'Advertising',
                  'Legal contracts',
                  'Weather reports',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'Reading classical verse aloud helps a reader primarily to:',
                options: [
                  'Skip understanding the meaning',
                  'Feel the meter and rhyme that carry its meaning',
                  'Avoid literary analysis',
                  'Replace the need for translation',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e1_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Scan a Classical Poem',
            forLesson: 'Classical Poetry Forms',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Choose a short classical Khmer poem provided in class and mark its syllable count and rhyme pattern line by line, then read it aloud and note where the rhythm falls naturally.',
            requirements: [
              'Syllable count marked for every line',
              'Rhyme pattern correctly identified',
              'A short reflection on how the rhythm affected the meaning',
            ],
          },
        ],
      },
      {
        id: 'e1_l2',
        title: 'Prose and the Novel Tradition',
        documents: [],
        videos: [
          {
            id: 'e1_v2',
            kind: 'video',
            title: 'Prose and the Novel Tradition',
            duration: '20 min',
            intro:
              'Khmer prose fiction grew out of oral storytelling into a distinct literary tradition. Trace its key turning points.',
            topics: [
              'From oral tales to written prose',
              'Early 20th-century Khmer novels',
              'Character and setting in Khmer fiction',
              'How social change shaped prose themes',
            ],
            moments: [
              { time: '0:00', label: 'From oral tales to the page' },
              { time: '5:00', label: 'Early Khmer novels' },
              { time: '11:00', label: 'Character and setting' },
              { time: '16:30', label: 'Prose reflecting social change' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e1_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Prose and the Novel Tradition Quiz',
            forLesson: 'Prose and the Novel Tradition',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of Khmer prose and the novel tradition.',
            questions: [
              {
                question: 'Khmer prose fiction historically developed out of:',
                options: [
                  'Foreign translation only',
                  'Oral storytelling traditions',
                  'Legal documents',
                  'Newspaper advertising',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Early Khmer novels are most useful to study because they:',
                options: [
                  'Have no connection to Khmer life',
                  'Reflect the social changes of their era',
                  'Were written only for children',
                  'Avoid any characters',
                ],
                correctIndex: 1,
              },
              {
                question: 'Setting in a Khmer novel typically serves to:',
                options: [
                  'Ground the story in a recognizable place and time',
                  'Replace the need for characters',
                  'Confuse the reader intentionally',
                  'Have no narrative purpose',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'A defining feature of the transition from oral tale to written prose is:',
                options: [
                  'Loss of a fixed narrator perspective and reader-facing structure',
                  'The complete disappearance of storytelling',
                  'A move to strict poetic meter',
                  'Removal of all dialogue',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e1_a2',
            kind: 'assignment',
            status: 'Ready',
            title: "Trace a Story's Roots",
            forLesson: 'Prose and the Novel Tradition',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Pick a well-known Khmer prose story and write a short essay tracing which elements likely originated in oral storytelling tradition versus elements shaped by written literary convention.',
            requirements: [
              'At least two oral-tradition elements identified',
              'At least two written-convention elements identified',
              'A clear connection drawn between the story and its social context',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e1_m2',
    title: 'Module 2: Reading and Writing Practice',
    lessons: [
      {
        id: 'e1_l3',
        title: 'Oral Tradition and Storytelling',
        documents: [],
        videos: [
          {
            id: 'e1_v3',
            kind: 'video',
            title: 'Oral Tradition and Storytelling',
            duration: '19 min',
            intro:
              'Long before Khmer literature was written down, stories were carried and reshaped through oral performance. Learn how oral tradition still shapes the written word.',
            topics: [
              'Characteristics of orally transmitted tales',
              'Repetition, rhythm, and memory aids in oral storytelling',
              'How stories change as they pass between tellers',
              "Oral tradition's influence on modern Khmer writers",
            ],
            moments: [
              { time: '0:00', label: 'What makes a tale oral' },
              { time: '5:30', label: 'Repetition and memory devices' },
              { time: '11:00', label: 'How stories evolve over retellings' },
              { time: '16:00', label: 'Oral tradition in modern writing' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e1_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Oral Tradition and Storytelling Quiz',
            forLesson: 'Oral Tradition and Storytelling',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Assess your understanding of Khmer oral storytelling tradition.',
            questions: [
              {
                question: 'Oral tales often use repetition primarily to:',
                options: [
                  'Confuse the listener',
                  'Aid memory and performance for both teller and audience',
                  'Lengthen the story with no purpose',
                  'Replace the need for a plot',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A story passed down orally across generations tends to:',
                options: [
                  'Stay word-for-word identical forever',
                  'Shift slightly with each telling while keeping its core meaning',
                  'Disappear after one telling',
                  'Become a legal document',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Modern Khmer writers draw on oral tradition mainly to:',
                options: [
                  'Avoid any connection to the past',
                  'Root their work in a shared cultural memory and rhythm',
                  'Eliminate character development',
                  'Write exclusively in verse',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A key difference between oral and written storytelling is:',
                options: [
                  'Oral storytelling has no audience',
                  'Oral storytelling is shaped in real time by performance and audience response',
                  'Written storytelling cannot be revised',
                  'Oral storytelling is always shorter',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e1_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Retell an Oral Tale',
            forLesson: 'Oral Tradition and Storytelling',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Write down a folktale you know from oral tradition (or one provided in class) in your own words, then note two places where you made a storytelling choice a teller before you might have made differently.',
            requirements: [
              "Full retelling of the tale in the student's own words",
              'At least two storytelling choices identified and explained',
              'Reflection on what was gained or lost in writing it down',
            ],
          },
        ],
      },
      {
        id: 'e1_l4',
        title: 'Applied Writing: From Reading to Craft',
        documents: [],
        videos: [
          {
            id: 'e1_v4',
            kind: 'video',
            title: 'Applied Writing: From Reading to Craft',
            duration: '17 min',
            intro:
              'Reading closely is the first step toward writing well. Learn how to turn what you notice in great Khmer writing into your own technique.',
            topics: [
              'Identifying technique in a piece you admire',
              'Imitation as a legitimate learning tool',
              'Building a personal writing voice from influences',
              'Revising a first draft with a critical eye',
            ],
            moments: [
              { time: '0:00', label: 'Reading like a writer' },
              { time: '4:30', label: 'Imitation as practice' },
              { time: '9:00', label: 'Finding your own voice' },
              { time: '13:30', label: 'Revising with intent' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e1_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Applied Writing Quiz',
            forLesson: 'Applied Writing: From Reading to Craft',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of applying literary reading to your own writing.',
            questions: [
              {
                question: 'Reading "like a writer" means:',
                options: [
                  'Only reading for entertainment',
                  'Noticing and naming the specific techniques an author uses',
                  'Skipping difficult passages',
                  'Avoiding any analysis',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Imitating a technique from an admired writer during practice is:',
                options: [
                  'Considered plagiarism in all cases',
                  'A legitimate way to learn craft before finding your own voice',
                  'Forbidden in creative writing',
                  'Only useful for poetry',
                ],
                correctIndex: 1,
              },
              {
                question: 'A personal writing voice typically develops by:',
                options: [
                  'Copying one writer exactly forever',
                  'Blending multiple influences into something distinctly your own',
                  'Avoiding all outside influence',
                  'Writing only in one fixed form',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Revising a first draft with a critical eye mainly means:',
                options: [
                  'Publishing it unchanged',
                  'Reading it as a stranger would and questioning weak choices',
                  'Deleting it and starting over every time',
                  'Ignoring feedback from others',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e1_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Write in the Style of a Master',
            forLesson: 'Applied Writing: From Reading to Craft',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Choose a short passage from a Khmer writer studied in this course and write an original 200-300 word piece imitating one specific technique from it (e.g. imagery, sentence rhythm, dialogue style), then explain your choice.',
            requirements: [
              'Original piece between 200 and 300 words',
              'One specific imitated technique clearly identified',
              'A short explanation of what was learned from the imitation',
            ],
          },
        ],
      },
    ],
  },
];

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

// ── Course e3: Khmer Poetry and Oral Tradition ────────────────────────────────

export const E3_MODULES: ReviewModule[] = [
  {
    id: 'e3_m1',
    title: 'Module 1: Poetic Forms',
    lessons: [
      {
        id: 'e3_l1',
        title: 'Bat Kambot and Classical Meters',
        documents: [],
        videos: [
          {
            id: 'e3_v1',
            kind: 'video',
            title: 'Bat Kambot and Classical Meters',
            duration: '17 min',
            intro:
              'Bat Kambot is one of the most distinctive classical Khmer verse forms. Learn its structure and how to hear it read aloud.',
            topics: [
              'The Bat Kambot form: line and syllable structure',
              'Comparing Bat Kambot to other classical meters',
              'Common subjects treated in classical Khmer verse',
              'Listening for meter when reading aloud',
            ],
            moments: [
              { time: '0:00', label: 'What makes Bat Kambot distinct' },
              { time: '4:00', label: 'Line and syllable structure' },
              { time: '8:30', label: 'Comparing classical meters' },
              { time: '13:00', label: 'Reading for meter' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e3_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Bat Kambot and Classical Meters Quiz',
            forLesson: 'Bat Kambot and Classical Meters',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of Bat Kambot and classical Khmer meters.',
            questions: [
              {
                question: 'Bat Kambot is best described as:',
                options: [
                  'A modern free-verse style',
                  'A classical Khmer verse form with a defined structure',
                  'A type of prose narrative',
                  'A form used only in theater',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Classical Khmer meters are primarily distinguished from one another by:',
                options: [
                  'Their subject matter alone',
                  'Differences in line and syllable structure',
                  "The author's name",
                  'Their length in pages',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Classical Khmer verse frequently addressed subjects such as:',
                options: [
                  'Only modern technology',
                  'Moral teachings, religious themes, and royal chronicles',
                  'Sports statistics',
                  'Weather forecasting',
                ],
                correctIndex: 1,
              },
              {
                question: 'Reading classical verse "for meter" means:',
                options: [
                  'Ignoring the sound entirely',
                  'Paying attention to the rhythmic pattern the structure creates',
                  'Reading only silently',
                  'Skipping rhymed lines',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e3_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Identify a Classical Meter',
            forLesson: 'Bat Kambot and Classical Meters',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Given three short unlabeled Khmer poems, identify which one is written in Bat Kambot and justify your answer using its line and syllable structure.',
            requirements: [
              'Correct poem identified with structural evidence',
              'Syllable counts shown for at least two lines',
              "A brief comparison to one of the other two poems' forms",
            ],
          },
        ],
      },
      {
        id: 'e3_l2',
        title: 'Modern Free Verse',
        documents: [],
        videos: [
          {
            id: 'e3_v2',
            kind: 'video',
            title: 'Modern Free Verse',
            duration: '15 min',
            intro:
              'Twentieth-century Khmer poets broke from strict classical meter to write in free verse. Explore what was gained — and what was left behind.',
            topics: [
              'The shift from fixed meter to free verse',
              'How free verse changed what poems could say',
              'Reading free verse for rhythm without a fixed pattern',
              'Notable modern Khmer poets who embraced free verse',
            ],
            moments: [
              { time: '0:00', label: 'Why poets moved to free verse' },
              { time: '4:00', label: 'What free verse allows' },
              { time: '8:00', label: 'Rhythm without fixed meter' },
              { time: '11:30', label: 'Modern poets to know' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e3_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Modern Free Verse Quiz',
            forLesson: 'Modern Free Verse',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of modern Khmer free verse.',
            questions: [
              {
                question:
                  'Free verse differs from classical Khmer meter primarily by:',
                options: [
                  'Having no fixed syllable count or rhyme scheme',
                  'Being written only in prose',
                  'Always being longer',
                  'Avoiding all imagery',
                ],
                correctIndex: 0,
              },
              {
                question: 'A benefit poets found in free verse was:',
                options: [
                  'Reduced expressive range',
                  'Greater flexibility to match form to content and voice',
                  'A stricter set of rules',
                  'The elimination of rhythm entirely',
                ],
                correctIndex: 1,
              },
              {
                question: 'Free verse still relies on:',
                options: [
                  'A fixed syllable count',
                  'Rhythm and line breaks chosen deliberately by the poet',
                  'No structure whatsoever',
                  'Classical rhyme rules',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The shift to free verse in Khmer poetry occurred largely:',
                options: [
                  'Before classical poetry existed',
                  'In the twentieth century, alongside broader literary change',
                  'Only in translated foreign poems',
                  'As a rejection of all Khmer tradition',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e3_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Compare Classical and Free Verse',
            forLesson: 'Modern Free Verse',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              "Choose one classical Khmer poem and one modern free-verse Khmer poem on a similar theme, and write a short comparison of how form shapes the reader's experience in each.",
            requirements: [
              'Both poems clearly identified',
              'At least two specific formal differences discussed',
              'A conclusion on how form affects meaning in each poem',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e3_m2',
    title: 'Module 2: Voice and Analysis',
    lessons: [
      {
        id: 'e3_l3',
        title: 'Recitation Practice',
        documents: [],
        videos: [
          {
            id: 'e3_v3',
            kind: 'video',
            title: 'Recitation Practice',
            duration: '14 min',
            intro:
              "Khmer poetry was written to be heard. Build the recitation skills that bring a poem's rhythm and meaning to life.",
            topics: [
              'Breathing and pacing for recitation',
              'Using pause and emphasis to convey meaning',
              'Recitation traditions in Khmer culture',
              'Preparing a poem for performance',
            ],
            moments: [
              { time: '0:00', label: 'Why recitation matters' },
              { time: '3:30', label: 'Breath and pacing' },
              { time: '7:30', label: 'Pause and emphasis' },
              { time: '11:00', label: 'Preparing to perform' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e3_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Recitation Practice Quiz',
            forLesson: 'Recitation Practice',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of Khmer poetry recitation.',
            questions: [
              {
                question: 'Recitation of Khmer poetry is valuable because it:',
                options: [
                  'Has no connection to meaning',
                  'Reveals rhythm and emphasis that shape how a poem is understood',
                  'Replaces the need to read the text',
                  'Is only a modern practice',
                ],
                correctIndex: 1,
              },
              {
                question: 'Pausing at a deliberate point while reciting can:',
                options: [
                  'Break the poem entirely',
                  'Emphasize a key word or shift in meaning',
                  'Only be used in prose',
                  'Have no effect on meaning',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Preparing a poem for performance typically includes:',
                options: [
                  'Memorizing it without understanding it',
                  'Practicing pacing, emphasis, and breath alongside understanding the meaning',
                  'Reading it only once silently',
                  "Ignoring the poem's structure",
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Recitation traditions in Khmer culture are historically tied to:',
                options: [
                  'Private, silent reading only',
                  'Communal and performative settings',
                  'Modern digital media exclusively',
                  'Written examinations only',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e3_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Record a Recitation',
            forLesson: 'Recitation Practice',
            dueDate: 'Jul 10',
            submission: 'File upload',
            instructions:
              'Prepare and record a recitation of a Khmer poem studied in this course, marking your script beforehand with where you will pause and which words you will emphasize.',
            requirements: [
              'Marked script submitted alongside the recording',
              'Clear pacing and emphasis audible in the recitation',
              'A short note on why those emphasis choices were made',
            ],
          },
        ],
      },
      {
        id: 'e3_l4',
        title: 'Literary Analysis of Poems',
        documents: [],
        videos: [
          {
            id: 'e3_v4',
            kind: 'video',
            title: 'Literary Analysis of Poems',
            duration: '18 min',
            intro:
              'Close reading turns an enjoyable poem into a text you can talk about with precision. Learn a repeatable method for analyzing Khmer poetry.',
            topics: [
              'A close-reading method for poetry',
              'Identifying imagery and symbolism',
              'Connecting form to theme',
              'Writing a clear, evidence-based literary argument',
            ],
            moments: [
              { time: '0:00', label: 'A method for close reading' },
              { time: '5:00', label: 'Imagery and symbolism' },
              { time: '10:00', label: 'Connecting form to theme' },
              { time: '14:30', label: 'Building an evidence-based argument' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e3_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Literary Analysis Quiz',
            forLesson: 'Literary Analysis of Poems',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of literary analysis applied to poetry.',
            questions: [
              {
                question: 'Close reading a poem primarily involves:',
                options: [
                  'Skimming for the general topic only',
                  'Careful, repeated attention to word choice, structure, and imagery',
                  "Reading someone else's summary instead",
                  "Ignoring the poem's form",
                ],
                correctIndex: 1,
              },
              {
                question: 'Symbolism in a poem refers to:',
                options: [
                  'A word used only for its literal meaning',
                  'An image or object that represents a larger idea beyond its literal meaning',
                  'A grammatical error',
                  'A footnote',
                ],
                correctIndex: 1,
              },
              {
                question: 'A strong literary argument about a poem should be:',
                options: [
                  'Based only on personal opinion with no evidence',
                  'Supported by specific evidence from the text',
                  'Impossible to write about poetry',
                  "Always about the poet's biography only",
                ],
                correctIndex: 1,
              },
              {
                question: "Connecting a poem's form to its theme means:",
                options: [
                  'Ignoring the form entirely',
                  "Showing how structural choices (meter, line breaks, form) reinforce the poem's meaning",
                  'Only discussing the theme without form',
                  'Assuming form has no relationship to meaning',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e3_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Write a Close-Reading Essay',
            forLesson: 'Literary Analysis of Poems',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              "Write a 400-500 word close-reading essay on a Khmer poem of your choice, analyzing at least one image or symbol and connecting the poem's form to its central theme.",
            requirements: [
              'Essay between 400 and 500 words',
              'At least one image or symbol analyzed in depth',
              'A clear connection made between form and theme, supported by textual evidence',
            ],
          },
        ],
      },
    ],
  },
];

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

// ── Course e6: Complete Storytelling Bootcamp ────────────────────────────────

export const E6_MODULES: ReviewModule[] = [
  {
    id: 'e6_m1',
    title: 'Module 1: Storytelling Fundamentals',
    lessons: [
      {
        id: 'e6_l1',
        title: 'Story Structure and Character',
        documents: [],
        videos: [
          {
            id: 'e6_v1',
            kind: 'video',
            title: 'Story Structure and Character',
            duration: '16 min',
            intro:
              'Every memorable story rests on a handful of structural choices and a character worth following. Learn the fundamentals that hold a story together.',
            topics: [
              'The three-act shape of a story',
              'What makes a character worth following',
              'Wants vs. needs as a driver of character',
              'Establishing stakes early',
            ],
            moments: [
              { time: '0:00', label: 'The three-act shape' },
              { time: '4:30', label: 'What makes a character compelling' },
              { time: '9:00', label: 'Wants vs. needs' },
              { time: '13:00', label: 'Establishing stakes' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e6_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Story Structure and Character Quiz',
            forLesson: 'Story Structure and Character',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of story structure and character.',
            questions: [
              {
                question:
                  'The three-act structure broadly divides a story into:',
                options: [
                  'Introduction, climax, and credits',
                  'Setup, confrontation, and resolution',
                  'Only a beginning and an end',
                  'Four equal parts',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A character\'s "want" differs from their "need" in that the want is usually:',
                options: [
                  'The deeper truth the character must learn',
                  'The surface-level goal the character consciously pursues',
                  'Irrelevant to the plot',
                  'Identical to the need in every story',
                ],
                correctIndex: 1,
              },
              {
                question: 'Establishing stakes early in a story helps by:',
                options: [
                  'Confusing the reader intentionally',
                  'Giving the reader a reason to care what happens next',
                  'Removing all tension',
                  'Delaying the plot indefinitely',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A character becomes worth following mainly because they:',
                options: [
                  'Are perfect and face no challenges',
                  'Want something and face real obstacles pursuing it',
                  'Never change',
                  'Have no flaws mentioned',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e6_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Character Sketch',
            forLesson: 'Story Structure and Character',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Write a one-page character sketch for an original character, clearly stating their surface-level want and their deeper underlying need, plus one obstacle standing in their way.',
            requirements: [
              'Want and need both stated and clearly distinguished',
              'At least one concrete obstacle described',
              'Sketch is approximately one page long',
            ],
          },
        ],
      },
      {
        id: 'e6_l2',
        title: 'Finding Your Narrative Voice',
        documents: [],
        videos: [
          {
            id: 'e6_v2',
            kind: 'video',
            title: 'Finding Your Narrative Voice',
            duration: '15 min',
            intro:
              "Voice is what makes one storyteller's version of an old tale feel entirely their own. Learn to recognize and develop yours.",
            topics: [
              'What "voice" means in storytelling',
              'Word choice and sentence rhythm as voice',
              'Reading widely to discover influences',
              'Consistency of voice across a piece',
            ],
            moments: [
              { time: '0:00', label: 'What voice actually is' },
              { time: '3:30', label: 'Word choice and rhythm' },
              { time: '7:30', label: 'Reading to find influences' },
              { time: '11:00', label: 'Keeping voice consistent' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e6_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Narrative Voice Quiz',
            forLesson: 'Finding Your Narrative Voice',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of narrative voice.',
            questions: [
              {
                question: 'A writer\'s "voice" is best described as:',
                options: [
                  'The literal volume of their speech',
                  'The distinctive way they use language that makes their writing recognizable',
                  'A rule about grammar',
                  'Something every writer must copy from another',
                ],
                correctIndex: 1,
              },
              {
                question: 'Sentence rhythm contributes to voice by:',
                options: [
                  'Having no effect on how writing feels',
                  'Shaping the pace and feel of the prose',
                  'Only mattering in poetry',
                  'Being fixed and unchangeable',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Reading widely helps a writer develop their own voice by:',
                options: [
                  'Forcing them to copy one author exactly',
                  'Exposing them to many influences they can blend into something original',
                  'Having no effect on writing style',
                  'Replacing the need to write',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Voice should generally stay consistent within a single piece because:',
                options: [
                  'Consistency has no effect on the reader',
                  'Sudden unexplained shifts can pull the reader out of the story',
                  'Voice cannot change within a story regardless',
                  'Inconsistency always improves a story',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e6_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Rewrite in Two Voices',
            forLesson: 'Finding Your Narrative Voice',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Take the same short scene (provided in class) and rewrite it twice in two distinctly different narrative voices, then explain what changed beyond just the words.',
            requirements: [
              'Two clearly distinct rewrites of the same scene',
              'Each rewrite maintains internal voice consistency',
              'A short explanation of what specifically changed between the two',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e6_m2',
    title: 'Module 2: Crafting Original Stories',
    lessons: [
      {
        id: 'e6_l3',
        title: 'Folktale Adaptation',
        documents: [],
        videos: [
          {
            id: 'e6_v3',
            kind: 'video',
            title: 'Folktale Adaptation',
            duration: '17 min',
            intro:
              'Adapting a folktale means honoring its core while making deliberate choices about what to change for a new audience. Learn how to do it thoughtfully.',
            topics: [
              'What to preserve when adapting a folktale',
              'Updating setting, voice, or perspective deliberately',
              "Avoiding flattening the tale's original meaning",
              'Case study: a Khmer folktale adapted for a modern audience',
            ],
            moments: [
              { time: '0:00', label: 'What must be preserved' },
              { time: '4:30', label: 'Deliberate updates' },
              { time: '9:30', label: 'Avoiding flattened meaning' },
              { time: '13:30', label: 'A case study adaptation' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e6_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Folktale Adaptation Quiz',
            forLesson: 'Folktale Adaptation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of folktale adaptation.',
            questions: [
              {
                question:
                  'A thoughtful folktale adaptation typically preserves:',
                options: [
                  'Nothing from the original',
                  "The tale's core meaning or moral, even if details change",
                  'Only the title',
                  'The exact original wording',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Updating a folktale's setting or perspective should be:",
                options: [
                  'Avoided in all cases',
                  'A deliberate choice made for a clear reason, not arbitrary',
                  'Random and unconsidered',
                  'Impossible without changing the meaning',
                ],
                correctIndex: 1,
              },
              {
                question: 'A risk in adapting a folktale carelessly is:',
                options: [
                  'Improving it automatically',
                  'Flattening or losing the meaning the original conveyed',
                  'Making it too short',
                  'None — adaptation carries no risk',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Retelling a folktale from a new character's perspective is an example of:",
                options: [
                  'A structural error',
                  'A deliberate adaptation choice that can reveal new meaning',
                  'Something that always ruins a story',
                  'Plagiarism',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e6_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Adapt a Folktale',
            forLesson: 'Folktale Adaptation',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Choose a Khmer folktale and adapt it by changing one deliberate element (setting, narrator perspective, or era), while preserving its core meaning, then explain your adaptation choices.',
            requirements: [
              'Adapted retelling submitted in full',
              'Exactly one major deliberate change clearly identified',
              'Explanation of how the core meaning was preserved',
            ],
          },
        ],
      },
      {
        id: 'e6_l4',
        title: 'Writing an Original Short Story',
        documents: [],
        videos: [
          {
            id: 'e6_v4',
            kind: 'video',
            title: 'Writing an Original Short Story',
            duration: '20 min',
            intro:
              'Bring everything together and write a complete original short story from first idea to finished draft.',
            topics: [
              'Generating a story idea worth pursuing',
              'Outlining without over-planning',
              'Drafting quickly, then revising deliberately',
              'Getting and using feedback on a draft',
            ],
            moments: [
              { time: '0:00', label: 'Finding an idea worth writing' },
              { time: '5:00', label: 'Outlining lightly' },
              { time: '10:30', label: 'Drafting and revising' },
              { time: '16:00', label: 'Using feedback well' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e6_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Short Story Writing Quiz',
            forLesson: 'Writing an Original Short Story',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of the short story writing process.',
            questions: [
              {
                question: 'A "light" outline before drafting is meant to:',
                options: [
                  'Lock in every detail before writing begins',
                  'Provide just enough direction without over-planning the discovery of writing',
                  'Replace the need to draft entirely',
                  'Guarantee a perfect first draft',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Drafting quickly and revising deliberately as separate stages helps because:',
                options: [
                  'Editing while drafting always improves speed',
                  'Separating generation from evaluation reduces the pressure to be perfect immediately',
                  'Revision is unnecessary if the draft is fast',
                  'Drafting should always take longer than revising',
                ],
                correctIndex: 1,
              },
              {
                question: 'Useful feedback on a draft typically focuses on:',
                options: [
                  'Only grammar and spelling',
                  'Whether the story achieves its intended effect on the reader',
                  'Praising the writer with no specifics',
                  'Rewriting the story for the author',
                ],
                correctIndex: 1,
              },
              {
                question: 'A story idea "worth pursuing" is usually one that:',
                options: [
                  'Has already been written exactly the same way before',
                  'Genuinely interests the writer and offers something to explore',
                  'Requires no character or conflict',
                  'Can only be a single sentence long',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e6_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Write and Revise a Short Story',
            forLesson: 'Writing an Original Short Story',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Write an original short story of 800-1200 words, then revise it once based on feedback from a peer or instructor, submitting both the first draft and the revised version.',
            requirements: [
              'Original draft between 800 and 1200 words',
              'Revised version submitted alongside the original',
              'A short note on what changed in revision and why',
            ],
          },
        ],
      },
    ],
  },
];

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

// ── Course e8: Full Community Leadership Program ─────────────────────────────

export const E8_MODULES: ReviewModule[] = [
  {
    id: 'e8_m1',
    title: 'Module 1: Civic Foundations',
    lessons: [
      {
        id: 'e8_l1',
        title: 'Principles of Civic Engagement',
        documents: [],
        videos: [
          {
            id: 'e8_v1',
            kind: 'video',
            title: 'Principles of Civic Engagement',
            duration: '19 min',
            intro:
              'Civic engagement turns concerned residents into an organized force for change. Learn the foundational principles that make it effective and sustainable.',
            topics: [
              'What distinguishes civic engagement from one-off activism',
              'Building legitimacy with a community',
              'Identifying shared interests across a diverse group',
              'Sustaining engagement beyond a single event',
            ],
            moments: [
              { time: '0:00', label: 'Civic engagement vs. one-off activism' },
              { time: '5:00', label: 'Building legitimacy' },
              { time: '11:00', label: 'Finding shared interests' },
              { time: '16:00', label: 'Sustaining engagement over time' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Civic Engagement Quiz',
            forLesson: 'Principles of Civic Engagement',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of civic engagement principles.',
            questions: [
              {
                question:
                  'Sustained civic engagement differs from a single protest or event mainly by:',
                options: [
                  'Requiring no ongoing relationships',
                  'Building lasting organization and relationships that outlast any one event',
                  'Being illegal in most contexts',
                  'Involving fewer people',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A community organizer builds legitimacy primarily by:',
                options: [
                  'Claiming authority without community input',
                  "Genuinely listening to and representing the community's actual concerns",
                  'Avoiding the community entirely',
                  'Working only with local government',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Identifying shared interests across a diverse group helps because it:',
                options: [
                  'Divides the group further',
                  'Creates common ground that can unify otherwise different stakeholders',
                  'Has no strategic value',
                  'Only works in homogeneous communities',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Engagement that fades immediately after a single event usually indicates:',
                options: [
                  'A highly effective, sustainable campaign',
                  'A lack of ongoing structure or follow-through',
                  'Nothing worth examining',
                  'Success by definition',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e8_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Map Shared Community Interests',
            forLesson: 'Principles of Civic Engagement',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'For a community issue of your choice, identify three different stakeholder groups and one shared interest that could unite them around action.',
            requirements: [
              'Three distinct stakeholder groups identified',
              'A genuinely shared interest articulated, not a generic statement',
              'A first step proposed for building legitimacy with these groups',
            ],
          },
        ],
      },
      {
        id: 'e8_l2',
        title: 'Building Youth Mentorship Programs',
        documents: [],
        videos: [
          {
            id: 'e8_v2',
            kind: 'video',
            title: 'Building Youth Mentorship Programs',
            duration: '18 min',
            intro:
              "Youth mentorship programs can multiply a community's leadership capacity for a generation. Learn how to design one that actually works.",
            topics: [
              'Matching mentors and youth thoughtfully',
              'Structuring a mentorship program with clear goals',
              'Training and supporting volunteer mentors',
              'Measuring whether a mentorship program is working',
            ],
            moments: [
              { time: '0:00', label: 'Why structured matching matters' },
              { time: '4:30', label: 'Setting program goals' },
              { time: '9:30', label: 'Supporting mentors' },
              { time: '14:00', label: 'Measuring program success' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Youth Mentorship Programs Quiz',
            forLesson: 'Building Youth Mentorship Programs',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of youth mentorship program design.',
            questions: [
              {
                question:
                  'Thoughtful mentor-youth matching typically considers:',
                options: [
                  'Nothing beyond availability',
                  'Shared interests, goals, and compatibility between mentor and mentee',
                  "Only the mentor's convenience",
                  'Random assignment for fairness',
                ],
                correctIndex: 1,
              },
              {
                question: 'A mentorship program without clear goals risks:',
                options: [
                  'Automatically succeeding regardless',
                  'Drifting without a way to know if it is helping youth',
                  'Being too structured',
                  'Requiring less mentor training',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Ongoing training and support for volunteer mentors helps by:',
                options: [
                  'Being unnecessary once a mentor is matched',
                  'Keeping mentors equipped and engaged, improving program consistency',
                  'Discouraging mentor participation',
                  'Replacing the need for goals',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Measuring a mentorship program's success should include:",
                options: [
                  'Only counting how many mentors signed up',
                  'Outcomes for the youth involved, not just participation numbers',
                  'Ignoring youth feedback entirely',
                  'No measurement at all',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e8_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Mentorship Program Outline',
            forLesson: 'Building Youth Mentorship Programs',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Outline a youth mentorship program including matching criteria, program goals, a mentor support plan, and two metrics you would track to measure success.',
            requirements: [
              'Matching criteria specified',
              'Clear program goals stated',
              'A mentor support/training plan described',
              'Two measurable success metrics defined',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e8_m2',
    title: 'Module 2: Organizing at the Grassroots',
    lessons: [
      {
        id: 'e8_l3',
        title: 'Grassroots Organizing Fundamentals',
        documents: [],
        videos: [
          {
            id: 'e8_v3',
            kind: 'video',
            title: 'Grassroots Organizing Fundamentals',
            duration: '20 min',
            intro:
              'Grassroots organizing builds power from the ground up, one relationship at a time. Learn the core practices that turn individuals into a movement.',
            topics: [
              'One-on-one relational meetings as the base unit of organizing',
              'Identifying and developing local leaders',
              'Turning individual concerns into collective action',
              'Building a base broad enough to sustain a campaign',
            ],
            moments: [
              { time: '0:00', label: 'The relational meeting' },
              { time: '5:30', label: 'Identifying local leaders' },
              {
                time: '11:30',
                label: 'From individual concern to collective action',
              },
              { time: '16:30', label: 'Building a broad base' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Grassroots Organizing Quiz',
            forLesson: 'Grassroots Organizing Fundamentals',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of grassroots organizing fundamentals.',
            questions: [
              {
                question:
                  'The relational one-on-one meeting is considered a base unit of organizing because it:',
                options: [
                  "Wastes an organizer's limited time",
                  'Builds the trust and understanding needed to mobilize people effectively',
                  'Replaces the need for any collective action',
                  'Only works with people already committed',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Identifying and developing local leaders matters because:',
                options: [
                  'One organizer can and should do everything alone',
                  'Distributed leadership builds a movement that can sustain itself',
                  'Leaders slow down organizing efforts',
                  'Local leaders have no credibility',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Turning an individual's concern into collective action typically involves:",
                options: [
                  'Dismissing the individual concern as unimportant',
                  'Connecting it to others who share the concern to build shared power',
                  'Keeping every concern private',
                  'Waiting for government to act first',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A broad base is important for a campaign because it:',
                options: [
                  'Makes the campaign harder to sustain',
                  'Provides the numbers and diversity needed to sustain pressure over time',
                  'Has no relationship to campaign success',
                  'Only matters for national campaigns',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e8_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Plan a Relational Meeting Series',
            forLesson: 'Grassroots Organizing Fundamentals',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Plan a series of five one-on-one relational meetings for a community issue you care about, including who you would meet with and the key question you would ask each person.',
            requirements: [
              'Five specific people or roles identified to meet with',
              'A core relational question defined for the meetings',
              'A plan for how you would connect their individual concerns to collective action',
            ],
          },
        ],
      },
      {
        id: 'e8_l4',
        title: 'Sustaining a Community Movement',
        documents: [],
        videos: [
          {
            id: 'e8_v4',
            kind: 'video',
            title: 'Sustaining a Community Movement',
            duration: '17 min',
            intro:
              'Momentum is easy to generate and hard to sustain. Learn what keeps a community movement alive well past its first campaign.',
            topics: [
              'Avoiding organizer burnout',
              'Building leadership pipelines so the movement outlasts any one person',
              'Celebrating wins to sustain morale',
              'Adapting strategy as conditions change',
            ],
            moments: [
              { time: '0:00', label: 'The burnout risk' },
              { time: '4:00', label: 'Building a leadership pipeline' },
              { time: '8:00', label: 'Celebrating wins' },
              { time: '12:00', label: 'Adapting as conditions change' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Sustaining a Movement Quiz',
            forLesson: 'Sustaining a Community Movement',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of sustaining a community movement.',
            questions: [
              {
                question: 'A leadership pipeline within a movement helps it:',
                options: [
                  'Depend permanently on one founding leader',
                  'Continue functioning even as individual leaders move on',
                  'Become weaker over time',
                  'Avoid developing new leaders',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Deliberately celebrating small wins during a long campaign helps by:',
                options: [
                  'Distracting from the larger goal',
                  'Sustaining morale and motivation over a long effort',
                  'Signaling the campaign has ended',
                  'Having no effect on participants',
                ],
                correctIndex: 1,
              },
              {
                question: 'Organizer burnout is best addressed by:',
                options: [
                  'Ignoring it and pushing through indefinitely',
                  'Distributing responsibility and building sustainable practices from the start',
                  'Relying on one person to carry the whole movement',
                  'Ending the movement immediately',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A movement that fails to adapt its strategy as conditions change risks:',
                options: [
                  'Guaranteed continued success',
                  'Losing relevance or effectiveness as the situation evolves',
                  'Nothing — strategy never needs to change',
                  'Automatically gaining more support',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e8_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Movement Sustainability Plan',
            forLesson: 'Sustaining a Community Movement',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'For a community movement or campaign you have studied or participated in, propose a plan to prevent burnout, build a leadership pipeline, and mark milestones for celebration.',
            requirements: [
              'A specific burnout-prevention practice proposed',
              'A leadership pipeline mechanism described',
              'At least two milestones identified for celebration',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e9: Child Psychology A-Z: Growth & Behavior ───────────────────────

export const E9_MODULES: ReviewModule[] = [
  {
    id: 'e9_m1',
    title: 'Module 1: Attachment and Emotion',
    lessons: [
      {
        id: 'e9_l1',
        title: 'Attachment Theory in Practice',
        documents: [],
        videos: [
          {
            id: 'e9_v1',
            kind: 'video',
            title: 'Attachment Theory in Practice',
            duration: '21 min',
            intro:
              "Attachment theory explains why a child's earliest relationships shape how they explore, cope, and connect for years to come.",
            topics: [
              'The core attachment styles: secure and insecure patterns',
              'How responsive caregiving builds secure attachment',
              'Recognizing signs of insecure attachment',
              'Applying attachment theory in everyday caregiving',
            ],
            moments: [
              { time: '0:00', label: 'Why early attachment matters' },
              { time: '6:00', label: 'Secure vs. insecure patterns' },
              { time: '12:30', label: 'What builds secure attachment' },
              { time: '18:00', label: 'Applying it day to day' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e9_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Attachment Theory Quiz',
            forLesson: 'Attachment Theory in Practice',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of attachment theory.',
            questions: [
              {
                question: 'A securely attached child typically:',
                options: [
                  'Avoids the caregiver entirely',
                  'Uses the caregiver as a safe base to explore from and returns for comfort when needed',
                  'Shows no reaction to separation or reunion',
                  'Cannot form relationships later in life',
                ],
                correctIndex: 1,
              },
              {
                question: 'Secure attachment is most strongly built through:',
                options: [
                  'Inconsistent, unpredictable caregiving',
                  "Consistent, responsive caregiving to a child's needs and signals",
                  'Strict scheduling with no flexibility',
                  'Avoiding physical comfort',
                ],
                correctIndex: 1,
              },
              {
                question: 'A sign that may indicate insecure attachment is:',
                options: [
                  'A child calmly exploring and checking back with a caregiver',
                  'A child showing extreme distress or indifference at both separation and reunion',
                  'A child occasionally seeking comfort',
                  'Normal age-appropriate curiosity',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Attachment theory is useful in everyday caregiving because it:',
                options: [
                  'Only applies to clinical settings',
                  "Helps caregivers understand why responsiveness to a child's cues matters",
                  'Has no practical application',
                  'Applies only after age ten',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e9_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Attachment Observation',
            forLesson: 'Attachment Theory in Practice',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Observe a caregiver-child interaction (in person or a provided video) and identify signs consistent with secure attachment, noting specific behaviors as evidence.',
            requirements: [
              'At least three specific observed behaviors noted',
              'Each behavior connected to a concept from attachment theory',
              'A brief reflection on what the caregiver did that supported security',
            ],
          },
        ],
      },
      {
        id: 'e9_l2',
        title: 'Emotional Regulation in Young Children',
        documents: [],
        videos: [
          {
            id: 'e9_v2',
            kind: 'video',
            title: 'Emotional Regulation in Young Children',
            duration: '18 min',
            intro:
              'Young children are not born knowing how to manage big feelings — they learn it, often through the adults around them. Learn how regulation develops.',
            topics: [
              'Why young children struggle to self-regulate',
              'Co-regulation: how adults lend their calm',
              'Naming emotions as a regulation tool',
              'Common regulation-supporting strategies by age',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Why big feelings overwhelm young children',
              },
              { time: '4:30', label: 'Co-regulation explained' },
              { time: '9:30', label: 'Naming emotions' },
              { time: '14:00', label: 'Strategies by age' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e9_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Emotional Regulation Quiz',
            forLesson: 'Emotional Regulation in Young Children',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of emotional regulation in early childhood.',
            questions: [
              {
                question:
                  'Young children often struggle to self-regulate because:',
                options: [
                  'They are being deliberately difficult',
                  'The brain regions supporting self-regulation are still developing',
                  'They dislike their caregivers',
                  'Regulation is a skill with no developmental basis',
                ],
                correctIndex: 1,
              },
              {
                question: 'Co-regulation refers to:',
                options: [
                  'A child regulating entirely alone',
                  'An adult helping calm a child by staying calm and present themselves',
                  "Ignoring a child's distress until it passes",
                  'A formal therapy technique only',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Naming an emotion out loud for a young child (e.g. "you seem frustrated") tends to:',
                options: [
                  'Make the emotion worse',
                  'Help the child begin to recognize and eventually manage that feeling',
                  'Have no effect on regulation',
                  'Only work for older children',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Regulation-supporting strategies should generally be:',
                options: [
                  "Identical regardless of the child's age",
                  "Matched to the child's developmental stage",
                  'Only used with infants',
                  'Avoided entirely',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e9_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Co-Regulation Strategy Card',
            forLesson: 'Emotional Regulation in Young Children',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Create a strategy card for caregivers with three co-regulation techniques appropriate for a specified age range, including a short script for naming a difficult emotion.',
            requirements: [
              'Age range specified',
              'Three distinct co-regulation techniques described',
              'A sample emotion-naming script included',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e9_m2',
    title: 'Module 2: Behavior and Inclusion',
    lessons: [
      {
        id: 'e9_l3',
        title: 'Positive Behavioral Guidance',
        documents: [],
        videos: [
          {
            id: 'e9_v3',
            kind: 'video',
            title: 'Positive Behavioral Guidance',
            duration: '19 min',
            intro:
              'Behavioral guidance that punishes without teaching rarely produces lasting change. Learn a positive, developmentally appropriate approach instead.',
            topics: [
              'Understanding the function behind a behavior',
              'Setting clear, consistent expectations',
              'Natural and logical consequences vs. punishment',
              'Reinforcing desired behavior effectively',
            ],
            moments: [
              { time: '0:00', label: 'Behavior as communication' },
              { time: '5:00', label: 'Clear, consistent expectations' },
              { time: '10:30', label: 'Consequences vs. punishment' },
              { time: '15:30', label: 'Reinforcing what you want to see' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e9_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Positive Behavioral Guidance Quiz',
            forLesson: 'Positive Behavioral Guidance',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of positive behavioral guidance.',
            questions: [
              {
                question:
                  'Understanding the "function" behind a challenging behavior means:',
                options: [
                  'Ignoring the behavior entirely',
                  'Identifying what need or communication the behavior is serving',
                  'Assuming the child is simply being defiant',
                  'Punishing immediately without further thought',
                ],
                correctIndex: 1,
              },
              {
                question: 'A logical consequence, compared to punishment, is:',
                options: [
                  'Unrelated to the behavior and purely punitive',
                  'Directly connected to the behavior and focused on teaching, not just penalizing',
                  'Always more severe',
                  'Never used with young children',
                ],
                correctIndex: 1,
              },
              {
                question: 'Consistent expectations help children primarily by:',
                options: [
                  'Creating confusion',
                  'Providing predictability that makes it easier to meet expectations',
                  'Removing the need for any guidance',
                  'Having no measurable benefit',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Effectively reinforcing desired behavior typically involves:',
                options: [
                  'Only reacting to misbehavior',
                  'Noticing and encouraging the behavior you want to see more of',
                  'Ignoring all behavior, positive or negative',
                  'Using reinforcement only for older children',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e9_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Behavior Guidance Plan',
            forLesson: 'Positive Behavioral Guidance',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'For a provided case study of a challenging behavior, identify its likely function, propose a logical consequence, and describe one way to reinforce the desired alternative behavior.',
            requirements: [
              'Likely function of the behavior identified with reasoning',
              'A logical (not purely punitive) consequence proposed',
              'A specific reinforcement strategy for the desired behavior described',
            ],
          },
        ],
      },
      {
        id: 'e9_l4',
        title: 'Inclusive Early Education Practices',
        documents: [],
        videos: [
          {
            id: 'e9_v4',
            kind: 'video',
            title: 'Inclusive Early Education Practices',
            duration: '20 min',
            intro:
              'Every classroom includes children with a range of needs, backgrounds, and abilities. Learn practices that make early education genuinely inclusive.',
            topics: [
              'Universal design for learning in early childhood settings',
              'Adapting activities without excluding a child from participation',
              'Supporting children with diverse developmental needs',
              'Building a classroom culture that values difference',
            ],
            moments: [
              { time: '0:00', label: 'Why inclusion starts with design' },
              { time: '5:30', label: 'Adapting without excluding' },
              { time: '11:30', label: 'Supporting diverse needs' },
              {
                time: '16:30',
                label: 'A classroom culture that values difference',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e9_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Inclusive Early Education Quiz',
            forLesson: 'Inclusive Early Education Practices',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of inclusive early education practices.',
            questions: [
              {
                question: 'Universal design for learning aims to:',
                options: [
                  'Create one rigid activity format for all children',
                  'Design activities flexible enough to include children with varied needs from the start',
                  'Separate children by ability into different rooms',
                  'Only apply to children without additional needs',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Adapting an activity for a child with additional needs should aim to:',
                options: [
                  'Exclude them from the activity entirely',
                  'Allow them to participate meaningfully alongside their peers',
                  'Only be done outside the classroom',
                  'Lower expectations with no support',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A classroom culture that values difference typically:',
                options: [
                  'Ignores differences between children entirely',
                  'Actively models acceptance and highlights diverse strengths',
                  'Singles out children with additional needs for special treatment only',
                  'Avoids discussing differences at all',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Supporting children with diverse developmental needs works best when:',
                options: [
                  'Support is generic and identical for every child',
                  "Support is tailored to the specific child's strengths and needs",
                  'Only specialists are involved, never the classroom teacher',
                  'Support is provided only after a problem arises',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e9_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Inclusive Activity Redesign',
            forLesson: 'Inclusive Early Education Practices',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Take a standard classroom activity and redesign it using universal design principles so that a child with a specified additional need could participate meaningfully alongside peers.',
            requirements: [
              'Original activity and the specified need both described',
              'Redesigned activity clearly explained',
              'Explanation of how the redesign supports meaningful participation, not just presence',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e10: Khmer Folktales Reading Pack (document-first) ────────────────

export const E10_MODULES: ReviewModule[] = [
  {
    id: 'e10_m1',
    title: 'Module 1: Beloved Folktales',
    lessons: [
      {
        id: 'e10_l1',
        title: 'Judge Rabbit and the Trickster Tradition',
        documents: [
          {
            id: 'e10_d1',
            kind: 'document',
            title: 'Judge Rabbit and the Trickster Tradition',
            readTime: '5-6 min read',
            intro:
              "Judge Rabbit (A-Chey) is Cambodia's most famous trickster — clever, mischievous, and always outwitting the powerful. Meet the tradition he belongs to.",
            objectives: [
              'Explain what defines a "trickster" figure in folklore',
              'Identify recurring patterns in Judge Rabbit stories',
            ],
            sections: [
              {
                heading: 'Who Is Judge Rabbit',
                text: 'Judge Rabbit, known in Khmer as A-Chey, is a small, clever animal who repeatedly outsmarts larger and more powerful characters — tigers, crocodiles, even kings — through wit rather than strength. He belongs to a wider tradition of trickster figures found across Southeast Asian folklore, where cleverness triumphs over brute power.',
                tip: 'Watch for the pattern: Judge Rabbit is almost never the strongest character in a story — his advantage is always cunning.',
              },
              {
                heading: 'Recurring Patterns Across the Tales',
                text: 'Most Judge Rabbit stories follow a similar shape: a stronger character threatens or challenges him, he appears to be at a disadvantage, and he escapes or wins through a clever trick or a well-placed lie. Recognizing this pattern helps a reader anticipate and appreciate the twist in a story they have not heard before.',
              },
            ],
            takeaways: [
              'A trickster figure wins through cleverness, not strength, and often at the expense of a more powerful character',
              'Judge Rabbit stories typically follow a pattern of apparent disadvantage followed by a clever reversal',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e10_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Judge Rabbit Quiz',
            forLesson: 'Judge Rabbit and the Trickster Tradition',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of Judge Rabbit and the trickster tradition.',
            questions: [
              {
                question:
                  'A "trickster" figure in folklore typically wins through:',
                options: [
                  'Physical strength alone',
                  'Cleverness and wit rather than strength',
                  'Wealth',
                  'Royal authority',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In Judge Rabbit stories, he is usually up against characters who are:',
                options: [
                  'Weaker than him',
                  'Larger or more powerful than him',
                  'Exactly his equal',
                  'Never a threat at all',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Recognizing the recurring pattern in trickster tales helps a reader:',
                options: [
                  'Predict nothing about the story',
                  'Anticipate and appreciate the clever reversal when it comes',
                  'Understand only the ending',
                  'Avoid enjoying the story',
                ],
                correctIndex: 1,
              },
              {
                question: 'Trickster figures like Judge Rabbit appear:',
                options: [
                  'Only in Khmer folklore',
                  'Across a wider tradition found in Southeast Asian folklore',
                  'Only in written literature, never oral tales',
                  'Exclusively in modern stories',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e10_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Identify the Trickster Pattern',
            forLesson: 'Judge Rabbit and the Trickster Tradition',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Read a provided Judge Rabbit tale and map out the three-part pattern: the challenge, the apparent disadvantage, and the clever reversal.',
            requirements: [
              'All three pattern stages identified with specific details from the tale',
              'A one-sentence explanation of what makes the reversal clever',
              'A comparison to one other trickster figure from any culture',
            ],
          },
        ],
      },
      {
        id: 'e10_l2',
        title: "Tum Teav: Cambodia's Great Tragic Tale",
        documents: [
          {
            id: 'e10_d2',
            kind: 'document',
            title: "Tum Teav: Cambodia's Great Tragic Tale",
            readTime: '6 min read',
            intro:
              "Tum Teav is often called Cambodia's Romeo and Juliet — a tragic love story that has shaped Khmer literary and cultural identity for generations.",
            objectives: [
              'Summarize the central conflict of Tum Teav',
              'Explain why the tale is considered culturally significant beyond its plot',
            ],
            sections: [
              {
                heading: 'The Story in Brief',
                text: 'Tum Teav tells of two young lovers, Tum and Teav, separated by class and family obligation, whose devotion ultimately leads to tragedy. Unlike many folktales with a tidy moral, Tum Teav sits with grief and injustice, which is part of why it has endured as a serious literary work rather than only a cautionary tale.',
              },
              {
                heading: 'Why It Still Matters',
                text: 'Beyond its plot, Tum Teav is studied as a reflection of social structures — class, family duty, and power — in the era it depicts. It has been retold in poetry, film, and performance, and remains a touchstone for discussing love, loyalty, and injustice in Khmer culture.',
                tip: 'When reading Tum Teav, notice which characters have power to make decisions and which do not — that imbalance drives the tragedy.',
              },
            ],
            takeaways: [
              'Tum Teav is a tragic love story that reflects real social structures of class and family duty',
              'Its endurance comes from serious literary and cultural weight, not just plot',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e10_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Tum Teav Quiz',
            forLesson: "Tum Teav: Cambodia's Great Tragic Tale",
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of Tum Teav.',
            questions: [
              {
                question: 'Tum Teav is best described as:',
                options: [
                  'A comedic trickster tale',
                  'A tragic love story shaped by class and family conflict',
                  'A modern short story',
                  "A children's counting rhyme",
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Unlike many simple folktales, Tum Teav is notable for:',
                options: [
                  'Ending with a clear, happy resolution',
                  'Sitting with grief and injustice rather than offering a tidy moral',
                  'Having no named characters',
                  'Being purely comedic',
                ],
                correctIndex: 1,
              },
              {
                question: 'Tum Teav is often studied as a reflection of:',
                options: [
                  'Modern technology',
                  'Class, family duty, and power in its era',
                  'Foreign trade routes',
                  'Sports traditions',
                ],
                correctIndex: 1,
              },
              {
                question: 'A useful thing to track while reading Tum Teav is:',
                options: [
                  'The weather described in each scene',
                  'Which characters hold power to make decisions',
                  'The number of pages per chapter',
                  'Only the ending',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e10_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Reflect on Power and Choice',
            forLesson: "Tum Teav: Cambodia's Great Tragic Tale",
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'After reading a summary or excerpt of Tum Teav, write a short reflection identifying which characters had the power to make key decisions and how that imbalance shaped the tragedy.',
            requirements: [
              'At least two characters analyzed for their power/decision-making role',
              'A clear connection drawn between power imbalance and the tragic outcome',
              "Reflection is the student's own analysis, not a plot summary alone",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e10_m2',
    title: 'Module 2: Reading Folktales Closely',
    lessons: [
      {
        id: 'e10_l3',
        title: 'Morals and Meaning in Folktales',
        documents: [
          {
            id: 'e10_d3',
            kind: 'document',
            title: 'Morals and Meaning in Folktales',
            readTime: '4 min read',
            intro:
              'Folktales rarely state their lesson outright — the moral has to be drawn out through careful reading of what happens and why.',
            objectives: [
              'Identify an implied moral in a folktale without an explicit statement',
              "Distinguish a story's surface plot from its deeper meaning",
            ],
            sections: [
              {
                heading: 'Morals Are Usually Implied, Not Stated',
                text: 'Few traditional folktales end with an explicit "the moral of this story is…" Instead, the consequences faced by characters — reward for cleverness or kindness, downfall from greed or dishonesty — imply the lesson. A reader has to connect the character\'s choices to their outcome to find it.',
              },
              {
                heading: 'Surface Plot vs. Deeper Meaning',
                text: 'The surface plot of a folktale (what literally happens) is often simple, but the meaning underneath can address real concerns — fairness, community obligation, the danger of greed. Reading closely means asking not just "what happened" but "what does this story seem to be arguing."',
                tip: 'Try finishing the sentence "This story seems to be saying that…" after reading — it forces the implied moral into words.',
              },
            ],
            takeaways: [
              'Folktale morals are usually implied through character outcomes, not stated directly',
              'Distinguishing surface plot from deeper meaning is a core close-reading skill',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e10_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Morals and Meaning Quiz',
            forLesson: 'Morals and Meaning in Folktales',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of finding meaning in folktales.',
            questions: [
              {
                question:
                  'Traditional folktales typically convey their moral by:',
                options: [
                  'Stating it explicitly at the very start',
                  'Showing consequences that imply a lesson through the plot',
                  'Never having any moral at all',
                  'Providing a footnote at the end',
                ],
                correctIndex: 1,
              },
              {
                question: 'Reading a folktale "closely" for meaning involves:',
                options: [
                  'Only summarizing what literally happened',
                  'Asking what the story seems to be arguing beneath the plot',
                  "Ignoring the characters' choices",
                  'Skipping to the ending only',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "A character's downfall due to greed in a folktale most likely implies a moral about:",
                options: [
                  'The dangers of greed',
                  'Nothing — it is coincidental',
                  'A historical event',
                  'Grammar rules',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'Completing the sentence "This story seems to be saying that…" is useful because it:',
                options: [
                  'Has no real purpose',
                  'Forces the implied moral into explicit words',
                  'Replaces the need to read the story',
                  'Only works for modern stories',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e10_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Draw Out the Moral',
            forLesson: 'Morals and Meaning in Folktales',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Read a provided folktale with no stated moral and write a short paragraph identifying the implied lesson, using specific plot details as evidence.',
            requirements: [
              'Implied moral clearly stated in one or two sentences',
              'At least two specific plot details used as supporting evidence',
              "Explanation of how the character's outcome supports the identified moral",
            ],
          },
        ],
      },
      {
        id: 'e10_l4',
        title: 'Retelling and Adaptation Across Generations',
        documents: [
          {
            id: 'e10_d4',
            kind: 'document',
            title: 'Retelling and Adaptation Across Generations',
            readTime: '4-5 min read',
            intro:
              'Folktales survive because each generation retells them a little differently. Understand what changes, what stays, and why that matters.',
            objectives: [
              'Explain why folktales change slightly across retellings',
              'Identify what typically remains constant across versions of the same tale',
            ],
            sections: [
              {
                heading: 'Why Retellings Differ',
                text: 'Because folktales were passed down orally for generations before being written, no single "original" version exists in the way a modern authored book does. Each teller adapted details — names, settings, small plot points — to their audience and era, which is why you may encounter slightly different versions of the same story.',
              },
              {
                heading: 'What Usually Stays Constant',
                text: 'Despite surface differences, the core structure and implied moral of a folktale tend to persist across versions far more than specific details do. A trickster still wins through cleverness; a greedy character still faces consequences — even if the specific animals or names change.',
              },
            ],
            takeaways: [
              'Folktales lack a single fixed "original" because they were shaped through generations of oral retelling',
              'Core structure and moral typically persist across versions even as surface details change',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e10_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Retelling and Adaptation Quiz',
            forLesson: 'Retelling and Adaptation Across Generations',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of folktale retelling and adaptation.',
            questions: [
              {
                question:
                  'Different versions of the same folktale commonly differ in:',
                options: [
                  "The story's implied moral entirely",
                  'Surface details like names and setting',
                  'Nothing at all — folktales never vary',
                  'Whether it has characters',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A folktale typically lacks a single fixed "original" because:',
                options: [
                  'It was written once and never changed',
                  'It was shaped through generations of oral retelling before being written down',
                  'Folktales are always modern inventions',
                  'Only one version has ever existed',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What tends to remain most consistent across retellings of a folktale is:',
                options: [
                  'The exact wording',
                  'The core structure and implied moral',
                  'The specific character names',
                  'The length in pages',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Encountering two different versions of the same folktale suggests:',
                options: [
                  'One version must be wrong',
                  'A natural result of oral tradition passing through many tellers',
                  'A printing error',
                  'That the story has no cultural value',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e10_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Compare Two Versions of a Tale',
            forLesson: 'Retelling and Adaptation Across Generations',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Given two different versions of the same Khmer folktale, identify three surface differences and explain what core structure or moral remains the same across both.',
            requirements: [
              'Three specific surface differences identified',
              'The shared core structure or moral clearly articulated',
              'A conclusion on why the tale has endured despite variation',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e11: Community Leadership Playbook (document-first) ───────────────

export const E11_MODULES: ReviewModule[] = [
  {
    id: 'e11_m1',
    title: 'Module 1: Organizing Foundations',
    lessons: [
      {
        id: 'e11_l1',
        title: 'What Makes a Community Leader',
        documents: [
          {
            id: 'e11_d1',
            kind: 'document',
            title: 'What Makes a Community Leader',
            readTime: '5 min read',
            intro:
              'Community leadership is earned through trust and consistent action, not appointed by a title. Understand what actually makes someone a community leader.',
            objectives: [
              'Distinguish positional authority from earned community leadership',
              'Identify the behaviors that build trust within a community',
            ],
            sections: [
              {
                heading: 'Earned, Not Appointed',
                text: "Unlike a manager appointed by an organization, a community leader's authority is earned through relationships and demonstrated commitment over time. A person can hold an official title and have little real influence, while someone with no formal role can be the person a community actually turns to.",
              },
              {
                heading: 'What Builds Community Trust',
                text: 'Trust is built through consistency (showing up reliably), follow-through (doing what you said you would), and genuine listening (acting on what the community says it needs, not what you assume). Any one broken repeatedly erodes credibility quickly.',
                tip: 'Trust is built slowly through many small consistent actions and can be lost through a single visible failure to follow through.',
              },
            ],
            takeaways: [
              'Community leadership is earned through relationships and consistent action, not granted by a title',
              'Trust is built through consistency, follow-through, and genuine listening',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'What Makes a Community Leader Quiz',
            forLesson: 'What Makes a Community Leader',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of what makes a community leader.',
            questions: [
              {
                question: "A community leader's authority is primarily:",
                options: [
                  'Granted automatically by an official title',
                  'Earned through relationships and demonstrated commitment',
                  'Based only on formal education',
                  'Irrelevant to community trust',
                ],
                correctIndex: 1,
              },
              {
                question: 'Follow-through builds trust because it:',
                options: [
                  'Has no visible effect on a community',
                  "Demonstrates that a leader's words match their actions",
                  'Only matters for large promises',
                  'Is optional for community leaders',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Genuine listening as a trust-building behavior means:',
                options: [
                  'Assuming you already know what the community needs',
                  'Acting on what the community actually says it needs',
                  'Ignoring community input',
                  'Listening without ever acting',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A person with no formal title can still be a genuine community leader if they:',
                options: [
                  'Have earned real trust and influence through their actions',
                  'Hold a government position',
                  'Have the most money',
                  'Speak the loudest',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e11_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Identify a Trust-Building Action',
            forLesson: 'What Makes a Community Leader',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Identify a real or hypothetical community leader and describe one specific action they took that built trust, tying it to consistency, follow-through, or listening.',
            requirements: [
              'A specific leader and action described',
              'The action clearly tied to one of the three trust-building behaviors',
              'A note on what would have happened if the action had not followed through',
            ],
          },
        ],
      },
      {
        id: 'e11_l2',
        title: 'Mapping Community Stakeholders',
        documents: [
          {
            id: 'e11_d2',
            kind: 'document',
            title: 'Mapping Community Stakeholders',
            readTime: '5 min read',
            intro:
              'Before organizing any action, a leader needs a clear map of who is affected, who has influence, and who could help or hinder the effort.',
            objectives: [
              'Apply a basic stakeholder mapping method to a community issue',
              'Distinguish between stakeholders by their level of interest and influence',
            ],
            sections: [
              {
                heading: 'Interest vs. Influence',
                text: 'A simple but powerful stakeholder map plots people or groups by two dimensions: how much interest they have in the issue, and how much influence they have over the outcome. Someone with high interest and high influence is a priority to engage directly; someone with low interest but high influence may need to be informed and gradually brought in.',
              },
              {
                heading: 'Avoiding Blind Spots',
                text: 'It is easy to map only the obvious stakeholders — the ones already speaking up. A thorough map deliberately looks for quieter groups who are affected but not yet vocal, since they are often overlooked until an initiative fails to account for their needs.',
              },
            ],
            takeaways: [
              'Mapping stakeholders by interest and influence helps prioritize engagement effort',
              'Quiet, less vocal stakeholders are often overlooked and need deliberate attention',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Stakeholder Mapping Quiz',
            forLesson: 'Mapping Community Stakeholders',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of stakeholder mapping.',
            questions: [
              {
                question:
                  'A stakeholder mapped as high interest and high influence should generally be:',
                options: [
                  'Ignored entirely',
                  'Engaged directly as a priority',
                  'Only informed after the fact',
                  'Excluded from the effort',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A stakeholder with high influence but low current interest might need to be:',
                options: [
                  'Left out of the process entirely',
                  'Informed and gradually engaged over time',
                  'Treated identically to a low-influence stakeholder',
                  'Assumed to already support the effort',
                ],
                correctIndex: 1,
              },
              {
                question: 'A common blind spot in stakeholder mapping is:',
                options: [
                  'Overrepresenting quiet groups',
                  'Overlooking quieter, affected groups who are not yet vocal',
                  'Including too many stakeholders',
                  'Mapping too much interest data',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The two dimensions typically used in basic stakeholder mapping are:',
                options: [
                  'Age and income',
                  'Interest and influence',
                  'Location and language',
                  'Height and weight',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e11_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Stakeholder Map',
            forLesson: 'Mapping Community Stakeholders',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'For a community issue you choose, list at least six stakeholders and plot each by interest and influence, including at least one quieter group that could be easily overlooked.',
            requirements: [
              'At least six stakeholders listed with interest/influence noted',
              'At least one deliberately identified "easily overlooked" group included',
              'A brief engagement approach proposed for the highest-priority stakeholder',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e11_m2',
    title: 'Module 2: Sustaining Impact',
    lessons: [
      {
        id: 'e11_l3',
        title: 'Running Effective Community Meetings',
        documents: [
          {
            id: 'e11_d3',
            kind: 'document',
            title: 'Running Effective Community Meetings',
            readTime: '5 min read',
            intro:
              'A poorly run meeting can undo months of organizing goodwill. Learn the structural choices that make a community meeting productive and inclusive.',
            objectives: [
              'Design a community meeting agenda that encourages participation',
              'Identify facilitation habits that keep a meeting from being dominated by a few voices',
            ],
            sections: [
              {
                heading: 'Structuring for Participation',
                text: 'A clear, shared agenda distributed in advance, a stated time limit per topic, and an explicit invitation for quieter attendees to speak all increase genuine participation. Without structure, meetings default to whoever is most comfortable speaking up, which is rarely the full community.',
              },
              {
                heading: 'Avoiding Domination by a Few Voices',
                text: 'Facilitation techniques like round-robin input, small breakout discussions before large-group sharing, and gently redirecting a dominant speaker ("thank you — let\'s hear from someone who hasn\'t spoken yet") help ensure the meeting reflects more than a handful of opinions.',
                tip: 'If the same two or three people are doing most of the talking, that is a facilitation signal to actively invite other voices in, not a sign the meeting is going well.',
              },
            ],
            takeaways: [
              'A shared agenda and time limits increase genuine participation in community meetings',
              'Facilitation techniques like round-robin input prevent a few voices from dominating',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Effective Community Meetings Quiz',
            forLesson: 'Running Effective Community Meetings',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of running effective community meetings.',
            questions: [
              {
                question:
                  'Distributing a shared agenda before a community meeting primarily helps by:',
                options: [
                  'Confusing attendees',
                  'Setting clear expectations that support more focused participation',
                  'Preventing anyone from speaking',
                  'Replacing the need for facilitation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A meeting where the same few people do most of the talking suggests:',
                options: [
                  'The meeting is going well',
                  'A need for facilitation techniques that invite other voices in',
                  'Nothing worth addressing',
                  'That quieter attendees have nothing to say',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Round-robin input as a facilitation technique means:',
                options: [
                  'Only the loudest voice speaks',
                  'Giving each attendee a structured turn to contribute',
                  'Skipping input entirely',
                  'Only leaders may speak',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Small breakout discussions before large-group sharing can help because they:',
                options: [
                  'Waste meeting time',
                  'Let quieter attendees rehearse their thoughts before a bigger audience',
                  'Are only useful for large conferences',
                  'Replace the need for an agenda',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e11_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Meeting Agenda',
            forLesson: 'Running Effective Community Meetings',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Design a one-hour community meeting agenda for an issue of your choice, including time limits per topic and at least one specific facilitation technique to ensure broad participation.',
            requirements: [
              'Agenda with time allocations for each topic',
              'At least one specific participation-focused facilitation technique named',
              'A plan for how quieter attendees will be invited to contribute',
            ],
          },
        ],
      },
      {
        id: 'e11_l4',
        title: 'Measuring Community Impact',
        documents: [
          {
            id: 'e11_d4',
            kind: 'document',
            title: 'Measuring Community Impact',
            readTime: '4 min read',
            intro:
              'Good intentions are not the same as measurable impact. Learn how community leaders can track whether their efforts are actually working.',
            objectives: [
              'Distinguish output metrics from outcome metrics in community work',
              'Design a simple way to track whether a community initiative is achieving its goal',
            ],
            sections: [
              {
                heading: 'Outputs vs. Outcomes',
                text: 'An output measures activity (meetings held, flyers distributed); an outcome measures actual change (more residents voting, a service gap closed). Tracking only outputs can create an illusion of progress while the underlying problem remains unchanged.',
              },
              {
                heading: 'Keeping Measurement Simple and Honest',
                text: 'Community initiatives rarely need sophisticated analytics — a short survey, a simple before/after count, or direct community feedback is often enough. The key is measuring the actual outcome the initiative was meant to change, and being willing to report it honestly even if progress is slow.',
              },
            ],
            takeaways: [
              'Outputs measure activity; outcomes measure actual change — both matter, but outcomes matter more',
              'Simple, honest measurement tools are usually sufficient for community initiatives',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Measuring Community Impact Quiz',
            forLesson: 'Measuring Community Impact',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of measuring community impact.',
            questions: [
              {
                question:
                  'An output metric, such as the number of meetings held, measures:',
                options: [
                  'Actual change in the community',
                  'Activity, not necessarily real-world change',
                  'Nothing useful at all',
                  'The same thing as an outcome metric',
                ],
                correctIndex: 1,
              },
              {
                question: 'Tracking only outputs risks:',
                options: [
                  'Guaranteeing real impact',
                  'Creating an illusion of progress while the underlying issue persists',
                  'Making measurement too complex',
                  'Having no downside',
                ],
                correctIndex: 1,
              },
              {
                question: 'A simple before/after count is an example of:',
                options: [
                  'An overly complex measurement approach',
                  'A practical way to track an outcome without sophisticated tools',
                  'An output metric only',
                  'A method with no value',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Honest reporting of slow or absent progress is important because it:',
                options: [
                  'Should always be avoided to protect morale',
                  'Allows a community initiative to adapt and improve rather than mask a real problem',
                  'Has no effect on future strategy',
                  'Is only relevant to funders',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e11_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design an Impact Tracker',
            forLesson: 'Measuring Community Impact',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'For a community initiative of your choice, define one output metric and one outcome metric, and describe a simple, low-cost method to track each.',
            requirements: [
              'One clearly defined output metric',
              'One clearly defined outcome metric',
              'A practical, low-cost tracking method described for each',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e12: Innovative Teaching Handbook (document-first) ────────────────

export const E12_MODULES: ReviewModule[] = [
  {
    id: 'e12_m1',
    title: 'Module 1: Designing Creative Lessons',
    lessons: [
      {
        id: 'e12_l1',
        title: 'Anatomy of an Engaging Lesson',
        documents: [
          {
            id: 'e12_d1',
            kind: 'document',
            title: 'Anatomy of an Engaging Lesson',
            readTime: '5 min read',
            intro:
              'An engaging lesson is not an accident — it is built from a handful of deliberate design choices. Learn what they are.',
            objectives: [
              'Identify the core components of an engaging lesson design',
              'Explain why a hook at the start of a lesson matters',
            ],
            sections: [
              {
                heading: 'The Core Components',
                text: 'An engaging lesson typically includes a hook (something that captures attention and creates curiosity), a clear learning goal, an active task where learners do something rather than only listen, and a moment of reflection or synthesis. Missing the hook or the active task is the most common reason a lesson falls flat.',
              },
              {
                heading: 'Why the Hook Matters',
                text: 'The first few minutes set the frame for how much attention a lesson receives. A hook — a surprising fact, a provocative question, a short mystery to solve — signals that this lesson is worth leaning into, before any content has even been delivered.',
                tip: "If you cannot describe your lesson's hook in one sentence, it probably needs a sharper one.",
              },
            ],
            takeaways: [
              'An engaging lesson includes a hook, a clear goal, an active task, and reflection',
              'A strong hook in the first few minutes sets the frame for attention throughout the lesson',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e12_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Anatomy of an Engaging Lesson Quiz',
            forLesson: 'Anatomy of an Engaging Lesson',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of engaging lesson design.',
            questions: [
              {
                question: 'The four core components of an engaging lesson are:',
                options: [
                  'Hook, goal, active task, and reflection',
                  'Warm-up, quiz, homework, and grade',
                  'Lecture, notes, test, and review',
                  'Attendance, silence, worksheet, and dismissal',
                ],
                correctIndex: 0,
              },
              {
                question: 'A lesson\'s "hook" primarily serves to:',
                options: [
                  'Fill time at the start',
                  'Capture attention and create curiosity before content is delivered',
                  'Replace the need for a learning goal',
                  'Test prior knowledge formally',
                ],
                correctIndex: 1,
              },
              {
                question: 'A lesson missing an active task for learners risks:',
                options: [
                  'Being more engaging',
                  'Falling flat because learners only listen rather than participate',
                  'Having too much reflection',
                  'No measurable downside',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A moment of reflection at the end of a lesson helps learners:',
                options: [
                  'Forget the content faster',
                  'Consolidate and make sense of what was learned',
                  'Waste remaining class time',
                  'Skip the learning goal',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e12_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Lesson Hook',
            forLesson: 'Anatomy of an Engaging Lesson',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'For a topic of your choice, design a one-sentence hook and explain why it would capture learner curiosity before any content is delivered.',
            requirements: [
              'Hook stated in one clear sentence',
              'Explanation of why it creates curiosity',
              "Connection made to the lesson's actual learning goal",
            ],
          },
        ],
      },
      {
        id: 'e12_l2',
        title: 'Using Questions to Drive Curiosity',
        documents: [
          {
            id: 'e12_d2',
            kind: 'document',
            title: 'Using Questions to Drive Curiosity',
            readTime: '4-5 min read',
            intro:
              'The right question can do more to spark thinking than any explanation. Learn how to design and sequence questions that drive genuine curiosity.',
            objectives: [
              'Distinguish closed questions from open, curiosity-driving questions',
              'Sequence questions to build toward a deeper understanding',
            ],
            sections: [
              {
                heading: 'Closed vs. Open Questions',
                text: 'A closed question ("Is this correct?") checks a fact; an open question ("Why might this be true?") invites exploration and multiple valid lines of thinking. Both have a place, but a lesson built entirely on closed questions rarely generates real curiosity.',
              },
              {
                heading: 'Sequencing Questions',
                text: 'A well-sequenced set of questions moves from accessible to challenging — starting with something every learner can engage with, then layering complexity. This keeps learners with less prior knowledge from disengaging early while still stretching those ready for more.',
              },
            ],
            takeaways: [
              'Open questions invite exploration; closed questions check facts — a lesson needs both, weighted toward open',
              'Sequencing questions from accessible to challenging keeps the whole class engaged',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e12_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Using Questions to Drive Curiosity Quiz',
            forLesson: 'Using Questions to Drive Curiosity',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of using questions to drive curiosity.',
            questions: [
              {
                question:
                  'An open question, compared to a closed question, tends to:',
                options: [
                  'Have only one correct answer',
                  'Invite exploration and multiple valid lines of thinking',
                  'Be easier to grade',
                  'Discourage discussion',
                ],
                correctIndex: 1,
              },
              {
                question: 'A lesson built entirely on closed questions risks:',
                options: [
                  'Generating deep curiosity',
                  'Failing to spark genuine exploration or discussion',
                  'Being too open-ended',
                  'Confusing learners',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Sequencing questions from accessible to challenging helps because it:',
                options: [
                  'Only benefits advanced learners',
                  'Keeps learners with less prior knowledge engaged while still stretching others',
                  'Has no impact on engagement',
                  'Should always start with the hardest question',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A well-designed open question about a historical event might be:',
                options: [
                  'Was this event in the past?',
                  'Why might different groups have viewed this event differently?',
                  'What year did this happen?',
                  'Is the textbook correct?',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e12_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Question Sequence',
            forLesson: 'Using Questions to Drive Curiosity',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'For a topic of your choice, write a sequence of four questions moving from accessible to challenging, labeling each as open or closed.',
            requirements: [
              'Four questions provided in a clear sequence',
              'Each question labeled open or closed',
              'A brief explanation of why the sequence moves from accessible to challenging',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e12_m2',
    title: 'Module 2: Engagement and Iteration',
    lessons: [
      {
        id: 'e12_l3',
        title: 'Reading the Room: Signs of Engagement',
        documents: [
          {
            id: 'e12_d3',
            kind: 'document',
            title: 'Reading the Room: Signs of Engagement',
            readTime: '4 min read',
            intro:
              'Engagement is not always loud. Learn to read the subtle signs that tell you whether a lesson is actually landing.',
            objectives: [
              'Identify observable signs of both engagement and disengagement in a classroom',
              'Distinguish quiet engagement from passive disengagement',
            ],
            sections: [
              {
                heading: 'What Engagement Actually Looks Like',
                text: "Engagement shows up as leaning in, asking follow-up questions, building on a peer's idea, or focused silence during independent work — not necessarily noise or hand-raising. A quiet room can be either deeply engaged or completely checked out, and the difference matters.",
              },
              {
                heading: 'Reading the Difference',
                text: 'Body language, eye contact, and the content of what learners say when called on all help distinguish quiet focus from disengagement. Checking in briefly with a struggling-looking learner, rather than assuming, is usually more accurate than guessing from a distance.',
                tip: 'When unsure whether silence means focus or disengagement, a quick, low-pressure check-in beats guessing.',
              },
            ],
            takeaways: [
              'Genuine engagement can look quiet — leaning in and focused silence both count',
              'Distinguishing quiet focus from disengagement usually requires a direct, low-pressure check-in rather than assumption',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e12_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Reading the Room Quiz',
            forLesson: 'Reading the Room: Signs of Engagement',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of reading engagement in a classroom.',
            questions: [
              {
                question: 'A quiet classroom during independent work is:',
                options: [
                  'Always a sign of disengagement',
                  'Potentially a sign of deep engagement, depending on other cues',
                  'Never acceptable',
                  'Only possible with older students',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A learner asking a follow-up question is generally a sign of:',
                options: [
                  'Confusion only',
                  'Engagement with the material',
                  'Disruption',
                  'Boredom',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The most reliable way to check whether a quiet learner is engaged or disengaged is to:',
                options: [
                  'Assume based on posture alone',
                  'Do a brief, low-pressure check-in',
                  'Ignore them entirely',
                  'Call them out publicly',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Reading the room for engagement signs matters because it:',
                options: [
                  'Has no impact on teaching decisions',
                  'Helps a facilitator adjust the lesson in real time',
                  'Only matters after the lesson ends',
                  'Replaces the need for lesson planning',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e12_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Engagement Observation Log',
            forLesson: 'Reading the Room: Signs of Engagement',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Observe a class session (in person or recorded) and log at least four specific engagement or disengagement signals you noticed, noting what you would do differently in response to each.',
            requirements: [
              'At least four specific observed signals logged',
              'Each signal classified as engagement or disengagement with reasoning',
              'A proposed facilitator response for at least two signals',
            ],
          },
        ],
      },
      {
        id: 'e12_l4',
        title: 'Iterating on a Lesson After It Falls Flat',
        documents: [
          {
            id: 'e12_d4',
            kind: 'document',
            title: 'Iterating on a Lesson After It Falls Flat',
            readTime: '4 min read',
            intro:
              'Even well-designed lessons sometimes fail to land. Learn how to diagnose why and improve the lesson for next time, rather than abandoning the approach entirely.',
            objectives: [
              'Apply a diagnostic process to a lesson that did not go as planned',
              'Distinguish a design problem from a delivery problem',
            ],
            sections: [
              {
                heading: 'Diagnose Before You Redesign',
                text: 'When a lesson falls flat, the cause could be the design (unclear goal, weak hook, mismatched difficulty) or the delivery (pacing, unclear instructions, room conditions). Diagnosing which one failed prevents throwing away a fundamentally sound lesson because of a fixable delivery issue, or reusing a flawed design because delivery happened to go smoothly once.',
              },
              {
                heading: 'Making One Change at a Time',
                text: 'As with any iterative process, changing multiple elements of a lesson at once after a bad run makes it hard to know what actually helped next time. Identify the single most likely cause and adjust that first before reteaching.',
              },
            ],
            takeaways: [
              'Diagnose whether a failed lesson was a design problem or a delivery problem before changing anything',
              'Adjust one element at a time so you can tell what actually improved the lesson',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e12_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Iterating on a Lesson Quiz',
            forLesson: 'Iterating on a Lesson After It Falls Flat',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of iterating on a lesson that did not go well.',
            questions: [
              {
                question:
                  'When a lesson falls flat, the first step should be to:',
                options: [
                  'Abandon the topic entirely',
                  'Diagnose whether the issue was design or delivery',
                  'Repeat the exact same lesson unchanged',
                  'Blame the learners',
                ],
                correctIndex: 1,
              },
              {
                question: 'A "design" problem with a lesson might look like:',
                options: [
                  'Poor pacing during delivery',
                  'An unclear learning goal or a weak hook',
                  'A noisy classroom',
                  'A technical glitch',
                ],
                correctIndex: 1,
              },
              {
                question: 'A "delivery" problem with a lesson might look like:',
                options: [
                  'A vague learning goal',
                  'Rushed pacing or unclear spoken instructions',
                  'A well-designed active task',
                  'A strong hook',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Changing many elements of a lesson at once after it fails makes it hard to:',
                options: [
                  'Reteach the lesson at all',
                  'Know which specific change actually caused any improvement',
                  'Improve the lesson in any way',
                  'Plan future lessons',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e12_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Diagnose and Redesign a Lesson',
            forLesson: 'Iterating on a Lesson After It Falls Flat',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Given a provided lesson that did not go well, diagnose whether the problem was primarily design or delivery, propose one specific change, and explain how you would evaluate whether it worked next time.',
            requirements: [
              'Clear diagnosis of design vs. delivery with reasoning',
              'Exactly one specific proposed change',
              'A method for evaluating whether the change actually helped',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e13: Early Childhood Assessment Guide (document-first) ────────────

export const E13_MODULES: ReviewModule[] = [
  {
    id: 'e13_m1',
    title: 'Module 1: Observing and Assessing Young Children',
    lessons: [
      {
        id: 'e13_l1',
        title: 'Observation-Based Assessment Principles',
        documents: [
          {
            id: 'e13_d1',
            kind: 'document',
            title: 'Observation-Based Assessment Principles',
            readTime: '5 min read',
            intro:
              'With young children, careful observation is often a more accurate assessment tool than any formal test. Learn the principles behind observation-based assessment.',
            objectives: [
              'Explain why observation is central to assessing young children',
              'Identify the difference between objective and interpretive observation notes',
            ],
            sections: [
              {
                heading: 'Why Observation, Not Testing',
                text: 'Formal tests assume a level of language, attention, and test-taking familiarity that young children often do not yet have. Careful, structured observation of a child in natural play and routine activities gives a more accurate picture of what they can actually do.',
              },
              {
                heading: 'Objective vs. Interpretive Notes',
                text: 'An objective observation note records exactly what happened ("stacked five blocks, then knocked them down and laughed"). An interpretive note adds a conclusion ("was frustrated"). Strong assessment practice keeps these separate — record the objective observation first, then interpret it afterward, clearly labeled as interpretation.',
                tip: 'If you cannot tell from a note whether it is a fact or an opinion, it is probably mixing observation and interpretation together.',
              },
            ],
            takeaways: [
              'Observation in natural settings is often more accurate than formal testing for young children',
              'Keep objective observation notes separate from interpretive conclusions',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e13_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Observation-Based Assessment Quiz',
            forLesson: 'Observation-Based Assessment Principles',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of observation-based assessment.',
            questions: [
              {
                question:
                  'Observation-based assessment is especially important for young children because:',
                options: [
                  'Formal tests are always more accurate',
                  'Formal tests assume language and attention skills young children may not yet have',
                  'Observation is easier to schedule',
                  'Young children cannot be assessed at all',
                ],
                correctIndex: 1,
              },
              {
                question: 'An objective observation note should:',
                options: [
                  "Include the observer's interpretation immediately",
                  'Record exactly what was observed, without interpretation mixed in',
                  "Only record the child's mood",
                  'Avoid describing specific actions',
                ],
                correctIndex: 1,
              },
              {
                question:
                  '"Stacked five blocks and knocked them down" is an example of:',
                options: [
                  'An interpretive note',
                  'An objective observation note',
                  'A developmental milestone chart',
                  'A summative test score',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Separating objective observation from interpretation matters because it:',
                options: [
                  'Has no effect on assessment quality',
                  'Keeps assumptions from being mistaken for fact',
                  'Makes notes longer for no reason',
                  'Is only relevant for older children',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e13_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Practice Objective Observation',
            forLesson: 'Observation-Based Assessment Principles',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Observe a young child for ten minutes (in person or via a provided video) and write objective observation notes, then add a clearly separated interpretive section.',
            requirements: [
              'At least five objective observation notes with no interpretation mixed in',
              'A clearly separated interpretive section',
              'Notes specific enough that another observer could picture the scene',
            ],
          },
        ],
      },
      {
        id: 'e13_l2',
        title: 'Formative vs. Summative Checks in Early Childhood',
        documents: [
          {
            id: 'e13_d2',
            kind: 'document',
            title: 'Formative vs. Summative Checks in Early Childhood',
            readTime: '4 min read',
            intro:
              "Not every check on a child's development needs to be a formal evaluation. Understand when a quick, low-stakes check is more useful than a formal assessment.",
            objectives: [
              'Distinguish formative from summative assessment in an early childhood context',
              'Identify when a low-stakes formative check is more appropriate than a formal evaluation',
            ],
            sections: [
              {
                heading: 'Formative Checks in the Moment',
                text: 'A formative check — noticing during play whether a child can sort by color, or count to five when prompted casually — happens continuously and informs what an educator does next, without formal scoring or pressure on the child.',
              },
              {
                heading: 'Summative Assessment at a Milestone Point',
                text: 'A summative assessment happens at a defined point (end of term, a specific age) to formally document where a child stands against expected milestones, often for a family or record. It should draw on the accumulated formative observations rather than a single new high-pressure test.',
              },
            ],
            takeaways: [
              'Formative checks happen continuously during natural activities and shape immediate next steps',
              'Summative assessments document a snapshot at a milestone point, ideally built from accumulated formative observation',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e13_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Formative vs. Summative Checks Quiz',
            forLesson: 'Formative vs. Summative Checks in Early Childhood',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of formative and summative checks with young children.',
            questions: [
              {
                question:
                  'A formative check during play, such as noticing if a child can sort by color, primarily serves to:',
                options: [
                  'Formally grade the child',
                  'Inform what the educator does next, without pressure on the child',
                  'Replace summative assessment entirely',
                  'Only matter for documentation purposes',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A summative assessment in early childhood is best done:',
                options: [
                  'As a single high-pressure test unrelated to daily observation',
                  'Drawing on accumulated formative observations at a defined milestone point',
                  'Randomly, with no clear timing',
                  'Only when a problem is suspected',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Formative checks are generally characterized by being:',
                options: [
                  'High-stakes and formally scored',
                  'Low-stakes and embedded in natural activity',
                  'Only used once per year',
                  'Reserved for children showing concerns',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Basing a summative assessment on accumulated formative observation, rather than one new test, tends to produce:',
                options: [
                  'A less accurate picture',
                  "A more accurate, less stressful picture of the child's actual development",
                  'No difference at all',
                  'Only negative findings',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e13_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Formative Check Plan',
            forLesson: 'Formative vs. Summative Checks in Early Childhood',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Design three low-stakes formative checks embedded in natural classroom activities that would help track progress toward one specific developmental milestone.',
            requirements: [
              'One specific developmental milestone stated',
              'Three formative checks described, each embedded in a natural activity',
              'A note on how these checks would inform an eventual summative assessment',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e13_m2',
    title: 'Module 2: Tracking Development',
    lessons: [
      {
        id: 'e13_l3',
        title: 'Developmental Milestone Checklists',
        documents: [
          {
            id: 'e13_d3',
            kind: 'document',
            title: 'Developmental Milestone Checklists',
            readTime: '5 min read',
            intro:
              'Milestone checklists are a common assessment tool — powerful when used as a guide, misleading when treated as a rigid pass/fail test.',
            objectives: [
              'Use a developmental milestone checklist appropriately as a guide, not a rigid test',
              'Explain why typical variation in milestone timing matters when interpreting a checklist',
            ],
            sections: [
              {
                heading: 'Checklists as a Guide',
                text: 'A milestone checklist lists skills typically expected within an age range, helping an educator notice patterns worth attention. It is a starting point for a conversation, not a certificate of pass or fail — many children reach milestones at different points within a wide typical range.',
              },
              {
                heading: 'Interpreting Results Responsibly',
                text: 'A single missed item on a checklist rarely means anything on its own. A pattern of multiple missed items across several checklist visits, especially clustered in one domain, is what typically warrants a closer look or a conversation with a specialist.',
                tip: 'Never present a single missed checklist item to a family as a diagnosis — checklists flag patterns worth watching, not conclusions.',
              },
            ],
            takeaways: [
              'A milestone checklist is a guide to notice patterns, not a rigid pass/fail test',
              'A pattern of missed items across time and domain, not a single item, is what warrants further attention',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e13_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Milestone Checklists Quiz',
            forLesson: 'Developmental Milestone Checklists',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of using developmental milestone checklists.',
            questions: [
              {
                question:
                  'A developmental milestone checklist should be used as:',
                options: [
                  'A rigid pass/fail test',
                  'A guide for noticing patterns worth attention',
                  'A diagnostic tool on its own',
                  'A tool only for children with concerns',
                ],
                correctIndex: 1,
              },
              {
                question: 'A single missed item on a milestone checklist:',
                options: [
                  'Always indicates a serious problem',
                  'Rarely means much on its own',
                  'Should be reported to a family as a diagnosis immediately',
                  'Means the checklist is invalid',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What typically warrants a closer look or specialist conversation is:',
                options: [
                  'Any single missed item',
                  'A pattern of multiple missed items clustered in one domain over time',
                  'A child who reaches milestones early',
                  'Nothing — checklists never warrant follow-up',
                ],
                correctIndex: 1,
              },
              {
                question: 'Presenting checklist results to a family should:',
                options: [
                  'Frame a single missed item as a diagnosis',
                  'Frame results as patterns worth watching, not conclusions',
                  'Avoid ever sharing results',
                  'Only happen if results are entirely negative',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e13_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Interpret a Milestone Checklist',
            forLesson: 'Developmental Milestone Checklists',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Given a provided completed milestone checklist for a child, write an interpretation identifying any patterns worth attention and a responsible way to communicate the results to the family.',
            requirements: [
              'Patterns (not single items) correctly identified from the checklist',
              'Reasoning for what does or does not warrant further attention',
              'A responsible, non-alarming communication approach described',
            ],
          },
        ],
      },
      {
        id: 'e13_l4',
        title: 'Writing Assessment Reports for Families',
        documents: [
          {
            id: 'e13_d4',
            kind: 'document',
            title: 'Writing Assessment Reports for Families',
            readTime: '4 min read',
            intro:
              "An assessment report is often a family's primary window into how their child is doing. Learn to write one that is clear, honest, and constructive.",
            objectives: [
              'Write an assessment summary that is clear and jargon-free for families',
              'Balance honesty about areas of concern with a constructive, strengths-based tone',
            ],
            sections: [
              {
                heading: 'Write for the Reader, Not the Field',
                text: 'Families are not trained in developmental terminology. A report full of technical jargon ("gross motor delay observed in bilateral coordination tasks") is harder to act on than plain language describing what was observed and what it might mean.',
              },
              {
                heading: 'Strengths-Based, Not Sugarcoated',
                text: "A good report leads with genuine strengths, states any concerns clearly and specifically (not vaguely alarming or vaguely reassuring), and always includes a concrete next step. Avoiding concerns to spare feelings is not kindness — it delays a family's ability to act.",
              },
            ],
            takeaways: [
              'Write assessment reports in plain language a family can act on, not technical jargon',
              'Lead with genuine strengths, state concerns specifically, and always include a concrete next step',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e13_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Family-Facing Reports Quiz',
            forLesson: 'Writing Assessment Reports for Families',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of writing assessment reports for families.',
            questions: [
              {
                question:
                  'A report using heavy developmental jargon is problematic because it:',
                options: [
                  'Is always more accurate',
                  'Is harder for families to understand and act on',
                  'Is required by best practice',
                  "Has no effect on the family's understanding",
                ],
                correctIndex: 1,
              },
              {
                question: 'A strengths-based report:',
                options: [
                  'Avoids ever mentioning a concern',
                  'Leads with genuine strengths while still stating concerns clearly',
                  'Only discusses concerns',
                  'Uses vague language to avoid difficult conversations',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Avoiding a real concern in a report to spare a family's feelings is:",
                options: [
                  'A kind and recommended practice',
                  "Not genuinely kind, since it delays the family's ability to act",
                  'Required by professional standards',
                  'Only acceptable for minor concerns',
                ],
                correctIndex: 1,
              },
              {
                question: 'Every assessment report should include:',
                options: [
                  'Only positive findings',
                  'A concrete next step',
                  'No specific observations',
                  'Only technical terminology',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e13_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Write a Family-Facing Report',
            forLesson: 'Writing Assessment Reports for Families',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Using a provided set of observation notes, write a one-page assessment report for a family in plain language, including at least one strength, one honestly stated concern (if applicable), and a concrete next step.',
            requirements: [
              'Report written in plain, jargon-free language',
              'At least one genuine strength included',
              'A concrete, specific next step provided',
            ],
          },
        ],
      },
    ],
  },
];

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
