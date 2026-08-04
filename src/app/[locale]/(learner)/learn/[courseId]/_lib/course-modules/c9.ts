import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 9: Cross-Cultural Communication ────────────────────────────────────

export const C9_MODULES: ReviewModule[] = [
  {
    id: 'c9_m1',
    title: 'Module 1: Culture & Communication Foundations',
    lessons: [
      {
        id: 'c9_l1',
        title: 'Understanding Culture',
        documents: [
          {
            id: 'c9_d1',
            kind: 'document',
            title: 'Understanding Culture',
            readTime: '4 – 5 min read',
            intro:
              'Culture is the invisible operating system that shapes how people think, communicate, and make decisions. Understanding it is the foundation of effective cross-cultural communication.',
            objectives: [
              "Define culture using Hofstede's iceberg model",
              'Identify how cultural assumptions create communication misunderstandings',
            ],
            sections: [
              {
                heading: 'The Cultural Iceberg',
                text: 'The visible part of culture — food, dress, language, celebrations — is just the tip. Below the surface: values, beliefs about time and hierarchy, attitudes to conflict and ambiguity, concepts of face and shame, and expectations of relationships in business. These invisible elements cause the most serious cross-cultural misunderstandings because both parties are unaware they are operating from different assumptions.',
                tip: 'When something feels rude or confusing in a cross-cultural interaction, assume a cultural explanation before assuming bad intent.',
              },
              {
                heading: 'Cultural Assumptions in Communication',
                text: 'Direct vs. indirect communication is the most frequently cited dimension. But equally important are attitudes to: silence (comfortable vs. uncomfortable), disagreement (expressed directly vs. indirectly), hierarchy in conversation (junior defers entirely vs. all views expected), and time (monochronic: one task at a time, strict scheduling vs. polychronic: multiple things simultaneously, flexible scheduling). None of these is correct or incorrect — they are simply different.',
              },
            ],
            takeaways: [
              'Cultural misunderstandings usually stem from invisible values and assumptions, not visible differences',
              'Assume cultural explanation before bad intent when something feels wrong in cross-cultural interaction',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c9_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Understanding Culture Quiz',
            forLesson: 'Understanding Culture',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of cultural models.',
            questions: [
              {
                question: 'The "iceberg" model of culture refers to:',
                options: [
                  'Cold climates having more formal cultures',
                  'Visible cultural elements being just the surface; invisible values and assumptions lying beneath',
                  'Culture being difficult to change',
                  'Cultural differences growing over time like an iceberg',
                ],
                correctIndex: 1,
              },
              {
                question: 'A monochronic attitude to time means:',
                options: [
                  'Time zones are strictly observed',
                  'One task is completed at a time with strict scheduling and punctuality',
                  'Multiple relationships are maintained simultaneously',
                  'Time is seen as a renewable resource',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When something feels rude in a cross-cultural interaction, you should first:',
                options: [
                  'Correct the behaviour immediately',
                  'Assume bad intent and respond assertively',
                  'Assume a cultural explanation before assuming bad intent',
                  'Ask a local colleague to intervene',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'In a high-hierarchy communication culture, junior employees typically:',
                options: [
                  'Challenge senior views openly to show engagement',
                  'Defer to senior views and avoid direct disagreement',
                  'Communicate only in writing',
                  'Address seniors by first name to signal equality',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Cultural Self-Profile',
            forLesson: 'Understanding Culture',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Map your own cultural communication style on four dimensions from the lesson: direct/indirect, hierarchy, time attitude, and silence comfort. Identify which dimension most often causes friction in cross-cultural settings.',
            requirements: [
              'Self-rating on all four dimensions with a specific example for each',
              'Dimension that most often causes friction identified and justified',
              'One awareness practice you will adopt based on this profile',
            ],
          },
        ],
      },
      {
        id: 'c9_l2',
        title: 'Verbal & Non-Verbal Communication Across Cultures',
        documents: [],
        videos: [
          {
            id: 'c9_v1',
            kind: 'video',
            title: 'Verbal & Non-Verbal Communication Across Cultures',
            duration: '13 min',
            intro:
              'What you say and how you say it — including body language, eye contact, and silence — carries entirely different meanings across cultural contexts.',
            topics: [
              'Direct vs. indirect language: how cultures signal disagreement, refusal, and uncertainty',
              'Non-verbal signals: eye contact, personal space, gestures, and their cultural meanings',
              'Silence as communication: what it signals in different contexts',
              'Language proficiency and the ethics of communication across language barriers',
            ],
            moments: [
              { time: '0:00', label: 'Language and meaning across cultures' },
              { time: '3:00', label: 'Non-verbal signals compared' },
              { time: '6:30', label: 'Silence in different cultures' },
              {
                time: '10:00',
                label: 'Communicating across language barriers ethically',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c9_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Verbal & Non-Verbal Communication Quiz',
            forLesson: 'Verbal & Non-Verbal Communication Across Cultures',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of cross-cultural verbal and non-verbal communication.',
            questions: [
              {
                question:
                  'In many East Asian cultures, silence in a conversation often signals:',
                options: [
                  'Boredom or disengagement',
                  'Respect, thoughtfulness, or polite disagreement',
                  'Lack of language proficiency',
                  'Agreement with what was said',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Using simple vocabulary with non-native speakers is best characterised as:',
                options: [
                  'Condescending — they should manage',
                  "Respectful communication that maximises clarity without reducing the other person's dignity",
                  'Required by international communication standards',
                  'Appropriate only in writing, not spoken conversation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In high-context cultures, disagreement is often expressed:',
                options: [
                  'Directly and immediately',
                  'Through indirect signals: hesitation, silence, changing the subject',
                  'In writing rather than verbally',
                  'Through a third-party intermediary',
                ],
                correctIndex: 1,
              },
              {
                question: 'Gestures are most reliably interpreted when:',
                options: [
                  'Used with confident body language',
                  "You know the specific cultural meaning in the receiver's context",
                  "They mirror the other person's gestures",
                  'They are kept to a minimum in any cultural context',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Communication Observation',
            forLesson: 'Verbal & Non-Verbal Communication Across Cultures',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Observe a real or filmed cross-cultural interaction. Identify three moments where verbal or non-verbal signals could be misread and explain the likely cultural interpretation on each side.',
            requirements: [
              'Three specific moments described with the cultural context of each party',
              'Likely misinterpretation on each side explained',
              'One practical adaptation that would reduce misunderstanding in each moment',
            ],
          },
        ],
      },
      {
        id: 'c9_l3',
        title: 'Building Cross-Cultural Relationships',
        documents: [
          {
            id: 'c9_d2',
            kind: 'document',
            title: 'Building Cross-Cultural Relationships',
            readTime: '4 – 5 min read',
            intro:
              'Trust is built differently across cultures. In some contexts, it precedes business; in others, it follows successful business. Knowing the difference changes how you build professional relationships globally.',
            objectives: [
              'Distinguish relationship-first and task-first cultures in a professional context',
              'Apply strategies for building trust with counterparts from different cultural backgrounds',
            ],
            sections: [
              {
                heading: 'Relationship-First vs. Task-First Cultures',
                text: 'In relationship-first cultures (Brazil, China, Saudi Arabia, many African contexts), trust is personal and must be built before business can proceed. Jumping into the agenda on a first meeting signals distrust. In task-first cultures (Germany, Scandinavia, USA), trust is built through competent professional performance — relationship follows successful work. Neither is superior; what matters is knowing which culture you are operating in and adapting accordingly.',
                tip: 'When in doubt, invest more time in relationship-building than you think is necessary. The cost of being too relational is low; the cost of being too transactional is high.',
              },
              {
                heading: 'Trust Repair Across Cultures',
                text: 'When trust breaks down in cross-cultural relationships, the repair path differs. In individualist cultures, a direct apology and corrective action usually suffices. In collectivist cultures, trust repair often requires an intermediary (a mutually trusted third party), a face-saving frame for the other party, and more time — because trust was personal, not transactional, and cannot be rebuilt in a single meeting.',
              },
            ],
            takeaways: [
              'Relationship-first cultures require trust before business; task-first cultures build trust through performance — adapt to the context',
              'Trust repair in collectivist cultures requires an intermediary, face-saving, and time',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c9_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cross-Cultural Relationships Quiz',
            forLesson: 'Building Cross-Cultural Relationships',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of cross-cultural relationship building.',
            questions: [
              {
                question:
                  'In relationship-first cultures, jumping straight to the business agenda in a first meeting signals:',
                options: [
                  'Professionalism and respect for their time',
                  'Distrust — relationships must precede business',
                  'An international standard of efficiency',
                  'Confidence in the proposal',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In task-first cultures, trust is primarily built by:',
                options: [
                  'Investing time in personal relationship before work begins',
                  'Competent professional performance — trust follows successful collaboration',
                  'Formal introductions by a trusted mutual contact',
                  "Showing knowledge of the other person's culture",
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When trust breaks down in a collectivist culture, repair typically requires:',
                options: [
                  'A direct, immediate apology',
                  'A mutually trusted intermediary and face-saving framing',
                  'A written formal apology sent to all stakeholders',
                  'A restart from the beginning of the business relationship',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The advice "invest more time in relationship-building than you think necessary" is given because:',
                options: [
                  'Relationship-first cultures are the global majority',
                  'Being too relational costs little; being too transactional costs the relationship',
                  'It is always more polite than being direct',
                  'International norms require extended relationship-building periods',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Relationship Strategy',
            forLesson: 'Building Cross-Cultural Relationships',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Plan a first meeting with a counterpart from a relationship-first culture (choose a specific country). Describe how you would structure the meeting differently from your usual approach.',
            requirements: [
              'Specific country and its relationship-first characteristics described',
              'Meeting structure: what you would do differently in the first 30 minutes',
              'One topic or question you would avoid until trust is established, and why',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c9_m2',
    title: 'Module 2: Cross-Cultural Communication in Practice',
    lessons: [
      {
        id: 'c9_l4',
        title: 'Cross-Cultural Negotiation',
        documents: [],
        videos: [
          {
            id: 'c9_v2',
            kind: 'video',
            title: 'Cross-Cultural Negotiation',
            duration: '14 min',
            intro:
              'Negotiation styles differ fundamentally across cultures. What is assertive in one culture is aggressive in another; what is reasonable in one culture is weakness in another.',
            topics: [
              'Win-win vs. win-lose negotiation orientations across cultures',
              'The role of face, hierarchy, and intermediaries in negotiation',
              'How cultures treat deadlines and final offers differently',
              'Tactics for preparing for and conducting cross-cultural negotiations',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Cultural negotiation orientation differences',
              },
              { time: '3:20', label: 'Face and hierarchy in negotiation' },
              { time: '7:00', label: 'Deadlines and final offers' },
              { time: '10:30', label: 'Preparation tactics' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c9_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cross-Cultural Negotiation Quiz',
            forLesson: 'Cross-Cultural Negotiation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of cross-cultural negotiation dynamics.',
            questions: [
              {
                question:
                  'In many Asian negotiation contexts, the role of hierarchy means:',
                options: [
                  'Junior team members lead negotiations',
                  'Decisions are made in the room regardless of seniority',
                  'The most senior person present rarely speaks first — their role is to observe and decide',
                  'Seniority determines who speaks most frequently',
                ],
                correctIndex: 2,
              },
              {
                question: '"Face" in negotiation contexts means:',
                options: [
                  'Physical appearance during negotiations',
                  'Social reputation, dignity, and respect — protecting it is a priority',
                  'The front-facing position in a meeting room',
                  'Masking your true negotiating position',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When a counterpart in a high-context culture says "that will be difficult" about your proposal, they most likely mean:',
                options: [
                  'They need more time to calculate costs',
                  'No — they are declining indirectly to preserve face',
                  'They agree in principle but need more details',
                  'They will take it back for committee review',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A "final offer" deadline should be used in cross-cultural negotiations:',
                options: [
                  'As a standard closing tactic in all contexts',
                  'Cautiously — some cultures treat deadlines as negotiating positions, not absolute limits',
                  'Only in writing, never verbally',
                  'After at least three rounds of negotiation',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Negotiation Preparation',
            forLesson: 'Cross-Cultural Negotiation',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Prepare for a hypothetical negotiation with a counterpart from Japan or Brazil (choose one). Describe five specific adaptations to your usual negotiation approach.',
            requirements: [
              'Country selected with its key negotiation cultural characteristics described',
              'Five specific adaptations to your approach with reasoning for each',
              'Identify one tactic from your usual approach that you would avoid and why',
            ],
          },
        ],
      },
      {
        id: 'c9_l5',
        title: 'Managing Cross-Cultural Conflict',
        documents: [
          {
            id: 'c9_d3',
            kind: 'document',
            title: 'Managing Cross-Cultural Conflict',
            readTime: '4 – 5 min read',
            intro:
              "Cross-cultural conflict often feels more intense than it is because both parties misread the other's cultural signals as intentional provocation.",
            objectives: [
              'Apply a culturally sensitive conflict resolution process',
              'Distinguish task conflict (healthy) from relationship conflict (damaging) in cross-cultural teams',
            ],
            sections: [
              {
                heading: 'Why Cross-Cultural Conflict Escalates',
                text: "Most cross-cultural conflict begins as a small misunderstanding — a silence read as disagreement, a directness read as aggression, a delay read as disrespect. Because neither party has the cultural frame to interpret the other's behaviour charitably, each escalates defensively. The fastest de-escalation is to name what you are experiencing (\"I noticed you went quiet — I want to make sure I'm communicating clearly\") without assuming the other party's motive.",
                tip: 'Describe behaviour, not character. "The meeting started 30 minutes late" is a fact. "You don\'t respect my time" is an attribution — and likely wrong.',
              },
              {
                heading: 'Task vs. Relationship Conflict',
                text: 'Task conflict — disagreement about work, methods, and priorities — is healthy and improves decisions when managed well. Relationship conflict — personal friction and distrust — degrades performance. Cross-cultural conflicts frequently convert from task to relationship because culturally normal behaviours are misread as personal disrespect. The intervention is to reframe the conflict at the task level ("we have a disagreement about the approach, not about each other") and use cultural context to explain the behaviour.',
              },
            ],
            takeaways: [
              "Cross-cultural conflict escalates when cultural behaviour is misread as personal provocation — name the behaviour, don't attribute motive",
              'Reframe from relationship conflict to task conflict: "disagreement about the approach, not about each other"',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c9_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cross-Cultural Conflict Quiz',
            forLesson: 'Managing Cross-Cultural Conflict',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of cross-cultural conflict management.',
            questions: [
              {
                question: 'Cross-cultural conflict most commonly begins as:',
                options: [
                  'A deliberate act of cultural disrespect',
                  'A small misunderstanding where cultural signals are misread as intentional',
                  'A language barrier that prevents clear communication',
                  'A disagreement about organisational goals',
                ],
                correctIndex: 1,
              },
              {
                question:
                  '"Describe behaviour, not character" in conflict means:',
                options: [
                  "Focus on what happened, not on interpreting the other person's motives or personality",
                  'Write a formal description of the incident for HR',
                  'Avoid all personal language in conflict discussions',
                  'Use only objective data in conflict conversations',
                ],
                correctIndex: 0,
              },
              {
                question: 'Task conflict in cross-cultural teams is:',
                options: [
                  'Always damaging and should be avoided',
                  'Healthy when managed — it improves decisions by surfacing different perspectives',
                  'Less common than relationship conflict',
                  'Best resolved by the most senior person present',
                ],
                correctIndex: 1,
              },
              {
                question: 'Reframing from relationship to task conflict means:',
                options: [
                  'Ignoring the personal dimension of the conflict',
                  'Stating: "we have a disagreement about the approach, not about each other"',
                  'Delegating the conflict to a neutral mediator',
                  'Focusing on the financial impact of the conflict instead',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Conflict Script',
            forLesson: 'Managing Cross-Cultural Conflict',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Write a 200-word script for addressing a cross-cultural conflict. The situation: a team member from a high-context culture has been consistently silent in meetings, which their low-context manager has interpreted as disengagement.',
            requirements: [
              "Script written from the manager's perspective",
              'Uses behaviour description, not character attribution',
              "Explicitly reframes from relationship to task level and invites the team member's perspective",
            ],
          },
        ],
      },
      {
        id: 'c9_l6',
        title: 'Inclusive Cross-Cultural Workplaces',
        documents: [],
        videos: [
          {
            id: 'c9_v3',
            kind: 'video',
            title: 'Inclusive Cross-Cultural Workplaces',
            duration: '12 min',
            intro:
              'Diversity without inclusion is noise. Learn how to design work environments where people from all cultural backgrounds can contribute at their best.',
            topics: [
              'The difference between diversity, equity, and inclusion',
              'Structural vs. interpersonal barriers to inclusion for multicultural employees',
              'Meeting design for cross-cultural inclusion',
              'Leader behaviours that signal belonging across cultures',
            ],
            moments: [
              { time: '0:00', label: 'Diversity vs. inclusion distinction' },
              { time: '2:50', label: 'Structural barriers to inclusion' },
              { time: '6:30', label: 'Inclusive meeting design' },
              {
                time: '9:40',
                label: 'Leader behaviours that signal belonging',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c9_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Inclusive Workplaces Quiz',
            forLesson: 'Inclusive Cross-Cultural Workplaces',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of cross-cultural inclusion.',
            questions: [
              {
                question: 'Diversity without inclusion means:',
                options: [
                  'A company with employees from many countries but no inclusive practices',
                  'Having diverse perspectives but not diverse people',
                  'Hiring diverse employees who are then required to assimilate to the dominant culture',
                  'A company that values diversity in theory but not practice',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'A structural barrier to cross-cultural inclusion is:',
                options: [
                  'Personal prejudice from colleagues',
                  'Networking events scheduled in ways that systematically exclude some cultural groups',
                  'Unconscious bias in individual decision-making',
                  'Language accents affecting perceived credibility',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'For inclusive cross-cultural meetings, which practice is most effective?',
                options: [
                  'Conducting all meetings in the dominant language without accommodation',
                  'Circulating agendas in advance to allow non-native speakers to prepare contributions',
                  'Requiring all participants to speak the same amount',
                  'Avoiding silence with constant facilitation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A leader behaviour that signals belonging across cultures is:',
                options: [
                  'Treating all employees identically regardless of background',
                  'Proactively seeking input from those who are less likely to speak first in the dominant culture',
                  'Celebrating only locally significant cultural events',
                  'Avoiding cultural topics to prevent discomfort',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c9_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Inclusion Audit',
            forLesson: 'Inclusive Cross-Cultural Workplaces',
            dueDate: 'Jul 19',
            submission: 'Text response',
            instructions:
              'Conduct a brief inclusion audit of a team, class, or organisation you are part of. Identify two structural and two interpersonal barriers to cross-cultural inclusion and propose one action to address each.',
            requirements: [
              'Two structural and two interpersonal barriers identified with specific examples',
              'One action proposed per barrier',
              'Actions prioritised by expected impact vs. difficulty to implement',
            ],
          },
        ],
      },
    ],
  },
];
