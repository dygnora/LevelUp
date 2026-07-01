// js/views/HomeView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { router } from '../router.js';
import { themeManager } from '../managers/ThemeManager.js';
import { progressionEngine } from '../services/ProgressionEngine.js';

export class HomeView {
  renderContent() {
    const character = state.get('character');
    
    if (!character) {
       return createElement('div', {}, 'Loading character data...');
    }

    const theme = themeManager.getCurrentTheme();
    const ctx = progressionEngine.getHomeContext();

    if (!ctx) {
       return createElement('div', { className: 'p-6' }, 'No active journey found.');
    }

    // 1. Greeting
    const headerContext = createElement('div', { className: 'mb-4 animate-fade-up delay-0', style: 'margin-bottom: 24px;' }, [
      createElement('p', { className: 'm-0 text-gray font-bold text-sm mb-1' }, `${theme.greeting}, ${ctx.firstName}.`),
      createElement('p', { className: 'm-0 text-black font-bold text-md' }, theme.subGreeting)
    ]);

    const cardStyle = 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); border-radius: 8px; background: var(--color-white); width: 100%; margin-bottom: 24px; overflow: hidden;';

    // 2. HERO: Today's Main Quest
    const heroQuest = createElement('div', { 
      className: 'animate-fade-up delay-100 card-interactive', 
      style: `${cardStyle} transition: transform 150ms ease, box-shadow 150ms ease;`,
      onmouseenter: (e) => { 
         e.currentTarget.style.transform = 'translateY(-2px)';
         e.currentTarget.style.boxShadow = '8px 8px 0px var(--color-black)';
      },
      onmouseleave: (e) => { 
         e.currentTarget.style.transform = 'translateY(0)';
         e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-black)';
      }
    }, [
      createElement('div', { className: 'p-6' }, [
        createElement('span', { 
           className: 'font-bold text-sm text-black px-3 py-1 mb-4 d-inline-block', 
           style: 'background-color: var(--theme-accent); border-radius: 20px; white-space: nowrap;' 
        }, `${theme.icon} TODAY'S MISSION`),
        createElement('h1', { className: 'm-0 text-3xl font-black mb-3 text-black' }, ctx.quest.title),
        createElement('p', { 
           className: 'm-0 font-bold text-black text-md mb-2', 
           style: 'opacity: 0.8; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;' 
        }, [ctx.quest.objective]),
        
        createElement('div', { className: 'd-flex align-center mt-4 mb-2 flex-wrap', style: 'gap: 12px;' }, [
           createElement('span', { className: 'align-center text-sm font-bold px-3 py-1', style: 'display: inline-flex; gap: 4px; background: var(--color-gray-100); border-radius: 20px;' }, [
              createElement('span', {}, '🟢'), createElement('span', {}, ctx.quest.difficulty || 'Normal')
           ]),
           createElement('span', { className: 'align-center text-sm font-bold px-3 py-1', style: 'display: inline-flex; gap: 4px; background: var(--color-gray-100); border-radius: 20px;' }, [
              createElement('span', {}, '⏱'), createElement('span', {}, ctx.quest.estimatedMinutes ? `${ctx.quest.estimatedMinutes}m` : 'N/A')
           ]),
           createElement('span', { className: 'align-center text-sm font-bold px-3 py-1 text-warning', style: 'display: inline-flex; gap: 4px; background: var(--color-gray-100); border-radius: 20px;' }, [
              createElement('span', {}, '⭐'), createElement('span', {}, `+${ctx.quest.rewards?.xp || 0} XP`)
           ])
        ])
      ]),
      createElement('button', {
        className: 'btn-interactive w-100 p-4 d-flex justify-center align-center gap-2',
        style: 'background-color: var(--theme-bg); color: var(--theme-btn-text); font-size: 18px; font-weight: 900; border: none; border-top: 3px solid var(--color-black); cursor: pointer; transition: transform 120ms ease, background-color 200ms ease; transform-origin: center;',
        onmouseenter: (e) => { e.currentTarget.style.transform = 'scale(1.02)'; },
        onmouseleave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
        onmousedown: (e) => { e.currentTarget.style.transform = 'scale(0.98)'; },
        onmouseup: (e) => { e.currentTarget.style.transform = 'scale(1.02)'; },
        onclick: () => {
           if (ctx.questState === 'AVAILABLE') {
              progressionEngine.dispatch('START_QUEST', { questId: ctx.quest.id });
           }
           router.navigate('/quest');
        }
      }, [
        ctx.ctaLabel,
        createElement('i', { className: 'ph-bold ph-arrow-right text-xl' })
      ])
    ]);

    // 3. Next Unlock
    let nextUnlock = createElement('div', { className: 'd-none' }); 
    if (ctx.nextUnlock) {
       nextUnlock = createElement('div', { 
         className: 'p-6 animate-fade-up delay-180 card-interactive', 
         style: `${cardStyle} box-shadow: 4px 4px 0px var(--color-black); transition: all 0.2s; cursor: default;`,
         onmouseenter: (e) => { 
           const icon = e.currentTarget.querySelector('.lock-icon');
           if(icon) { icon.style.transform = 'rotate(5deg)'; }
         },
         onmouseleave: (e) => { 
           const icon = e.currentTarget.querySelector('.lock-icon');
           if(icon) { icon.style.transform = 'rotate(0deg)'; }
         }
       }, [
         createElement('div', { className: 'd-flex flex-column gap-3' }, [
           createElement('div', { className: 'd-flex align-center gap-2 mb-1' }, [
             createElement('i', { className: 'ph-fill ph-lock-key text-gray text-xl lock-icon', style: 'transition: transform 0.2s;' }),
             createElement('span', { className: 'text-gray text-xs font-bold' }, 'NEXT UNLOCK')
           ]),
           createElement('h3', { className: 'm-0 text-xl font-black text-black' }, ctx.nextUnlock.title),
           createElement('p', { className: 'm-0 font-bold text-gray text-sm' }, `Complete ${ctx.quest.title} to unlock this module.`),
         ])
       ]);
    }

    // 4. Journey Progress
    const journeyProgress = createElement('div', { 
      className: 'p-6 animate-fade-up delay-260 card-interactive', 
      style: `${cardStyle} box-shadow: 6px 6px 0px var(--color-black); transition: transform 0.2s, box-shadow 0.2s;`,
      onmouseenter: (e) => { 
         e.currentTarget.style.transform = 'translateY(-2px)';
         e.currentTarget.style.boxShadow = '8px 8px 0px var(--color-black)';
      },
      onmouseleave: (e) => { 
         e.currentTarget.style.transform = 'translateY(0)';
         e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-black)';
      }
    }, [
      createElement('div', { className: 'd-flex justify-between align-center mb-4 flex-wrap', style: 'gap: 16px;' }, [
         createElement('div', {}, [
           createElement('h3', { className: 'm-0 text-xl font-black mb-1 text-uppercase' }, `${ctx.journey.title} Journey`),
           createElement('p', { className: 'm-0 text-sm font-bold', style: 'color: var(--color-gray-600);' }, ctx.journey.description)
         ]),
         createElement('div', { 
            className: 'px-3 py-2 font-bold text-xs d-flex align-center', 
            style: 'background: var(--color-black); color: var(--color-white); border-radius: 20px; gap: 8px; white-space: nowrap; border: 2px solid var(--color-black); box-shadow: 2px 2px 0px var(--color-gray-400);' 
         }, [
            createElement('i', { className: 'ph-fill ph-flag text-base' }),
            createElement('span', {}, `${ctx.stats.completedQuests}/${ctx.stats.totalQuests} Quests`)
         ])
      ]),
      
      createElement('div', { className: 'mb-6', style: 'width: 100%; height: 24px; background: var(--color-gray-200); border: 3px solid var(--color-black); position: relative; box-shadow: 4px 4px 0px var(--color-black); border-radius: 24px; overflow: hidden; display: flex; align-items: center; justify-content: center;' }, [
         createElement('div', { 
            className: ctx.stats.percentage > 0 ? 'progress-bar-striped' : '',
            style: `height: 100%; width: 0%; border-right: ${ctx.stats.percentage > 0 ? '3px solid var(--color-black)' : 'none'}; transition: width 700ms cubic-bezier(0.4, 0, 0.2, 1); background-color: var(--color-success); position: absolute; left: 0; top: 0;` 
         }, []),
         createElement('span', { className: 'font-bold text-xs', style: 'z-index: 2; color: var(--color-black); mix-blend-mode: difference; color: white;' }, `${Math.round(ctx.stats.percentage)}% PROGRESS`)
      ]),

      createElement('div', { className: 'd-flex flex-column mb-3', style: 'gap: 12px;' }, ctx.roadmap.map((item, index) => {
        let blockStyle, iconHtml, textStyle;
        
        if (item.state === 'COMPLETED') {
           blockStyle = 'background: var(--color-gray-100); border: 2px solid var(--color-black); color: var(--color-gray-600);';
           iconHtml = createElement('i', { className: 'ph-bold ph-check text-success text-lg' });
           textStyle = 'text-decoration: line-through;';
        } else if (item.state === 'IN_PROGRESS' || item.state === 'SUBMITTED' || item.state === 'AVAILABLE') {
           blockStyle = 'background: var(--theme-accent); border: 3px solid var(--color-black); box-shadow: 4px 4px 0px var(--color-black); color: var(--color-black); transform: scale(1.02); z-index: 1;';
           iconHtml = createElement('i', { className: 'ph-fill ph-play text-xl' });
           textStyle = '';
        } else {
           blockStyle = 'background: var(--color-gray-100); border: 2px solid var(--color-gray-300); color: var(--color-gray-400);';
           iconHtml = createElement('i', { className: 'ph-bold ph-lock-key text-lg' });
           textStyle = '';
        }

        return createElement('div', { 
          className: 'd-flex align-center p-3 card-interactive animate-fade-up',
          style: `border-radius: 16px; gap: 12px; ${blockStyle} transition: transform 0.2s, box-shadow 0.2s; animation-delay: ${260 + (index * 40)}ms;`
        }, [
          iconHtml,
          createElement('span', { className: 'font-bold text-sm', style: textStyle }, [item.title])
        ]);
      })),

      createElement('div', { className: 'd-flex', style: 'justify-content: flex-end; margin-top: 24px;' }, [
         createElement('button', { 
            className: 'font-black text-sm d-flex align-center gap-2 p-3 px-4',
            style: 'background: var(--color-white); color: var(--color-black); border: 2px solid var(--color-black); box-shadow: 3px 3px 0px var(--color-black); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s; border-radius: 24px;',
            onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = '1px 1px 0px var(--color-black)'; },
            onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '3px 3px 0px var(--color-black)'; },
            onclick: () => router.navigate('/journey')
         }, [
            'OPEN JOURNEY', 
            createElement('i', { className: 'ph-bold ph-arrow-right' })
         ])
      ])
    ]);
    
    setTimeout(() => {
       const pb = journeyProgress.querySelector('div[style*="transition: width 700ms"]');
       if(pb) pb.style.width = `${ctx.stats.percentage}%`;
    }, 50);

    // 5. Achievement (Conditional)
    let recentAchievement;
    if (ctx.latestAchievement) {
      recentAchievement = createElement('div', { 
        className: 'animate-fade-up delay-300', 
        style: `${cardStyle} padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;` 
      }, [
        createElement('h3', { className: 'text-xl font-black mb-4 w-100 text-left' }, 'Recent Achievement'),
        createElement('div', { className: 'mb-4' }, [
          createElement('i', { className: 'ph-duotone ph-trophy', style: 'font-size: 80px; color: var(--theme-bg); filter: drop-shadow(4px 4px 0px var(--color-black));' })
        ]),
        createElement('div', { className: 'font-black text-2xl mb-2' }, ctx.latestAchievement),
        createElement('div', { className: 'text-sm font-bold text-white bg-black px-4 py-2', style: 'border-radius: 20px;' }, 'Unlocked')
      ]);
    } else {
      recentAchievement = createElement('div', { 
        className: 'animate-fade-up delay-300', 
        style: `${cardStyle} padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: var(--color-gray-100); border: 2px dashed var(--color-gray-400); box-shadow: none;` 
      }, [
        createElement('i', { className: 'ph-duotone ph-medal text-gray mb-3', style: 'font-size: 48px; opacity: 0.5;' }),
        createElement('p', { className: 'm-0 font-bold text-gray' }, 'No achievements yet.'),
        createElement('p', { className: 'm-0 font-bold text-black mt-1' }, 'Your first badge is waiting.')
      ]);
    }

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
