import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 2: Critical Thinking & Problem Solving ────────────────────────────

export const C2_MODULES: ReviewModule[] = [
  {
    id: 'c2_m1',
    title: 'Module 1: Foundations of Critical Thinking',
    lessons: [
      {
        id: 'c2_l1',
        title: 'What is Critical Thinking?',
        documents: [
          {
            id: 'c2_d1',
            kind: 'document',
            title: 'What is Critical Thinking?',
            readTime: '4 – 6 min read',
            intro:
              'Critical thinking is the disciplined practice of analysing information objectively to form a reasoned judgement. Here is what it actually involves.',
            objectives: [
              'Define critical thinking and its key components',
              'Distinguish critical thinking from ordinary thinking and gut-feel decision-making',
            ],
            sections: [
              {
                heading: 'What Critical Thinking Is',
                text: 'Critical thinking involves questioning assumptions, evaluating evidence, considering multiple perspectives, and drawing conclusions that are proportionate to what the evidence actually supports. It is not scepticism for its own sake — it is disciplined reasoning. A critical thinker does not just doubt everything; they apply standards of logic and evidence before accepting or rejecting a claim.',
                tip: 'Before accepting any claim, ask: What is the evidence? Is the source reliable? Are there alternative explanations?',
              },
              {
                heading: 'Critical Thinking vs. Instinct',
                text: 'Instinctive thinking is fast, automatic, and often right in familiar situations. Critical thinking is slow, deliberate, and necessary when the situation is novel, complex, or high-stakes. The goal is not to eliminate intuition but to know when to engage slower, more deliberate analysis — especially when the consequences of being wrong are significant.',
              },
            ],
            takeaways: [
              'Critical thinking is disciplined reasoning, not reflexive doubt',
              'Use slower critical analysis when the situation is novel, complex, or high-stakes',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c2_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'What is Critical Thinking? Quiz',
            forLesson: 'What is Critical Thinking?',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Confirm your understanding of what critical thinking is and when to apply it.',
            questions: [
              {
                question: 'Critical thinking is best described as:',
                options: [
                  'Doubting everything you hear',
                  'Disciplined reasoning using evidence and logic to form judgements',
                  'Trusting your instincts over data',
                  'Arguing against the majority view',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which question best reflects critical thinking?',
                options: [
                  '"Everyone agrees, so it must be true."',
                  '"I feel strongly about this, so I\'ll go with it."',
                  '"What is the evidence, and are there alternative explanations?"',
                  '"This is the way we\'ve always done it."',
                ],
                correctIndex: 2,
              },
              {
                question: 'Instinctive thinking is most reliable when:',
                options: [
                  'The situation is novel and high-stakes',
                  'The consequences of error are severe',
                  'The situation is familiar and routine',
                  'You have no time to gather evidence',
                ],
                correctIndex: 2,
              },
              {
                question: 'Critical thinking draws conclusions that are:',
                options: [
                  'Stronger than the evidence warrants',
                  'Proportionate to what the evidence actually supports',
                  'Based primarily on personal values',
                  'Always pessimistic',
                ],
                correctIndex: 1,
              },
              {
                question: 'The goal of critical thinking is to:',
                options: [
                  'Replace intuition entirely',
                  'Know when slower, more deliberate analysis is needed',
                  'Prove other people wrong',
                  'Avoid making any decisions',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Claim Analysis',
            forLesson: 'What is Critical Thinking?',
            dueDate: 'Jul 5',
            submission: 'Text response',
            instructions:
              'Find a claim from a news article, report, or social media post. Apply the three critical-thinking questions from the lesson and write a 250 – 350 word analysis.',
            requirements: [
              'State the original claim clearly and cite its source',
              'Answer all three questions: What is the evidence? Is the source reliable? Are there alternative explanations?',
              'State your reasoned conclusion proportionate to the evidence',
            ],
          },
        ],
      },
      {
        id: 'c2_l2',
        title: 'Cognitive Biases',
        documents: [],
        videos: [
          {
            id: 'c2_v1',
            kind: 'video',
            title: 'Cognitive Biases',
            duration: '16 min',
            intro:
              'Our brains take mental shortcuts that systematically distort our thinking. Learn to spot the most common biases before they distort your decisions.',
            topics: [
              'What cognitive biases are and why they exist',
              'Confirmation bias: seeking information that confirms what we already believe',
              'Anchoring, availability heuristic, and sunk cost fallacy',
              'Practical debiasing strategies for high-stakes decisions',
            ],
            moments: [
              { time: '0:00', label: 'Why biases are features, not bugs' },
              { time: '3:20', label: 'Confirmation bias in the workplace' },
              { time: '8:00', label: 'Anchoring and availability heuristic' },
              { time: '12:30', label: 'Practical debiasing techniques' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c2_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Cognitive Biases Quiz',
            forLesson: 'Cognitive Biases',
            totalQuestions: 5,
            estimatedMinutes: 8,
            description:
              'Test your knowledge of common cognitive biases and strategies to counter them.',
            questions: [
              {
                question: 'Confirmation bias occurs when you:',
                options: [
                  'Consider all available evidence equally',
                  'Seek information that confirms your existing belief and discount contradicting evidence',
                  'Make decisions based on the most recent event',
                  'Overestimate the probability of rare events',
                ],
                correctIndex: 1,
              },
              {
                question: 'The sunk cost fallacy involves:',
                options: [
                  'Overvaluing future gains',
                  'Continuing a losing course of action because of past investment',
                  'Estimating based on the first number you hear',
                  'Thinking something is more common because it comes to mind easily',
                ],
                correctIndex: 1,
              },
              {
                question: 'Anchoring bias means initial information:',
                options: [
                  'Is always ignored in favour of later data',
                  'Disproportionately influences subsequent judgements',
                  'Is the most accurate form of data',
                  'Only affects financial decisions',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which strategy best counters confirmation bias?',
                options: [
                  'Making faster decisions',
                  'Deliberately seeking disconfirming evidence',
                  'Trusting your first instinct',
                  'Polling the entire team',
                ],
                correctIndex: 1,
              },
              {
                question: 'Cognitive biases exist because:',
                options: [
                  'People are fundamentally irrational',
                  'Mental shortcuts evolved to enable faster decisions in familiar situations',
                  'Education levels are too low',
                  'Emotions always override reason',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Bias Spotting Journal',
            forLesson: 'Cognitive Biases',
            dueDate: 'Jul 7',
            submission: 'Text response',
            instructions:
              'Over two days, notice and record three instances where you or someone else may have exhibited a cognitive bias. For each, name the bias and describe how it affected thinking or a decision.',
            requirements: [
              'Identify three separate instances with the specific bias named',
              'Describe the context and how the bias manifested',
              'Suggest how debiasing could have improved the thinking in each case',
            ],
          },
        ],
      },
      {
        id: 'c2_l3',
        title: 'Evaluating Arguments',
        documents: [
          {
            id: 'c2_d2',
            kind: 'document',
            title: 'Evaluating Arguments',
            readTime: '5 – 6 min read',
            intro:
              'Not all arguments are equal. Learn how to assess the structure, premises, and evidence behind any claim.',
            objectives: [
              'Identify the structure of a logical argument (premises and conclusion)',
              "Evaluate whether an argument's conclusion follows from its premises",
            ],
            sections: [
              {
                heading: 'Anatomy of an Argument',
                text: 'Every argument has two parts: premises (the supporting reasons) and a conclusion (the claim being made). A valid argument is one where if the premises are true, the conclusion must be true. A sound argument is valid AND the premises are actually true. Many persuasive-sounding arguments are valid but not sound because one or more premises are false or unverified.',
                tip: 'When evaluating an argument, write out the premises explicitly. Hidden premises are where most logical errors hide.',
              },
              {
                heading: 'Common Logical Fallacies',
                text: "Ad hominem attacks the person rather than the argument. Straw man misrepresents the opponent's position. False dilemma presents only two options when more exist. Appeal to authority uses a name rather than evidence. Spotting these fallacies lets you separate the argument's logical structure from the emotional packaging around it.",
              },
            ],
            takeaways: [
              'A sound argument requires both valid logic and true premises',
              'Identifying logical fallacies protects you from being persuaded by emotion or misdirection',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c2_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Evaluating Arguments Quiz',
            forLesson: 'Evaluating Arguments',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Assess your ability to evaluate argument structure and identify logical fallacies.',
            questions: [
              {
                question: 'A "sound" argument is one that is:',
                options: [
                  'Emotionally compelling and well-delivered',
                  'Valid in structure AND has true premises',
                  'Supported by an expert authority',
                  'Difficult to disprove',
                ],
                correctIndex: 1,
              },
              {
                question: 'Ad hominem is a fallacy that:',
                options: [
                  'Presents a false binary choice',
                  'Attacks the person rather than the argument',
                  "Misrepresents the opponent's position",
                  'Relies on popular opinion',
                ],
                correctIndex: 1,
              },
              {
                question: 'A straw man fallacy involves:',
                options: [
                  'Using irrelevant statistics',
                  "Misrepresenting an opponent's argument to make it easier to attack",
                  'Claiming authority without expertise',
                  'Oversimplifying a complex issue into two options',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "If an argument's premises are true and its logic is valid, the argument is:",
                options: ['Fallacious', 'Unsound', 'Sound', 'Speculative'],
                correctIndex: 2,
              },
              {
                question: 'Where do most logical errors in arguments hide?',
                options: [
                  'In the conclusion',
                  'In premises that are unstated or assumed',
                  'In the use of statistics',
                  'In the emotional language used',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Argument Deconstruction',
            forLesson: 'Evaluating Arguments',
            dueDate: 'Jul 9',
            submission: 'Text response',
            instructions:
              'Find a persuasive argument (advertisement, opinion article, or debate transcript). Break it down into premises and conclusion, evaluate its soundness, and identify any fallacies.',
            requirements: [
              "State the argument's premises and conclusion explicitly",
              'Assess whether each premise is true and the logic is valid',
              'Identify at least one fallacy if present, or explain why the argument is sound',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c2_m2',
    title: 'Module 2: Problem-Solving Frameworks',
    lessons: [
      {
        id: 'c2_l4',
        title: 'Structured Problem Solving',
        documents: [],
        videos: [
          {
            id: 'c2_v2',
            kind: 'video',
            title: 'Structured Problem Solving',
            duration: '15 min',
            intro:
              'Move from reacting to problems to solving them systematically with a repeatable framework.',
            topics: [
              'Why unstructured problem solving leads to recurring issues',
              'The five-step problem-solving process: Define → Analyse → Generate → Evaluate → Implement',
              'Root cause analysis: the 5 Whys technique',
              'Avoiding the trap of solving symptoms instead of causes',
            ],
            moments: [
              { time: '0:00', label: 'The cost of reactive problem-solving' },
              { time: '2:50', label: 'Five-step framework overview' },
              { time: '6:20', label: 'Root cause analysis with 5 Whys' },
              { time: '11:00', label: 'Avoiding symptom fixes' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c2_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Structured Problem Solving Quiz',
            forLesson: 'Structured Problem Solving',
            totalQuestions: 5,
            estimatedMinutes: 8,
            description:
              'Test your knowledge of the five-step problem-solving process and root cause analysis.',
            questions: [
              {
                question: 'The first step in structured problem solving is:',
                options: [
                  'Generate solutions',
                  'Analyse causes',
                  'Define the problem clearly',
                  'Implement the best option',
                ],
                correctIndex: 2,
              },
              {
                question: 'The 5 Whys technique is used to:',
                options: [
                  'Generate five alternative solutions',
                  'Identify the root cause of a problem by asking "why" repeatedly',
                  'Evaluate five potential risks',
                  'Decide which team member caused the issue',
                ],
                correctIndex: 1,
              },
              {
                question: 'Solving symptoms rather than root causes leads to:',
                options: [
                  'Faster resolution',
                  'Sustainable improvement',
                  'Recurring problems',
                  'Lower costs',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which step comes after generating options in the five-step process?',
                options: ['Define', 'Analyse', 'Evaluate', 'Implement'],
                correctIndex: 2,
              },
              {
                question: 'A well-defined problem statement should:',
                options: [
                  'Include the preferred solution',
                  'Be vague to allow flexibility',
                  'Describe the gap between current and desired state',
                  'Focus on who caused the problem',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Problem-Solving Walkthrough',
            forLesson: 'Structured Problem Solving',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Apply the five-step framework to a real or realistic problem you face. Walk through each step explicitly.',
            requirements: [
              'Define the problem as a gap between current and desired state',
              'Apply the 5 Whys to identify the root cause',
              'Generate at least three solution options and evaluate each briefly',
            ],
          },
        ],
      },
      {
        id: 'c2_l5',
        title: 'Decision-Making Models',
        documents: [
          {
            id: 'c2_d3',
            kind: 'document',
            title: 'Decision-Making Models',
            readTime: '5 – 7 min read',
            intro:
              'Different decisions require different approaches. Learn three proven models and when to use each.',
            objectives: [
              'Distinguish between rational, intuitive, and bounded rationality decision-making models',
              'Select the appropriate decision-making model based on context and information availability',
            ],
            sections: [
              {
                heading: 'Three Models for Different Contexts',
                text: 'The rational model assumes you have complete information and unlimited time: identify all options, evaluate each against criteria, choose the optimal one. The bounded rationality model (Herbert Simon) recognises that in reality you have limited time and information — so you "satisfice": find an option that is good enough rather than optimal. Intuitive decision-making draws on pattern recognition from experience and is most reliable in familiar situations under time pressure.',
                tip: 'Map your decision against two axes: How much time do you have? How much information is available? The quadrant tells you which model to use.',
              },
              {
                heading: 'Decision Criteria and Trade-Offs',
                text: 'Even with a model, you need decision criteria: what factors matter most (cost, speed, risk, stakeholder impact)? Assign relative weights to each. A decision matrix helps you score each option against weighted criteria and surfaces the most defensible choice — not necessarily the "right" one, but one you can justify systematically.',
              },
            ],
            takeaways: [
              'Match the decision model to the available time and information, not to habit',
              'A decision matrix makes trade-offs visible and the final choice more defensible',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c2_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Decision-Making Models Quiz',
            forLesson: 'Decision-Making Models',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of rational, intuitive, and bounded rationality models.',
            questions: [
              {
                question: '"Satisficing" is associated with:',
                options: [
                  'The rational model',
                  'Bounded rationality',
                  'Intuitive decision-making',
                  'The Pareto principle',
                ],
                correctIndex: 1,
              },
              {
                question: 'Intuitive decision-making is most reliable when:',
                options: [
                  'The situation is novel and unfamiliar',
                  'You have complete information and unlimited time',
                  'The situation is familiar and time is short',
                  'Stakes are extremely high and unique',
                ],
                correctIndex: 2,
              },
              {
                question: 'A decision matrix helps by:',
                options: [
                  'Automating the final decision',
                  'Making trade-offs visible and choices more defensible',
                  'Eliminating the need for criteria',
                  'Guaranteeing the optimal outcome',
                ],
                correctIndex: 1,
              },
              {
                question: 'The rational decision model assumes:',
                options: [
                  'Time is always limited',
                  'You will satisfice, not optimise',
                  'Complete information and unlimited time',
                  'Experience is the primary input',
                ],
                correctIndex: 2,
              },
              {
                question: 'Decision criteria should be:',
                options: [
                  'The same for every type of decision',
                  'Weighted to reflect what matters most in the specific context',
                  'Set after reviewing all options',
                  'Defined by the most senior stakeholder only',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Decision Matrix',
            forLesson: 'Decision-Making Models',
            dueDate: 'Jul 14',
            submission: 'File or link upload',
            instructions:
              'Create a weighted decision matrix for a real or hypothetical decision with at least three options. Submit the matrix and a 150-word explanation of your conclusion.',
            requirements: [
              'Minimum three options and four weighted criteria',
              'Scores and weighted totals calculated correctly',
              'Written explanation of why the highest-scoring option is or is not the final choice',
            ],
          },
        ],
      },
      {
        id: 'c2_l6',
        title: 'Creative Ideation',
        documents: [],
        videos: [
          {
            id: 'c2_v3',
            kind: 'video',
            title: 'Creative Ideation',
            duration: '13 min',
            intro:
              'Creativity is a process, not a personality trait. Learn structured techniques for generating more and better ideas.',
            topics: [
              'Why quantity of ideas precedes quality: divergent thinking',
              'Brainstorming rules that actually work',
              'SCAMPER: Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse',
              'Moving from ideation to selection without killing good ideas early',
            ],
            moments: [
              { time: '0:00', label: 'Creativity is a process' },
              {
                time: '2:40',
                label: 'Divergent thinking and brainstorming rules',
              },
              { time: '6:30', label: 'SCAMPER technique walkthrough' },
              {
                time: '10:20',
                label: 'Idea selection without premature elimination',
              },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c2_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Creative Ideation Quiz',
            forLesson: 'Creative Ideation',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of divergent thinking and ideation techniques.',
            questions: [
              {
                question: 'Divergent thinking means:',
                options: [
                  'Evaluating and narrowing down options quickly',
                  'Generating many ideas without immediate judgement',
                  'Sticking to proven solutions',
                  'Identifying the single best answer',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which brainstorming rule produces the most ideas?',
                options: [
                  'Evaluate each idea immediately',
                  'Allow only realistic, implementable ideas',
                  "Defer judgement and build on others' ideas",
                  'Limit contributions to experts',
                ],
                correctIndex: 2,
              },
              {
                question: 'In SCAMPER, the "R" stands for:',
                options: ['Repeat', 'Refine', 'Remove', 'Reverse'],
                correctIndex: 3,
              },
              {
                question:
                  'Why should idea selection be separate from idea generation?',
                options: [
                  'Selection takes less time when done simultaneously',
                  'Evaluating too early kills unconventional ideas before they can develop',
                  'Creative people prefer combined phases',
                  "Selection criteria don't apply to divergent thinking",
                ],
                correctIndex: 1,
              },
              {
                question: 'SCAMPER is best described as:',
                options: [
                  'A rapid decision-making tool',
                  'A structured trigger for generating creative variations on existing ideas',
                  'A visual mapping technique',
                  'A problem-definition framework',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'SCAMPER Ideation Session',
            forLesson: 'Creative Ideation',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Choose an existing product, service, or process. Apply the SCAMPER technique to generate at least one idea per letter (7 ideas minimum). Then select the two most promising and explain why.',
            requirements: [
              'At least one idea generated for each of the 7 SCAMPER prompts',
              'Ideas should be specific and feasible, not generic',
              'Two selected ideas must include a brief justification for each',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c2_m3',
    title: 'Module 3: Applied Thinking',
    lessons: [
      {
        id: 'c2_l7',
        title: 'Logical Reasoning',
        documents: [
          {
            id: 'c2_d4',
            kind: 'document',
            title: 'Logical Reasoning',
            readTime: '4 – 6 min read',
            intro:
              'Logical reasoning is the bridge between evidence and conclusion. Learn the two main types and when each applies.',
            objectives: [
              'Distinguish between deductive and inductive reasoning',
              'Identify when each reasoning type is appropriate and its limitations',
            ],
            sections: [
              {
                heading: 'Deductive vs. Inductive Reasoning',
                text: 'Deductive reasoning moves from general principles to specific conclusions: if all the premises are true and the logic is valid, the conclusion is guaranteed. Inductive reasoning moves from specific observations to general principles: multiple observations suggest a pattern, but the conclusion is probable rather than certain. Most real-world problem-solving combines both — deduction to test hypotheses, induction to generate them.',
                tip: "If your conclusion must be true given true premises, you're thinking deductively. If it's probably true based on observations, you're thinking inductively.",
              },
              {
                heading: 'Abductive Reasoning — The Third Type',
                text: 'Abductive reasoning selects the simplest and most likely explanation for an incomplete set of observations. Doctors use it constantly: given these symptoms, what is the most plausible diagnosis? It is not guaranteed to be correct, but it is practical and efficient when complete information is unavailable. Always stay open to revising an abductive conclusion as new evidence arrives.',
              },
            ],
            takeaways: [
              'Deductive conclusions are guaranteed if premises are true; inductive conclusions are probable',
              'Abductive reasoning selects the most plausible explanation when information is incomplete',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c2_q7',
            kind: 'quiz',
            status: 'Ready',
            title: 'Logical Reasoning Quiz',
            forLesson: 'Logical Reasoning',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of deductive, inductive, and abductive reasoning.',
            questions: [
              {
                question: 'Deductive reasoning produces a conclusion that is:',
                options: [
                  'Probable based on observations',
                  'Guaranteed if premises are true and logic is valid',
                  'The simplest explanation of available data',
                  'Based on the opinions of experts',
                ],
                correctIndex: 1,
              },
              {
                question: 'Inductive reasoning moves from:',
                options: [
                  'General principles to specific conclusions',
                  'Specific observations to general principles',
                  'Hypotheses to experiments',
                  'Symptoms to diagnoses',
                ],
                correctIndex: 1,
              },
              {
                question: 'Abductive reasoning is best described as:',
                options: [
                  'Logically guaranteed deduction',
                  'Pattern recognition from large datasets',
                  'Selecting the most plausible explanation for incomplete observations',
                  'Using authority to justify conclusions',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which profession most commonly uses abductive reasoning?',
                options: [
                  'Mathematicians proving theorems',
                  'Doctors forming diagnoses from symptoms',
                  'Auditors verifying financial statements',
                  'Engineers following design specifications',
                ],
                correctIndex: 1,
              },
              {
                question: 'An abductive conclusion should be:',
                options: [
                  'Treated as certain once formed',
                  'Open to revision as new evidence arrives',
                  'Always confirmed by deductive reasoning first',
                  'Rejected if it seems too simple',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a7',
            kind: 'assignment',
            status: 'Ready',
            title: 'Reasoning Type Analysis',
            forLesson: 'Logical Reasoning',
            dueDate: 'Jul 20',
            submission: 'Text response',
            instructions:
              'Find one example each of deductive, inductive, and abductive reasoning in a professional or everyday context. Write a 250-word analysis explaining why each qualifies as that type.',
            requirements: [
              'One distinct example per reasoning type (three total)',
              'Each example must identify the premises/observations and the conclusion',
              'Explain what would make the conclusion fail for each type',
            ],
          },
        ],
      },
      {
        id: 'c2_l8',
        title: 'Case Analysis',
        documents: [],
        videos: [
          {
            id: 'c2_v4',
            kind: 'video',
            title: 'Case Analysis',
            duration: '14 min',
            intro:
              'Case analysis is how critical thinkers work through complex, real-world npproblems with incomplete information.',
            topics: [
              'The case analysis process: situation, complication, question, answer',
              'Structuring your analysis before writing or presenting',
              'Using frameworks (SWOT, stakeholder mapping, cost-benefit) selectively',
              'Communicating your analysis clearly to different audiences',
            ],
            moments: [
              { time: '0:00', label: 'Why case analysis matters' },
              {
                time: '2:30',
                label: 'SCQA: situation, complication, question, answer',
              },
              { time: '6:50', label: 'Choosing the right framework' },
              { time: '11:00', label: 'Communicating your analysis' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c2_q8',
            kind: 'quiz',
            status: 'Ready',
            title: 'Case Analysis Quiz',
            forLesson: 'Case Analysis',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your grasp of case analysis structure and framework selection.',
            questions: [
              {
                question: 'In the SCQA structure, "C" stands for:',
                options: ['Context', 'Conclusion', 'Complication', 'Criteria'],
                correctIndex: 2,
              },
              {
                question: 'A "complication" in SCQA is:',
                options: [
                  'A calculation error in the data',
                  'The tension or challenge that makes the situation require a decision',
                  'A weakness in the proposed solution',
                  'A conflict between stakeholders',
                ],
                correctIndex: 1,
              },
              {
                question: 'Analytical frameworks should be:',
                options: [
                  'Applied to every case regardless of context',
                  'Selected selectively based on what the case requires',
                  'Avoided in favour of pure intuition',
                  'Always used in combination',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When communicating a case analysis to a non-expert audience, you should:',
                options: [
                  'Include all technical detail to demonstrate thoroughness',
                  'Use jargon to establish credibility',
                  'Lead with the answer and then support it with key evidence',
                  'Present every option you considered',
                ],
                correctIndex: 2,
              },
              {
                question: 'A SWOT analysis is most useful for:',
                options: [
                  'Calculating the financial return on a decision',
                  "Mapping an organisation's internal and external strategic position",
                  'Ranking stakeholder priorities',
                  'Testing the logical validity of an argument',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c2_a8',
            kind: 'assignment',
            status: 'Ready',
            title: 'Mini Case Analysis',
            forLesson: 'Case Analysis',
            dueDate: 'Jul 23',
            submission: 'File or link upload',
            instructions:
              'Conduct a structured analysis of a real or hypothetical business situation using the SCQA framework. Submit a 400 – 500 word written analysis.',
            requirements: [
              'Explicitly label and complete all four SCQA components',
              'Apply at least one analytical framework (SWOT, stakeholder map, or cost-benefit) to support your answer',
              'State a clear, specific recommendation with one risk and how to mitigate it',
            ],
          },
        ],
      },
    ],
  },
];
