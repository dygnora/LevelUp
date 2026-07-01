export const htmlQuests = [
    {
        id: 'html-basics',
        moduleId: 'html',
        version: 1,
        
        title: 'HTML Basics & Structure',
        objective: 'Create your very first web page by understanding the fundamental skeleton of HTML.',
        learningOutcomes: [
            'Explain what HTML is and its role in web development.',
            'Understand the basic HTML document structure.',
            'Build a valid HTML5 boilerplate from scratch.',
            'Use common text formatting tags (h1-h6, p).',
            'Push your very first project to a public GitHub repository.'
        ],
        difficulty: 'BEGINNER',
        estimatedMinutes: 20,
        
        resourcesRequired: true,
        submissionRequired: true,
        quizRequired: true,

        resources: [
            { 
                title: 'MDN: Getting started with HTML', 
                type: 'documentation', 
                url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started' 
            },
            { 
                title: 'W3Schools: HTML Basic', 
                type: 'reference', 
                url: 'https://www.w3schools.com/html/html_basic.asp' 
            },
            { 
                title: 'CodePen: HTML Sandbox', 
                type: 'practice', 
                url: 'https://codepen.io/pen/' 
            }
        ],

        submissionRequirement: { 
            type: 'github', 
            label: 'GitHub Repository URL',
            details: [
                'index.html',
                'README.md',
                'Proper commit history',
                'Public repository'
            ]
        },

        passingScore: 80,
        quiz: [
            { 
                question: 'What does HTML stand for?', 
                options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper Text Machine Language'], 
                correctAnswer: 0,
                explanation: 'HTML stands for Hyper Text Markup Language. It is the standard markup language for creating Web pages.'
            },
            { 
                question: 'What is the correct HTML element for inserting the largest heading?', 
                options: ['<heading>', '<h1>', '<head>', '<h6>'], 
                correctAnswer: 1,
                explanation: 'The <h1> to <h6> tags define headings. <h1> defines the most important and largest heading, while <h6> defines the smallest.'
            },
            { 
                question: 'Which section of an HTML document contains metadata like the page title and links to CSS files?', 
                options: ['<body>', '<main>', '<head>', '<meta>'], 
                correctAnswer: 2,
                explanation: 'The <head> element is a container for metadata (data about data) and is placed between the <html> tag and the <body> tag. It does not display content directly on the page.'
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
                explanation: 'The <!DOCTYPE html> declaration represents the document type and helps browsers to display web pages correctly according to the HTML5 standard.'
            },
            {
                question: 'Which tag is used to define a paragraph?',
                options: ['<paragraph>', '<pr>', '<p>', '<para>'],
                correctAnswer: 2,
                explanation: 'The <p> tag defines a paragraph. Browsers automatically add a single blank line before and after each <p> element.'
            }
        ],

        rewards: {
            xp: 30,
            achievement: null
        }
    }
];
