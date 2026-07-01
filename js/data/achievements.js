// js/data/achievements.js
export const achievementDefinitions = [
    { 
        id: 'first-quest', 
        title: 'First Steps', 
        description: 'Complete your first quest.', 
        icon: 'ph-boot',
        rarity: 'Common',
        category: 'Progression',
        hidden: false,
        xp: 50,
        condition: (character) => Object.keys(character.progress?.completedQuests || {}).length >= 1
    },
    {
        id: 'html-explorer',
        title: 'HTML Explorer',
        description: 'Complete the HTML Basics module.',
        icon: 'ph-file-html',
        rarity: 'Rare',
        category: 'Milestone',
        hidden: false,
        xp: 200,
        condition: (character) => character.progress?.completedModules?.includes('html')
    },
    {
        id: 'knowledge-seeker',
        title: 'Knowledge Seeker',
        description: 'Open 10 Required Intel resources.',
        icon: 'ph-books',
        rarity: 'Common',
        category: 'Exploration',
        hidden: false,
        xp: 100,
        condition: (character) => (character.progress?.stats?.resourcesOpened || 0) >= 10
    },
    {
        id: 'first-level-up',
        title: 'First Level Up',
        description: 'Reach Level 2.',
        icon: 'ph-arrow-fat-up',
        rarity: 'Common',
        category: 'Progression',
        hidden: false,
        xp: 100,
        condition: (character) => (character.progress?.level || 1) >= 2
    }
];
