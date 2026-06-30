// js/views/JourneyView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { dbService } from '../services/dbService.js';
import { AppLayout } from '../components/AppLayout.js';
import { SkillTree } from '../components/SkillTree.js';

export class JourneyView {
  constructor() {
    this.skills = [];
    this.isLoading = true;
  }

  async fetchSkills() {
    const character = state.get('character');
    if (character && character.primaryJourney) {
      try {
        this.skills = await dbService.getSkillsByPath(character.primaryJourney);
        // We'll mock userProgress for now until we have progressionService fully hooked up
        this.userProgress = {}; 
        this.isLoading = false;
        this.reRender();
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
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
    
    const tree = new SkillTree(this.skills, this.userProgress);
    return tree.render();
  }

  renderContent() {
    this.fetchSkills();

    return createElement('div', { className: 'animate-fade-in' }, [
      createElement('div', { className: 'mb-6' }, [
        createElement('h1', { className: 'text-3xl m-0' }, 'Your Journey'),
        createElement('p', { className: 'text-gray' }, 'Master each skill to progress further.')
      ]),
      createElement('div', { id: 'journey-content' }, this.renderTree())
    ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '#/journey');
    return layout.render();
  }
}
