// js/components/RewardOverlay.js
import { createElement } from '../utils/dom.js';
import { progressionEngine } from '../services/ProgressionEngine.js';

export class RewardOverlay {
    constructor(quest, onClaim) {
        this.quest = quest;
        this.onClaim = onClaim;
    }

    render() {
        return createElement('div', { 
            className: 'd-flex align-center justify-center p-4',
            style: 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); z-index: 9999; animation: fadeUp 0.3s ease-out forwards; backdrop-filter: blur(4px);'
        }, [
            createElement('div', { 
                className: 'card max-w-sm w-full text-center', 
                style: 'background: var(--color-white); border: 4px solid var(--color-black); box-shadow: 12px 12px 0px var(--color-black); border-radius: 16px; animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;'
            }, [
                createElement('div', { className: 'mb-4' }, [
                    createElement('i', { className: 'ph-fill ph-confetti text-primary', style: 'font-size: 64px;' })
                ]),
                createElement('h2', { className: 'text-3xl font-black mb-2 m-0 uppercase' }, 'Mission Complete'),
                createElement('p', { className: 'text-gray text-lg font-bold mb-6' }, this.quest.title),
                
                createElement('div', { 
                    className: 'mb-8',
                    style: 'display: inline-block; background-color: var(--color-black); color: var(--color-warning); padding: 12px 24px; border-radius: 30px; border: 2px solid var(--color-black);'
                }, [
                    createElement('span', { className: 'text-3xl font-black' }, `+${this.quest.rewards.xp} XP`)
                ]),
  
                createElement('button', {
                    className: 'btn w-100 p-4 bg-primary text-black',
                    style: 'font-size: 20px; font-weight: 900; border: 3px solid var(--color-black); box-shadow: 4px 4px 0px var(--color-black); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;',
                    onclick: () => this.onClaim(),
                    onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = '0 0px 0px var(--color-black)'; },
                    onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-black)'; }
                }, 'CLAIM REWARD')
            ])
        ]);
    }
}
