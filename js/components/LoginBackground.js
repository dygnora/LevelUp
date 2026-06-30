import { createElement } from '../utils/dom.js';
import { bgConfig } from './loginBackgroundConfig.js';
import { themeManager } from '../managers/ThemeManager.js';

export class LoginBackground {
  constructor() {
    this.container = null;
    this.isActive = false;
    this.animationFrame = null;
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.elements = [];
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Store initial theme so icons don't jump on theme change during active session
    this.initialThemeId = themeManager.getCurrentTheme().id;

    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.tick = this.tick.bind(this);
  }

  getBudget() {
    const width = window.innerWidth;
    if (width < 768) return bgConfig.budgets.mobile;
    if (width < 1024) return bgConfig.budgets.tablet;
    return bgConfig.budgets.desktop;
  }

  getIcons() {
    const base = bgConfig.baseIcons || [];
    const specific = bgConfig.themeIcons[this.initialThemeId] || bgConfig.themeIcons['night'];
    return [...base, ...specific];
  }

  mount(target = document.body) {
    this.container = createElement('div', { 
      className: 'login-bg-container',
      'aria-hidden': 'true'
    });
    
    this.renderElements();
    target.appendChild(this.container);

    this.isActive = true;
    window.addEventListener('resize', this.handleResize);

    if (!this.isReducedMotion) {
      window.addEventListener('mousemove', this.handleMouseMove);
      this.tick();
    }
  }

  destroy() {
    this.isActive = false;
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  handleMouseMove(e) {
    if (!this.isActive) return;
    // Normalize mouse position between -0.5 and 0.5
    this.targetX = (e.clientX / window.innerWidth) - 0.5;
    this.targetY = (e.clientY / window.innerHeight) - 0.5;
  }

  tick() {
    if (!this.isActive) return;

    // Smooth interpolation for parallax
    this.currentX += (this.targetX - this.currentX) * 0.05;
    this.currentY += (this.targetY - this.currentY) * 0.05;

    this.elements.forEach(item => {
      // Depth multiplier: Layer 1 -> 4px, Layer 2 -> 10px, Layer 3 -> 18px
      const depthMultiplier = item.layer === 1 ? 4 : item.layer === 2 ? 10 : 18;
      const shiftX = this.currentX * depthMultiplier;
      const shiftY = this.currentY * depthMultiplier;

      // Apply transform without touching top/left or rotation (which is handled by children)
      item.node.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
    });

    this.animationFrame = requestAnimationFrame(this.tick);
  }

  renderElements() {
    // Clear previous
    this.container.innerHTML = '';
    this.elements = [];
    
    const budget = this.getBudget();

    // Render Glow B (Ambient light layer)
    const glowB = createElement('div', { className: 'glow-b anim-glow-b' });
    this.container.appendChild(glowB);

    // Render Words
    if (budget.icons > 4) {
      bgConfig.words.forEach(word => {
        const wrapper = createElement('div', { 
          className: `bg-element layer-${word.layer}`,
          style: `left: ${word.x}%; top: ${word.y}%;`
        });
        const textNode = createElement('div', { className: `bg-word anim-${word.animationType}` }, word.text);
        wrapper.appendChild(textNode);
        this.container.appendChild(wrapper);
        this.elements.push({ node: wrapper, layer: word.layer });
      });
    }

    // Render Knowledge Graphs
    bgConfig.graphs.slice(0, budget.graphs).forEach(graph => {
      const wrapper = createElement('div', {
        className: `bg-element layer-${graph.layer}`,
        style: `left: ${graph.x}%; top: ${graph.y}%;`
      });
      const svgHTML = `
        <svg width="120" height="80" class="bg-graph anim-${graph.animationType}">
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
      wrapper.innerHTML = svgHTML.trim();
      this.container.appendChild(wrapper);
      this.elements.push({ node: wrapper, layer: graph.layer });
    });

    // Render Icons
    const icons = this.getIcons();
    icons.slice(0, budget.icons).forEach(icon => {
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
      this.elements.push({ node: wrapper, layer: icon.layer });
    });

    // Render Particles
    for (let i = 0; i < budget.particles; i++) {
      const isPlus = i % 2 === 0;
      const x = Math.random() * 100;
      const delay = Math.random() * -25;
      
      const wrapper = createElement('div', {
        className: 'bg-element layer-1', // Slowest parallax layer
        style: `left: ${x}%; top: 0; height: 100%;`
      });

      const el = createElement('div', {
        className: 'bg-particle anim-particle',
        style: `animation-delay: ${delay}s; font-size: ${Math.random() > 0.5 ? '16px' : '10px'};`
      }, isPlus ? '+' : '•');
      
      wrapper.appendChild(el);
      this.container.appendChild(wrapper);
      this.elements.push({ node: wrapper, layer: 1 });
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
