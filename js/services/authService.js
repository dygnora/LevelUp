// js/services/authService.js
import { auth, db } from '../firebase.js';
import { state } from '../state.js';

export const authService = {
  /**
   * Listen to auth state changes
   * @param {Function} callback 
   */
  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(async (user) => {
      state.set('user', user);
      if (user) {
        // Load character profile from Firestore
        await this.loadUserProfile(user.uid);
      } else {
        state.set('character', null);
      }
      state.set('isAuthChecked', true);
      if (callback) callback(user);
    });
  },

  async loadUserProfile(uid) {
    try {
      const doc = await db.collection('users').doc(uid).get();
      if (doc.exists) {
        state.set('character', { id: doc.id, ...doc.data() });
      } else {
        state.set('character', null); // Needs onboarding
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  },

  async login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  },

  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  },

  async logout() {
    return auth.signOut();
  }
};
