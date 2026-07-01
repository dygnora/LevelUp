export const htmlQuests = [
    {
        id: 'semantic-html',
        moduleId: 'html',
        version: 1,
        
        title: 'Build Semantic Landing Page',
        objective: 'Create a responsive landing page using semantic HTML5 tags.',
        learningOutcomes: [
            'Explain semantic HTML',
            'Use header, nav, main, and footer elements correctly'
        ],
        difficulty: 'BEGINNER',
        estimatedMinutes: 30,
        
        resourcesRequired: true,
        submissionRequired: true,
        quizRequired: true,

        resources: [
            { title: 'MDN Web Docs', type: 'documentation', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics' }
        ],

        submissionRequirement: { 
            type: 'github', 
            label: 'GitHub Repository URL' 
        },

        passingScore: 80,
        quiz: [
            { 
                question: 'Which tag is used for the main navigation?', 
                options: ['<nav>', '<header>', '<section>'], 
                correctAnswer: 0,
                explanation: 'The <nav> element represents navigation links.'
            }
        ],

        rewards: {
            xp: 40,
            achievement: null
        }
    },
    {
        id: 'html-forms',
        moduleId: 'html',
        version: 1,
        
        title: 'Interactive HTML Forms',
        objective: 'Build a contact form with full validation.',
        learningOutcomes: [
            'Understand form inputs',
            'Implement client-side validation'
        ],
        difficulty: 'BEGINNER',
        estimatedMinutes: 45,
        
        resourcesRequired: false,
        submissionRequired: true,
        quizRequired: false,

        resources: [],

        submissionRequirement: { 
            type: 'github', 
            label: 'GitHub Repository URL' 
        },

        passingScore: 80,
        quiz: [],

        rewards: {
            xp: 50,
            achievement: null
        }
    }
];
