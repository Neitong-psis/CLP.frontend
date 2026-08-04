import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

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
