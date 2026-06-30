// js/views/QuestView.js
import { createElement } from '../utils/dom.js';
import { AppLayout } from '../components/AppLayout.js';

export class QuestView {
  constructor(params) {
    this.questId = params.id;
  }

  handleComplete() {
    // In phase 11/12, this will trigger the progressionService
    alert(`Quest ${this.questId} completed! +XP awarded.`);
    window.history.back(); // Go back to skill view
  }

  renderContent() {
    // Ideally we would fetch the quest details here
    return createElement('div', { className: 'animate-fade-in' }, [
      createElement('div', { className: 'mb-6 d-flex align-center gap-4' }, [
        createElement('a', { 
          href: '#/journey', // Fallback, normally would go to skill view
          onclick: (e) => { e.preventDefault(); window.history.back(); },
          className: 'btn btn-white p-2' 
        }, [
          createElement('i', { className: 'ph-bold ph-arrow-left' })
        ]),
        createElement('h1', { className: 'text-3xl m-0' }, `Quest Details`)
      ]),
      createElement('div', { className: 'card mb-6' }, [
        createElement('h2', { className: 'text-2xl' }, 'Learn the Basics'),
        createElement('p', { className: 'text-gray' }, 'Follow the external resource below to learn this concept.'),
        createElement('div', { className: 'p-4 bg-gray-100 mb-6 font-bold' }, [
          'Resource: ',
          createElement('a', { href: '#', target: '_blank' }, 'Official Documentation Link')
        ]),
        createElement('button', { 
          className: 'btn btn-primary w-100',
          onclick: () => this.handleComplete()
        }, 'Mark as Completed (+50 XP)')
      ])
    ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '#/journey');
    return layout.render();
  }
}
