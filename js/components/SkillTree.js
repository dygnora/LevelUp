// js/components/SkillTree.js
import { createElement } from '../utils/dom.js';
import { router } from '../router.js';

export class SkillTree {
  constructor(skills, userProgress = {}) {
    this.skills = skills;
    this.userProgress = userProgress;
  }

  render() {
    if (!this.skills || this.skills.length === 0) {
      return createElement('div', { className: 'text-center p-6' }, 'No skills available yet.');
    }

    const container = createElement('div', { className: 'skill-tree-container mt-6' });
    
    // Group skills by level/tier or just display in order
    // In this MVP we display them sequentially in a line to represent a tree.
    this.skills.forEach((skill, index) => {
      const isCompleted = this.userProgress[skill.id]?.completed || false;
      const isLocked = index > 0 && !this.userProgress[this.skills[index - 1].id]?.completed; // Simple lock mechanism
      
      const skillNode = createElement('div', { 
        className: `card mb-4 ${isLocked ? 'opacity-50 cursor-not-allowed' : 'card-interactive'}`,
        onclick: () => !isLocked && router.navigate(`#/skill/${skill.id}`)
      }, [
        createElement('div', { className: 'd-flex align-center justify-between' }, [
          createElement('div', { className: 'd-flex align-center gap-4' }, [
            createElement('div', { 
              className: `avatar d-flex align-center justify-center ${isCompleted ? 'bg-success text-white' : 'bg-gray-200'}`,
              style: 'border-radius: var(--radius-md);'
            }, [
              createElement('i', { className: `text-2xl ph-fill ${skill.icon || 'ph-star'}` })
            ]),
            createElement('div', {}, [
              createElement('h3', { className: 'm-0' }, skill.title),
              createElement('p', { className: 'text-sm text-gray m-0' }, skill.description)
            ])
          ]),
          createElement('div', {}, [
            isCompleted 
              ? createElement('span', { className: 'badge bg-success text-white' }, 'Completed')
              : isLocked 
                ? createElement('i', { className: 'ph-fill ph-lock-key text-xl text-gray' })
                : createElement('span', { className: 'badge text-primary bg-black' }, 'In Progress')
          ])
        ])
      ]);
      
      container.appendChild(skillNode);
      
      // Add connecting line
      if (index < this.skills.length - 1) {
        const line = createElement('div', { 
          style: 'width: 4px; height: 30px; background-color: var(--border-color); margin: 0 auto; margin-bottom: 1rem;' 
        });
        container.appendChild(line);
      }
    });

    const style = createElement('style', {}, `
      .opacity-50 { opacity: 0.5; }
      .cursor-not-allowed { cursor: not-allowed; }
      .bg-black { background-color: var(--color-black); }
    `);
    document.head.appendChild(style);

    return container;
  }
}
