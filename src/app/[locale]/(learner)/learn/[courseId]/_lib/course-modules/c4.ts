import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 4: Australian Curriculum: STEM Foundation ────────────────────────

export const C4_MODULES: ReviewModule[] = [
  {
    id: 'c4_m1',
    title: 'Module 1: The Scientific Method',
    lessons: [
      {
        id: 'c4_l1',
        title: 'How Science Works',
        documents: [
          {
            id: 'c4_d1',
            kind: 'document',
            title: 'How Science Works',
            readTime: '5 – 7 min read',
            intro:
              'Science is a method for building reliable knowledge — not a collection of facts. Understanding the process is as important as the content.',
            objectives: [
              'Explain the steps of the scientific method and why each matters',
              'Distinguish between a hypothesis and a theory in scientific usage',
            ],
            sections: [
              {
                heading: 'The Scientific Method',
                text: 'The scientific method is a cycle: observe a phenomenon, ask a question, form a hypothesis (a testable prediction), design an experiment, collect data, analyse results, and draw a conclusion. If the conclusion contradicts the hypothesis, the hypothesis is revised — not the data. This cycle never fully ends; even well-supported theories are open to revision when new evidence emerges.',
                tip: 'A hypothesis is not a guess. It is a specific, testable prediction based on prior knowledge.',
              },
              {
                heading: 'Hypothesis vs. Theory',
                text: 'In everyday language, "theory" means a guess. In science, a theory is an explanation supported by a large body of evidence, tested repeatedly, and accepted by the scientific community. Evolution, gravity, and germ theory are theories — not guesses. A hypothesis is a specific prediction to be tested; a theory is what a confirmed body of evidence eventually supports.',
              },
            ],
            takeaways: [
              'The scientific method is a self-correcting cycle — conclusions are always open to revision by new evidence',
              'A scientific theory is well-supported by evidence, not merely a guess',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c4_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'How Science Works Quiz',
            forLesson: 'How Science Works',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of the scientific method and key scientific concepts.',
            questions: [
              {
                question: 'What is a hypothesis in science?',
                options: [
                  'A proven fact',
                  'A specific, testable prediction based on prior knowledge',
                  'A widely accepted explanation supported by extensive evidence',
                  'An opinion about an observation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'What happens in science when data contradicts a hypothesis?',
                options: [
                  'The data is discarded',
                  'The hypothesis is revised',
                  'The experiment is repeated until it confirms the hypothesis',
                  'The theory is accepted as final',
                ],
                correctIndex: 1,
              },
              {
                question: 'A scientific theory is best described as:',
                options: [
                  'A guess awaiting confirmation',
                  'An unproven idea in early stages',
                  'An explanation well-supported by a large body of tested evidence',
                  'A hypothesis that has been confirmed once',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which step comes immediately after forming a hypothesis?',
                options: [
                  'Drawing a conclusion',
                  'Collecting data',
                  'Designing an experiment',
                  'Publishing results',
                ],
                correctIndex: 2,
              },
              {
                question: 'What makes the scientific method reliable?',
                options: [
                  'Scientists always agree with each other',
                  'It is self-correcting — conclusions are open to revision when new evidence emerges',
                  'Experiments are always repeatable under any conditions',
                  'Only qualified scientists can use it',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Scientific Method Mapping',
            forLesson: 'How Science Works',
            dueDate: 'Jul 5',
            submission: 'Text response',
            instructions:
              'Choose a real scientific discovery (e.g. penicillin, vaccination, plate tectonics). Map the discovery onto the steps of the scientific method and explain how each step applied.',
            requirements: [
              'All steps of the scientific method identified with the discovery mapped to each',
              'Explain what the original hypothesis was and how evidence confirmed or revised it',
              'Identify whether the outcome is now considered a hypothesis or a theory, and why',
            ],
          },
        ],
      },
      {
        id: 'c4_l2',
        title: 'Data & Measurement',
        documents: [],
        videos: [
          {
            id: 'c4_v1',
            kind: 'video',
            title: 'Data & Measurement',
            duration: '14 min',
            intro:
              'Reliable science depends on reliable measurement. Learn how to collect, classify, and evaluate data quality.',
            topics: [
              'Quantitative vs. qualitative data — and when each is appropriate',
              'Accuracy, precision, and why they are different',
              'Variables: independent, dependent, and controlled',
              'Sources of measurement error and how to minimise them',
            ],
            moments: [
              { time: '0:00', label: 'Why measurement matters in science' },
              { time: '2:50', label: 'Quantitative vs. qualitative data' },
              { time: '6:20', label: 'Accuracy vs. precision explained' },
              { time: '10:40', label: 'Controlling variables' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c4_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Data & Measurement Quiz',
            forLesson: 'Data & Measurement',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your knowledge of data types, measurement quality, and experimental variables.',
            questions: [
              {
                question: 'Which of the following is quantitative data?',
                options: [
                  'The colour of a solution',
                  'The smell of a reaction',
                  'The temperature in degrees Celsius',
                  'A description of texture',
                ],
                correctIndex: 2,
              },
              {
                question: 'Accuracy refers to:',
                options: [
                  'How consistent repeated measurements are',
                  'How close a measurement is to the true value',
                  'The smallest unit a measuring tool can detect',
                  'The range of values in a dataset',
                ],
                correctIndex: 1,
              },
              {
                question: 'The independent variable in an experiment is:',
                options: [
                  'The variable the experimenter measures',
                  'The variable the experimenter changes deliberately',
                  'Variables kept the same in all conditions',
                  'The predicted outcome of the experiment',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Controlled variables are kept constant in an experiment to:',
                options: [
                  'Speed up data collection',
                  'Ensure changes in the dependent variable are caused only by the independent variable',
                  'Improve the accuracy of the measuring instrument',
                  'Reduce the sample size needed',
                ],
                correctIndex: 1,
              },
              {
                question: 'Precision in measurement means:',
                options: [
                  'The measurement is close to the true value',
                  'Repeated measurements give consistent results with each other',
                  'The measuring instrument is properly calibrated',
                  'Only one measurement is needed',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Variable Identification',
            forLesson: 'Data & Measurement',
            dueDate: 'Jul 7',
            submission: 'Text response',
            instructions:
              'Design the outline of an experiment to test whether plant growth is affected by the amount of sunlight received. Identify and justify all variables and the type of data you would collect.',
            requirements: [
              'Independent, dependent, and at least two controlled variables named and justified',
              'Data collection method described (what you measure, how, and how often)',
              'Explain whether accuracy or precision is harder to achieve in this experiment and why',
            ],
          },
        ],
      },
      {
        id: 'c4_l3',
        title: 'Experimental Design',
        documents: [
          {
            id: 'c4_d2',
            kind: 'document',
            title: 'Experimental Design',
            readTime: '4 – 6 min read',
            intro:
              'A well-designed experiment produces results you can trust. A poorly designed one produces noise that looks like data.',
            objectives: [
              'Design a fair test by controlling variables and using control groups',
              'Identify sources of bias that can invalidate experimental results',
            ],
            sections: [
              {
                heading: 'Fair Tests and Control Groups',
                text: 'A fair test changes only one variable at a time — the independent variable — while holding all others constant. A control group is identical to the experimental group except it does not receive the treatment. It provides a baseline that isolates the effect of the independent variable. Without a control group, you cannot know whether changes are caused by the treatment or by something else entirely.',
                tip: "Ask: what else could cause the change I'm observing? Each answer is a potential variable that needs to be controlled.",
              },
              {
                heading: 'Sources of Bias',
                text: 'Experimenter bias occurs when the researcher unconsciously influences results — for example, by measuring ambiguous outcomes differently depending on the expected result. Selection bias occurs when the sample is not representative of the population. Publication bias occurs when positive results are published and negative results are not — skewing the scientific record. Blind and double-blind designs eliminate the first; random sampling reduces the second.',
              },
            ],
            takeaways: [
              'A control group isolates the effect of the independent variable by providing a baseline',
              'Blind and double-blind designs counter experimenter bias',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c4_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Experimental Design Quiz',
            forLesson: 'Experimental Design',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your ability to design fair experiments and identify sources of bias.',
            questions: [
              {
                question: 'What is the purpose of a control group?',
                options: [
                  'To receive the strongest version of the treatment',
                  'To provide a baseline that isolates the effect of the independent variable',
                  'To increase the sample size',
                  'To test a secondary hypothesis',
                ],
                correctIndex: 1,
              },
              {
                question: 'A fair test changes:',
                options: [
                  'All variables simultaneously',
                  'Only one variable at a time while holding others constant',
                  'Only the dependent variable',
                  'The control group and experimental group equally',
                ],
                correctIndex: 1,
              },
              {
                question: 'Experimenter bias can be reduced by:',
                options: [
                  'Increasing the sample size',
                  'Using a blind or double-blind design',
                  'Repeating the experiment more times',
                  'Publishing the hypothesis before collecting data',
                ],
                correctIndex: 1,
              },
              {
                question: 'Selection bias occurs when:',
                options: [
                  'The experimenter influences the results',
                  'The sample is not representative of the population',
                  'Positive results are published more than negative ones',
                  'Data is collected with inaccurate instruments',
                ],
                correctIndex: 1,
              },
              {
                question: 'In a double-blind experiment:',
                options: [
                  'Neither participants nor researchers know who is in which group',
                  'Only the participants know which group they are in',
                  'Only the researchers know the group assignments',
                  'The control group is blind to the hypothesis',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Experiment Critique',
            forLesson: 'Experimental Design',
            dueDate: 'Jul 9',
            submission: 'Text response',
            instructions:
              'Find a simple experiment described in a news article, science blog, or textbook. Evaluate its design: identify the control group, list potential biases, and suggest one improvement.',
            requirements: [
              'Identify the independent variable, dependent variable, and control group',
              'Name at least two potential sources of bias in the experiment',
              'Propose one specific design change that would reduce the most serious bias',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c4_m2',
    title: 'Module 2: Technology & Engineering',
    lessons: [
      {
        id: 'c4_l4',
        title: 'Design Thinking in Engineering',
        documents: [],
        videos: [
          {
            id: 'c4_v2',
            kind: 'video',
            title: 'Design Thinking in Engineering',
            duration: '14 min',
            intro:
              'Engineering is structured problem-solving. Design thinking gives you a repeatable human-centred process.',
            topics: [
              'The five stages of design thinking: Empathise, Define, Ideate, Prototype, Test',
              'Why empathy comes first — understanding the user before designing the solution',
              'Rapid prototyping: cheap, fast tests before expensive commits',
              'Iteration: why the first design is always a draft',
            ],
            moments: [
              { time: '0:00', label: 'What is design thinking?' },
              { time: '2:40', label: 'Empathise and Define stages' },
              { time: '6:30', label: 'Ideate and rapid prototyping' },
              { time: '11:00', label: 'Testing and iteration cycles' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c4_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Design Thinking Quiz',
            forLesson: 'Design Thinking in Engineering',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of the design thinking process.',
            questions: [
              {
                question: 'The correct order of design thinking stages is:',
                options: [
                  'Define → Empathise → Ideate → Prototype → Test',
                  'Empathise → Define → Ideate → Prototype → Test',
                  'Ideate → Empathise → Define → Prototype → Test',
                  'Prototype → Empathise → Define → Ideate → Test',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Why does the design thinking process begin with empathy?',
                options: [
                  'It is the easiest stage to complete',
                  "Understanding the user's real needs prevents building the wrong solution",
                  'Empathy generates the most creative ideas',
                  'It is required by engineering standards',
                ],
                correctIndex: 1,
              },
              {
                question: 'Rapid prototyping means:',
                options: [
                  'Building the final product quickly',
                  'Creating cheap, fast versions to test ideas before expensive commits',
                  'Skipping the ideation stage',
                  'Using computer simulation only',
                ],
                correctIndex: 1,
              },
              {
                question: 'Iteration in engineering means:',
                options: [
                  'Repeating the same solution until it works',
                  'Refining and improving designs based on test feedback',
                  'Starting the project again from scratch',
                  'Testing only the final prototype',
                ],
                correctIndex: 1,
              },
              {
                question: 'In the Define stage, engineers:',
                options: [
                  'Build the first version of the product',
                  'Frame a clear problem statement based on what they learned during Empathise',
                  'Generate as many ideas as possible',
                  'Test the prototype with users',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design Challenge',
            forLesson: 'Design Thinking in Engineering',
            dueDate: 'Jul 12',
            submission: 'File or link upload',
            instructions:
              'Apply the five design thinking stages to a simple problem of your choice (e.g. a better water bottle, a school timetable, a public transport solution). Document each stage.',
            requirements: [
              'All five stages documented with specific outputs at each',
              'Problem statement written in the form: "How might we [action] for [user] so that [outcome]?"',
              'Simple prototype described (sketch, diagram, or physical model) with a test plan',
            ],
          },
        ],
      },
      {
        id: 'c4_l5',
        title: 'Introduction to Coding',
        documents: [
          {
            id: 'c4_d3',
            kind: 'document',
            title: 'Introduction to Coding',
            readTime: '5 – 6 min read',
            intro:
              'Code is how humans give precise instructions to computers. Understanding the fundamentals opens up every digital technology.',
            objectives: [
              'Understand what algorithms are and how they translate into code',
              'Identify four core programming concepts: variables, conditions, loops, and functions',
            ],
            sections: [
              {
                heading: 'Algorithms and Code',
                text: 'An algorithm is a precise, ordered sequence of steps for solving a problem. Code translates an algorithm into a language a computer can execute. Every program you use — from a search engine to a traffic light controller — is an algorithm expressed in code. The key to learning coding is learning to think algorithmically: breaking a complex problem into small, ordered, unambiguous steps.',
                tip: 'Before writing a single line of code, write the algorithm in plain English. The coding part is just translation.',
              },
              {
                heading: 'Four Core Concepts',
                text: 'Variables store data that can change during execution. Conditions (if/else) let the program make decisions based on data. Loops (for/while) repeat actions until a condition is met. Functions package a sequence of steps into a named block that can be reused. These four concepts appear in every programming language — learn them in any language and you understand the foundation of all of them.',
              },
            ],
            takeaways: [
              'Algorithmic thinking — breaking problems into ordered steps — is the core skill of coding',
              'Variables, conditions, loops, and functions are the four universal programming building blocks',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c4_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Introduction to Coding Quiz',
            forLesson: 'Introduction to Coding',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of core programming concepts.',
            questions: [
              {
                question: 'An algorithm is:',
                options: [
                  'A programming language',
                  'A precise, ordered sequence of steps for solving a problem',
                  'A type of computer hardware',
                  'A debugging tool',
                ],
                correctIndex: 1,
              },
              {
                question: 'A variable in programming is used to:',
                options: [
                  'Make a decision based on a condition',
                  'Repeat an action until a condition is met',
                  'Store data that can change during execution',
                  'Package steps into a reusable block',
                ],
                correctIndex: 2,
              },
              {
                question: 'A loop is used to:',
                options: [
                  'Store a data value for later use',
                  'Execute a sequence only if a condition is true',
                  'Repeat a set of actions until a condition is met',
                  'Name a reusable block of code',
                ],
                correctIndex: 2,
              },
              {
                question: 'Functions in code are primarily used to:',
                options: [
                  'Store numbers and strings',
                  'Make binary decisions',
                  'Create cycles in program execution',
                  'Package reusable steps into a named, callable block',
                ],
                correctIndex: 3,
              },
              {
                question: 'Which approach is recommended before writing code?',
                options: [
                  'Open the coding environment first',
                  'Write the algorithm in plain English before translating it',
                  'Choose the programming language first',
                  'Search for similar code online to copy',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Algorithm Design',
            forLesson: 'Introduction to Coding',
            dueDate: 'Jul 14',
            submission: 'Text response',
            instructions:
              'Write an algorithm in plain English for one of the following: making a cup of tea, sorting a list of names alphabetically, or finding the highest score in a list. Then identify which of the four core concepts (variables, conditions, loops, functions) you used.',
            requirements: [
              'Algorithm written in numbered, unambiguous steps',
              'At least two of the four core concepts identified and labelled in the algorithm',
              'Explain what would happen if one step were removed or changed',
            ],
          },
        ],
      },
      {
        id: 'c4_l6',
        title: 'Engineering Problem-Solving',
        documents: [],
        videos: [
          {
            id: 'c4_v3',
            kind: 'video',
            title: 'Engineering Problem-Solving',
            duration: '13 min',
            intro:
              'Engineers solve problems with constraints — budget, materials, time, safety. Learn how to work within constraints creatively.',
            topics: [
              'Defining engineering constraints and trade-offs',
              'Systems thinking: how components interact',
              'Failure analysis: what engineers learn from things that go wrong',
              'The role of safety factors in engineering design',
            ],
            moments: [
              { time: '0:00', label: 'Constraints as design inputs' },
              { time: '2:50', label: 'Systems thinking overview' },
              { time: '6:30', label: 'Failure analysis and learning' },
              { time: '10:20', label: 'Safety factors in practice' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c4_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Engineering Problem-Solving Quiz',
            forLesson: 'Engineering Problem-Solving',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your understanding of engineering constraints, systems thinking, and failure analysis.',
            questions: [
              {
                question: 'Engineering constraints are best thought of as:',
                options: [
                  'Obstacles that prevent creative solutions',
                  'Design inputs that shape and focus the solution space',
                  'Limitations set by clients with no technical basis',
                  'Rules that are usually bent in practice',
                ],
                correctIndex: 1,
              },
              {
                question: 'Systems thinking in engineering means:',
                options: [
                  'Following a systematic checklist',
                  'Understanding how components interact and affect each other',
                  'Testing one component in isolation',
                  'Designing systems that replace human workers',
                ],
                correctIndex: 1,
              },
              {
                question: 'Failure analysis helps engineers by:',
                options: [
                  'Assigning blame for design errors',
                  'Providing data for legal proceedings',
                  'Revealing how and why systems fail so future designs avoid the same issues',
                  'Documenting completed projects for compliance',
                ],
                correctIndex: 2,
              },
              {
                question: 'A safety factor in engineering design:',
                options: [
                  'Doubles the project timeline',
                  'Provides a margin between the expected load and the design capacity',
                  'Ensures the project stays under budget',
                  'Is required only for bridges and aircraft',
                ],
                correctIndex: 1,
              },
              {
                question: 'A trade-off in engineering design means:',
                options: [
                  'An engineer changes their mind about a solution',
                  'Choosing one design quality (speed, cost, strength) at the expense of another',
                  'Two engineers disagree on the best approach',
                  'The budget is cut during construction',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Constraint Analysis',
            forLesson: 'Engineering Problem-Solving',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Choose a real engineering structure or product (bridge, phone, water filtration system, etc.). Identify three constraints that shaped its design and one trade-off the engineers had to make.',
            requirements: [
              'Three constraints named with a brief explanation of how each shaped the design',
              'One specific trade-off explained: what was gained and what was sacrificed',
              'Identify one real or potential failure mode and what safety factor addresses it',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c4_m3',
    title: 'Module 3: Mathematical Thinking',
    lessons: [
      {
        id: 'c4_l7',
        title: 'Mathematical Reasoning',
        documents: [
          {
            id: 'c4_d4',
            kind: 'document',
            title: 'Mathematical Reasoning',
            readTime: '4 – 6 min read',
            intro:
              'Mathematics is a language for describing patterns and relationships. Mathematical reasoning is the ability to think precisely within that language.',
            objectives: [
              'Distinguish between deductive mathematical proof and numerical estimation',
              'Apply ratio and proportion reasoning to real-world quantitative problems',
            ],
            sections: [
              {
                heading: 'Proof vs. Estimation',
                text: 'A mathematical proof shows that something must be true for all cases — it leaves no room for exceptions. Numerical estimation shows that something is approximately true for the cases measured. Both are valuable: proof gives certainty, estimation gives speed. Engineers use estimation constantly (Fermi problems, order-of-magnitude checks) to catch errors before committing to calculation.',
                tip: 'Before solving any quantitative problem, estimate the answer first. If your calculation differs from your estimate by more than a factor of 10, check for an error.',
              },
              {
                heading: 'Ratio and Proportion',
                text: 'Ratio compares two quantities: 3:1 means one quantity is three times the other. Proportion states that two ratios are equal: 3/6 = 1/2. Proportional reasoning is the foundation of scaling (a map is a proportional model of reality), concentration (a 20% solution contains 20 g of solute per 100 g of solution), and percentage change. These appear in STEM, economics, and everyday decision-making.',
              },
            ],
            takeaways: [
              'Estimate first; if your calculation is wildly different, there is an error to find',
              'Proportional reasoning underpins scaling, concentration, and percentage — master it once, apply it everywhere',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c4_q7',
            kind: 'quiz',
            status: 'Ready',
            title: 'Mathematical Reasoning Quiz',
            forLesson: 'Mathematical Reasoning',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description: 'Test your mathematical reasoning skills.',
            questions: [
              {
                question:
                  'A mathematical proof is different from a numerical estimate because:',
                options: [
                  'Proofs use more complex equations',
                  'A proof shows something must be true for ALL cases, not just measured cases',
                  'Estimates are always more accurate',
                  'Proofs are only used in pure mathematics',
                ],
                correctIndex: 1,
              },
              {
                question: 'A ratio of 4:1 means:',
                options: [
                  'The two quantities are equal',
                  'One quantity is four times the other',
                  'The first quantity is one quarter of the second',
                  'The quantities differ by four units',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'If the ratio of students to teachers is 25:1 and there are 4 teachers, how many students are there?',
                options: ['21', '29', '100', '6'],
                correctIndex: 2,
              },
              {
                question: 'A 15% solution contains:',
                options: [
                  '15 g of solute per 1000 g of solution',
                  '15 g of solute per 100 g of solution',
                  '1.5 g of solute per 100 g of solution',
                  '15 g of solvent per 100 g of solution',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Order-of-magnitude estimation is used by engineers to:',
                options: [
                  'Produce the final answer for a report',
                  'Catch calculation errors before committing to detailed calculation',
                  'Replace mathematical proof',
                  'Impress clients with quick thinking',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a7',
            kind: 'assignment',
            status: 'Ready',
            title: 'Fermi Problem',
            forLesson: 'Mathematical Reasoning',
            dueDate: 'Jul 20',
            submission: 'Text response',
            instructions:
              'Estimate the answer to one Fermi problem: "How many piano tuners are there in Phnom Penh?" Show your reasoning step by step.',
            requirements: [
              'Estimate broken into numbered steps with each assumption stated',
              'Each assumption justified with a reasonable basis',
              'Final estimate given as an order of magnitude (e.g. "approximately 10–30")',
            ],
          },
        ],
      },
      {
        id: 'c4_l8',
        title: 'Applied Mathematics',
        documents: [],
        videos: [
          {
            id: 'c4_v4',
            kind: 'video',
            title: 'Applied Mathematics',
            duration: '14 min',
            intro:
              'Mathematics becomes powerful when it is applied to real problems — in data, engineering, finance, and science.',
            topics: [
              'Statistics fundamentals: mean, median, mode, and what each tells you',
              'Probability: calculating likelihood and using it in decisions',
              'Graph interpretation: reading trends, correlations, and outliers',
              'Using mathematics as a checking tool in engineering and science',
            ],
            moments: [
              { time: '0:00', label: 'Why applied mathematics matters' },
              { time: '2:40', label: 'Mean, median, mode in context' },
              { time: '6:20', label: 'Probability and decision-making' },
              { time: '10:30', label: 'Reading graphs and correlations' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c4_q8',
            kind: 'quiz',
            status: 'Ready',
            title: 'Applied Mathematics Quiz',
            forLesson: 'Applied Mathematics',
            totalQuestions: 5,
            estimatedMinutes: 7,
            description:
              'Test your ability to apply mathematical concepts to real-world problems.',
            questions: [
              {
                question: 'The median of a dataset is:',
                options: [
                  'The most frequently occurring value',
                  'The sum of all values divided by the count',
                  'The middle value when data is sorted in order',
                  'The difference between the largest and smallest values',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'Which measure is least affected by outliers (extreme values)?',
                options: ['Mean', 'Median', 'Range', 'Sum'],
                correctIndex: 1,
              },
              {
                question: 'A correlation between two variables means:',
                options: [
                  'One variable causes the other to change',
                  'The two variables tend to move together, but causation is not implied',
                  'The data is normally distributed',
                  'The relationship is linear',
                ],
                correctIndex: 1,
              },
              {
                question: 'A probability of 0.25 means an event:',
                options: [
                  'Will not happen',
                  'Will happen 25 times out of every 100',
                  'Is equally likely to happen or not',
                  'Is certain to happen',
                ],
                correctIndex: 1,
              },
              {
                question: 'An outlier in a dataset should be:',
                options: [
                  'Automatically removed from the analysis',
                  'Investigated to determine whether it represents real data or a measurement error',
                  'Treated as the most important data point',
                  'Replaced with the mean value',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c4_a8',
            kind: 'assignment',
            status: 'Ready',
            title: 'Data Interpretation',
            forLesson: 'Applied Mathematics',
            dueDate: 'Jul 23',
            submission: 'File or link upload',
            instructions:
              'Find a publicly available dataset (e.g. from a government website or news report). Calculate the mean and median, identify any outliers, and write a 200-word interpretation of what the data shows.',
            requirements: [
              'Mean and median calculated correctly and shown with working',
              'At least one outlier identified and explained',
              'Interpretation states one conclusion supported by the data and one limitation of the data',
            ],
          },
        ],
      },
    ],
  },
];
