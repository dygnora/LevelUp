// js/views/JourneyView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { progressionEngine } from '../services/ProgressionEngine.js';
import { router } from '../router.js';

export class JourneyView {
  constructor() {
     this.activeModuleId = null;
  }

  reRender() {
     const container = document.getElementById('journey-content-container');
     if (container) {
        container.innerHTML = '';
        container.appendChild(this.renderContentBody());
     }
  }

  openModule(moduleId) {
     this.activeModuleId = moduleId;
     this.reRender();
  }

  closeModule() {
     this.activeModuleId = null;
     this.reRender();
  }

  // --- Render EMPTY STATE ---
  renderEmptyState() {
     return createElement('div', { className: 'd-flex flex-column align-center justify-center p-6 text-center animate-fade-in', style: 'height: 60vh;' }, [
        createElement('i', { className: 'ph-duotone ph-map-trifold text-gray mb-4', style: 'font-size: 64px;' }),
        createElement('h2', { className: 'm-0 text-2xl font-black text-black mb-2' }, 'No journey selected.'),
        createElement('p', { className: 'm-0 text-md font-bold text-gray mb-6' }, 'Choose your first learning path to begin your adventure.'),
        createElement('button', { 
           className: 'font-black text-sm d-flex align-center gap-2 px-6 py-3',
           style: 'background: var(--theme-accent); color: var(--color-black); border: 2px solid var(--color-black); box-shadow: 4px 4px 0px var(--color-black); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s; border-radius: 8px;',
           onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px var(--color-black)'; },
           onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-black)'; }
        }, 'Choose Journey')
     ]);
  }

  // --- Render LEVEL 1: Journey Overview ---
  renderJourneyOverview(character) {
     const journeyId = character.progress.currentJourney;
     const modules = progressionEngine.getJourneyModulesContext(journeyId);

     const header = createElement('div', { className: 'd-flex flex-column align-center text-center mb-10' }, [
        createElement('div', { className: 'd-flex justify-center mb-4' }, [
           createElement('div', { className: 'd-flex align-center justify-center text-4xl', style: 'width: 80px; height: 80px; background: var(--color-white); border: 4px solid var(--color-black); border-radius: 50%; box-shadow: 4px 4px 0px var(--color-black);' }, '🌐')
        ]),
        createElement('h1', { className: 'm-0 text-3xl font-black text-uppercase tracking-wide' }, 'Continue Your Journey')
     ]);

     // Vertical Roadmap Tree Container
     const treeContainer = createElement('div', { 
        className: 'd-flex flex-column align-center', 
        style: 'width: 100%; max-width: 600px; padding: 16px 0;' 
     });

     modules.forEach((mod, index) => {
        let bannerColor, bannerTextColor, iconHtml, statusText, shadowStyle, isClickable;

        if (mod.status === 'AVAILABLE' || mod.status === 'IN_PROGRESS') {
           bannerColor = 'var(--theme-accent)';
           bannerTextColor = 'var(--color-black)';
           iconHtml = createElement('i', { className: 'ph-fill ph-play text-xl' });
           statusText = 'CURRENT';
           isClickable = true;
           shadowStyle = '6px 6px 0px var(--color-black)';
        } else if (mod.status === 'COMPLETED') {
           bannerColor = 'var(--color-success)';
           bannerTextColor = 'var(--color-white)';
           iconHtml = createElement('i', { className: 'ph-bold ph-check text-xl' });
           statusText = 'COMPLETED';
           isClickable = true;
           shadowStyle = '4px 4px 0px var(--color-black)';
        } else if (mod.status === 'LOCKED') {
           bannerColor = 'var(--color-gray-200)';
           bannerTextColor = 'var(--color-gray-500)';
           iconHtml = createElement('i', { className: 'ph-bold ph-lock-key text-xl' });
           statusText = 'LOCKED';
           isClickable = false;
           shadowStyle = '4px 4px 0px var(--color-black)';
        } else if (mod.status === 'COMING_SOON') {
           bannerColor = 'var(--color-black)';
           bannerTextColor = 'var(--color-white)';
           iconHtml = createElement('i', { className: 'ph-duotone ph-cone text-xl' });
           statusText = 'COMING SOON';
           isClickable = false;
           shadowStyle = '4px 4px 0px var(--color-gray-500)';
        }

        const isComingSoon = mod.status === 'COMING_SOON';
        const bodyBg = isComingSoon ? 'var(--color-gray-100)' : 'var(--color-white)';

        const nodeCard = createElement('div', {
           className: `d-flex flex-column text-left ${isClickable ? 'card-interactive cursor-pointer' : ''}`,
           style: `width: 320px; border-radius: 12px; background: ${bodyBg}; border: 4px solid var(--color-black); box-shadow: ${shadowStyle}; transition: transform 0.2s, box-shadow 0.2s; position: relative; z-index: 10; overflow: hidden; ${isComingSoon ? 'opacity: 0.8;' : ''}`,
           onclick: () => { if (isClickable) this.openModule(mod.id); },
           onmouseenter: (e) => { if (isClickable) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '8px 8px 0px var(--color-black)'; } },
           onmouseleave: (e) => { if (isClickable) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = shadowStyle; } }
        }, [
           // Header Banner
           createElement('div', {
              className: 'd-flex align-center justify-between',
              style: `background: ${bannerColor}; color: ${bannerTextColor}; padding: 12px 16px; border-bottom: 4px solid var(--color-black);`
           }, [
              createElement('span', { className: 'text-xs font-black text-uppercase', style: 'letter-spacing: 1px;' }, statusText),
              iconHtml
           ]),
           // Body
           createElement('div', {
              className: 'd-flex flex-column',
              style: 'padding: 20px 16px;'
           }, [
              createElement('h3', { className: 'm-0 text-3xl font-black text-uppercase tracking-wide mb-1', style: `color: ${isComingSoon ? 'var(--color-gray-500)' : 'var(--color-black)'}; line-height: 1.1;` }, mod.title),
              createElement('p', { className: 'm-0 text-sm font-bold text-gray mb-4' }, mod.description),
              !isComingSoon ? createElement('div', { className: 'd-flex align-center gap-2 mt-auto' }, [
                 createElement('span', { className: 'text-xs font-bold text-black bg-white', style: 'padding: 4px 8px; border: 2px solid var(--color-black); border-radius: 6px;' }, `${mod.stats.total} Quests`),
                 createElement('span', { className: 'text-xs font-bold text-black bg-white', style: 'padding: 4px 8px; border: 2px solid var(--color-black); border-radius: 6px;' }, mod.estimatedTime || 'TBD')
              ]) : ''
           ])
        ]);

        // Connecting line to next node
        const hasNext = index < modules.length - 1;
        const line = hasNext ? createElement('div', {
           style: 'position: absolute; width: 6px; background: var(--color-black); top: 100%; height: 48px; left: calc(50% - 3px); z-index: 0;'
        }) : '';

        // Node Row
        const row = createElement('div', {
           className: 'd-flex justify-center w-100 animate-fade-up',
           style: `margin-bottom: 48px; animation-delay: ${index * 100}ms; position: relative; z-index: 10;`
        }, [
           line,
           nodeCard
        ]);

        treeContainer.appendChild(row);
     });

     return createElement('div', { className: 'animate-fade-in d-flex flex-column align-center w-100' }, [
        header,
        treeContainer
     ]);
  }

  // --- Render LEVEL 2: Module Roadmap ---
  renderModuleRoadmap(character) {
     const module = progressionEngine.getModule(this.activeModuleId);
     const quests = progressionEngine.getQuestsForModule(module.id).map(q => ({
        ...q,
        state: progressionEngine.getQuestState(q.id)
     }));

     const backBtn = createElement('div', { style: 'width: 100%; max-width: 600px;' }, [
         createElement('button', {
            className: 'btn bg-transparent p-0 mb-6 font-bold text-gray d-flex align-center gap-2',
            style: 'border: none; cursor: pointer;',
            onclick: () => this.closeModule()
         }, [
            createElement('i', { className: 'ph-bold ph-arrow-left' }),
            'Back to Journey Overview'
         ])
     ]);

     const header = createElement('div', { className: 'd-flex flex-column align-center text-center mb-10' }, [
        createElement('h1', { className: 'm-0 text-3xl font-black mb-2 text-uppercase' }, `${module.title} Roadmap`),
        createElement('p', { className: 'm-0 text-md font-bold text-gray' }, module.description)
     ]);

     // Vertical Roadmap Tree for Quests
     const treeContainer = createElement('div', { 
        className: 'd-flex flex-column align-center', 
        style: 'width: 100%; max-width: 600px; padding: 16px 0;' 
     });

     quests.forEach((quest, index) => {
        let sideColor, sideTextColor, iconHtml, shadowStyle, isClickable;
        
        if (quest.state === 'COMPLETED') {
           sideColor = 'var(--color-success)';
           sideTextColor = 'var(--color-white)';
           iconHtml = createElement('i', { className: 'ph-bold ph-check text-2xl' });
           shadowStyle = '3px 3px 0px var(--color-black)';
           isClickable = true;
        } else if (quest.state === 'AVAILABLE' || quest.state === 'IN_PROGRESS' || quest.state === 'SUBMITTED') {
           sideColor = 'var(--theme-accent)';
           sideTextColor = 'var(--color-black)';
           iconHtml = createElement('i', { className: 'ph-fill ph-play text-2xl' });
           shadowStyle = '5px 5px 0px var(--color-black)';
           isClickable = true;
        } else {
           sideColor = 'var(--color-gray-200)';
           sideTextColor = 'var(--color-gray-500)';
           iconHtml = createElement('i', { className: 'ph-bold ph-lock-key text-2xl' });
           shadowStyle = '3px 3px 0px var(--color-gray-400)';
           isClickable = false;
        }

        const questCard = createElement('div', {
           className: `d-flex text-left bg-white ${isClickable ? 'card-interactive cursor-pointer' : ''}`,
           style: `width: 320px; border-radius: 12px; border: 3px solid var(--color-black); box-shadow: ${shadowStyle}; transition: transform 0.2s, box-shadow 0.2s; position: relative; z-index: 10; overflow: hidden;`,
           onclick: () => {
              if (isClickable) {
                  if (quest.state === 'AVAILABLE') {
                     const result = progressionEngine.dispatch('START_QUEST', { questId: quest.id });
                     if (result.unlockedAchievements && result.unlockedAchievements.length > 0) {
                        import('../components/AchievementToast.js').then(module => module.achievementToast.show(result.unlockedAchievements));
                     }
                  }
                 router.navigate('/quest');
              }
           },
           onmouseenter: (e) => { if (isClickable) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-black)'; } },
           onmouseleave: (e) => { if (isClickable) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = shadowStyle; } }
        }, [
           // Left Side Banner/Icon
           createElement('div', {
              className: 'd-flex align-center justify-center',
              style: `width: 64px; background: ${sideColor}; color: ${sideTextColor}; border-right: 3px solid var(--color-black); flex-shrink: 0;`
           }, [iconHtml]),
           // Right Side Content
           createElement('div', {
              className: 'd-flex flex-column justify-center',
              style: 'padding: 16px; flex: 1;'
           }, [
              createElement('h3', { className: 'm-0 text-xl font-black mb-1', style: quest.state === 'COMPLETED' ? 'text-decoration: line-through; color: var(--color-gray-500);' : 'color: var(--color-black);' }, quest.title),
              createElement('span', { className: 'text-xs font-bold text-gray text-uppercase', style: 'letter-spacing: 0.5px;' }, quest.difficulty || 'Beginner')
           ])
        ]);

        // Connecting line to next node
        const hasNext = index < quests.length - 1;
        const line = hasNext ? createElement('div', {
           style: 'position: absolute; width: 4px; background: var(--color-black); top: 100%; height: 32px; left: calc(50% - 2px); z-index: 0;'
        }) : '';

        const questRow = createElement('div', {
           className: `d-flex justify-center w-100 animate-fade-up`,
           style: `margin-bottom: 32px; animation-delay: ${index * 80}ms; ${!isClickable ? 'opacity: 0.8;' : ''} position: relative; z-index: 10;`
        }, [
           line,
           questCard
        ]);

        treeContainer.appendChild(questRow);
     });

     return createElement('div', { className: 'animate-fade-in d-flex flex-column align-center w-100' }, [
        backBtn,
        header,
        treeContainer
     ]);
  }

  // --- Main Render Logic ---
  renderContentBody() {
     const character = state.get('character');
     if (!character || !character.progress || !character.progress.currentJourney) {
        return this.renderEmptyState();
     }
     
     if (this.activeModuleId) {
        return this.renderModuleRoadmap(character);
     } else {
        return this.renderJourneyOverview(character);
     }
  }

  renderContent() {
     return createElement('div', { id: 'journey-content-container', style: 'max-width: 800px; margin: 0 auto; width: 100%; padding-top: 32px; padding-bottom: 64px;' }, [
        this.renderContentBody()
     ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/journey');
    return layout.render();
  }

  destroy() {
     // Local state cleanup if necessary
  }
}
