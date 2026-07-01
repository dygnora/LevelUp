export const htmlQuests = [
    {
        id: 'html-basics',
        moduleId: 'html',
        version: 1,
        
        title: 'HTML Basics & Structure',
        objective: 'Create your very first web page by understanding the fundamental skeleton of HTML.',
        whyItMatters: 'HTML is the foundational building block of the Web. Without it, browsers wouldn\'t know how to display text, images, or links. Mastering this structure is the first step to building anything on the internet.',
        learningOutcomes: [
            'Explain what HTML is and its role in web development.',
            'Understand the basic HTML document structure.',
            'Build a valid HTML5 boilerplate from scratch.',
            'Use common text formatting tags (h1-h6, p).',
            'Push your very first project to a public GitHub repository.'
        ],
        commonMistakes: [
            'Forgetting to close tags (e.g. <p> without </p>).',
            'Placing visible content inside the <head> element.',
            'Using multiple <h1> tags, confusing screen readers.',
            'Misspelling the <!DOCTYPE html> declaration.'
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
        objective: 'Build a well-structured webpage using semantic HTML elements that are easier for both users and search engines to understand.',
        whyItMatters: 'Using the right tags gives your content meaning. This boosts your website\'s SEO (making it easier to find on Google) and ensures screen readers can accurately interpret the page for visually impaired users.',
        learningOutcomes: [
            'Explain what semantic HTML is and why it matters.',
            'Choose semantic tags over generic divs.',
            'Build a semantic page layout.',
            'Improve document structure for accessibility.',
            'Organize page sections correctly.'
        ],
        commonMistakes: [
            'Using <div> for everything ("Div Soup").',
            'Using header tags (h1-h6) just to make text bold or big.',
            'Using <section> without a heading element inside it.',
            'Forgetting the <main> tag to wrap the core content.'
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
                title: 'CodePen Challenge: Convert Div Layout to Semantic Layout', 
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
                'Use only ONE <h1> per page',
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
                question: 'Case Study: You are building a news website. Which semantic element is the MOST appropriate container for a standalone news story?',
                options: ['<section>', '<div>', '<article>', '<main>'],
                correctAnswer: 2,
                category: 'Semantic HTML',
                explanation: 'The <article> element specifies independent, self-contained content, making it the perfect choice for a news story or blog post.'
            }
        ],

        rewards: {
            xp: 30,
            achievement: null
        }
    },
    {
        id: 'html-forms',
        moduleId: 'html',
        version: 1,
        
        title: 'Interactive HTML Forms',
        objective: 'Build a functional user input form using various HTML form controls and validation attributes.',
        whyItMatters: 'Forms are the primary way users interact with web applications, from logging in to submitting surveys. Knowing how to capture and validate user data natively in HTML is an essential web development skill.',
        learningOutcomes: [
            'Differentiate between various input types (text, email, password, radio, checkbox).',
            'Use the <form>, <label>, and <input> tags correctly.',
            'Implement client-side validation using attributes like required and minlength.',
            'Organize form elements using <fieldset> and <legend>.',
            'Build a complete contact form using semantic and accessible HTML elements.'
        ],
        commonMistakes: [
            'Missing <label> elements, hurting accessibility.',
            'Forgetting the <form> wrapper around inputs.',
            'Not adding a submit <button>, trapping the user.',
            'Using the wrong input type (e.g., using text instead of email) losing built-in validation.'
        ],
        skills: ['HTML Forms', 'Client-side Validation', 'Accessibility'],
        difficulty: 'BEGINNER',
        estimatedMinutes: 30,
        
        resourcesRequired: true,
        submissionRequired: true,
        quizRequired: true,

        resources: [
            { 
                title: 'MDN: Your first form', 
                type: 'documentation',
                estimatedMinutes: 15,
                difficulty: 'BEGINNER',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form' 
            },
            { 
                title: 'W3C: Form Input Types', 
                type: 'reference',
                estimatedMinutes: 5,
                difficulty: 'BEGINNER',
                url: 'https://www.w3schools.com/html/html_form_input_types.asp' 
            },
            { 
                title: 'Frontend Mentor: Build a Contact Form', 
                type: 'practice',
                estimatedMinutes: 10,
                difficulty: 'BEGINNER',
                url: 'https://www.frontendmentor.io/challenges/contact-form--GgfNf-Xb' 
            }
        ],

        submissionRequirement: { 
            type: 'github', 
            label: 'GitHub Repository URL',
            requirements: [
                'Public repository',
                'index.html with a valid <form>',
                'Must include <input>, <textarea>, and a <button>',
                'Use <label> for all inputs',
                'Include at least one validation attribute (e.g. required)'
            ]
        },

        passingScore: 80,
        quiz: [
            { 
                question: 'Which tag is used to create a dropdown list in an HTML form?', 
                options: ['<input type="dropdown">', '<select>', '<list>', '<dropdown>'], 
                correctAnswer: 1,
                category: 'HTML Forms',
                explanation: 'The <select> element is used to create a drop-down list. It contains <option> elements that define the available options.'
            },
            { 
                question: 'Which attribute ensures that a user cannot submit the form without filling out a specific input field?', 
                options: ['validate', 'important', 'mandatory', 'required'], 
                correctAnswer: 3,
                category: 'HTML Forms',
                explanation: 'The "required" attribute is a boolean attribute that specifies that an input field must be filled out before submitting the form.'
            },
            {
                question: 'Which implementation is more accessible for screen readers and improves the clickable hit area?',
                options: [
                    'Name: <input name="name">',
                    '<label for="name">Name:</label> <input id="name">',
                    '<div class="label">Name:</div> <input id="name">',
                    '<span>Name:</span> <input class="name">'
                ],
                correctAnswer: 1,
                category: 'Accessibility',
                explanation: 'Linking a <label> via the "for" attribute to an input\'s "id" provides programmatic context for screen readers and makes the label text clickable.'
            },
            {
                question: 'Which tag creates a multi-line text input field?',
                options: ['<input type="textarea">', '<input type="multiline">', '<textarea>', '<text>'],
                correctAnswer: 2,
                category: 'HTML Forms',
                explanation: 'The <textarea> tag defines a multi-line text input control, often used for messages or comments.'
            },
            {
                question: 'Case Study: You are creating a registration form where users must agree to the Terms of Service. Which input type is the best choice?',
                options: ['<input type="radio">', '<input type="button">', '<input type="checkbox">', '<input type="text">'],
                correctAnswer: 2,
                category: 'HTML Forms',
                explanation: 'A checkbox (<input type="checkbox">) is the standard UI component for a binary (yes/no) choice such as agreeing to terms.'
            }
        ],

        rewards: {
            xp: 30,
            achievement: null
        }
    },
    {
        id: 'html-tables',
        moduleId: 'html',
        version: 1,
        
        title: 'HTML Tables',
        objective: 'Build a well-structured and accessible HTML table to display tabular data.',
        whyItMatters: 'Tables are the standard way to present structured data, from pricing tiers to financial reports. Knowing how to correctly build accessible tables ensures all users can read and understand complex data presentations.',
        learningOutcomes: [
            'Differentiate between tabular data and page layout.',
            'Use basic table elements (table, tr, th, td).',
            'Structure complex tables using semantic grouping elements (thead, tbody, tfoot).',
            'Merge cells vertically or horizontally using colspan and rowspan.',
            'Build a complete, accessible data table.'
        ],
        commonMistakes: [
            'Using tables for page layouts instead of CSS Grid/Flexbox.',
            'Missing <th> elements, confusing screen readers.',
            'Forgetting to specify the scope attribute on headers (scope="col" or "row").',
            'Nesting tables excessively.'
        ],
        skills: ['HTML Tables', 'Data Presentation', 'Accessibility'],
        difficulty: 'BEGINNER',
        estimatedMinutes: 30,
        
        resourcesRequired: true,
        submissionRequired: true,
        quizRequired: true,

        resources: [
            { 
                title: 'MDN: HTML table basics', 
                type: 'documentation',
                estimatedMinutes: 15,
                difficulty: 'BEGINNER',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics' 
            },
            { 
                title: 'W3C: HTML Tables', 
                type: 'reference',
                estimatedMinutes: 5,
                difficulty: 'BEGINNER',
                url: 'https://www.w3schools.com/html/html_tables.asp' 
            },
            { 
                title: 'CodePen Challenge: Build a Pricing Table', 
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
                'index.html containing a <table>',
                'Use of <thead>, <tbody>, and <tfoot>',
                'At least one merged cell using colspan or rowspan',
                'Proper commit history'
            ]
        },

        passingScore: 80,
        quiz: [
            { 
                question: 'Which element is used to define a table row?', 
                options: ['<td>', '<th>', '<tr>', '<table>'], 
                correctAnswer: 2,
                category: 'HTML Tables',
                explanation: 'The <tr> tag defines a row in an HTML table, which can then contain <th> (header) or <td> (data) cells.'
            },
            { 
                question: 'Which attribute should you use to make a cell span across two columns?', 
                options: ['rowspan="2"', 'colspan="2"', 'span="2"', 'merge="2"'], 
                correctAnswer: 1,
                category: 'HTML Tables',
                explanation: 'The colspan attribute defines the number of columns a cell should span.'
            },
            { 
                question: 'Why is it considered bad practice to use HTML tables for page layout?', 
                options: ['Tables load too slowly.', 'Tables are deprecated in HTML5.', 'Tables break screen readers and are not responsive.', 'Browsers block tables.'], 
                correctAnswer: 2,
                category: 'Accessibility',
                explanation: 'Tables are designed for tabular data. Using them for layout breaks accessibility tools and makes responsive design incredibly difficult.'
            },
            {
                question: 'Which attribute on a <th> element helps screen readers understand whether the header applies to a row or a column?',
                options: ['type', 'scope', 'direction', 'target'],
                correctAnswer: 1,
                category: 'Accessibility',
                explanation: 'The scope attribute (e.g., scope="col" or scope="row") clearly defines the header\'s relationship to the data cells.'
            },
            {
                question: 'Case Study: You are displaying a monthly financial report with a final row showing the Total Revenue. Which tag should wrap the final row?',
                options: ['<thead>', '<tbody>', '<tfoot>', '<summary>'],
                correctAnswer: 2,
                category: 'HTML Tables',
                explanation: 'The <tfoot> element is used to group footer content in an HTML table, often summarizing the columns.'
            }
        ],

        rewards: {
            xp: 30,
            achievement: null
        }
    }
];
