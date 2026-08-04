import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 7: Environmental Leadership ───────────────────────────────────────

export const C7_MODULES: ReviewModule[] = [
  {
    id: 'c7_m1',
    title: 'Module 1: Understanding Environmental Challenges',
    lessons: [
      {
        id: 'c7_l1',
        title: 'Climate Science Fundamentals',
        documents: [
          {
            id: 'c7_d1',
            kind: 'document',
            title: 'Climate Science Fundamentals',
            readTime: '5 – 6 min read',
            intro:
              'Effective environmental leadership starts with understanding the science. Here is what the evidence actually says.',
            objectives: [
              'Explain the greenhouse effect and the role of human activity in climate change',
              'Distinguish between climate and weather and interpret scientific consensus',
            ],
            sections: [
              {
                heading: 'The Greenhouse Effect',
                text: "The Earth's atmosphere acts like a blanket: greenhouse gases (CO2, methane, nitrous oxide, water vapour) absorb outgoing infrared radiation and re-emit it in all directions, including back to the surface. This keeps the planet warm enough to sustain life. Human industrial activity since 1750 has increased atmospheric CO2 from 280 ppm to over 420 ppm — a 50% increase, driving an enhanced greenhouse effect and global average temperature increase of approximately 1.2°C above pre-industrial levels.",
                tip: 'Global average temperature rise of 1.5°C is a critical threshold: above it, the frequency and severity of extreme weather events increases dramatically.',
              },
              {
                heading: 'Climate vs. Weather',
                text: 'Weather is what happens on a given day; climate is the pattern over decades. A cold winter does not contradict climate change any more than one expensive meal contradicts inflation. Climate science measures trends over 30+ years. The scientific consensus — represented by 97%+ of actively publishing climate scientists and every major scientific organisation globally — is that current warming is primarily human-caused.',
              },
            ],
            takeaways: [
              'Human activity has increased atmospheric CO2 by 50% since industrialisation, driving ~1.2°C warming',
              '97%+ of climate scientists agree: current warming is primarily human-caused',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c7_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Climate Science Quiz',
            forLesson: 'Climate Science Fundamentals',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of climate science fundamentals.',
            questions: [
              {
                question: 'The greenhouse effect works by:',
                options: [
                  'Blocking sunlight from reaching Earth',
                  'Trapping heat in the atmosphere by absorbing and re-emitting infrared radiation',
                  'Reducing the ozone layer',
                  'Increasing solar activity',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Since industrialisation, atmospheric CO2 has increased by approximately:',
                options: ['10%', '25%', '50%', '100%'],
                correctIndex: 2,
              },
              {
                question: 'The 1.5°C warming threshold is significant because:',
                options: [
                  'It is the point of irreversible ice cap melting',
                  'Above it, extreme weather events increase dramatically in frequency and severity',
                  'It triggers automatic international climate agreements',
                  'It is the maximum warming the greenhouse effect can produce',
                ],
                correctIndex: 1,
              },
              {
                question: 'Scientific consensus on climate change means:',
                options: [
                  'All scientists agree on every detail of climate projections',
                  '97%+ of actively publishing climate scientists agree it is primarily human-caused',
                  'The UN has voted to accept the science officially',
                  'Climate models have been proven 100% accurate',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Carbon Footprint Audit',
            forLesson: 'Climate Science Fundamentals',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Estimate your personal annual carbon footprint across three categories (transport, diet, and home energy). Identify your largest source and one realistic reduction.',
            requirements: [
              'Estimate for each of the three categories with reasoning',
              'Identify the largest single source of your footprint',
              'One specific, measurable reduction action with estimated CO2 impact',
            ],
          },
        ],
      },
      {
        id: 'c7_l2',
        title: 'Sustainability Frameworks',
        documents: [],
        videos: [
          {
            id: 'c7_v1',
            kind: 'video',
            title: 'Sustainability Frameworks',
            duration: '13 min',
            intro:
              'Sustainability is now a strategic imperative, not just a values statement. Learn the frameworks leaders use to manage it.',
            topics: [
              'The triple bottom line: people, planet, profit',
              'The UN Sustainable Development Goals (SDGs) and their business relevance',
              'ESG (Environmental, Social, Governance) as an investor and stakeholder lens',
              'Circular economy principles: from "take-make-waste" to closed loops',
            ],
            moments: [
              { time: '0:00', label: 'Why sustainability is now strategic' },
              { time: '2:50', label: 'Triple bottom line and SDGs' },
              { time: '6:30', label: 'ESG as a leadership framework' },
              { time: '10:20', label: 'Circular economy in practice' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c7_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Sustainability Frameworks Quiz',
            forLesson: 'Sustainability Frameworks',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of sustainability frameworks.',
            questions: [
              {
                question: 'The triple bottom line measures performance across:',
                options: [
                  'Revenue, cost, and profit',
                  'People, planet, and profit',
                  'Economic, social, and cultural outcomes',
                  'Short, medium, and long-term results',
                ],
                correctIndex: 1,
              },
              {
                question: 'ESG investing considers:',
                options: [
                  'Only environmental factors',
                  'Environmental, Social, and Governance factors in investment decisions',
                  'Ethical, Sustainable, and Green criteria',
                  'Economic, Social, and Geographic factors',
                ],
                correctIndex: 1,
              },
              {
                question: 'A circular economy aims to:',
                options: [
                  'Maximise output with minimum labour cost',
                  'Eliminate waste by keeping materials in use through closed loops',
                  'Circulate products through multiple retail channels',
                  'Reduce production to sustainable levels',
                ],
                correctIndex: 1,
              },
              {
                question: 'The UN SDGs are relevant to businesses because:',
                options: [
                  'All companies must report SDG progress by law',
                  'They identify global problems that also represent business opportunities and risks',
                  'They replace national regulatory frameworks',
                  'They apply only to companies with 500+ employees',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'SDG Alignment',
            forLesson: 'Sustainability Frameworks',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Choose any organisation (your own, an employer, or a public company). Identify two SDGs most relevant to its operations and describe one action it currently takes (or should take) toward each.',
            requirements: [
              'Two SDGs named with numbers and titles',
              "Relevance to the organisation's operations explained",
              'One existing or proposed action per SDG with a measurable outcome',
            ],
          },
        ],
      },
      {
        id: 'c7_l3',
        title: 'Leading Environmental Change',
        documents: [
          {
            id: 'c7_d2',
            kind: 'document',
            title: 'Leading Environmental Change',
            readTime: '4 – 5 min read',
            intro:
              'Environmental leadership requires the skills to turn sustainability commitments into operational reality — inside organisations and across supply chains.',
            objectives: [
              'Apply stakeholder mapping to an environmental initiative',
              'Design a measurable sustainability commitment using SMART criteria',
            ],
            sections: [
              {
                heading: 'Stakeholder-Centred Sustainability',
                text: 'Environmental initiatives fail most often not because of technical difficulty but because of stakeholder misalignment. Employees, investors, regulators, customers, and local communities all have different stakes in sustainability outcomes. Effective environmental leaders map stakeholders early, identify conflicting interests, and design initiatives that create value for the most influential groups while managing trade-offs for others.',
                tip: 'Frame environmental initiatives in terms of business value to the stakeholder, not just values. "Reducing energy use by 20% cuts operating costs by $X" lands better than "it\'s the right thing to do."',
              },
              {
                heading: 'Measuring What Matters',
                text: 'Sustainability commitments without measurement are just intentions. The GHG Protocol provides the global standard for carbon accounting across three scopes. Scope 1: direct emissions from owned operations. Scope 2: indirect emissions from purchased energy. Scope 3: all other indirect emissions — supply chain, product use, disposal. For most organisations, Scope 3 represents 70–90% of total emissions, making supplier engagement a strategic priority.',
              },
            ],
            takeaways: [
              'Environmental initiatives fail most often from stakeholder misalignment, not technical difficulty',
              "Scope 3 emissions represent 70–90% of most organisations' total footprint — supply chain engagement is essential",
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c7_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Environmental Leadership Quiz',
            forLesson: 'Leading Environmental Change',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of leading environmental change initiatives.',
            questions: [
              {
                question:
                  'Environmental initiatives most often fail because of:',
                options: [
                  'Insufficient funding',
                  'Technical complexity beyond current capability',
                  'Stakeholder misalignment',
                  'Regulatory obstacles',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Framing environmental initiatives in terms of business value means:',
                options: [
                  'Ignoring environmental benefits to focus on profit',
                  'Connecting the sustainability outcome to cost savings, risk reduction, or revenue',
                  'Only pursuing initiatives that are immediately profitable',
                  'Avoiding sustainability language in business communication',
                ],
                correctIndex: 1,
              },
              {
                question: 'Scope 3 emissions include:',
                options: [
                  'Emissions from owned company vehicles',
                  'Purchased electricity and heat',
                  'All indirect emissions from the value chain — supply chain, product use, disposal',
                  'Emissions from employee commuting only',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'For most organisations, which emission scope is largest?',
                options: [
                  'Scope 1 (direct operations)',
                  'Scope 2 (purchased energy)',
                  'Scope 3 (value chain)',
                  'All scopes are typically equal',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Sustainability Initiative Design',
            forLesson: 'Leading Environmental Change',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design a SMART sustainability initiative for a real or hypothetical organisation. Map the key stakeholders and explain how you would frame the initiative for each group.',
            requirements: [
              'SMART goal stated (Specific, Measurable, Achievable, Relevant, Time-bound)',
              'Three stakeholders identified with their primary interest in the initiative',
              'How you would frame the initiative differently for each stakeholder group',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c7_m2',
    title: 'Module 2: Environmental Strategy in Practice',
    lessons: [
      {
        id: 'c7_l4',
        title: 'Net Zero Strategy',
        documents: [],
        videos: [
          {
            id: 'c7_v2',
            kind: 'video',
            title: 'Net Zero Strategy',
            duration: '13 min',
            intro:
              'Net zero is the defining sustainability commitment of the decade. Learn what it actually requires and how to build a credible pathway.',
            topics: [
              'Net zero vs. carbon neutral vs. carbon negative — what each means',
              'Science-Based Targets Initiative (SBTi) and credible commitments',
              'The role of carbon offsets — and their limitations',
              'Building a net zero roadmap: reduction first, then removal',
            ],
            moments: [
              { time: '0:00', label: 'Net zero definitions and confusion' },
              { time: '3:00', label: 'Science-Based Targets' },
              { time: '6:40', label: 'Carbon offsets: value and limits' },
              { time: '10:20', label: 'Building a credible roadmap' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c7_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Net Zero Strategy Quiz',
            forLesson: 'Net Zero Strategy',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of net zero strategy.',
            questions: [
              {
                question: 'Net zero means:',
                options: [
                  'Zero emissions from all company operations',
                  'Balancing emissions produced with emissions removed from the atmosphere',
                  'Purchasing enough carbon offsets to cancel all emissions',
                  'Only emitting what renewable energy can offset',
                ],
                correctIndex: 1,
              },
              {
                question: 'Science-Based Targets (SBTi) are valuable because:',
                options: [
                  'They are cheaper than self-set targets',
                  'They align corporate commitments with what climate science says is needed to limit warming',
                  'They are legally required in most countries',
                  'They automatically certify a company as net zero',
                ],
                correctIndex: 1,
              },
              {
                question: 'Carbon offsets should primarily be used:',
                options: [
                  'As the main strategy for achieving net zero',
                  'To offset residual hard-to-abate emissions after maximum reduction efforts',
                  'Instead of operational emission reductions',
                  'Only for Scope 1 emissions',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The correct priority order for a net zero roadmap is:',
                options: [
                  'Remove → Offset → Reduce',
                  'Offset → Reduce → Remove',
                  'Reduce first, then remove residual emissions',
                  'All three should be pursued simultaneously with equal emphasis',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Net Zero Gap Analysis',
            forLesson: 'Net Zero Strategy',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Research the net zero commitment of a publicly listed company. Evaluate its credibility against three criteria: scope coverage, timeline, and reduction vs. offset ratio.',
            requirements: [
              "Company's stated net zero commitment summarised",
              'Evaluated against all three criteria with evidence from public disclosures',
              'Rate the commitment as credible, partially credible, or greenwashing — with justification',
            ],
          },
        ],
      },
      {
        id: 'c7_l5',
        title: 'Green Innovation',
        documents: [
          {
            id: 'c7_d3',
            kind: 'document',
            title: 'Green Innovation',
            readTime: '4 – 5 min read',
            intro:
              'The most durable environmental solutions are those embedded in business models, not bolt-on CSR programmes. Green innovation creates competitive advantage while reducing impact.',
            objectives: [
              'Identify opportunities for green innovation within existing business models',
              'Distinguish between incremental eco-efficiency and transformative green innovation',
            ],
            sections: [
              {
                heading: 'Two Types of Green Innovation',
                text: 'Eco-efficiency is doing the same things with less impact: LED lighting, fuel-efficient trucks, paperless processes. These are important but limited — you can only be so efficient before hitting a ceiling. Green innovation redesigns the underlying system: Interface Carpet\'s "Mission Zero" replaced the take-make-waste model with modular tiles designed for perpetual reuse. Unilever\'s concentrated laundry products reduced packaging and water 50%+ by redesigning the formula, not just the packaging.',
                tip: 'Ask: what would our product look like if we designed for zero waste from the start? That question leads to green innovation, not just eco-efficiency.',
              },
              {
                heading: 'Business Case for Green Innovation',
                text: 'The business case for green innovation operates across three dimensions: cost (energy, waste, and resource costs decline), revenue (premium pricing for sustainable products and access to ESG-focused investors and procurement), and risk (regulatory exposure, supply chain resilience, and reputational risk all improve). Organisations that wait for regulation to force action typically spend more and gain less than those who move proactively.',
              },
            ],
            takeaways: [
              'Eco-efficiency reduces impact; green innovation redesigns the system — both are needed, but only the latter creates competitive advantage',
              'Green innovation improves costs, revenue, and risk simultaneously',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c7_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Green Innovation Quiz',
            forLesson: 'Green Innovation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of green innovation concepts.',
            questions: [
              {
                question:
                  'Eco-efficiency differs from green innovation because:',
                options: [
                  'Eco-efficiency is cheaper to implement',
                  'Eco-efficiency does the same thing with less impact; green innovation redesigns the system',
                  'Green innovation only applies to manufacturing',
                  'Eco-efficiency is required by regulation; green innovation is optional',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Green innovation creates competitive advantage primarily by:',
                options: [
                  'Qualifying for government subsidies',
                  'Reducing costs, creating premium revenue, and reducing risk simultaneously',
                  'Making the company appear more ethical than competitors',
                  'Cutting R&D costs through simpler product designs',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Organisations that wait for regulation to force environmental action typically:',
                options: [
                  'Pay less because they have more time to prepare',
                  'Spend more and gain less than proactive movers',
                  'Benefit from watching competitors make costly mistakes first',
                  'Face no disadvantage if they comply when required',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The design question that leads to green innovation (not just eco-efficiency) is:',
                options: [
                  '"How can we use 10% less energy?"',
                  '"What would this product look like if designed for zero waste from the start?"',
                  '"How do we offset our remaining emissions?"',
                  '"What sustainability standard should we certify against?"',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Green Innovation Brief',
            forLesson: 'Green Innovation',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Choose a product or service in any industry. Identify one eco-efficiency improvement and one green innovation opportunity. Write a 200-word business case for the green innovation.',
            requirements: [
              'Eco-efficiency improvement described (what, estimated impact)',
              'Green innovation described: how it redesigns the underlying system',
              'Business case covers cost, revenue, and risk dimensions for the green innovation',
            ],
          },
        ],
      },
      {
        id: 'c7_l6',
        title: 'Environmental Communication & Advocacy',
        documents: [],
        videos: [
          {
            id: 'c7_v3',
            kind: 'video',
            title: 'Environmental Communication & Advocacy',
            duration: '12 min',
            intro:
              'How environmental leaders communicate is as important as what they communicate. Greenwashing destroys trust; authentic communication builds it.',
            topics: [
              'Greenwashing: what it is, how it happens, and why it backfires',
              'Communicating uncertainty honestly without undermining credibility',
              'Internal advocacy: building the business case for sustainability',
              'External advocacy: engaging media, regulators, and communities',
            ],
            moments: [
              { time: '0:00', label: 'What is greenwashing?' },
              { time: '2:50', label: 'Honest uncertainty communication' },
              { time: '6:30', label: 'Internal business case' },
              { time: '9:40', label: 'External advocacy principles' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c7_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Environmental Communication Quiz',
            forLesson: 'Environmental Communication & Advocacy',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of environmental communication and greenwashing.',
            questions: [
              {
                question: 'Greenwashing is harmful primarily because:',
                options: [
                  'It violates advertising standards in most countries',
                  'It destroys trust when discovered and slows real progress by rewarding symbolic action',
                  'It makes authentic sustainable brands less competitive',
                  'It is illegal in the European Union',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Communicating scientific uncertainty honestly means:',
                options: [
                  'Admitting that climate science is not settled',
                  'Stating the range and confidence level of predictions rather than hiding uncertainty',
                  'Avoiding specific claims about environmental impact',
                  'Only making claims that have 100% scientific certainty',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When building an internal business case for sustainability, the most persuasive framing is:',
                options: [
                  'Moral responsibility to future generations',
                  'Regulatory compliance requirements',
                  'Quantified business value: cost savings, revenue, and risk reduction',
                  'Competitor benchmarking showing you are behind',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'A credible external sustainability claim should include:',
                options: [
                  'Only positive outcomes and progress',
                  'Specific, measurable commitments with third-party verification where possible',
                  'Emotional appeals to environmental values',
                  'Comparison with the worst performers in the industry',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c7_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Sustainability Communication Audit',
            forLesson: 'Environmental Communication & Advocacy',
            dueDate: 'Jul 19',
            submission: 'Text response',
            instructions:
              'Find a sustainability claim from a real company (website, annual report, or advertisement). Evaluate whether it is authentic or greenwashing and rewrite it to meet the credibility standard from this lesson.',
            requirements: [
              'Original claim quoted accurately with source cited',
              'Greenwashing evaluation against three specific criteria',
              'Rewritten version that is specific, measurable, and honestly qualified',
            ],
          },
        ],
      },
    ],
  },
];
