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
      // Mocking the Frontend Roadmap from PDF as a nested array representing tiers
      this.skills = [
        [{ id: 'html', title: 'HTML', icon: 'ph-file-html' }],
        [{ id: 'css', title: 'CSS', icon: 'ph-file-css' }],
        [{ id: 'js', title: 'JavaScript', icon: 'ph-file-code' }],
        [
          { id: 'git', title: 'Git', icon: 'ph-git-branch' },
          { id: 'github', title: 'GitHub', icon: 'ph-github-logo' }
        ],
        [{ id: 'npm', title: 'npm', icon: 'ph-package' }],
        [{ id: 'react', title: 'React', icon: 'ph-atom' }],
        [{ id: 'tailwind', title: 'Tailwind', icon: 'ph-paint-brush-broad' }],
        [{ id: 'vitest', title: 'Vitest', icon: 'ph-test-tube' }]
      ];
      
      this.userProgress = {
        'html': { completed: true },
        'css': { completed: true },
        'js': { completed: false } // In Progress
      };
      
      this.isLoading = false;
      this.reRender();
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
    const layout = new AppLayout(this.renderContent(), '/journey');
    return layout.render();
  }
}
