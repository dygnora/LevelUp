// js/services/ProgressionEngine.js
import { state } from '../state.js';
import { levelTable } from '../data/levelTable.js';
import { rankTable } from '../data/rankTable.js';
import { achievementDefinitions } from '../data/achievements.js';

// --- FSM STATES ---
export const PROGRESSION_STATES = {
  AVAILABLE: 'AVAILABLE',
  IN_PROGRESS: 'IN_PROGRESS',
  SUBMITTED: 'SUBMITTED',
  QUIZ_AVAILABLE: 'QUIZ_AVAILABLE',
  QUIZ_PASSED: 'QUIZ_PASSED',
  REWARD_PENDING: 'REWARD_PENDING',
  COMPLETED: 'COMPLETED',
  UNLOCKED: 'UNLOCKED' // Used for modules/journeys
};

// --- FLAT MOCK DATA ---
const mockJourneys = {
  'frontend': { id: 'frontend', title: 'Frontend Developer', description: 'Building the Web', icon: '🌐' }
};

const mockModules = {
  'html': { id: 'html', journeyId: 'frontend', title: 'HTML', order: 1, description: 'Foundation of the Web', estimatedTime: '~4 Hours' },
  'css': { id: 'css', journeyId: 'frontend', title: 'CSS', order: 2, description: 'Bring your pages to life', estimatedTime: '~8 Hours' },
  'js': { id: 'js', journeyId: 'frontend', title: 'JavaScript', order: 3, description: 'Make your website interactive', estimatedTime: '~12 Hours' }
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
    if (!character || !character.progress) {
       // If no progress, check if this is the first quest in the first module
       const quest = this.getQuest(questId);
       if (quest && quest.order === 1 && quest.moduleId === 'html') {
          return PROGRESSION_STATES.AVAILABLE;
       }
       return null;
    }

    const progress = character.progress;
    
    if (progress.completedQuests && progress.completedQuests[questId]) {
      return PROGRESSION_STATES.COMPLETED;
    }
    
    if (progress.currentQuest === questId) {
      if (progress.isRewardPending) {
         return PROGRESSION_STATES.REWARD_PENDING;
      }
      if (progress.isQuizPassed) {
         return PROGRESSION_STATES.QUIZ_PASSED;
      }
      if (progress.activeSubmission && progress.activeSubmission.questId === questId) {
         const quest = this.getQuest(questId);
         if (quest && quest.quiz && quest.quiz.length > 0) {
             return PROGRESSION_STATES.QUIZ_AVAILABLE;
         }
         return PROGRESSION_STATES.SUBMITTED;
      }
      if (progress.isQuestStarted) {
        return PROGRESSION_STATES.IN_PROGRESS;
      } else {
        return PROGRESSION_STATES.AVAILABLE;
      }
    }

    // Logic to determine if it's available (if previous quest is completed or it's the very first)
    const quest = this.getQuest(questId);
    if (!progress.currentQuest && quest.order === 1 && progress.currentModule === quest.moduleId) {
      return PROGRESSION_STATES.AVAILABLE;
    }
    
    return null; // Locked
  }

  // Returns the entire active progression context for UI
  getCurrentContext() {
    const character = state.get('character') || {};
    const p = character.progress || {
        currentJourney: 'frontend',
        currentModule: 'html',
        currentQuest: null,
        completedQuests: {},
        completedModules: [],
        xp: 0,
        level: 1,
        activeSubmission: null
    };
    
    const currentJourney = this.getJourney(p.currentJourney);
    const currentModule = this.getModule(p.currentModule);
    
    // If currentQuest is null, it means they haven't started. The target quest is the first quest of the module.
    let targetQuestId = p.currentQuest;
    if (!targetQuestId) {
       const moduleQuests = this.getQuestsForModule(currentModule.id);
       if (moduleQuests.length > 0) targetQuestId = moduleQuests[0].id;
    }
    
    const currentQuest = targetQuestId ? this.getQuest(targetQuestId) : null;
    const questState = currentQuest ? this.getQuestState(currentQuest.id) : null;
    
    let nextUnlock = null;
    if (currentQuest && currentQuest.nextQuestId) {
      const nq = this.getQuest(currentQuest.nextQuestId);
      nextUnlock = nq;
    }
    
    // Calculate Journey Progress based on total quests in journey
    const modulesInJourney = this.getModulesForJourney(currentJourney.id);
    let totalQuestsInJourney = 0;
    modulesInJourney.forEach(m => {
       totalQuestsInJourney += this.getQuestsForModule(m.id).length;
    });
    
    const completedQuestsCount = Object.keys(p.completedQuests || {}).length;

    return {
      journey: currentJourney,
      module: currentModule,
      quest: currentQuest,
      state: questState,
      nextUnlock: nextUnlock, // Object not just string
      xp: p.xp || 0,
      level: p.level || 1,
      stats: {
         completedQuests: completedQuestsCount,
         totalQuests: totalQuestsInJourney,
         percentage: totalQuestsInJourney > 0 ? Math.round((completedQuestsCount / totalQuestsInJourney) * 100) : 0
      }
    };
  }

  // Pre-calculated context specifically for HomeView
  getHomeContext() {
    const character = state.get('character') || {};
    const ctx = this.getCurrentContext();
    if (!ctx || !ctx.quest) return null;

    const firstName = (character.displayName || 'Hero').split(' ')[0];
    const achievements = character.progress?.achievements || [];
    const latestAchievement = achievements.length > 0 ? achievements[0] : null;

    let ctaLabel = 'Start Mission';
    if (ctx.state === 'IN_PROGRESS') ctaLabel = 'Continue Learning';
    else if (ctx.state === 'SUBMITTED') ctaLabel = 'Take Quiz';
    else if (ctx.state === 'COMPLETED') ctaLabel = 'Continue Journey';

    const roadmapQuests = this.getQuestsForModule(ctx.module.id).slice(0, 4);
    const roadmap = roadmapQuests.map(q => ({
       id: q.id,
       title: q.title,
       state: this.getQuestState(q.id)
    }));

    return {
       firstName,
       journey: ctx.journey,
       module: ctx.module,
       quest: ctx.quest,
       questState: ctx.state,
       ctaLabel,
       nextUnlock: ctx.nextUnlock,
       stats: ctx.stats,
       roadmap,
       latestAchievement
    };
  }

  // Gets high-level domain data for all modules in a journey
  getJourneyModulesContext(journeyId) {
    const character = state.get('character');
    if (!character || !character.progress) return [];
    
    return this.getModulesForJourney(journeyId).map(m => {
       const quests = this.getQuestsForModule(m.id);
       const totalQuests = quests.length;
       const completedQuests = quests.filter(q => this.getQuestState(q.id) === PROGRESSION_STATES.COMPLETED).length;
       
       let status = 'LOCKED';
       if (totalQuests === 0) {
          status = 'COMING_SOON';
       } else if (character.progress.completedModules?.includes(m.id)) {
          status = 'COMPLETED';
       } else if (m.id === character.progress.currentModule) {
          status = 'AVAILABLE';
       }

       return {
          ...m,
          stats: { completed: completedQuests, total: totalQuests },
          status
       };
    });
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
        currentQuest: null,
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
        p.isQuestStarted = true;
        p.activeSubmission = null;
        p.isQuizPassed = false;
        p.isRewardPending = false;
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
        p.isQuizPassed = true;
        p.isRewardPending = true;
        p.quizResults = { score, attempts };
        break;
      }
      case 'CLAIM_REWARD': {
        const { questId } = payload;
        const quest = this.getQuest(questId);
        
        // 1. Mark as completed
        if (!p.completedQuests) p.completedQuests = {};
        p.completedQuests[questId] = {
          completedAt: new Date().toISOString(),
          score: p.quizResults?.score || 100,
          attempts: p.quizResults?.attempts || 1,
          xpEarned: quest.rewardXP
        };
        
        p.xp += quest.rewardXP;
        
        // Reset local quest state flags
        p.activeSubmission = null;
        p.isQuizPassed = false;
        p.isRewardPending = false;
        p.isQuestStarted = false;

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
         // Next quest becomes available. We set it to null so it stays AVAILABLE until user starts it?
         // Actually, wait! The FSM logic says if it's the next quest in line but currentQuest is null, it's locked.
         // Let's set it as currentQuest but with a flag? No, if we set currentQuest = null, the Context logic will fetch the first quest of the module.
         // If we are midway through a module, and we set currentQuest = null, `getCurrentContext` will fetch the first quest again! That's bad.
         // So for fresh accounts, currentQuest is null. When started, it's semantic-html.
         // When semantic-html is finished, currentQuest becomes html-forms.
         // Wait, if it becomes html-forms, is it IN_PROGRESS or AVAILABLE? 
         // getQuestState says: `if (progress.currentQuest === questId) return PROGRESSION_STATES.IN_PROGRESS;`
         // This means it would immediately be IN_PROGRESS. We want it to be AVAILABLE until they press Start.
         // So we need a way to distinguish current AVAILABLE quest vs IN_PROGRESS quest.
         // Let's store `currentQuest` as the next one, but add `questStatus: 'AVAILABLE'`?
         // Or better, let `currentQuest` mean "The quest I am currently focused on, whether available or in progress".
         // Then use `isQuestStarted: boolean`.
         // For now, let's just make `currentQuest` the focus quest.
         // Wait! If we change `getQuestState` to check `isQuestStarted`, that requires schema changes.
         // Let's use `currentQuest` as the focus quest.
         // If `currentQuest === questId` AND `!progress.isQuestStarted`, return `AVAILABLE`.
         progress.currentQuest = nextQ.id;
         progress.isQuestStarted = false; // Add this flag
         if (nextQ.moduleId !== completedQuest.moduleId) {
            console.log(`[Unlock Engine] Transitioning to new Module: ${nextQ.moduleId}`);
            progress.currentModule = nextQ.moduleId;
         }
      }
    } else {
      console.log(`[Unlock Engine] Journey complete or no more quests!`);
      progress.currentQuest = null; 
      progress.isQuestStarted = false;
    }
  }

  // --- MODULAR CALCULATION HELPERS ---
  
  calculateLevel(xp) {
    let currentLvl = levelTable[0];
    for (let i = 0; i < levelTable.length; i++) {
        if (xp >= levelTable[i].minXp) {
            currentLvl = levelTable[i];
        } else {
            break;
        }
    }
    const nextLvl = levelTable.find(l => l.level === currentLvl.level + 1);
    return {
        level: currentLvl.level,
        currentXp: xp,
        nextLevelXp: nextLvl ? nextLvl.minXp : currentLvl.minXp
    };
  }

  calculateRank(level) {
    const rank = rankTable.find(r => level >= r.minLevel && level <= r.maxLevel);
    return rank ? rank.name : 'Unknown';
  }

  calculatePercentage(current, total) {
    if (total === 0) return 0;
    return Math.round((current / total) * 100);
  }

  // --- PROFILE DATA FETCHERS ---

  getPlayerIdentity() {
    const character = state.get('character') || {};
    const p = character.progress || {};
    const lvlInfo = this.calculateLevel(p.xp || 0);
    
    return {
        displayName: character.displayName || 'Unknown Hero',
        photoURL: character.photoURL || null,
        rank: this.calculateRank(lvlInfo.level),
        createdAt: character.createdAt || null
    };
  }

  getPlayerProgression() {
    const character = state.get('character') || {};
    const xp = (character.progress && character.progress.xp) ? character.progress.xp : 0;
    const lvlInfo = this.calculateLevel(xp);
    
    return {
        level: lvlInfo.level,
        currentXp: lvlInfo.currentXp,
        nextLevelXp: lvlInfo.nextLevelXp,
        percentage: this.calculatePercentage(lvlInfo.currentXp, lvlInfo.nextLevelXp)
    };
  }

  getJourneyProgress() {
    const character = state.get('character') || {};
    const p = character.progress || { currentJourney: 'frontend', completedQuests: {} };
    const currentJourney = this.getJourney(p.currentJourney);
    if (!currentJourney) return null;

    const modulesInJourney = this.getModulesForJourney(currentJourney.id);
    let totalQuestsInJourney = 0;
    modulesInJourney.forEach(m => {
       totalQuestsInJourney += this.getQuestsForModule(m.id).length;
    });
    
    const completedQuestsCount = Object.keys(p.completedQuests || {}).length;

    return {
        journeyName: currentJourney.title,
        completedQuests: completedQuestsCount,
        totalQuests: totalQuestsInJourney,
        percentage: this.calculatePercentage(completedQuestsCount, totalQuestsInJourney)
    };
  }

  getCurrentMission() {
    const character = state.get('character') || {};
    const p = character.progress || { currentModule: 'html', currentQuest: null, isQuestStarted: false };
    
    let targetQuestId = p.currentQuest;
    if (!targetQuestId) {
       const moduleQuests = this.getQuestsForModule(p.currentModule);
       if (moduleQuests.length > 0) targetQuestId = moduleQuests[0].id;
    }
    
    const quest = targetQuestId ? this.getQuest(targetQuestId) : null;
    const module = quest ? this.getModule(quest.moduleId) : null;
    
    // Check if journey is fully complete
    const journeyProg = this.getJourneyProgress();
    if (journeyProg && journeyProg.percentage === 100) {
        return { isComplete: true };
    }
    
    if (!quest || !module) return null;

    let status = 'Ready to Start';
    if (p.isQuestStarted) status = 'In Progress';
    if (p.activeSubmission) status = 'Submitted';

    return {
        isComplete: false,
        moduleTitle: module.title,
        questTitle: quest.title,
        status: status
    };
  }

  getAchievements() {
    const character = state.get('character') || {};
    
    return achievementDefinitions.map(ach => {
        const isUnlocked = ach.condition(character);
        
        let progress = null;
        if (ach.incremental && ach.maxProgress) {
            let currentProg = 0;
            if (ach.id === 'html-master') {
                const htmlQuests = this.getQuestsForModule('html');
                const completed = Object.keys(character.progress?.completedQuests || {}).filter(qId => htmlQuests.find(q => q.id === qId)).length;
                currentProg = completed;
            }
            progress = `${Math.min(currentProg, ach.maxProgress)} / ${ach.maxProgress}`;
        }

        return {
            ...ach,
            isUnlocked,
            progress
        };
    });
  }

  getPlayerStatistics() {
    const character = state.get('character') || {};
    const p = character.progress || {};
    
    return {
        totalXp: p.xp || 0,
        completedQuests: Object.keys(p.completedQuests || {}).length
    };
  }

  getPlayerProfile() {
    return {
        identity: this.getPlayerIdentity(),
        progression: this.getPlayerProgression(),
        journey: this.getJourneyProgress(),
        mission: this.getCurrentMission(),
        achievements: this.getAchievements(),
        statistics: this.getPlayerStatistics(),
        account: {
            email: state.get('user')?.email || 'Not available'
        }
    };
  }
}

export const progressionEngine = new ProgressionEngine();
