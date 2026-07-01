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
        skills: ['HTML', 'Boilerplate', 'GitHub'],
        difficulty: 'BEGINNER',
        estimatedMinutes: 20,
        
        resourcesRequired: true,
        submissionRequired: true,
        quizRequired: true,

        resources: [
            { 
                title: 'MDN: Getting started with HTML', 
                type: 'documentation', 
                estimatedMinutes: 10,
                difficulty: 'BEGINNER',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started' 
            },
            { 
                title: 'W3Schools: HTML Basic', 
                type: 'reference', 
                estimatedMinutes: 5,
                difficulty: 'BEGINNER',
                url: 'https://www.w3schools.com/html/html_basic.asp' 
            },
            { 
                title: 'CodePen: HTML Sandbox', 
                type: 'practice', 
                estimatedMinutes: 5,
                difficulty: 'BEGINNER',
                url: 'https://codepen.io/pen/' 
            }
        ],

        submissionRequirement: { 
            type: 'github', 
            label: 'GitHub Repository URL',
            requirements: [
                'Public repository',
                'index.html',
                'README.md',
                'Proper commit history'
            ]
        },

        passingScore: 80,
        quiz: [
            { 
                question: 'What does HTML stand for?', 
                options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper Text Machine Language'], 
                correctAnswer: 0,
                category: 'HTML Basics',
                explanation: 'HTML stands for Hyper Text Markup Language. It is the standard markup language for creating Web pages.'
            },
            { 
                question: 'What is the correct HTML element for inserting the largest heading?', 
                options: ['<heading>', '<h1>', '<head>', '<h6>'], 
                correctAnswer: 1,
                category: 'HTML Basics',
                explanation: 'The <h1> to <h6> tags define headings. <h1> defines the most important and largest heading, while <h6> defines the smallest.'
            },
            { 
                question: 'Which section of an HTML document contains metadata like the page title and links to CSS files?', 
                options: ['<body>', '<main>', '<head>', '<meta>'], 
                correctAnswer: 2,
                category: 'HTML Basics',
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
                category: 'HTML Basics',
                explanation: 'The <!DOCTYPE html> declaration represents the document type and helps browsers to display web pages correctly according to the HTML5 standard.'
            },
            {
                question: 'Which tag is used to define a paragraph?',
                options: ['<paragraph>', '<pr>', '<p>', '<para>'],
                correctAnswer: 2,
                category: 'HTML Basics',
                explanation: 'The <p> tag defines a paragraph. Browsers automatically add a single blank line before and after each <p> element.'
            }
        ],

        rewards: {
            xp: 30,
            achievement: null
        }
    },
    {
        id: 'semantic-html',
        moduleId: 'html',
        version: 1,
        
        title: 'Semantic HTML',
        objective: 'Structure a webpage using semantic HTML tags to improve SEO and accessibility.',
        learningOutcomes: [
            'Differentiate between semantic and non-semantic tags (like div and span).',
            'Use header, nav, main, and footer elements appropriately.',
            'Use section and article elements to group content.',
            'Understand how semantic HTML improves web accessibility (a11y).',
            'Structure a basic blog post using semantic layout.'
        ],
        skills: ['Semantic HTML', 'Accessibility', 'SEO', 'Web Structure'],
        difficulty: 'BEGINNER',
        estimatedMinutes: 25,
        
        resourcesRequired: true,
        submissionRequired: true,
        quizRequired: true,

        resources: [
            { 
                title: 'MDN: Document and website structure', 
                type: 'documentation',
                estimatedMinutes: 10,
                difficulty: 'BEGINNER',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure' 
            },
            { 
                title: 'HTML Semantic Elements Guide', 
                type: 'reference',
                estimatedMinutes: 5,
                difficulty: 'BEGINNER',
                url: 'https://www.w3schools.com/html/html5_semantic_elements.asp' 
            },
            { 
                title: 'CodePen: Semantic Layout', 
                type: 'practice',
                estimatedMinutes: 10,
                difficulty: 'BEGINNER',
                url: 'https://codepen.io/pen/' 
            }
        ],

        submissionRequirement: { 
            type: 'github', 
            label: 'GitHub Repository URL',
            requirements: [
                'Public repository',
                'index.html using <header>, <main>, and <footer>',
                'At least one <section> or <article>',
                'Proper commit history'
            ]
        },

        passingScore: 80,
        quiz: [
            { 
                question: 'What is the primary benefit of using Semantic HTML?', 
                options: ['It makes the web page load faster.', 'It automatically styles the web page.', 'It improves accessibility and SEO by providing meaning to the content.', 'It protects the website from hackers.'], 
                correctAnswer: 2,
                category: 'Semantic HTML',
                explanation: 'Semantic elements clearly describe their meaning in a human- and machine-readable way, helping screen readers and search engines.'
            },
            { 
                question: 'Which tag should be used to wrap the main navigation menu?', 
                options: ['<menu>', '<nav>', '<header>', '<section>'], 
                correctAnswer: 1,
                category: 'Semantic HTML',
                explanation: 'The <nav> element represents a section of a page whose purpose is to provide navigation links.'
            },
            { 
                question: 'Which tag is considered a non-semantic element?', 
                options: ['<article>', '<form>', '<table>', '<div>'], 
                correctAnswer: 3,
                category: 'Semantic HTML',
                explanation: 'The <div> element is a non-semantic container; it tells nothing about its content. Elements like <article> and <form> are semantic.'
            },
            {
                question: 'Where should the copyright information and contact details typically be placed?',
                options: ['<bottom>', '<footer>', '<end>', '<aside>'],
                correctAnswer: 1,
                category: 'Semantic HTML',
                explanation: 'The <footer> element represents a footer for its nearest sectioning content or sectioning root element, often containing copyright and authorship information.'
            },
            {
                question: 'What is the purpose of the <main> element?',
                options: ['To contain the dominant content of the document.', 'To declare the primary CSS file.', 'To define the most important heading.', 'To wrap the entire document including the head.'],
                correctAnswer: 0,
                category: 'Semantic HTML',
                explanation: 'The <main> element specifies the main content of a document, which should be unique and directly related to the central topic.'
            }
        ],

        rewards: {
            xp: 30,
            achievement: null
        }
    }
];
