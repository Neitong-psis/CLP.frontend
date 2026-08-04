import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 12: Creative Problem Solving ───────────────────────────────────────

export const C12_MODULES: ReviewModule[] = [
  {
    id: 'c12_m1',
    title: 'Module 1: Foundations of Creative Thinking',
    lessons: [
      {
        id: 'c12_l1',
        title: 'How Creativity Works',
        documents: [
          {
            id: 'c12_d1',
            kind: 'document',
            title: 'How Creativity Works',
            readTime: '4 – 5 min read',
            intro:
              'Creativity is not a personality trait — it is a skill that can be developed. Understanding how creative insight actually works lets you design conditions that produce it.',
            objectives: [
              'Explain the four-stage model of creative insight',
              'Identify the conditions that inhibit and enable creative thinking',
            ],
            sections: [
              {
                heading: 'The Four Stages of Creative Insight',
                text: 'Graham Wallas\'s model: (1) Preparation — absorbing deep knowledge of the domain. Creativity rarely comes from ignorance. (2) Incubation — stepping back and letting the unconscious process the problem. This is why breakthroughs happen in the shower. (3) Illumination — the "aha moment" when the solution surfaces. (4) Verification — testing and refining the idea. Most creative processes fail at stage 4: people fall in love with the idea and skip the test.',
                tip: 'Build incubation deliberately. Put a hard problem aside for 24 hours before returning to it. The unconscious continues working.',
              },
              {
                heading: 'Conditions That Inhibit Creativity',
                text: 'Time pressure (beyond a moderate level), evaluation anxiety (the fear of judgment during idea generation), functional fixedness (seeing objects and concepts only in their standard use), and rigid categories (believing certain combinations are impossible) are the main inhibitors. The creative environment removes evaluation during ideation, provides psychological safety, introduces variety and cross-domain stimulus, and allows divergent thinking before convergent analysis.',
              },
            ],
            takeaways: [
              'Creative insight has four stages: Preparation, Incubation, Illumination, Verification — skipping verification is the most common failure',
              'Build deliberate incubation: step back from hard problems to allow unconscious processing',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c12_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'How Creativity Works Quiz',
            forLesson: 'How Creativity Works',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of creative insight and its conditions.',
            questions: [
              {
                question: "In Wallas's model, incubation refers to:",
                options: [
                  'The intense preparation phase before creativity begins',
                  'The "aha moment" when the solution appears',
                  'Stepping back and allowing the unconscious to process the problem',
                  'Testing and refining a creative idea',
                ],
                correctIndex: 2,
              },
              {
                question: 'Functional fixedness inhibits creativity by:',
                options: [
                  'Making people overly focused on function rather than aesthetics',
                  'Causing people to see objects and concepts only in their standard use',
                  'Restricting access to creative tools',
                  'Making creative teams too focused on practical implementation',
                ],
                correctIndex: 1,
              },
              {
                question: 'Evaluation anxiety inhibits creativity because:',
                options: [
                  'It causes people to work faster and make more errors',
                  'Fear of judgment causes people to self-censor during idea generation',
                  "It increases conformity to the group leader's preferences",
                  'It makes people focus on quantity rather than quality of ideas',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Most creative processes fail at the Verification stage because:',
                options: [
                  'Verification requires technical skills most creatives lack',
                  'People fall in love with the idea and skip rigorous testing',
                  'The timeline runs out before verification can be completed',
                  'Verification requires a different team from those who generated the idea',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Creative Conditions Audit',
            forLesson: 'How Creativity Works',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Audit a context where you regularly try to think creatively (work, study, personal projects). Identify two conditions that inhibit your creativity and design two environmental changes to remove them.',
            requirements: [
              'Two inhibitors identified with specific examples from your context',
              'Two environmental changes proposed — one structural, one behavioural',
              'How you will deliberately build incubation into your creative process',
            ],
          },
        ],
      },
      {
        id: 'c12_l2',
        title: 'Divergent Thinking Tools',
        documents: [],
        videos: [
          {
            id: 'c12_v1',
            kind: 'video',
            title: 'Divergent Thinking Tools',
            duration: '13 min',
            intro:
              'Divergent thinking generates many possible ideas before convergent thinking selects the best. Learn the tools that reliably expand your idea space.',
            topics: [
              'Brainstorming done right — and why it is often done wrong',
              'SCAMPER: Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse',
              'Random association and forced connections',
              'The reverse brainstorm: solving by inverting the problem',
            ],
            moments: [
              { time: '0:00', label: 'Divergent vs. convergent thinking' },
              { time: '2:50', label: 'Effective brainstorming conditions' },
              { time: '6:00', label: 'SCAMPER walkthrough' },
              { time: '10:00', label: 'Reverse brainstorm technique' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c12_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Divergent Thinking Quiz',
            forLesson: 'Divergent Thinking Tools',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of divergent thinking tools.',
            questions: [
              {
                question:
                  'The most common reason brainstorming fails in groups is:',
                options: [
                  'The session is too short',
                  'Evaluation during ideation — participants self-censor due to social pressure',
                  'Too few participants',
                  'Lack of a skilled facilitator',
                ],
                correctIndex: 1,
              },
              {
                question: 'In SCAMPER, "Eliminate" asks:',
                options: [
                  'Which features could be removed to simplify the product?',
                  'Which team members are no longer needed for this project?',
                  'Which customer segments should be excluded from the market?',
                  'Which constraints should be ignored?',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'The reverse brainstorm technique generates ideas by:',
                options: [
                  'Starting from the solution and working backwards',
                  'Asking "how could we make this problem worse?" then inverting the answers',
                  'Reversing the order of a standard brainstorm session',
                  'Having different groups work on the problem independently',
                ],
                correctIndex: 1,
              },
              {
                question: 'Random association as a creativity tool works by:',
                options: [
                  'Connecting the problem to a randomly selected word or image to break fixed thinking patterns',
                  'Randomly selecting from a list of pre-generated ideas',
                  'Assigning random participants to the problem',
                  'Generating associations without any structure or facilitation',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'SCAMPER Application',
            forLesson: 'Divergent Thinking Tools',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Apply the SCAMPER technique to any existing product or service of your choice. Generate at least one idea for each SCAMPER letter and select the two most promising for development.',
            requirements: [
              'One idea per SCAMPER letter (7 ideas minimum)',
              'Ideas range from incremental to radical',
              'Two selected ideas explained with why they are most promising',
            ],
          },
        ],
      },
      {
        id: 'c12_l3',
        title: 'Problem Framing',
        documents: [
          {
            id: 'c12_d2',
            kind: 'document',
            title: 'Problem Framing',
            readTime: '4 – 5 min read',
            intro:
              'The way a problem is framed determines the range of solutions visible. Reframe the problem and you instantly expand the solution space.',
            objectives: [
              'Apply "How Might We" reframing to transform problem statements',
              'Use root-cause analysis to distinguish symptoms from underlying problems',
            ],
            sections: [
              {
                heading: 'How Might We Reframing',
                text: '"How Might We" (HMW) statements transform problem descriptions into opportunity spaces. "Patients are not taking their medication" becomes "How might we make medication-taking feel less like a chore?" "Traffic is causing commute delays" becomes "How might we make the commute the most productive part of the day?" The HMW format is aspirational enough to open possibilities but specific enough to constrain the direction of thinking.',
                tip: 'Generate multiple HMW statements for the same problem. Each reframe opens a different part of the solution space.',
              },
              {
                heading: 'Root Cause Analysis',
                text: 'The 5 Whys technique: ask "Why?" five times to move from symptom to cause. "The report was late" → Why? "The data wasn\'t ready." → Why? "The team didn\'t know the deadline." → Why? "The deadline wasn\'t communicated clearly." → Why? "There is no standard communication process for project milestones." Root cause: process gap, not a people failure. Solving the root cause prevents recurrence; solving the symptom guarantees it.',
              },
            ],
            takeaways: [
              'HMW reframing transforms problem statements into opportunity spaces — generate multiple HMWs for the same problem',
              '5 Whys: ask "why" five times to move from symptom to root cause — solving symptoms guarantees recurrence',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c12_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Problem Framing Quiz',
            forLesson: 'Problem Framing',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of problem framing techniques.',
            questions: [
              {
                question: 'The "How Might We" format is useful because:',
                options: [
                  'It provides a template for a business plan',
                  'It transforms a problem into an opportunity space that invites solution generation',
                  'It narrows the problem to the single most important issue',
                  'It is the standard format required by design agencies',
                ],
                correctIndex: 1,
              },
              {
                question: 'The 5 Whys technique is used to:',
                options: [
                  'Generate five alternative solutions to a problem',
                  'Move from a symptom to the underlying root cause by asking "why" repeatedly',
                  'Evaluate five criteria for a design decision',
                  'Identify five stakeholders affected by a problem',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Solving a symptom rather than a root cause results in:',
                options: [
                  'A faster solution that buys time for a deeper fix',
                  'The problem recurring because its underlying cause remains',
                  "A partial solution that reduces the problem's frequency",
                  'A solution that transfers the problem to a different part of the system',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Generating multiple HMW statements for the same problem is useful because:',
                options: [
                  'Funders require multiple framing options',
                  'Each reframe opens a different part of the solution space',
                  'It satisfies multiple stakeholders with different perspectives',
                  'It slows down the process to allow deeper thinking',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Reframe Challenge',
            forLesson: 'Problem Framing',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Choose a real problem from your work, study, or community. Generate five HMW reframes and conduct a 5 Whys analysis. Identify which reframe opens the most promising solution space.',
            requirements: [
              'Five HMW statements that genuinely differ from each other',
              '5 Whys analysis showing each iteration',
              'Best HMW selected with reasoning about why it opens the richest solution space',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c12_m2',
    title: 'Module 2: Creative Problem Solving in Practice',
    lessons: [
      {
        id: 'c12_l4',
        title: 'Collaborative Creativity',
        documents: [],
        videos: [
          {
            id: 'c12_v2',
            kind: 'video',
            title: 'Collaborative Creativity',
            duration: '13 min',
            intro:
              'Groups can be dramatically more creative than individuals — or dramatically less, depending on how collaboration is structured. The design of collaboration matters more than the people.',
            topics: [
              'Why groups underperform individuals in unstructured brainstorming',
              'Nominal group technique and brainwriting as alternatives',
              'Psychological safety and its role in creative teams',
              'Building creative collaboration norms that last',
            ],
            moments: [
              { time: '0:00', label: 'Group creativity: promise and pitfalls' },
              { time: '3:00', label: 'Nominal group technique' },
              { time: '6:30', label: 'Psychological safety for creativity' },
              { time: '10:20', label: 'Building lasting creative norms' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c12_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Collaborative Creativity Quiz',
            forLesson: 'Collaborative Creativity',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of group creativity dynamics.',
            questions: [
              {
                question:
                  'Groups underperform individuals in unstructured brainstorming primarily because of:',
                options: [
                  'Diversity of thinking styles creating confusion',
                  'Social loafing and evaluation apprehension — people produce fewer ideas when others are present',
                  'Lack of a clear problem statement',
                  'Insufficient time for the group to warm up',
                ],
                correctIndex: 1,
              },
              {
                question: 'Brainwriting improves on group brainstorming by:',
                options: [
                  'Adding more participants to the session',
                  'Having individuals generate ideas silently before sharing, eliminating social pressure',
                  'Requiring all ideas to be written in a specific format',
                  'Eliminating the selection stage of the creative process',
                ],
                correctIndex: 1,
              },
              {
                question: 'Psychological safety in creative teams means:',
                options: [
                  'Physical safety during experiential creativity exercises',
                  'Team members feel safe to offer ideas without fear of ridicule or punishment',
                  'The team leader approves all ideas before they are shared',
                  'Creative risk-taking is rewarded regardless of outcome',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The design of a collaborative creativity session matters more than the people because:',
                options: [
                  'Individual creativity differences are negligible',
                  'Structure either enables or suppresses creativity in ways that override individual talent',
                  'Most creative teams are similarly talented',
                  'Group dynamics are too complex to predict from individual traits',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Creativity Session Design',
            forLesson: 'Collaborative Creativity',
            dueDate: 'Jul 15',
            submission: 'Text response',
            instructions:
              'Design a 45-minute collaborative creativity session for a real problem. Specify the method (brainwriting, nominal group, etc.), facilitation steps, and how you will create psychological safety.',
            requirements: [
              'Session structured with a timeline and specific activities',
              'Method chosen with justification over standard brainstorming',
              'One specific facilitation move to create psychological safety at the opening',
            ],
          },
        ],
      },
      {
        id: 'c12_l5',
        title: 'Rapid Prototyping Ideas',
        documents: [
          {
            id: 'c12_d3',
            kind: 'document',
            title: 'Rapid Prototyping Ideas',
            readTime: '4 – 5 min read',
            intro:
              'A prototype is a question made physical. Rapid prototyping tests assumptions about ideas before committing resources to build them.',
            objectives: [
              'Design a minimum fidelity prototype for a creative concept',
              'Apply assumption-testing thinking to prioritise what to prototype',
            ],
            sections: [
              {
                heading: 'Fidelity and When to Use It',
                text: 'Low-fidelity prototypes (paper sketches, sticky-note mockups, role-plays, wizard-of-oz simulations) are appropriate in the early stages when you are testing whether a concept resonates — are you solving the right problem? High-fidelity prototypes (functional software, engineered samples, detailed service blueprints) are appropriate when the concept is validated and you are testing whether your specific implementation works — is this the right solution? The rule: use the lowest fidelity that produces the information you need.',
                tip: 'Never build a high-fidelity prototype of an unvalidated concept. That is expensive confirmation of what you should have tested cheaply.',
              },
              {
                heading: 'Assumption Testing',
                text: 'Before building anything, list the assumptions your idea depends on. Rank them by: how critical is this assumption (if false, the idea fails) and how uncertain are we (do we know this is true?). Prototype and test the most critical and uncertain assumptions first. This is the same logic as the Lean Startup MVP: you are not building a product, you are running an experiment to test a belief.',
              },
            ],
            takeaways: [
              'Use the lowest fidelity that produces the information you need — never build high-fidelity before validating the concept',
              'Prototype the most critical AND most uncertain assumption first',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c12_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Rapid Prototyping Quiz',
            forLesson: 'Rapid Prototyping Ideas',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of prototyping and assumption testing.',
            questions: [
              {
                question: 'A low-fidelity prototype is most appropriate when:',
                options: [
                  'You want to impress stakeholders with a realistic demo',
                  'The concept is technically complex',
                  'You are testing whether the concept resonates before committing resources',
                  'The team has insufficient technical skills for higher fidelity',
                ],
                correctIndex: 2,
              },
              {
                question: 'The rule for prototype fidelity is:',
                options: [
                  'Always start with the highest fidelity you can afford',
                  'Use the lowest fidelity that produces the information you need',
                  "Match fidelity to the stakeholder's seniority",
                  'High fidelity for customer-facing prototypes; low for internal testing',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which assumption should be prototyped first?',
                options: [
                  'The assumption that is easiest to test',
                  'The assumption that most stakeholders agree on',
                  'The assumption that is most critical AND most uncertain',
                  'The assumption with the most financial impact',
                ],
                correctIndex: 2,
              },
              {
                question: 'A "Wizard of Oz" prototype simulates:',
                options: [
                  'Complex technology through a human performing the function behind the scenes',
                  'A fantasy product concept to generate creative inspiration',
                  'A fully automated process to test efficiency',
                  'An ideation session using a structured magic-like facilitation technique',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Prototype Plan',
            forLesson: 'Rapid Prototyping Ideas',
            dueDate: 'Jul 17',
            submission: 'File or link upload',
            instructions:
              'For your most promising idea from the course so far, list five assumptions the idea depends on. Rank them by criticality and uncertainty and design a low-fidelity prototype for the top-ranked assumption.',
            requirements: [
              'Five assumptions listed with criticality and uncertainty rated for each',
              'Top-ranked assumption identified with reasoning',
              'Low-fidelity prototype described: what it is, how you would test it, and what would constitute validation',
            ],
          },
        ],
      },
      {
        id: 'c12_l6',
        title: 'From Idea to Implementation',
        documents: [],
        videos: [
          {
            id: 'c12_v3',
            kind: 'video',
            title: 'From Idea to Implementation',
            duration: '12 min',
            intro:
              'The graveyard of innovation is full of brilliant ideas that were never implemented. Learn how to bridge the gap between creative insight and real-world change.',
            topics: [
              'Why creative ideas fail in implementation — the five most common causes',
              'Building a coalition of support for a creative idea',
              'Managing the transition from divergent to convergent thinking in a team',
              'Sustaining creative momentum through setbacks',
            ],
            moments: [
              {
                time: '0:00',
                label: 'Why ideas die between insight and implementation',
              },
              { time: '2:50', label: 'Building implementation coalitions' },
              { time: '6:30', label: 'Divergent to convergent transition' },
              { time: '10:00', label: 'Sustaining momentum' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c12_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Idea Implementation Quiz',
            forLesson: 'From Idea to Implementation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of how to move creative ideas to implementation.',
            questions: [
              {
                question:
                  'The most common reason creative ideas fail in implementation is:',
                options: [
                  'Insufficient budget to execute the idea',
                  'Lack of stakeholder alignment — the right people were not involved in design',
                  'The idea was not creative enough to generate enthusiasm',
                  'Implementation teams lack creative skills',
                ],
                correctIndex: 1,
              },
              {
                question: 'Building a coalition for a creative idea means:',
                options: [
                  'Lobbying senior management to mandate adoption',
                  'Identifying and involving key stakeholders early so they have ownership, not just awareness',
                  'Creating a team of creative champions to promote the idea',
                  'Waiting until the prototype is complete before sharing the idea',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The transition from divergent to convergent thinking in a team requires:',
                options: [
                  'A senior leader to decide which ideas proceed',
                  'Clear criteria agreed in advance for how ideas will be evaluated and selected',
                  'All team members to abandon their preferred ideas',
                  'An external facilitator to manage the transition',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Sustaining creative momentum through setbacks requires:',
                options: [
                  'Celebrating only successful outcomes',
                  'Treating setbacks as learning and maintaining narrative continuity from initial inspiration',
                  'Replacing team members who contributed to failures',
                  'Reducing ambition to achievable near-term goals',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c12_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Implementation Roadmap',
            forLesson: 'From Idea to Implementation',
            dueDate: 'Jul 19',
            submission: 'File or link upload',
            instructions:
              'Create a one-page implementation roadmap for your best idea from this course. Show the path from concept to pilot in 90 days with key milestones, stakeholders to engage, and how you will handle the first major setback.',
            requirements: [
              '90-day timeline with at least five milestones',
              'Three key stakeholders identified with how you will build their ownership',
              'Most likely setback described with a specific contingency plan',
            ],
          },
        ],
      },
    ],
  },
];
