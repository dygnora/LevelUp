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
            });
            this.skills.push(tier);
         }
      });
      
      this.isLoading = false;
    }
  }

  reRender() {
    const container = document.getElementById('journey-content');
    if (container) {
      container.innerHTML = '';
      container.appendChild(this.renderTree());
    }
  }

  renderTree() {
    if (this.isLoading) {
      return createElement('div', { className: 'text-center p-6 font-bold text-gray' }, 'Loading your skill tree...');
    }
    
    // SkillTree expects tiers array: [[quest1, quest2], [quest3]]
    const tree = new SkillTree(this.skills, this.userProgress);
    return tree.render();
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
