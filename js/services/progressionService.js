// js/services/progressionService.js
import { db } from '../firebase.js';
import { state } from '../state.js';
import { dbService } from './dbService.js';

export const progressionService = {
  /**
   * Calculate rank based on level
   * @param {number} level 
   * @returns {string} rank name
   */
  calculateRank(level) {
    if (level <= 5) return 'Beginner';
    if (level <= 10) return 'Explorer';
    if (level <= 20) return 'Apprentice';
    if (level <= 35) return 'Skilled';
    if (level <= 50) return 'Expert';
    if (level <= 75) return 'Master';
    return 'Legend';
  },

  /**
   * Calculate how much XP is needed for the next level
   * Simple linear/exponential mock formula
   * @param {number} level 
   * @returns {number} xp needed
   */
  calculateRequiredXP(level) {
    return level * 100;
  },

  /**
   * Complete a quest and award XP
   * @param {string} questId 
   * @param {number} xpReward 
   */
  async completeQuest(questId, xpReward) {
    const user = state.get('user');
    const character = state.get('character');
    
    if (!user || !character) return;

    let newXP = character.characterXP + xpReward;
    let newLevel = character.characterLevel;
    
    // Check for level up
    while (newXP >= this.calculateRequiredXP(newLevel)) {
      newXP -= this.calculateRequiredXP(newLevel);
      newLevel++;
      
      // We can trigger a UI modal for "Level Up!" here later
      console.log(`Level Up! You are now level ${newLevel}`);
    }

    const newRank = this.calculateRank(newLevel);

    const updateData = {
      characterXP: newXP,
      characterLevel: newLevel,
      characterRank: newRank,
      totalQuestsCompleted: (character.totalQuestsCompleted || 0) + 1
    };

    try {
      await dbService.updateCharacter(user.uid, updateData);
      
      // Update local state
      state.set('character', { ...character, ...updateData });
      
      // In a real app we'd also mark the specific quest as completed in a user_progress collection.
    } catch (error) {
      console.error("Error updating progression:", error);
    }
  }
};
