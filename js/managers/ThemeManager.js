// js/managers/ThemeManager.js
export const themes = {
  morning: {
    id: 'morning',
    name: 'Morning Growth',
    bg: '#FFD54A',
    glowA: '#FFD54A',
    glowB: '#FFB067',
    accent: '#F5B000',
    greeting: '🌅 Good morning, ready to level up?'
  },
  sunset: {
    id: 'sunset',
    name: 'Momentum',
    bg: '#FF6B6B',
    glowA: '#FF6B6B',
    glowB: '#E63946',
    accent: '#D90429',
    greeting: '🌆 Progress is built one quest at a time.'
  },
  night: {
    id: 'night',
    name: 'Deep Work',
    bg: '#1B2A49',
    glowA: '#3672D9',
    glowB: '#7B2CBF',
    accent: '#4D96FF',
    greeting: '🌙 Time for deep work.'
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
    
    // Apply CSS Variables to root
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-glow-a', theme.glowA);
    root.style.setProperty('--theme-glow-b', theme.glowB);
    root.style.setProperty('--theme-accent', theme.accent);

    // The dark navy theme needs SVG and decorative elements to use lighter accent for contrast
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
