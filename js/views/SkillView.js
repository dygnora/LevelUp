// js/views/SkillView.js
import { createElement } from '../utils/dom.js';
import { dbService } from '../services/dbService.js';
import { AppLayout } from '../components/AppLayout.js';
import { QuestCard } from '../components/QuestCard.js';

export class SkillView {
  constructor(params) {
    this.skillId = params.id;
    this.quests = [];
    this.isLoading = true;
  }

  async fetchQuests() {
    try {
      this.quests = await dbService.getQuestsBySkill(this.skillId);
      this.isLoading = false;
      this.reRender();
    } catch (error) {
      console.error('Error fetching quests:', error);
    }
  }

  reRender() {
    const container = document.getElementById('skill-content');
    if (container) {
      container.innerHTML = '';
      container.appendChild(this.renderQuests());
    }
  }

  renderQuests() {
    if (this.isLoading) {
      return createElement('div', { className: 'text-center font-bold text-gray p-6' }, 'Loading quests...');
    }

    if (this.quests.length === 0) {
      return createElement('div', { className: 'card text-center p-6' }, 'No quests available for this skill yet.');
    }

    const container = createElement('div', { className: 'quests-list' });
    this.quests.forEach(quest => {
      // Mock progress
      const isCompleted = false; 
      const card = new QuestCard(quest, isCompleted);
      container.appendChild(card.render());
    });

    return container;
  }

  renderContent() {
    this.fetchQuests();

    return createElement('div', { className: 'animate-fade-in' }, [
      createElement('div', { className: 'mb-6 d-flex align-center gap-4' }, [
        createElement('a', { href: '#/journey', className: 'btn btn-white p-2' }, [
          createElement('i', { className: 'ph-bold ph-arrow-left' })
        ]),
        createElement('div', {}, [
          createElement('h1', { className: 'text-3xl m-0' }, 'Skill Quests'),
          createElement('p', { className: 'text-gray m-0' }, 'Complete quests to master this skill.')
        ])
      ]),
      createElement('div', { id: 'skill-content' }, this.renderQuests())
    ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '#/journey');
    return layout.render();
  }
}
