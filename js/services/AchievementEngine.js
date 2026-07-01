// js/services/AchievementEngine.js
import { achievementDefinitions } from '../data/achievements.js';

class AchievementEngine {
    constructor() {}

    /**
     * Evaluates all achievements against the current character state.
     * @param {Object} character - The character state object.
     * @returns {Object} Result containing mutated progress and list of newly unlocked achievements.
     */
    evaluate(character) {
        if (!character || !character.progress) {
            return { unlockedAchievements: [] };
        }

        const unlockedAchievements = [];
        
        // Ensure the achievements array exists
        if (!character.progress.achievements) {
            character.progress.achievements = [];
        }

        const existingIds = character.progress.achievements;

        achievementDefinitions.forEach(def => {
            if (!existingIds.includes(def.id)) {
                // If it's not unlocked yet, check the condition
                const isMet = def.condition(character);
                if (isMet) {
                    existingIds.push(def.id);
                    // Add full object to the unlocked array for the UI/Toast to consume immediately
                    unlockedAchievements.push(def);
                }
            }
        });

        // Add XP if the achievement grants any
        unlockedAchievements.forEach(ach => {
             if (ach.xp) {
                 character.progress.xp = (character.progress.xp || 0) + ach.xp;
             }
        });

        return { unlockedAchievements };
    }
}

export const achievementEngine = new AchievementEngine();
