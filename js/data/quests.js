export const quests = {
  'semantic-html': {
    id: 'semantic-html',
    moduleId: 'html',
    order: 1,
    title: 'Build Semantic Landing Page',
    objective: 'Create a responsive landing page using semantic HTML5 tags.',
    difficulty: 'BEGINNER',
    estimatedTime: '30 Minutes',
    resourcesRequired: true,
    submissionRequired: true,
    quizRequired: true,
    resources: [
      { title: 'MDN Web Docs', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics' }
    ],
    submissionRequirement: { type: 'github', label: 'GitHub Repository URL' },
    quiz: [
      { question: 'Which tag is used for the main navigation?', options: ['<nav>', '<header>', '<section>'], correctAnswer: 0 }
    ],
    passingScore: 100,
    rewardXP: 40,
    nextQuestId: 'html-forms'
  },
  'html-forms': {
    id: 'html-forms',
    moduleId: 'html',
    order: 2,
    title: 'Interactive HTML Forms',
    objective: 'Build a contact form with full validation.',
    difficulty: 'BEGINNER',
    estimatedTime: '45 Minutes',
    resourcesRequired: false,
    submissionRequired: true,
    quizRequired: false,
    resources: [],
    submissionRequirement: { type: 'github', label: 'GitHub Repository URL' },
    quiz: [],
    rewardXP: 50,
    nextQuestId: 'css-basics' // Jump to CSS module
  },
  'css-basics': {
    id: 'css-basics',
    moduleId: 'css',
    order: 1,
    title: 'Style the Landing Page',
    objective: 'Apply CSS to make your landing page beautiful.',
    difficulty: 'INTERMEDIATE',
    estimatedTime: '1 Hour',
    resourcesRequired: false,
    submissionRequired: true,
    quizRequired: false,
    resources: [],
    submissionRequirement: { type: 'github', label: 'GitHub Repository URL' },
    quiz: [],
    rewardXP: 60,
    nextQuestId: null
  }
};
