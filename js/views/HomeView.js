// js/views/HomeView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { router } from '../router.js';
import { progressionEngine, PROGRESSION_STATES } from '../services/ProgressionEngine.js';

export class HomeView {
  
  handleAction(actionType, payload) {
    if (actionType === 'START_QUEST' || actionType === 'CONTINUE_QUEST') {
       if (actionType === 'START_QUEST') {
          progressionEngine.dispatch('START_QUEST', payload);
       }
       router.navigate('/quest'); // Navigate to Quest detail view
    } else if (actionType === 'TAKE_QUIZ') {
       router.navigate('/quest'); // Quest view will show the quiz
    } else if (actionType === 'OPEN_NEXT') {
       // Acknowledge completion, refresh the page to show the next available quest
       // In a real app this might clear a local "just completed" flag.
       // For MVP, we just re-render to fetch the new current context
       this.reRender();
    }
  }

  reRender() {
    const root = document.getElementById('app');
    if (root) {
      root.innerHTML = '';
      root.appendChild(this.render());
    }
  }

  renderContent() {
    const character = state.get('character');
    
    if (!character) {
       return createElement('div', {}, 'Loading character data...');
    }

    const context = progressionEngine.getCurrentContext();
    if (!context) {
       return createElement('div', {}, 'Loading progression context...');
    }

    const { journey, module, quest, state: questState, nextUnlock, xp } = context;

    // 1. Natural Greeting
    const firstName = (character.displayName || 'Friend').split(' ')[0];
    const greeting = createElement('div', { className: 'mb-4 animate-fade-in' }, [
      createElement('p', { className: 'm-0 text-gray font-bold text-lg' }, `Good Morning, ${firstName}.`)
    ]);

    // 2. Current Journey Identity
    const journeyIdentity = createElement('div', { className: 'd-flex align-center gap-2 mb-8 animate-fade-in delay-100' }, [
      createElement('span', { className: 'text-3xl' }, journey.icon),
      createElement('div', {}, [
        createElement('div', { className: 'font-black text-xl' }, `${journey.title} Journey`),
        createElement('div', { className: 'text-gray text-sm font-bold' }, journey.description)
      ])
    ]);

    // 3. Dynamic Hero (The Mission)
    let heroTitle = 'Today\'s Mission';
    let missionTitle = quest ? quest.title : 'Journey Complete!';
    let ctaLabel = 'Start Mission';
    let actionType = 'START_QUEST';
    let ctaClass = 'btn w-100 p-4';
    let ctaStyle = 'background-color: var(--color-black); color: var(--color-white); font-size: 18px; font-weight: 900; border: none; box-shadow: 0 6px 0px rgba(0,0,0,0.8); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;';
    
    // Dynamic FSM Logic
    if (questState === PROGRESSION_STATES.IN_PROGRESS) {
      ctaLabel = 'Continue Mission';
      actionType = 'CONTINUE_QUEST';
    } else if (questState === PROGRESSION_STATES.SUBMITTED) {
      heroTitle = 'Pending Review';
      ctaLabel = 'Take Quiz';
      actionType = 'TAKE_QUIZ';
      ctaStyle = 'background-color: var(--theme-bg); color: var(--color-black); font-size: 18px; font-weight: 900; border: 3px solid var(--color-black); box-shadow: 4px 6px 0px rgba(0,0,0,1); cursor: pointer;';
    } else if (questState === PROGRESSION_STATES.COMPLETED) {
      heroTitle = 'Mission Complete!';
      ctaLabel = 'Open Next Module';
      actionType = 'OPEN_NEXT';
    } else if (!quest) {
      heroTitle = 'Congratulations!';
      missionTitle = `You have completed the ${journey.title} Journey.`;
      ctaLabel = 'Explore New Journeys';
      actionType = 'CHOOSE_JOURNEY';
    }

    const heroQuest = createElement('div', { 
      className: 'card animate-slide-up delay-200 mb-6', 
      style: 'border: 4px solid var(--color-black); box-shadow: 12px 12px 0px var(--color-black); background: var(--color-white); padding: 0; overflow: hidden; display: flex; flex-direction: column; min-height: 250px;'
    }, [
      // Header
      createElement('div', { style: 'background: var(--color-white); padding: 40px; border-bottom: 4px solid var(--color-black); flex-grow: 1; display: flex; flex-direction: column; justify-content: center;' }, [
        createElement('span', { className: 'font-bold text-sm bg-black text-white px-3 py-1 mb-4 d-inline-block', style: 'border-radius: 20px; white-space: nowrap; width: fit-content;' }, heroTitle.toUpperCase()),
        createElement('h1', { className: 'm-0 text-5xl font-black mb-2', style: 'color: var(--color-black); text-shadow: 3px 3px 0px var(--theme-bg); line-height: 1.1;' }, missionTitle)
      ]),
      // CTA
      createElement('button', {
        className: ctaClass,
        style: ctaStyle,
        onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = '0 0px 0px rgba(0,0,0,0.8)'; },
        onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0px rgba(0,0,0,0.8)'; },
        onclick: () => this.handleAction(actionType, { questId: quest ? quest.id : null })
      }, [
        ctaLabel,
        createElement('i', { className: 'ph-bold ph-arrow-right ml-2' })
      ])
    ]);

