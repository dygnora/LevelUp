import { frontendJourney } from './journeys/frontend.js';
import { htmlQuests } from './quests/html.js';

export const journeys = {
    'frontend': frontendJourney
};

export const modules = {
    // Computed from journeys for easy access
    // But since the engine currently expects an object mapped by ID:
};

// Auto-populate modules from journeys
Object.values(journeys).forEach(j => {
    j.modules.forEach(m => {
        modules[m.id] = { ...m, journeyId: j.id };
    });
});

export const quests = {
    // Computed from all quests arrays
};

// Auto-populate quests from arrays
const allQuestArrays = [htmlQuests /*, cssQuests, jsQuests */];

allQuestArrays.forEach(arr => {
    arr.forEach((q, index) => {
        q._index = index;
        quests[q.id] = q;
    });
});
