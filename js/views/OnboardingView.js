// js/views/OnboardingView.js
import { createElement } from '../utils/dom.js';
import { router } from '../router.js';
import { state } from '../state.js';

export class OnboardingView {
  constructor() {
    this.currentStep = 0;
    this.steps = [
      {
        title: "Welcome to LevelUp",
        description: "Your gamified learning adventure starts here.",
        icon: "ph-flag-pennant"
      },
      {
        title: "Character Progression",
        description: "Every quest you complete earns you XP. Level up your character as you master new skills.",
        icon: "ph-star"
      },
      {
        title: "Learning Journey",
        description: "Choose your path, follow the skill tree, and become a master in your field.",
        icon: "ph-map-trifold"
      }
    ];
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.reRender();
    } else {
      router.navigate('#/choose-journey');
    }
  }

  reRender() {
    const container = document.getElementById('onboarding-container');
    if (container) {
      const newElement = this.renderContent();
      container.innerHTML = newElement.innerHTML;
      this.attachEvents(container);
    }
  }

  renderContent() {
    const step = this.steps[this.currentStep];
    const isLast = this.currentStep === this.steps.length - 1;

    const dots = this.steps.map((_, index) => 
      createElement('div', { 
        className: `onboarding-dot ${index === this.currentStep ? 'active' : ''}` 
      })
    );

    return createElement('div', { className: 'card auth-card text-center animate-pop-in', id: 'onboarding-card' }, [
      createElement('div', { className: 'mb-6' }, [
        createElement('i', { className: `ph-fill ${step.icon} text-primary`, style: 'font-size: 4rem;' })
      ]),
      createElement('h2', {}, step.title),
      createElement('p', { className: 'text-gray mb-6' }, step.description),
      
      createElement('div', { className: 'd-flex justify-center gap-2 mb-6' }, dots),
      
      createElement('button', { 
        id: 'onboarding-next-btn',
        className: 'btn btn-primary w-100'
      }, isLast ? 'Start Adventure' : 'Next')
    ]);
  }

  attachEvents(element) {
    const btn = element.querySelector('#onboarding-next-btn');
    if (btn) {
      btn.addEventListener('click', () => this.nextStep());
    }
  }

  render() {
    // Add some inline styles just for onboarding dots
    const style = createElement('style', {}, `
      .onboarding-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--color-gray-300); transition: var(--transition-fast); }
      .onboarding-dot.active { background: var(--color-primary-dark); transform: scale(1.2); }
    `);
    document.head.appendChild(style);

    const content = this.renderContent();
    const container = createElement('div', { className: 'centered-layout', id: 'onboarding-container' }, content);
    
    // Use setTimeout to ensure DOM is ready before attaching
    setTimeout(() => this.attachEvents(container), 0);
    
    return container;
  }
}
