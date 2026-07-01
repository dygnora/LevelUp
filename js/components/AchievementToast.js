// js/components/AchievementToast.js
import { createElement } from '../utils/dom.js';

class AchievementToast {
    constructor() {
        this.queue = [];
        this.isShowing = false;
        
        // Ensure container is created when DOM is ready
        if (document.body) {
            this.container = this._createContainer();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                this.container = this._createContainer();
            });
        }
    }

    _createContainer() {
        const container = createElement('div', {
            style: 'position: fixed; top: 20px; right: 20px; z-index: 10000; display: flex; flex-direction: column; gap: 10px;'
        });
        
        // Define animations
        const style = createElement('style', {}, `
            @keyframes slideInRight {
                from { transform: translateX(120%); }
                to { transform: translateX(0); }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(120%); opacity: 0; }
            }
        `);
        
        document.body.appendChild(container);
        document.head.appendChild(style);
        return container;
    }

    show(achievement) {
        if (Array.isArray(achievement)) {
            this.queue.push(...achievement);
        } else {
            this.queue.push(achievement);
        }
        
        if (!this.isShowing) {
            this._processQueue();
        }
    }

    _processQueue() {
        if (this.queue.length === 0) {
            this.isShowing = false;
            return;
        }

        this.isShowing = true;
        const ach = this.queue.shift();
        this._renderToast(ach);
    }

    _renderToast(ach) {
        if (!this.container) this.container = this._createContainer();

        const toast = createElement('div', {
            className: 'd-flex align-center p-3',
            style: 'background: var(--color-white); border: 3px solid var(--color-black); border-radius: 12px; box-shadow: 6px 6px 0px var(--color-black); min-width: 300px; max-width: 350px; animation: slideInRight 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;'
        }, [
            createElement('div', {
                className: 'd-flex align-center justify-center',
                style: 'background: var(--color-primary); border-radius: 50%; width: 50px; height: 50px; min-width: 50px; border: 2px solid var(--color-black); margin-right: 16px;'
            }, [
                createElement('i', { className: `ph-fill ${ach.icon} text-black`, style: 'font-size: 24px;' })
            ]),
            createElement('div', { className: 'd-flex flex-column' }, [
                createElement('span', { className: 'text-xs font-bold text-gray', style: 'text-transform: uppercase;' }, 'Achievement Unlocked!'),
                createElement('h4', { className: 'm-0 font-black text-lg', style: 'line-height: 1.2; margin-top: 4px; margin-bottom: 4px;' }, ach.title),
                createElement('p', { className: 'm-0 text-sm font-bold', style: 'color: var(--color-gray-700); line-height: 1.2;' }, ach.description)
            ])
        ]);

        this.container.appendChild(toast);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.4s ease-in forwards';
            setTimeout(() => {
                toast.remove();
                this._processQueue();
            }, 400);
        }, 4000);
    }
}

export const achievementToast = new AchievementToast();
