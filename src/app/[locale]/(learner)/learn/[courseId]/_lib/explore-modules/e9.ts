import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

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
