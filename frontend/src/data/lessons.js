/**
 * lessons.js  —  Single source of truth for all course content.
 *
 * HOW TO ADD / EDIT CONTENT:
 *  • Add a new level object to the top-level array to create a new tier.
 *  • Add a lesson object inside a level's `lessons` array.
 *  • Each lesson has:
 *      - id          unique string slug used in the URL  e.g. "elem-1"
 *      - title       display name
 *      - description short blurb shown on the courses page
 *      - duration    e.g. "8 min"
 *      - videoUrl    swap the placeholder src for a real URL when ready
 *      - quiz        array of question objects (see schema below)
 *
 *  QUIZ QUESTION SCHEMA:
 *    {
 *      id:            unique string
 *      question:      string
 *      options:       string[]   (2–5 choices)
 *      correctIndex:  number     (0-based index into options)
 *      explanation:   string     shown after answering  (optional)
 *    }
 */

export const LEVELS = [
  {
    id: 'elementary',
    label: 'Elementary',
    emoji: '🌱',
    color: '#6DCFA0',        // used for accent stripe
    colorLight: '#C4F0D0',
    description: 'Foundational concepts for new learners.',
    lessons: [
      {
        id: 'elem-1',
        title: 'Lesson 1 — Introduction',
        description: 'A first look at the core ideas. No prior knowledge needed.',
        duration: '6 min',
        videoUrl: '',   // ← replace with real video URL
        quiz: [
          {
            id: 'e1-q1',
            question: 'Placeholder question 1 for Lesson 1.',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctIndex: 0,
            explanation: 'Explanation placeholder — fill in when content is ready.',
          },
          {
            id: 'e1-q2',
            question: 'Placeholder question 2 for Lesson 1.',
            options: ['Option A', 'Option B', 'Option C'],
            correctIndex: 1,
            explanation: 'Explanation placeholder.',
          },
          {
            id: 'e1-q3',
            question: 'Placeholder question 3 for Lesson 1.',
            options: ['True', 'False'],
            correctIndex: 0,
            explanation: 'Explanation placeholder.',
          },
        ],
      },
      {
        id: 'elem-2',
        title: 'Lesson 2 — Core Vocabulary',
        description: 'Key words and phrases every learner should know.',
        duration: '8 min',
        videoUrl: '',
        quiz: [
          {
            id: 'e2-q1',
            question: 'Placeholder question 1 for Lesson 2.',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctIndex: 2,
            explanation: 'Explanation placeholder.',
          },
          {
            id: 'e2-q2',
            question: 'Placeholder question 2 for Lesson 2.',
            options: ['Option A', 'Option B'],
            correctIndex: 0,
            explanation: 'Explanation placeholder.',
          },
        ],
      },
      {
        id: 'elem-3',
        title: 'Lesson 3 — Basic Patterns',
        description: 'Recognising simple structures in context.',
        duration: '7 min',
        videoUrl: '',
        quiz: [
          {
            id: 'e3-q1',
            question: 'Placeholder question 1 for Lesson 3.',
            options: ['Option A', 'Option B', 'Option C'],
            correctIndex: 1,
            explanation: 'Explanation placeholder.',
          },
        ],
      },
    ],
  },
  {
    id: 'middle',
    label: 'Middle School',
    emoji: '📘',
    color: '#7EC8E3',
    colorLight: '#C8E9F7',
    description: 'Building on the basics with more depth and nuance.',
    lessons: [
      {
        id: 'mid-1',
        title: 'Lesson 1 — Expanding Vocabulary',
        description: 'Taking words further — context, connotation, and usage.',
        duration: '9 min',
        videoUrl: '',
        quiz: [
          {
            id: 'm1-q1',
            question: 'Placeholder question 1 for Middle Lesson 1.',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctIndex: 3,
            explanation: 'Explanation placeholder.',
          },
          {
            id: 'm1-q2',
            question: 'Placeholder question 2 for Middle Lesson 1.',
            options: ['Option A', 'Option B', 'Option C'],
            correctIndex: 0,
            explanation: 'Explanation placeholder.',
          },
        ],
      },
      {
        id: 'mid-2',
        title: 'Lesson 2 — Sentence Structure',
        description: 'How ideas are organised into meaningful sentences.',
        duration: '11 min',
        videoUrl: '',
        quiz: [
          {
            id: 'm2-q1',
            question: 'Placeholder question 1 for Middle Lesson 2.',
            options: ['Option A', 'Option B'],
            correctIndex: 1,
            explanation: 'Explanation placeholder.',
          },
          {
            id: 'm2-q2',
            question: 'Placeholder question 2 for Middle Lesson 2.',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctIndex: 2,
            explanation: 'Explanation placeholder.',
          },
          {
            id: 'm2-q3',
            question: 'Placeholder question 3 for Middle Lesson 2.',
            options: ['True', 'False'],
            correctIndex: 0,
            explanation: 'Explanation placeholder.',
          },
        ],
      },
      {
        id: 'mid-3',
        title: 'Lesson 3 — Reading Comprehension',
        description: 'Extracting meaning and inference from passages.',
        duration: '10 min',
        videoUrl: '',
        quiz: [
          {
            id: 'm3-q1',
            question: 'Placeholder question 1 for Middle Lesson 3.',
            options: ['Option A', 'Option B', 'Option C'],
            correctIndex: 2,
            explanation: 'Explanation placeholder.',
          },
        ],
      },
    ],
  },
  {
    id: 'highschool',
    label: 'High School',
    emoji: '🎓',
    color: '#9B7FE8',
    colorLight: '#E8E0FF',
    description: 'Advanced topics and analytical skills for older learners.',
    lessons: [
      {
        id: 'hs-1',
        title: 'Lesson 1 — Advanced Analysis',
        description: 'Critical thinking and deep reading strategies.',
        duration: '13 min',
        videoUrl: '',
        quiz: [
          {
            id: 'h1-q1',
            question: 'Placeholder question 1 for High School Lesson 1.',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctIndex: 1,
            explanation: 'Explanation placeholder.',
          },
          {
            id: 'h1-q2',
            question: 'Placeholder question 2 for High School Lesson 1.',
            options: ['Option A', 'Option B', 'Option C'],
            correctIndex: 2,
            explanation: 'Explanation placeholder.',
          },
        ],
      },
      {
        id: 'hs-2',
        title: 'Lesson 2 — Essay & Argument',
        description: 'Structuring persuasive and analytical writing.',
        duration: '14 min',
        videoUrl: '',
        quiz: [
          {
            id: 'h2-q1',
            question: 'Placeholder question 1 for High School Lesson 2.',
            options: ['Option A', 'Option B'],
            correctIndex: 0,
            explanation: 'Explanation placeholder.',
          },
          {
            id: 'h2-q2',
            question: 'Placeholder question 2 for High School Lesson 2.',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctIndex: 3,
            explanation: 'Explanation placeholder.',
          },
          {
            id: 'h2-q3',
            question: 'Placeholder question 3 for High School Lesson 2.',
            options: ['True', 'False'],
            correctIndex: 1,
            explanation: 'Explanation placeholder.',
          },
        ],
      },
      {
        id: 'hs-3',
        title: 'Lesson 3 — Literature & Context',
        description: 'Reading texts within their historical and cultural setting.',
        duration: '12 min',
        videoUrl: '',
        quiz: [
          {
            id: 'h3-q1',
            question: 'Placeholder question 1 for High School Lesson 3.',
            options: ['Option A', 'Option B', 'Option C'],
            correctIndex: 0,
            explanation: 'Explanation placeholder.',
          },
        ],
      },
    ],
  },
];

/**
 * Helper — look up a single lesson by its id across all levels.
 * Used by LessonPage to avoid prop-drilling the full LEVELS array.
 */
export function findLesson(lessonId) {
  for (const level of LEVELS) {
    const lesson = level.lessons.find(l => l.id === lessonId);
    if (lesson) return { lesson, level };
  }
  return null;
}
