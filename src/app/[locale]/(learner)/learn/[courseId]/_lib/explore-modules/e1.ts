import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

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
