// js/components/QuestCard.js
import { createElement } from '../utils/dom.js';
import { router } from '../router.js';

export class QuestCard {
  constructor(quest, isCompleted = false) {
    this.quest = quest;
    this.isCompleted = isCompleted;
  }

  render() {
    return createElement('div', { 
      className: `card mb-4 ${this.isCompleted ? 'bg-gray-100' : 'card-interactive'}`,
      onclick: () => !this.isCompleted && router.navigate(`/quest/${this.quest.id}`)
    }, [
      createElement('div', { className: 'd-flex justify-between align-center' }, [
        createElement('div', {}, [
          createElement('h3', { className: 'text-xl m-0' }, this.quest.title),
          createElement('p', { className: 'text-gray text-sm m-0 mt-2' }, this.quest.description)
        ]),
        createElement('div', { className: 'text-right' }, [
          createElement('span', { className: 'badge bg-primary text-black mb-2' }, `+${this.quest.xpReward} XP`),
          createElement('br'),
          this.isCompleted 
            ? createElement('span', { className: 'badge bg-success text-white' }, 'Completed')
            : createElement('span', { className: 'text-xs font-bold text-gray' }, `${this.quest.estimatedMinutes} mins`)
        ])
      ])
    ]);
  }
}
