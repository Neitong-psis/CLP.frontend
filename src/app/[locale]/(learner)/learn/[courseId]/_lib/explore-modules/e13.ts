import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

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
