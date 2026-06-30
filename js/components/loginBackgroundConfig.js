// js/components/loginBackgroundConfig.js
export const bgConfig = {
  budgets: {
    mobile: { icons: 4, graphs: 0, particles: 5 },
    tablet: { icons: 8, graphs: 2, particles: 10 },
    desktop: { icons: 15, graphs: 3, particles: 15 }
  },
  baseIcons: [
    { icon: 'ph-code', layer: 3, x: 15, y: 20, animationType: 'float' },
    { icon: 'ph-laptop', layer: 2, x: 90, y: 50, animationType: 'rotate' },
    { icon: 'ph-folder', layer: 2, x: 30, y: 90, animationType: 'drift' },
    { icon: 'ph-cpu', layer: 1, x: 60, y: 95, animationType: 'rotate' },
    { icon: 'ph-monitor', layer: 1, x: 5, y: 40, animationType: 'float' }
  ],
  themeIcons: {
    morning: [
      { icon: 'ph-sun', layer: 2, x: 80, y: 25, animationType: 'rotate' },
      { icon: 'ph-coffee', layer: 1, x: 10, y: 70, animationType: 'drift' },
      { icon: 'ph-lightbulb', layer: 3, x: 20, y: 80, animationType: 'float' },
      { icon: 'ph-rocket-launch', layer: 3, x: 70, y: 85, animationType: 'rotate' },
      { icon: 'ph-target', layer: 1, x: 75, y: 15, animationType: 'drift' },
      { icon: 'ph-compass', layer: 3, x: 85, y: 75, animationType: 'float' },
      { icon: 'ph-map-pin', layer: 2, x: 25, y: 15, animationType: 'rotate' },
      { icon: 'ph-flag-banner', layer: 2, x: 40, y: 10, animationType: 'drift' },
      { icon: 'ph-battery-charging', layer: 1, x: 12, y: 50, animationType: 'rotate' },
      { icon: 'ph-check-circle', layer: 3, x: 88, y: 35, animationType: 'float' }
    ],
    sunset: [
      { icon: 'ph-fire', layer: 2, x: 80, y: 25, animationType: 'rotate' },
      { icon: 'ph-lightning', layer: 1, x: 10, y: 70, animationType: 'drift' },
      { icon: 'ph-trend-up', layer: 3, x: 20, y: 80, animationType: 'float' },
      { icon: 'ph-flag', layer: 3, x: 70, y: 85, animationType: 'rotate' },
      { icon: 'ph-medal', layer: 1, x: 75, y: 15, animationType: 'drift' },
      { icon: 'ph-trophy', layer: 3, x: 85, y: 75, animationType: 'float' },
      { icon: 'ph-star', layer: 2, x: 25, y: 15, animationType: 'rotate' },
      { icon: 'ph-crown', layer: 2, x: 40, y: 10, animationType: 'drift' },
      { icon: 'ph-hands-clapping', layer: 1, x: 12, y: 50, animationType: 'rotate' },
      { icon: 'ph-confetti', layer: 3, x: 88, y: 35, animationType: 'float' }
    ],
    night: [
      { icon: 'ph-moon', layer: 2, x: 80, y: 25, animationType: 'rotate' },
      { icon: 'ph-cloud', layer: 1, x: 10, y: 70, animationType: 'drift' },
      { icon: 'ph-database', layer: 3, x: 20, y: 80, animationType: 'float' },
      { icon: 'ph-terminal', layer: 3, x: 70, y: 85, animationType: 'rotate' },
      { icon: 'ph-bug', layer: 1, x: 75, y: 15, animationType: 'drift' },
      { icon: 'ph-shield-check', layer: 3, x: 85, y: 75, animationType: 'float' },
      { icon: 'ph-lock-key', layer: 2, x: 25, y: 15, animationType: 'rotate' },
      { icon: 'ph-git-branch', layer: 2, x: 40, y: 10, animationType: 'drift' },
      { icon: 'ph-browser', layer: 1, x: 12, y: 50, animationType: 'rotate' },
      { icon: 'ph-brackets-curly', layer: 3, x: 88, y: 35, animationType: 'float' }
    ]
  },
  words: [
    { text: 'BUILD', layer: 1, x: 5, y: 10, animationType: 'drift' },
    { text: 'LEARN', layer: 1, x: 60, y: 75, animationType: 'float' },
    { text: 'GROW', layer: 1, x: 10, y: 65, animationType: 'drift' }
  ],
  graphs: [
    { layer: 2, x: 10, y: 20, animationType: 'graph' },
    { layer: 1, x: 75, y: 60, animationType: 'graph' },
    { layer: 2, x: 25, y: 75, animationType: 'graph' }
  ]
};
