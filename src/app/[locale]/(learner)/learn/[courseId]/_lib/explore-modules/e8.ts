import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course e8: Full Community Leadership Program ─────────────────────────────

export const E8_MODULES: ReviewModule[] = [
  {
    id: 'e8_m1',
    title: 'Module 1: Civic Foundations',
    lessons: [
      {
        id: 'e8_l1',
        title: 'Principles of Civic Engagement',
        documents: [],
        videos: [
          {
            id: 'e8_v1',
            kind: 'video',
            title: 'Principles of Civic Engagement',
            duration: '19 min',
            intro:
              'Civic engagement turns concerned residents into an organized force for change. Learn the foundational principles that make it effective and sustainable.',
            topics: [
              'What distinguishes civic engagement from one-off activism',
              'Building legitimacy with a community',
              'Identifying shared interests across a diverse group',
              'Sustaining engagement beyond a single event',
            ],
            moments: [
              { time: '0:00', label: 'Civic engagement vs. one-off activism' },
              { time: '5:00', label: 'Building legitimacy' },
              { time: '11:00', label: 'Finding shared interests' },
              { time: '16:00', label: 'Sustaining engagement over time' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Civic Engagement Quiz',
            forLesson: 'Principles of Civic Engagement',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of civic engagement principles.',
            questions: [
              {
                question:
                  'Sustained civic engagement differs from a single protest or event mainly by:',
                options: [
                  'Requiring no ongoing relationships',
                  'Building lasting organization and relationships that outlast any one event',
                  'Being illegal in most contexts',
                  'Involving fewer people',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A community organizer builds legitimacy primarily by:',
                options: [
                  'Claiming authority without community input',
                  "Genuinely listening to and representing the community's actual concerns",
                  'Avoiding the community entirely',
                  'Working only with local government',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Identifying shared interests across a diverse group helps because it:',
                options: [
                  'Divides the group further',
                  'Creates common ground that can unify otherwise different stakeholders',
                  'Has no strategic value',
                  'Only works in homogeneous communities',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Engagement that fades immediately after a single event usually indicates:',
                options: [
                  'A highly effective, sustainable campaign',
                  'A lack of ongoing structure or follow-through',
                  'Nothing worth examining',
                  'Success by definition',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e8_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Map Shared Community Interests',
            forLesson: 'Principles of Civic Engagement',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'For a community issue of your choice, identify three different stakeholder groups and one shared interest that could unite them around action.',
            requirements: [
              'Three distinct stakeholder groups identified',
              'A genuinely shared interest articulated, not a generic statement',
              'A first step proposed for building legitimacy with these groups',
            ],
          },
        ],
      },
      {
        id: 'e8_l2',
        title: 'Building Youth Mentorship Programs',
        documents: [],
        videos: [
          {
            id: 'e8_v2',
            kind: 'video',
            title: 'Building Youth Mentorship Programs',
            duration: '18 min',
            intro:
              "Youth mentorship programs can multiply a community's leadership capacity for a generation. Learn how to design one that actually works.",
            topics: [
              'Matching mentors and youth thoughtfully',
              'Structuring a mentorship program with clear goals',
              'Training and supporting volunteer mentors',
              'Measuring whether a mentorship program is working',
            ],
            moments: [
              { time: '0:00', label: 'Why structured matching matters' },
              { time: '4:30', label: 'Setting program goals' },
              { time: '9:30', label: 'Supporting mentors' },
              { time: '14:00', label: 'Measuring program success' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Youth Mentorship Programs Quiz',
            forLesson: 'Building Youth Mentorship Programs',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of youth mentorship program design.',
            questions: [
              {
                question:
                  'Thoughtful mentor-youth matching typically considers:',
                options: [
                  'Nothing beyond availability',
                  'Shared interests, goals, and compatibility between mentor and mentee',
                  "Only the mentor's convenience",
                  'Random assignment for fairness',
                ],
                correctIndex: 1,
              },
              {
                question: 'A mentorship program without clear goals risks:',
                options: [
                  'Automatically succeeding regardless',
                  'Drifting without a way to know if it is helping youth',
                  'Being too structured',
                  'Requiring less mentor training',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Ongoing training and support for volunteer mentors helps by:',
                options: [
                  'Being unnecessary once a mentor is matched',
                  'Keeping mentors equipped and engaged, improving program consistency',
                  'Discouraging mentor participation',
                  'Replacing the need for goals',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Measuring a mentorship program's success should include:",
                options: [
                  'Only counting how many mentors signed up',
                  'Outcomes for the youth involved, not just participation numbers',
                  'Ignoring youth feedback entirely',
                  'No measurement at all',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e8_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Mentorship Program Outline',
            forLesson: 'Building Youth Mentorship Programs',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Outline a youth mentorship program including matching criteria, program goals, a mentor support plan, and two metrics you would track to measure success.',
            requirements: [
              'Matching criteria specified',
              'Clear program goals stated',
              'A mentor support/training plan described',
              'Two measurable success metrics defined',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e8_m2',
    title: 'Module 2: Organizing at the Grassroots',
    lessons: [
      {
        id: 'e8_l3',
        title: 'Grassroots Organizing Fundamentals',
        documents: [],
        videos: [
          {
            id: 'e8_v3',
            kind: 'video',
            title: 'Grassroots Organizing Fundamentals',
            duration: '20 min',
            intro:
              'Grassroots organizing builds power from the ground up, one relationship at a time. Learn the core practices that turn individuals into a movement.',
            topics: [
              'One-on-one relational meetings as the base unit of organizing',
              'Identifying and developing local leaders',
              'Turning individual concerns into collective action',
              'Building a base broad enough to sustain a campaign',
            ],
            moments: [
              { time: '0:00', label: 'The relational meeting' },
              { time: '5:30', label: 'Identifying local leaders' },
              {
                time: '11:30',
                label: 'From individual concern to collective action',
              },
              { time: '16:30', label: 'Building a broad base' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Grassroots Organizing Quiz',
            forLesson: 'Grassroots Organizing Fundamentals',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of grassroots organizing fundamentals.',
            questions: [
              {
                question:
                  'The relational one-on-one meeting is considered a base unit of organizing because it:',
                options: [
                  "Wastes an organizer's limited time",
                  'Builds the trust and understanding needed to mobilize people effectively',
                  'Replaces the need for any collective action',
                  'Only works with people already committed',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Identifying and developing local leaders matters because:',
                options: [
                  'One organizer can and should do everything alone',
                  'Distributed leadership builds a movement that can sustain itself',
                  'Leaders slow down organizing efforts',
                  'Local leaders have no credibility',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "Turning an individual's concern into collective action typically involves:",
                options: [
                  'Dismissing the individual concern as unimportant',
                  'Connecting it to others who share the concern to build shared power',
                  'Keeping every concern private',
                  'Waiting for government to act first',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A broad base is important for a campaign because it:',
                options: [
                  'Makes the campaign harder to sustain',
                  'Provides the numbers and diversity needed to sustain pressure over time',
                  'Has no relationship to campaign success',
                  'Only matters for national campaigns',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e8_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Plan a Relational Meeting Series',
            forLesson: 'Grassroots Organizing Fundamentals',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Plan a series of five one-on-one relational meetings for a community issue you care about, including who you would meet with and the key question you would ask each person.',
            requirements: [
              'Five specific people or roles identified to meet with',
              'A core relational question defined for the meetings',
              'A plan for how you would connect their individual concerns to collective action',
            ],
          },
        ],
      },
      {
        id: 'e8_l4',
        title: 'Sustaining a Community Movement',
        documents: [],
        videos: [
          {
            id: 'e8_v4',
            kind: 'video',
            title: 'Sustaining a Community Movement',
            duration: '17 min',
            intro:
              'Momentum is easy to generate and hard to sustain. Learn what keeps a community movement alive well past its first campaign.',
            topics: [
              'Avoiding organizer burnout',
              'Building leadership pipelines so the movement outlasts any one person',
              'Celebrating wins to sustain morale',
              'Adapting strategy as conditions change',
            ],
            moments: [
              { time: '0:00', label: 'The burnout risk' },
              { time: '4:00', label: 'Building a leadership pipeline' },
              { time: '8:00', label: 'Celebrating wins' },
              { time: '12:00', label: 'Adapting as conditions change' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Sustaining a Movement Quiz',
            forLesson: 'Sustaining a Community Movement',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of sustaining a community movement.',
            questions: [
              {
                question: 'A leadership pipeline within a movement helps it:',
                options: [
                  'Depend permanently on one founding leader',
                  'Continue functioning even as individual leaders move on',
                  'Become weaker over time',
                  'Avoid developing new leaders',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Deliberately celebrating small wins during a long campaign helps by:',
                options: [
                  'Distracting from the larger goal',
                  'Sustaining morale and motivation over a long effort',
                  'Signaling the campaign has ended',
                  'Having no effect on participants',
                ],
                correctIndex: 1,
              },
              {
                question: 'Organizer burnout is best addressed by:',
                options: [
                  'Ignoring it and pushing through indefinitely',
                  'Distributing responsibility and building sustainable practices from the start',
                  'Relying on one person to carry the whole movement',
                  'Ending the movement immediately',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A movement that fails to adapt its strategy as conditions change risks:',
                options: [
                  'Guaranteed continued success',
                  'Losing relevance or effectiveness as the situation evolves',
                  'Nothing — strategy never needs to change',
                  'Automatically gaining more support',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e8_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Movement Sustainability Plan',
            forLesson: 'Sustaining a Community Movement',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'For a community movement or campaign you have studied or participated in, propose a plan to prevent burnout, build a leadership pipeline, and mark milestones for celebration.',
            requirements: [
              'A specific burnout-prevention practice proposed',
              'A leadership pipeline mechanism described',
              'At least two milestones identified for celebration',
            ],
          },
        ],
      },
    ],
  },
];
