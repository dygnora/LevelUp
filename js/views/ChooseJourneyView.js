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
        currentStreak: 0,
        progress: {
          currentJourney: pathId,
          currentModule: 'html', // Assuming pathId is frontend for MVP
          currentQuest: null,
          completedQuests: {},
          completedModules: [],
          xp: 0,
          level: 1,
          activeSubmission: null
        }
      };

      await dbService.createCharacter(user.uid, characterData);
      
      // Update local state
      state.set('character', { ...characterData, id: user.uid });
      
      // Redirect to home
      router.navigate('/home');
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
      const validIcon = path.icon === 'server' ? 'hard-drives' : path.icon === 'layers' ? 'stack' : path.icon === 'monitor' ? 'desktop' : path.icon;
      
      const card = createElement('div', { 
        className: `card journey-card animate-slide-up delay-${(index + 1) * 100}`,
        style: `border: 3px solid var(--color-black); box-shadow: 8px 8px 0px var(--color-black); padding: 0; overflow: hidden; display: flex; flex-direction: column; background: var(--color-white); transition: all 0.2s ease; cursor: default;`
      }, [
        createElement('div', { 
          style: `background-color: ${path.color || 'var(--theme-bg)'}; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-bottom: 3px solid var(--color-black);`
        }, [
          createElement('div', { style: 'width: 88px; height: 88px; background: var(--color-white); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid var(--color-black); box-shadow: 4px 4px 0px var(--color-black); margin-bottom: 20px;' }, [
             createElement('i', { className: `ph-duotone ph-${validIcon}`, style: `font-size: 44px; color: var(--color-black);` })
          ]),
          createElement('h3', { className: 'm-0 text-2xl font-bold text-center', style: 'color: var(--color-black); line-height: 1.2;' }, path.title)
        ]),
        createElement('div', { className: 'p-6 flex-grow-1 d-flex flex-column justify-between' }, [
          createElement('div', {}, [
            createElement('p', { className: 'text-gray text-sm mb-6', style: 'line-height: 1.6; text-align: center;' }, path.description),
            createElement('div', { className: 'd-flex justify-between mb-6', style: 'background: var(--color-gray-100); padding: 12px; border-radius: 8px; border: 2px solid var(--border-color);' }, [
              createElement('div', { className: 'd-flex align-center gap-1 text-sm font-bold' }, [
                createElement('i', { className: 'ph-bold ph-sword', style: `color: ${path.color || 'var(--color-black)'}` }),
                createElement('span', {}, path.difficulty.toUpperCase())
              ]),
              createElement('div', { className: 'd-flex align-center gap-1 text-sm font-bold text-gray' }, [
                createElement('i', { className: 'ph-bold ph-hourglass-high' }),
                createElement('span', {}, path.estimatedDuration)
              ])
            ])
          ]),
          createElement('button', {
            className: 'btn w-100 p-4 mt-auto',
            style: `background-color: ${path.color || 'var(--theme-bg)'}; color: var(--color-black); font-weight: 800; font-size: 16px; border: 3px solid var(--color-black); box-shadow: 4px 4px 0px var(--color-black); transition: all 0.2s ease; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px;`,
            onclick: () => this.handleSelect(path.id),
            onmouseover: (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '4px 6px 0px var(--color-black)'; },
            onmouseout: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-black)'; }
          }, [
            'Select Class',
            createElement('i', { className: 'ph-bold ph-arrow-right' })
          ])
        ])
      ]);
      
      container.appendChild(card);
    });
  }

  render() {
    const container = createElement('div', { className: 'centered-layout flex-column align-center' }, [
      createElement('div', { className: 'text-center mb-8 animate-fade-in' }, [
        createElement('h1', { className: 'text-white font-bold', style: 'font-size: 5.25rem; margin-bottom: 24px; text-shadow: 6px 6px 0px var(--color-black); letter-spacing: -2px;' }, 'Select Your Path'),
        createElement('p', { className: 'font-bold', style: 'font-size: 1.7rem; color: var(--color-black); margin: 0 0 12px 0; text-shadow: 2px 2px 0px var(--color-white);' }, 'Choose your primary learning journey to begin.'),
        createElement('p', { className: 'font-bold', style: 'font-size: 1.3rem; color: var(--color-black); max-width: 850px; margin: 0 auto 48px auto; line-height: 1.5; text-shadow: 2px 2px 0px var(--color-white);' }, 'Don\'t worry, you can always learn other skills later. This just sets your starting point.')
      ]),
      createElement('div', { id: 'paths-container', className: 'grid grid-cols-1 md-grid-cols-3', style: 'gap: 32px;' }, [
        // Loading state
        createElement('p', { className: 'text-white font-bold' }, 'Loading paths...')
      ])
    ]);

    // Add styles for the grid and hover effects
    const style = createElement('style', {}, `
      @media(min-width: 768px) { .md-grid-cols-3 { grid-template-columns: repeat(3, 1fr); max-width: 1100px; width: 100%; } }
      .journey-card:hover { transform: translateY(-8px); box-shadow: 12px 16px 0px var(--color-black) !important; }
    `);
    document.head.appendChild(style);

    this.fetchPaths();
    return container;
  }
}
