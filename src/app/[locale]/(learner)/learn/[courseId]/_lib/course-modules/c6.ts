import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 6: Digital Innovation & Entrepreneurship ──────────────────────────

export const C6_MODULES: ReviewModule[] = [
  {
    id: 'c6_m1',
    title: 'Module 1: Foundations of Digital Innovation',
    lessons: [
      {
        id: 'c6_l1',
        title: 'The Innovation Mindset',
        documents: [
          {
            id: 'c6_d1',
            kind: 'document',
            title: 'The Innovation Mindset',
            readTime: '4 – 5 min read',
            intro:
              'Innovation is not a talent — it is a practice. Learn the habits and mindsets that make organisations consistently innovative.',
            objectives: [
              'Define innovation and distinguish it from invention',
              'Apply a growth mindset to overcome fear of failure in creative work',
            ],
            sections: [
              {
                heading: 'Innovation vs. Invention',
                text: 'Invention creates something new. Innovation creates value from something new (or old). Most transformative innovations — the iPhone, Airbnb, Uber — recombined existing technologies in new ways for underserved needs. The innovation mindset asks: what problem are people struggling with, and what already exists that could solve it differently?',
                tip: 'Look for friction. Wherever customers tolerate inconvenience, there is an innovation opportunity.',
              },
              {
                heading: 'Embracing Failure as Data',
                text: 'Fear of failure is the primary inhibitor of innovation in organisations. The antidote is not recklessness — it is systematic learning from small, fast experiments. Amazon\'s Jeff Bezos calls this "failing forward": each failed experiment teaches something that improves the next. The goal is not zero failures; it is high-quality learning per dollar spent on experiments.',
              },
            ],
            takeaways: [
              'Innovation creates value by recombining existing elements for underserved needs',
              'Systematic learning from small experiments converts failure from threat into data',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c6_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Innovation Mindset Quiz',
            forLesson: 'The Innovation Mindset',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of the innovation mindset.',
            questions: [
              {
                question: 'Innovation is best defined as:',
                options: [
                  'Creating something that has never existed before',
                  'Creating value from new or recombined ideas to solve real problems',
                  'Patenting original inventions',
                  'Disrupting an existing market',
                ],
                correctIndex: 1,
              },
              {
                question: 'Most transformative innovations succeed by:',
                options: [
                  'Inventing entirely new technologies',
                  'Recombining existing technologies for underserved needs',
                  'Having the largest R&D budget',
                  'Launching in the biggest possible market first',
                ],
                correctIndex: 1,
              },
              {
                question: '"Failing forward" means:',
                options: [
                  'Accepting failure as inevitable and moving on',
                  'Extracting systematic learning from each experiment to improve the next',
                  'Publishing failure stories publicly',
                  'Failing at low cost before succeeding at high cost',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The primary inhibitor of innovation in organisations is:',
                options: [
                  'Lack of budget',
                  'Too many ideas without focus',
                  'Fear of failure',
                  'Insufficient technology',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Friction Mapping',
            forLesson: 'The Innovation Mindset',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Identify three "friction points" — situations where customers or users tolerate inconvenience — in any industry. For each, describe one innovation that could remove the friction.',
            requirements: [
              'Three friction points identified with the user/customer named',
              'One potential innovation per friction point described at a concept level',
              'Explain whether your innovation is an invention or a recombination of existing elements',
            ],
          },
        ],
      },
      {
        id: 'c6_l2',
        title: 'Digital Business Models',
        documents: [],
        videos: [
          {
            id: 'c6_v1',
            kind: 'video',
            title: 'Digital Business Models',
            duration: '13 min',
            intro:
              'Digital technology has created entirely new ways for businesses to create, deliver, and capture value. Learn the dominant models.',
            topics: [
              'Platform vs. pipeline business models — and why platforms win at scale',
              'The freemium model: converting free users to paying customers',
              'Subscription economics: why recurring revenue changes everything',
              'Marketplace models: two-sided networks and liquidity',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Why digital business models differ fundamentally',
              },
              { time: '3:20', label: 'Platform vs. pipeline' },
              { time: '7:00', label: 'Freemium and subscription economics' },
              { time: '10:30', label: 'Marketplace dynamics' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c6_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Digital Business Models Quiz',
            forLesson: 'Digital Business Models',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of digital business model types.',
            questions: [
              {
                question: 'A platform business model creates value by:',
                options: [
                  'Building and selling a product directly',
                  'Facilitating interactions between two or more user groups',
                  'Offering a subscription to a software service',
                  'Providing a freemium tier to attract users',
                ],
                correctIndex: 1,
              },
              {
                question: 'The freemium model works when:',
                options: [
                  'All users eventually pay',
                  'A small percentage of free users convert to paid, subsidised by the majority',
                  'The free tier has significant limitations',
                  'The product is too expensive for most users',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Subscription revenue is attractive to businesses primarily because:',
                options: [
                  'It generates more revenue than one-time purchases',
                  'It is predictable and creates ongoing customer relationships',
                  'Subscribers are easier to acquire than one-time buyers',
                  'It eliminates customer service costs',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The "liquidity problem" in marketplace models refers to:',
                options: [
                  'Running out of investment capital',
                  'Difficulty attracting both supply and demand sides simultaneously',
                  'Inability to process payments at scale',
                  'High churn from existing marketplace participants',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Business Model Canvas',
            forLesson: 'Digital Business Models',
            dueDate: 'Jul 10',
            submission: 'File or link upload',
            instructions:
              'Choose a real digital company (e.g. Spotify, Airbnb, Grab). Identify its business model type and map its value proposition, customer segments, and revenue streams.',
            requirements: [
              'Business model type identified and justified',
              "Value proposition stated in one sentence from the customer's perspective",
              'At least two revenue streams described with how each works',
            ],
          },
        ],
      },
      {
        id: 'c6_l3',
        title: 'Lean Startup Methodology',
        documents: [
          {
            id: 'c6_d2',
            kind: 'document',
            title: 'Lean Startup Methodology',
            readTime: '4 – 5 min read',
            intro:
              'The Lean Startup method replaces "build it and they will come" with "test before you build." It is the dominant framework for digital product development.',
            objectives: [
              'Apply the Build-Measure-Learn loop to a product idea',
              'Define a Minimum Viable Product (MVP) for a specific customer hypothesis',
            ],
            sections: [
              {
                heading: 'Build-Measure-Learn',
                text: 'The core loop: (1) Build the smallest thing that tests your riskiest assumption. (2) Measure what actually happens when real users encounter it. (3) Learn — either validate your hypothesis and persevere, or invalidate it and pivot. The loop should run as fast as possible; speed of learning is the primary competitive advantage in the early stages of a startup.',
                tip: 'The riskiest assumption is the one whose failure would kill the business. Test that first.',
              },
              {
                heading: 'Minimum Viable Product',
                text: "An MVP is not a bad version of the product. It is the smallest experiment that tests whether customers value the core proposition. Dropbox's MVP was a demo video — no product existed. Zappos' MVP was a website with shoe photos; the founder bought shoes at retail and shipped them manually when orders came in. Neither built technology until they had validated demand.",
              },
            ],
            takeaways: [
              'The Build-Measure-Learn loop prioritises speed of validated learning above all else',
              'An MVP tests demand before committing resources to build the full solution',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c6_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Lean Startup Quiz',
            forLesson: 'Lean Startup Methodology',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of the Lean Startup methodology.',
            questions: [
              {
                question: 'The correct order of the Lean Startup loop is:',
                options: [
                  'Learn → Build → Measure',
                  'Build → Measure → Learn',
                  'Measure → Learn → Build',
                  'Test → Build → Launch',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A Minimum Viable Product (MVP) is primarily used to:',
                options: [
                  'Launch the product with minimum features',
                  'Test the riskiest assumption with minimum resources',
                  'Satisfy early adopters while the full product is built',
                  'Demonstrate traction to investors',
                ],
                correctIndex: 1,
              },
              {
                question: 'The "riskiest assumption" to test first is:',
                options: [
                  'Whether the technology can be built',
                  'The assumption whose failure would kill the business',
                  'Whether investors will fund the company',
                  'Whether the team can execute the plan',
                ],
                correctIndex: 1,
              },
              {
                question: "Dropbox's video MVP proved:",
                options: [
                  'The technology was technically feasible',
                  'Demand existed before a real product was built',
                  'The pricing model was correct',
                  'Investors would back the company',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'MVP Design',
            forLesson: 'Lean Startup Methodology',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design an MVP for a business idea of your choice. Identify the riskiest assumption and describe the smallest experiment that would test it.',
            requirements: [
              'Business idea stated in one sentence with the target customer named',
              'Riskiest assumption identified and justified',
              'MVP described: what it is, what you measure, and what would constitute validation vs. invalidation',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c6_m2',
    title: 'Module 2: Growing a Digital Venture',
    lessons: [
      {
        id: 'c6_l4',
        title: 'Product-Market Fit',
        documents: [],
        videos: [
          {
            id: 'c6_v2',
            kind: 'video',
            title: 'Product-Market Fit',
            duration: '12 min',
            intro:
              'Product-market fit is the moment when a product resonates strongly with a specific market. Everything before it is a search; everything after it is execution.',
            topics: [
              'How to know when you have product-market fit',
              'Sean Ellis\'s 40% rule and the "very disappointed" test',
              'Retention curves as the definitive PMF signal',
              'What to do before and after finding PMF',
            ],
            moments: [
              { time: '0:00', label: 'What product-market fit actually means' },
              { time: '2:40', label: 'The 40% rule test' },
              { time: '6:00', label: 'Reading retention curves' },
              { time: '9:30', label: 'Pre-PMF vs. post-PMF priorities' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c6_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Product-Market Fit Quiz',
            forLesson: 'Product-Market Fit',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of product-market fit signals.',
            questions: [
              {
                question:
                  "Sean Ellis's 40% rule states that PMF is indicated when:",
                options: [
                  '40% of users pay for the product',
                  '40% or more of users would be "very disappointed" if the product disappeared',
                  '40% of revenue comes from organic referrals',
                  '40% month-over-month growth is sustained',
                ],
                correctIndex: 1,
              },
              {
                question: 'A flat retention curve indicates:',
                options: [
                  'Strong product-market fit — users are staying',
                  'Users are churning to zero — no product-market fit',
                  'Growth is accelerating',
                  'The product needs a pricing change',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Before finding product-market fit, founders should prioritise:',
                options: [
                  'Scaling and marketing',
                  'Hiring a large team',
                  'Validating who the product is for and why they need it',
                  'Raising as much capital as possible',
                ],
                correctIndex: 2,
              },
              {
                question: 'Product-market fit is best described as:',
                options: [
                  'A specific revenue milestone',
                  'The moment a product resonates strongly with a specific market segment',
                  'When a product is profitable',
                  'When user growth exceeds team growth',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'PMF Assessment',
            forLesson: 'Product-Market Fit',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Choose a product you use regularly. Assess whether it has product-market fit using the "very disappointed" test and retention reasoning. Justify your answer.',
            requirements: [
              'Product named with its target user segment specified',
              'Apply the "very disappointed" test with your estimate of the percentage and reasoning',
              'Describe one retention signal that supports your PMF assessment',
            ],
          },
        ],
      },
      {
        id: 'c6_l5',
        title: 'Growth Strategies',
        documents: [
          {
            id: 'c6_d3',
            kind: 'document',
            title: 'Growth Strategies',
            readTime: '4 – 5 min read',
            intro:
              'Growth is not magic — it is a system. Learn the three sustainable growth engines and how to build the right one for your business.',
            objectives: [
              'Identify which of the three growth engines fits a specific business model',
              'Apply North Star Metric thinking to focus a team on the metric that drives long-term growth',
            ],
            sections: [
              {
                heading: 'Three Growth Engines',
                text: 'Viral growth: each user brings in more than one new user (K-factor > 1). This is the rarest and most powerful engine — WhatsApp, Instagram. Sticky growth: users return and expand usage over time — SaaS products with high switching costs. Paid growth: you acquire users via paid channels and the lifetime value (LTV) exceeds the acquisition cost (CAC). Most sustainable businesses combine sticky retention with one acquisition engine.',
                tip: 'Before investing in paid acquisition, make sure retention is working. Paying to fill a leaky bucket is the most expensive mistake in growth.',
              },
              {
                heading: 'North Star Metric',
                text: "A North Star Metric is the single number that best captures the core value your product delivers to customers. Airbnb's is nights booked. Spotify's is time spent listening. Facebook's was daily active users. The NSM aligns all teams — product, engineering, marketing — around the same goal. Every sub-metric and project should be justified by its impact on the NSM.",
              },
            ],
            takeaways: [
              'Three growth engines: viral (K>1), sticky (high retention), paid (LTV > CAC)',
              'A North Star Metric aligns all teams around the one number that reflects core customer value',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c6_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Growth Strategies Quiz',
            forLesson: 'Growth Strategies',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of digital growth strategies.',
            questions: [
              {
                question: 'Viral growth (K-factor > 1) means:',
                options: [
                  'The product grows faster than competitors',
                  'Each user brings in more than one new user on average',
                  'Growth comes primarily from social media',
                  'The product has positive word-of-mouth',
                ],
                correctIndex: 1,
              },
              {
                question: 'Paid growth is sustainable when:',
                options: [
                  'The company has enough marketing budget',
                  'Customer lifetime value (LTV) exceeds acquisition cost (CAC)',
                  'The product is in a high-growth market',
                  'The paid channel has low competition',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Investing heavily in paid acquisition before fixing retention is dangerous because:',
                options: [
                  'Paid channels become more expensive over time',
                  'You are filling a leaky bucket — acquired users churn before generating value',
                  'Investors prefer organic growth',
                  'Paid acquisition requires a large team',
                ],
                correctIndex: 1,
              },
              {
                question: 'A North Star Metric is chosen because:',
                options: [
                  'It is easy to measure weekly',
                  'It is reported to investors each quarter',
                  'It best captures the core value the product delivers to customers',
                  'It is the metric the CEO monitors personally',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Growth Engine Analysis',
            forLesson: 'Growth Strategies',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Choose a digital company and identify which growth engine(s) it uses. Then propose a North Star Metric and justify your choice.',
            requirements: [
              'Growth engine(s) identified with evidence',
              'North Star Metric proposed in a single measurable statement',
              'Justify why the NSM captures core customer value for this specific business',
            ],
          },
        ],
      },
      {
        id: 'c6_l6',
        title: 'Funding & Financial Basics',
        documents: [],
        videos: [
          {
            id: 'c6_v3',
            kind: 'video',
            title: 'Funding & Financial Basics',
            duration: '13 min',
            intro:
              'Understanding funding stages and startup financial fundamentals prevents entrepreneurs from running out of money at the worst possible moment.',
            topics: [
              'Funding stages: bootstrapping, friends & family, angel, seed, Series A+',
              'Unit economics: CAC, LTV, and payback period',
              'Burn rate and runway — how long until you run out of money',
              'When to raise vs. when to grow from revenue',
            ],
            moments: [
              { time: '0:00', label: 'Funding stage overview' },
              { time: '3:10', label: 'Unit economics fundamentals' },
              { time: '7:20', label: 'Burn rate and runway' },
              { time: '10:40', label: 'Raise vs. revenue growth decision' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c6_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Funding & Financial Basics Quiz',
            forLesson: 'Funding & Financial Basics',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of startup funding and financial concepts.',
            questions: [
              {
                question: 'Runway is defined as:',
                options: [
                  'The time until the next funding round',
                  'How long the company can operate before running out of cash at the current burn rate',
                  'The maximum monthly spending allowed by investors',
                  'The period before a startup reaches profitability',
                ],
                correctIndex: 1,
              },
              {
                question: 'CAC (Customer Acquisition Cost) is calculated as:',
                options: [
                  'Total revenue divided by number of customers',
                  'Total sales and marketing spend divided by new customers acquired in the period',
                  'Average revenue per user minus cost of goods',
                  'Monthly recurring revenue minus churn',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A healthy LTV:CAC ratio for a SaaS business is typically:',
                options: [
                  '1:1 (LTV equals CAC)',
                  'Greater than 3:1 (LTV is at least 3x the acquisition cost)',
                  '10:1 (LTV is 10x CAC — the higher the better)',
                  'Less than 1:1 (acquiring cheaply is always best)',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The best time to raise external funding is generally:',
                options: [
                  'When the company is running out of cash',
                  'When you have enough leverage — traction that makes investors compete to invest',
                  'Before the product is built, to fund development',
                  'After reaching profitability',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c6_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Unit Economics Model',
            forLesson: 'Funding & Financial Basics',
            dueDate: 'Jul 19',
            submission: 'File or link upload',
            instructions:
              'Build a simple unit economics model for a hypothetical subscription business. Calculate CAC, LTV, payback period, and 12-month runway with stated assumptions.',
            requirements: [
              'CAC, LTV, and payback period calculated with assumptions stated',
              'Runway calculated using a monthly burn rate you define',
              'Identify one change (to pricing, churn, or CAC) that would improve the economics most',
            ],
          },
        ],
      },
    ],
  },
];
