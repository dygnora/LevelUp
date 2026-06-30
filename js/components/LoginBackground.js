// js/components/LoginBackground.js
import { createElement } from '../utils/dom.js';
import { bgConfig } from './loginBackgroundConfig.js';

export class LoginBackground {
  constructor() {
    this.container = null;
    this.isActive = false;
    this.handleResize = this.handleResize.bind(this);
  }

  getBudget() {
    const width = window.innerWidth;
    if (width < 768) return bgConfig.budgets.mobile;
    if (width < 1024) return bgConfig.budgets.tablet;
    return bgConfig.budgets.desktop;
  }

  mount(target = document.body) {
    this.container = createElement('div', { 
      className: 'login-bg-container',
      'aria-hidden': 'true' // Hide from screen readers
    });
    
    this.renderElements();
    target.appendChild(this.container);

    this.isActive = true;
    window.addEventListener('resize', this.handleResize);
  }

  destroy() {
    this.isActive = false;
    window.removeEventListener('resize', this.handleResize);

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  renderElements() {
    // Clear previous
    this.container.innerHTML = '';
    
    const budget = this.getBudget();

    // Render Glow B (Ambient light layer)
    const glowB = createElement('div', { className: 'glow-b anim-glow-drift' });
    this.container.appendChild(glowB);

    // Render Words
    if (budget.icons > 4) {
      bgConfig.words.forEach(word => {
        const el = createElement('div', { 
          className: `bg-element bg-word anim-${word.animationType}`,
          style: `left: ${word.x}%; top: ${word.y}%;`
        }, word.text);
        this.container.appendChild(el);
      });
    }

    // Render Knowledge Graphs
    bgConfig.graphs.slice(0, budget.graphs).forEach(graph => {
      const svgHTML = `
        <svg width="120" height="80" class="bg-element bg-graph anim-${graph.animationType}" style="left: ${graph.x}%; top: ${graph.y}%;">
          <line x1="10" y1="10" x2="60" y2="10" />
          <line x1="60" y1="10" x2="110" y2="10" />
          <line x1="60" y1="10" x2="60" y2="70" />
          <line x1="60" y1="70" x2="110" y2="70" />
          <circle cx="10" cy="10" r="5" />
          <circle cx="60" cy="10" r="5" />
          <circle cx="110" cy="10" r="5" />
          <circle cx="60" cy="70" r="5" />
          <circle cx="110" cy="70" r="5" />
        </svg>
      `;
      const wrapper = document.createElement('div');
      wrapper.innerHTML = svgHTML.trim();
      this.container.appendChild(wrapper.firstChild);
    });

    // Render Icons
    bgConfig.icons.slice(0, budget.icons).forEach(icon => {
      // Wrapper is needed so CSS animation (transform) doesn't overwrite initial position/rotation
      const wrapper = createElement('div', {
        className: `bg-element layer-${icon.layer}`,
        style: `left: ${icon.x}%; top: ${icon.y}%;`
      });
      
      const iconEl = createElement('i', { 
        className: `ph ${icon.icon} anim-${icon.animationType}`,
        style: `display: block; font-size: ${icon.layer === 1 ? '3rem' : icon.layer === 2 ? '4rem' : '5rem'};`
      });
      
      wrapper.appendChild(iconEl);
      this.container.appendChild(wrapper);
    });

    // Render Particles
    for (let i = 0; i < budget.particles; i++) {
      const isPlus = i % 2 === 0;
      const x = Math.random() * 100;
      // Start below screen for animation
      const delay = Math.random() * -25; // Negative delay to randomize start state
      
      const el = createElement('div', {
        className: 'bg-element bg-particle anim-particle',
        style: `left: ${x}%; animation-delay: ${delay}s; font-size: ${Math.random() > 0.5 ? '16px' : '10px'};`
      }, isPlus ? '+' : '•');
      this.container.appendChild(el);
    }
  }

  handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      if (this.isActive) {
        this.renderElements();
      }
    }, 250);
  }
}
