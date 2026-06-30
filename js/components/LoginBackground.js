// js/components/LoginBackground.js
import { createElement } from '../utils/dom.js';
import { bgConfig } from './loginBackgroundConfig.js';

export class LoginBackground {
  constructor() {
    this.container = null;
    this.animationFrame = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.elements = [];
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isActive = false;

    // Bindings
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.tick = this.tick.bind(this);
  }

  getBudget() {
    const width = window.innerWidth;
    if (width < 768) return bgConfig.budgets.mobile;
    if (width < 1024) return bgConfig.budgets.tablet;
    return bgConfig.budgets.desktop;
  }

  mount() {
    this.container = createElement('div', { 
      className: 'login-bg-container',
      'aria-hidden': 'true' // Hide from screen readers
    });
    
    this.renderElements();
    document.body.appendChild(this.container);

    this.isActive = true;

    if (!this.isReducedMotion) {
      window.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      
      // Initial tick
      this.tick();
    }
    
    window.addEventListener('resize', this.handleResize);
  }

  destroy() {
    this.isActive = false;
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  renderElements() {
    // Clear previous
    this.container.innerHTML = '';
    this.elements = [];
    
    const budget = this.getBudget();

    // Render Icons
    bgConfig.icons.slice(0, budget.icons).forEach(icon => {
      const el = createElement('i', { 
        className: `ph ${icon.icon} bg-element layer-${icon.layer} anim-${icon.animationType}`,
        style: `left: ${icon.x}%; top: ${icon.y}%; transform: rotate(${icon.rotation}deg);`
      });
      this.container.appendChild(el);
      this.elements.push({ node: el, baseLayer: icon.layer, originalX: icon.x, originalY: icon.y, type: 'icon' });
    });

    // Render Words (Desktop & Tablet only usually, but we keep it simple)
    if (budget.icons > 4) {
      bgConfig.words.forEach(word => {
        const el = createElement('div', { 
          className: 'bg-element bg-word',
          style: `left: ${word.x}%; top: ${word.y}%;`
        }, word.text);
        this.container.appendChild(el);
        this.elements.push({ node: el, baseLayer: word.layer, type: 'word' });
      });
    }

    // Render Knowledge Graphs
    bgConfig.graphs.slice(0, budget.graphs).forEach(graph => {
      const svgHTML = `
        <svg width="100" height="60" class="bg-element bg-graph" style="left: ${graph.x}%; top: ${graph.y}%;">
          <line x1="10" y1="10" x2="50" y2="10" />
          <line x1="50" y1="10" x2="90" y2="10" />
          <line x1="50" y1="10" x2="50" y2="50" />
          <line x1="50" y1="50" x2="90" y2="50" />
          <circle cx="10" cy="10" r="4" />
          <circle cx="50" cy="10" r="4" />
          <circle cx="90" cy="10" r="4" />
          <circle cx="50" cy="50" r="4" />
          <circle cx="90" cy="50" r="4" />
        </svg>
      `;
      const wrapper = document.createElement('div');
      wrapper.innerHTML = svgHTML.trim();
      const el = wrapper.firstChild;
      this.container.appendChild(el);
      this.elements.push({ node: el, baseLayer: graph.layer, type: 'graph' });
    });

    // Render Particles
    for (let i = 0; i < budget.particles; i++) {
      const isPlus = i % 2 === 0;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * -20; // Negative delay to start randomly
      const el = createElement('div', {
        className: 'bg-element bg-particle anim-particle',
        style: `left: ${x}%; top: ${y}%; animation-delay: ${delay}s;`
      }, isPlus ? '+' : '•');
      this.container.appendChild(el);
    }
  }

  handleMouseMove(e) {
    if (!this.isActive) return;
    this.targetX = (e.clientX / window.innerWidth) - 0.5;
    this.targetY = (e.clientY / window.innerHeight) - 0.5;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  handleResize() {
    // Throttle resize
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      if (this.isActive) {
        this.renderElements();
      }
    }, 250);
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.isActive = false;
      cancelAnimationFrame(this.animationFrame);
    } else {
      this.isActive = true;
      if (!this.isReducedMotion) {
        this.tick();
      }
    }
  }

  tick() {
    if (!this.isActive) return;

    // Smooth interpolation for parallax
    this.elements.forEach(item => {
      if (!item.node) return;
      
      // Parallax Shift
      // Depth multiplier: Layer 1 -> 2px max, Layer 2 -> 6px, Layer 3 -> 10px
      const depthMultiplier = item.baseLayer === 1 ? 2 : item.baseLayer === 2 ? 6 : 10;
      const shiftX = this.targetX * depthMultiplier * 5;
      const shiftY = this.targetY * depthMultiplier * 5;

      // Proximity Effect (only for icons)
      let proximityScale = 1;
      let proximityRotate = 0;
      
      if (item.type === 'icon') {
        const rect = item.node.getBoundingClientRect();
        const elX = rect.left + (rect.width / 2);
        const elY = rect.top + (rect.height / 2);
        const dist = Math.hypot(this.mouseX - elX, this.mouseY - elY);
        
        // 150px radius for interaction
        if (dist < 150) {
          const intensity = 1 - (dist / 150);
          // Scale to max 1.04, rotate max 2deg
          proximityScale = 1 + (0.04 * intensity);
          proximityRotate = 2 * intensity;
        }
      }

      item.node.style.transform = `translate(${shiftX}px, ${shiftY}px) scale(${proximityScale}) rotate(${proximityRotate}deg)`;
    });

    this.animationFrame = requestAnimationFrame(this.tick);
  }
}
