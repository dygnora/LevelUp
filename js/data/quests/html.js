export const htmlQuests = [
    {
        id: 'html-basics',
        moduleId: 'html',
        version: 1,
        
        title: 'HTML Basics & Structure',
        objective: 'Create your very first web page by understanding the fundamental skeleton of HTML.',
        learningOutcomes: [
            'Understand the purpose of HTML in web development',
            'Set up the standard HTML5 boilerplate (!DOCTYPE, html, head, body)',
            'Use basic text formatting tags like headings (h1) and paragraphs (p)'
        ],
        difficulty: 'BEGINNER',
        estimatedMinutes: 20,
        
        resourcesRequired: true,
        submissionRequired: true,
        quizRequired: true,

        resources: [
            { 
                title: 'MDN: Getting started with HTML', 
                type: 'article', 
                url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started' 
            },
            { 
                title: 'HTML5 Boilerplate Guide', 
                type: 'reference', 
                url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html' 
            }
        ],

        submissionRequirement: { 
            type: 'github', 
            label: 'GitHub Repository URL' 
        },

        passingScore: 80,
        quiz: [
            { 
                question: 'What is the correct HTML element for inserting the largest heading?', 
                options: ['<heading>', '<h1>', '<head>', '<h6>'], 
                correctAnswer: 1,
                explanation: 'The <h1> to <h6> tags are used to define HTML headings. <h1> defines the most important and largest heading.'
            },
            { 
                question: 'Which section of an HTML document contains metadata like the page title and links to CSS files?', 
                options: ['<body>', '<main>', '<head>', '<meta>'], 
                correctAnswer: 2,
                explanation: 'The <head> element is a container for metadata (data about data) and is placed between the <html> tag and the <body> tag.'
            },
            {
                question: 'What is the purpose of the <!DOCTYPE html> declaration?',
                options: [
                    'It links the HTML file to a CSS stylesheet.',
                    'It tells the browser that this is an HTML5 document.',
                    'It creates the main container for the web page.',
                    'It closes the HTML document.'
                ],
                correctAnswer: 1,
                explanation: 'The <!DOCTYPE html> declaration represents the document type, and helps browsers to display web pages correctly according to the HTML5 standard.'
            }
        ],

        rewards: {
            xp: 30,
            achievement: null
        }
    }
];
