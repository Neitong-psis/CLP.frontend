import type { ReviewModule } from '../../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course e11: Community Leadership Playbook (document-first) ───────────────

export const E11_MODULES: ReviewModule[] = [
  {
    id: 'e11_m1',
    title: 'Module 1: Organizing Foundations',
    lessons: [
      {
        id: 'e11_l1',
        title: 'What Makes a Community Leader',
        documents: [
          {
            id: 'e11_d1',
            kind: 'document',
            title: 'What Makes a Community Leader',
            readTime: '5 min read',
            intro:
              'Community leadership is earned through trust and consistent action, not appointed by a title. Understand what actually makes someone a community leader.',
            objectives: [
              'Distinguish positional authority from earned community leadership',
              'Identify the behaviors that build trust within a community',
            ],
            sections: [
              {
                heading: 'Earned, Not Appointed',
                text: "Unlike a manager appointed by an organization, a community leader's authority is earned through relationships and demonstrated commitment over time. A person can hold an official title and have little real influence, while someone with no formal role can be the person a community actually turns to.",
              },
              {
                heading: 'What Builds Community Trust',
                text: 'Trust is built through consistency (showing up reliably), follow-through (doing what you said you would), and genuine listening (acting on what the community says it needs, not what you assume). Any one broken repeatedly erodes credibility quickly.',
                tip: 'Trust is built slowly through many small consistent actions and can be lost through a single visible failure to follow through.',
              },
            ],
            takeaways: [
              'Community leadership is earned through relationships and consistent action, not granted by a title',
              'Trust is built through consistency, follow-through, and genuine listening',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'What Makes a Community Leader Quiz',
            forLesson: 'What Makes a Community Leader',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of what makes a community leader.',
            questions: [
              {
                question: "A community leader's authority is primarily:",
                options: [
                  'Granted automatically by an official title',
                  'Earned through relationships and demonstrated commitment',
                  'Based only on formal education',
                  'Irrelevant to community trust',
                ],
                correctIndex: 1,
              },
              {
                question: 'Follow-through builds trust because it:',
                options: [
                  'Has no visible effect on a community',
                  "Demonstrates that a leader's words match their actions",
                  'Only matters for large promises',
                  'Is optional for community leaders',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Genuine listening as a trust-building behavior means:',
                options: [
                  'Assuming you already know what the community needs',
                  'Acting on what the community actually says it needs',
                  'Ignoring community input',
                  'Listening without ever acting',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A person with no formal title can still be a genuine community leader if they:',
                options: [
                  'Have earned real trust and influence through their actions',
                  'Hold a government position',
                  'Have the most money',
                  'Speak the loudest',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e11_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Identify a Trust-Building Action',
            forLesson: 'What Makes a Community Leader',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Identify a real or hypothetical community leader and describe one specific action they took that built trust, tying it to consistency, follow-through, or listening.',
            requirements: [
              'A specific leader and action described',
              'The action clearly tied to one of the three trust-building behaviors',
              'A note on what would have happened if the action had not followed through',
            ],
          },
        ],
      },
      {
        id: 'e11_l2',
        title: 'Mapping Community Stakeholders',
        documents: [
          {
            id: 'e11_d2',
            kind: 'document',
            title: 'Mapping Community Stakeholders',
            readTime: '5 min read',
            intro:
              'Before organizing any action, a leader needs a clear map of who is affected, who has influence, and who could help or hinder the effort.',
            objectives: [
              'Apply a basic stakeholder mapping method to a community issue',
              'Distinguish between stakeholders by their level of interest and influence',
            ],
            sections: [
              {
                heading: 'Interest vs. Influence',
                text: 'A simple but powerful stakeholder map plots people or groups by two dimensions: how much interest they have in the issue, and how much influence they have over the outcome. Someone with high interest and high influence is a priority to engage directly; someone with low interest but high influence may need to be informed and gradually brought in.',
              },
              {
                heading: 'Avoiding Blind Spots',
                text: 'It is easy to map only the obvious stakeholders — the ones already speaking up. A thorough map deliberately looks for quieter groups who are affected but not yet vocal, since they are often overlooked until an initiative fails to account for their needs.',
              },
            ],
            takeaways: [
              'Mapping stakeholders by interest and influence helps prioritize engagement effort',
              'Quiet, less vocal stakeholders are often overlooked and need deliberate attention',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Stakeholder Mapping Quiz',
            forLesson: 'Mapping Community Stakeholders',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of stakeholder mapping.',
            questions: [
              {
                question:
                  'A stakeholder mapped as high interest and high influence should generally be:',
                options: [
                  'Ignored entirely',
                  'Engaged directly as a priority',
                  'Only informed after the fact',
                  'Excluded from the effort',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A stakeholder with high influence but low current interest might need to be:',
                options: [
                  'Left out of the process entirely',
                  'Informed and gradually engaged over time',
                  'Treated identically to a low-influence stakeholder',
                  'Assumed to already support the effort',
                ],
                correctIndex: 1,
              },
              {
                question: 'A common blind spot in stakeholder mapping is:',
                options: [
                  'Overrepresenting quiet groups',
                  'Overlooking quieter, affected groups who are not yet vocal',
                  'Including too many stakeholders',
                  'Mapping too much interest data',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The two dimensions typically used in basic stakeholder mapping are:',
                options: [
                  'Age and income',
                  'Interest and influence',
                  'Location and language',
                  'Height and weight',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e11_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Stakeholder Map',
            forLesson: 'Mapping Community Stakeholders',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'For a community issue you choose, list at least six stakeholders and plot each by interest and influence, including at least one quieter group that could be easily overlooked.',
            requirements: [
              'At least six stakeholders listed with interest/influence noted',
              'At least one deliberately identified "easily overlooked" group included',
              'A brief engagement approach proposed for the highest-priority stakeholder',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e11_m2',
    title: 'Module 2: Sustaining Impact',
    lessons: [
      {
        id: 'e11_l3',
        title: 'Running Effective Community Meetings',
        documents: [
          {
            id: 'e11_d3',
            kind: 'document',
            title: 'Running Effective Community Meetings',
            readTime: '5 min read',
            intro:
              'A poorly run meeting can undo months of organizing goodwill. Learn the structural choices that make a community meeting productive and inclusive.',
            objectives: [
              'Design a community meeting agenda that encourages participation',
              'Identify facilitation habits that keep a meeting from being dominated by a few voices',
            ],
            sections: [
              {
                heading: 'Structuring for Participation',
                text: 'A clear, shared agenda distributed in advance, a stated time limit per topic, and an explicit invitation for quieter attendees to speak all increase genuine participation. Without structure, meetings default to whoever is most comfortable speaking up, which is rarely the full community.',
              },
              {
                heading: 'Avoiding Domination by a Few Voices',
                text: 'Facilitation techniques like round-robin input, small breakout discussions before large-group sharing, and gently redirecting a dominant speaker ("thank you — let\'s hear from someone who hasn\'t spoken yet") help ensure the meeting reflects more than a handful of opinions.',
                tip: 'If the same two or three people are doing most of the talking, that is a facilitation signal to actively invite other voices in, not a sign the meeting is going well.',
              },
            ],
            takeaways: [
              'A shared agenda and time limits increase genuine participation in community meetings',
              'Facilitation techniques like round-robin input prevent a few voices from dominating',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Effective Community Meetings Quiz',
            forLesson: 'Running Effective Community Meetings',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of running effective community meetings.',
            questions: [
              {
                question:
                  'Distributing a shared agenda before a community meeting primarily helps by:',
                options: [
                  'Confusing attendees',
                  'Setting clear expectations that support more focused participation',
                  'Preventing anyone from speaking',
                  'Replacing the need for facilitation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A meeting where the same few people do most of the talking suggests:',
                options: [
                  'The meeting is going well',
                  'A need for facilitation techniques that invite other voices in',
                  'Nothing worth addressing',
                  'That quieter attendees have nothing to say',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Round-robin input as a facilitation technique means:',
                options: [
                  'Only the loudest voice speaks',
                  'Giving each attendee a structured turn to contribute',
                  'Skipping input entirely',
                  'Only leaders may speak',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Small breakout discussions before large-group sharing can help because they:',
                options: [
                  'Waste meeting time',
                  'Let quieter attendees rehearse their thoughts before a bigger audience',
                  'Are only useful for large conferences',
                  'Replace the need for an agenda',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e11_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Meeting Agenda',
            forLesson: 'Running Effective Community Meetings',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Design a one-hour community meeting agenda for an issue of your choice, including time limits per topic and at least one specific facilitation technique to ensure broad participation.',
            requirements: [
              'Agenda with time allocations for each topic',
              'At least one specific participation-focused facilitation technique named',
              'A plan for how quieter attendees will be invited to contribute',
            ],
          },
        ],
      },
      {
        id: 'e11_l4',
        title: 'Measuring Community Impact',
        documents: [
          {
            id: 'e11_d4',
            kind: 'document',
            title: 'Measuring Community Impact',
            readTime: '4 min read',
            intro:
              'Good intentions are not the same as measurable impact. Learn how community leaders can track whether their efforts are actually working.',
            objectives: [
              'Distinguish output metrics from outcome metrics in community work',
              'Design a simple way to track whether a community initiative is achieving its goal',
            ],
            sections: [
              {
                heading: 'Outputs vs. Outcomes',
                text: 'An output measures activity (meetings held, flyers distributed); an outcome measures actual change (more residents voting, a service gap closed). Tracking only outputs can create an illusion of progress while the underlying problem remains unchanged.',
              },
              {
                heading: 'Keeping Measurement Simple and Honest',
                text: 'Community initiatives rarely need sophisticated analytics — a short survey, a simple before/after count, or direct community feedback is often enough. The key is measuring the actual outcome the initiative was meant to change, and being willing to report it honestly even if progress is slow.',
              },
            ],
            takeaways: [
              'Outputs measure activity; outcomes measure actual change — both matter, but outcomes matter more',
              'Simple, honest measurement tools are usually sufficient for community initiatives',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Measuring Community Impact Quiz',
            forLesson: 'Measuring Community Impact',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of measuring community impact.',
            questions: [
              {
                question:
                  'An output metric, such as the number of meetings held, measures:',
                options: [
                  'Actual change in the community',
                  'Activity, not necessarily real-world change',
                  'Nothing useful at all',
                  'The same thing as an outcome metric',
                ],
                correctIndex: 1,
              },
              {
                question: 'Tracking only outputs risks:',
                options: [
                  'Guaranteeing real impact',
                  'Creating an illusion of progress while the underlying issue persists',
                  'Making measurement too complex',
                  'Having no downside',
                ],
                correctIndex: 1,
              },
              {
                question: 'A simple before/after count is an example of:',
                options: [
                  'An overly complex measurement approach',
                  'A practical way to track an outcome without sophisticated tools',
                  'An output metric only',
                  'A method with no value',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Honest reporting of slow or absent progress is important because it:',
                options: [
                  'Should always be avoided to protect morale',
                  'Allows a community initiative to adapt and improve rather than mask a real problem',
                  'Has no effect on future strategy',
                  'Is only relevant to funders',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e11_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design an Impact Tracker',
            forLesson: 'Measuring Community Impact',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'For a community initiative of your choice, define one output metric and one outcome metric, and describe a simple, low-cost method to track each.',
            requirements: [
              'One clearly defined output metric',
              'One clearly defined outcome metric',
              'A practical, low-cost tracking method described for each',
            ],
          },
        ],
      },
    ],
  },
];
