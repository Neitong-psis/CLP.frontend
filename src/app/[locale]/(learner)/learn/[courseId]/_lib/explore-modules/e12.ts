import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

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
