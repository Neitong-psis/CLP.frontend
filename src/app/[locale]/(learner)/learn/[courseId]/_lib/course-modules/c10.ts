import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 10: Community Impact & Social Change ───────────────────────────────

export const C10_MODULES: ReviewModule[] = [
  {
    id: 'c10_m1',
    title: 'Module 1: Social Change Foundations',
    lessons: [
      {
        id: 'c10_l1',
        title: 'Theories of Change',
        documents: [
          {
            id: 'c10_d1',
            kind: 'document',
            title: 'Theories of Change',
            readTime: '4 – 5 min read',
            intro:
              'Every effective social initiative has an explicit theory of change — a logic map from activities to outcomes. Without it, you are hoping, not planning.',
            objectives: [
              'Construct a theory of change for a social initiative',
              'Distinguish between outputs, outcomes, and impact in the social sector',
            ],
            sections: [
              {
                heading: 'What is a Theory of Change?',
                text: 'A theory of change is the explicit logic: "If we do X with Y resources, we will achieve Z outcome, because of these assumptions." It maps the pathway from activities (what you do) → outputs (what you produce) → outcomes (changes in knowledge, skills, behaviour) → impact (long-term changes in social conditions). Most failed social programmes fail because they measure outputs (meals served, workshops held) while hoping for impact (reduced poverty, better health), without testing the assumptions in between.',
                tip: 'State your assumptions explicitly — they are the most valuable part of a theory of change because they show you what to test.',
              },
              {
                heading: 'Outputs vs. Outcomes vs. Impact',
                text: 'A literacy programme\'s output is "200 adults completed a 12-week reading course." Its outcome is "participants can read at a Grade 5 level." Its impact is "participants access better employment and pass this advantage to their children." Impact typically takes years to measure; outcomes take months; outputs are immediate. Funders often measure outputs; communities experience impact. Good evaluation measures all three.',
              },
            ],
            takeaways: [
              'A theory of change maps assumptions explicitly — making them visible makes them testable',
              'Outputs are what you produce; outcomes are immediate changes; impact is long-term social change',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c10_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Theories of Change Quiz',
            forLesson: 'Theories of Change',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of theories of change and programme logic.',
            questions: [
              {
                question: 'A theory of change is most valuable because:',
                options: [
                  'It satisfies funder reporting requirements',
                  'It makes assumptions explicit, making them visible and testable',
                  'It guarantees that activities will produce the desired impact',
                  'It simplifies complex social problems into manageable steps',
                ],
                correctIndex: 1,
              },
              {
                question: 'In a theory of change, "outcomes" refers to:',
                options: [
                  'The ultimate long-term social change achieved',
                  'Immediate changes in knowledge, skills, or behaviour resulting from the programme',
                  'The activities carried out by the programme',
                  'The quantitative products delivered (workshops, meals, etc.)',
                ],
                correctIndex: 1,
              },
              {
                question: 'Most failed social programmes fail because:',
                options: [
                  'They receive insufficient funding',
                  'They measure outputs while hoping for impact without testing the assumptions between',
                  'Their theory of change is too complex',
                  'They target the wrong population',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Impact in social change initiatives is best described as:',
                options: [
                  'The immediate results visible after the programme ends',
                  'Long-term changes in social conditions that take years to materialise',
                  'The total number of people reached',
                  'Whether funders continue to provide support',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Theory of Change Map',
            forLesson: 'Theories of Change',
            dueDate: 'Jul 8',
            submission: 'File or link upload',
            instructions:
              'Create a theory of change for a real or hypothetical social initiative. Show the pathway from activities to outputs to outcomes to impact, with key assumptions listed at each step.',
            requirements: [
              'All four levels (activities, outputs, outcomes, impact) clearly shown',
              'At least two assumptions stated per level',
              'One assumption identified as the most critical — and a way to test it described',
            ],
          },
        ],
      },
      {
        id: 'c10_l2',
        title: 'Community Engagement',
        documents: [],
        videos: [
          {
            id: 'c10_v1',
            kind: 'video',
            title: 'Community Engagement',
            duration: '13 min',
            intro:
              'The most effective social initiatives are designed with communities, not for them. Learn the principles and practices of genuine community engagement.',
            topics: [
              'The participation ladder: from manipulation to citizen control',
              'Asset-Based Community Development (ABCD) vs. needs-based approaches',
              'Engaging hard-to-reach and marginalised community members',
              'How to conduct a meaningful community consultation',
            ],
            moments: [
              { time: '0:00', label: 'Doing "with" not "for" communities' },
              { time: '3:00', label: 'The participation ladder' },
              { time: '6:30', label: 'Asset-based vs. needs-based approaches' },
              { time: '10:20', label: 'Engaging marginalised voices' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c10_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Community Engagement Quiz',
            forLesson: 'Community Engagement',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of community engagement principles.',
            questions: [
              {
                question:
                  'The highest level of the participation ladder represents:',
                options: [
                  'Expert-led consultation with community feedback',
                  'Community members controlling the design and decision-making',
                  'Tokenistic participation that satisfies funder requirements',
                  'Government-led community planning processes',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Asset-Based Community Development (ABCD) differs from needs-based approaches by:',
                options: [
                  'Starting with what the community already has and can do, rather than what it lacks',
                  'Using more sophisticated assessment tools',
                  'Focusing on economic development rather than social issues',
                  'Requiring external funding before any action is taken',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'To engage hard-to-reach community members, the most effective approach is:',
                options: [
                  'Increasing the frequency of standard consultation events',
                  'Going to where they already are, in forms that fit their lives',
                  'Requiring attendance through formal community structures',
                  'Offering financial incentives for participation',
                ],
                correctIndex: 1,
              },
              {
                question: 'Tokenistic community engagement means:',
                options: [
                  'Using local language in consultation materials',
                  'Participation that appears meaningful but does not influence real decisions',
                  'Involving community members in programme evaluation',
                  'Paying community members for their time and expertise',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Community Consultation Plan',
            forLesson: 'Community Engagement',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Design a community consultation process for a social initiative of your choice. Show how you would apply at least two principles from this lesson to move beyond tokenistic participation.',
            requirements: [
              'Initiative and target community described',
              'Two principles applied with specific consultation activities designed around them',
              'One group likely to be hard-to-reach identified with a specific strategy to include them',
            ],
          },
        ],
      },
      {
        id: 'c10_l3',
        title: 'Social Enterprise Models',
        documents: [
          {
            id: 'c10_d2',
            kind: 'document',
            title: 'Social Enterprise Models',
            readTime: '4 – 5 min read',
            intro:
              'Social enterprises create social impact through business models — they are self-sustaining because they generate revenue, not just grants.',
            objectives: [
              'Distinguish between the major social enterprise models and their trade-offs',
              'Apply a viability test to a social enterprise concept',
            ],
            sections: [
              {
                heading: 'Social Enterprise Models',
                text: 'The spectrum runs from pure charity (100% grants) to profit-for-purpose (revenue cross-subsidises social mission) to social business (all revenue, mission embedded in operations) to corporate social responsibility (profit-first with social add-on). Key models include: (1) BOPA (Buy One, Pay for Another) — customer purchases fund social recipients. (2) Employment integration — social mission is providing jobs to disadvantaged groups. (3) Cross-subsidy — market-rate clients subsidise below-cost social clients (Aravind Eye Hospital). (4) Licensing — IP licensed to governments or NGOs.',
                tip: 'Test viability before mission. A social enterprise that runs out of money helps no one.',
              },
              {
                heading: 'The Viability Test',
                text: 'Three conditions for a sustainable social enterprise: (1) The social mission is embedded in the business model, not bolted on. (2) Revenue exceeds costs at a scale that can be reached. (3) The social outcome gets better — not just maintained — as the business grows. If growth dilutes the social mission, the model is not social enterprise — it is commercial enterprise with a social story.',
              },
            ],
            takeaways: [
              'Social enterprise viability requires: mission embedded in model, revenue exceeding costs at reachable scale, and social outcome improving with growth',
              'Test viability before mission — a social enterprise that runs out of money helps no one',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c10_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Social Enterprise Quiz',
            forLesson: 'Social Enterprise Models',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of social enterprise models.',
            questions: [
              {
                question: 'A cross-subsidy social enterprise model works by:',
                options: [
                  'Subsidising its own operations through government grants',
                  'Charging market-rate clients at a premium to subsidise below-cost social clients',
                  'Cross-selling commercial products to fund a separate social programme',
                  'Sharing revenue equally between commercial and social activities',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The viability test for a social enterprise requires that:',
                options: [
                  'The enterprise receives no government funding',
                  'Social outcomes improve — not just continue — as the business grows',
                  'The enterprise becomes publicly listed within 10 years',
                  'Commercial revenue accounts for 100% of income',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A social enterprise where the social mission is "bolted on" (not embedded) risks:',
                options: [
                  'Regulatory scrutiny of its not-for-profit status',
                  'The social mission being cut when commercial pressure increases',
                  'Attracting investors who do not value social impact',
                  'Growing too fast for the social mission to keep pace',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Employment integration as a social enterprise model means:',
                options: [
                  'Hiring standard employees at below-market wages',
                  'The social mission IS the provision of employment to disadvantaged groups',
                  'Employees volunteer rather than receive pay',
                  'The workforce is employed by the government but deployed to the enterprise',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Social Enterprise Concept',
            forLesson: 'Social Enterprise Models',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design a social enterprise concept addressing a community need of your choice. Apply the viability test and identify the model type.',
            requirements: [
              'Social need and target community named',
              'Revenue model described with how it generates income',
              'Viability test applied: mission embeddedness, cost-revenue at scale, social outcome with growth',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c10_m2',
    title: 'Module 2: Impact Measurement & Scaling',
    lessons: [
      {
        id: 'c10_l4',
        title: 'Measuring Social Impact',
        documents: [],
        videos: [
          {
            id: 'c10_v2',
            kind: 'video',
            title: 'Measuring Social Impact',
            duration: '13 min',
            intro:
              'What gets measured gets managed — but in social change, measuring the wrong thing can actively harm the communities you are trying to help.',
            topics: [
              'Social Return on Investment (SROI) — methodology and limits',
              'Randomised Control Trials (RCTs) in social programmes — when they work',
              'Qualitative evidence: stories, case studies, and their role in impact evaluation',
              'The balance between rigorous evaluation and programme cost',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Why measurement is hard in social change',
              },
              { time: '2:50', label: 'SROI methodology' },
              { time: '6:30', label: 'RCTs in social programmes' },
              { time: '10:20', label: 'Qualitative evidence' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c10_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Social Impact Measurement Quiz',
            forLesson: 'Measuring Social Impact',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of social impact measurement methods.',
            questions: [
              {
                question: 'Social Return on Investment (SROI) measures:',
                options: [
                  'The financial profit of a social enterprise',
                  'The value of social outcomes relative to the investment required to achieve them',
                  'The number of people directly reached by a programme',
                  'The reputational return for corporate funders',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A Randomised Control Trial (RCT) in social programmes is valuable because:',
                options: [
                  'It is the cheapest evaluation method',
                  'It is the gold standard for establishing causation — controlling for confounding variables',
                  'It captures the experience of individual beneficiaries',
                  'It satisfies all funder reporting requirements',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The main limitation of RCTs in social programmes is:',
                options: [
                  'They are not accepted by international funders',
                  'They are expensive, time-consuming, and sometimes ethically problematic (control group denial of service)',
                  'They only measure financial outcomes',
                  'They require government approval in most countries',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Qualitative evidence (stories, case studies) is valuable in impact evaluation because:',
                options: [
                  'It is easier to collect than quantitative data',
                  'It captures nuance, context, and unintended consequences that numbers miss',
                  'Funders always prefer stories to numbers',
                  'It is more rigorous than quantitative methods',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Measurement Framework',
            forLesson: 'Measuring Social Impact',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Design a measurement framework for the social enterprise from Lesson 3. Choose two quantitative indicators and one qualitative approach. Justify each choice.',
            requirements: [
              'Two quantitative indicators defined with how they are measured and by whom',
              'One qualitative approach described (interview, case study, etc.) with the question it answers',
              'Explain how you would balance rigour with evaluation cost',
            ],
          },
        ],
      },
      {
        id: 'c10_l5',
        title: 'Advocacy & Policy Change',
        documents: [
          {
            id: 'c10_d3',
            kind: 'document',
            title: 'Advocacy & Policy Change',
            readTime: '4 – 5 min read',
            intro:
              'Programme-level change helps individuals. Policy-level change helps populations. Effective community leaders work at both levels.',
            objectives: [
              'Distinguish between service delivery, advocacy, and systems change',
              'Apply a policy change strategy using the policy window framework',
            ],
            sections: [
              {
                heading: 'Three Levels of Change',
                text: 'Service delivery meets immediate need — food bank, housing support, health clinic. Advocacy changes the conditions that create need — lobbying for affordable housing policy, minimum wage increases, equitable school funding. Systems change challenges the underlying power structures and norms — the hardest and most durable form of change. Effective social change organisations typically work at all three levels simultaneously, using service delivery evidence to inform advocacy, and using advocacy wins to shift systems.',
                tip: 'Document what you see on the ground. That evidence is your most powerful advocacy tool at the policy level.',
              },
              {
                heading: "Kingdon's Policy Window",
                text: "John Kingdon's model identifies three streams that must converge for policy change: the Problem stream (the issue is on the agenda), the Policy stream (a workable solution is available), and the Politics stream (the political will exists). A policy window opens when all three converge — often triggered by a crisis, election, or champion entering government. Effective advocates prepare solutions in advance and wait for the window. When it opens, slow-moving campaigns are irrelevant.",
              },
            ],
            takeaways: [
              'Ground-level evidence from service delivery is the most powerful advocacy tool',
              "Kingdon's policy window: when problem, policy, and politics converge, change happens fast — prepare in advance",
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c10_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Advocacy & Policy Quiz',
            forLesson: 'Advocacy & Policy Change',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of advocacy and policy change strategies.',
            questions: [
              {
                question: 'Systems change differs from service delivery by:',
                options: [
                  'Operating at a larger geographic scale',
                  'Challenging the underlying power structures and norms that create need',
                  'Requiring government partnership',
                  'Focusing on economic outcomes rather than social ones',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "In Kingdon's policy window model, change happens when:",
                options: [
                  'Enough funding has been raised for a lobbying campaign',
                  'Problem, Policy, and Politics streams converge simultaneously',
                  'A crisis makes the public aware of an issue',
                  'The political party sympathetic to the cause wins an election',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Ground-level evidence from service delivery is valuable for advocacy because:',
                options: [
                  'It satisfies government evidence requirements',
                  'It documents real cases that make abstract policy arguments concrete and credible',
                  'It is free to collect',
                  'Government funders require it for ongoing programme support',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Effective advocates prepare policy solutions in advance because:',
                options: [
                  'Policy windows open slowly, giving time to respond',
                  'When a policy window opens, it may close quickly — only pre-prepared solutions can move fast enough',
                  'Governments require 12-month notice for policy input',
                  'Preparation signals credibility to political champions',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Advocacy Strategy',
            forLesson: 'Advocacy & Policy Change',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              "Choose a social issue you care about. Apply Kingdon's three-stream model to map the current state and identify what conditions would open a policy window.",
            requirements: [
              'Current state of each stream (problem, policy, politics) assessed',
              'One intervention point identified to advance the weakest stream',
              'One piece of ground-level evidence that would strengthen the problem stream',
            ],
          },
        ],
      },
      {
        id: 'c10_l6',
        title: 'Scaling Social Impact',
        documents: [],
        videos: [
          {
            id: 'c10_v3',
            kind: 'video',
            title: 'Scaling Social Impact',
            duration: '12 min',
            intro:
              'Scaling is not just growing bigger — it is increasing impact per dollar, per year. Learn the pathways to scale social change.',
            topics: [
              'Five pathways to scale: dissemination, affiliation, licensing, government adoption, and open source',
              'When to scale and when to deepen — the premature scaling trap',
              'Maintaining mission fidelity through growth',
              'The role of partnerships in scaling social impact',
            ],
            moments: [
              { time: '0:00', label: 'What scaling social impact means' },
              { time: '3:00', label: 'Five scaling pathways' },
              { time: '6:40', label: 'Premature scaling trap' },
              { time: '10:00', label: 'Mission fidelity through growth' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c10_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Scaling Social Impact Quiz',
            forLesson: 'Scaling Social Impact',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of social impact scaling strategies.',
            questions: [
              {
                question: 'Scaling social impact means:',
                options: [
                  "Growing the organisation's headcount and budget",
                  'Increasing the number of offices and locations',
                  'Increasing the social impact achieved per dollar or per year',
                  'Attracting more media attention to the cause',
                ],
                correctIndex: 2,
              },
              {
                question: 'Government adoption as a scaling pathway works by:',
                options: [
                  "The government funding the organisation's expansion directly",
                  'Government incorporating the programme into official policy and delivery',
                  'Lobbying government to mandate the programme nationwide',
                  'Partnering with government ministries for data sharing',
                ],
                correctIndex: 1,
              },
              {
                question: 'Premature scaling means:',
                options: [
                  'Growing too slowly and losing momentum',
                  'Scaling before the model is proven — before outcomes are consistently achieved',
                  'Expanding into too many geographic areas at once',
                  'Hiring too many staff before funding is confirmed',
                ],
                correctIndex: 1,
              },
              {
                question: 'The open-source scaling pathway involves:',
                options: [
                  'Publishing your programme design freely for others to adapt and use',
                  'Open recruitment of volunteers from the general public',
                  'Making your data publicly available',
                  'Removing intellectual property protection from your social technology',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c10_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Scaling Strategy',
            forLesson: 'Scaling Social Impact',
            dueDate: 'Jul 19',
            submission: 'Text response',
            instructions:
              'For the social enterprise from Lesson 3, choose the most appropriate scaling pathway and justify your choice. Identify the most important condition that must be true before scaling begins.',
            requirements: [
              'Scaling pathway chosen with at least two reasons it fits this specific model',
              'Alternative pathway considered and rejected with reasoning',
              'Prerequisite condition for scaling named with how you would assess readiness',
            ],
          },
        ],
      },
    ],
  },
];
