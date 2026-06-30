// js/views/HomeView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { router } from '../router.js';

export class HomeView {
  renderContent() {
    const character = state.get('character');
    
    if (!character) {
       return createElement('div', {}, 'Loading character data...');
    }

    // Realistic Mock Data for MVP Mission Control
    const mockData = {
      path: "Frontend Developer",
      chapter: "HTML",
      module: "Semantic HTML",
      quest: {
        title: "Build Semantic Landing Page",
        objective: "Create a responsive landing page using semantic HTML elements.",
        estimatedTime: "30 Minutes",
        reward: "40 XP",
        deliverable: "GitHub Repository",
        quizStatus: "Available after submission"
      },
      nextUnlock: "HTML Forms",
      resources: [
        { type: 'Documentation', title: 'MDN Web Docs', icon: 'ph-book-bookmark' },
        { type: 'Video', title: 'YouTube Tutorial', icon: 'ph-video' },
        { type: 'Practice', title: 'Frontend Mentor', icon: 'ph-flask' }
      ],
      roadmap: [
        { status: 'completed', title: 'HTML Basics' },
        { status: 'current', title: 'Semantic HTML' },
        { status: 'locked', title: 'HTML Forms' },
        { status: 'locked', title: 'Tables' }
      ],
      achievement: "HTML Explorer"
    };

    // 1. Greeting & Breadcrumb
    const headerContext = createElement('div', { className: 'mb-6 animate-slide-up' }, [
      createElement('p', { className: 'm-0 text-gray font-bold text-sm mb-2' }, `Good Morning, ${character.displayName || 'Hero'}`),
      createElement('h2', { className: 'm-0 text-2xl font-black d-flex align-center gap-2 flex-wrap' }, [
        createElement('span', { style: 'color: var(--color-black);' }, mockData.path),
        createElement('i', { className: 'ph-bold ph-caret-right text-gray text-lg' }),
        createElement('span', { className: 'text-gray' }, mockData.chapter),
        createElement('i', { className: 'ph-bold ph-caret-right text-gray text-lg' }),
        createElement('span', { style: 'color: var(--theme-bg); text-shadow: 1px 1px 0px var(--color-black);' }, mockData.module)
      ])
    ]);

    // 2. HERO: Today's Main Quest
    const heroQuest = createElement('div', { 
      className: 'card animate-slide-up delay-100 mb-6', 
      style: 'border: 4px solid var(--color-black); box-shadow: 12px 12px 0px var(--color-black); background: var(--color-white); padding: 0; overflow: hidden;'
    }, [
      // Header
      createElement('div', { style: 'background: var(--theme-bg); padding: 24px 32px; border-bottom: 4px solid var(--color-black);' }, [
        createElement('span', { className: 'font-bold text-sm bg-black text-white px-3 py-1 mb-3 d-inline-block', style: 'border-radius: 20px;' }, 'TODAY\'S MAIN QUEST'),
        createElement('h1', { className: 'm-0 text-4xl font-black mb-2', style: 'color: var(--color-black);' }, mockData.quest.title),
        createElement('p', { className: 'm-0 font-bold', style: 'color: var(--color-black); opacity: 0.8; font-size: 1.1rem;' }, mockData.quest.objective)
      ]),
      // Body
      createElement('div', { className: 'p-6' }, [
        // Stats Row
        createElement('div', { className: 'grid grid-cols-1 md-grid-cols-3 mb-6', style: 'gap: 16px;' }, [
          createElement('div', { className: 'p-4 bg-gray-100', style: 'border: 2px solid var(--color-black); border-radius: 8px;' }, [
            createElement('div', { className: 'text-gray text-xs font-bold mb-1' }, 'ESTIMATED TIME'),
            createElement('div', { className: 'font-black d-flex align-center gap-2' }, [
              createElement('i', { className: 'ph-bold ph-hourglass-high text-xl' }), mockData.quest.estimatedTime
            ])
          ]),
          createElement('div', { className: 'p-4 bg-gray-100', style: 'border: 2px solid var(--color-black); border-radius: 8px;' }, [
            createElement('div', { className: 'text-gray text-xs font-bold mb-1' }, 'DELIVERABLE'),
            createElement('div', { className: 'font-black d-flex align-center gap-2' }, [
              createElement('i', { className: 'ph-bold ph-github-logo text-xl' }), mockData.quest.deliverable
            ])
          ]),
          createElement('div', { className: 'p-4 bg-gray-100', style: 'border: 2px solid var(--color-black); border-radius: 8px;' }, [
            createElement('div', { className: 'text-gray text-xs font-bold mb-1' }, 'REWARD'),
            createElement('div', { className: 'font-black d-flex align-center gap-2 text-warning' }, [
              createElement('i', { className: 'ph-bold ph-star text-xl' }), mockData.quest.reward
            ])
          ])
        ]),
        
        // Completion Flow & Quiz Status
        createElement('div', { className: 'p-4 mb-6', style: 'border: 2px dashed var(--color-gray-400); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;' }, [
          createElement('div', {}, [
            createElement('div', { className: 'text-gray text-xs font-bold mb-2' }, 'TODAY\'S FLOW'),
            createElement('div', { className: 'd-flex align-center gap-2 text-sm font-bold flex-wrap' }, [
              createElement('span', { className: 'bg-black text-white px-2 py-1' }, '1. Learn'),
              createElement('i', { className: 'ph-bold ph-arrow-right text-gray' }),
              createElement('span', { className: 'bg-black text-white px-2 py-1' }, '2. Build & Submit'),
              createElement('i', { className: 'ph-bold ph-arrow-right text-gray' }),
              createElement('span', { className: 'bg-black text-white px-2 py-1' }, '3. Quiz'),
              createElement('i', { className: 'ph-bold ph-arrow-right text-gray' }),
              createElement('span', { className: 'bg-warning text-black px-2 py-1' }, 'XP')
            ])
          ]),
          createElement('div', { className: 'text-right' }, [
            createElement('div', { className: 'text-gray text-xs font-bold mb-1' }, 'QUIZ STATUS'),
            createElement('div', { className: 'font-bold d-flex align-center gap-2 text-sm text-gray' }, [
              createElement('i', { className: 'ph-bold ph-lock-key text-lg' }),
              mockData.quest.quizStatus
            ])
          ])
        ]),

        // Learning Resources
        createElement('div', { className: 'mb-8' }, [
          createElement('h3', { className: 'text-lg font-black mb-3' }, 'Learning Resources'),
          createElement('div', { className: 'grid grid-cols-1 md-grid-cols-3', style: 'gap: 16px;' }, mockData.resources.map(res => 
            createElement('a', { href: '#', className: 'card-interactive p-3 d-flex align-center gap-3', style: 'border: 2px solid var(--color-black); border-radius: 8px; text-decoration: none; color: var(--color-black); background: var(--color-white);' }, [
              createElement('div', { className: 'bg-gray-100 p-2 d-flex align-center justify-center', style: 'border-radius: 4px; border: 1px solid var(--color-black);' }, [
                createElement('i', { className: `ph-duotone ${res.icon} text-xl` })
              ]),
              createElement('div', {}, [
                createElement('div', { className: 'text-xs font-bold text-gray' }, res.type),
                createElement('div', { className: 'font-bold text-sm' }, res.title)
              ])
            ])
          ))
        ]),

        // CTA Button
        createElement('button', {
          className: 'btn w-100 p-4',
          style: 'background-color: var(--color-black); color: var(--color-white); font-size: 18px; font-weight: 900; border: none; box-shadow: 0 6px 0px rgba(0,0,0,0.8); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;',
          onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = '0 0px 0px rgba(0,0,0,0.8)'; },
          onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0px rgba(0,0,0,0.8)'; }
        }, 'START QUEST')
      ])
    ]);

