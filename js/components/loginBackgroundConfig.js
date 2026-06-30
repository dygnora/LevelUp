// js/components/loginBackgroundConfig.js

export const bgConfig = {
  // Maximum visible elements
  budgets: {
    desktop: { icons: 12, graphs: 4, particles: 15 },
    tablet: { icons: 8, graphs: 2, particles: 10 },
    mobile: { icons: 4, graphs: 0, particles: 0 }
  },

  // Z-index layer definitions (strictly controlled)
  layers: {
    background: -5,
    grid: -4,
    decorationsFar: -3,
    decorationsMid: -2,
    decorationsNear: -1
  },

  // Predefined icon layout
  // Layer: 1 (Far), 2 (Mid), 3 (Near)
  icons: [
    { icon: 'ph-code', x: 10, y: 15, layer: 1, rotation: -10, animationType: 'float-slow' },
    { icon: 'ph-terminal', x: 85, y: 20, layer: 2, rotation: 5, animationType: 'float-medium' },
    { icon: 'ph-git-branch', x: 20, y: 70, layer: 3, rotation: -15, animationType: 'float-fast' },
    { icon: 'ph-database', x: 75, y: 80, layer: 1, rotation: 8, animationType: 'float-slow' },
    { icon: 'ph-cloud', x: 45, y: 10, layer: 2, rotation: 0, animationType: 'float-medium' },
    { icon: 'ph-target', x: 90, y: 50, layer: 3, rotation: -5, animationType: 'float-fast' },
    { icon: 'ph-lightbulb', x: 5, y: 45, layer: 1, rotation: 12, animationType: 'float-slow' },
    { icon: 'ph-code', x: 30, y: 85, layer: 2, rotation: -8, animationType: 'float-medium' },
    { icon: 'ph-terminal', x: 60, y: 90, layer: 3, rotation: 4, animationType: 'float-fast' },
    { icon: 'ph-git-branch', x: 55, y: 25, layer: 1, rotation: -12, animationType: 'float-slow' },
    { icon: 'ph-database', x: 15, y: 95, layer: 2, rotation: 6, animationType: 'float-medium' },
    { icon: 'ph-target', x: 95, y: 85, layer: 3, rotation: -3, animationType: 'float-fast' }
  ],

  // Hidden learning words
  words: [
    { text: 'BUILD', x: 15, y: 30, layer: 1 },
    { text: 'LEARN', x: 70, y: 15, layer: 1 },
    { text: 'SHIP', x: 80, y: 65, layer: 1 },
    { text: 'GROW', x: 25, y: 50, layer: 1 },
    { text: 'LEVEL UP', x: 45, y: 85, layer: 1 },
    { text: 'QUEST', x: 10, y: 80, layer: 1 }
  ],

  // Knowledge Graphs (Skill Tree patterns)
  graphs: [
    { x: 15, y: 25, layer: 2 },
    { x: 80, y: 75, layer: 2 },
    { x: 85, y: 35, layer: 3 },
    { x: 25, y: 75, layer: 3 }
  ]
};
