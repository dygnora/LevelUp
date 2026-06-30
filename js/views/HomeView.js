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

    // Character Card
    const characterCard = createElement('div', { className: 'card mb-6 bg-primary' }, [
      createElement('div', { className: 'd-flex align-center gap-4 mb-4' }, [
        createElement('div', { className: 'avatar bg-white', style: 'width: 80px; height: 80px;' }), // Placeholder avatar
        createElement('div', {}, [
          createElement('h2', { className: 'm-0 text-3xl' }, character.displayName),
          createElement('p', { className: 'm-0 font-bold' }, `Level ${character.characterLevel || 1} • ${character.characterRank || 'Beginner'}`)
        ])
      ]),
      // XP Progress
      createElement('div', { className: 'mt-4' }, [
        createElement('div', { className: 'd-flex justify-between mb-2 font-bold text-sm' }, [
          createElement('span', {}, 'XP Progress'),
          createElement('span', {}, `${character.characterXP || 0} / 100 XP`) // Mock max XP for now
        ]),
        createElement('div', { className: 'progress-container bg-white' }, [
          createElement('div', { 
            className: 'progress-bar bg-success', 
            style: `width: ${Math.min(((character.characterXP || 0) / 100) * 100, 100)}%;`
          })
        ])
      ])
    ]);

    // Quick Stats & Next Action
    const dashboardGrid = createElement('div', { className: 'grid grid-cols-1 md-grid-cols-2' }, [
      createElement('div', { className: 'card' }, [
        createElement('h3', { className: 'text-xl' }, 'Current Journey'),
        createElement('p', { className: 'text-gray mb-4' }, 'Continue where you left off.'),
        createElement('button', { 
          className: 'btn btn-secondary w-100',
          onclick: () => router.navigate('/journey')
        }, 'Continue Adventure')
      ]),
      createElement('div', { className: 'card' }, [
        createElement('h3', { className: 'text-xl' }, 'Daily Quest'),
        createElement('p', { className: 'text-gray mb-4' }, 'Complete 1 quest today to keep your streak!'),
        createElement('div', { className: 'd-flex align-center justify-between p-3 bg-gray-200', style: 'border-radius: var(--radius-sm); border: 2px solid var(--border-color);' }, [
          createElement('span', { className: 'font-bold' }, 'Any Quest'),
          createElement('span', { className: 'badge bg-primary text-black' }, '+20 XP')
        ])
      ])
    ]);

    // Add CSS for medium grid
    const style = createElement('style', {}, `
      @media(min-width: 768px) { .md-grid-cols-2 { grid-template-columns: repeat(2, 1fr); } }
      .bg-primary { background-color: var(--color-primary); }
      .bg-white { background-color: var(--color-white); }
      .bg-success { background-color: var(--color-success); }
      .bg-gray-200 { background-color: var(--color-gray-200); }
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
