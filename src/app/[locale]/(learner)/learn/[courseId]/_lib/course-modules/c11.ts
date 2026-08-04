import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 11: Advanced Research Methods ──────────────────────────────────────

export const C11_MODULES: ReviewModule[] = [
  {
    id: 'c11_m1',
    title: 'Module 1: Research Design',
    lessons: [
      {
        id: 'c11_l1',
        title: 'Research Questions & Design',
        documents: [
          {
            id: 'c11_d1',
            kind: 'document',
            title: 'Research Questions & Design',
            readTime: '5 – 6 min read',
            intro:
              'A research question determines everything that follows. A poorly formed question produces elegant methods applied to a meaningless answer.',
            objectives: [
              'Formulate a research question that is specific, answerable, and significant',
              'Select an appropriate research design (qualitative, quantitative, or mixed methods) for a given question',
            ],
            sections: [
              {
                heading: 'What Makes a Good Research Question',
                text: 'A good research question has four properties: (1) Specific — narrow enough to be answerable. "What causes poverty?" is a topic; "What is the relationship between maternal education and under-5 mortality in rural Cambodia 2015–2023?" is a question. (2) Answerable — there is a feasible method to collect the evidence needed. (3) Significant — the answer would contribute new knowledge or resolve a genuine debate. (4) Ethical — the research does not harm participants.',
                tip: 'Write your research question in a single sentence. If you cannot, the question is not yet specific enough.',
              },
              {
                heading: 'Qualitative vs. Quantitative Design',
                text: 'Quantitative research tests hypotheses using numerical data and statistical analysis — best for "how many," "how often," and "is there a relationship between." Qualitative research explores meaning, experience, and process using language, observation, and interpretation — best for "why," "how does it feel," and "what is happening here." Mixed methods use both. The choice is determined by the question, not by the researcher\'s preference.',
              },
            ],
            takeaways: [
              'A research question must be specific, answerable, significant, and ethical — not just interesting',
              'The research question determines the design; qualitative explores meaning, quantitative tests hypotheses',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c11_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Research Design Quiz',
            forLesson: 'Research Questions & Design',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your ability to formulate research questions and select designs.',
            questions: [
              {
                question:
                  'Which of the following is the strongest research question?',
                options: [
                  '"What causes climate change?"',
                  '"How does climate change affect people?"',
                  '"What is the association between urban heat island temperature and heat-related hospitalisations in Phnom Penh 2018–2022?"',
                  '"Is climate change a global problem?"',
                ],
                correctIndex: 2,
              },
              {
                question: 'Qualitative research is most appropriate for:',
                options: [
                  'Testing whether a drug reduces blood pressure',
                  'Counting the frequency of a behaviour in a large population',
                  'Exploring how refugees experience the asylum process',
                  'Comparing test scores across school districts',
                ],
                correctIndex: 2,
              },
              {
                question: 'A research question is "answerable" if:',
                options: [
                  'The answer is already known',
                  'There is a feasible method to collect the evidence needed to answer it',
                  'It can be answered with a yes or no',
                  'Most people in the field agree on the answer',
                ],
                correctIndex: 1,
              },
              {
                question: 'Mixed methods research is most valuable when:',
                options: [
                  'The researcher has more funding than needed for one approach',
                  "One method can confirm the other's findings",
                  'The question requires both hypothesis testing and meaning exploration',
                  'The field has no existing quantitative data',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Research Question Development',
            forLesson: 'Research Questions & Design',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Starting from a broad topic of your choice, narrow it to a specific research question in three iterations. Justify your final design choice (qualitative, quantitative, or mixed methods).',
            requirements: [
              'Three successive iterations shown with each refinement explained',
              'Final question assessed against all four quality criteria',
              'Design choice justified with reference to what the question requires',
            ],
          },
        ],
      },
      {
        id: 'c11_l2',
        title: 'Literature Review',
        documents: [],
        videos: [
          {
            id: 'c11_v1',
            kind: 'video',
            title: 'Conducting a Literature Review',
            duration: '13 min',
            intro:
              'A literature review is not a summary of everything ever written on a topic. It is a structured argument about the state of knowledge and where your study contributes.',
            topics: [
              'Systematic vs. narrative literature reviews — when to use each',
              'Database search strategy: keywords, Boolean operators, and filters',
              'Critical evaluation of sources: authority, currency, and methodological quality',
              'Synthesising literature into an argument, not a list of summaries',
            ],
            moments: [
              { time: '0:00', label: 'What a literature review actually is' },
              { time: '2:50', label: 'Systematic vs. narrative review' },
              { time: '6:30', label: 'Search strategy and source quality' },
              { time: '10:20', label: 'Synthesis as argument' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c11_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Literature Review Quiz',
            forLesson: 'Literature Review',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of literature review methods.',
            questions: [
              {
                question:
                  'A systematic literature review differs from a narrative review by:',
                options: [
                  'Including more sources',
                  'Using a reproducible, pre-specified search strategy to minimise bias',
                  'Focusing on more recent publications',
                  'Being conducted by a team rather than an individual',
                ],
                correctIndex: 1,
              },
              {
                question: 'The Boolean operator "AND" in a database search:',
                options: [
                  'Broadens the search by including either term',
                  'Narrows the search by requiring both terms to appear',
                  'Excludes the second term from results',
                  'Is interchangeable with "OR"',
                ],
                correctIndex: 1,
              },
              {
                question: 'Synthesis in a literature review means:',
                options: [
                  'Providing a summary of each source in sequence',
                  'Building an argument from across sources about what is known and contested',
                  'Including only peer-reviewed sources',
                  'Translating sources from other languages',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The "currency" criterion for evaluating a source refers to:',
                options: [
                  'Whether the publication is in a high-impact journal',
                  'Whether the information is recent enough to be relevant for the current question',
                  'Whether the source is freely accessible',
                  'Whether the author is currently active in the field',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Mini Literature Review',
            forLesson: 'Literature Review',
            dueDate: 'Jul 10',
            submission: 'File or link upload',
            instructions:
              'Conduct a targeted literature search on your research question from Lesson 1. Find five relevant sources, evaluate each for quality, and write a 300-word synthesis that identifies what is known and what is contested.',
            requirements: [
              'Five sources cited with quality evaluation for each (authority, currency, methodology)',
              'Synthesis written as an argument, not a source-by-source summary',
              'The gap your research question addresses identified from the synthesis',
            ],
          },
        ],
      },
      {
        id: 'c11_l3',
        title: 'Ethical Research Practice',
        documents: [
          {
            id: 'c11_d2',
            kind: 'document',
            title: 'Ethical Research Practice',
            readTime: '4 – 5 min read',
            intro:
              'Research ethics protects participants, preserves the integrity of knowledge, and maintains public trust in research institutions.',
            objectives: [
              'Apply the four principles of research ethics to a study design',
              'Identify when informed consent processes require special attention',
            ],
            sections: [
              {
                heading: 'Four Principles of Research Ethics',
                text: 'Beneficence: the research should produce benefit. Non-maleficence: the research should not harm. Autonomy: participants should make an informed, voluntary choice to participate. Justice: the burdens and benefits of research should be distributed fairly — vulnerable populations should not bear disproportionate research burden for benefits that accrue to others.',
                tip: 'In research with vulnerable populations (children, prisoners, refugees), assume a higher ethical standard is required unless you can specifically argue otherwise.',
              },
              {
                heading: 'Informed Consent',
                text: 'Informed consent requires that participants understand: (1) what the research involves, (2) the foreseeable risks and benefits, (3) that participation is voluntary and can be withdrawn at any time, (4) how their data will be used and protected, and (5) who to contact with concerns. Written consent is the standard; verbal consent is acceptable when literacy is limited, when the population is culturally averse to written agreements, or when requiring it creates greater risk than it prevents.',
              },
            ],
            takeaways: [
              'Four principles: beneficence, non-maleficence, autonomy, justice — all must be satisfied',
              'Informed consent has five elements; written is standard but verbal is acceptable in specified contexts',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c11_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Research Ethics Quiz',
            forLesson: 'Ethical Research Practice',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of research ethics principles.',
            questions: [
              {
                question: 'The justice principle in research ethics requires:',
                options: [
                  'All research data to be made publicly available',
                  'That burdens and benefits of research are distributed fairly across populations',
                  'Equal pay for research participants',
                  'Justice sector approval before conducting research on crime',
                ],
                correctIndex: 1,
              },
              {
                question: 'Informed consent requires that participation is:',
                options: [
                  'Confirmed in writing under all circumstances',
                  'Mandatory for research to proceed',
                  'Voluntary and can be withdrawn at any time without penalty',
                  'Irreversible once given',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'When conducting research with refugees, you should assume:',
                options: [
                  'Standard ethical protocols are sufficient',
                  "A higher ethical standard is required given the population's vulnerability",
                  'Verbal consent is never appropriate',
                  'Government approval replaces ethics board review',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Verbal rather than written consent is appropriate when:',
                options: [
                  'The researcher prefers a simpler process',
                  'Requiring written consent would create greater risk than it prevents (e.g. in contexts with political risk)',
                  'Participants are over 18',
                  'The research is funded by government',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Ethics Review',
            forLesson: 'Ethical Research Practice',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Write an ethics review for your research question from Lesson 1. Apply all four principles and design an appropriate informed consent process.',
            requirements: [
              'All four principles addressed with specific risks and mitigations for this study',
              'Informed consent process designed with all five elements included',
              'Identify the most significant ethical risk and how you would manage it',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c11_m2',
    title: 'Module 2: Data Collection & Analysis',
    lessons: [
      {
        id: 'c11_l4',
        title: 'Qualitative Methods',
        documents: [],
        videos: [
          {
            id: 'c11_v2',
            kind: 'video',
            title: 'Qualitative Data Collection Methods',
            duration: '14 min',
            intro:
              'Qualitative methods generate rich data about meaning, experience, and context. Learn to design and conduct effective interviews and focus groups.',
            topics: [
              'Semi-structured interviews: design and practice',
              'Focus groups: facilitation and group dynamics',
              'Observation and ethnography: being in the field',
              'Thematic analysis: moving from data to findings',
            ],
            moments: [
              { time: '0:00', label: 'Qualitative methods overview' },
              { time: '2:50', label: 'Semi-structured interview design' },
              { time: '7:00', label: 'Focus group facilitation' },
              { time: '11:00', label: 'Thematic analysis introduction' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c11_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Qualitative Methods Quiz',
            forLesson: 'Qualitative Methods',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of qualitative data collection and analysis.',
            questions: [
              {
                question:
                  'A semi-structured interview guide is "semi-structured" because:',
                options: [
                  'It is half the length of a structured interview',
                  'It has prepared questions but allows probing and follow-up based on responses',
                  'It is conducted in two sessions',
                  'Questions are given to the participant in advance',
                ],
                correctIndex: 1,
              },
              {
                question: 'Focus groups are most useful for:',
                options: [
                  'Collecting sensitive personal information',
                  'Exploring shared experiences and social norms within a group',
                  'Establishing statistical prevalence of a behaviour',
                  'Confirming findings from quantitative analysis',
                ],
                correctIndex: 1,
              },
              {
                question: 'Thematic analysis involves:',
                options: [
                  'Counting the frequency of words in interview transcripts',
                  'Identifying patterns of meaning across qualitative data to construct themes',
                  'Analysing the tone and sentiment of participant responses',
                  'Testing a pre-specified set of themes against interview data',
                ],
                correctIndex: 1,
              },
              {
                question: 'Saturation in qualitative research means:',
                options: [
                  'The researcher has interviewed the maximum possible sample',
                  'New data is no longer producing new themes — the theoretical model is complete',
                  'The data has been analysed by three independent researchers',
                  'All planned participants have been interviewed',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Interview Guide Design',
            forLesson: 'Qualitative Methods',
            dueDate: 'Jul 15',
            submission: 'File or link upload',
            instructions:
              'Design a semi-structured interview guide for your research question. Include an opening, 6–8 main questions, and a closing. Write three probing follow-up questions.',
            requirements: [
              'Guide opens with a rapport-building, non-threatening question',
              'Main questions are open-ended and ordered from general to specific',
              'Three probing questions designed to deepen responses to your most critical question',
            ],
          },
        ],
      },
      {
        id: 'c11_l5',
        title: 'Quantitative Analysis',
        documents: [
          {
            id: 'c11_d3',
            kind: 'document',
            title: 'Quantitative Analysis',
            readTime: '5 – 6 min read',
            intro:
              'Quantitative analysis transforms numbers into findings. Understanding which analysis fits your research question — and how to interpret the output — is the core skill.',
            objectives: [
              'Select appropriate statistical tests for common research questions',
              'Interpret the output of descriptive and inferential statistics correctly',
            ],
            sections: [
              {
                heading: 'Descriptive vs. Inferential Statistics',
                text: 'Descriptive statistics summarise your sample: measures of central tendency (mean, median, mode), measures of spread (range, standard deviation, variance), and frequencies and proportions. Inferential statistics make inferences from your sample to a larger population: t-tests compare means between two groups; ANOVA compares means across three or more groups; correlation measures the strength and direction of the relationship between two variables; regression predicts one variable from others.',
                tip: 'Always examine your data visually (histogram, scatter plot) before running inferential tests. Visual inspection catches distributional violations that invalidate many statistical assumptions.',
              },
              {
                heading: 'Interpreting p-values and Confidence Intervals',
                text: 'A p-value of 0.03 means: if there were no true effect, results this extreme would occur by chance 3% of the time. It does not mean "there is a 97% probability the hypothesis is true." Confidence intervals are often more informative: a 95% CI of [1.2, 3.4] for a treatment effect means you are 95% confident the true effect falls in this range. A narrow CI indicates a precise estimate; a wide CI indicates substantial uncertainty.',
              },
            ],
            takeaways: [
              'Always visualise data before running inferential statistics — distributional violations are most visible graphically',
              'A p-value is not a probability that the hypothesis is true — it is the probability of results this extreme if there were no effect',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c11_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Quantitative Analysis Quiz',
            forLesson: 'Quantitative Analysis',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of quantitative research methods.',
            questions: [
              {
                question: 'An ANOVA is appropriate when:',
                options: [
                  'Comparing means between exactly two groups',
                  'Measuring the strength of a relationship between two variables',
                  'Comparing means across three or more groups',
                  'Predicting a continuous outcome from multiple variables',
                ],
                correctIndex: 2,
              },
              {
                question: 'A p-value of 0.03 correctly means:',
                options: [
                  'There is a 97% probability the hypothesis is true',
                  'The result would occur by chance 3% of the time if there were no true effect',
                  'The effect size is meaningful',
                  'The result is 3% more significant than the threshold',
                ],
                correctIndex: 1,
              },
              {
                question: 'Standard deviation measures:',
                options: [
                  'The middle value in a dataset',
                  'How far data points are spread around the mean on average',
                  'The most common value in a dataset',
                  'The difference between the highest and lowest values',
                ],
                correctIndex: 1,
              },
              {
                question: 'A confidence interval that is very wide indicates:',
                options: [
                  'A large effect size',
                  'High statistical significance',
                  'Substantial uncertainty in the estimate',
                  'A very large sample was used',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Statistical Analysis Plan',
            forLesson: 'Quantitative Analysis',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Write a statistical analysis plan for a quantitative version of your research question. Specify the test you would use, the variables involved, and how you would interpret the result.',
            requirements: [
              'Research question restated in testable quantitative form',
              'Statistical test chosen with justification (what type of data, how many groups)',
              'Interpretation template: "If p < 0.05 and the effect is [direction], this means..."',
            ],
          },
        ],
      },
      {
        id: 'c11_l6',
        title: 'Writing & Disseminating Research',
        documents: [],
        videos: [
          {
            id: 'c11_v3',
            kind: 'video',
            title: 'Writing & Disseminating Research',
            duration: '12 min',
            intro:
              'Research that is not communicated is research that does not exist. Learn to write and position findings for maximum reach and impact.',
            topics: [
              'Structure of a research report: IMRaD and when to use it',
              'Writing for different audiences: academic, policy, and practitioner',
              'Open access and knowledge equity in research dissemination',
              "From findings to recommendations: the researcher's responsibility",
            ],
            moments: [
              { time: '0:00', label: 'IMRaD structure explained' },
              {
                time: '3:00',
                label: 'Writing for academic vs. policy audiences',
              },
              { time: '6:30', label: 'Open access and dissemination strategy' },
              { time: '10:00', label: 'Findings to recommendations' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c11_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Research Dissemination Quiz',
            forLesson: 'Writing & Disseminating Research',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of research writing and dissemination.',
            questions: [
              {
                question: 'IMRaD stands for:',
                options: [
                  'Introduction, Methodology, Results and Discussion',
                  'Introduction, Methods, Results and Discussion',
                  'Issue, Method, Research and Data',
                  'Introduction, Model, Results and Data',
                ],
                correctIndex: 1,
              },
              {
                question: 'A policy brief differs from an academic paper by:',
                options: [
                  'Being shorter and using more technical language',
                  'Leading with findings and recommendations rather than methodology',
                  'Not including a methods section',
                  'Being written by practitioners rather than researchers',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "The researcher's responsibility when moving from findings to recommendations is to:",
                options: [
                  'Make strong recommendations even when evidence is weak',
                  'State what the evidence supports, acknowledge its limits, and recommend actions proportional to the strength of evidence',
                  'Leave recommendations to policymakers',
                  "Ensure recommendations align with the funder's priorities",
                ],
                correctIndex: 1,
              },
              {
                question: 'Open access publishing is valued because:',
                options: [
                  'It is free for researchers to submit',
                  'It makes research available to communities who cannot afford journal subscriptions, including those studied',
                  'It guarantees faster peer review',
                  'It is required for government-funded research globally',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c11_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Research Summary',
            forLesson: 'Writing & Disseminating Research',
            dueDate: 'Jul 19',
            submission: 'File or link upload',
            instructions:
              'Write a 400-word research summary for two audiences: (1) an academic abstract; (2) a policy brief opening. The content should be the same research; the format and language should differ.',
            requirements: [
              'Academic abstract follows IMRaD structure in condensed form',
              'Policy brief leads with findings and recommendations in plain language',
              'Both versions address the same core findings but use different vocabulary and emphasis',
            ],
          },
        ],
      },
    ],
  },
];
