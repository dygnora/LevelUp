// js/components/SkillTree.js
import { createElement } from '../utils/dom.js';
import { router } from '../router.js';

export class SkillTree {
  constructor(tiers, userProgress = {}) {
    this.tiers = tiers; // Now an array of arrays
    this.userProgress = userProgress;
  }

  render() {
    if (!this.tiers || this.tiers.length === 0) {
      return createElement('div', { className: 'text-center p-6' }, 'No skills available yet.');
    }

    const container = createElement('div', { 
      className: 'skill-tree-container d-flex flex-column align-center mt-8',
      style: 'width: 100%;'
    });
    
    let isPrevTierCompleted = true; // First tier is always unlocked

    this.tiers.forEach((tier, tierIndex) => {
      let isTierLocked = !isPrevTierCompleted;
      let isCurrentTierCompleted = true;

      const tierRow = createElement('div', { 
        className: 'd-flex justify-center', 
        style: 'gap: 48px; width: 100%;'
      });
      
      tier.forEach((skill) => {
        const isCompleted = this.userProgress[skill.id]?.completed || false;
        if (!isCompleted) isCurrentTierCompleted = false;
        
        let bgColor = isCompleted ? 'var(--theme-bg)' : (isTierLocked ? 'var(--color-gray-200)' : 'var(--color-warning)');
        let textColor = isCompleted ? 'var(--color-white)' : 'var(--color-black)';
        
        const skillNode = createElement('div', { 
          className: `card text-center d-flex flex-column align-center justify-center ${isTierLocked ? 'opacity-50 cursor-not-allowed' : 'card-interactive'}`,
          style: `width: 140px; padding: 20px 16px; background-color: ${bgColor}; border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); border-radius: 8px; transition: all 0.2s;`,
          onclick: () => !isTierLocked && router.navigate(`/skill/${skill.id}`)
        }, [
          createElement('i', { className: `ph-duotone ${skill.icon || 'ph-star'} mb-2`, style: `font-size: 36px; color: ${textColor};` }),
          createElement('h3', { className: 'm-0 font-bold text-sm', style: `color: ${textColor};` }, skill.title)
        ]);
        
        tierRow.appendChild(skillNode);
      });
      
      container.appendChild(tierRow);

      if (tierIndex < this.tiers.length - 1) {
         const nextTierCount = this.tiers[tierIndex + 1].length;
         const currentTierCount = tier.length;
         const connectorColor = isCurrentTierCompleted ? 'var(--theme-bg)' : 'var(--color-gray-400)'; // Color the lines if completed
         const lineStyle = `width: 4px; border-left: 4px dotted ${connectorColor};`;
         const hLineStyle = `height: 4px; border-top: 4px dotted ${connectorColor};`;
         
         if (currentTierCount === 1 && nextTierCount === 1) {
            container.appendChild(createElement('div', {
              style: `${lineStyle} height: 32px; margin: 0 auto;`
            }));
         } else if (currentTierCount === 1 && nextTierCount > 1) {
            const branchWidth = (nextTierCount - 1) * 188; // 140 width + 48 gap
            container.appendChild(createElement('div', { className: 'd-flex flex-column align-center' }, [
               createElement('div', { style: `${lineStyle} height: 16px;` }),
               createElement('div', { style: `${hLineStyle} width: ${branchWidth}px;` }),
               createElement('div', { className: 'd-flex justify-between', style: `width: ${branchWidth + 4}px;` }, [
                  createElement('div', { style: `${lineStyle} height: 16px;` }),
                  createElement('div', { style: `${lineStyle} height: 16px;` })
               ])
            ]));
         } else if (currentTierCount > 1 && nextTierCount === 1) {
            const branchWidth = (currentTierCount - 1) * 188;
            container.appendChild(createElement('div', { className: 'd-flex flex-column align-center' }, [
               createElement('div', { className: 'd-flex justify-between', style: `width: ${branchWidth + 4}px;` }, [
                  createElement('div', { style: `${lineStyle} height: 16px;` }),
                  createElement('div', { style: `${lineStyle} height: 16px;` })
               ]),
               createElement('div', { style: `${hLineStyle} width: ${branchWidth}px;` }),
               createElement('div', { style: `${lineStyle} height: 16px;` })
            ]));
         }
      }
      
      isPrevTierCompleted = isCurrentTierCompleted;
    });

    const style = createElement('style', {}, `
      .opacity-50 { opacity: 0.5; }
      .cursor-not-allowed { cursor: not-allowed; }
      .card-interactive:hover { transform: translateY(-4px); box-shadow: 6px 10px 0px var(--color-black) !important; }
    `);
    document.head.appendChild(style);

    return container;
  }
}
