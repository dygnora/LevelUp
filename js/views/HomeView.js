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

    // Determine Avatar
    const avatarContent = character.photoURL 
      ? createElement('img', { src: character.photoURL, style: 'width: 100%; height: 100%; object-fit: cover; border-radius: 50%;' })
      : createElement('i', { className: 'ph-duotone ph-user', style: 'font-size: 48px; color: var(--color-black);' });

    // Character Card (Player Banner)
    const characterCard = createElement('div', { 
      className: 'card mb-8 animate-slide-up', 
      style: `background-color: var(--theme-bg); border: 4px solid var(--color-black); box-shadow: 12px 12px 0px var(--color-black); position: relative; overflow: hidden; padding: 40px;` 
    }, [
      // Decorative background pattern (dots)
      createElement('div', { style: 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(var(--color-black) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.1; pointer-events: none;' }),
      
      createElement('div', { className: 'd-flex align-center gap-6 mb-6', style: 'position: relative; z-index: 1;' }, [
        createElement('div', { 
          style: 'width: 100px; height: 100px; background: var(--color-white); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); overflow: hidden; flex-shrink: 0;' 
        }, [avatarContent]),
        
        createElement('div', {}, [
          createElement('h2', { className: 'm-0 text-4xl font-black mb-1', style: 'color: var(--color-black); text-shadow: 2px 2px 0px rgba(255,255,255,0.5);' }, character.displayName),
          createElement('div', { className: 'd-flex align-center gap-2 mt-2' }, [
            createElement('span', { className: 'badge', style: 'background: var(--color-black); color: var(--color-white); font-size: 14px; padding: 4px 12px; border-radius: 20px;' }, `Level ${character.characterLevel || 1}`),
            createElement('span', { className: 'font-bold', style: 'color: var(--color-black);' }, character.characterRank || 'Beginner')
          ])
        ])
      ]),

      // XP Progress Bar (using the animated striped design)
      createElement('div', { className: 'mt-6', style: 'position: relative; z-index: 1;' }, [
        createElement('div', { className: 'd-flex justify-between mb-2 font-bold text-sm', style: 'color: var(--color-black);' }, [
          createElement('span', {}, 'XP Progress'),
          createElement('span', {}, `${character.characterXP || 0} / 100 XP`)
        ]),
        createElement('div', { 
          className: 'progress-container', 
          style: 'background: var(--color-white); height: 24px; border-radius: 12px; border: 3px solid var(--color-black); box-shadow: inset 0px 3px 0px rgba(0,0,0,0.1); overflow: hidden;' 
        }, [
          createElement('div', { 
            className: 'xp-bar-animated', 
            style: `width: ${Math.min(((character.characterXP || 0) / 100) * 100, 100)}%; background-color: var(--color-black); height: 100%; border-radius: 8px 0 0 8px;`
          })
        ])
      ])
    ]);

    // Quick Stats & Next Action
    const dashboardGrid = createElement('div', { className: 'grid grid-cols-1 md-grid-cols-2', style: 'gap: 32px;' }, [
      
      // Current Journey Card
      createElement('div', { 
        className: 'card animate-slide-up delay-100',
        style: 'border: 3px solid var(--color-black); box-shadow: 8px 8px 0px var(--color-black); background: var(--color-white); padding: 32px; display: flex; flex-direction: column;'
      }, [
        createElement('div', { className: 'd-flex justify-between align-start mb-4' }, [
          createElement('div', {}, [
            createElement('h3', { className: 'text-2xl font-bold m-0 mb-2' }, 'Current Journey'),
            createElement('p', { className: 'text-gray m-0' }, 'Continue where you left off.')
          ]),
          createElement('i', { className: 'ph-duotone ph-map-trifold', style: 'font-size: 40px; color: var(--theme-bg);' })
        ]),
        createElement('button', { 
          className: 'btn w-100 mt-auto',
          style: 'background-color: var(--theme-bg); color: var(--color-black); font-weight: 800; font-size: 16px; border: 3px solid var(--color-black); box-shadow: 4px 4px 0px var(--color-black); padding: 16px; display: flex; justify-content: center; align-items: center; gap: 8px; transition: all 0.2s ease;',
          onclick: () => router.navigate('/journey'),
          onmouseover: (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '4px 6px 0px var(--color-black)'; },
          onmouseout: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-black)'; }
        }, [
          'Continue Adventure',
          createElement('i', { className: 'ph-bold ph-arrow-right' })
        ])
      ]),

      // Daily Quest (Bounty Card)
      createElement('div', { 
        className: 'card animate-slide-up delay-200',
        style: 'border: 3px solid var(--color-black); box-shadow: 8px 8px 0px var(--color-black); background: var(--color-white); padding: 32px; display: flex; flex-direction: column;'
      }, [
        createElement('div', { className: 'd-flex justify-between align-start mb-4' }, [
          createElement('div', {}, [
            createElement('h3', { className: 'text-2xl font-bold m-0 mb-2' }, 'Daily Bounty'),
            createElement('p', { className: 'text-gray m-0' }, 'Complete today to keep your streak.')
          ]),
          createElement('i', { className: 'ph-duotone ph-target', style: 'font-size: 40px; color: var(--color-danger);' })
        ]),
        
        createElement('div', { 
          className: 'mt-auto p-4', 
          style: 'border: 3px dashed var(--color-black); border-radius: 8px; background: var(--color-gray-100); display: flex; align-items: center; justify-content: space-between;' 
        }, [
          createElement('div', { className: 'd-flex align-center gap-3' }, [
            createElement('i', { className: 'ph-bold ph-circle', style: 'font-size: 24px; color: var(--color-gray-400);' }),
            createElement('span', { className: 'font-bold text-lg' }, 'Complete 1 Quest')
          ]),
          createElement('span', { 
            style: 'background: var(--color-black); color: var(--color-white); font-weight: 900; padding: 6px 12px; border-radius: 4px; border: 2px solid var(--color-black); box-shadow: 2px 2px 0px var(--theme-bg);' 
          }, '+20 XP')
        ])
      ])
    ]);

    // Add CSS for medium grid
    const style = createElement('style', {}, `
      @media(min-width: 768px) { .md-grid-cols-2 { grid-template-columns: repeat(2, 1fr); } }
      .xp-bar-animated {
        background-size: 20px 20px;
        background-image: linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.2) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.2) 75%,
          transparent 75%,
          transparent
        );
        animation: stripe-animation 1s linear infinite, fill-up-animation 1.5s ease-out forwards;
      }
      @keyframes stripe-animation {
        0% { background-position: 0 0; }
        100% { background-position: 40px 0; }
      }
      @keyframes fill-up-animation {
        0% { width: 0%; }
      }
    `);
    document.head.appendChild(style);

    return createElement('div', { className: 'animate-slide-up' }, [
      characterCard,
      dashboardGrid
    ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/home');
    return layout.render();
  }
}
