import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course 3: Public Speaking Mastery ────────────────────────────────────────

export const C3_MODULES: ReviewModule[] = [
  {
    id: 'c3_m1',
    title: 'Module 1: Speaking Foundations',
    lessons: [
      {
        id: 'c3_l1',
        title: 'Overcoming Stage Fright',
        documents: [
          {
            id: 'c3_d1',
            kind: 'document',
            title: 'Overcoming Stage Fright',
            readTime: '4 – 6 min read',
            intro:
              'Stage fright is universal — and manageable. Learn what causes it and how to redirect it into performance energy.',
            objectives: [
              'Understand the physiological basis of stage fright',
              'Apply three proven techniques to manage anxiety before and during a talk',
            ],
            sections: [
              {
                heading: 'Why Stage Fright Happens',
                text: 'Stage fright is your fight-or-flight response triggered by perceived threat — in this case, social evaluation. Your body releases adrenaline, raising your heart rate and sharpening your senses. This is not a malfunction; it is preparation. The difference between nervous speakers and confident ones is not the absence of adrenaline — it is what they do with it.',
                tip: 'Reframe "I am nervous" as "I am excited." The physiological state is identical; the label changes how you perform.',
              },
              {
                heading: 'Three Techniques That Work',
                text: 'First: controlled breathing — four counts in, hold four, out four — activates the parasympathetic nervous system and slows the physical symptoms. Second: power posing for two minutes before going on stage reduces cortisol and increases confidence. Third: preparation — the single strongest predictor of reduced anxiety is knowing your material so well that delivery becomes automatic.',
              },
            ],
            takeaways: [
              'Stage fright is adrenaline — redirect it rather than suppress it',
              'Preparation is the most reliable cure for presentation anxiety',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c3_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Overcoming Stage Fright Quiz',
            forLesson: 'Overcoming Stage Fright',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your understanding of stage fright and how to manage it.',
            questions: [
              {
                question: 'Stage fright is caused by:',
                options: [
                  'A character flaw',
                  'The fight-or-flight response triggered by perceived social evaluation',
                  'Lack of intelligence',
                  'Too much preparation',
                ],
                correctIndex: 1,
              },
              {
                question: 'Controlled breathing helps with stage fright by:',
                options: [
                  'Eliminating adrenaline',
                  'Activating the parasympathetic nervous system',
                  'Making you speak faster',
                  'Replacing preparation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Reframing "I am nervous" as "I am excited" works because:',
                options: [
                  'Excitement is easier to feel',
                  'The physiological state is identical — only the label changes',
                  'It suppresses the fear response',
                  'Audiences prefer excited speakers',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The strongest predictor of reduced presentation anxiety is:',
                options: [
                  'Memorising a script word-for-word',
                  'Knowing your material so well that delivery becomes automatic',
                  'Avoiding eye contact with the audience',
                  'Speaking in front of a mirror daily',
                ],
                correctIndex: 1,
              },
              {
                question: 'Power posing before a talk is reported to:',
                options: [
                  'Slow heart rate to zero',
                  'Reduce cortisol and increase confidence',
                  'Replace the need for preparation',
                  'Eliminate all nerves permanently',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Anxiety Audit',
            forLesson: 'Overcoming Stage Fright',
            dueDate: 'Jul 5',
            submission: 'Text response',
            instructions:
              'Describe a past speaking situation where you felt nervous. Identify what triggered it and apply two techniques from this lesson to reframe the experience.',
            requirements: [
              'Identify the specific trigger (evaluation, unfamiliar topic, large audience, etc.)',
              'Explain how you would apply two techniques from the lesson',
              'State one concrete change you will make before your next public talk',
            ],
          },
        ],
      },
      {
        id: 'c3_l2',
        title: 'Structuring Your Talk',
        documents: [],
        videos: [
          {
            id: 'c3_v1',
            kind: 'video',
            title: 'Structuring Your Talk',
            duration: '14 min',
            intro:
              'A clear structure is what separates a talk people remember from one they forget.',
            topics: [
              'The three-part structure: opening hook, core argument, call to action',
              'The rule of three: why three points are easier to remember than four',
              'Signposting — verbal cues that help audiences follow along',
              'How to craft a strong opening and a memorable close',
            ],
            moments: [
              { time: '0:00', label: 'Why structure determines recall' },
              { time: '3:00', label: 'Opening hook techniques' },
              { time: '7:30', label: 'The rule of three' },
              { time: '11:40', label: 'Signposting and strong closes' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c3_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Structuring Your Talk Quiz',
            forLesson: 'Structuring Your Talk',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description: 'Test your knowledge of effective talk structure.',
            questions: [
              {
                question: 'The three-part talk structure consists of:',
                options: [
                  'Introduction, examples, conclusion',
                  'Opening hook, core argument, call to action',
                  'Problem, solution, evidence',
                  'Greeting, content, goodbye',
                ],
                correctIndex: 1,
              },
              {
                question: 'Why does the rule of three work for audiences?',
                options: [
                  'Three points fill a 10-minute slot',
                  'Human working memory handles three chunks well',
                  'Audiences expect exactly three points',
                  'Three is always the correct number of ideas',
                ],
                correctIndex: 1,
              },
              {
                question: 'Signposting in a talk means:',
                options: [
                  'Using presentation slides',
                  'Verbal cues that tell the audience where you are in the structure',
                  'Pointing at visual aids frequently',
                  'Repeating your opening hook',
                ],
                correctIndex: 1,
              },
              {
                question: 'A strong opening hook should:',
                options: [
                  'Thank the audience for attending',
                  'Review the agenda in detail',
                  'Capture attention immediately and establish relevance',
                  'Introduce all three points upfront',
                ],
                correctIndex: 2,
              },
              {
                question: 'A strong close should:',
                options: [
                  'Summarise every point made',
                  'End with "any questions?"',
                  'Restate the opening hook and deliver a clear call to action',
                  'Trail off naturally to signal the end',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Talk Outline',
            forLesson: 'Structuring Your Talk',
            dueDate: 'Jul 7',
            submission: 'File or link upload',
            instructions:
              'Create a structured outline for a 5-minute talk on a topic of your choice. Include the opening hook, three core points with supporting evidence, and a call to action.',
            requirements: [
              'Opening hook written in full (not just described)',
              'Three main points each supported by one piece of evidence',
              'Call to action that is specific and actionable',
            ],
          },
        ],
      },
      {
        id: 'c3_l3',
        title: 'Voice & Delivery',
        documents: [],
        videos: [
          {
            id: 'c3_v2',
            kind: 'video',
            title: 'Voice & Delivery',
            duration: '12 min',
            intro:
              'Your voice is your primary instrument as a speaker. Learn to use pace, pitch, and pause deliberately.',
            topics: [
              'Vocal variety: pace, pitch, and volume',
              'The power of the deliberate pause',
              'Eliminating filler words (um, uh, like, so)',
              'Eye contact and physical presence on stage',
            ],
            moments: [
              { time: '0:00', label: 'Your voice as an instrument' },
              { time: '2:30', label: 'Pace, pitch, and volume in practice' },
              { time: '6:00', label: 'Using pauses deliberately' },
              { time: '9:30', label: 'Eye contact and stage presence' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c3_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Voice & Delivery Quiz',
            forLesson: 'Voice & Delivery',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your understanding of vocal delivery techniques.',
            questions: [
              {
                question: 'Vocal variety refers to:',
                options: [
                  'Using different accents',
                  'Varying pace, pitch, and volume to sustain audience interest',
                  'Switching languages for effect',
                  'Speaking at a consistent rate',
                ],
                correctIndex: 1,
              },
              {
                question: 'A deliberate pause in a speech is used to:',
                options: [
                  'Fill silence while remembering the next point',
                  'Emphasise a point and give the audience time to absorb it',
                  'Indicate the talk is nearly over',
                  'Signal a topic change to a new slide',
                ],
                correctIndex: 1,
              },
              {
                question: 'Filler words (um, uh, like) are best eliminated by:',
                options: [
                  'Speaking faster so they go unnoticed',
                  'Replacing them with deliberate pauses',
                  'Writing out every word in full and memorising it',
                  'Only speaking on familiar topics',
                ],
                correctIndex: 1,
              },
              {
                question: 'Effective eye contact in a talk means:',
                options: [
                  'Staring at one friendly audience member throughout',
                  'Looking briefly at individuals across different parts of the room',
                  "Looking slightly above the audience's heads",
                  'Focusing on slides rather than people',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Speaking too fast in a presentation signals to the audience:',
                options: [
                  'Confidence and expertise',
                  'Anxiety or insufficient preparation time',
                  'Enthusiasm for the topic',
                  'That you respect their time',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Recorded Delivery Practice',
            forLesson: 'Voice & Delivery',
            dueDate: 'Jul 9',
            submission: 'File or link upload',
            instructions:
              'Record a 2-minute section of a talk on any topic. Submit the recording or a written self-assessment identifying three delivery strengths and two areas to improve.',
            requirements: [
              'Assess your pace, pitch, and use of pauses specifically',
              'Count filler words used and set a target for your next attempt',
              'Describe one physical delivery change (eye contact, posture, gesture) you will practise',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c3_m2',
    title: 'Module 2: Advanced Techniques',
    lessons: [
      {
        id: 'c3_l4',
        title: 'Storytelling for Speakers',
        documents: [
          {
            id: 'c3_d2',
            kind: 'document',
            title: 'Storytelling for Speakers',
            readTime: '4 – 5 min read',
            intro:
              'Stories activate more of the brain than statistics. Learn how to use narrative to make your message stick.',
            objectives: [
              "Identify the five elements of a compelling speaker's story",
              'Apply story structure to turn a data point into a memorable narrative',
            ],
            sections: [
              {
                heading: 'Why Stories Work',
                text: 'When you hear a statistic, only the language processing areas of your brain activate. When you hear a story, the sensory and motor cortex also light up — you literally experience the narrative. This is why audiences remember "a nurse who saved a child" long after they forget "healthcare worker retention statistics." Stories create memory through experience.',
                tip: 'For every key data point in your talk, ask: is there a human story that makes this number real?',
              },
              {
                heading: 'The Five Elements',
                text: "A memorable speaker's story needs: a relatable protagonist (not necessarily yourself), a specific situation or moment (not a vague generalisation), a conflict or tension (what was at stake), a turning point (what changed), and a clear takeaway tied to your argument. Missing any one of these makes the story feel incomplete.",
              },
            ],
            takeaways: [
              'Stories engage more brain regions than facts — they create memory through experience',
              "Every speaker's story needs: protagonist, situation, conflict, turning point, takeaway",
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c3_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Storytelling Quiz',
            forLesson: 'Storytelling for Speakers',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your understanding of storytelling techniques for public speaking.',
            questions: [
              {
                question: 'Why do stories improve message retention?',
                options: [
                  'They are shorter than data',
                  'They activate more brain regions including sensory and motor cortex',
                  'Audiences prefer entertainment to information',
                  'Stories are less challenging to prepare',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Which element creates the emotional engagement in a speaker's story?",
                options: [
                  "The protagonist's name",
                  'The conflict or tension — what was at stake',
                  'The number of people involved',
                  "The speaker's personal opinion",
                ],
                correctIndex: 1,
              },
              {
                question: 'The "turning point" in a story refers to:',
                options: [
                  'When the speaker changes topic',
                  'The moment something changes for the protagonist',
                  'The call to action at the end',
                  'The introduction of a second character',
                ],
                correctIndex: 1,
              },
              {
                question: 'A story in a talk must end with:',
                options: [
                  'Applause from the audience',
                  'A clear takeaway tied to your core argument',
                  'A question for the audience',
                  'A description of what happened next',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'To make a statistic memorable in a talk, you should:',
                options: [
                  'Display it in a large font on a slide',
                  'Repeat it three times',
                  'Pair it with a human story that illustrates the number',
                  'Use a more impressive-sounding statistic',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Story Design',
            forLesson: 'Storytelling for Speakers',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design a 90-second story you could use in a professional talk. Apply all five elements from the lesson and show how the story connects to a specific argument.',
            requirements: [
              'All five story elements labelled explicitly',
              'Story length: 200 – 250 words written out in full',
              'One sentence explaining which argument the story supports',
            ],
          },
        ],
      },
      {
        id: 'c3_l5',
        title: 'Slides & Visual Aids',
        documents: [],
        videos: [
          {
            id: 'c3_v3',
            kind: 'video',
            title: 'Slides & Visual Aids',
            duration: '11 min',
            intro:
              'Most slides hurt more than they help. Learn to design visuals that support your message instead of replacing it.',
            topics: [
              'The "slide as aid" principle: you are the presentation, not the slides',
              'One idea per slide: why density kills comprehension',
              'When to use text, visuals, and data charts',
              'The slide design principles that always work',
            ],
            moments: [
              { time: '0:00', label: 'Why most slides are harmful' },
              { time: '2:20', label: 'One idea per slide' },
              { time: '5:40', label: 'Choosing text vs. visuals' },
              { time: '8:30', label: 'Design principles that always work' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c3_q5',
            kind: 'quiz',
            status: 'Ready',
            title: 'Slides & Visual Aids Quiz',
            forLesson: 'Slides & Visual Aids',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your understanding of effective slide design principles.',
            questions: [
              {
                question: 'The "slide as aid" principle means:',
                options: [
                  'Slides should contain all your talk content',
                  'You are the presentation — slides support, not replace, your message',
                  'Visual aids are optional for short talks',
                  'Slides should always use bullet points',
                ],
                correctIndex: 1,
              },
              {
                question: 'Why does density on slides kill comprehension?',
                options: [
                  'Audiences read slower than speakers talk',
                  'Audiences cannot split attention between reading and listening effectively',
                  'Dense slides indicate poor preparation',
                  'Fonts become too small on large screens',
                ],
                correctIndex: 1,
              },
              {
                question: 'The one-idea-per-slide principle means:',
                options: [
                  'You need more slides than usual',
                  'Each slide communicates a single clear point',
                  'Slides should have one word each',
                  'Topics should never span more than one slide',
                ],
                correctIndex: 1,
              },
              {
                question: 'When is a data chart most appropriate on a slide?',
                options: [
                  'When you want to impress with complex data',
                  "When a visual comparison makes the data's meaning faster to grasp",
                  'As a substitute for explaining the data verbally',
                  'When you have no other content for that slide',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Which slide design principle always improves clarity?',
                options: [
                  'Use at least three different font styles per slide',
                  'Maximise the amount of content to show thoroughness',
                  'High contrast between text and background',
                  'Include your logo and date on every slide',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a5',
            kind: 'assignment',
            status: 'Ready',
            title: 'Slide Redesign',
            forLesson: 'Slides & Visual Aids',
            dueDate: 'Jul 14',
            submission: 'File or link upload',
            instructions:
              'Take any existing slide deck (your own or a public one) and redesign three slides applying the principles from this lesson. Submit before/after screenshots with a written explanation of each change.',
            requirements: [
              'Three before/after slide pairs submitted',
              'Each change explained using a principle from the lesson',
              'At least one slide changed from text-heavy to visual-first',
            ],
          },
        ],
      },
      {
        id: 'c3_l6',
        title: 'Audience Engagement',
        documents: [
          {
            id: 'c3_d3',
            kind: 'document',
            title: 'Audience Engagement',
            readTime: '4 – 5 min read',
            intro:
              'An engaged audience listens more deeply and retains more. Learn proven techniques for keeping them active throughout your talk.',
            objectives: [
              'Apply at least three audience engagement techniques appropriate to different talk formats',
              'Handle unexpected audience reactions calmly and professionally',
            ],
            sections: [
              {
                heading: 'Engagement Techniques',
                text: 'Rhetorical questions force mental participation: "How many of you have sat through a 90-minute presentation and retained almost nothing?" You don\'t need a raised hand — the audience answers internally. Polling (show-of-hands or digital) creates investment. Strategic pauses after key points give the audience time to make their own connections. References to the specific audience (their industry, their city, their role) signal that this talk was prepared for them.',
                tip: 'Use audience engagement early — the first two minutes determine whether people are with you for the whole talk.',
              },
              {
                heading: 'Handling Unexpected Reactions',
                text: 'A hostile question, a technical failure, or audience laughter at the wrong moment — these happen. The key is not to panic or apologise excessively. Pause, breathe, and respond calmly. For hostile questions: acknowledge the perspective ("That\'s a fair challenge"), answer directly without defensiveness, and move on. Never argue with an audience member. Offer to continue the discussion offline if needed.',
              },
            ],
            takeaways: [
              'Engagement techniques (rhetorical questions, polling, pauses, audience references) activate active listening',
              'Respond to unexpected reactions calmly: pause, acknowledge, answer, move on',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c3_q6',
            kind: 'quiz',
            status: 'Ready',
            title: 'Audience Engagement Quiz',
            forLesson: 'Audience Engagement',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your knowledge of audience engagement and handling unexpected reactions.',
            questions: [
              {
                question: 'A rhetorical question engages the audience by:',
                options: [
                  'Giving the speaker time to think',
                  'Forcing mental participation — the audience answers internally',
                  'Inviting hands to be raised',
                  'Signalling a section transition',
                ],
                correctIndex: 1,
              },
              {
                question: 'Audience engagement should begin:',
                options: [
                  'After you have established credibility — usually 10 minutes in',
                  'Only during a Q&A at the end',
                  'Early — within the first two minutes',
                  'In the final summarising section',
                ],
                correctIndex: 2,
              },
              {
                question: 'When handling a hostile question, you should NOT:',
                options: [
                  "Acknowledge the questioner's perspective",
                  'Argue with the audience member directly',
                  'Answer directly and move on',
                  'Offer to discuss further offline',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Referencing the specific audience (their industry, city, or role) works because:',
                options: [
                  'It shows you researched them',
                  'It signals the talk was specifically prepared for them, increasing relevance',
                  'It distracts from weaker content',
                  'It meets a presentation requirement',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When technology fails during your talk, the best response is to:',
                options: [
                  'Apologise repeatedly and wait for IT',
                  'Panic and ask the audience what to do',
                  'Pause calmly, acknowledge the issue briefly, and continue without the technology',
                  'End the talk early',
                ],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a6',
            kind: 'assignment',
            status: 'Ready',
            title: 'Engagement Plan',
            forLesson: 'Audience Engagement',
            dueDate: 'Jul 17',
            submission: 'Text response',
            instructions:
              'Take the talk outline you created in Lesson 2. Add at least three specific engagement moments and write a 100-word plan for handling one likely unexpected reaction.',
            requirements: [
              'Three engagement techniques identified with exact placement in the talk',
              'Each technique matched to the appropriate type (rhetorical question, poll, pause, reference)',
              'Unexpected-reaction plan covers: acknowledgement, response, and how you move on',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c3_m3',
    title: 'Module 3: Real-World Speaking',
    lessons: [
      {
        id: 'c3_l7',
        title: 'Impromptu Speaking',
        documents: [],
        videos: [
          {
            id: 'c3_v4',
            kind: 'video',
            title: 'Impromptu Speaking',
            duration: '13 min',
            intro:
              "The most valuable speaking skill is the one you can't prepare for. Learn frameworks for thinking on your feet.",
            topics: [
              'Why impromptu speaking feels so hard and how to reframe it',
              'PREP: Point, Reason, Example, Point — for instant structure',
              'STAR: Situation, Task, Action, Result — for story-based answers',
              'Buying yourself thinking time without seeming unprepared',
            ],
            moments: [
              { time: '0:00', label: 'Why impromptu feels different' },
              { time: '2:30', label: 'The PREP framework' },
              { time: '6:10', label: 'STAR for behavioural questions' },
              { time: '10:00', label: 'Buying thinking time gracefully' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'c3_q7',
            kind: 'quiz',
            status: 'Ready',
            title: 'Impromptu Speaking Quiz',
            forLesson: 'Impromptu Speaking',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your knowledge of impromptu speaking frameworks.',
            questions: [
              {
                question: 'In the PREP framework, the second "P" stands for:',
                options: ['Pause', 'Perspective', 'Point (restated)', 'Proof'],
                correctIndex: 2,
              },
              {
                question: 'STAR is most useful for:',
                options: [
                  'Structuring a keynote',
                  'Answering behavioural or situational questions with a story',
                  'Designing presentation slides',
                  'Responding to hostile audiences',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A good way to buy thinking time without appearing unprepared is to:',
                options: [
                  'Say "I don\'t know" and move on',
                  'Repeat the question and take a brief pause',
                  'Look at your notes for 30 seconds',
                  'Ask the audience what they think',
                ],
                correctIndex: 1,
              },
              {
                question: 'PREP stands for:',
                options: [
                  'Point, Reason, Example, Point',
                  'Prepare, Rehearse, Execute, Polish',
                  'Present, Review, Engage, Pause',
                  'Premise, Result, Evidence, Plan',
                ],
                correctIndex: 0,
              },
              {
                question: 'In STAR, "A" represents:',
                options: ['Audience', 'Approach', 'Action', 'Answer'],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a7',
            kind: 'assignment',
            status: 'Ready',
            title: 'PREP Response Practice',
            forLesson: 'Impromptu Speaking',
            dueDate: 'Jul 20',
            submission: 'Text response',
            instructions:
              'Write a 90-second PREP response to the prompt: "What is the most important skill for leaders today and why?" Label each element.',
            requirements: [
              'All four PREP elements labelled in your response',
              'Response length: 180 – 230 words',
              'Example in the "E" section must be concrete and specific, not hypothetical',
            ],
          },
        ],
      },
      {
        id: 'c3_l8',
        title: 'Professional Presentations',
        documents: [
          {
            id: 'c3_d4',
            kind: 'document',
            title: 'Professional Presentations',
            readTime: '5 – 6 min read',
            intro:
              'Boardroom, pitch deck, town hall, workshop — each professional format has different expectations. Here is how to navigate them.',
            objectives: [
              'Distinguish the requirements of four professional presentation formats',
              'Adapt your preparation and delivery style to the context and audience',
            ],
            sections: [
              {
                heading: 'Four Formats, Four Mindsets',
                text: 'The boardroom update: be brief, data-driven, and decision-oriented. Know what question you want answered before you begin. The investor pitch: tell a compelling story about the problem, your solution, traction, and ask. The town hall: project confidence and openness; people are looking for leadership signals as much as content. The workshop: energy and participation matter more than polish. Plan for interaction every 8 – 10 minutes.',
                tip: 'Before any professional presentation, ask: what is the one decision or action I want from this audience? Let the answer shape everything.',
              },
              {
                heading: 'Reading the Room Quickly',
                text: "Arrive early and talk to two or three people before you start. This gives you live intelligence about the audience's concerns, level of familiarity with the topic, and current mood. You can then adapt your opening: reference what you heard, adjust the level of technical detail, or shift the emphasis of your first three minutes.",
              },
            ],
            takeaways: [
              'Match your mindset and style to the specific professional format — boardroom, pitch, town hall, or workshop',
              'Arrive early and talk to attendees to gather live intelligence before you begin',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'c3_q8',
            kind: 'quiz',
            status: 'Ready',
            title: 'Professional Presentations Quiz',
            forLesson: 'Professional Presentations',
            totalQuestions: 5,
            estimatedMinutes: 6,
            description:
              'Test your ability to match presentation style to professional context.',
            questions: [
              {
                question: 'A boardroom update should prioritise:',
                options: [
                  'Entertainment and storytelling',
                  'Brevity, data, and decision-orientation',
                  'Long context-setting to ensure everyone is aligned',
                  'Extensive Q&A time',
                ],
                correctIndex: 1,
              },
              {
                question: 'In a workshop format, what matters most?',
                options: [
                  'Polished slides and formal delivery',
                  'Energy and participation every 8 – 10 minutes',
                  'Covering all content without interruption',
                  'Speaking for at least 60 minutes',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The question to ask before any professional presentation is:',
                options: [
                  '"How long should this be?"',
                  '"What do I want to tell them?"',
                  '"What is the one decision or action I want from this audience?"',
                  '"Who in the room agrees with me already?"',
                ],
                correctIndex: 2,
              },
              {
                question: 'Arriving early before a presentation allows you to:',
                options: [
                  'Set up your slides',
                  'Gather live intelligence about audience concerns and mood',
                  'Rehearse your opening in the room',
                  'Establish authority by being first',
                ],
                correctIndex: 1,
              },
              {
                question: 'An investor pitch should primarily communicate:',
                options: [
                  "The speaker's professional credentials",
                  'A compelling story about the problem, solution, traction, and ask',
                  'Technical specifications in full detail',
                  'Historical context for the industry',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'c3_a8',
            kind: 'assignment',
            status: 'Ready',
            title: 'Format Adaptation Plan',
            forLesson: 'Professional Presentations',
            dueDate: 'Jul 23',
            submission: 'Text response',
            instructions:
              'Take one presentation topic and write a 300-word plan for delivering it in two different professional formats. Explain what changes and why.',
            requirements: [
              'Same topic adapted for two distinct formats from the lesson',
              'Changes to structure, tone, and content clearly explained for each',
              'The "one decision or action" named for each format',
            ],
          },
        ],
      },
    ],
  },
];
