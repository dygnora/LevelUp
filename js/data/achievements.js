// js/data/achievements.js
export const achievementDefinitions = [
    { 
        id: 'first-login', 
        name: 'The Awakening', 
        desc: 'Log in to LevelUp for the first time.', 
        icon: 'ph-sparkle',
        incremental: false,
        condition: (character) => true // Automatically unlocked upon login (usually handled in backend, but we mock true here if they exist)
    },
    { 
        id: 'first-quest', 
        name: 'First Steps', 
        desc: 'Complete your first quest.', 
        icon: 'ph-boot',
        incremental: false,
        condition: (character) => Object.keys(character.progress?.completedQuests || {}).length >= 1
    },
    {
        id: 'html-master',
        name: 'Structure Architect',
        desc: 'Complete all quests in the HTML module.',
        icon: 'ph-file-html',
        incremental: true,
        maxProgress: 2, // Hardcoded for MVP, in real app would compute from module quests
        condition: (character) => character.progress?.completedModules?.includes('html')
    }
];
