// js/components/loginBackgroundConfig.js
export const bgConfig = {
  budgets: {
    mobile: { icons: 4, graphs: 0, particles: 5 },
    tablet: { icons: 8, graphs: 2, particles: 10 },
    desktop: { icons: 15, graphs: 3, particles: 15 }
  },
  icons: [
    { icon: 'ph-code', layer: 3, x: 15, y: 20, rotation: 15, animationType: 'float' },
    { icon: 'ph-database', layer: 2, x: 80, y: 25, rotation: -10, animationType: 'float-slow' },
    { icon: 'ph-git-branch', layer: 1, x: 10, y: 70, rotation: 5, animationType: 'float' },
    { icon: 'ph-terminal', layer: 3, x: 85, y: 75, rotation: -20, animationType: 'float-slow' },
    { icon: 'ph-cloud', layer: 2, x: 25, y: 15, rotation: 10, animationType: 'float' },
    { icon: 'ph-target', layer: 1, x: 75, y: 15, rotation: -5, animationType: 'float-slow' },
    { icon: 'ph-lightbulb', layer: 3, x: 20, y: 80, rotation: 25, animationType: 'float' },
    { icon: 'ph-laptop', layer: 2, x: 90, y: 50, rotation: -15, animationType: 'float-slow' },
    { icon: 'ph-monitor', layer: 1, x: 5, y: 40, rotation: 8, animationType: 'float' },
    { icon: 'ph-rocket-launch', layer: 3, x: 70, y: 85, rotation: -12, animationType: 'float-slow' },
    { icon: 'ph-folder', layer: 2, x: 30, y: 90, rotation: 18, animationType: 'float' },
    { icon: 'ph-bug', layer: 1, x: 12, y: 50, rotation: -25, animationType: 'float-slow' },
    { icon: 'ph-lightning', layer: 3, x: 88, y: 35, rotation: 20, animationType: 'float' },
    { icon: 'ph-cube', layer: 2, x: 40, y: 10, rotation: -8, animationType: 'float-slow' },
    { icon: 'ph-cpu', layer: 1, x: 60, y: 95, rotation: 12, animationType: 'float' }
  ],
  words: [
    { text: 'BUILD', layer: 1, x: 5, y: 10, animationType: 'drift' },
    { text: 'LEARN', layer: 1, x: 60, y: 75, animationType: 'float-slow' },
    { text: 'GROW', layer: 1, x: 10, y: 65, animationType: 'drift' }
  ],
  graphs: [
    { layer: 2, x: 10, y: 20, animationType: 'drift' },
    { layer: 1, x: 75, y: 60, animationType: 'float-slow' },
    { layer: 2, x: 25, y: 75, animationType: 'float' }
  ]
};
