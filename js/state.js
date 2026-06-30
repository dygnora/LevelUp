// js/state.js

/**
 * Global application state management
 */
class State {
  constructor() {
    this.data = {
      user: null,
      character: null,
      currentJourney: null,
      learningPaths: [],
      skills: [],
      quests: [],
      isAuthChecked: false
    };
    this.listeners = {};
  }

  /**
   * Get a state value
   * @param {string} key 
   */
  get(key) {
    return this.data[key];
  }

  /**
   * Set a state value and notify listeners
   * @param {string} key 
   * @param {any} value 
   */
  set(key, value) {
    this.data[key] = value;
    this.notify(key, value);
  }

  /**
   * Subscribe to state changes
   * @param {string} key 
   * @param {Function} callback 
   */
  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
    };
  }

  /**
   * Notify listeners of a change
   * @param {string} key 
   * @param {any} value 
   */
  notify(key, value) {
    if (this.listeners[key]) {
      this.listeners[key].forEach(callback => callback(value));
    }
  }
}

export const state = new State();
