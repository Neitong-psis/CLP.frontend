// Per-course curriculum content for explore (marketplace) courses.
// Each explore course has unique topic-matched content, mirroring the
// enrolled-course pattern in course-modules.ts. Item IDs are prefixed
// (e1_-e15_) to ensure global uniqueness.

import type { ReviewModule } from '../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Course e1: The Complete JavaScript Course ────────────────────────────────

export const E1_MODULES: ReviewModule[] = [
  {
    id: 'e1_m1',
    title: 'Module 1: JavaScript Fundamentals',
    lessons: [
      {
        id: 'e1_l1',
        title: 'Values, Variables & Types',
        documents: [],
        videos: [
          {
            id: 'e1_v1',
            kind: 'video',
            title: 'Values, Variables & Types',
            duration: '18 min',
            intro:
              'A tour of how JavaScript stores and represents data — the foundation everything else is built on.',
            topics: [
              'let, const, and var — scoping differences',
              'Primitive types vs. objects',
              'Type coercion and how to avoid its pitfalls',
              'The typeof operator and common gotchas',
            ],
            moments: [
              { time: '0:00', label: 'Declaring variables' },
              { time: '4:30', label: 'Primitive types tour' },
              { time: '9:15', label: 'Type coercion examples' },
              { time: '14:00', label: 'Common gotchas' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e1_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Values, Variables & Types Quiz',
            forLesson: 'Values, Variables & Types',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of JavaScript variables and types.',
            questions: [
              {
                question:
                  'Which keyword creates a block-scoped variable that cannot be reassigned?',
                options: ['var', 'let', 'const', 'static'],
                correctIndex: 2,
              },
              {
                question: 'What does typeof null return in JavaScript?',
                options: ['"null"', '"undefined"', '"object"', '"boolean"'],
                correctIndex: 2,
              },
              {
                question: 'Which of these is a primitive type?',
                options: ['Array', 'Object', 'Function', 'String'],
                correctIndex: 3,
              },
              {
                question: '"5" + 3 evaluates to:',
                options: ['8', '"53"', 'NaN', 'Error'],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e1_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Type Coercion Playground',
            forLesson: 'Values, Variables & Types',
            dueDate: 'Jul 6',
            submission: 'Code upload',
            instructions:
              'Write ten expressions that each demonstrate a different JavaScript type coercion rule, and explain the result of each in a comment.',
            requirements: [
              'Ten distinct coercion examples',
              'A one-line comment explaining each result',
              'At least one example each of string, number, and boolean coercion',
            ],
          },
        ],
      },
      {
        id: 'e1_l2',
        title: 'Functions & Scope',
        documents: [],
        videos: [
          {
            id: 'e1_v2',
            kind: 'video',
            title: 'Functions & Scope',
            duration: '20 min',
            intro:
              'Functions are the core unit of reusable logic in JavaScript. Understand how scope and closures actually work.',
            topics: [
              'Function declarations vs. expressions vs. arrow functions',
              'Lexical scoping and the scope chain',
              'Closures and why they matter',
              'The this keyword across contexts',
            ],
            moments: [
              { time: '0:00', label: 'Function syntax forms' },
              { time: '5:00', label: 'Scope chain walkthrough' },
              { time: '11:00', label: 'Closures in practice' },
              { time: '16:30', label: 'this in different contexts' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e1_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Functions & Scope Quiz',
            forLesson: 'Functions & Scope',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of functions, scope, and closures.',
            questions: [
              {
                question: 'A closure is:',
                options: [
                  'A function that has no parameters',
                  'A function that retains access to its outer scope after that scope has exited',
                  'A syntax error caused by nested functions',
                  'A way to close a running JavaScript process',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Arrow functions differ from regular functions primarily because they:',
                options: [
                  'Cannot take parameters',
                  'Do not have their own this binding',
                  'Run asynchronously by default',
                  'Cannot be assigned to variables',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which best describes lexical scoping?',
                options: [
                  'Scope is determined by where a function is called',
                  'Scope is determined by where a function is defined in the source code',
                  'All variables are globally scoped by default',
                  'Scope only applies to variables declared with var',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Inside a regular (non-arrow) method, `this` typically refers to:',
                options: [
                  'The global object regardless of context',
                  'The object the method was called on',
                  'The function itself',
                  'undefined in all cases',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e1_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Counter Factory',
            forLesson: 'Functions & Scope',
            dueDate: 'Jul 8',
            submission: 'Code upload',
            instructions:
              'Write a createCounter() function that uses a closure to return increment, decrement, and reset functions sharing private state.',
            requirements: [
              'Private count variable not accessible from outside',
              'increment, decrement, and reset functions returned from one factory',
              'Demonstrate two independent counters do not share state',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e1_m2',
    title: 'Module 2: Async & Modern JavaScript',
    lessons: [
      {
        id: 'e1_l3',
        title: 'Promises & Async/Await',
        documents: [],
        videos: [
          {
            id: 'e1_v3',
            kind: 'video',
            title: 'Promises & Async/Await',
            duration: '22 min',
            intro:
              'Asynchronous code is unavoidable in JavaScript. Learn to reason about it clearly with promises and async/await.',
            topics: [
              'The event loop and why JS is single-threaded',
              'Creating and chaining promises',
              'async/await as promise syntax sugar',
              'Error handling with try/catch in async code',
            ],
            moments: [
              { time: '0:00', label: 'Why async matters' },
              { time: '5:30', label: 'The event loop' },
              { time: '11:00', label: 'Promise chaining' },
              { time: '17:00', label: 'async/await patterns' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e1_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Promises & Async/Await Quiz',
            forLesson: 'Promises & Async/Await',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Assess your understanding of asynchronous JavaScript.',
            questions: [
              {
                question: 'A Promise can be in which states?',
                options: [
                  'open, closed',
                  'pending, fulfilled, rejected',
                  'waiting, done',
                  'sync, async',
                ],
                correctIndex: 1,
              },
              {
                question: 'await can only be used:',
                options: [
                  'Inside an async function',
                  'At the top level of any file',
                  'Inside a for loop',
                  'Inside a class constructor',
                ],
                correctIndex: 0,
              },
              {
                question: 'The event loop is responsible for:',
                options: [
                  'Compiling JavaScript to bytecode',
                  'Moving completed async callbacks onto the call stack when it is empty',
                  'Managing memory allocation',
                  'Parsing the DOM',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'To handle an error thrown inside an async function, you should:',
                options: [
                  'Wrap the call in try/catch',
                  'Use a global error handler only',
                  'Errors cannot be caught in async functions',
                  'Use .then() only, never try/catch',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e1_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Sequential vs. Parallel Fetching',
            forLesson: 'Promises & Async/Await',
            dueDate: 'Jul 10',
            submission: 'Code upload',
            instructions:
              'Write two async functions that fetch three mock endpoints — one sequentially with await, one in parallel with Promise.all — and compare execution time.',
            requirements: [
              'Working sequential implementation',
              'Working parallel implementation using Promise.all',
              'A short written comparison of the timing difference and when to use each',
            ],
          },
        ],
      },
      {
        id: 'e1_l4',
        title: 'Modern ES6+ Features',
        documents: [],
        videos: [
          {
            id: 'e1_v4',
            kind: 'video',
            title: 'Modern ES6+ Features',
            duration: '16 min',
            intro:
              'Destructuring, spread, modules, and other modern syntax that makes JavaScript code shorter and clearer.',
            topics: [
              'Destructuring objects and arrays',
              'Spread and rest syntax',
              'Template literals',
              'ES modules: import/export',
            ],
            moments: [
              { time: '0:00', label: 'Destructuring basics' },
              { time: '4:00', label: 'Spread and rest' },
              { time: '8:30', label: 'Template literals' },
              { time: '12:30', label: 'Modules overview' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e1_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Modern ES6+ Features Quiz',
            forLesson: 'Modern ES6+ Features',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of modern JavaScript syntax.',
            questions: [
              {
                question: 'const { name, age } = user; is an example of:',
                options: [
                  'Spread syntax',
                  'Object destructuring',
                  'Template literal',
                  'Rest parameter',
                ],
                correctIndex: 1,
              },
              {
                question: 'The rest parameter (...args) collects:',
                options: [
                  'The first argument only',
                  'All remaining arguments into an array',
                  'All object keys',
                  'Nothing — it is spread syntax only',
                ],
                correctIndex: 1,
              },
              {
                question: 'Template literals are delimited by:',
                options: [
                  'Single quotes',
                  'Double quotes',
                  'Backticks',
                  'Square brackets',
                ],
                correctIndex: 2,
              },
              {
                question:
                  'ES modules use which keywords to share and use code across files?',
                options: [
                  'require and module.exports',
                  'import and export',
                  'include and use',
                  'load and share',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e1_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Refactor to Modern Syntax',
            forLesson: 'Modern ES6+ Features',
            dueDate: 'Jul 12',
            submission: 'Code upload',
            instructions:
              'Take a short piece of ES5-style code provided in class and refactor it using destructuring, spread/rest, template literals, and ES modules.',
            requirements: [
              'At least one use each of destructuring, spread/rest, and template literals',
              'Code split into at least two ES modules with import/export',
              'Behavior identical to the original before/after',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e2: React – The Complete Guide ────────────────────────────────────

export const E2_MODULES: ReviewModule[] = [
  {
    id: 'e2_m1',
    title: 'Module 1: React Fundamentals',
    lessons: [
      {
        id: 'e2_l1',
        title: 'Components, Props & JSX',
        documents: [],
        videos: [
          {
            id: 'e2_v1',
            kind: 'video',
            title: 'Components, Props & JSX',
            duration: '19 min',
            intro:
              'Components are the building blocks of every React app. Learn how JSX and props let you compose UIs declaratively.',
            topics: [
              'JSX syntax and how it compiles to JS',
              'Function components vs. class components',
              'Passing and typing props',
              'Composition over inheritance',
            ],
            moments: [
              { time: '0:00', label: 'What JSX actually is' },
              { time: '5:00', label: 'Your first component' },
              { time: '10:30', label: 'Props in depth' },
              { time: '15:00', label: 'Composing components' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e2_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Components, Props & JSX Quiz',
            forLesson: 'Components, Props & JSX',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of React components and props.',
            questions: [
              {
                question: 'Props in React are:',
                options: [
                  'Mutable state owned by the component',
                  'Read-only data passed from a parent to a child component',
                  'Global variables shared across all components',
                  'Only usable in class components',
                ],
                correctIndex: 1,
              },
              {
                question: 'JSX compiles down to:',
                options: [
                  'HTML strings',
                  'React.createElement() calls',
                  'CSS-in-JS objects',
                  'WebAssembly',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'React favors which pattern for reusing UI logic across components?',
                options: [
                  'Class inheritance',
                  'Composition',
                  'Global mixins',
                  'Copy-pasting JSX',
                ],
                correctIndex: 1,
              },
              {
                question: 'A function component must:',
                options: [
                  'Extend React.Component',
                  'Return a single JSX element (or fragment)',
                  'Define a render() method',
                  'Always accept props even if unused',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e2_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Reusable Card Component',
            forLesson: 'Components, Props & JSX',
            dueDate: 'Jul 6',
            submission: 'Code upload',
            instructions:
              'Create a Card component that accepts title, description, and imageUrl props, then render three different cards using it.',
            requirements: [
              'Card component accepts and displays all three props',
              'Rendered at least three times with different data',
              'Props typed if using TypeScript',
            ],
          },
        ],
      },
      {
        id: 'e2_l2',
        title: 'State & Hooks',
        documents: [],
        videos: [
          {
            id: 'e2_v2',
            kind: 'video',
            title: 'State & Hooks',
            duration: '21 min',
            intro:
              'State is what makes components interactive. Learn useState and useEffect — the two hooks you will use constantly.',
            topics: [
              'useState for local component state',
              'useEffect for side effects and lifecycle',
              'The rules of hooks and why they exist',
              'Common useEffect dependency-array mistakes',
            ],
            moments: [
              { time: '0:00', label: 'Why state matters' },
              { time: '5:00', label: 'useState walkthrough' },
              { time: '11:00', label: 'useEffect and side effects' },
              { time: '17:00', label: 'Rules of hooks' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e2_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'State & Hooks Quiz',
            forLesson: 'State & Hooks',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of React state and hooks.',
            questions: [
              {
                question: 'Calling the setter returned by useState causes:',
                options: [
                  'An immediate, synchronous re-render',
                  'The component to schedule a re-render',
                  'A page reload',
                  'Nothing unless useEffect is also used',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'An empty dependency array ([]) in useEffect means the effect runs:',
                options: [
                  'On every render',
                  'Only once, after the initial render',
                  'Never',
                  'Only when the component unmounts',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which of these violates the Rules of Hooks?',
                options: [
                  'Calling useState at the top level of a component',
                  'Calling a hook inside an if statement',
                  'Calling multiple different hooks in one component',
                  'Calling useEffect after useState',
                ],
                correctIndex: 1,
              },
              {
                question: 'The cleanup function returned from useEffect runs:',
                options: [
                  'Before the component mounts',
                  'Before the effect re-runs and on unmount',
                  'Only on unmount',
                  'It never runs automatically',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e2_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Live Search Filter',
            forLesson: 'State & Hooks',
            dueDate: 'Jul 8',
            submission: 'Code upload',
            instructions:
              'Build a component with a text input that filters a hardcoded list of items in real time using useState.',
            requirements: [
              'Filtering updates as the user types',
              'Case-insensitive matching',
              'Displays a "no results" message when appropriate',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e2_m2',
    title: 'Module 2: Building Real React Apps',
    lessons: [
      {
        id: 'e2_l3',
        title: 'Routing & Data Fetching',
        documents: [],
        videos: [
          {
            id: 'e2_v3',
            kind: 'video',
            title: 'Routing & Data Fetching',
            duration: '20 min',
            intro:
              'Real apps have multiple pages and remote data. Learn client-side routing and common data-fetching patterns.',
            topics: [
              'Client-side routing concepts',
              'Dynamic route parameters',
              'Fetching data in components',
              'Loading and error states',
            ],
            moments: [
              { time: '0:00', label: 'Why client-side routing' },
              { time: '5:00', label: 'Dynamic routes' },
              { time: '10:30', label: 'Fetching data' },
              { time: '16:00', label: 'Handling loading/error states' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e2_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Routing & Data Fetching Quiz',
            forLesson: 'Routing & Data Fetching',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Assess your understanding of routing and data fetching in React.',
            questions: [
              {
                question:
                  'A dynamic route parameter (e.g. /users/:id) allows a page to:',
                options: [
                  'Render only one hardcoded user',
                  'Read a value from the URL to render different data',
                  'Skip routing entirely',
                  'Only work with query strings',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Fetching data inside useEffect on mount is a common pattern because:',
                options: [
                  'Effects run before the component renders',
                  'It lets you trigger a fetch after the component is on screen and manage its lifecycle',
                  'It replaces the need for state entirely',
                  'It is required by React for all fetch calls',
                ],
                correctIndex: 1,
              },
              {
                question: 'A good data-fetching UI should always account for:',
                options: [
                  'Only the success case',
                  'Loading and error states in addition to success',
                  'Only the error case',
                  'Neither loading nor error states',
                ],
                correctIndex: 1,
              },
              {
                question: 'Client-side routing avoids full page reloads by:',
                options: [
                  'Disabling the browser back button',
                  'Intercepting navigation and swapping rendered components without a server round trip',
                  'Always fetching a new HTML document',
                  'Using only anchor tags with no JavaScript',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e2_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Multi-Page App with Dynamic Routes',
            forLesson: 'Routing & Data Fetching',
            dueDate: 'Jul 10',
            submission: 'Code upload',
            instructions:
              'Build a small app with a list page and a dynamic detail page (e.g. /items/:id) that fetches and displays item data with loading and error handling.',
            requirements: [
              'At least two routes, one dynamic',
              'Loading state shown while fetching',
              'Error state shown on fetch failure',
            ],
          },
        ],
      },
      {
        id: 'e2_l4',
        title: 'State Management at Scale',
        documents: [],
        videos: [
          {
            id: 'e2_v4',
            kind: 'video',
            title: 'State Management at Scale',
            duration: '18 min',
            intro:
              'As apps grow, prop drilling becomes painful. Learn when and how to reach for Context and external state libraries.',
            topics: [
              'Prop drilling and its costs',
              'React Context for shared state',
              'When Context is not enough',
              'Choosing a state management approach',
            ],
            moments: [
              { time: '0:00', label: 'The prop drilling problem' },
              { time: '4:30', label: 'Context API basics' },
              { time: '10:00', label: 'Limits of Context' },
              { time: '14:30', label: 'Choosing a solution' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e2_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'State Management at Scale Quiz',
            forLesson: 'State Management at Scale',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of scaling state management in React apps.',
            questions: [
              {
                question: 'Prop drilling refers to:',
                options: [
                  'Passing props through many intermediate components that do not use them',
                  'A React performance optimization',
                  'A way to type-check props',
                  'Passing props from child to parent',
                ],
                correctIndex: 0,
              },
              {
                question: 'React Context is best suited for:',
                options: [
                  'High-frequency updates like mouse position',
                  'Relatively stable, widely shared data like theme or auth',
                  'Replacing all component state',
                  'Server-side data fetching',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A downside of overusing Context for frequently changing values is:',
                options: [
                  'It causes a compile error',
                  'It can trigger unnecessary re-renders across all consumers',
                  'Context cannot hold objects',
                  'It disables hooks',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'When choosing a state management approach, a reasonable first step is to:',
                options: [
                  'Always add a state library immediately',
                  'Start with local/component state and lift it only as far as needed',
                  'Put all state in Context from the start',
                  'Avoid state entirely',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e2_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Refactor Prop Drilling with Context',
            forLesson: 'State Management at Scale',
            dueDate: 'Jul 12',
            submission: 'Code upload',
            instructions:
              'Given a component tree that passes a "theme" prop through three levels, refactor it to use React Context instead.',
            requirements: [
              'ThemeContext created with a Provider',
              'Prop drilling removed from intermediate components',
              'At least one deeply nested component consumes the context directly',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e3: Python for Data Science and ML ────────────────────────────────

export const E3_MODULES: ReviewModule[] = [
  {
    id: 'e3_m1',
    title: 'Module 1: Python for Data Analysis',
    lessons: [
      {
        id: 'e3_l1',
        title: 'NumPy Arrays & Vectorized Operations',
        documents: [],
        videos: [
          {
            id: 'e3_v1',
            kind: 'video',
            title: 'NumPy Arrays & Vectorized Operations',
            duration: '17 min',
            intro:
              'NumPy arrays are the foundation of numerical computing in Python. Learn why vectorized operations replace loops.',
            topics: [
              'Creating and indexing arrays',
              'Vectorized operations vs. Python loops',
              'Broadcasting rules',
              'Array reshaping and aggregation',
            ],
            moments: [
              { time: '0:00', label: 'Why NumPy exists' },
              { time: '4:00', label: 'Indexing and slicing' },
              { time: '8:30', label: 'Vectorization vs. loops' },
              { time: '13:00', label: 'Broadcasting' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e3_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'NumPy Arrays Quiz',
            forLesson: 'NumPy Arrays & Vectorized Operations',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of NumPy fundamentals.',
            questions: [
              {
                question:
                  'A key advantage of NumPy arrays over Python lists is:',
                options: [
                  'They can hold mixed types more easily',
                  'Vectorized operations run much faster than equivalent Python loops',
                  'They cannot be indexed',
                  'They automatically visualize data',
                ],
                correctIndex: 1,
              },
              {
                question: 'Broadcasting in NumPy refers to:',
                options: [
                  'Sending arrays over a network',
                  'Automatically expanding smaller arrays to match shapes during operations',
                  'Converting arrays to lists',
                  'A visualization technique',
                ],
                correctIndex: 1,
              },
              {
                question: 'arr.reshape(2, 3) requires the array to have:',
                options: [
                  'Exactly 5 elements',
                  'Exactly 6 elements',
                  'Any number of elements',
                  'At least 10 elements',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Vectorized operations are generally faster because they:',
                options: [
                  'Run in a separate thread automatically',
                  'Avoid Python-level loop overhead by operating in optimized C code',
                  'Use less memory than any alternative',
                  'Skip validation entirely',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e3_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Vectorize a Loop-Based Calculation',
            forLesson: 'NumPy Arrays & Vectorized Operations',
            dueDate: 'Jul 6',
            submission: 'Code upload',
            instructions:
              'Take a provided loop-based calculation over a list of numbers and rewrite it using NumPy vectorized operations, then compare runtime for 1 million elements.',
            requirements: [
              'Working vectorized NumPy implementation',
              'Runtime comparison against the original loop',
              'Brief explanation of why the vectorized version is faster',
            ],
          },
        ],
      },
      {
        id: 'e3_l2',
        title: 'Pandas DataFrames',
        documents: [],
        videos: [
          {
            id: 'e3_v2',
            kind: 'video',
            title: 'Pandas DataFrames',
            duration: '19 min',
            intro:
              'DataFrames are the workhorse of real-world data analysis in Python. Learn to load, filter, and transform tabular data.',
            topics: [
              'Loading CSV data into DataFrames',
              'Filtering and selecting rows/columns',
              'GroupBy and aggregation',
              'Handling missing data',
            ],
            moments: [
              { time: '0:00', label: 'Loading data' },
              { time: '4:30', label: 'Filtering and selection' },
              { time: '10:00', label: 'GroupBy aggregation' },
              { time: '15:00', label: 'Missing data strategies' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e3_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Pandas DataFrames Quiz',
            forLesson: 'Pandas DataFrames',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of Pandas DataFrames.',
            questions: [
              {
                question: 'df.groupby("category")["sales"].sum() computes:',
                options: [
                  'Total sales across the whole dataset',
                  'Total sales per unique category value',
                  'The average sale price',
                  'The number of categories',
                ],
                correctIndex: 1,
              },
              {
                question: 'df.dropna() by default:',
                options: [
                  'Fills missing values with zero',
                  'Removes rows containing any missing values',
                  'Removes columns containing any missing values',
                  'Raises an error if any value is missing',
                ],
                correctIndex: 1,
              },
              {
                question: 'df[df["age"] > 30] is an example of:',
                options: [
                  'Column renaming',
                  'Boolean filtering of rows',
                  'Sorting',
                  'Merging two DataFrames',
                ],
                correctIndex: 1,
              },
              {
                question: 'A common way to fill missing numeric values is:',
                options: [
                  'df.fillna(df.mean())',
                  'df.sort_values()',
                  'df.rename()',
                  'df.head()',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e3_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Clean and Summarize a Dataset',
            forLesson: 'Pandas DataFrames',
            dueDate: 'Jul 8',
            submission: 'Code upload',
            instructions:
              'Given a messy CSV with missing values and inconsistent types, load it into a DataFrame, clean it, and produce a summary table grouped by one categorical column.',
            requirements: [
              'Missing values handled with a documented strategy',
              'At least one groupby aggregation',
              'Final summary table exported or printed',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e3_m2',
    title: 'Module 2: Visualization & Intro to ML',
    lessons: [
      {
        id: 'e3_l3',
        title: 'Data Visualization with Matplotlib',
        documents: [],
        videos: [
          {
            id: 'e3_v3',
            kind: 'video',
            title: 'Data Visualization with Matplotlib',
            duration: '15 min',
            intro:
              'A good chart communicates a finding instantly. Learn the core Matplotlib chart types and when to use each.',
            topics: [
              'Line, bar, and scatter plots',
              'Labeling axes, titles, and legends',
              'Choosing the right chart for the data',
              'Common visualization mistakes',
            ],
            moments: [
              { time: '0:00', label: 'Chart types overview' },
              { time: '4:00', label: 'Building a line chart' },
              { time: '8:00', label: 'Labels and legends' },
              { time: '11:30', label: 'Choosing the right chart' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e3_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Data Visualization Quiz',
            forLesson: 'Data Visualization with Matplotlib',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your knowledge of data visualization principles.',
            questions: [
              {
                question: 'A scatter plot is best suited for showing:',
                options: [
                  'Change over time for a single variable',
                  'The relationship between two continuous variables',
                  'Proportions of a whole',
                  'Categorical counts only',
                ],
                correctIndex: 1,
              },
              {
                question: 'Omitting axis labels from a chart:',
                options: [
                  'Is best practice for cleaner visuals',
                  'Makes the chart ambiguous and harder to interpret correctly',
                  'Has no effect on interpretation',
                  'Is required for scientific publication',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A bar chart is generally preferred over a pie chart when:',
                options: [
                  'Comparing many categories precisely',
                  'Showing exactly two categories',
                  'There is no data to show',
                  'Categories overlap',
                ],
                correctIndex: 0,
              },
              {
                question: 'A line chart is most appropriate for:',
                options: [
                  'Unordered categorical data',
                  'Data with a natural order, such as a time series',
                  'Single data points',
                  'Text data',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e3_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Three-Chart Dashboard',
            forLesson: 'Data Visualization with Matplotlib',
            dueDate: 'Jul 10',
            submission: 'Code upload',
            instructions:
              'Using the dataset from the previous lesson, build three different chart types that each reveal a distinct insight, with clear titles and labels.',
            requirements: [
              'Three distinct chart types used appropriately',
              'All axes labeled and titled',
              'A one-sentence insight written for each chart',
            ],
          },
        ],
      },
      {
        id: 'e3_l4',
        title: 'Your First Machine Learning Model',
        documents: [],
        videos: [
          {
            id: 'e3_v4',
            kind: 'video',
            title: 'Your First Machine Learning Model',
            duration: '20 min',
            intro:
              'Train and evaluate your first supervised learning model using scikit-learn — from split to prediction.',
            topics: [
              'Train/test split and why it matters',
              'Fitting a simple regression model',
              'Evaluating with accuracy and error metrics',
              'Overfitting: recognizing and avoiding it',
            ],
            moments: [
              { time: '0:00', label: 'The supervised learning workflow' },
              { time: '5:00', label: 'Train/test split' },
              { time: '10:30', label: 'Fitting and predicting' },
              { time: '16:00', label: 'Overfitting explained' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e3_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Machine Learning Basics Quiz',
            forLesson: 'Your First Machine Learning Model',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your foundational understanding of the ML workflow.',
            questions: [
              {
                question: 'A train/test split exists to:',
                options: [
                  'Speed up training',
                  'Evaluate model performance on data it has not seen during training',
                  'Reduce the dataset size permanently',
                  'Remove missing values',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A model that performs very well on training data but poorly on test data is:',
                options: [
                  'Underfitting',
                  'Overfitting',
                  'Perfectly generalized',
                  'Impossible to diagnose',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In scikit-learn, model.fit(X_train, y_train) is used to:',
                options: [
                  'Evaluate the model',
                  'Train the model on the training data',
                  'Load the dataset',
                  'Visualize predictions',
                ],
                correctIndex: 1,
              },
              {
                question: 'A common cause of overfitting is:',
                options: [
                  'Too little model complexity relative to the data',
                  'Too much model complexity relative to the amount of training data',
                  'Using a train/test split',
                  'Normalizing the input features',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e3_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Train and Evaluate a Regression Model',
            forLesson: 'Your First Machine Learning Model',
            dueDate: 'Jul 12',
            submission: 'Code upload',
            instructions:
              'Using a provided dataset, split it into train/test sets, fit a simple regression model, and report an appropriate evaluation metric.',
            requirements: [
              'Correct train/test split (e.g. 80/20)',
              'Model trained without errors',
              'Evaluation metric reported with a one-paragraph interpretation',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e4: Docker & Kubernetes: The Practical Guide ─────────────────────

export const E4_MODULES: ReviewModule[] = [
  {
    id: 'e4_m1',
    title: 'Module 1: Docker Fundamentals',
    lessons: [
      {
        id: 'e4_l1',
        title: 'Images, Containers & the Dockerfile',
        documents: [],
        videos: [
          {
            id: 'e4_v1',
            kind: 'video',
            title: 'Images, Containers & the Dockerfile',
            duration: '18 min',
            intro:
              'Containers solve the "works on my machine" problem. Learn how images and containers relate, and how to write a Dockerfile.',
            topics: [
              'Images vs. containers: the key distinction',
              'Writing a Dockerfile step by step',
              'Layers and build caching',
              'Common Docker CLI commands',
            ],
            moments: [
              { time: '0:00', label: 'Images vs. containers' },
              { time: '5:00', label: 'Writing a Dockerfile' },
              { time: '10:30', label: 'Layer caching' },
              { time: '15:00', label: 'CLI essentials' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e4_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Images, Containers & Dockerfile Quiz',
            forLesson: 'Images, Containers & the Dockerfile',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of Docker fundamentals.',
            questions: [
              {
                question: 'A Docker image is:',
                options: [
                  'A running instance of an application',
                  'A read-only template used to create containers',
                  'A virtual machine',
                  'A network configuration file',
                ],
                correctIndex: 1,
              },
              {
                question: 'A container is best described as:',
                options: [
                  'A running instance of an image',
                  'A compressed archive of source code',
                  'A build tool',
                  'A database',
                ],
                correctIndex: 0,
              },
              {
                question: 'Docker build layers are cached to:',
                options: [
                  'Reduce final image size to zero',
                  'Speed up subsequent builds by reusing unchanged layers',
                  'Encrypt the image',
                  'Remove the need for a Dockerfile',
                ],
                correctIndex: 1,
              },
              {
                question: 'Which command starts a new container from an image?',
                options: [
                  'docker build',
                  'docker run',
                  'docker commit',
                  'docker pull',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e4_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Containerize a Simple Web App',
            forLesson: 'Images, Containers & the Dockerfile',
            dueDate: 'Jul 6',
            submission: 'Code upload',
            instructions:
              'Write a Dockerfile for a provided simple web app, build the image, and run it as a container exposing the correct port.',
            requirements: [
              'Working Dockerfile with appropriate base image',
              'Image builds without errors',
              'Container runs and serves the app on the expected port',
            ],
          },
        ],
      },
      {
        id: 'e4_l2',
        title: 'Docker Compose & Multi-Container Apps',
        documents: [],
        videos: [
          {
            id: 'e4_v2',
            kind: 'video',
            title: 'Docker Compose & Multi-Container Apps',
            duration: '17 min',
            intro:
              'Real applications rarely run as a single container. Learn Docker Compose to define and run multi-service applications.',
            topics: [
              'The docker-compose.yml structure',
              'Defining services, networks, and volumes',
              'Inter-container networking and service discovery',
              'Environment variables and secrets',
            ],
            moments: [
              { time: '0:00', label: 'Why Compose exists' },
              { time: '4:30', label: 'Writing a compose file' },
              { time: '9:30', label: 'Networking between services' },
              { time: '14:00', label: 'Managing configuration' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e4_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Docker Compose Quiz',
            forLesson: 'Docker Compose & Multi-Container Apps',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your knowledge of Docker Compose.',
            questions: [
              {
                question: 'Docker Compose is primarily used to:',
                options: [
                  'Replace Dockerfiles entirely',
                  'Define and run multi-container applications from a single config file',
                  'Build container images faster',
                  'Manage Kubernetes clusters',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'By default, services in the same Compose file can reach each other:',
                options: [
                  'Only via the host machine IP',
                  'By service name, over a shared network Compose creates',
                  'They cannot communicate at all',
                  'Only through external DNS',
                ],
                correctIndex: 1,
              },
              {
                question: 'A volume in Docker Compose is used to:',
                options: [
                  "Persist data beyond a container's lifecycle",
                  'Increase CPU allocation',
                  'Define network routes',
                  'Compress images',
                ],
                correctIndex: 0,
              },
              {
                question: 'docker-compose up typically:',
                options: [
                  'Deletes all containers',
                  'Builds (if needed) and starts all defined services',
                  'Only builds images without running them',
                  'Only works with one service at a time',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e4_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Compose a Two-Service App',
            forLesson: 'Docker Compose & Multi-Container Apps',
            dueDate: 'Jul 8',
            submission: 'Code upload',
            instructions:
              'Write a docker-compose.yml that runs a web app service alongside a database service, with the app connecting to the database by service name.',
            requirements: [
              'Two services defined with correct dependencies',
              'App successfully connects to the database container',
              'A named volume used to persist database data',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e4_m2',
    title: 'Module 2: Kubernetes Orchestration',
    lessons: [
      {
        id: 'e4_l3',
        title: 'Pods, Deployments & Services',
        documents: [],
        videos: [
          {
            id: 'e4_v3',
            kind: 'video',
            title: 'Pods, Deployments & Services',
            duration: '21 min',
            intro:
              'Kubernetes orchestrates containers at scale. Learn the three core building blocks: Pods, Deployments, and Services.',
            topics: [
              'Pods as the smallest deployable unit',
              'Deployments and desired-state reconciliation',
              'Services for stable networking',
              'Scaling and self-healing in practice',
            ],
            moments: [
              { time: '0:00', label: 'Why Kubernetes exists' },
              { time: '5:30', label: 'Pods explained' },
              { time: '11:00', label: 'Deployments and reconciliation' },
              { time: '16:30', label: 'Services and networking' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e4_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Pods, Deployments & Services Quiz',
            forLesson: 'Pods, Deployments & Services',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Assess your Kubernetes core-concepts understanding.',
            questions: [
              {
                question: 'The smallest deployable unit in Kubernetes is:',
                options: ['A container', 'A Pod', 'A Node', 'A Deployment'],
                correctIndex: 1,
              },
              {
                question: "A Deployment's main responsibility is to:",
                options: [
                  'Expose a stable network address',
                  'Maintain a desired number of running Pod replicas',
                  'Store persistent data',
                  'Manage DNS records',
                ],
                correctIndex: 1,
              },
              {
                question: 'A Service provides:',
                options: [
                  'A stable network endpoint that load-balances across matching Pods',
                  'A way to build container images',
                  'Persistent storage for Pods',
                  'A scheduling algorithm',
                ],
                correctIndex: 0,
              },
              {
                question: 'If a Pod crashes, a Deployment will typically:',
                options: [
                  'Leave it crashed until manually restarted',
                  'Automatically replace it to maintain the desired replica count',
                  'Delete the entire cluster',
                  'Scale down to zero replicas',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e4_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Deploy an App to a Local Cluster',
            forLesson: 'Pods, Deployments & Services',
            dueDate: 'Jul 10',
            submission: 'Code upload',
            instructions:
              'Write a Deployment and Service manifest for a provided container image, apply them to a local cluster, and verify the app is reachable.',
            requirements: [
              'Deployment manifest with at least 2 replicas',
              'Service manifest exposing the Deployment',
              'Verification steps/output showing the app is reachable',
            ],
          },
        ],
      },
      {
        id: 'e4_l4',
        title: 'ConfigMaps, Secrets & Scaling',
        documents: [],
        videos: [
          {
            id: 'e4_v4',
            kind: 'video',
            title: 'ConfigMaps, Secrets & Scaling',
            duration: '16 min',
            intro:
              'Separate configuration from code and scale your workloads confidently using Kubernetes-native primitives.',
            topics: [
              'ConfigMaps for non-sensitive configuration',
              'Secrets for sensitive data',
              'Horizontal scaling with replica counts',
              'Rolling updates and rollbacks',
            ],
            moments: [
              { time: '0:00', label: 'ConfigMaps vs. Secrets' },
              { time: '4:00', label: 'Mounting config into Pods' },
              { time: '8:30', label: 'Scaling replicas' },
              { time: '12:30', label: 'Rolling updates and rollback' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e4_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'ConfigMaps, Secrets & Scaling Quiz',
            forLesson: 'ConfigMaps, Secrets & Scaling',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of Kubernetes configuration and scaling.',
            questions: [
              {
                question:
                  'A Secret differs from a ConfigMap primarily in that:',
                options: [
                  'Secrets are for non-sensitive data only',
                  'Secrets are intended for sensitive data such as credentials',
                  'ConfigMaps cannot be mounted as files',
                  'Secrets cannot be used as environment variables',
                ],
                correctIndex: 1,
              },
              {
                question: 'A rolling update in Kubernetes:',
                options: [
                  'Takes the entire application down during the update',
                  'Gradually replaces old Pods with new ones to avoid downtime',
                  'Only works for a single replica',
                  'Requires manual Pod deletion',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'If a rolling update introduces a bug, Kubernetes allows you to:',
                options: [
                  'Only redeploy from scratch',
                  'Roll back to the previous Deployment revision',
                  'Nothing — updates are irreversible',
                  'Only fix it by editing the running Pods directly',
                ],
                correctIndex: 1,
              },
              {
                question: 'Horizontal scaling in Kubernetes means:',
                options: [
                  'Increasing CPU/memory limits for one Pod',
                  'Increasing the number of Pod replicas',
                  'Adding more nodes only',
                  'Changing the container image',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e4_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Externalize Config and Scale a Deployment',
            forLesson: 'ConfigMaps, Secrets & Scaling',
            dueDate: 'Jul 12',
            submission: 'Code upload',
            instructions:
              'Move a hardcoded configuration value into a ConfigMap and a hardcoded credential into a Secret, then scale the Deployment to 4 replicas and perform a rolling update.',
            requirements: [
              'ConfigMap and Secret both created and mounted correctly',
              'Deployment scaled to 4 replicas',
              'A rolling update performed with zero downtime observed',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e5: UI/UX Design Essentials ───────────────────────────────────────

export const E5_MODULES: ReviewModule[] = [
  {
    id: 'e5_m1',
    title: 'Module 1: UX Foundations',
    lessons: [
      {
        id: 'e5_l1',
        title: 'User Research & Personas',
        documents: [],
        videos: [
          {
            id: 'e5_v1',
            kind: 'video',
            title: 'User Research & Personas',
            duration: '15 min',
            intro:
              'Good design starts with understanding real users, not assumptions. Learn core research methods and how to turn findings into personas.',
            topics: [
              'Qualitative vs. quantitative research methods',
              'Conducting a user interview',
              'Building a persona from research data',
              'Avoiding designing for yourself',
            ],
            moments: [
              { time: '0:00', label: 'Why research comes first' },
              { time: '4:00', label: 'Interview techniques' },
              { time: '8:30', label: 'Building personas' },
              { time: '12:00', label: 'Common research pitfalls' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e5_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'User Research & Personas Quiz',
            forLesson: 'User Research & Personas',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of user research fundamentals.',
            questions: [
              {
                question: 'A persona is:',
                options: [
                  'A real individual user',
                  'A fictional but research-based archetype representing a user segment',
                  'A marketing slogan',
                  'A wireframe template',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Qualitative research methods, such as interviews, are best for:',
                options: [
                  'Measuring statistical significance at scale',
                  'Understanding the "why" behind user behavior in depth',
                  'Replacing all quantitative data',
                  'A/B testing conversion rates',
                ],
                correctIndex: 1,
              },
              {
                question: 'Designing based only on your own preferences risks:',
                options: [
                  'Faster delivery with no downside',
                  'Building something that does not match real user needs',
                  'Guaranteed higher user satisfaction',
                  'Reduced development cost',
                ],
                correctIndex: 1,
              },
              {
                question: 'A good user interview question is generally:',
                options: [
                  'Leading, to confirm your hypothesis',
                  'Open-ended, to surface unexpected insights',
                  'A yes/no question only',
                  "About the interviewer's own opinions",
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e5_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a User Persona',
            forLesson: 'User Research & Personas',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Conduct three short interviews (or use provided interview notes) about a chosen app, then synthesize the findings into one detailed persona.',
            requirements: [
              'Persona includes goals, frustrations, and context of use',
              'Grounded in specific interview findings, not assumptions',
              'One sentence explaining what this persona would need most from the product',
            ],
          },
        ],
      },
      {
        id: 'e5_l2',
        title: 'Information Architecture & Wireframing',
        documents: [],
        videos: [
          {
            id: 'e5_v2',
            kind: 'video',
            title: 'Information Architecture & Wireframing',
            duration: '17 min',
            intro:
              'Before visual design comes structure. Learn to organize content logically and sketch layouts with low-fidelity wireframes.',
            topics: [
              'Card sorting and content organization',
              'Navigation patterns and hierarchy',
              'Low-fidelity wireframing principles',
              'Iterating before committing to visual design',
            ],
            moments: [
              { time: '0:00', label: 'What is information architecture' },
              { time: '4:30', label: 'Card sorting basics' },
              { time: '9:30', label: 'Navigation patterns' },
              { time: '13:30', label: 'Wireframing principles' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e5_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Information Architecture Quiz',
            forLesson: 'Information Architecture & Wireframing',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your knowledge of IA and wireframing.',
            questions: [
              {
                question: 'Card sorting is used to:',
                options: [
                  'Test color palettes',
                  'Understand how users naturally group and label content',
                  'Measure page load speed',
                  'Choose a font family',
                ],
                correctIndex: 1,
              },
              {
                question: 'A low-fidelity wireframe typically focuses on:',
                options: [
                  'Final colors and imagery',
                  'Layout, structure, and content hierarchy without visual polish',
                  'Pixel-perfect spacing',
                  'Animation timing',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Information architecture is primarily concerned with:',
                options: [
                  'How content is organized and navigated',
                  'Which fonts are used',
                  'Server-side performance',
                  'Marketing copywriting',
                ],
                correctIndex: 0,
              },
              {
                question: 'Wireframing before visual design allows teams to:',
                options: [
                  'Skip user testing entirely',
                  'Validate structure and flow cheaply before investing in visuals',
                  'Finalize the brand identity',
                  'Avoid writing any content',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e5_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Wireframe a Core User Flow',
            forLesson: 'Information Architecture & Wireframing',
            dueDate: 'Jul 8',
            submission: 'File upload',
            instructions:
              'Sketch low-fidelity wireframes (paper or digital) for a 3-screen core user flow of your choice, showing navigation between screens.',
            requirements: [
              'Three connected screens',
              'Clear indication of navigation/flow between screens',
              'Low-fidelity only — no final colors or imagery',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e5_m2',
    title: 'Module 2: UI & Design Systems',
    lessons: [
      {
        id: 'e5_l3',
        title: 'Visual Design Principles',
        documents: [],
        videos: [
          {
            id: 'e5_v3',
            kind: 'video',
            title: 'Visual Design Principles',
            duration: '16 min',
            intro:
              'Typography, color, and spacing are not decoration — they are functional tools that guide attention and communicate hierarchy.',
            topics: [
              'Typographic hierarchy and readability',
              'Color theory and accessible contrast',
              'Spacing, alignment, and visual rhythm',
              'Consistency as a usability principle',
            ],
            moments: [
              { time: '0:00', label: 'Why visual design is functional' },
              { time: '4:00', label: 'Typography hierarchy' },
              { time: '8:30', label: 'Color and contrast' },
              { time: '12:30', label: 'Spacing and alignment' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e5_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Visual Design Principles Quiz',
            forLesson: 'Visual Design Principles',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of visual design fundamentals.',
            questions: [
              {
                question: 'Typographic hierarchy helps users by:',
                options: [
                  'Making all text the same size for consistency',
                  'Signaling which content is most important at a glance',
                  'Reducing the number of fonts to one per project',
                  'Eliminating the need for headings',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Accessible color contrast is important primarily because:',
                options: [
                  'It is required by branding guidelines only',
                  'It ensures text remains readable for users with low vision or color blindness',
                  'It makes the interface look more colorful',
                  'It reduces file size',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Consistent spacing and alignment across a UI primarily improves:',
                options: [
                  'Load time',
                  'Perceived order and ease of scanning',
                  'Server costs',
                  'SEO ranking',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Visual design principles like hierarchy and contrast are best understood as:',
                options: [
                  'Purely aesthetic choices with no functional impact',
                  'Functional tools that guide attention and comprehension',
                  'Optional polish added at the very end',
                  'Irrelevant to usability',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e5_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Redesign a Poorly Designed Screen',
            forLesson: 'Visual Design Principles',
            dueDate: 'Jul 10',
            submission: 'File upload',
            instructions:
              'Take a provided screen with poor typographic hierarchy, weak contrast, and inconsistent spacing, and redesign it applying the principles from this lesson.',
            requirements: [
              'Clear typographic hierarchy applied',
              'Contrast meets accessible standards',
              'Consistent spacing/alignment throughout',
              'Brief note explaining each change made',
            ],
          },
        ],
      },
      {
        id: 'e5_l4',
        title: 'Building a Design System in Figma',
        documents: [],
        videos: [
          {
            id: 'e5_v4',
            kind: 'video',
            title: 'Building a Design System in Figma',
            duration: '19 min',
            intro:
              'Design systems keep products consistent and teams fast. Learn to build reusable components and styles in Figma.',
            topics: [
              'Design tokens: color, type, and spacing styles',
              'Building reusable components',
              'Variants and component properties',
              'Documenting a design system for a team',
            ],
            moments: [
              { time: '0:00', label: 'Why design systems matter' },
              { time: '4:30', label: 'Setting up styles/tokens' },
              { time: '10:00', label: 'Building components' },
              { time: '15:00', label: 'Variants and documentation' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e5_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Design Systems Quiz',
            forLesson: 'Building a Design System in Figma',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of design systems in Figma.',
            questions: [
              {
                question: 'A key benefit of a design system is:',
                options: [
                  'It eliminates the need for designers',
                  'It ensures visual and behavioral consistency across a product',
                  'It guarantees a product will be popular',
                  'It replaces user research',
                ],
                correctIndex: 1,
              },
              {
                question: 'Figma component variants allow you to:',
                options: [
                  'Store multiple states (e.g. default, hover, disabled) of one component in a single set',
                  'Merge unrelated components together',
                  'Automatically generate user personas',
                  'Skip the need for auto layout',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'Design tokens (color, type, spacing styles) exist primarily to:',
                options: [
                  'Centralize values so changes propagate consistently across the design',
                  'Increase file size',
                  'Replace the need for components',
                  'Only matter for developers, not designers',
                ],
                correctIndex: 0,
              },
              {
                question: 'Documenting a design system for a team helps by:',
                options: [
                  'Making the system harder to change',
                  'Ensuring consistent usage and reducing ad hoc decisions',
                  'Being optional busywork with no real value',
                  'Replacing the components themselves',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e5_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Mini Component Library',
            forLesson: 'Building a Design System in Figma',
            dueDate: 'Jul 12',
            submission: 'File upload',
            instructions:
              'In Figma, build a mini design system with color/type styles and at least three reusable components (e.g. button, input, card) with variants for their states.',
            requirements: [
              'Defined color and type styles',
              'At least three components with variants',
              'A short documentation note explaining how to use each component',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e6: Complete Python Bootcamp ──────────────────────────────────────

export const E6_MODULES: ReviewModule[] = [
  {
    id: 'e6_m1',
    title: 'Module 1: Python Basics',
    lessons: [
      {
        id: 'e6_l1',
        title: 'Data Types & Control Flow',
        documents: [],
        videos: [
          {
            id: 'e6_v1',
            kind: 'video',
            title: 'Data Types & Control Flow',
            duration: '16 min',
            intro:
              'Every Python program is built from a handful of core data types and control structures. Master these first.',
            topics: [
              'Numbers, strings, lists, dicts, and tuples',
              'if/elif/else branching',
              'for and while loops',
              'Common built-in functions',
            ],
            moments: [
              { time: '0:00', label: 'Core data types' },
              { time: '4:30', label: 'Conditional logic' },
              { time: '9:00', label: 'Loops in practice' },
              { time: '13:00', label: 'Useful built-ins' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e6_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Data Types & Control Flow Quiz',
            forLesson: 'Data Types & Control Flow',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your Python basics.',
            questions: [
              {
                question: 'Which data type is immutable in Python?',
                options: [
                  'list',
                  'dict',
                  'tuple',
                  'set (mutable elements aside)',
                ],
                correctIndex: 2,
              },
              {
                question: 'A for loop in Python typically iterates over:',
                options: [
                  'A condition until false',
                  'An iterable such as a list, string, or range',
                  'Only integers',
                  'Only dictionaries',
                ],
                correctIndex: 1,
              },
              {
                question: 'What does len([1, 2, 3]) return?',
                options: ['2', '3', '"3"', 'Error'],
                correctIndex: 1,
              },
              {
                question: 'Which keyword is used to exit a loop early?',
                options: ['stop', 'exit', 'break', 'return'],
                correctIndex: 2,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e6_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'FizzBuzz and Beyond',
            forLesson: 'Data Types & Control Flow',
            dueDate: 'Jul 6',
            submission: 'Code upload',
            instructions:
              'Implement the classic FizzBuzz for 1-100, then extend it with a third rule of your choosing (e.g. multiples of 7 print "Bazz").',
            requirements: [
              'Correct FizzBuzz output for 1-100',
              'One additional custom rule added and working',
              'Code uses a loop and conditional branching, not hardcoded output',
            ],
          },
        ],
      },
      {
        id: 'e6_l2',
        title: 'Functions & Data Structures',
        documents: [],
        videos: [
          {
            id: 'e6_v2',
            kind: 'video',
            title: 'Functions & Data Structures',
            duration: '18 min',
            intro:
              'Organize code into reusable functions and choose the right data structure for the job.',
            topics: [
              'Defining functions with parameters and return values',
              'Default and keyword arguments',
              'List comprehensions',
              'Choosing between list, dict, set, and tuple',
            ],
            moments: [
              { time: '0:00', label: 'Defining functions' },
              { time: '5:00', label: 'Default/keyword args' },
              { time: '10:00', label: 'List comprehensions' },
              { time: '14:30', label: 'Choosing data structures' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e6_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Functions & Data Structures Quiz',
            forLesson: 'Functions & Data Structures',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of Python functions and data structures.',
            questions: [
              {
                question: '[x * 2 for x in range(5)] is an example of:',
                options: [
                  'A generator expression',
                  'A list comprehension',
                  'A dictionary comprehension',
                  'A lambda function',
                ],
                correctIndex: 1,
              },
              {
                question: 'A dict is best suited for:',
                options: [
                  'Ordered numeric sequences only',
                  'Key-value lookups',
                  'Guaranteeing uniqueness of unordered items only',
                  'Storing only strings',
                ],
                correctIndex: 1,
              },
              {
                question: 'def greet(name="World"): uses:',
                options: [
                  'A required positional argument',
                  'A default argument value',
                  'A keyword-only argument',
                  'A variadic argument',
                ],
                correctIndex: 1,
              },
              {
                question: 'A set in Python guarantees:',
                options: [
                  'Insertion order is preserved',
                  'No duplicate elements',
                  'Key-value pairs',
                  'Immutability',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e6_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Word Frequency Counter',
            forLesson: 'Functions & Data Structures',
            dueDate: 'Jul 8',
            submission: 'Code upload',
            instructions:
              'Write a function that takes a paragraph of text and returns a dictionary of word frequencies, then print the five most common words.',
            requirements: [
              'Function correctly counts word frequency, case-insensitively',
              'Punctuation is stripped from words',
              'Top 5 most common words printed with counts',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e6_m2',
    title: 'Module 2: Building Applications',
    lessons: [
      {
        id: 'e6_l3',
        title: 'Working with Files & Modules',
        documents: [],
        videos: [
          {
            id: 'e6_v3',
            kind: 'video',
            title: 'Working with Files & Modules',
            duration: '15 min',
            intro:
              'Real programs read and write files, and organize code across multiple modules. Learn the essential patterns.',
            topics: [
              'Reading and writing text files safely',
              'The with statement and context managers',
              'Organizing code into modules',
              'Importing from your own and third-party modules',
            ],
            moments: [
              { time: '0:00', label: 'File I/O basics' },
              { time: '4:00', label: 'The with statement' },
              { time: '8:00', label: 'Organizing modules' },
              { time: '12:00', label: 'Imports in practice' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e6_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Files & Modules Quiz',
            forLesson: 'Working with Files & Modules',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of file handling and modules.',
            questions: [
              {
                question:
                  'Using `with open("file.txt") as f:` is preferred because:',
                options: [
                  'It is the only way to open a file',
                  'It automatically closes the file even if an error occurs',
                  'It opens the file in binary mode by default',
                  'It prevents the file from being read',
                ],
                correctIndex: 1,
              },
              {
                question: 'A Python module is:',
                options: [
                  'A single .py file that can be imported',
                  'Only a third-party package',
                  'A built-in keyword',
                  'A type of loop',
                ],
                correctIndex: 0,
              },
              {
                question: 'import math as m allows you to:',
                options: [
                  'Rename the math module to m for use in your code',
                  'Delete the math module',
                  'Only import one function from math',
                  'Nothing — this syntax is invalid',
                ],
                correctIndex: 0,
              },
              {
                question: 'Opening a file in "a" mode means:',
                options: [
                  'Read-only',
                  'Append to the end of the file',
                  'Overwrite the file completely',
                  'Open in binary mode',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e6_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Simple Note-Taking CLI',
            forLesson: 'Working with Files & Modules',
            dueDate: 'Jul 10',
            submission: 'Code upload',
            instructions:
              'Build a command-line tool that lets a user add notes to a text file and list all saved notes, split across at least two modules.',
            requirements: [
              'Notes persist across runs by being written to a file',
              'Code split into at least two modules (e.g. storage.py and main.py)',
              'Uses the with statement for all file access',
            ],
          },
        ],
      },
      {
        id: 'e6_l4',
        title: 'Automation Script Project',
        documents: [],
        videos: [
          {
            id: 'e6_v4',
            kind: 'video',
            title: 'Automation Script Project',
            duration: '17 min',
            intro:
              'Bring it all together by building a small automation script that solves a real, repetitive task.',
            topics: [
              'Planning a script from requirements',
              'Handling errors gracefully with try/except',
              'Reading configuration from the command line',
              'Testing your script against edge cases',
            ],
            moments: [
              { time: '0:00', label: 'Planning the script' },
              { time: '4:30', label: 'Error handling patterns' },
              { time: '9:30', label: 'Command-line arguments' },
              { time: '13:30', label: 'Testing edge cases' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e6_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Automation Script Quiz',
            forLesson: 'Automation Script Project',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of building small automation scripts.',
            questions: [
              {
                question: 'try/except is used to:',
                options: [
                  'Speed up code execution',
                  'Handle exceptions gracefully instead of crashing the program',
                  'Replace all if statements',
                  'Import external modules',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Reading arguments via sys.argv or argparse allows a script to:',
                options: [
                  'Only run interactively',
                  'Accept configuration from the command line without editing the code',
                  'Automatically write documentation',
                  'Skip testing',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Testing a script against edge cases (empty input, huge input, bad input) helps:',
                options: [
                  'Guarantee the script never fails',
                  'Reveal assumptions that break under unusual but plausible conditions',
                  'Make the script run faster',
                  'Replace the need for error handling',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A well-planned automation script generally starts from:',
                options: [
                  'Writing code immediately without a plan',
                  'A clear definition of the repetitive task and its expected inputs/outputs',
                  'Copying a script from elsewhere unmodified',
                  'Choosing variable names first',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e6_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a File Organizer Script',
            forLesson: 'Automation Script Project',
            dueDate: 'Jul 12',
            submission: 'Code upload',
            instructions:
              'Write a script that scans a folder and moves files into subfolders by file extension (e.g. images/, documents/), handling errors gracefully.',
            requirements: [
              'Files correctly sorted into extension-based subfolders',
              'Errors (e.g. permission issues) caught and reported, not crashing the script',
              'Script tested on a folder with at least three different file types',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e7: AWS Certified Solutions Architect ─────────────────────────────

export const E7_MODULES: ReviewModule[] = [
  {
    id: 'e7_m1',
    title: 'Module 1: Core AWS Services',
    lessons: [
      {
        id: 'e7_l1',
        title: 'EC2 & Compute Fundamentals',
        documents: [],
        videos: [
          {
            id: 'e7_v1',
            kind: 'video',
            title: 'EC2 & Compute Fundamentals',
            duration: '20 min',
            intro:
              'EC2 is the backbone of AWS compute. Learn instance types, pricing models, and how to choose the right configuration.',
            topics: [
              'Instance types and when to use each family',
              'On-demand vs. reserved vs. spot pricing',
              'Security groups as a virtual firewall',
              'AMIs and launching instances',
            ],
            moments: [
              { time: '0:00', label: 'What EC2 provides' },
              { time: '5:00', label: 'Choosing instance types' },
              { time: '11:00', label: 'Pricing models compared' },
              { time: '16:00', label: 'Security groups' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e7_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'EC2 & Compute Quiz',
            forLesson: 'EC2 & Compute Fundamentals',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your knowledge of EC2 fundamentals.',
            questions: [
              {
                question: 'Spot instances are best suited for:',
                options: [
                  'Mission-critical workloads that cannot tolerate interruption',
                  'Fault-tolerant, flexible workloads where cost savings matter more than guaranteed availability',
                  'Databases requiring 100% uptime',
                  'Long-term reserved capacity planning',
                ],
                correctIndex: 1,
              },
              {
                question: 'A security group in EC2 acts as:',
                options: [
                  'A billing alert',
                  'A virtual firewall controlling inbound/outbound traffic to an instance',
                  'A storage volume',
                  'A DNS record',
                ],
                correctIndex: 1,
              },
              {
                question: 'An AMI (Amazon Machine Image) is used to:',
                options: [
                  'Monitor instance health',
                  'Launch new EC2 instances from a pre-configured template',
                  'Store objects like a bucket',
                  'Route network traffic',
                ],
                correctIndex: 1,
              },
              {
                question: 'Reserved Instances typically offer:',
                options: [
                  'The lowest possible price with no commitment',
                  'A discount in exchange for a 1- or 3-year commitment',
                  'Free usage for the first year only',
                  'Unlimited compute at no cost',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e7_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design an EC2 Deployment Plan',
            forLesson: 'EC2 & Compute Fundamentals',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'For a given workload scenario (a spiky, fault-tolerant batch job), recommend an instance type, pricing model, and security group rules, with justification.',
            requirements: [
              'Instance family/type recommended with reasoning',
              'Pricing model chosen and justified against the workload profile',
              'Security group rules specified (ports and sources)',
            ],
          },
        ],
      },
      {
        id: 'e7_l2',
        title: 'S3, RDS & Storage Choices',
        documents: [],
        videos: [
          {
            id: 'e7_v2',
            kind: 'video',
            title: 'S3, RDS & Storage Choices',
            duration: '19 min',
            intro:
              'Choosing the right storage service is a recurring exam topic and a recurring real-world decision. Compare S3 and RDS.',
            topics: [
              'S3 as object storage: buckets, keys, and storage classes',
              'RDS as managed relational database',
              'When to choose S3 vs. RDS vs. other storage',
              'Backup and durability guarantees',
            ],
            moments: [
              { time: '0:00', label: 'S3 fundamentals' },
              { time: '5:30', label: 'Storage classes and lifecycle' },
              { time: '11:00', label: 'RDS overview' },
              { time: '16:00', label: 'Choosing the right storage' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e7_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'S3 & RDS Quiz',
            forLesson: 'S3, RDS & Storage Choices',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of AWS storage services.',
            questions: [
              {
                question: 'S3 is best described as:',
                options: [
                  'A managed relational database',
                  'Highly durable object storage accessed via buckets and keys',
                  'A compute service',
                  'A DNS service',
                ],
                correctIndex: 1,
              },
              {
                question: 'RDS is best suited for:',
                options: [
                  'Storing large binary files like images',
                  'Managed relational database workloads (e.g. MySQL, PostgreSQL)',
                  'Static website hosting only',
                  'Running arbitrary compute jobs',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'S3 storage classes (e.g. Standard, Infrequent Access, Glacier) primarily differ by:',
                options: [
                  'Programming language support',
                  'Cost vs. retrieval time/frequency trade-offs',
                  'Maximum object size only',
                  'Region availability only',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A key benefit of RDS over self-managed databases on EC2 is:',
                options: [
                  'It requires more manual patching',
                  'AWS manages backups, patching, and failover',
                  'It is always free',
                  'It does not support relational data',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e7_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Storage Architecture Decision',
            forLesson: 'S3, RDS & Storage Choices',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'For an e-commerce app storing product images and order data, recommend which AWS storage services to use for each data type and justify the choice.',
            requirements: [
              'Correct service recommended for images vs. structured order data',
              'Justification referencing durability, cost, or query needs',
              'At least one S3 storage class recommendation with reasoning',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e7_m2',
    title: 'Module 2: Networking & Architecture',
    lessons: [
      {
        id: 'e7_l3',
        title: 'VPC & Networking Fundamentals',
        documents: [],
        videos: [
          {
            id: 'e7_v3',
            kind: 'video',
            title: 'VPC & Networking Fundamentals',
            duration: '21 min',
            intro:
              'A VPC is your private network in AWS. Understand subnets, route tables, and gateways to design secure architectures.',
            topics: [
              'VPCs, subnets, and CIDR blocks',
              'Public vs. private subnets',
              'Internet gateways and NAT gateways',
              'Route tables and traffic flow',
            ],
            moments: [
              { time: '0:00', label: 'What a VPC is' },
              { time: '5:30', label: 'Public vs. private subnets' },
              { time: '11:30', label: 'Gateways explained' },
              { time: '17:00', label: 'Route tables in practice' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e7_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'VPC & Networking Quiz',
            forLesson: 'VPC & Networking Fundamentals',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your VPC and networking knowledge.',
            questions: [
              {
                question: 'A private subnet typically:',
                options: [
                  'Has a direct route to the internet gateway',
                  'Has no direct route to the internet gateway, often reaching the internet via a NAT gateway',
                  'Cannot host any resources',
                  'Is always publicly accessible',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A NAT gateway allows resources in a private subnet to:',
                options: [
                  'Accept inbound connections directly from the internet',
                  'Initiate outbound internet connections without being directly reachable from the internet',
                  'Bypass all security groups',
                  'Host a public website',
                ],
                correctIndex: 1,
              },
              {
                question: 'A route table determines:',
                options: [
                  'Which users can log into an instance',
                  'Where network traffic from a subnet is directed',
                  'The storage class of an S3 bucket',
                  'The pricing model of an EC2 instance',
                ],
                correctIndex: 1,
              },
              {
                question: 'CIDR blocks in a VPC are used to:',
                options: [
                  'Define the IP address range for the network',
                  'Set instance pricing',
                  'Configure IAM permissions',
                  'Define S3 bucket policies',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e7_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Secure VPC Layout',
            forLesson: 'VPC & Networking Fundamentals',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Design a VPC layout for a web app with a public-facing load balancer and a private database, specifying subnets, gateways, and route tables.',
            requirements: [
              'Public and private subnets clearly separated',
              'Correct gateway usage (internet gateway for public, NAT for private)',
              'Route tables specified for each subnet',
            ],
          },
        ],
      },
      {
        id: 'e7_l4',
        title: 'IAM, Resilience & Well-Architected Basics',
        documents: [],
        videos: [
          {
            id: 'e7_v4',
            kind: 'video',
            title: 'IAM, Resilience & Well-Architected Basics',
            duration: '18 min',
            intro:
              'Security and resilience are exam-critical and production-critical. Learn IAM least privilege and multi-AZ resilience patterns.',
            topics: [
              'IAM users, groups, roles, and policies',
              'The principle of least privilege',
              'Multi-AZ deployments for high availability',
              'An intro to the Well-Architected Framework pillars',
            ],
            moments: [
              { time: '0:00', label: 'IAM building blocks' },
              { time: '5:00', label: 'Least privilege in practice' },
              { time: '10:30', label: 'Multi-AZ resilience' },
              { time: '15:00', label: 'Well-Architected pillars' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e7_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'IAM & Resilience Quiz',
            forLesson: 'IAM, Resilience & Well-Architected Basics',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of IAM and resilience concepts.',
            questions: [
              {
                question:
                  'An IAM role differs from an IAM user in that a role:',
                options: [
                  'Always has permanent credentials',
                  'Is assumed temporarily by a trusted entity rather than tied to one person',
                  'Cannot be assigned permissions',
                  'Only applies to root accounts',
                ],
                correctIndex: 1,
              },
              {
                question: 'The principle of least privilege means:',
                options: [
                  'Granting full admin access to all users for simplicity',
                  'Granting only the permissions required to perform a task, nothing more',
                  'Disabling all permissions by default with no exceptions',
                  'Applying the same permissions to every resource',
                ],
                correctIndex: 1,
              },
              {
                question: 'A multi-AZ deployment improves resilience by:',
                options: [
                  'Running redundant resources across multiple isolated data centers within a region',
                  'Using a single powerful server',
                  'Reducing the number of backups',
                  'Disabling automatic failover',
                ],
                correctIndex: 0,
              },
              {
                question: 'The AWS Well-Architected Framework provides:',
                options: [
                  'A single mandatory architecture for all applications',
                  'A set of pillars (e.g. security, reliability, cost) for evaluating architecture decisions',
                  'A pricing calculator only',
                  'A certification exam only',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e7_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'IAM Least-Privilege Policy Design',
            forLesson: 'IAM, Resilience & Well-Architected Basics',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Write an IAM policy (in words or JSON) that grants a deployment role only the permissions it needs to deploy to a specific S3 bucket and EC2 instance, and explain why each permission is included.',
            requirements: [
              'Policy scoped to specific resources, not wildcard "*" access',
              'Each permission justified by a concrete deployment need',
              'No unnecessary permissions included',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e8: Full-Stack Web Development with Next.js ───────────────────────

export const E8_MODULES: ReviewModule[] = [
  {
    id: 'e8_m1',
    title: 'Module 1: Next.js App Router Fundamentals',
    lessons: [
      {
        id: 'e8_l1',
        title: 'File-Based Routing & Server Components',
        documents: [],
        videos: [
          {
            id: 'e8_v1',
            kind: 'video',
            title: 'File-Based Routing & Server Components',
            duration: '19 min',
            intro:
              'The App Router changes how routing and rendering work in React. Learn the file conventions and server-first rendering model.',
            topics: [
              'File-based routing: page.tsx, layout.tsx, route groups',
              'Server Components vs. Client Components',
              'When to add "use client"',
              'Nested layouts and loading/error states',
            ],
            moments: [
              { time: '0:00', label: 'File-based routing overview' },
              { time: '5:00', label: 'Server vs. Client Components' },
              { time: '11:00', label: 'Adding "use client"' },
              { time: '16:00', label: 'Nested layouts' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'App Router Fundamentals Quiz',
            forLesson: 'File-Based Routing & Server Components',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of the Next.js App Router.',
            questions: [
              {
                question: 'By default, components in the App Router are:',
                options: [
                  'Client Components',
                  'Server Components',
                  'Neither — rendering must always be explicit',
                  'Static HTML only',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The "use client" directive is needed when a component:',
                options: [
                  'Fetches data from a database',
                  'Uses browser-only APIs, state, or event handlers',
                  'Is a layout file',
                  'Renders only static text',
                ],
                correctIndex: 1,
              },
              {
                question: 'layout.tsx in the App Router is used to:',
                options: [
                  'Define a one-off page',
                  'Wrap shared UI around a segment and its children',
                  'Configure environment variables',
                  'Handle API routes',
                ],
                correctIndex: 1,
              },
              {
                question: 'A route group, e.g. (marketing), in the App Router:',
                options: [
                  'Changes the URL path',
                  'Organizes routes without affecting the URL structure',
                  'Is required for every project',
                  'Disables server rendering for that folder',
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
            title: 'Build a Multi-Route App Shell',
            forLesson: 'File-Based Routing & Server Components',
            dueDate: 'Jul 6',
            submission: 'Code upload',
            instructions:
              'Create an App Router project with a shared layout, at least three routes, and one Client Component that uses local state.',
            requirements: [
              'Shared layout applied across routes',
              'At least three distinct routes',
              'One Client Component correctly marked with "use client"',
            ],
          },
        ],
      },
      {
        id: 'e8_l2',
        title: 'Data Fetching & Server Actions',
        documents: [],
        videos: [
          {
            id: 'e8_v2',
            kind: 'video',
            title: 'Data Fetching & Server Actions',
            duration: '20 min',
            intro:
              'Fetch data directly in Server Components and mutate it with Server Actions — no separate API layer required.',
            topics: [
              'Fetching data directly inside Server Components',
              'Caching and revalidation basics',
              'Server Actions for mutations',
              'Progressive enhancement with forms',
            ],
            moments: [
              { time: '0:00', label: 'Fetching in Server Components' },
              { time: '5:30', label: 'Caching and revalidation' },
              { time: '11:30', label: 'Server Actions for mutations' },
              { time: '16:30', label: 'Forms with Server Actions' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Data Fetching & Server Actions Quiz',
            forLesson: 'Data Fetching & Server Actions',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of data fetching and Server Actions.',
            questions: [
              {
                question:
                  'In a Server Component, data fetching typically happens:',
                options: [
                  'Only inside useEffect',
                  'Directly in the component body using async/await',
                  'Only through a separate REST API you must build',
                  'Never — Server Components cannot fetch data',
                ],
                correctIndex: 1,
              },
              {
                question: 'A Server Action is best described as:',
                options: [
                  'A client-side event handler only',
                  'A function marked to run on the server, callable from a form or client code',
                  'A CSS animation',
                  'A type of database',
                ],
                correctIndex: 1,
              },
              {
                question: 'Revalidation in the Next.js data cache is used to:',
                options: [
                  'Permanently disable caching',
                  'Refresh cached data after a mutation or on a schedule',
                  'Delete the entire cache on every request',
                  'Only apply to images',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Using a Server Action directly on a <form action={...}> supports:',
                options: [
                  'Only client-side JavaScript execution',
                  'Progressive enhancement — the form can work even before JS loads',
                  'Server Actions cannot be used with forms',
                  'GET requests only',
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
            title: 'Build a Server-Actioned Form',
            forLesson: 'Data Fetching & Server Actions',
            dueDate: 'Jul 8',
            submission: 'Code upload',
            instructions:
              'Build a page that fetches a list of items in a Server Component and includes a form using a Server Action to add a new item, revalidating the list afterward.',
            requirements: [
              'List fetched and rendered in a Server Component',
              'Server Action correctly adds a new item',
              'Page revalidates and shows the new item without a full manual refresh',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e8_m2',
    title: 'Module 2: Full-Stack Features',
    lessons: [
      {
        id: 'e8_l3',
        title: 'Database Access with Prisma',
        documents: [],
        videos: [
          {
            id: 'e8_v3',
            kind: 'video',
            title: 'Database Access with Prisma',
            duration: '18 min',
            intro:
              'Prisma gives you type-safe database access from your Next.js server code. Learn schema design and basic queries.',
            topics: [
              'Defining a Prisma schema',
              'Running migrations',
              'Type-safe queries with the Prisma Client',
              'Connecting Prisma to Server Components and Server Actions',
            ],
            moments: [
              { time: '0:00', label: 'Prisma schema basics' },
              { time: '4:30', label: 'Running migrations' },
              { time: '9:30', label: 'Querying with Prisma Client' },
              { time: '14:00', label: 'Using Prisma in Next.js' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Prisma Quiz',
            forLesson: 'Database Access with Prisma',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of Prisma in a Next.js app.',
            questions: [
              {
                question: 'A Prisma migration is used to:',
                options: [
                  'Deploy the app to production',
                  'Apply schema changes to the actual database in a tracked way',
                  'Fetch data on the client',
                  'Style components',
                ],
                correctIndex: 1,
              },
              {
                question: 'The Prisma Client provides:',
                options: [
                  'A raw SQL-only interface',
                  'Type-safe methods generated from your schema for querying the database',
                  'A UI component library',
                  'Authentication out of the box',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'In a Next.js App Router project, Prisma Client is typically used:',
                options: [
                  'Only inside Client Components',
                  'Inside Server Components and Server Actions, never sent to the browser',
                  'Inside CSS files',
                  'Only in middleware',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Defining relations (e.g. one-to-many) in a Prisma schema allows you to:',
                options: [
                  'Query related records together in a type-safe way',
                  'Automatically generate a UI',
                  'Skip writing any queries',
                  'Avoid needing a database at all',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e8_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Model and Query a Blog Schema',
            forLesson: 'Database Access with Prisma',
            dueDate: 'Jul 10',
            submission: 'Code upload',
            instructions:
              'Define a Prisma schema for a blog (Post and Author models with a relation), run a migration, and write a query that fetches posts with their author.',
            requirements: [
              'Schema includes a one-to-many relation between Author and Post',
              'Migration applied successfully',
              'Query fetches posts joined with author data',
            ],
          },
        ],
      },
      {
        id: 'e8_l4',
        title: 'Styling & Deployment',
        documents: [],
        videos: [
          {
            id: 'e8_v4',
            kind: 'video',
            title: 'Styling & Deployment',
            duration: '15 min',
            intro:
              'Finish the app with Tailwind CSS styling and ship it to production with confidence.',
            topics: [
              'Utility-first styling with Tailwind CSS',
              'Responsive design with Tailwind breakpoints',
              'Environment variables in Next.js',
              'Deploying a Next.js app to production',
            ],
            moments: [
              { time: '0:00', label: 'Utility-first CSS' },
              { time: '4:00', label: 'Responsive breakpoints' },
              { time: '8:00', label: 'Environment variables' },
              { time: '11:30', label: 'Deployment checklist' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e8_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Styling & Deployment Quiz',
            forLesson: 'Styling & Deployment',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of styling and deploying a Next.js app.',
            questions: [
              {
                question: 'Tailwind CSS follows a:',
                options: [
                  'Component-scoped CSS-in-JS approach',
                  'Utility-first approach using small, composable classes',
                  'BEM naming convention exclusively',
                  'Inline styles only',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Environment variables prefixed with NEXT_PUBLIC_ in Next.js are:',
                options: [
                  'Kept server-only and hidden from the browser',
                  'Exposed to the browser bundle',
                  'Ignored entirely',
                  'Only usable in Server Actions',
                ],
                correctIndex: 1,
              },
              {
                question: 'A responsive Tailwind class like md:flex applies:',
                options: [
                  'Only below the md breakpoint',
                  'At the md breakpoint and above',
                  'Only when JavaScript is disabled',
                  'To print stylesheets only',
                ],
                correctIndex: 1,
              },
              {
                question: 'A production deployment checklist should include:',
                options: [
                  'Skipping environment variable configuration',
                  'Verifying environment variables, build success, and that secrets are not exposed',
                  'Disabling all caching',
                  'Removing all styling',
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
            title: 'Style and Ship the Blog App',
            forLesson: 'Styling & Deployment',
            dueDate: 'Jul 12',
            submission: 'Code upload',
            instructions:
              'Style the blog app from the previous lesson with Tailwind CSS to be responsive on mobile and desktop, then prepare it for deployment with correctly scoped environment variables.',
            requirements: [
              'Layout is responsive across at least two breakpoints',
              'Sensitive environment variables are not prefixed with NEXT_PUBLIC_',
              'A brief deployment checklist included in the submission',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e9: Machine Learning A-Z: Python & R ──────────────────────────────

export const E9_MODULES: ReviewModule[] = [
  {
    id: 'e9_m1',
    title: 'Module 1: Regression & Classification',
    lessons: [
      {
        id: 'e9_l1',
        title: 'Linear & Logistic Regression',
        documents: [],
        videos: [
          {
            id: 'e9_v1',
            kind: 'video',
            title: 'Linear & Logistic Regression',
            duration: '21 min',
            intro:
              'Regression is the foundation of predictive modeling. Learn linear regression for continuous outcomes and logistic regression for classification.',
            topics: [
              'Linear regression: fitting a line to predict continuous values',
              'Cost functions and gradient descent, conceptually',
              'Logistic regression for binary classification',
              'Interpreting coefficients and probabilities',
            ],
            moments: [
              { time: '0:00', label: 'Linear regression intuition' },
              { time: '6:00', label: 'Cost function and gradient descent' },
              {
                time: '12:30',
                label: 'Logistic regression for classification',
              },
              { time: '18:00', label: 'Interpreting model output' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e9_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Regression Quiz',
            forLesson: 'Linear & Logistic Regression',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of regression models.',
            questions: [
              {
                question: 'Linear regression is used to predict:',
                options: [
                  'A category label',
                  'A continuous numeric value',
                  'Only binary outcomes',
                  'Text data',
                ],
                correctIndex: 1,
              },
              {
                question: 'Logistic regression, despite its name, is used for:',
                options: [
                  'Continuous value prediction',
                  'Classification problems',
                  'Clustering',
                  'Dimensionality reduction',
                ],
                correctIndex: 1,
              },
              {
                question: 'Gradient descent is used to:',
                options: [
                  'Visualize the data',
                  'Iteratively adjust model parameters to minimize a cost function',
                  'Split data into train/test sets',
                  'Remove outliers automatically',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Logistic regression outputs are best interpreted as:',
                options: [
                  'Exact class labels only',
                  'Probabilities that are then thresholded into classes',
                  'Continuous unbounded values',
                  'Cluster centroids',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e9_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Predict House Prices with Linear Regression',
            forLesson: 'Linear & Logistic Regression',
            dueDate: 'Jul 6',
            submission: 'Code upload',
            instructions:
              'Using a provided housing dataset, train a linear regression model to predict price, then report the R² score and interpret one coefficient.',
            requirements: [
              'Model trained without errors',
              'R² score reported on a held-out test set',
              'One coefficient interpreted in plain language',
            ],
          },
        ],
      },
      {
        id: 'e9_l2',
        title: 'Decision Trees & Model Evaluation',
        documents: [],
        videos: [
          {
            id: 'e9_v2',
            kind: 'video',
            title: 'Decision Trees & Model Evaluation',
            duration: '19 min',
            intro:
              'Decision trees offer an intuitive, interpretable classification method. Learn to evaluate any classifier properly.',
            topics: [
              'How decision trees split data',
              'Overfitting in trees and how depth limits help',
              'Confusion matrices',
              'Precision, recall, and when accuracy is misleading',
            ],
            moments: [
              { time: '0:00', label: 'How trees split data' },
              { time: '5:30', label: 'Overfitting and tree depth' },
              { time: '11:00', label: 'Confusion matrix walkthrough' },
              { time: '16:00', label: 'Precision vs. recall' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e9_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Decision Trees & Evaluation Quiz',
            forLesson: 'Decision Trees & Model Evaluation',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of decision trees and model evaluation.',
            questions: [
              {
                question: 'A decision tree with unlimited depth is prone to:',
                options: [
                  'Underfitting',
                  'Overfitting the training data',
                  'Never converging',
                  'Producing only linear boundaries',
                ],
                correctIndex: 1,
              },
              {
                question: 'Accuracy can be misleading when:',
                options: [
                  'Classes are perfectly balanced',
                  'The dataset has a highly imbalanced class distribution',
                  'The model is a decision tree',
                  'There are only two features',
                ],
                correctIndex: 1,
              },
              {
                question: 'Recall measures:',
                options: [
                  'The proportion of predicted positives that are actually positive',
                  'The proportion of actual positives that were correctly identified',
                  'Overall model speed',
                  'The number of features used',
                ],
                correctIndex: 1,
              },
              {
                question: 'A confusion matrix shows:',
                options: [
                  'Feature correlations',
                  'The breakdown of correct and incorrect predictions by class',
                  'Training time per epoch',
                  'The learning rate schedule',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e9_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Classify and Evaluate with a Decision Tree',
            forLesson: 'Decision Trees & Model Evaluation',
            dueDate: 'Jul 8',
            submission: 'Code upload',
            instructions:
              'Train a decision tree classifier on a provided imbalanced dataset, then report a confusion matrix and explain why accuracy alone would be misleading here.',
            requirements: [
              'Decision tree trained and evaluated on a held-out test set',
              'Confusion matrix reported',
              'Written explanation of why precision/recall matter more than accuracy for this dataset',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e9_m2',
    title: 'Module 2: Clustering & Deep Learning Intro',
    lessons: [
      {
        id: 'e9_l3',
        title: 'K-Means Clustering',
        documents: [],
        videos: [
          {
            id: 'e9_v3',
            kind: 'video',
            title: 'K-Means Clustering',
            duration: '17 min',
            intro:
              'Not all problems have labels. Learn K-Means, the most common unsupervised clustering algorithm.',
            topics: [
              'Unsupervised vs. supervised learning',
              'The K-Means algorithm step by step',
              'Choosing K with the elbow method',
              'Limitations of K-Means',
            ],
            moments: [
              { time: '0:00', label: 'Unsupervised learning intro' },
              { time: '4:30', label: 'K-Means algorithm steps' },
              { time: '9:30', label: 'Choosing K' },
              { time: '14:00', label: 'Limitations of K-Means' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e9_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'K-Means Clustering Quiz',
            forLesson: 'K-Means Clustering',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of K-Means clustering.',
            questions: [
              {
                question: 'K-Means clustering is a form of:',
                options: [
                  'Supervised learning',
                  'Unsupervised learning',
                  'Reinforcement learning',
                  'Regression',
                ],
                correctIndex: 1,
              },
              {
                question: 'The "K" in K-Means refers to:',
                options: [
                  'The number of features',
                  'The number of clusters to form',
                  'The number of training epochs',
                  'The learning rate',
                ],
                correctIndex: 1,
              },
              {
                question: 'The elbow method helps determine:',
                options: [
                  'The best learning rate',
                  'A reasonable value of K by plotting inertia against K',
                  'Whether the data is labeled',
                  'The number of decision tree splits',
                ],
                correctIndex: 1,
              },
              {
                question: 'A known limitation of K-Means is that it:',
                options: [
                  'Requires labeled data',
                  'Assumes roughly spherical, similarly-sized clusters',
                  'Cannot run on numeric data',
                  'Always finds the globally optimal clustering',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e9_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Segment Customers with K-Means',
            forLesson: 'K-Means Clustering',
            dueDate: 'Jul 10',
            submission: 'Code upload',
            instructions:
              'Apply K-Means to a provided customer dataset (e.g. spending score and income), use the elbow method to choose K, and describe each resulting segment.',
            requirements: [
              'Elbow method plot used to justify chosen K',
              'Clustering applied and visualized',
              'A one-sentence description of each cluster/segment',
            ],
          },
        ],
      },
      {
        id: 'e9_l4',
        title: 'Introduction to Neural Networks',
        documents: [],
        videos: [
          {
            id: 'e9_v4',
            kind: 'video',
            title: 'Introduction to Neural Networks',
            duration: '22 min',
            intro:
              'Neural networks power modern deep learning. Get an intuitive, non-mathematical-heavy introduction to how they work.',
            topics: [
              'Neurons, weights, and activation functions',
              'Forward propagation intuition',
              'Why deep networks can model complex patterns',
              'When to reach for deep learning vs. simpler models',
            ],
            moments: [
              { time: '0:00', label: 'What a neuron computes' },
              { time: '6:00', label: 'Activation functions' },
              { time: '12:00', label: 'Forward propagation' },
              { time: '18:00', label: 'When to use deep learning' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e9_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Neural Networks Quiz',
            forLesson: 'Introduction to Neural Networks',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your foundational understanding of neural networks.',
            questions: [
              {
                question:
                  'An activation function in a neural network primarily serves to:',
                options: [
                  'Speed up data loading',
                  'Introduce non-linearity so the network can model complex patterns',
                  'Normalize the dataset',
                  'Replace the need for training data',
                ],
                correctIndex: 1,
              },
              {
                question: 'Forward propagation refers to:',
                options: [
                  'Updating weights after computing error',
                  'Passing input data through the network layer by layer to produce an output',
                  'Splitting data into train/test sets',
                  'Visualizing the loss curve',
                ],
                correctIndex: 1,
              },
              {
                question: 'Deep learning tends to be most advantageous when:',
                options: [
                  'The dataset is very small',
                  'There is a large amount of data and complex patterns to learn (e.g. images, text)',
                  'Interpretability is the top priority',
                  'A simple linear relationship is known to exist',
                ],
                correctIndex: 1,
              },
              {
                question: 'A neural network "weight" represents:',
                options: [
                  'The importance/strength of a connection between neurons, learned during training',
                  'A fixed hyperparameter that never changes',
                  'The number of layers in the network',
                  'The dataset size',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e9_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Compare a Simple Model to a Neural Network',
            forLesson: 'Introduction to Neural Networks',
            dueDate: 'Jul 12',
            submission: 'Code upload',
            instructions:
              'Train a simple neural network on a provided classification dataset and compare its accuracy and training time to the logistic regression model from an earlier lesson.',
            requirements: [
              'Neural network trained successfully',
              'Accuracy and training time compared side by side with logistic regression',
              'A short conclusion on which approach was more appropriate for this dataset and why',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e10: Responsive Design Reading Pack (document-first) ─────────────

export const E10_MODULES: ReviewModule[] = [
  {
    id: 'e10_m1',
    title: 'Module 1: Responsive Foundations',
    lessons: [
      {
        id: 'e10_l1',
        title: 'Mobile-First Thinking',
        documents: [
          {
            id: 'e10_d1',
            kind: 'document',
            title: 'Mobile-First Thinking',
            readTime: '5 – 6 min read',
            intro:
              'Mobile-first design forces disciplined prioritization by starting with the most constrained viewport and progressively enhancing.',
            objectives: [
              'Explain why mobile-first design produces leaner, more focused layouts',
              'Identify how min-width media queries differ from max-width, desktop-first ones',
            ],
            sections: [
              {
                heading: 'Why Start with Mobile',
                text: 'Designing for the smallest screen first forces you to prioritize content and remove anything non-essential. It is far easier to progressively add complexity for larger screens than to strip complexity away from a desktop layout that was never designed to shrink.',
                tip: 'If a piece of content is not important enough for the mobile layout, question whether it belongs on the page at all.',
              },
              {
                heading: 'min-width vs. max-width Media Queries',
                text: 'Mobile-first CSS uses min-width media queries: base styles target the smallest screen, and each breakpoint adds styles as the viewport grows. Desktop-first CSS does the reverse with max-width, which tends to produce more overrides and a heavier base stylesheet delivered to every device, including small ones.',
              },
            ],
            takeaways: [
              'Mobile-first design forces content prioritization by starting with the most constrained case',
              'min-width media queries build up progressively, producing leaner CSS than max-width overrides',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e10_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Mobile-First Thinking Quiz',
            forLesson: 'Mobile-First Thinking',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of mobile-first design.',
            questions: [
              {
                question: 'Mobile-first design starts by:',
                options: [
                  'Designing the desktop layout first, then shrinking it',
                  'Designing for the smallest, most constrained viewport first',
                  'Ignoring mobile devices entirely',
                  'Designing all breakpoints simultaneously with no priority',
                ],
                correctIndex: 1,
              },
              {
                question: 'A mobile-first stylesheet typically uses:',
                options: [
                  'max-width media queries only',
                  'min-width media queries that add styles as the viewport grows',
                  'No media queries at all',
                  'Only inline styles',
                ],
                correctIndex: 1,
              },
              {
                question: 'A benefit of mobile-first design is:',
                options: [
                  'It guarantees a smaller total file size regardless of implementation',
                  'It forces prioritization of essential content',
                  'It removes the need for any testing',
                  'It eliminates the need for breakpoints',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Desktop-first CSS using max-width queries tends to result in:',
                options: [
                  'Less CSS overall',
                  'More override styles as complexity is stripped away for smaller screens',
                  'Faster load times on mobile by default',
                  'Simplified content strategy',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e10_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Mobile-First Audit',
            forLesson: 'Mobile-First Thinking',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Pick a website you use often and audit its mobile experience. Identify two elements that appear to have been designed desktop-first and explain how a mobile-first approach would change them.',
            requirements: [
              'Two specific elements identified with screenshots or descriptions',
              'Explanation of the desktop-first symptoms observed',
              'A mobile-first alternative proposed for each element',
            ],
          },
        ],
      },
      {
        id: 'e10_l2',
        title: 'Flexible Grids & Fluid Images',
        documents: [
          {
            id: 'e10_d2',
            kind: 'document',
            title: 'Flexible Grids & Fluid Images',
            readTime: '4 – 5 min read',
            intro:
              'Fixed pixel layouts break across devices. Flexible grids and fluid images are the two techniques that make layouts adapt.',
            objectives: [
              'Explain how relative units create flexible grid layouts',
              'Apply fluid image techniques to prevent overflow on small screens',
            ],
            sections: [
              {
                heading: 'Relative Units Over Fixed Pixels',
                text: 'Using percentages, fr units (CSS Grid), or rem/em instead of fixed pixel widths allows a layout to expand and contract with the viewport rather than breaking at arbitrary widths. A grid built with fr units redistributes space proportionally at any screen size.',
              },
              {
                heading: 'Fluid Images',
                text: 'Setting max-width: 100% and height: auto on images ensures they never overflow their container while preserving aspect ratio. For art-directed responsive images (different crops per breakpoint), the <picture> element with multiple <source> entries gives full control.',
                tip: 'A single "max-width: 100%; height: auto" rule on all images prevents the most common responsive layout bug: images breaking out of their containers.',
              },
            ],
            takeaways: [
              'Relative units (%, fr, rem) let grids adapt fluidly instead of breaking at fixed widths',
              'max-width: 100% and height: auto on images is the single most effective fix for image overflow',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e10_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Flexible Grids & Fluid Images Quiz',
            forLesson: 'Flexible Grids & Fluid Images',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of flexible layout techniques.',
            questions: [
              {
                question: 'Using fr units in CSS Grid allows columns to:',
                options: [
                  'Have a fixed pixel width regardless of viewport',
                  'Share available space proportionally',
                  'Only work in flexbox, not grid',
                  'Disable responsiveness',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The most common fix for images overflowing their container is:',
                options: [
                  'Setting a fixed width in pixels',
                  'max-width: 100%; height: auto;',
                  'Removing the image entirely',
                  'Using position: fixed',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The <picture> element with multiple <source> entries is useful for:',
                options: [
                  'Playing video content',
                  'Serving different image crops or formats per breakpoint',
                  'Only working on mobile devices',
                  'Replacing all <img> tags with no benefit',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Relative units like % and rem are preferred over fixed pixels in responsive layouts because they:',
                options: [
                  'Are the only units browsers support',
                  'Scale proportionally with the viewport or root font size',
                  'Always produce identical results to pixels',
                  'Cannot be used with media queries',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e10_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Convert a Fixed Layout to Fluid',
            forLesson: 'Flexible Grids & Fluid Images',
            dueDate: 'Jul 8',
            submission: 'Code upload',
            instructions:
              'Take a provided fixed-pixel two-column layout with an image and convert it to a fluid layout using relative units and a fluid image rule.',
            requirements: [
              'All fixed pixel widths replaced with relative units',
              'Image no longer overflows its container at any tested width',
              'Layout tested at three viewport widths (e.g. 320px, 768px, 1440px)',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e10_m2',
    title: 'Module 2: Breakpoints & Accessibility',
    lessons: [
      {
        id: 'e10_l3',
        title: 'Choosing Breakpoints',
        documents: [
          {
            id: 'e10_d3',
            kind: 'document',
            title: 'Choosing Breakpoints',
            readTime: '4 min read',
            intro:
              'Breakpoints should be driven by where your content breaks, not by specific device dimensions.',
            objectives: [
              'Explain why content-driven breakpoints outperform device-driven ones',
              'Identify signs that a layout needs a new breakpoint',
            ],
            sections: [
              {
                heading: 'Content-Driven, Not Device-Driven',
                text: 'Targeting specific device widths (e.g. "iPhone 12 width") is fragile because new devices ship constantly. Instead, resize the browser and add a breakpoint exactly where the layout starts to look cramped or awkward — wherever that happens to fall.',
                tip: 'Resize your browser slowly from full width down to the smallest size. Add a breakpoint at each point the layout visibly breaks.',
              },
              {
                heading: 'Signs You Need a New Breakpoint',
                text: 'Text lines becoming too long or too short to read comfortably, images overlapping text, navigation items wrapping awkwardly, and excessive whitespace are all signals. A well-tuned responsive design usually needs only 3-5 breakpoints, not one per device.',
              },
            ],
            takeaways: [
              'Breakpoints should be chosen based on where content breaks, not specific device widths',
              'Most layouts need only 3-5 well-placed breakpoints',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e10_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Choosing Breakpoints Quiz',
            forLesson: 'Choosing Breakpoints',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of breakpoint strategy.',
            questions: [
              {
                question:
                  'The recommended approach to choosing breakpoints is to:',
                options: [
                  'Target specific popular device widths',
                  'Resize the layout and add breakpoints where content starts to break',
                  'Use as many breakpoints as possible for safety',
                  'Avoid breakpoints entirely',
                ],
                correctIndex: 1,
              },
              {
                question: 'Targeting specific device widths is risky because:',
                options: [
                  'Devices never change their screen size',
                  'New device sizes ship constantly, making device-specific breakpoints fragile',
                  'It is the only method supported by CSS',
                  'It automatically improves accessibility',
                ],
                correctIndex: 1,
              },
              {
                question: 'A typical well-tuned responsive design uses:',
                options: [
                  'One breakpoint per known device',
                  'Roughly 3-5 breakpoints based on content',
                  'No breakpoints',
                  'Over 20 breakpoints for precision',
                ],
                correctIndex: 1,
              },
              {
                question: 'A sign that a new breakpoint is needed is:',
                options: [
                  'The layout looks identical at all sizes',
                  'Text lines becoming uncomfortably long or short, or elements overlapping',
                  'The page loads quickly',
                  'Images are smaller than their container',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e10_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Find Your Own Breakpoints',
            forLesson: 'Choosing Breakpoints',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Resize a provided sample layout in the browser and document the exact pixel widths where you would add breakpoints, with a screenshot and reason for each.',
            requirements: [
              'At least three breakpoints identified with specific pixel values',
              'A screenshot or description of the layout issue at each point',
              'Reasoning tied to content, not device names',
            ],
          },
        ],
      },
      {
        id: 'e10_l4',
        title: 'Responsive Accessibility Checkpoints',
        documents: [
          {
            id: 'e10_d4',
            kind: 'document',
            title: 'Responsive Accessibility Checkpoints',
            readTime: '5 min read',
            intro:
              'Responsive design and accessibility overlap more than most designers realize — touch targets, zoom, and reflow all matter.',
            objectives: [
              'List the minimum touch target size for mobile accessibility',
              'Explain why disabling pinch-to-zoom is an accessibility anti-pattern',
            ],
            sections: [
              {
                heading: 'Touch Target Size',
                text: 'WCAG recommends a minimum touch target size of 44x44 CSS pixels for interactive elements on touchscreens. Smaller targets cause mis-taps, disproportionately affecting users with motor impairments or larger fingers.',
              },
              {
                heading: 'Never Disable Zoom',
                text: 'Setting maximum-scale=1 or user-scalable=no in the viewport meta tag prevents low-vision users from zooming in to read content — this is a WCAG failure and should never be used. Content should also reflow (not require horizontal scrolling) when zoomed to 400%.',
              },
            ],
            takeaways: [
              'Interactive elements need at least a 44x44px touch target on mobile',
              'Never disable pinch-to-zoom — content must remain zoomable and reflow at 400%',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e10_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Responsive Accessibility Quiz',
            forLesson: 'Responsive Accessibility Checkpoints',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of responsive accessibility requirements.',
            questions: [
              {
                question:
                  'The recommended minimum touch target size on mobile is:',
                options: [
                  '16x16 CSS pixels',
                  '44x44 CSS pixels',
                  '100x100 CSS pixels',
                  'There is no recommended minimum',
                ],
                correctIndex: 1,
              },
              {
                question: 'Setting user-scalable=no in the viewport meta tag:',
                options: [
                  'Improves accessibility for low-vision users',
                  'Is an accessibility anti-pattern that prevents zooming',
                  'Is required by WCAG',
                  'Has no effect on accessibility',
                ],
                correctIndex: 1,
              },
              {
                question: 'At 400% zoom, accessible content should:',
                options: [
                  'Require horizontal scrolling to read',
                  'Reflow so the user does not need to scroll horizontally',
                  'Become invisible',
                  'Automatically switch to a desktop layout',
                ],
                correctIndex: 1,
              },
              {
                question: 'Small touch targets disproportionately affect:',
                options: [
                  'Only users on fast internet connections',
                  'Users with motor impairments or larger fingers',
                  'Only desktop users',
                  'No specific user group',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e10_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Accessibility Audit Checklist',
            forLesson: 'Responsive Accessibility Checkpoints',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Audit a provided mobile page for touch target size, zoom behavior, and reflow at 400% zoom. Document any failures found.',
            requirements: [
              'Touch targets measured or estimated against the 44x44px guideline',
              'Zoom behavior tested and reported',
              'At least one concrete fix proposed for any failure found',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e11: Business Strategy Playbook (document-first) ─────────────────

export const E11_MODULES: ReviewModule[] = [
  {
    id: 'e11_m1',
    title: 'Module 1: Strategic Foundations',
    lessons: [
      {
        id: 'e11_l1',
        title: 'What Makes a Strategy',
        documents: [
          {
            id: 'e11_d1',
            kind: 'document',
            title: 'What Makes a Strategy',
            readTime: '5 min read',
            intro:
              'A strategy is a set of coherent choices about where to compete and how to win — not a list of goals or a budget.',
            objectives: [
              'Distinguish strategy from goals, tactics, and planning',
              'Explain why trade-offs are the defining feature of a real strategy',
            ],
            sections: [
              {
                heading: 'Strategy vs. Goals',
                text: 'A goal ("grow revenue 20%") states a desired outcome. A strategy explains the specific, coherent set of choices — which customers to serve, which to ignore, which capabilities to build — that make that outcome achievable. Without explicit choices, a "strategy" is just a wish.',
                tip: 'If a strategy document contains no explicit trade-off ("we will not do X in order to focus on Y"), it is probably a goals list, not a strategy.',
              },
              {
                heading: 'Trade-offs Are the Point',
                text: "Michael Porter's core insight: strategy is choosing what not to do. A company trying to be the cheapest and the most premium and the most convenient option simultaneously has no strategy — it has contradictions. Real strategy accepts losing some opportunities to win others decisively.",
              },
            ],
            takeaways: [
              'A strategy is a coherent set of choices about where to compete, not a list of desired outcomes',
              'Real strategy requires explicit trade-offs — choosing what not to pursue',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'What Makes a Strategy Quiz',
            forLesson: 'What Makes a Strategy',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of what strategy actually is.',
            questions: [
              {
                question: 'A goal differs from a strategy in that a goal:',
                options: [
                  'Describes the desired outcome without explaining how to achieve it',
                  'Always includes explicit trade-offs',
                  'Is more detailed than a strategy',
                  'Cannot be measured',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'According to Porter, strategy is fundamentally about:',
                options: [
                  'Doing everything competitors do, but faster',
                  'Choosing what not to do',
                  'Maximizing the number of customer segments served',
                  'Avoiding all risk',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A company trying to be simultaneously the cheapest, most premium, and most convenient likely has:',
                options: [
                  'A well-balanced strategy',
                  'No real strategy — contradictory positioning',
                  'The ideal strategy for all markets',
                  'A strategy that requires no trade-offs',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A document with no trade-offs stated is best described as:',
                options: [
                  'A strategy',
                  'Likely just a goals list',
                  'A tactic',
                  'A budget',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e11_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Identify a Real Trade-off',
            forLesson: 'What Makes a Strategy',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Pick a company you know well and identify one explicit trade-off in its strategy — something it deliberately does not do in order to win elsewhere.',
            requirements: [
              'A specific company named with the trade-off clearly stated',
              'Explanation of what the company gains by making this trade-off',
              'Explanation of what it gives up',
            ],
          },
        ],
      },
      {
        id: 'e11_l2',
        title: 'Analyzing Competitive Position',
        documents: [
          {
            id: 'e11_d2',
            kind: 'document',
            title: 'Analyzing Competitive Position',
            readTime: '6 min read',
            intro:
              'Before choosing a strategy, understand the competitive forces shaping the industry and where your organization stands within them.',
            objectives: [
              'Apply the Five Forces framework to assess industry attractiveness',
              'Distinguish cost leadership from differentiation as generic strategies',
            ],
            sections: [
              {
                heading: 'Five Forces, Briefly',
                text: "Porter's Five Forces — competitive rivalry, supplier power, buyer power, threat of substitution, threat of new entry — determine how much value an industry allows firms to capture. A market with intense rivalry and low barriers to entry will struggle to sustain high margins regardless of individual company effort.",
              },
              {
                heading: 'Cost Leadership vs. Differentiation',
                text: 'Once you understand the industry, a firm typically competes via cost leadership (winning on price through efficiency) or differentiation (winning on unique value that justifies a premium). Attempting both without a clear priority usually results in "stuck in the middle" — matching neither the cost leader nor the premium player.',
              },
            ],
            takeaways: [
              'The Five Forces framework explains why some industries are structurally more profitable than others',
              'Firms generally win through cost leadership or differentiation — rarely both at once',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Competitive Position Quiz',
            forLesson: 'Analyzing Competitive Position',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of competitive analysis frameworks.',
            questions: [
              {
                question: "Porter's Five Forces framework is used to assess:",
                options: [
                  "An individual employee's performance",
                  'The structural attractiveness and profitability potential of an industry',
                  "A single product's marketing budget",
                  'Customer satisfaction scores only',
                ],
                correctIndex: 1,
              },
              {
                question: 'High buyer power in an industry typically means:',
                options: [
                  'Buyers have little influence on price',
                  'Buyers can negotiate prices down or switch easily, compressing margins',
                  'Suppliers have no influence',
                  'The industry has no competitors',
                ],
                correctIndex: 1,
              },
              {
                question: 'A firm "stuck in the middle" is one that:',
                options: [
                  'Has a clear, focused cost leadership strategy',
                  'Fails to commit clearly to either cost leadership or differentiation',
                  'Dominates through differentiation',
                  'Has no competitors',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Differentiation as a generic strategy means competing primarily on:',
                options: [
                  'Being the lowest-cost producer',
                  'Offering unique value that justifies a price premium',
                  'Ignoring customer needs',
                  'Matching every competitor feature-for-feature',
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
            title: 'Five Forces Analysis',
            forLesson: 'Analyzing Competitive Position',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Choose an industry and write a Five Forces analysis, rating each force as low/medium/high with a one-sentence justification.',
            requirements: [
              'All five forces addressed with a rating and justification',
              'Overall conclusion on industry attractiveness',
              'Specific real-world examples referenced, not generic statements',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e11_m2',
    title: 'Module 2: Executing Strategy',
    lessons: [
      {
        id: 'e11_l3',
        title: 'From Strategy to Execution',
        documents: [
          {
            id: 'e11_d3',
            kind: 'document',
            title: 'From Strategy to Execution',
            readTime: '5 min read',
            intro:
              'Most strategies fail in execution, not formulation. Learn why alignment between strategy and operations is the harder half of the work.',
            objectives: [
              'Explain why execution failure is more common than strategy formulation failure',
              'Identify the role of OKRs in connecting strategy to daily work',
            ],
            sections: [
              {
                heading: 'Execution Is the Hard Part',
                text: 'Research consistently shows most strategic failures are execution failures, not flawed strategy. A brilliant strategy that is never translated into specific, resourced initiatives with clear owners will produce no results. The gap between the strategy document and daily team priorities is where most value is lost.',
              },
              {
                heading: 'Connecting Strategy to Daily Work',
                text: 'Frameworks like OKRs (Objectives and Key Results) exist to cascade strategic priorities down into measurable team-level commitments. The objective states direction; key results make progress falsifiable. Without this connective tissue, teams default to whatever is locally urgent, regardless of strategic priority.',
              },
            ],
            takeaways: [
              'Most strategic failures happen in execution, not in the strategy itself',
              'OKRs (or similar frameworks) connect high-level strategy to specific, measurable team commitments',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'From Strategy to Execution Quiz',
            forLesson: 'From Strategy to Execution',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of strategy execution.',
            questions: [
              {
                question:
                  'Research on strategic failure most commonly finds the cause to be:',
                options: [
                  'A flawed strategy itself',
                  'Poor execution of an otherwise reasonable strategy',
                  'Lack of any strategy at all',
                  'External market conditions exclusively',
                ],
                correctIndex: 1,
              },
              {
                question: 'The purpose of Key Results in an OKR is to:',
                options: [
                  'State a vague aspiration',
                  'Make progress toward an objective measurable and falsifiable',
                  'Replace the objective entirely',
                  'Assign blame for missed targets',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Without a framework connecting strategy to daily work, teams tend to:',
                options: [
                  'Automatically align with strategic priorities',
                  'Default to whatever feels locally urgent',
                  'Stop working entirely',
                  'Only work on long-term projects',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The "gap" where most strategic value is lost is typically between:',
                options: [
                  'Two competing strategy documents',
                  'The strategy document and actual daily team priorities',
                  'Two different industries',
                  'The CEO and the board',
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
            title: 'Draft an OKR from a Strategic Priority',
            forLesson: 'From Strategy to Execution',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Take a strategic priority of your choosing and translate it into one Objective with three measurable Key Results.',
            requirements: [
              'Objective is directional and inspiring, not just a metric',
              'Three Key Results that are specific and measurable',
              'Key Results clearly ladder up to the stated Objective',
            ],
          },
        ],
      },
      {
        id: 'e11_l4',
        title: 'Measuring Strategic Success',
        documents: [
          {
            id: 'e11_d4',
            kind: 'document',
            title: 'Measuring Strategic Success',
            readTime: '4 min read',
            intro:
              'Choosing the wrong metrics can make a failing strategy look successful, or a successful one look like it is failing.',
            objectives: [
              'Distinguish leading indicators from lagging indicators',
              'Identify the risk of optimizing for vanity metrics',
            ],
            sections: [
              {
                heading: 'Leading vs. Lagging Indicators',
                text: 'Lagging indicators (revenue, churn) confirm whether a strategy worked, but arrive too late to course-correct. Leading indicators (engagement trends, pipeline velocity, activation rate) predict future lagging outcomes and let teams adjust before it is too late. A strategy scorecard needs both.',
              },
              {
                heading: 'Beware Vanity Metrics',
                text: 'Metrics that go up regardless of strategic success — total signups regardless of activation, page views regardless of conversion — create false confidence. A good metric should be actionable: if it changes, someone should know exactly what to do differently.',
              },
            ],
            takeaways: [
              'Use both leading indicators (predictive, actionable early) and lagging indicators (confirm outcomes)',
              'A vanity metric that always trends up regardless of real performance creates false confidence',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e11_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Measuring Strategic Success Quiz',
            forLesson: 'Measuring Strategic Success',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of strategic measurement.',
            questions: [
              {
                question: 'A lagging indicator such as quarterly revenue:',
                options: [
                  'Predicts future outcomes early enough to course-correct',
                  'Confirms whether the strategy worked, but arrives too late to adjust proactively',
                  'Is always a vanity metric',
                  'Cannot be measured accurately',
                ],
                correctIndex: 1,
              },
              {
                question: 'A leading indicator is useful because it:',
                options: [
                  'Only matters after the quarter ends',
                  'Predicts future lagging outcomes early enough to act on',
                  'Is always less accurate than a lagging indicator',
                  'Replaces the need for goals',
                ],
                correctIndex: 1,
              },
              {
                question: 'A vanity metric is problematic because it:',
                options: [
                  'Is too difficult to measure',
                  'Tends to rise regardless of real strategic performance, creating false confidence',
                  'Is always a lagging indicator',
                  'Cannot be tracked over time',
                ],
                correctIndex: 1,
              },
              {
                question: 'A good metric should be:',
                options: [
                  'Actionable — if it changes, someone knows what to do differently',
                  'Impossible to influence',
                  'Only reported once a year',
                  'Chosen without reference to strategy',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e11_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Balanced Scorecard',
            forLesson: 'Measuring Strategic Success',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'For the OKR you drafted in the previous lesson, propose one leading indicator and one lagging indicator that would track its progress, and explain why each is not a vanity metric.',
            requirements: [
              'One clearly labeled leading indicator',
              'One clearly labeled lagging indicator',
              'Explanation of why neither is a vanity metric',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e12: AI Prompt Writing Handbook (document-first) ─────────────────

export const E12_MODULES: ReviewModule[] = [
  {
    id: 'e12_m1',
    title: 'Module 1: Prompt Fundamentals',
    lessons: [
      {
        id: 'e12_l1',
        title: 'Anatomy of a Good Prompt',
        documents: [
          {
            id: 'e12_d1',
            kind: 'document',
            title: 'Anatomy of a Good Prompt',
            readTime: '5 min read',
            intro:
              'A well-structured prompt reduces ambiguity and gives the model everything it needs to produce a useful answer on the first try.',
            objectives: [
              'Identify the core components of an effective prompt',
              'Explain why specificity reduces the need for follow-up corrections',
            ],
            sections: [
              {
                heading: 'The Core Components',
                text: 'An effective prompt typically specifies: the task (what to do), the context (relevant background the model would not otherwise have), the format (how the output should be structured), and any constraints (length, tone, things to avoid). Missing any one of these forces the model to guess.',
              },
              {
                heading: 'Specificity Beats Length',
                text: 'A common mistake is writing a long prompt that is still vague. "Write a good marketing email" is long enough to feel thorough but gives no concrete direction. "Write a 100-word email announcing a 20%-off summer sale to existing customers, friendly tone, one clear call-to-action" is shorter and dramatically more useful.',
                tip: 'Before sending a prompt, ask: could two different people read this and produce very different outputs? If yes, add more specificity.',
              },
            ],
            takeaways: [
              'A good prompt specifies task, context, format, and constraints',
              'Specificity matters more than length — a precise short prompt beats a vague long one',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e12_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Anatomy of a Good Prompt Quiz',
            forLesson: 'Anatomy of a Good Prompt',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of prompt structure.',
            questions: [
              {
                question:
                  'The four core components of an effective prompt are:',
                options: [
                  'Task, context, format, and constraints',
                  'Length, color, tone, and price',
                  'Only the task, nothing else',
                  'Grammar, spelling, punctuation, and length',
                ],
                correctIndex: 0,
              },
              {
                question: 'A prompt that is long but vague:',
                options: [
                  'Is always better than a short specific one',
                  'Can still leave the model guessing at your actual intent',
                  'Guarantees a high-quality response',
                  'Is impossible to write',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A good test for whether a prompt is specific enough is to ask:',
                options: [
                  'Is it at least 200 words?',
                  'Could two different readers produce very different outputs from it?',
                  'Does it use formal English?',
                  'Does it include an emoji?',
                ],
                correctIndex: 1,
              },
              {
                question: 'Specifying "format" in a prompt refers to:',
                options: [
                  'The file type of the prompt itself',
                  'How the output should be structured (e.g. bullet list, table, word count)',
                  "The model's internal architecture",
                  'The programming language used',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e12_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Rewrite a Vague Prompt',
            forLesson: 'Anatomy of a Good Prompt',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Take three vague prompts provided in class and rewrite each to specify task, context, format, and constraints.',
            requirements: [
              'All three prompts rewritten',
              'Each rewrite explicitly addresses task, context, format, and constraints',
              'A one-sentence note on what was ambiguous in the original',
            ],
          },
        ],
      },
      {
        id: 'e12_l2',
        title: 'Few-Shot Examples & Role Framing',
        documents: [
          {
            id: 'e12_d2',
            kind: 'document',
            title: 'Few-Shot Examples & Role Framing',
            readTime: '5 min read',
            intro:
              'Showing the model examples of what you want, or framing its role, often works better than describing the task abstractly.',
            objectives: [
              'Explain when few-shot examples improve output quality',
              'Apply role framing to shape tone and expertise level in a response',
            ],
            sections: [
              {
                heading: 'Few-Shot Prompting',
                text: 'Instead of describing a desired output format abstractly, providing one or two concrete input/output examples ("here is a support ticket and how it should be categorized") lets the model infer the pattern directly. This is especially effective for formatting-sensitive or stylistically specific tasks.',
              },
              {
                heading: 'Role Framing',
                text: 'Prefixing a prompt with a role ("You are a senior security engineer reviewing this code for vulnerabilities") shifts the vocabulary, depth, and priorities of the response toward that persona\'s expertise. Role framing is a lightweight way to calibrate tone and rigor without a lengthy instruction list.',
              },
            ],
            takeaways: [
              'Few-shot examples let the model infer format/style patterns directly, often more reliably than abstract description',
              'Role framing calibrates tone, vocabulary, and rigor without needing a long instruction list',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e12_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Few-Shot & Role Framing Quiz',
            forLesson: 'Few-Shot Examples & Role Framing',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of few-shot prompting and role framing.',
            questions: [
              {
                question: 'Few-shot prompting works by:',
                options: [
                  'Giving the model concrete input/output examples to infer a pattern from',
                  'Asking the model to guess without any guidance',
                  'Limiting the model to five words',
                  "Disabling the model's reasoning",
                ],
                correctIndex: 0,
              },
              {
                question:
                  'Role framing (e.g. "You are a senior security engineer") primarily affects:',
                options: [
                  "The model's underlying training data",
                  'The tone, vocabulary, and priorities reflected in the response',
                  'The programming language of the output',
                  'Nothing measurable',
                ],
                correctIndex: 1,
              },
              {
                question: 'Few-shot examples are especially useful for:',
                options: [
                  'Tasks with no formatting requirements',
                  'Formatting-sensitive or stylistically specific tasks',
                  'Tasks that require no examples at all',
                  'Only mathematical calculations',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A lightweight way to calibrate response rigor without a long instruction list is:',
                options: [
                  'Role framing',
                  'Removing all context',
                  'Using only single-word prompts',
                  'Disabling formatting requirements',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e12_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Few-Shot Prompt Template',
            forLesson: 'Few-Shot Examples & Role Framing',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'Design a few-shot prompt template with two examples for a task of your choice (e.g. categorizing customer feedback), and include a role frame.',
            requirements: [
              'Two clear input/output examples included',
              'A role frame appropriate to the task',
              'Template tested with one new input and the resulting output included',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e12_m2',
    title: 'Module 2: Evaluating & Iterating',
    lessons: [
      {
        id: 'e12_l3',
        title: 'Evaluating Model Outputs',
        documents: [
          {
            id: 'e12_d3',
            kind: 'document',
            title: 'Evaluating Model Outputs',
            readTime: '5 min read',
            intro:
              'Writing a good prompt is only half the skill — evaluating whether the output is actually correct and useful is the other half.',
            objectives: [
              'Identify common failure modes in AI-generated outputs',
              'Apply a basic checklist for evaluating an output before using it',
            ],
            sections: [
              {
                heading: 'Common Failure Modes',
                text: 'AI outputs can be fluent and confident while still being factually wrong (a "hallucination"), subtly missing part of the instruction, or technically correct but not actually useful for the underlying goal. Fluency is not evidence of correctness.',
                tip: 'Never treat a confident tone as a proxy for accuracy — verify claims that matter, especially numbers, citations, and code behavior.',
              },
              {
                heading: 'A Basic Evaluation Checklist',
                text: 'Before using an output: (1) Does it actually answer the full instruction, not just part of it? (2) Are factual claims verifiable? (3) Is the format usable as-is? (4) Would a domain expert flag anything as wrong or risky? Running through this checklist catches most bad outputs before they cause harm.',
              },
            ],
            takeaways: [
              'Fluent, confident-sounding output is not evidence that it is factually correct',
              'A short evaluation checklist (completeness, verifiability, format, expert review) catches most bad outputs',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e12_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Evaluating Model Outputs Quiz',
            forLesson: 'Evaluating Model Outputs',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of evaluating AI-generated output.',
            questions: [
              {
                question: 'A "hallucination" in an AI output refers to:',
                options: [
                  'Output that is too short',
                  'Confident, fluent output that is factually incorrect',
                  'Output formatted as a list',
                  'An error message from the model',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Fluent, confident-sounding text should be treated as:',
                options: [
                  'Proof that the content is accurate',
                  'Not evidence of accuracy on its own — claims still need verification',
                  'Always correct if it uses technical vocabulary',
                  'Irrelevant to evaluation',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A basic evaluation checklist should include checking whether the output:',
                options: [
                  'Uses enough adjectives',
                  'Fully answers the instruction and its factual claims are verifiable',
                  'Is written in the first person',
                  'Contains no punctuation errors only',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Output that is technically correct but not useful for the underlying goal is:',
                options: [
                  'Impossible to produce',
                  'A real failure mode worth checking for, separate from factual accuracy',
                  'Always fine to use as-is',
                  'The same as a hallucination',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e12_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Audit an AI Output for Errors',
            forLesson: 'Evaluating Model Outputs',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Given a provided AI-generated output containing at least one subtle factual error, run it through the evaluation checklist and identify the error(s).',
            requirements: [
              'Checklist applied point by point',
              'The factual error(s) correctly identified',
              'A corrected version of the flawed section provided',
            ],
          },
        ],
      },
      {
        id: 'e12_l4',
        title: 'Iterative Prompt Refinement',
        documents: [
          {
            id: 'e12_d4',
            kind: 'document',
            title: 'Iterative Prompt Refinement',
            readTime: '4 min read',
            intro:
              'The first prompt is rarely the best one. Treat prompting as an iterative process of diagnosing what went wrong and adjusting.',
            objectives: [
              'Apply a systematic approach to diagnosing a failed prompt',
              'Explain why isolating one variable at a time speeds up refinement',
            ],
            sections: [
              {
                heading: 'Diagnose Before You Rewrite',
                text: 'When an output disappoints, identify exactly which part failed — wrong format, missing detail, wrong tone, factually incorrect — before rewriting the whole prompt. A vague "this is wrong, try again" rarely produces a better result than a targeted fix.',
              },
              {
                heading: 'Change One Variable at a Time',
                text: 'If you change the task description, the format instruction, and the examples all at once, you cannot tell which change actually fixed (or broke) the output. Isolate one variable per iteration when refining a prompt you plan to reuse.',
              },
            ],
            takeaways: [
              'Diagnose the specific failure (format, detail, tone, accuracy) before rewriting a prompt wholesale',
              'Change one variable at a time when iterating so you know what caused the improvement',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e12_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Iterative Prompt Refinement Quiz',
            forLesson: 'Iterative Prompt Refinement',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of iterative prompt refinement.',
            questions: [
              {
                question:
                  'Before rewriting a prompt after a bad output, you should first:',
                options: [
                  'Rewrite the entire prompt from scratch immediately',
                  'Diagnose exactly which part of the output failed',
                  'Give up on prompting for that task',
                  'Increase the prompt length by double',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Changing the task, format, and examples all in one iteration:',
                options: [
                  'Is the fastest way to improve a prompt',
                  'Makes it hard to know which change caused the improvement or regression',
                  'Is required for good prompting',
                  'Has no downside',
                ],
                correctIndex: 1,
              },
              {
                question: 'A vague correction like "this is wrong, try again":',
                options: [
                  'Is usually as effective as a targeted fix',
                  'Rarely produces a better result than diagnosing the specific failure',
                  'Is the recommended first step',
                  'Always improves tone',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Isolating one variable per iteration when refining a prompt helps you:',
                options: [
                  'Waste more time overall',
                  'Attribute the change in output quality to a specific edit',
                  'Avoid ever needing to test the prompt',
                  'Skip the evaluation step entirely',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e12_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Three-Round Prompt Refinement Log',
            forLesson: 'Iterative Prompt Refinement',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Take a prompt of your choice and refine it across three rounds, logging the specific diagnosis and single change made each round, plus the resulting output.',
            requirements: [
              'Three distinct rounds documented',
              'Each round changes exactly one variable with a stated diagnosis',
              'Final output clearly improved over the first attempt',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e13: Education Assessment Guide (document-first) ────────────────

export const E13_MODULES: ReviewModule[] = [
  {
    id: 'e13_m1',
    title: 'Module 1: Designing Fair Assessments',
    lessons: [
      {
        id: 'e13_l1',
        title: 'Rubric Design Principles',
        documents: [
          {
            id: 'e13_d1',
            kind: 'document',
            title: 'Rubric Design Principles',
            readTime: '5 min read',
            intro:
              'A good rubric makes grading consistent, transparent, and defensible — for the grader and the learner alike.',
            objectives: [
              'Explain why analytic rubrics reduce grading inconsistency',
              'Identify the difference between analytic and holistic rubrics',
            ],
            sections: [
              {
                heading: 'Analytic vs. Holistic Rubrics',
                text: 'A holistic rubric assigns one overall score based on a general impression. An analytic rubric breaks the task into specific criteria (e.g. argument clarity, evidence use, organization) each scored separately. Analytic rubrics take longer to design but produce far more consistent grading across different graders and give learners actionable feedback per criterion.',
              },
              {
                heading: 'Writing Criteria That Hold Up',
                text: 'Each criterion should be observable, not a proxy for the grader\'s general impression. "Uses evidence effectively" is vague; "cites at least two sources with a clear connection to the claim" is checkable by any grader consistently. Ambiguous criteria are the most common source of grading disputes.',
                tip: 'Before finalizing a rubric, have a second person grade the same sample submission independently. Large score gaps reveal ambiguous criteria.',
              },
            ],
            takeaways: [
              'Analytic rubrics (scored per criterion) produce more consistent grading than holistic (single overall score) rubrics',
              "Each criterion should be specific and observable, not a restatement of the grader's general impression",
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e13_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Rubric Design Principles Quiz',
            forLesson: 'Rubric Design Principles',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your understanding of rubric design.',
            questions: [
              {
                question:
                  'An analytic rubric differs from a holistic rubric by:',
                options: [
                  'Assigning only one overall score',
                  'Scoring specific criteria separately',
                  'Never being used for essays',
                  'Requiring no criteria at all',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'A vague rubric criterion like "uses evidence effectively" is problematic because:',
                options: [
                  'It is too specific for graders to apply',
                  'It leaves too much to individual grader interpretation, causing inconsistency',
                  'It cannot be included in any rubric',
                  'It only applies to math assignments',
                ],
                correctIndex: 1,
              },
              {
                question:
                  "A good way to test whether a rubric's criteria are clear enough is to:",
                options: [
                  'Only ever have one person grade with it',
                  'Have two graders independently score the same submission and compare results',
                  'Skip testing and publish it immediately',
                  'Remove all criteria and use a single score',
                ],
                correctIndex: 1,
              },
              {
                question: 'Analytic rubrics generally provide learners with:',
                options: [
                  'Less useful feedback than holistic rubrics',
                  'More actionable, criterion-specific feedback',
                  'No feedback at all',
                  'Only a pass/fail result',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e13_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Convert a Holistic Rubric to Analytic',
            forLesson: 'Rubric Design Principles',
            dueDate: 'Jul 6',
            submission: 'Text response',
            instructions:
              'Take a provided holistic rubric for a written assignment and convert it into an analytic rubric with at least four specific, observable criteria.',
            requirements: [
              'At least four distinct criteria defined',
              'Each criterion phrased as observable, not a vague impression',
              'A scoring scale (e.g. 1-4) applied consistently across criteria',
            ],
          },
        ],
      },
      {
        id: 'e13_l2',
        title: 'Formative vs. Summative Assessment',
        documents: [
          {
            id: 'e13_d2',
            kind: 'document',
            title: 'Formative vs. Summative Assessment',
            readTime: '4 min read',
            intro:
              'Not all assessment is about grading. Understanding the distinct purpose of formative and summative assessment shapes how you design each.',
            objectives: [
              'Distinguish the purpose of formative from summative assessment',
              'Identify when low-stakes formative checks improve learning outcomes',
            ],
            sections: [
              {
                heading: 'Two Different Jobs',
                text: 'Summative assessment measures learning after instruction is complete — a final exam, a graded project — and typically carries high stakes. Formative assessment happens during learning — a quick poll, an ungraded quiz, a draft review — and exists to surface misunderstanding early enough to correct it, not to produce a final grade.',
              },
              {
                heading: 'Why Formative Checks Matter',
                text: 'Research consistently shows frequent, low-stakes formative checks improve retention and outcomes more than relying solely on high-stakes summative testing, because they give both learner and instructor a chance to correct course before it is too late to matter.',
              },
            ],
            takeaways: [
              'Summative assessment measures final learning outcomes; formative assessment surfaces understanding during the learning process',
              'Frequent low-stakes formative checks tend to improve outcomes more than summative testing alone',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e13_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Formative vs. Summative Quiz',
            forLesson: 'Formative vs. Summative Assessment',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of formative and summative assessment.',
            questions: [
              {
                question: 'A final exam is typically an example of:',
                options: [
                  'Formative assessment',
                  'Summative assessment',
                  'Neither type of assessment',
                  'A rubric',
                ],
                correctIndex: 1,
              },
              {
                question: 'The main purpose of formative assessment is to:',
                options: [
                  'Assign a final grade',
                  'Surface misunderstanding during learning so it can be corrected',
                  'Replace summative assessment entirely',
                  'Rank students against each other',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Low-stakes formative checks, used frequently, tend to:',
                options: [
                  'Have no measurable effect on learning outcomes',
                  'Improve retention and outcomes compared to summative testing alone',
                  'Always lower student motivation',
                  'Replace the need for any final assessment',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'An ungraded draft review before a final paper submission is best classified as:',
                options: [
                  'Summative assessment',
                  'Formative assessment',
                  'Neither — drafts cannot be assessed',
                  'A rubric criterion',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e13_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Formative Check-in',
            forLesson: 'Formative vs. Summative Assessment',
            dueDate: 'Jul 8',
            submission: 'Text response',
            instructions:
              'For a summative assessment of your choice (e.g. a final essay), design one low-stakes formative check-in that could happen midway through the learning process.',
            requirements: [
              'Formative check clearly tied to the same learning objective as the summative assessment',
              'Explicitly low-stakes (ungraded or minimally weighted)',
              'Explanation of what misunderstanding it is designed to catch early',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e13_m2',
    title: 'Module 2: Feedback That Improves Learning',
    lessons: [
      {
        id: 'e13_l3',
        title: 'Writing Feedback That Changes Behavior',
        documents: [
          {
            id: 'e13_d3',
            kind: 'document',
            title: 'Writing Feedback That Changes Behavior',
            readTime: '5 min read',
            intro:
              'Feedback that merely evaluates does little to improve future performance. Feedback that is specific and actionable does.',
            objectives: [
              'Explain why specific feedback outperforms general praise or criticism',
              'Apply the "what, why, how" structure to written feedback',
            ],
            sections: [
              {
                heading: 'Specific Beats General',
                text: '"Good job" and "needs improvement" do not tell a learner what to repeat or what to change. Feedback that names the specific behavior ("your thesis in paragraph one was clear and directly answered the prompt") is far more likely to be repeated or corrected than generic praise or criticism.',
              },
              {
                heading: 'The What, Why, How Structure',
                text: 'Effective feedback typically states what was observed, why it matters (the impact on the reader or the goal), and how to improve or continue. Omitting the "how" leaves the learner knowing something is wrong without knowing what to do differently next time.',
              },
            ],
            takeaways: [
              'Specific, named feedback changes future behavior far more reliably than generic praise or criticism',
              'Structure feedback as what was observed, why it matters, and how to act on it',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e13_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Feedback That Changes Behavior Quiz',
            forLesson: 'Writing Feedback That Changes Behavior',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of effective feedback design.',
            questions: [
              {
                question:
                  'Generic feedback like "good job" is limited because it:',
                options: [
                  'Is always inaccurate',
                  'Does not tell the learner what specifically to repeat',
                  'Takes too long to write',
                  'Cannot be given in writing',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'The "how" in the what/why/how feedback structure refers to:',
                options: [
                  'How the grader felt while reading',
                  'How the learner can improve or continue next time',
                  'How long the assignment took',
                  'How the rubric was designed',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Feedback that names a specific observed behavior is more effective because:',
                options: [
                  'It is always shorter',
                  'It is more likely to be understood and repeated or corrected',
                  'It avoids the need for a rubric',
                  'It removes the need for the "why" component',
                ],
                correctIndex: 1,
              },
              {
                question: 'Omitting the "why" from feedback risks:',
                options: [
                  'Making the feedback too long',
                  'The learner not understanding the impact or importance of the observed behavior',
                  'Nothing — why is optional',
                  'Confusing the grader',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e13_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Rewrite Generic Feedback',
            forLesson: 'Writing Feedback That Changes Behavior',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Take three pieces of generic feedback provided in class (e.g. "needs more detail") and rewrite each using the what/why/how structure.',
            requirements: [
              'All three rewritten with what, why, and how components',
              'Each rewrite references a specific, plausible detail from a submission',
              'No rewritten feedback is longer than three sentences',
            ],
          },
        ],
      },
      {
        id: 'e13_l4',
        title: 'Reducing Bias in Grading',
        documents: [
          {
            id: 'e13_d4',
            kind: 'document',
            title: 'Reducing Bias in Grading',
            readTime: '4 min read',
            intro:
              'Grading is more vulnerable to unconscious bias than most instructors assume. Structural safeguards reduce, though never fully eliminate, this risk.',
            objectives: [
              'Identify at least two structural safeguards against grading bias',
              'Explain why blind grading reduces (but does not eliminate) bias risk',
            ],
            sections: [
              {
                heading: 'Where Bias Enters',
                text: 'Bias can enter grading through halo effects (a strong first assignment inflating impressions of later ones), name/handwriting recognition, and fatigue (later-graded submissions in a batch scored more harshly or leniently than earlier ones). None of these require conscious intent to affect outcomes.',
              },
              {
                heading: 'Structural Safeguards',
                text: 'Blind grading (hiding student names), grading one question across all submissions before moving to the next (rather than one full submission at a time), and using the same analytic rubric consistently all reduce — though do not eliminate — the influence of these biases.',
              },
            ],
            takeaways: [
              'Grading bias (halo effects, recognition, fatigue) can occur without any conscious intent',
              'Blind grading, question-by-question grading, and consistent rubric use are structural safeguards that reduce bias risk',
            ],
          },
        ],
        videos: [],
        quizzes: [
          {
            id: 'e13_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Reducing Bias in Grading Quiz',
            forLesson: 'Reducing Bias in Grading',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of grading bias and safeguards.',
            questions: [
              {
                question: 'A "halo effect" in grading refers to:',
                options: [
                  'Grading only in daylight',
                  'A strong impression from one assignment inflating or deflating judgment of later ones',
                  'A type of rubric',
                  'A formative assessment technique',
                ],
                correctIndex: 1,
              },
              {
                question: 'Grading fatigue can cause:',
                options: [
                  'Consistent scoring regardless of batch position',
                  'Submissions graded later in a batch to be scored differently than earlier ones',
                  'Only positive effects on grading accuracy',
                  'No measurable effect on scores',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Blind grading (hiding student names) is intended to:',
                options: [
                  'Completely eliminate all bias',
                  'Reduce the influence of name/identity recognition on scoring',
                  'Make grading faster only',
                  'Replace the need for a rubric',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Grading one question across all submissions before moving to the next question helps by:',
                options: [
                  'Increasing halo effects',
                  'Applying more consistent standards to that specific question across all students',
                  'Making the rubric unnecessary',
                  'Eliminating the need for feedback',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e13_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Bias-Resistant Grading Process',
            forLesson: 'Reducing Bias in Grading',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design a grading process for a batch of 30 essays that incorporates at least two structural safeguards against bias discussed in this lesson.',
            requirements: [
              'At least two distinct safeguards specified (e.g. blind grading, question-by-question grading)',
              'Explanation of which specific bias each safeguard addresses',
              'A note on one limitation the safeguards do not fully solve',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e14: Kubernetes for Developers ────────────────────────────────────

export const E14_MODULES: ReviewModule[] = [
  {
    id: 'e14_m1',
    title: 'Module 1: Kubernetes for Application Developers',
    lessons: [
      {
        id: 'e14_l1',
        title: 'Thinking in Kubernetes Objects',
        documents: [],
        videos: [
          {
            id: 'e14_v1',
            kind: 'video',
            title: 'Thinking in Kubernetes Objects',
            duration: '18 min',
            intro:
              'As a developer (not just an operator), you need a mental model for how your app maps onto Kubernetes objects.',
            topics: [
              'Declarative vs. imperative management',
              'Labels and selectors for connecting objects',
              'Namespaces for isolating environments',
              'kubectl basics for developers',
            ],
            moments: [
              { time: '0:00', label: 'Declarative vs. imperative' },
              { time: '4:30', label: 'Labels and selectors' },
              { time: '9:30', label: 'Namespaces' },
              { time: '14:00', label: 'kubectl for developers' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e14_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Kubernetes Objects Quiz',
            forLesson: 'Thinking in Kubernetes Objects',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of the Kubernetes object model.',
            questions: [
              {
                question: 'Declarative management in Kubernetes means:',
                options: [
                  'Issuing step-by-step commands to reach a state',
                  'Describing the desired end state and letting Kubernetes reconcile toward it',
                  'Manually editing running containers',
                  'Avoiding YAML entirely',
                ],
                correctIndex: 1,
              },
              {
                question: 'Labels and selectors are used to:',
                options: [
                  'Encrypt secrets',
                  'Connect objects like Services to the correct set of Pods',
                  'Define CPU limits',
                  'Store application logs',
                ],
                correctIndex: 1,
              },
              {
                question: 'A namespace in Kubernetes is primarily used to:',
                options: [
                  'Increase cluster performance',
                  'Logically isolate groups of resources, e.g. per environment or team',
                  'Replace the need for Deployments',
                  'Store persistent volumes only',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'kubectl get pods -l app=web uses a label selector to:',
                options: [
                  'Delete all pods',
                  'List only pods labeled app=web',
                  'Create a new deployment',
                  'Scale the cluster',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e14_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Label and Query Your Resources',
            forLesson: 'Thinking in Kubernetes Objects',
            dueDate: 'Jul 6',
            submission: 'Code upload',
            instructions:
              'Deploy a provided app with meaningful labels (app, tier, env) and write three kubectl commands that select resources using different label combinations.',
            requirements: [
              'Resources deployed with at least three distinct labels',
              'Three kubectl selector queries demonstrated with output',
              'A dedicated namespace used for the deployment',
            ],
          },
        ],
      },
      {
        id: 'e14_l2',
        title: 'Health Checks & Resource Limits',
        documents: [],
        videos: [
          {
            id: 'e14_v2',
            kind: 'video',
            title: 'Health Checks & Resource Limits',
            duration: '17 min',
            intro:
              'Kubernetes cannot know if your app is healthy unless you tell it. Learn liveness/readiness probes and resource requests/limits.',
            topics: [
              'Liveness vs. readiness probes',
              'What happens when a probe fails',
              'CPU/memory requests vs. limits',
              'Why unset resource limits cause cluster instability',
            ],
            moments: [
              { time: '0:00', label: 'Liveness vs. readiness' },
              { time: '5:00', label: 'Probe failure behavior' },
              { time: '9:30', label: 'Requests vs. limits' },
              { time: '13:30', label: 'Risks of unset limits' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e14_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Health Checks & Resource Limits Quiz',
            forLesson: 'Health Checks & Resource Limits',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of probes and resource management.',
            questions: [
              {
                question: 'A failed readiness probe causes Kubernetes to:',
                options: [
                  'Restart the container immediately',
                  'Remove the Pod from Service load-balancing until it passes again',
                  'Delete the Pod permanently',
                  'Scale the cluster down',
                ],
                correctIndex: 1,
              },
              {
                question: 'A failed liveness probe causes Kubernetes to:',
                options: [
                  'Ignore the failure',
                  'Restart the container',
                  'Scale up replicas',
                  'Remove the Service',
                ],
                correctIndex: 1,
              },
              {
                question: 'A resource "request" specifies:',
                options: [
                  'The hard cap a container cannot exceed',
                  'The amount of CPU/memory the scheduler guarantees when placing the Pod',
                  'The container image version',
                  'The number of replicas',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Leaving resource limits unset across many Pods risks:',
                options: [
                  'Improved cluster stability',
                  'A single misbehaving Pod consuming resources and starving others on the same node',
                  'Automatic cost savings',
                  'No effect on other Pods',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e14_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Add Probes and Resource Limits',
            forLesson: 'Health Checks & Resource Limits',
            dueDate: 'Jul 8',
            submission: 'Code upload',
            instructions:
              'Add liveness and readiness probes plus CPU/memory requests and limits to a provided Deployment manifest lacking them.',
            requirements: [
              'Both liveness and readiness probes configured appropriately',
              'Requests and limits set for CPU and memory',
              'Brief explanation of the chosen probe intervals and resource values',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e14_m2',
    title: 'Module 2: Production Operations',
    lessons: [
      {
        id: 'e14_l3',
        title: 'Logging & Debugging in Production',
        documents: [],
        videos: [
          {
            id: 'e14_v3',
            kind: 'video',
            title: 'Logging & Debugging in Production',
            duration: '16 min',
            intro:
              'When something goes wrong in a cluster, knowing where to look saves hours. Learn the core debugging commands and log patterns.',
            topics: [
              'kubectl logs and following multi-container Pods',
              'kubectl describe for events and scheduling issues',
              'Common CrashLoopBackOff causes',
              'Exec-ing into a running container safely',
            ],
            moments: [
              { time: '0:00', label: 'kubectl logs essentials' },
              { time: '4:00', label: 'kubectl describe walkthrough' },
              { time: '8:30', label: 'Diagnosing CrashLoopBackOff' },
              { time: '12:30', label: 'Safe kubectl exec usage' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e14_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Logging & Debugging Quiz',
            forLesson: 'Logging & Debugging in Production',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Test your Kubernetes debugging knowledge.',
            questions: [
              {
                question: 'kubectl describe pod is most useful for:',
                options: [
                  'Viewing application log output',
                  'Viewing events, scheduling decisions, and configuration for a Pod',
                  'Deleting a Pod',
                  'Scaling a Deployment',
                ],
                correctIndex: 1,
              },
              {
                question: 'CrashLoopBackOff typically indicates:',
                options: [
                  'The Pod is running perfectly',
                  'The container keeps crashing shortly after starting, so Kubernetes is repeatedly restarting it',
                  'The Service has no endpoints',
                  'A missing namespace',
                ],
                correctIndex: 1,
              },
              {
                question: 'kubectl logs -f follows:',
                options: [
                  'A static snapshot only',
                  'The live log stream from a container',
                  'Only error-level logs',
                  'Cluster-wide events',
                ],
                correctIndex: 1,
              },
              {
                question: 'kubectl exec into a running container is used to:',
                options: [
                  'Delete the container',
                  'Run commands inside the container for live debugging',
                  "Change the Deployment's replica count",
                  "Modify the cluster's DNS",
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e14_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Diagnose a Crashing Pod',
            forLesson: 'Logging & Debugging in Production',
            dueDate: 'Jul 10',
            submission: 'Text response',
            instructions:
              'Given a provided Pod stuck in CrashLoopBackOff, use kubectl logs and kubectl describe to diagnose the root cause and propose a fix.',
            requirements: [
              'Relevant log/describe output referenced in the diagnosis',
              'Root cause correctly identified',
              'A specific manifest or config fix proposed',
            ],
          },
        ],
      },
      {
        id: 'e14_l4',
        title: 'CI/CD & Progressive Delivery',
        documents: [],
        videos: [
          {
            id: 'e14_v4',
            kind: 'video',
            title: 'CI/CD & Progressive Delivery',
            duration: '18 min',
            intro:
              'Shipping to Kubernetes safely means more than kubectl apply. Learn how CI/CD pipelines and progressive delivery reduce deployment risk.',
            topics: [
              'A typical CI/CD pipeline for Kubernetes',
              'Rolling updates vs. blue-green vs. canary releases',
              'Automated rollback triggers',
              'GitOps as a deployment model',
            ],
            moments: [
              { time: '0:00', label: 'CI/CD pipeline overview' },
              { time: '5:00', label: 'Deployment strategies compared' },
              { time: '11:00', label: 'Automated rollback' },
              { time: '15:00', label: 'GitOps basics' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e14_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'CI/CD & Progressive Delivery Quiz',
            forLesson: 'CI/CD & Progressive Delivery',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of deployment strategies for Kubernetes.',
            questions: [
              {
                question: 'A canary release deploys a change to:',
                options: [
                  '100% of traffic immediately',
                  'A small subset of traffic first, expanding only if it performs well',
                  'No traffic at all',
                  'Only the staging environment permanently',
                ],
                correctIndex: 1,
              },
              {
                question: 'GitOps is a deployment model where:',
                options: [
                  'Deployments are made manually by SSH-ing into servers',
                  'The desired cluster state is stored in Git and automatically reconciled by a controller',
                  'Git is used only for storing documentation',
                  'Kubernetes manifests are never version controlled',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'An automated rollback trigger typically fires based on:',
                options: [
                  'A random schedule',
                  'Health check or error-rate signals indicating the new version is unhealthy',
                  'The day of the week only',
                  'Manual approval exclusively',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Compared to a rolling update, a blue-green deployment:',
                options: [
                  'Gradually replaces old Pods one at a time',
                  'Runs two full environments and switches traffic between them at once',
                  'Cannot be rolled back',
                  'Requires no additional infrastructure',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e14_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Design a Progressive Delivery Pipeline',
            forLesson: 'CI/CD & Progressive Delivery',
            dueDate: 'Jul 12',
            submission: 'Text response',
            instructions:
              'Design a CI/CD pipeline for a Kubernetes app that uses canary releases, specifying each stage and the rollback trigger condition.',
            requirements: [
              'Pipeline stages listed in order (e.g. build, test, canary deploy, promote)',
              'Canary traffic percentage and promotion criteria specified',
              'A concrete automated rollback trigger condition defined',
            ],
          },
        ],
      },
    ],
  },
];

// ── Course e15: Advanced React Patterns ──────────────────────────────────────

export const E15_MODULES: ReviewModule[] = [
  {
    id: 'e15_m1',
    title: 'Module 1: Component Composition Patterns',
    lessons: [
      {
        id: 'e15_l1',
        title: 'Compound Components',
        documents: [],
        videos: [
          {
            id: 'e15_v1',
            kind: 'video',
            title: 'Compound Components',
            duration: '19 min',
            intro:
              'Compound components let related pieces of UI share implicit state while keeping a clean, declarative API for consumers.',
            topics: [
              'The compound component pattern with Context',
              'Implicit state sharing between parent and children',
              'Designing a flexible, declarative API',
              'When compound components are overkill',
            ],
            moments: [
              { time: '0:00', label: 'The problem compound components solve' },
              { time: '5:00', label: 'Sharing state via Context' },
              { time: '11:00', label: 'Building a Tabs component' },
              { time: '16:00', label: 'When not to use this pattern' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e15_q1',
            kind: 'quiz',
            status: 'Ready',
            title: 'Compound Components Quiz',
            forLesson: 'Compound Components',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of the compound component pattern.',
            questions: [
              {
                question: 'Compound components typically share state using:',
                options: [
                  'Global variables',
                  'React Context connecting a parent and its child subcomponents',
                  'Direct DOM manipulation',
                  'URL query parameters only',
                ],
                correctIndex: 1,
              },
              {
                question: 'A key benefit of the compound component pattern is:',
                options: [
                  'It eliminates the need for any props',
                  'It gives consumers a flexible, declarative API (e.g. <Tabs><Tabs.Tab /></Tabs>) without prop drilling',
                  'It always improves performance',
                  'It removes the need for Context entirely',
                ],
                correctIndex: 1,
              },
              {
                question: 'Compound components are best suited for:',
                options: [
                  'Fully independent, unrelated components',
                  'Closely related UI pieces that share implicit state, like Tabs or Accordion',
                  'Single standalone buttons',
                  'Server-only components',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Using compound components for a simple, single-purpose component is usually:',
                options: [
                  'Best practice in all cases',
                  'Unnecessary complexity — simpler prop-based APIs are often better there',
                  'Required by React',
                  'Impossible',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e15_a1',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a Compound Tabs Component',
            forLesson: 'Compound Components',
            dueDate: 'Jul 6',
            submission: 'Code upload',
            instructions:
              'Build a <Tabs> compound component with <Tabs.List>, <Tabs.Tab>, and <Tabs.Panel> subcomponents sharing active-tab state via Context.',
            requirements: [
              'Active tab state shared via Context, not prop drilling',
              'At least three tabs render and switch correctly',
              'API is usable declaratively, e.g. <Tabs><Tabs.List>...',
            ],
          },
        ],
      },
      {
        id: 'e15_l2',
        title: 'Render Props & Higher-Order Components',
        documents: [],
        videos: [
          {
            id: 'e15_v2',
            kind: 'video',
            title: 'Render Props & Higher-Order Components',
            duration: '20 min',
            intro:
              'Before hooks, render props and HOCs were the primary way to share logic across components. Understanding them clarifies why hooks were created.',
            topics: [
              'The render prop pattern for sharing logic',
              'Higher-order components (HOCs) and prop forwarding',
              'Trade-offs vs. custom hooks',
              'Recognizing these patterns in legacy code',
            ],
            moments: [
              { time: '0:00', label: 'What render props solve' },
              { time: '5:30', label: 'Building a render prop component' },
              { time: '11:30', label: 'HOCs explained' },
              { time: '16:30', label: 'Why hooks largely replaced both' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e15_q2',
            kind: 'quiz',
            status: 'Ready',
            title: 'Render Props & HOCs Quiz',
            forLesson: 'Render Props & Higher-Order Components',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description: 'Check your understanding of render props and HOCs.',
            questions: [
              {
                question: 'A render prop is:',
                options: [
                  'A CSS property',
                  'A prop whose value is a function that returns JSX, used to share logic',
                  'A type of Context',
                  'A hook',
                ],
                correctIndex: 1,
              },
              {
                question: 'A higher-order component (HOC) is:',
                options: [
                  'A function that takes a component and returns a new enhanced component',
                  'A component with more than 100 lines',
                  'A built-in React hook',
                  'A CSS-in-JS utility',
                ],
                correctIndex: 0,
              },
              {
                question:
                  'A common criticism of both render props and HOCs is:',
                options: [
                  'They cannot share any logic',
                  'They can lead to deeply nested component trees ("wrapper hell")',
                  'They are faster than hooks in every case',
                  'They were never used in real codebases',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Custom hooks are often preferred today over HOCs/render props because they:',
                options: [
                  'Cannot share logic across components',
                  'Share logic without adding extra component nesting',
                  'Are the only pattern React has ever supported',
                  'Require class components',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e15_a2',
            kind: 'assignment',
            status: 'Ready',
            title: 'Refactor an HOC into a Custom Hook',
            forLesson: 'Render Props & Higher-Order Components',
            dueDate: 'Jul 8',
            submission: 'Code upload',
            instructions:
              'Given a provided withWindowSize HOC, refactor its logic into a useWindowSize custom hook and update a consumer component to use it.',
            requirements: [
              'useWindowSize hook correctly returns width/height and updates on resize',
              'Consumer component refactored to use the hook instead of the HOC',
              'No unnecessary wrapper component remains',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'e15_m2',
    title: 'Module 2: Hooks & Performance',
    lessons: [
      {
        id: 'e15_l3',
        title: 'Advanced Custom Hooks',
        documents: [],
        videos: [
          {
            id: 'e15_v3',
            kind: 'video',
            title: 'Advanced Custom Hooks',
            duration: '18 min',
            intro:
              'Well-designed custom hooks encapsulate complex logic behind a simple interface. Learn patterns for building robust ones.',
            topics: [
              'Extracting logic into a custom hook',
              'Handling cleanup and cancellation correctly',
              'Composing multiple hooks together',
              "Designing a hook's return API (array vs. object)",
            ],
            moments: [
              { time: '0:00', label: 'When to extract a custom hook' },
              { time: '5:00', label: 'Cleanup and cancellation' },
              { time: '10:30', label: 'Composing hooks' },
              { time: '14:30', label: 'Choosing a return API' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e15_q3',
            kind: 'quiz',
            status: 'Ready',
            title: 'Advanced Custom Hooks Quiz',
            forLesson: 'Advanced Custom Hooks',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Test your understanding of advanced custom hook design.',
            questions: [
              {
                question: 'A custom hook should be extracted when:',
                options: [
                  'A component has any state at all',
                  'The same stateful logic is duplicated across multiple components',
                  'Never — logic should stay in components',
                  'Only for styling logic',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Failing to cancel an in-flight fetch when a component unmounts can cause:',
                options: [
                  'Improved performance',
                  'A "set state on unmounted component" warning or memory leak',
                  'No effect whatsoever',
                  'The fetch to complete faster',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Composing multiple hooks together inside one custom hook allows you to:',
                options: [
                  'Avoid using hooks entirely',
                  'Build higher-level behavior from smaller, reusable pieces',
                  'Bypass the Rules of Hooks',
                  'Replace the need for state entirely',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Choosing an array return (like useState) vs. an object return for a custom hook mainly affects:',
                options: [
                  'Whether the hook works at all',
                  'Whether consumers can freely rename values (array) or must use fixed keys (object)',
                  'The number of renders',
                  'Nothing observable',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e15_a3',
            kind: 'assignment',
            status: 'Ready',
            title: 'Build a useDebouncedValue Hook',
            forLesson: 'Advanced Custom Hooks',
            dueDate: 'Jul 10',
            submission: 'Code upload',
            instructions:
              'Build a useDebouncedValue(value, delay) hook and use it to debounce a search input so filtering only runs after the user pauses typing.',
            requirements: [
              'Hook correctly delays updates by the specified delay',
              'Cleanup correctly cancels pending timers on rapid re-renders',
              'Demonstrated in a working search input example',
            ],
          },
        ],
      },
      {
        id: 'e15_l4',
        title: 'Memoization & Render Performance',
        documents: [],
        videos: [
          {
            id: 'e15_v4',
            kind: 'video',
            title: 'Memoization & Render Performance',
            duration: '20 min',
            intro:
              'React re-renders more than beginners expect. Learn to diagnose real performance problems and fix them with the right memoization tool.',
            topics: [
              'How and why React re-renders',
              'useMemo vs. useCallback vs. React.memo',
              'Profiling before optimizing',
              'Common memoization mistakes that make things worse',
            ],
            moments: [
              { time: '0:00', label: 'Why components re-render' },
              { time: '6:00', label: 'useMemo and useCallback' },
              { time: '12:00', label: 'React.memo for components' },
              { time: '17:00', label: 'Profiling before optimizing' },
            ],
          },
        ],
        quizzes: [
          {
            id: 'e15_q4',
            kind: 'quiz',
            status: 'Ready',
            title: 'Memoization & Performance Quiz',
            forLesson: 'Memoization & Render Performance',
            totalQuestions: 4,
            estimatedMinutes: 5,
            description:
              'Check your understanding of React memoization and performance.',
            questions: [
              {
                question: 'useMemo is used to:',
                options: [
                  'Memoize a function reference',
                  'Memoize the result of an expensive computation between renders',
                  'Force a component to re-render',
                  'Replace useState',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'React.memo prevents a component from re-rendering when:',
                options: [
                  'Its props have changed',
                  'Its props are shallowly equal to the previous render',
                  'It has no parent',
                  'It uses hooks',
                ],
                correctIndex: 1,
              },
              {
                question:
                  'Before adding memoization, the recommended first step is to:',
                options: [
                  'Wrap every component in React.memo by default',
                  'Profile to confirm there is an actual, measurable performance problem',
                  'Rewrite the app in a different framework',
                  'Remove all state',
                ],
                correctIndex: 1,
              },
              {
                question: 'A common memoization mistake is:',
                options: [
                  'Memoizing a cheap calculation, adding overhead without meaningful benefit',
                  'Never using useMemo at all',
                  'Using React.memo on a pure component',
                  'Profiling before optimizing',
                ],
                correctIndex: 0,
              },
            ],
          },
        ],
        assignments: [
          {
            id: 'e15_a4',
            kind: 'assignment',
            status: 'Ready',
            title: 'Profile and Fix a Slow List',
            forLesson: 'Memoization & Render Performance',
            dueDate: 'Jul 12',
            submission: 'Code upload',
            instructions:
              'Given a provided component that re-renders an expensive list unnecessarily, use the React Profiler to confirm the issue, then fix it with the appropriate memoization technique.',
            requirements: [
              'Profiler output included showing the re-render issue before the fix',
              'Correct memoization technique applied (useMemo, useCallback, or React.memo as appropriate)',
              'Profiler output included showing the improvement after the fix',
            ],
          },
        ],
      },
    ],
  },
];
