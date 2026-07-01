// js/services/ProgressionEngine.js
import { state } from '../state.js';

// --- FSM STATES ---
export const PROGRESSION_STATES = {
  AVAILABLE: 'AVAILABLE',
  IN_PROGRESS: 'IN_PROGRESS',
  SUBMITTED: 'SUBMITTED',
  COMPLETED: 'COMPLETED',
  UNLOCKED: 'UNLOCKED' // Used for modules/journeys
};

// --- FLAT MOCK DATA ---
const mockJourneys = {
  'frontend': { id: 'frontend', title: 'Frontend Developer', description: 'Building the Web', icon: '🌐' }
};

const mockModules = {
  'html': { id: 'html', journeyId: 'frontend', title: 'HTML', order: 1 },
  'css': { id: 'css', journeyId: 'frontend', title: 'CSS', order: 2 },
  'js': { id: 'js', journeyId: 'frontend', title: 'JavaScript', order: 3 }
};

const mockQuests = {
  'semantic-html': {
    id: 'semantic-html',
    moduleId: 'html',
    order: 1,
    title: 'Build Semantic Landing Page',
    objective: 'Create a responsive landing page using semantic HTML5 tags.',
    difficulty: 'BEGINNER',
    estimatedTime: '30 Minutes',
    resources: [
      { title: 'MDN Web Docs', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics' }
    ],
    submissionRequirement: { type: 'github', label: 'GitHub Repository URL' },
    quiz: [
      { question: 'Which tag is used for the main navigation?', options: ['<nav>', '<header>', '<section>'], correctAnswer: 0 }
    ],
    rewardXP: 40,
    nextQuestId: 'html-forms'
  },
  'html-forms': {
    id: 'html-forms',
    moduleId: 'html',
    order: 2,
    title: 'Interactive HTML Forms',
    objective: 'Build a contact form with full validation.',
    difficulty: 'BEGINNER',
    estimatedTime: '45 Minutes',
    resources: [],
    submissionRequirement: { type: 'github', label: 'GitHub Repository URL' },
    quiz: [],
    rewardXP: 50,
    nextQuestId: 'css-basics' // Jump to CSS module
  },
  'css-basics': {
    id: 'css-basics',
    moduleId: 'css',
    order: 1,
    title: 'Style the Landing Page',
    objective: 'Apply CSS to make your landing page beautiful.',
    difficulty: 'INTERMEDIATE',
    estimatedTime: '1 Hour',
    resources: [],
    submissionRequirement: { type: 'github', label: 'GitHub Repository URL' },
    quiz: [],
    rewardXP: 60,
    nextQuestId: null
  }
};

class ProgressionEngine {
  constructor() {
    this.journeys = mockJourneys;
    this.modules = mockModules;
    this.quests = mockQuests;
  }

  // --- GETTERS ---
  
  getJourney(id) { return this.journeys[id]; }
  getModule(id) { return this.modules[id]; }
  getQuest(id) { return this.quests[id]; }
  
  getModulesForJourney(journeyId) {
    return Object.values(this.modules)
      .filter(m => m.journeyId === journeyId)
      .sort((a, b) => a.order - b.order);
  }

  getQuestsForModule(moduleId) {
    return Object.values(this.quests)
      .filter(q => q.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  }

  // Gets the exact state of a quest for the current user
  getQuestState(questId) {
    const character = state.get('character');
    if (!character || !character.progress) return PROGRESSION_STATES.AVAILABLE;

    const progress = character.progress;
    
    if (progress.completedQuests && progress.completedQuests[questId]) {
      return PROGRESSION_STATES.COMPLETED;
    }
    
    if (progress.currentQuest === questId) {
      if (progress.activeSubmission && progress.activeSubmission.questId === questId) {
        return PROGRESSION_STATES.SUBMITTED;
      }
      return PROGRESSION_STATES.IN_PROGRESS;
    }

    // Logic to determine if it's available (if previous quest is completed or it's the very first)
    const quest = this.getQuest(questId);
    if (quest.order === 1 && progress.currentModule === quest.moduleId) {
      return PROGRESSION_STATES.AVAILABLE;
    }

    return null; // Locked
  }

  // Returns the entire active progression context for UI
  getCurrentContext() {
    const character = state.get('character');
    if (!character || !character.progress) return null;
    
    const p = character.progress;
    const currentJourney = this.getJourney(p.currentJourney);
    const currentModule = this.getModule(p.currentModule);
    const currentQuest = this.getQuest(p.currentQuest);
    const questState = currentQuest ? this.getQuestState(currentQuest.id) : null;
    
    let nextUnlock = null;
    if (currentQuest && currentQuest.nextQuestId) {
      const nq = this.getQuest(currentQuest.nextQuestId);
      nextUnlock = nq ? nq.title : null;
    }

    return {
      journey: currentJourney,
      module: currentModule,
      quest: currentQuest,
      state: questState,
      nextUnlock: nextUnlock,
      xp: p.xp,
      level: p.level
    };
  }

  // --- ACTIONS (Mutations) ---

  dispatch(actionType, payload) {
    const character = state.get('character');
    if (!character) return;

    let p = character.progress;
    
    // Ensure progress object exists
    if (!p) {
      p = {
        currentJourney: 'frontend',
        currentModule: 'html',
        currentQuest: 'semantic-html',
        completedQuests: {},
        completedModules: [],
        xp: 0,
        level: 1,
        activeSubmission: null
      };
    }

    console.log(`[Progression Engine] Processing Action: ${actionType}`, payload);

    switch (actionType) {
      case 'START_QUEST': {
        const { questId } = payload;
        // Validate if they can start it
        p.currentQuest = questId;
        p.activeSubmission = null;
        break;
      }
      case 'SUBMIT_PROJECT': {
        const { questId, type, value } = payload;
        p.activeSubmission = {
          questId,
          type,
          value,
          submittedAt: new Date().toISOString()
        };
        break;
      }
      case 'PASS_QUIZ': {
        const { questId, score, attempts } = payload;
        const quest = this.getQuest(questId);
        
        // 1. Mark as completed
        if (!p.completedQuests) p.completedQuests = {};
        p.completedQuests[questId] = {
          completedAt: new Date().toISOString(),
          score,
          attempts,
          xpEarned: quest.rewardXP
        };
        
        p.xp += quest.rewardXP;
        p.activeSubmission = null;

        // 2. Unlock Engine: Determine what happens next
        this._evaluateUnlock(p, quest);
        break;
      }
    }

    // Save back to local state (which triggers UI re-renders)
    state.set('character', { ...character, progress: p });
    
    // In a real app, we would also await dbService.updateCharacter(...) here
  }

  // --- UNLOCK ENGINE (Internal logic) ---
  
  _evaluateUnlock(progress, completedQuest) {
    console.log(`[Unlock Engine] Evaluating next steps after completing: ${completedQuest.id}`);
    
    const currentModuleQuests = this.getQuestsForModule(completedQuest.moduleId);
    const isModuleComplete = currentModuleQuests.every(q => progress.completedQuests[q.id]);
    
    if (isModuleComplete) {
      console.log(`[Unlock Engine] Module ${completedQuest.moduleId} Completed!`);
      if (!progress.completedModules.includes(completedQuest.moduleId)) {
        progress.completedModules.push(completedQuest.moduleId);
      }
    }

    if (completedQuest.nextQuestId) {
      const nextQ = this.getQuest(completedQuest.nextQuestId);
      if (nextQ) {
         progress.currentQuest = nextQ.id;
         if (nextQ.moduleId !== completedQuest.moduleId) {
            console.log(`[Unlock Engine] Transitioning to new Module: ${nextQ.moduleId}`);
            progress.currentModule = nextQ.moduleId;
         }
      }
    } else {
      console.log(`[Unlock Engine] Journey complete or no more quests!`);
      // If no next quest, user might have finished the journey
      progress.currentQuest = null; 
    }
  }
}

export const progressionEngine = new ProgressionEngine();
