// js/views/ChooseJourneyView.js
import { createElement } from '../utils/dom.js';
import { dbService } from '../services/dbService.js';
import { state } from '../state.js';
import { router } from '../router.js';

export class ChooseJourneyView {
  constructor() {
    this.handleSelect = this.handleSelect.bind(this);
    this.paths = [];
  }

  async fetchPaths() {
    try {
      this.paths = await dbService.getLearningPaths();
      this.renderPaths();
    } catch (error) {
      console.error('Error fetching paths:', error);
      const container = document.getElementById('paths-container');
      if (container) {
        container.innerHTML = `<div class="card border-danger text-center"><p class="text-danger font-bold m-0">Failed to load learning paths.</p><p class="text-sm mt-2">${error.message}</p><p class="text-xs mt-4 text-gray">Make sure your Firestore security rules allow reads, and you have created the required Composite Index if prompted.</p></div>`;
      }
    }
  }

  async handleSelect(pathId) {
    const user = state.get('user');
    if (!user) return;

    try {
      const characterData = {
        displayName: user.displayName,
        photoURL: user.photoURL || '',
        primaryJourney: pathId,
        totalSkillsCompleted: 0,
        totalQuestsCompleted: 0,
        currentStreak: 0
      };

      await dbService.createCharacter(user.uid, characterData);
      
      // Update local state
      state.set('character', { ...characterData, id: user.uid });
      
      // Redirect to home
      router.navigate('#/home');
    } catch (error) {
      console.error('Error creating character:', error);
      alert('Failed to start journey. Please try again.');
    }
  }

  renderPaths() {
    const container = document.getElementById('paths-container');
    if (!container) return;

    container.innerHTML = '';
    
    if (this.paths.length === 0) {
      container.innerHTML = `<div class="card text-center" style="grid-column: 1 / -1;"><h3 class="m-0 text-danger">No Paths Found</h3><p class="text-gray mt-2">The 'learning_paths' collection is empty. Did you forget to add the seed data to Firestore?</p></div>`;
      return;
    }
    
    this.paths.forEach((path, index) => {
      const card = createElement('div', { 
        className: `card card-interactive animate-slide-up delay-${(index + 1) * 100}`,
        onclick: () => this.handleSelect(path.id),
        style: `border-top: 6px solid ${path.color || 'var(--color-primary)'}`
      }, [
        createElement('div', { className: 'd-flex align-center gap-2 mb-4' }, [
          createElement('i', { className: `ph-fill ph-${path.icon} text-3xl`, style: `color: ${path.color}` }),
          createElement('h3', { className: 'm-0' }, path.title)
        ]),
        createElement('p', { className: 'text-gray text-sm' }, path.description),
        createElement('div', { className: 'd-flex justify-between mt-4' }, [
          createElement('span', { className: 'badge' }, path.difficulty),
          createElement('span', { className: 'text-xs font-bold text-gray' }, path.estimatedDuration)
        ])
      ]);
      
      container.appendChild(card);
    });
  }

  render() {
    const container = createElement('div', { className: 'centered-layout flex-column align-center' }, [
      createElement('div', { className: 'text-center mb-6 animate-fade-in' }, [
        createElement('h1', { className: 'text-3xl text-white' }, 'Choose Your Path'),
        createElement('p', { className: 'text-white' }, 'Select your primary learning journey to begin.')
      ]),
      createElement('div', { id: 'paths-container', className: 'grid grid-cols-1 md-grid-cols-3' }, [
        // Loading state
        createElement('p', { className: 'text-white font-bold' }, 'Loading paths...')
      ])
    ]);

    // Use a small trick to add responsive grid class
    const style = createElement('style', {}, `
      @media(min-width: 768px) { .md-grid-cols-3 { grid-template-columns: repeat(3, 1fr); max-width: 1000px; width: 100%; } }
    `);
    document.head.appendChild(style);

    this.fetchPaths();
    return container;
  }
}
