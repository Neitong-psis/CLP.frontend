import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

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
