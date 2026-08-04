import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 5: Global Leadership Excellence ───────────────────────────────────

export const C5_MODULES: ReviewModule[] = [
  {
    id: 'c5_m1',
    title: 'Module 1: Global Mindset',
    lessons: [
      {
        id: 'c5_l1',
        title: 'Global Leadership Foundations',
        documents: [
          {
            id: 'c5_d1',
            kind: 'document',
            title: 'Global Leadership Foundations',
            readTime: '5 – 6 min read',
            intro:
              'Global leaders operate across borders, cultures, and time zones. The foundation is a mindset — not just a passport stamp.',
            objectives: [
              'Define the global leadership mindset and its distinguishing characteristics',
              'Identify the core competencies that separate locally effective leaders from globally effective ones',
            ],
            sections: [
              {
                heading: 'What Makes a Leader Global',
                text: 'A global leader does not just travel internationally. They actively cultivate curiosity about different ways of thinking, comfort with ambiguity, and the ability to build trust across cultural boundaries. Research by Javidan et al. identifies three dimensions of global mindset: intellectual (knowledge of global business), psychological (openness to different cultures), and social (ability to connect with people from other cultures). Developing all three is intentional work.',
                tip: 'Measure your global mindset not by where you have been, but by how genuinely curious you are about perspectives different from your own.',
              },
              {
                heading: 'Global vs. Local Leadership Competencies',
                text: 'Local leadership competencies — clear communication, accountability, empathy — remain essential globally. But global leaders also need: cultural intelligence (reading cultural cues accurately), systemic thinking (understanding how decisions ripple across markets), and adaptive communication (adjusting style without losing authenticity). The failure mode for locally great leaders going global is assuming that what worked at home will work everywhere.',
              },
            ],
            takeaways: [
              'Global mindset has three dimensions: intellectual, psychological, and social — all are developable',
              'Local leadership skills are necessary but not sufficient for global effectiveness',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c5_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Global Leadership Foundations Quiz',
            forLesson: 'Global Leadership Foundations',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of global leadership mindset and competencies.',
            questions: [
              {
                question:
                  'The psychological dimension of global mindset refers to:',
                options: [
                  'Knowledge of global business environments',
                  'Openness to different cultures and ways of thinking',
                  'Ability to build relationships across cultural boundaries',
                  'Fluency in multiple languages',
                ],
                correctIndex: 1,
              },
              {
                question: 'Cultural intelligence is:',
                options: [
                  'The ability to speak multiple languages',
                  'Reading cultural cues accurately and adapting your behaviour accordingly',
                  'Knowing historical facts about different countries',
                  'Avoiding cultural topics in professional settings',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The most common failure mode for locally great leaders going global is:',
                options: [
                  'Spending too much time learning the new culture',
                  'Assuming that what worked at home will work everywhere',
                  'Being too adaptable and losing their leadership identity',
                  'Focusing too much on systemic thinking',
                ],
                correctIndex: 1,
              },
              {
                question: 'Adaptive communication in a global context means:',
                options: [
                  'Using a translator for all important conversations',
                  'Adjusting style without losing authenticity',
                  'Speaking more slowly with non-native speakers',
                  'Avoiding idioms and humour entirely',
                ],
                correctIndex: 1,
              },
              {
                question: 'Global mindset is best measured by:',
                options: [
                  'Number of countries visited',
                  'Number of languages spoken',
                  'Genuine curiosity about perspectives different from your own',
                  'Years of international work experience',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Global Mindset Self-Assessment',
            forLesson: 'Global Leadership Foundations',
            dueDate: 'Jul 5',
            submission: 'Text response',
            instructions:
              'Rate yourself 1–5 on each of the three global mindset dimensions (intellectual, psychological, social). For each, provide one piece of evidence and one specific development action.',
            requirements: [
              'Self-rating on all three dimensions with evidence for each',
              'One development action per dimension that is concrete and time-bound',
              'Identify which dimension is your most critical gap for your career context',
            ],
          },
        ],
      },
      {
        id: 'c5_l2',
        title: 'Cultural Intelligence',
        documents: [],
        videos: [
          {
            id: 'c5_v1',
            kind: 'video',
            title: 'Cultural Intelligence',
            duration: '15 min',
            intro:
              'Cultural intelligence (CQ) is the ability to work effectively with people from different cultural backgrounds. It is learnable — and measurable.',
            topics: [
              'The four CQ capabilities: drive, knowledge, strategy, and action',
              "Hofstede's cultural dimensions: power distance, individualism, uncertainty avoidance",
              'Common cross-cultural misunderstandings and how to navigate them',
              'Building CQ through deliberate practice',
            ],
            moments: [
              { time: '0:00', label: 'Why CQ matters more than IQ globally' },
              { time: '3:00', label: 'Four CQ capabilities' },
              { time: '7:30', label: "Hofstede's dimensions explained" },
              { time: '12:00', label: 'Building CQ deliberately' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c5_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cultural Intelligence Quiz',
            forLesson: 'Cultural Intelligence',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              "Test your knowledge of cultural intelligence and Hofstede's cultural dimensions.",
            questions: [
              {
                question: 'CQ Drive refers to:',
                options: [
                  'The knowledge of cultural norms and values',
                  'The motivation and confidence to adapt to different cultural contexts',
                  'The ability to adapt behaviour in cross-cultural interactions',
                  'The planning and awareness before cross-cultural encounters',
                ],
                correctIndex: 1,
              },
              {
                question: 'A culture with high power distance:',
                options: [
                  'Values equality between all hierarchical levels',
                  'Accepts and expects unequal distribution of power',
                  'Has no formal leadership structures',
                  'Resists any form of authority',
                ],
                correctIndex: 1,
              },
              {
                question: 'Hofstede\'s "individualism" dimension measures:',
                options: [
                  'How competitive individuals are in a culture',
                  'The degree to which people see themselves as independent vs. part of a collective',
                  'How much personal space people prefer',
                  'The tolerance for rule-breaking in a society',
                ],
                correctIndex: 1,
              },
              {
                question: 'CQ Action is:',
                options: [
                  'The motivation to engage with different cultures',
                  'The knowledge base of cultural facts',
                  'The ability to actually adapt verbal and non-verbal behaviour in cross-cultural interactions',
                  'Strategic planning before a cross-cultural meeting',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'CQ is described as "learnable and measurable" because:',
                options: [
                  'It is assessed by passport stamps and travel experience',
                  'Research shows deliberate practice systematically improves all four CQ capabilities',
                  'Language learning is the primary input',
                  'CQ tests are standardised internationally',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Cultural Comparison',
            forLesson: 'Cultural Intelligence',
            dueDate: 'Jul 7',
            submission: 'Text response',
            instructions:
              "Compare two cultures (one you are familiar with, one you are less familiar with) on two of Hofstede's dimensions. Describe how the differences would affect a leadership interaction.",
            requirements: [
              'Two specific Hofstede dimensions used with definitions',
              'Comparison covers both cultures for each dimension',
              'One concrete leadership interaction described differently for each culture',
            ],
          },
        ],
      },
      {
        id: 'c5_l3',
        title: 'Cross-Cultural Communication',
        documents: [
          {
            id: 'c5_d2',
            kind: 'document',
            title: 'Cross-Cultural Communication',
            readTime: '4 – 6 min read',
            intro:
              'What counts as clear, respectful communication varies dramatically across cultures. What is direct in one culture is rude in another.',
            objectives: [
              'Distinguish high-context and low-context communication cultures',
              'Adapt communication style without losing your core message',
            ],
            sections: [
              {
                heading: 'High-Context vs. Low-Context Communication',
                text: 'In low-context cultures (Germany, USA, Australia), communication is direct and explicit — meaning is in the words. In high-context cultures (Japan, Cambodia, China, many Middle Eastern cultures), communication relies heavily on relationship, tone, gesture, and what is not said. Silence can mean disagreement. A "yes" can mean "I heard you" rather than "I agree." Misreading these signals causes costly misunderstandings in global business.',
                tip: 'When working with a high-context culture, pay as much attention to what is NOT said as to what is said.',
              },
              {
                heading: 'Adapting Without Losing Your Message',
                text: 'Adaptation does not mean becoming someone you are not. It means adjusting the channel and the style while keeping the content intact. In a high-context setting: spend more time on relationship-building before business, use indirect language for disagreement, and allow silence. In a low-context setting: be explicit about next steps, confirm decisions in writing, and express disagreement directly as expected.',
              },
            ],
            takeaways: [
              'High-context cultures embed meaning in relationship and subtext; low-context cultures embed it in explicit words',
              'Adapt communication style without losing content — change the channel, not the message',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c5_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cross-Cultural Communication Quiz',
            forLesson: 'Cross-Cultural Communication',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of high-context and low-context communication styles.',
            questions: [
              {
                question: 'In a high-context culture, communication relies on:',
                options: [
                  'Explicit written agreements',
                  'Relationship, tone, gesture, and what is left unsaid',
                  'Direct verbal statements of fact',
                  'Formal titles and hierarchical address',
                ],
                correctIndex: 1,
              },
              {
                question: 'In a low-context culture, a direct "no" is:',
                options: [
                  'Considered offensive and avoided',
                  'Unusual and mostly reserved for close relationships',
                  'A clear, expected, and acceptable response',
                  'Always followed by an elaborate explanation',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'When a high-context culture partner says "yes" in a meeting, it most likely means:',
                options: [
                  'Full agreement with the proposal',
                  '"I heard you" — agreement is unclear',
                  'The project can begin immediately',
                  'All team members are aligned',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Adapting to a high-context communication culture means:',
                options: [
                  'Translating all materials into the local language',
                  'Spending more time on relationship-building before business discussion',
                  'Eliminating all indirect language from your vocabulary',
                  'Only communicating in writing',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The principle "change the channel, not the message" means:',
                options: [
                  'Use different media for different cultures',
                  'Adjust your communication style while keeping the core content intact',
                  'Use high-context signals in all cultures',
                  'Simplify your message for non-native speakers',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Communication Adaptation',
            forLesson: 'Cross-Cultural Communication',
            dueDate: 'Jul 9',
            submission: 'Text response',
            instructions:
              'Write the same difficult message (e.g. declining a proposal, delivering critical feedback) twice — once for a low-context audience and once for a high-context audience. Annotate the differences.',
            requirements: [
              'Same core message delivered in both versions',
              'Differences annotated with reference to the high/low-context distinction',
              'Explain which version required more preparation and why',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c5_m2',
    title: 'Module 2: Strategic Global Leadership',
    lessons: [
      {
        id: 'c5_l4',
        title: 'Vision & Strategy',
        documents: [],
        videos: [
          {
            id: 'c5_v2',
            kind: 'video',
            title: 'Vision & Strategy',
            duration: '14 min',
            intro:
              'A compelling vision gives people a reason to follow you across time zones and cultural boundaries.',
            topics: [
              'What makes a vision compelling across cultures',
              'Strategy as a theory of winning — how to build one',
              'Translating global strategy into local execution',
              'Measuring strategic progress in a global organisation',
            ],
            moments: [
              { time: '0:00', label: 'Vision as cross-cultural glue' },
              { time: '3:10', label: 'What makes strategy coherent' },
              { time: '7:30', label: 'Global strategy → local execution' },
              { time: '11:50', label: 'Measuring strategic progress' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c5_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Vision & Strategy Quiz',
            forLesson: 'Vision & Strategy',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of vision-setting and strategy development in a global context.',
            questions: [
              {
                question: 'A compelling organisational vision should:',
                options: [
                  'Be specific enough to serve as an annual plan',
                  'Be aspirational, clear, and resonate across cultural boundaries',
                  'Be changed every quarter to reflect new priorities',
                  'Be created by the CEO without input from the organisation',
                ],
                correctIndex: 1,
              },
              {
                question: 'Strategy is best defined as:',
                options: [
                  'A detailed operational plan',
                  'A theory of how the organisation will win given its competitive environment',
                  'An annual budget allocation process',
                  'A set of values and principles',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Translating global strategy into local execution requires:',
                options: [
                  'Identical implementation across all markets',
                  'Adapting tactics to local context while maintaining strategic intent',
                  'Separate strategies for every country',
                  'Centralising all decisions at headquarters',
                ],
                correctIndex: 1,
              },
              {
                question: 'A leading indicator for strategic progress is:',
                options: [
                  "Last year's financial results",
                  'An early metric that predicts whether you will achieve the strategic goal',
                  'The number of strategic initiatives launched',
                  'Board approval of the annual plan',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What is the primary risk when a global strategy is not adapted for local execution?',
                options: [
                  'The strategy becomes too expensive',
                  'Local teams execute brilliantly but toward the wrong objective',
                  'Headquarters loses visibility of local performance',
                  'The strategy cannot be measured',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Vision Statement',
            forLesson: 'Vision & Strategy',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Write a vision statement for a real or hypothetical global organisation and a two-sentence strategy statement that explains how it will achieve the vision. Assess whether the vision would resonate across cultures.',
            requirements: [
              'Vision statement in one clear sentence (no jargon)',
              'Strategy statement specifies the competitive choice being made',
              'Cultural resonance assessment for at least two different cultural contexts',
            ],
          },
        ],
      },
      {
        id: 'c5_l5',
        title: 'Change Management',
        documents: [
          {
            id: 'c5_d3',
            kind: 'document',
            title: 'Change Management',
            readTime: '5 – 6 min read',
            intro:
              'Most change initiatives fail — not because the strategy is wrong, but because of how (or how poorly) the change is managed.',
            objectives: [
              "Apply Kotter's 8-step change model to a global transformation",
              'Identify the most common reasons change initiatives fail and how to prevent them',
            ],
            sections: [
              {
                heading: "Kotter's 8-Step Change Model",
                text: 'Kotter identifies eight steps: (1) Create urgency, (2) Form a guiding coalition, (3) Develop a vision for change, (4) Communicate the vision, (5) Remove obstacles, (6) Create short-term wins, (7) Build on the change, (8) Anchor the change in culture. The model is sequential — skipping steps, especially urgency and coalition-building, is the most common reason change initiatives stall or reverse.',
                tip: "Short-term wins (step 6) are not optional. They prove the change is working and sustain the coalition's momentum.",
              },
              {
                heading: 'Why Change Fails',
                text: 'The top reasons: (1) Insufficient urgency — people do not believe change is necessary. (2) No guiding coalition — the change depends on one champion who leaves. (3) Poor communication — the vision is announced once and then forgotten. (4) Underestimating resistance — resistance is treated as obstruction rather than as feedback about implementation gaps. (5) Declaring victory too soon — reverting to old habits once pressure eases.',
              },
            ],
            takeaways: [
              "Kotter's model is sequential — skipping urgency and coalition-building causes most change failures",
              'Resistance to change is feedback about implementation gaps — treat it as data, not obstruction',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c5_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Change Management Quiz',
            forLesson: 'Change Management',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              "Test your understanding of Kotter's change model and why change initiatives fail.",
            questions: [
              {
                question:
                  "In Kotter's model, what must come before forming the guiding coalition?",
                options: [
                  'Developing the change vision',
                  'Creating urgency',
                  'Communicating the vision',
                  'Removing obstacles',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Short-term wins in a change process are important because:',
                options: [
                  'They allow the change leader to declare victory early',
                  'They prove the change is working and sustain momentum',
                  'They are the final step before anchoring change in culture',
                  'They replace the need for a guiding coalition',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What is the most effective way to handle resistance to change?',
                options: [
                  'Ignore it and continue with implementation',
                  'Replace resistant team members',
                  'Treat it as feedback about implementation gaps',
                  'Delay the change until resistance disappears',
                ],
                correctIndex: 2,
              },
              {
                question: 'A change initiative most commonly fails because:',
                options: [
                  'The strategy is technically incorrect',
                  "Insufficient urgency — people don't believe change is necessary",
                  'The budget is too small',
                  'The change leader lacks seniority',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Anchoring change in culture (Kotter's step 8) means:",
                options: [
                  'Publishing a new company culture document',
                  'The new way of working becomes the default and is reinforced in hiring and promotion',
                  'Change is now permanent and no further action is needed',
                  'A culture survey is conducted after the change',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Change Plan',
            forLesson: 'Change Management',
            dueDate: 'Jul 14',
            submission: 'Text response',
            instructions:
              "Apply Kotter's 8-step model to a change you would like to drive in a real or hypothetical organisation. For each step, describe one specific action you would take.",
            requirements: [
              'All eight steps addressed with one specific action each',
              'Step 1 (urgency) supported by a data point or business case',
              'Identify the step where you anticipate the most resistance and how you will address it',
            ],
          },
        ],
      },
      {
        id: 'c5_l6',
        title: 'Building Global Teams',
        documents: [],
        videos: [
          {
            id: 'c5_v3',
            kind: 'video',
            title: 'Building Global Teams',
            duration: '13 min',
            intro:
              'Global teams are more creative and more challenging to lead than local ones. The key is designing the team as carefully as you design the strategy.',
            topics: [
              'Why diverse teams outperform homogeneous ones — and when they struggle',
              'The trust-building challenge in virtual global teams',
              'Setting team norms that work across time zones and cultures',
              'Communication tools and rhythms for distributed leadership',
            ],
            moments: [
              { time: '0:00', label: 'The diversity performance paradox' },
              { time: '3:00', label: 'Trust-building in virtual teams' },
              { time: '6:40', label: 'Setting global team norms' },
              {
                time: '10:20',
                label: 'Communication rhythms for distributed teams',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c5_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Building Global Teams Quiz',
            forLesson: 'Building Global Teams',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of global team dynamics and virtual leadership.',
            questions: [
              {
                question:
                  'Research shows diverse teams outperform homogeneous teams when:',
                options: [
                  'All members share the same working style',
                  'The team has processes for integrating different perspectives',
                  'Diversity is limited to nationality rather than function',
                  'The team leader is from the majority cultural group',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The primary trust-building challenge in virtual global teams is:',
                options: [
                  'Language barriers in written communication',
                  'The absence of informal, spontaneous interactions that build relationship',
                  'Different time zones making synchronous work impossible',
                  'Different salary levels across countries',
                ],
                correctIndex: 1,
              },
              {
                question: 'Team norms for a global team should be:',
                options: [
                  "Inherited from headquarters' practices",
                  'Explicitly negotiated by the team, not assumed',
                  'Set by the most senior member',
                  'Based on the culture of the team leader',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'An effective communication rhythm for a distributed global team includes:',
                options: [
                  'Daily all-hands meetings across all time zones',
                  'Ad hoc communication whenever something comes up',
                  'A predictable cadence of synchronous and asynchronous touchpoints agreed in advance',
                  'Email only, to create a written record',
                ],
                correctIndex: 2,
              },
              {
                question: 'The "diversity performance paradox" refers to:',
                options: [
                  'Diverse teams are always better at everything',
                  'Diversity improves creativity but increases coordination costs if not managed',
                  'Performance improves only when diversity is mandated',
                  'Cultural diversity and cognitive diversity always produce the same results',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Team Charter',
            forLesson: 'Building Global Teams',
            dueDate: 'Jul 17',
            submission: 'File or link upload',
            instructions:
              'Draft a one-page team charter for a hypothetical global team of five people in three different countries and time zones.',
            requirements: [
              'Communication tools and cadence (synchronous and asynchronous) specified',
              'At least four explicit team norms covering decision-making, conflict, responsiveness, and meetings',
              'Trust-building approach for the first 30 days described',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c5_m3',
    title: 'Module 3: Leading for Impact',
    lessons: [
      {
        id: 'c5_l7',
        title: 'Ethical Leadership',
        documents: [
          {
            id: 'c5_d4',
            kind: 'document',
            title: 'Ethical Leadership',
            readTime: '5 – 6 min read',
            intro:
              'Ethical leaders do the right thing when no one is watching — and set the conditions for others to do the same.',
            objectives: [
              'Define ethical leadership and its impact on organisational culture',
              'Apply a structured ethical decision-making framework to a dilemma',
            ],
            sections: [
              {
                heading: 'What Ethical Leadership Is',
                text: 'Ethical leadership goes beyond compliance. A compliant leader avoids breaking rules. An ethical leader actively creates conditions in which people are encouraged to raise concerns, empowered to say no to shortcuts, and recognised for integrity not just results. The ethical tone of an organisation is set at the top — but maintained at every level. When leaders cut ethical corners "just this once," they signal to everyone that results justify any means.',
                tip: 'If you would be uncomfortable seeing your decision reported on the front page of a newspaper, reconsider it.',
              },
              {
                heading: 'Ethical Decision-Making Framework',
                text: 'When facing an ethical dilemma, apply three lenses: (1) Consequences — who is helped and harmed, and how much? (2) Rights and duties — does the action respect the rights of everyone affected? (3) Character — would a person of good character make this decision? No single lens is always sufficient; the most robust ethical decisions hold up under all three.',
              },
            ],
            takeaways: [
              'Ethical tone is set at the top — leaders who cut corners signal that results justify any means',
              'Test decisions against three lenses: consequences, rights, and character',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c5_q7',
            kind: 'quiz',
            status: 'Ready',
            title: 'Ethical Leadership Quiz',
            forLesson: 'Ethical Leadership',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of ethical leadership principles and decision-making.',
            questions: [
              {
                question: 'Ethical leadership differs from compliance by:',
                options: [
                  'Following all legal rules without exception',
                  'Actively creating conditions where people are empowered to act with integrity',
                  'Punishing rule-breakers more severely',
                  'Delegating all ethical decisions to HR',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When a leader cuts ethical corners "just this once," the signal to the team is:',
                options: [
                  "This is a rare exception and won't happen again",
                  'Results justify the means — others can apply the same logic',
                  'The leader is under unusual pressure and needs support',
                  'The rule was probably wrong anyway',
                ],
                correctIndex: 1,
              },
              {
                question: 'The "newspaper front page" test is used to:',
                options: [
                  'Evaluate whether a decision will generate positive press',
                  'Check whether you would be comfortable with the decision being public',
                  'Assess the reputational risk of a product launch',
                  'Determine whether to involve PR in a decision',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The consequences lens in ethical decision-making asks:',
                options: [
                  "Does the action respect everyone's rights?",
                  'Would a person of good character make this decision?',
                  'Who is helped and harmed, and by how much?',
                  'Is the action legally permitted?',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Why is using all three ethical lenses (consequences, rights, character) recommended?',
                options: [
                  'It satisfies three different regulatory requirements',
                  'Each lens can be blind to what the others reveal — together they are more robust',
                  'Three lenses is the legal minimum for due diligence',
                  'It speeds up the decision-making process',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a7',
            kind: 'assignment',
            status: 'Ready',
            title: 'Ethical Dilemma Analysis',
            forLesson: 'Ethical Leadership',
            dueDate: 'Jul 20',
            submission: 'Text response',
            instructions:
              'Describe a real or hypothetical ethical dilemma in a business or leadership context. Apply all three ethical lenses and state your decision with justification.',
            requirements: [
              'Dilemma clearly described with all affected parties named',
              'All three lenses applied with specific reasoning for each',
              'Final decision stated and one potential unintended consequence acknowledged',
            ],
          },
        ],
      },
      {
        id: 'c5_l8',
        title: 'Legacy & Sustainability',
        documents: [],
        videos: [
          {
            id: 'c5_v4',
            kind: 'video',
            title: 'Legacy & Sustainability',
            duration: '13 min',
            intro:
              'The measure of a great leader is what happens after they leave. Build the conditions for sustainable impact.',
            topics: [
              'Defining legacy: what leaders leave behind beyond results',
              'Building organisational capability that outlasts the leader',
              'Sustainable leadership: avoiding burnout and modelling balance',
              'Developing the next generation of leaders as a core leadership responsibility',
            ],
            moments: [
              { time: '0:00', label: 'Legacy vs. results' },
              {
                time: '2:50',
                label: 'Building lasting organisational capability',
              },
              {
                time: '6:30',
                label: 'Sustainable leadership and avoiding burnout',
              },
              { time: '10:20', label: 'Developing the next generation' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c5_q8',
            kind: 'quiz',
            status: 'Ready',
            title: 'Legacy & Sustainability Quiz',
            forLesson: 'Legacy & Sustainability',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of leadership legacy and sustainable leadership practices.',
            questions: [
              {
                question: "A leader's legacy is best measured by:",
                options: [
                  'Revenue growth during their tenure',
                  'Awards and recognition received',
                  'The capability and culture the organisation retains after they leave',
                  'The number of people they directly managed',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Building organisational capability that outlasts a leader requires:',
                options: [
                  'Keeping all strategic knowledge with the leader',
                  'Developing other leaders who can carry the work forward',
                  'Ensuring the leader stays in role as long as possible',
                  'Centralising all decision-making to maintain consistency',
                ],
                correctIndex: 1,
              },
              {
                question: 'Sustainable leadership means:',
                options: [
                  'Leading environmentally sustainable organisations',
                  'Maintaining the pace of leading over time by modelling balance and avoiding burnout',
                  'Maximising short-term output at all costs',
                  'Leading until retirement without any development change',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Developing the next generation of leaders is a leadership responsibility because:',
                options: [
                  'It satisfies a HR requirement',
                  'Leadership continuity is a strategic risk if not managed',
                  'Junior leaders always need direct oversight',
                  "It reduces the current leader's workload immediately",
                ],
                correctIndex: 1,
              },
              {
                question: 'A leader focused only on short-term results risks:',
                options: [
                  'Being too popular with the team',
                  'Creating a culture where long-term capability and sustainability are sacrificed for quarterly outcomes',
                  'Receiving excessive recognition',
                  'Growing the organisation too quickly',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c5_a8',
            kind: 'assignment',
            status: 'Ready',
            title: 'Legacy Statement',
            forLesson: 'Legacy & Sustainability',
            dueDate: 'Jul 23',
            submission: 'Text response',
            instructions:
              'Write a 300-word personal legacy statement: what you want to be known for as a leader, what capability you want to leave behind, and one specific action you will take in the next 90 days toward that legacy.',
            requirements: [
              'Legacy defined beyond titles and results — focused on people and culture',
              'One specific capability you will build in others named',
              '90-day action is concrete, measurable, and starts within the week',
            ],
          },
        ],
      },
    ],
  },
];
