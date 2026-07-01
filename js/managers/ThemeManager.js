// js/managers/ThemeManager.js
export const themes = {
  morning: {
    id: 'morning',
    name: 'Morning Growth',
    bg: '#FFD54A',
    glowA: '#FFD54A',
    glowB: '#FFB067',
    accent: '#F5B000',
    btnText: '#000000',
    icon: '🌞',
    greeting: 'Good morning',
    subGreeting: 'A great day to build something new.'
  },
  sunset: {
    id: 'sunset',
    name: 'Momentum',
    bg: '#ea1e35',
    glowA: '#ea1e35',
    glowB: '#FF0000',
    accent: '#CC0000',
    btnText: '#FFFFFF',
    icon: '🌇',
    greeting: 'Good afternoon',
    subGreeting: 'Keep your momentum going.'
  },
  night: {
    id: 'night',
    name: 'Deep Work',
    bg: '#2e4892',
    glowA: '#3672D9',
    glowB: '#7B2CBF',
    accent: '#4D96FF',
    btnText: '#FFFFFF',
    icon: '🌙',
    greeting: 'Good evening',
    subGreeting: 'Perfect time for deep work.'
  }
};

class ThemeManager {
  constructor() {
    this.currentTheme = null;
    this.subscribers = new Set();
    this.intervalId = null;
  }

  init() {
    this.evaluateTheme();
    // Re-evaluate every minute
    this.intervalId = setInterval(() => this.evaluateTheme(), 60000);
  }

  evaluateTheme() {
    const hour = new Date().getHours();
    let themeId = 'night';

    if (hour >= 5 && hour < 16) {
      themeId = 'morning';
    } else if (hour >= 16 && hour < 19) {
      themeId = 'sunset';
    }

    if (!this.currentTheme || this.currentTheme.id !== themeId) {
      this.setTheme(themes[themeId]);
    }
  }

  setTheme(theme) {
    this.currentTheme = theme;
    
    // Update CSS Variables
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-glow-a', theme.glowA);
    root.style.setProperty('--theme-glow-b', theme.glowB);
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-btn-text', theme.btnText);
    
    // Manage dynamic element colors SVG and decorative elements to use lighter accent for contrast
    if (theme.id === 'night') {
      root.style.setProperty('--theme-element-color', 'var(--color-white)');
      root.style.setProperty('--theme-element-opacity', '0.08');
    } else {
      root.style.setProperty('--theme-element-color', 'var(--color-black)');
      root.style.setProperty('--theme-element-opacity', '1');
    }

    this.notifySubscribers();
  }

  notifySubscribers() {
    for (const callback of this.subscribers) {
      try {
        callback(this.currentTheme);
      } catch (err) {
        console.error('Error in theme subscriber:', err);
      }
    }
  }

  getCurrentTheme() {
    if (!this.currentTheme) {
      this.evaluateTheme();
    }
    return this.currentTheme;
  }

  getGreeting() {
    return this.getCurrentTheme().greeting;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    if (this.currentTheme) {
      callback(this.currentTheme);
    }
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }
}

export const themeManager = new ThemeManager();
