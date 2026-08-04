import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

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
