// js/views/HomeView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { router } from '../router.js';
import { themeManager } from '../managers/ThemeManager.js';

export class HomeView {
  renderContent() {
    const character = state.get('character');
    
    if (!character) {
       return createElement('div', {}, 'Loading character data...');
    }

    const theme = themeManager.getCurrentTheme();

    // Realistic Mock Data for MVP Mission Control
    const mockData = {
      path: "Frontend Developer",
      chapter: "HTML",
      module: "Semantic HTML",
      quest: {
        title: "Build Semantic Landing Page",
        objective: "Create a semantic landing page using <header>, <main>, <section>, dan <footer>.",
        difficulty: "Beginner",
        estimatedTime: "30 min",
        reward: "+40 XP",
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

    // 1. Greeting (Dynamic from ThemeManager)
    const firstName = (character.displayName || 'Deny').split(' ')[0];
    const headerContext = createElement('div', { className: 'mb-4 animate-slide-up', style: 'margin-bottom: 24px;' }, [
      createElement('p', { className: 'm-0 text-gray font-bold text-sm mb-1' }, `${theme.greeting}, ${firstName}.`),
      createElement('p', { className: 'm-0 text-black font-bold text-md' }, theme.subGreeting)
    ]);

    // Container standard styles
    const cardStyle = 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); border-radius: 8px; background: var(--color-white); width: 100%; margin-bottom: 24px; overflow: hidden;';

    // 2. HERO: Today's Main Quest (Redesign Phase 2 + Revisions)
    const questState = 'AVAILABLE'; // Mock FSM state (Phase 6 will connect this to ProgressionEngine)
    let ctaLabel = 'Start Learning';
    if (questState === 'IN_PROGRESS') ctaLabel = 'Continue Learning';
    else if (questState === 'SUBMITTED') ctaLabel = 'Take Quiz';
    else if (questState === 'COMPLETED') ctaLabel = 'Continue Journey';

    const heroQuest = createElement('div', { 
      className: 'animate-slide-up delay-100', 
      style: cardStyle
    }, [
      // Content Box (White)
      createElement('div', { className: 'p-6' }, [
        createElement('span', { 
           className: 'font-bold text-sm text-black px-3 py-1 mb-4 d-inline-block', 
           style: 'background-color: var(--theme-accent); border-radius: 20px; white-space: nowrap;' 
        }, `${theme.icon} TODAY'S MISSION`),
        createElement('h1', { className: 'm-0 text-3xl font-black mb-3 text-black' }, mockData.quest.title),
        createElement('p', { 
           className: 'm-0 font-bold text-black text-md mb-2', 
           style: 'opacity: 0.8; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;' 
        }, [mockData.quest.objective]), // Array forces createTextNode avoiding HTML injection
        
        // Metrics Row (Pills, very light)
        createElement('div', { className: 'd-flex align-center mt-4 mb-2 flex-wrap', style: 'gap: 12px;' }, [
           createElement('span', { className: 'align-center text-sm font-bold px-3 py-1', style: 'display: inline-flex; gap: 4px; background: var(--color-gray-100); border-radius: 20px;' }, [
              createElement('span', {}, '🟢'), createElement('span', {}, mockData.quest.difficulty)
           ]),
           createElement('span', { className: 'align-center text-sm font-bold px-3 py-1', style: 'display: inline-flex; gap: 4px; background: var(--color-gray-100); border-radius: 20px;' }, [
              createElement('span', {}, '⏱'), createElement('span', {}, mockData.quest.estimatedTime)
           ]),
           createElement('span', { className: 'align-center text-sm font-bold px-3 py-1 text-warning', style: 'display: inline-flex; gap: 4px; background: var(--color-gray-100); border-radius: 20px;' }, [
              createElement('span', {}, '⭐'), createElement('span', {}, mockData.quest.reward)
           ])
        ])
      ]),
      // CTA Button (Full Width flush to bottom)
      createElement('button', {
        className: 'btn w-100 p-4 d-flex justify-center align-center gap-2',
        style: 'background-color: var(--theme-bg); color: var(--theme-btn-text); font-size: 18px; font-weight: 900; border: none; border-top: 3px solid var(--color-black); cursor: pointer; transition: background-color 0.2s;',
        onmousedown: (e) => { e.currentTarget.style.opacity = '0.9'; },
        onmouseup: (e) => { e.currentTarget.style.opacity = '1'; },
        onclick: () => router.navigate('/quest')
      }, [
        ctaLabel,
        createElement('i', { className: 'ph-bold ph-arrow-right text-xl' })
      ])
    ]);

    // 3. Next Unlock Attachment
    const nextUnlock = createElement('div', { 
      className: 'p-4 d-flex align-center animate-slide-up delay-200', 
      style: `${cardStyle} background: var(--theme-bg); padding: 24px; gap: 16px;` 
    }, [
      createElement('div', { className: 'bg-white p-2 d-flex align-center justify-center', style: 'border: 2px solid var(--color-black); border-radius: 50%; min-width: 48px; min-height: 48px;' }, [
        createElement('i', { className: 'ph-duotone ph-lock-key-open text-xl text-black', style: 'color: var(--color-black);' })
      ]),
      createElement('div', { className: 'd-flex align-center flex-wrap text-white', style: 'gap: 8px;' }, [
        createElement('span', { className: 'font-black' }, 'NEXT UNLOCK:'),
        createElement('span', { className: 'font-bold' }, `Complete this quest to unlock`),
        createElement('span', { className: 'font-black bg-white px-2 py-1', style: 'display: inline-block; color: var(--color-black); border: 2px solid var(--color-black); border-radius: 6px; box-shadow: 2px 2px 0px var(--color-black);' }, [mockData.nextUnlock])
      ])
    ]);

    // 4. Journey Progress
    const journeyProgress = createElement('div', { 
      className: 'animate-slide-up delay-300', 
      style: `${cardStyle} padding: 24px; display: flex; flex-direction: column;` 
    }, [
      createElement('h3', { className: 'text-xl font-black mb-4' }, 'Journey Preview'),
      createElement('div', { className: 'd-flex flex-column mb-4', style: 'gap: 12px;' }, mockData.roadmap.map(item => 
        createElement('div', { className: 'd-flex align-center p-2', style: `gap: 12px; ${item.status === 'current' ? 'background: var(--color-gray-100); border: 1px solid var(--color-black); border-radius: 6px;' : ''}` }, [
          item.status === 'completed' 
            ? createElement('i', { className: 'ph-fill ph-check-circle text-success text-2xl' })
            : item.status === 'current'
              ? createElement('i', { className: 'ph-fill ph-play-circle text-2xl', style: 'color: var(--theme-bg)' })
              : createElement('i', { className: 'ph-fill ph-lock-key text-gray text-2xl' }),
          createElement('span', { className: `font-bold ${item.status === 'locked' ? 'text-gray' : 'text-black'}` }, [item.title])
        ])
      )),
      createElement('button', { className: 'btn w-100 mt-auto', style: 'border: 2px solid var(--color-black); background: var(--color-white); color: var(--color-black); font-weight: bold;', onclick: () => router.navigate('/journey') }, 'Open Roadmap')
    ]);

    // 5. Achievement (Conditional)
    let recentAchievement = createElement('div', {}, []);
    if (mockData.achievement) {
      recentAchievement = createElement('div', { 
        className: 'animate-slide-up delay-400', 
        style: `${cardStyle} padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;` 
      }, [
        createElement('h3', { className: 'text-xl font-black mb-4 w-100 text-left' }, 'Recent Achievement'),
        createElement('div', { className: 'mb-4' }, [
          createElement('i', { className: 'ph-duotone ph-trophy', style: 'font-size: 80px; color: var(--theme-bg); filter: drop-shadow(4px 4px 0px var(--color-black));' })
        ]),
        createElement('div', { className: 'font-black text-2xl mb-2' }, mockData.achievement),
        createElement('div', { className: 'text-sm font-bold text-white bg-black px-4 py-2', style: 'border-radius: 20px;' }, 'Unlocked Today')
      ]);
    }

    // Wrap elements in a single column layout container
    const layoutContainer = createElement('div', { 
      className: 'd-flex flex-column', 
      style: 'max-width: 1100px; margin: 0 auto; padding-top: 32px; padding-bottom: 48px; width: 100%;' 
    }, [
      headerContext,
      heroQuest,
      nextUnlock,
      journeyProgress,
      recentAchievement
    ]);

    // CSS Utilities
    const style = createElement('style', {}, `
      @media(min-width: 768px) { .md-grid-cols-3 { grid-template-columns: repeat(3, 1fr); } }
      .bg-white { background-color: var(--color-white); }
      .bg-black { background-color: var(--color-black); }
      .text-white { color: var(--color-white); }
    `);
    document.head.appendChild(style);

    return createElement('div', { className: 'animate-fade-in w-100' }, [layoutContainer]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/home');
    return layout.render();
  }
}