    // 3. Next Unlock Attachment
    const nextUnlock = createElement('div', { 
      className: 'card p-4 d-flex align-center gap-4 animate-slide-up delay-200 mb-8', 
      style: 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); background: var(--theme-bg); margin-top: -24px; width: 92%; margin-left: auto; margin-right: auto; position: relative; z-index: 1;' 
    }, [
      createElement('div', { className: 'bg-white p-2 d-flex align-center justify-center', style: 'border: 2px solid var(--color-black); border-radius: 50%;' }, [
        createElement('i', { className: 'ph-duotone ph-lock-key-open text-2xl text-black' })
      ]),
      createElement('div', { className: 'd-flex align-center flex-wrap gap-1' }, [
        createElement('span', { className: 'font-black' }, 'NEXT UNLOCK:'),
        createElement('span', { className: 'font-bold' }, `Complete this quest to unlock `),
        createElement('span', { className: 'font-black bg-white px-2 py-1 d-inline-block', style: 'border: 2px solid var(--color-black); border-radius: 6px; box-shadow: 2px 2px 0px var(--color-black);' }, mockData.nextUnlock)
      ])
    ]);

    // 4. Secondary Grid (Preview & Achievement)
    const secondaryGrid = createElement('div', { className: 'grid grid-cols-1 md-grid-cols-2', style: 'gap: 24px;' }, [
      // Journey Preview
      createElement('div', { className: 'card animate-slide-up delay-300', style: 'border: 3px solid var(--color-black); background: var(--color-white); padding: 24px; display: flex; flex-direction: column;' }, [
        createElement('h3', { className: 'text-xl font-black mb-4' }, 'Journey Preview'),
        createElement('div', { className: 'd-flex flex-column gap-3 mb-4' }, mockData.roadmap.map(item => 
          createElement('div', { className: 'd-flex align-center gap-3 p-2', style: item.status === 'current' ? 'background: var(--color-gray-100); border: 1px solid var(--color-black); border-radius: 6px;' : '' }, [
            item.status === 'completed' 
              ? createElement('i', { className: 'ph-fill ph-check-circle text-success text-2xl' })
              : item.status === 'current'
                ? createElement('i', { className: 'ph-fill ph-play-circle text-2xl', style: 'color: var(--theme-bg)' })
                : createElement('i', { className: 'ph-fill ph-lock-key text-gray text-2xl' }),
            createElement('span', { className: `font-bold ${item.status === 'locked' ? 'text-gray' : 'text-black'}` }, item.title)
          ])
        )),
        createElement('button', { className: 'btn w-100 mt-auto', style: 'border: 2px solid var(--color-black); background: var(--color-white); color: var(--color-black); font-weight: bold;', onclick: () => router.navigate('/journey') }, 'Open Roadmap')
      ]),
      // Achievement
      createElement('div', { className: 'card animate-slide-up delay-400', style: 'border: 3px solid var(--color-black); background: var(--color-white); padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;' }, [
        createElement('h3', { className: 'text-xl font-black mb-4 w-100 text-left' }, 'Recent Achievement'),
        createElement('div', { className: 'mb-4' }, [
          createElement('i', { className: 'ph-duotone ph-trophy', style: 'font-size: 80px; color: var(--theme-bg); filter: drop-shadow(4px 4px 0px var(--color-black));' })
        ]),
        createElement('div', { className: 'font-black text-2xl mb-2' }, mockData.achievement),
        createElement('div', { className: 'text-sm font-bold text-white bg-black px-4 py-2', style: 'border-radius: 20px;' }, 'Unlocked Today')
      ])
    ]);

    // CSS Utilities
    const style = createElement('style', {}, `
      @media(min-width: 768px) { .md-grid-cols-2 { grid-template-columns: repeat(2, 1fr); } .md-grid-cols-3 { grid-template-columns: repeat(3, 1fr); } }
      .bg-white { background-color: var(--color-white); }
      .bg-black { background-color: var(--color-black); }
      .text-white { color: var(--color-white); }
    `);
    document.head.appendChild(style);

    return createElement('div', { className: 'animate-fade-in' }, [
      headerContext,
      heroQuest,
      nextUnlock,
      secondaryGrid
    ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/home');
    return layout.render();
  }
}
