// js/views/JourneyView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { SkillTree } from '../components/SkillTree.js';
import { progressionEngine, PROGRESSION_STATES } from '../services/ProgressionEngine.js';

export class JourneyView {
  constructor() {
    this.skills = [];
    this.userProgress = {};
    this.isLoading = true;
  }

  fetchSkills() {
    const character = state.get('character');
    if (character && character.progress) {
      const journeyId = character.progress.currentJourney;
      const modules = progressionEngine.getModulesForJourney(journeyId);
      
      // We will map modules to "tiers" in the Skill Tree for this MVP.
      // E.g., Module HTML -> Tier 1 (Semantic HTML, Forms), Module CSS -> Tier 2
      this.skills = [];
      this.userProgress = {};

      modules.forEach(m => {
         const questsInModule = progressionEngine.getQuestsForModule(m.id);
         if (questsInModule.length > 0) {
            // Add all quests in this module as a single tier row
            const tier = questsInModule.map(q => {
               // Determine state
               const qState = progressionEngine.getQuestState(q.id);
               
               // For SkillTree format: 
               // If completed, we pass `completed: true`. 
               // For in progress/available we can pass `completed: false` 
               // SkillTree handles locked/unlocked via tier-level checks, but we'll manually feed it progress.
               
               this.userProgress[q.id] = { completed: qState === PROGRESSION_STATES.COMPLETED };
               
               return {
                  id: q.id,
                  title: q.title,
                  icon: 'ph-file-code' // Default icon for all MVP quests
               };
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

     const header = createElement('div', { className: 'd-flex flex-column align-center text-center mb-8' }, [
        createElement('div', { className: 'd-flex justify-center mb-4' }, [
           createElement('div', { className: 'd-flex align-center justify-center text-4xl', style: 'width: 80px; height: 80px; background: var(--color-white); border: 4px solid var(--color-black); border-radius: 50%; box-shadow: 4px 4px 0px var(--color-black);' }, '🌐')
        ]),
        createElement('h1', { className: 'm-0 text-2xl font-black text-uppercase tracking-wide' }, 'Continue Your Journey')
     ]);

     // Vertical Roadmap Tree
     const treeContainer = createElement('div', { className: 'relative w-100 d-flex flex-column align-center pb-8' }, [
        // Central thick vertical line
        createElement('div', { 
           className: 'absolute top-0', 
           style: 'width: 6px; height: 100%; background: var(--color-black); z-index: 0; left: 50%; transform: translateX(-50%);' 
        })
     ]);

     modules.forEach((mod, index) => {
        let bgColor = 'var(--color-gray-100)';
        let textColor = 'var(--color-black)';
        let iconHtml = '';
        let statusBadgeHtml = '';
        let isClickable = false;
        let shadowStyle = '4px 4px 0px var(--color-black)';

        if (mod.status === 'AVAILABLE' || mod.status === 'IN_PROGRESS') {
           bgColor = 'var(--theme-accent)';
           iconHtml = createElement('i', { className: 'ph-fill ph-play text-xl' });
           statusBadgeHtml = createElement('span', { className: 'text-xs font-bold px-2 py-1 bg-black text-white mt-2', style: 'border-radius: 12px;' }, 'CURRENT');
           isClickable = true;
           shadowStyle = '6px 6px 0px var(--color-black)';
        } else if (mod.status === 'COMPLETED') {
           bgColor = 'var(--color-success)';
           textColor = 'var(--color-white)';
           iconHtml = createElement('i', { className: 'ph-bold ph-check text-xl' });
           isClickable = true;
        } else if (mod.status === 'LOCKED') {
           bgColor = 'var(--color-gray-200)';
           textColor = 'var(--color-gray-500)';
           iconHtml = createElement('i', { className: 'ph-bold ph-lock-key text-xl' });
           statusBadgeHtml = createElement('span', { className: 'text-xs font-bold px-2 py-1 bg-white text-gray mt-2', style: 'border: 2px solid var(--color-gray-300); border-radius: 12px;' }, 'LOCKED');
        } else if (mod.status === 'COMING_SOON') {
           bgColor = 'var(--color-gray-200)';
           textColor = 'var(--color-gray-500)';
           iconHtml = createElement('i', { className: 'ph-duotone ph-cone text-xl' });
           statusBadgeHtml = createElement('span', { className: 'text-xs font-bold px-2 py-1 bg-warning text-black mt-2', style: 'border: 2px solid var(--color-black); border-radius: 12px;' }, 'COMING SOON');
           shadowStyle = '2px 2px 0px var(--color-gray-400)';
        }

        const nodeCircle = createElement('div', {
           className: `d-flex align-center justify-center z-10 ${isClickable ? 'card-interactive cursor-pointer' : ''}`,
           style: `width: 72px; height: 72px; border-radius: 50%; background: ${bgColor}; color: ${textColor}; border: 4px solid var(--color-black); box-shadow: ${shadowStyle}; transition: all 0.2s;`,
           onclick: () => { if (isClickable) this.openModule(mod.id); },
           onmouseenter: (e) => { if (isClickable) { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '8px 8px 0px var(--color-black)'; } },
           onmouseleave: (e) => { if (isClickable) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = shadowStyle; } }
        }, [iconHtml]);

        const nodeMetadata = createElement('div', { className: 'd-flex flex-column align-center mt-3 mb-8 text-center z-10 bg-white p-2', style: 'border-radius: 8px; max-width: 200px;' }, [
           createElement('h3', { className: 'm-0 text-xl font-black mb-1', style: `color: ${mod.status === 'COMING_SOON' ? 'var(--color-gray-500)' : 'var(--color-black)'}` }, mod.title),
           createElement('p', { className: 'm-0 text-sm font-bold text-gray mb-1' }, mod.description),
           mod.status !== 'COMING_SOON' ? createElement('p', { className: 'm-0 text-xs font-bold' }, `${mod.stats.total} Quests • ${mod.estimatedTime || 'TBD'}`) : '',
           statusBadgeHtml
        ]);

        treeContainer.appendChild(createElement('div', { className: 'd-flex flex-column align-center animate-fade-up', style: `animation-delay: ${index * 100}ms;` }, [
           nodeCircle,
           nodeMetadata
        ]));
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

     const backBtn = createElement('button', {
        className: 'd-flex align-center gap-2 mb-6 px-4 py-2 bg-white font-bold text-sm card-interactive',
        style: 'border: 2px solid var(--color-black); box-shadow: 2px 2px 0px var(--color-black); border-radius: 20px; cursor: pointer; align-self: flex-start;',
        onclick: () => this.closeModule()
     }, [
        createElement('i', { className: 'ph-bold ph-arrow-left text-lg' }),
        'Journey Overview'
     ]);

     const header = createElement('div', { className: 'd-flex flex-column align-center text-center mb-8' }, [
        createElement('h1', { className: 'm-0 text-3xl font-black mb-2 text-uppercase' }, `${module.title} Roadmap`),
        createElement('p', { className: 'm-0 text-md font-bold text-gray' }, module.description)
     ]);

     // Vertical Roadmap Tree for Quests
     const treeContainer = createElement('div', { className: 'relative w-100 d-flex flex-column align-center pb-8' }, [
        createElement('div', { 
           className: 'absolute top-0', 
           style: 'width: 4px; height: 100%; background: var(--color-black); z-index: 0; left: 50%; transform: translateX(-50%);' 
        })
     ]);

     quests.forEach((quest, index) => {
        let bgColor, textColor, iconHtml, shadowStyle;
        
        if (quest.state === 'COMPLETED') {
           bgColor = 'var(--color-success)';
           textColor = 'var(--color-white)';
           iconHtml = createElement('i', { className: 'ph-bold ph-check text-xl' });
           shadowStyle = '2px 2px 0px var(--color-black)';
        } else if (quest.state === 'AVAILABLE' || quest.state === 'IN_PROGRESS' || quest.state === 'SUBMITTED') {
           bgColor = 'var(--theme-accent)';
           textColor = 'var(--color-black)';
           iconHtml = createElement('i', { className: 'ph-fill ph-play text-xl' });
           shadowStyle = '6px 6px 0px var(--color-black)';
        } else {
           bgColor = 'var(--color-gray-100)';
           textColor = 'var(--color-gray-400)';
           iconHtml = createElement('i', { className: 'ph-bold ph-lock-key text-xl' });
           shadowStyle = '0px 0px 0px transparent'; // Flat
        }

        const isClickable = (quest.state === 'AVAILABLE' || quest.state === 'IN_PROGRESS' || quest.state === 'COMPLETED' || quest.state === 'SUBMITTED');

        const questNode = createElement('div', {
           className: 'd-flex align-center gap-4 z-10 p-3 mb-6 bg-white animate-fade-up',
           style: `border: 3px solid var(--color-black); box-shadow: ${shadowStyle}; border-radius: 12px; width: 300px; animation-delay: ${index * 80}ms; ${isClickable ? 'cursor: pointer; transition: transform 0.2s;' : 'opacity: 0.8;'}`,
           onmouseenter: (e) => { if (isClickable) e.currentTarget.style.transform = 'translateY(-2px)'; },
           onmouseleave: (e) => { if (isClickable) e.currentTarget.style.transform = 'translateY(0)'; },
           onclick: () => {
              if (isClickable) {
                 if (quest.state === 'AVAILABLE') {
                    progressionEngine.dispatch('START_QUEST', { questId: quest.id });
                 }
                 // Usually we'd navigate to Quest View here:
                 // router.navigate('/quest');
              }
           }
        }, [
           createElement('div', { 
              className: 'd-flex align-center justify-center', 
              style: `width: 48px; height: 48px; border-radius: 50%; background: ${bgColor}; color: ${textColor}; border: 2px solid var(--color-black); flex-shrink: 0;` 
           }, [iconHtml]),
           createElement('div', { className: 'd-flex flex-column' }, [
              createElement('h3', { className: 'm-0 text-md font-bold', style: quest.state === 'COMPLETED' ? 'text-decoration: line-through; color: var(--color-gray-500);' : '' }, quest.title),
              createElement('span', { className: 'text-xs font-bold text-gray' }, quest.difficulty || 'Beginner')
           ])
        ]);

        treeContainer.appendChild(questNode);
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
    this.fetchSkills();

    const character = state.get('character');
    const journey = progressionEngine.getJourney(character?.progress?.currentJourney || 'frontend');

    return createElement('div', { className: 'animate-fade-in' }, [
      createElement('div', { className: 'mb-6 d-flex align-center gap-3' }, [
        createElement('span', { className: 'text-4xl' }, journey.icon),
        createElement('div', {}, [
           createElement('h1', { className: 'text-3xl m-0' }, `${journey.title} Skill Tree`),
           createElement('p', { className: 'text-gray m-0' }, 'Master each quest to unlock the next tier.')
        ])
      ]),
      createElement('div', { id: 'journey-content' }, this.renderTree())
    ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/journey');
    return layout.render();
  }
}