    // 4. Next Unlock (Conditional)
    let nextUnlockEl = null;
    if (nextUnlock && quest) {
       nextUnlockEl = createElement('div', { 
         className: 'card p-4 d-flex align-center gap-3 animate-slide-up delay-300 mb-8', 
         style: 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); background: var(--theme-bg); margin-top: -12px; width: 92%; margin-left: auto; margin-right: auto; position: relative; z-index: 10;' 
       }, [
         createElement('div', { className: 'bg-white p-2 d-flex align-center justify-center', style: 'border: 2px solid var(--color-black); border-radius: 50%;' }, [
           createElement('i', { className: 'ph-duotone ph-lock-key-open text-xl text-black' })
         ]),
         createElement('div', { className: 'd-flex align-center flex-wrap gap-2 text-white' }, [
           createElement('span', { className: 'font-black' }, 'NEXT UNLOCK:'),
           createElement('span', { className: 'font-bold' }, `Complete this mission to unlock`),
           createElement('span', { className: 'font-black bg-white text-black px-2 py-1 d-inline-block', style: 'border: 2px solid var(--color-black); border-radius: 6px; box-shadow: 2px 2px 0px var(--color-black);' }, nextUnlock)
         ])
       ]);
    } else {
       nextUnlockEl = createElement('div', { className: 'mb-8' }, []);
    }

    // 5. Journey Snapshot (Progress Bar)
    // Calculate simple progress based on completed quests vs total quests in journey
    const modules = progressionEngine.getModulesForJourney(journey.id);
    let totalQuests = 0;
    let completedCount = 0;
    
    modules.forEach(m => {
      const quests = progressionEngine.getQuestsForModule(m.id);
      totalQuests += quests.length;
      quests.forEach(q => {
        if (character.progress.completedQuests && character.progress.completedQuests[q.id]) {
          completedCount++;
        }
      });
    });

    const progressPercentage = totalQuests > 0 ? Math.round((completedCount / totalQuests) * 100) : 0;

    const snapshot = createElement('div', { className: 'card animate-slide-up delay-400 mb-6', style: 'border: 3px solid var(--color-black); background: var(--color-white); padding: 24px; display: flex; justify-content: space-between; align-items: center;' }, [
      createElement('div', { style: 'flex-grow: 1; padding-right: 24px;' }, [
        createElement('h3', { className: 'text-xl font-black mb-2 m-0' }, 'Journey Progress'),
        createElement('div', { className: 'd-flex align-center gap-3 mt-3' }, [
          createElement('div', { style: 'flex-grow: 1; height: 12px; background: var(--color-gray-200); border: 2px solid var(--color-black); border-radius: 6px; overflow: hidden;' }, [
            createElement('div', { style: `height: 100%; width: ${progressPercentage}%; background: var(--theme-bg); border-right: 2px solid var(--color-black);` })
          ]),
          createElement('span', { className: 'font-black' }, `${progressPercentage}%`)
        ])
      ]),
      createElement('button', { 
        className: 'btn', 
        style: 'border: 2px solid var(--color-black); background: var(--color-gray-100); color: var(--color-black); font-weight: bold; padding: 12px 24px;', 
        onclick: () => router.navigate('/journey') 
      }, 'Open Journey')
    ]);

    // CSS Utilities
    const style = createElement('style', {}, `
      .bg-white { background-color: var(--color-white); }
      .bg-black { background-color: var(--color-black); }
      .text-white { color: var(--color-white); }
      .ml-2 { margin-left: 8px; }
      .max-w-700 { max-width: 700px; margin: 0 auto; }
    `);
    document.head.appendChild(style);

    return createElement('div', { className: 'animate-fade-in max-w-700 mt-6' }, [
      greeting,
      journeyIdentity,
      heroQuest,
      nextUnlockEl,
      snapshot
    ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/home');
    return layout.render();
  }
}

