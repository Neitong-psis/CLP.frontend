import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 8: Data-Driven Decision Making ─────────────────────────────────────

export const C8_MODULES: ReviewModule[] = [
  {
    id: 'c8_m1',
    title: 'Module 1: Data Thinking',
    lessons: [
      {
        id: 'c8_l1',
        title: 'From Intuition to Evidence',
        documents: [
          {
            id: 'c8_d1',
            kind: 'document',
            title: 'From Intuition to Evidence',
            readTime: '4 – 5 min read',
            intro:
              'Data-driven decision making does not replace judgment — it disciplines it. Learn where intuition fails and where data helps most.',
            objectives: [
              'Identify the cognitive biases that undermine intuitive decisions',
              'Apply a decision-quality framework to distinguish good decisions from good outcomes',
            ],
            sections: [
              {
                heading: 'When Intuition Fails',
                text: 'Human intuition evolved for a world of small groups, immediate threats, and visible cause-and-effect. It systematically fails in environments with large samples, delayed feedback, and hidden variables — which describes most modern business decisions. Confirmation bias (seeking information that confirms existing beliefs), availability bias (overweighting recent and memorable events), and anchoring (being disproportionately influenced by the first number heard) are the three most costly cognitive errors in business decision-making.',
                tip: 'The question is not "should I trust data or my gut?" It is "which kinds of decisions does each handle better?"',
              },
              {
                heading: 'Decision Quality vs. Outcome Quality',
                text: 'A good decision can produce a bad outcome (bad luck). A bad decision can produce a good outcome (good luck). Confusing these is one of the most dangerous errors in management — it leads to reinforcing bad decision processes that happened to work and abandoning good ones that happened to fail. Decision quality is measured by the process: was the right information gathered, were the right options considered, was uncertainty acknowledged honestly?',
              },
            ],
            takeaways: [
              'Three most costly cognitive biases in decisions: confirmation bias, availability bias, and anchoring',
              'Evaluate the decision process, not just the outcome — good process with bad outcome is still a good decision',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c8_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Decision Thinking Quiz',
            forLesson: 'From Intuition to Evidence',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of cognitive biases in decision-making.',
            questions: [
              {
                question: 'Confirmation bias in decision-making means:',
                options: [
                  'Making decisions based on confirmed data only',
                  'Seeking information that confirms existing beliefs and discounting contradictory evidence',
                  'Confirming decisions with multiple stakeholders before acting',
                  'Only using data that has been peer-reviewed',
                ],
                correctIndex: 1,
              },
              {
                question: 'Anchoring bias occurs when:',
                options: [
                  'You rely too heavily on the first number or piece of information encountered',
                  'You anchor your decision to company strategy',
                  'You use historical averages as the baseline',
                  'You are anchored to a specific decision-making framework',
                ],
                correctIndex: 0,
              },
              {
                question: 'A good decision that produces a bad outcome means:',
                options: [
                  'The decision was actually bad — outcomes reveal process quality',
                  'The decision process was sound but the outcome was affected by factors outside the model',
                  'The data used was incorrect',
                  'The decision needs to be revisited immediately',
                ],
                correctIndex: 1,
              },
              {
                question: 'Decision quality is best measured by:',
                options: [
                  'The outcome — whether the decision led to profit or loss',
                  'The process — whether the right information was gathered and options considered',
                  'The speed of implementation',
                  'Whether stakeholders agreed with the decision',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Bias Audit',
            forLesson: 'From Intuition to Evidence',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Recall a decision you or an organisation made that turned out to be wrong. Analyse it for cognitive biases and redesign the decision process to reduce the identified biases.',
            requirements: [
              'Decision described with its outcome',
              'At least two cognitive biases identified with specific evidence of their influence',
              'Redesigned process: one change per bias that would reduce its influence',
            ],
          },
        ],
      },
      {
        id: 'c8_l2',
        title: 'Working with Data',
        documents: [],
        videos: [
          {
            id: 'c8_v1',
            kind: 'video',
            title: 'Working with Data',
            duration: '14 min',
            intro:
              'Good decisions require good data. Learn to assess data quality, read basic analyses, and avoid the most common analytical mistakes.',
            topics: [
              'Data quality dimensions: accuracy, completeness, timeliness, and consistency',
              'Descriptive vs. diagnostic vs. predictive analytics — which to use when',
              'Correlation vs. causation — the most dangerous confusion in data analysis',
              "Simpson's paradox and why aggregated data can lie",
            ],
            moments: [
              { time: '0:00', label: 'Data quality dimensions' },
              { time: '3:10', label: 'Types of analytics' },
              { time: '7:00', label: 'Correlation vs. causation' },
              { time: '10:30', label: "Simpson's paradox illustrated" },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c8_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Working with Data Quiz',
            forLesson: 'Working with Data',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of data quality and analytics types.',
            questions: [
              {
                question: 'Descriptive analytics answers the question:',
                options: [
                  '"Why did it happen?"',
                  '"What happened?"',
                  '"What will happen?"',
                  '"What should we do?"',
                ],
                correctIndex: 1,
              },
              {
                question: 'A correlation between two variables proves:',
                options: [
                  'That one variable causes the other to change',
                  'That the two variables tend to move together — causation is not established',
                  'That both variables are influenced by a third factor',
                  'That the relationship will continue in the future',
                ],
                correctIndex: 1,
              },
              {
                question: "Simpson's paradox occurs when:",
                options: [
                  'A trend appears in data subgroups but reverses when the groups are combined',
                  'Two datasets with the same mean have different distributions',
                  'A correlation disappears when controlling for a third variable',
                  'Data from two different time periods cannot be compared directly',
                ],
                correctIndex: 0,
              },
              {
                question: 'Data timeliness refers to:',
                options: [
                  'How quickly data is processed after collection',
                  'Whether the data accurately reflects current reality for the purpose it is being used for',
                  'The time required to run an analysis',
                  'How often data is updated in the database',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Correlation Analysis',
            forLesson: 'Working with Data',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Find a real example (from news, research, or business) where correlation was incorrectly presented as causation. Explain the correct interpretation and identify one possible confounding variable.',
            requirements: [
              'Real example cited with source',
              'Explain why the correlation does not establish causation',
              'One plausible confounding variable that could explain the relationship',
            ],
          },
        ],
      },
      {
        id: 'c8_l3',
        title: 'Building Data Culture',
        documents: [
          {
            id: 'c8_d2',
            kind: 'document',
            title: 'Building Data Culture',
            readTime: '4 – 5 min read',
            intro:
              'Tools alone do not create data-driven organisations. Culture does. Learn how leaders build environments where evidence wins over HiPPO.',
            objectives: [
              'Define data culture and the leadership behaviours that create it',
              'Identify the organisational barriers to data-driven decision making and how to remove them',
            ],
            sections: [
              {
                heading: 'HiPPO and Data Culture',
                text: 'HiPPO stands for Highest-Paid Person\'s Opinion. In organisations without data culture, decisions follow whoever is most senior, regardless of evidence. A data culture replaces this with norms where any team member can challenge a decision with data, where "I have a feeling" is treated differently from "the data suggests," and where leaders model curiosity by asking "what does the evidence say?" before expressing their own opinion.',
                tip: 'Leaders who announce their opinion first kill data culture. Ask the question first. Share your view after the data has been presented.',
              },
              {
                heading: 'Organisational Barriers',
                text: "Four common barriers to data culture: (1) Data silos — different departments own data that no one else can access. (2) Fear of being wrong — people suppress unfavourable data to avoid accountability. (3) Analysis paralysis — waiting for perfect data before deciding. (4) No feedback loops — decisions are made but their outcomes are never measured, so learning is impossible. The leader's job is to remove each of these through structural and behavioural change.",
              },
            ],
            takeaways: [
              "HiPPO culture (Highest-Paid Person's Opinion) is the enemy of data-driven decisions — leaders must ask first, then share their view",
              'Four barriers: data silos, fear of being wrong, analysis paralysis, and no feedback loops',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c8_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Data Culture Quiz',
            forLesson: 'Building Data Culture',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of data culture and organisational barriers.',
            questions: [
              {
                question: 'HiPPO in organisations refers to:',
                options: [
                  'A data visualisation tool',
                  "Decisions following the Highest-Paid Person's Opinion regardless of evidence",
                  'A high-performance data processing system',
                  'Hierarchical Permission Protocol for Organisational data',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A leader who asks for data BEFORE sharing their own opinion is:',
                options: [
                  'Showing indecisiveness',
                  'Protecting data culture by ensuring evidence is heard first',
                  'Failing to provide leadership',
                  'Slowing down decision-making unnecessarily',
                ],
                correctIndex: 1,
              },
              {
                question: 'Analysis paralysis refers to:',
                options: [
                  'A technical failure in analytics systems',
                  'Waiting for perfect data before making any decision, causing inaction',
                  'Running too many analyses simultaneously',
                  'Paralysing an organisation with too many dashboards',
                ],
                correctIndex: 1,
              },
              {
                question: 'Data silos harm decision-making by:',
                options: [
                  'Causing data to become outdated quickly',
                  'Preventing relevant information from reaching the people who need it',
                  'Requiring expensive data integration projects',
                  'Making data too accessible, increasing security risk',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Data Culture Assessment',
            forLesson: 'Building Data Culture',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Assess the data culture of an organisation you know (your workplace, university, or a case study). Rate it 1–5 on each of the four barriers and propose one action to address the most critical barrier.',
            requirements: [
              'Rating on all four barriers with specific evidence for each',
              'Most critical barrier identified and justified',
              'One concrete action that would reduce the barrier, with a way to measure its impact',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c8_m2',
    title: 'Module 2: Applied Data Decision Making',
    lessons: [
      {
        id: 'c8_l4',
        title: 'A/B Testing & Experimentation',
        documents: [],
        videos: [
          {
            id: 'c8_v2',
            kind: 'video',
            title: 'A/B Testing & Experimentation',
            duration: '13 min',
            intro:
              'A/B testing lets you replace opinions with evidence. Learn how to run experiments that produce trustworthy answers.',
            topics: [
              'What A/B testing is and when to use it',
              'Statistical significance: what it means and common misconceptions',
              'Sample size, run time, and why both matter',
              'Common A/B testing mistakes that invalidate results',
            ],
            moments: [
              { time: '0:00', label: 'What is A/B testing?' },
              { time: '2:40', label: 'Statistical significance explained' },
              { time: '6:30', label: 'Sample size and run time' },
              { time: '10:20', label: 'Common mistakes' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c8_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'A/B Testing Quiz',
            forLesson: 'A/B Testing & Experimentation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of A/B testing principles.',
            questions: [
              {
                question: 'Statistical significance (p < 0.05) means:',
                options: [
                  'There is a 95% chance the result is correct',
                  'If there were no real effect, results this extreme would occur less than 5% of the time by chance',
                  'The experiment is 95% complete',
                  'The business impact is significant enough to act on',
                ],
                correctIndex: 1,
              },
              {
                question: 'Why does sample size matter in A/B testing?',
                options: [
                  'Larger samples are always more expensive',
                  'Small samples cannot detect small effects reliably — they have insufficient statistical power',
                  'Regulators require minimum sample sizes for valid experiments',
                  'Larger samples run faster',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Stopping an A/B test early when you see a winning result is problematic because:',
                options: [
                  'It is unethical to end experiments early',
                  'Early results are typically more extreme than final results — false positives increase',
                  'The test needs a minimum runtime regardless of results',
                  'Statistical significance cannot be calculated for partial data',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In a valid A/B test, the only thing that should differ between groups A and B is:',
                options: [
                  'The sample size in each group',
                  'The one variable being tested',
                  'The time period of observation',
                  'The geographic region of users',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Experiment Design',
            forLesson: 'A/B Testing & Experimentation',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Design an A/B test for a real or hypothetical product decision (e.g. a different call-to-action button, email subject line, or pricing page). Specify the hypothesis, metric, and success criteria.',
            requirements: [
              'Hypothesis stated in the form: "Changing X will increase Y by Z%"',
              'Primary metric defined with how it is measured',
              'Success threshold and minimum runtime defined with reasoning',
            ],
          },
        ],
      },
      {
        id: 'c8_l5',
        title: 'Data Visualisation for Decisions',
        documents: [
          {
            id: 'c8_d3',
            kind: 'document',
            title: 'Data Visualisation for Decisions',
            readTime: '4 – 5 min read',
            intro:
              'The right chart can make a complex dataset instantly obvious. The wrong chart can hide the truth in plain sight.',
            objectives: [
              'Match the right chart type to the type of data comparison being made',
              'Apply the principle of "data-ink ratio" to create clear, honest visualisations',
            ],
            sections: [
              {
                heading: 'Choosing the Right Chart',
                text: 'Four main comparison types and the charts that serve them: (1) Distribution — histogram, box plot. (2) Composition — stacked bar, pie chart (use sparingly). (3) Relationship — scatter plot, bubble chart. (4) Comparison over time — line chart for trends, bar chart for discrete periods. The most common mistake is using a pie chart for more than 4–5 categories (slices become meaningless) and using bar charts for continuous time trends (use a line instead).',
                tip: "If you can't describe in one sentence what the chart is showing, the chart design needs to change, not the description.",
              },
              {
                heading: 'Data-Ink Ratio',
                text: 'Edward Tufte\'s principle: maximise the ratio of "data ink" (ink that represents actual data) to "non-data ink" (gridlines, borders, background colours, 3D effects, decorations). Remove every element that does not help the reader understand the data. 3D charts are the most egregious offenders — they distort proportions and add no information. The best chart is the simplest one that makes the pattern visible.',
              },
            ],
            takeaways: [
              'Match chart type to comparison type: distribution, composition, relationship, or time comparison',
              'Maximise data-ink ratio: remove everything that does not help the reader understand the data',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c8_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Data Visualisation Quiz',
            forLesson: 'Data Visualisation for Decisions',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your ability to select and evaluate data visualisations.',
            questions: [
              {
                question:
                  'For showing a trend over time with continuous data, the best chart is:',
                options: [
                  'A pie chart',
                  'A bar chart',
                  'A line chart',
                  'A scatter plot',
                ],
                correctIndex: 2,
              },
              {
                question: 'The data-ink ratio principle states:',
                options: [
                  'Use as much ink as possible to make charts visually impressive',
                  'Maximise the proportion of ink that represents actual data, and minimise decoration',
                  'Charts should use black ink only for maximum clarity',
                  'Data density should always be maximised',
                ],
                correctIndex: 1,
              },
              {
                question: '3D charts are generally harmful because:',
                options: [
                  'They are harder to create than 2D charts',
                  'They distort proportions and add no additional information',
                  'They are not supported by most chart software',
                  'They require more colour than 2D alternatives',
                ],
                correctIndex: 1,
              },
              {
                question: 'A pie chart is inappropriate when:',
                options: [
                  'Showing composition as a percentage of a whole',
                  'There are more than 4–5 categories to display',
                  'The data is from a single time period',
                  'All slices are of similar size',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Chart Critique',
            forLesson: 'Data Visualisation for Decisions',
            dueDate: 'Jul 17',
            submission: 'File or link upload',
            instructions:
              'Find two charts in real publications (news, business reports, academic papers). Critique each: identify the chart type, whether it matches the data, and one improvement. Redraw or describe the improved version.',
            requirements: [
              'Two charts found with sources cited',
              'Chart type identified and evaluated against the data it shows',
              'One specific improvement per chart with reasoning from the lesson',
            ],
          },
        ],
      },
      {
        id: 'c8_l6',
        title: 'Building a Decision Dashboard',
        documents: [],
        videos: [
          {
            id: 'c8_v3',
            kind: 'video',
            title: 'Building a Decision Dashboard',
            duration: '12 min',
            intro:
              'A well-designed dashboard accelerates decision-making by putting the right metrics in front of the right people at the right time.',
            topics: [
              'The difference between a reporting dashboard and a decision dashboard',
              'Hierarchy of metrics: strategic, operational, and diagnostic',
              'Leading vs. lagging indicators and why you need both',
              'Common dashboard design failures and how to avoid them',
            ],
            moments: [
              { time: '0:00', label: 'Reporting vs. decision dashboards' },
              { time: '2:50', label: 'Metric hierarchy design' },
              { time: '6:30', label: 'Leading vs. lagging indicators' },
              { time: '9:40', label: 'Common failures' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c8_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Decision Dashboard Quiz',
            forLesson: 'Building a Decision Dashboard',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of dashboard design principles.',
            questions: [
              {
                question:
                  'A decision dashboard differs from a reporting dashboard by:',
                options: [
                  'Using more interactive features',
                  'Surfacing the specific metrics that trigger action, not just recording what happened',
                  'Including real-time data',
                  'Being available to all employees rather than just executives',
                ],
                correctIndex: 1,
              },
              {
                question: 'A leading indicator is:',
                options: [
                  'The most important metric on the dashboard',
                  'A metric that predicts future outcomes before they occur',
                  'Revenue or profit — the ultimate business outcomes',
                  'A metric that is always positive',
                ],
                correctIndex: 1,
              },
              {
                question: 'Why do dashboards with 30+ metrics typically fail?',
                options: [
                  'They are technically difficult to maintain',
                  'The signal is lost in noise — users cannot identify what requires action',
                  'They load too slowly for real-time use',
                  'Stakeholders disagree on which metrics to include',
                ],
                correctIndex: 1,
              },
              {
                question: 'A lagging indicator measures:',
                options: [
                  'Outcomes that have already occurred — results of past decisions',
                  'Metrics that are always reported late',
                  'Data that lags behind real-world events due to collection delays',
                  'Financial metrics that are slow to change',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c8_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Dashboard Blueprint',
            forLesson: 'Building a Decision Dashboard',
            dueDate: 'Jul 19',
            submission: 'File or link upload',
            instructions:
              'Design a decision dashboard for a real or hypothetical business function (sales, operations, customer service, etc.). Include one strategic metric, two operational metrics, and two leading indicators.',
            requirements: [
              'Five metrics total with definitions and how each is measured',
              'Each metric labelled as strategic, operational, leading, or lagging',
              'Explain what action each metric should trigger when it goes below threshold',
            ],
          },
        ],
      },
    ],
  },
];
