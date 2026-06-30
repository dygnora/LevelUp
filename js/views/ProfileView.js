// js/views/ProfileView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';

export class ProfileView {
  renderContent() {
    const character = state.get('character');
    
    if (!character) {
       return createElement('div', {}, 'Loading...');
    }

    // Achievements Mock
    const achievements = [
      { name: 'First Steps', desc: 'Complete your first quest', icon: 'ph-boot', unlocked: true },
      { name: 'Seven Day Streak', desc: 'Study for 7 consecutive days', icon: 'ph-fire', unlocked: false }
    ];

    return createElement('div', { className: 'animate-fade-in' }, [
      createElement('h1', { className: 'text-3xl mb-6' }, 'Character Profile'),
      
      createElement('div', { className: 'grid grid-cols-1 md-grid-cols-2 mb-6' }, [
        createElement('div', { className: 'card bg-primary text-center d-flex flex-column align-center' }, [
          createElement('div', { className: 'avatar bg-white mb-4', style: 'width: 100px; height: 100px;' }),
          createElement('h2', { className: 'text-2xl m-0' }, character.displayName),
          createElement('span', { className: 'badge bg-black text-white mt-2 mb-4' }, character.characterRank || 'Beginner'),
          createElement('p', { className: 'text-black font-bold' }, `Level ${character.characterLevel || 1}`)
        ]),
        
        createElement('div', { className: 'grid grid-cols-2 gap-4' }, [
          createElement('div', { className: 'card text-center' }, [
            createElement('h3', { className: 'text-4xl text-secondary m-0' }, character.totalQuestsCompleted || 0),
            createElement('p', { className: 'text-gray text-sm font-bold m-0 mt-2 uppercase' }, 'Quests Done')
          ]),
          createElement('div', { className: 'card text-center' }, [
            createElement('h3', { className: 'text-4xl text-success m-0' }, character.totalSkillsCompleted || 0),
            createElement('p', { className: 'text-gray text-sm font-bold m-0 mt-2 uppercase' }, 'Skills Mastered')
          ]),
          createElement('div', { className: 'card text-center' }, [
            createElement('h3', { className: 'text-4xl text-danger m-0' }, character.currentStreak || 0),
            createElement('p', { className: 'text-gray text-sm font-bold m-0 mt-2 uppercase' }, 'Day Streak')
          ])
        ])
      ]),

      createElement('h2', { className: 'text-2xl mb-4' }, 'Achievements'),
      createElement('div', { className: 'grid grid-cols-1 md-grid-cols-3' }, achievements.map(ach => 
        createElement('div', { className: `card ${ach.unlocked ? 'card-interactive' : ''}`, style: ach.unlocked ? '' : 'opacity: 0.6; filter: grayscale(1);' }, [
          createElement('div', { className: 'd-flex align-center gap-4' }, [
            createElement('div', { className: `p-3 rounded-full ${ach.unlocked ? 'bg-primary' : 'bg-gray-300'}`, style: 'border-radius: var(--radius-md);' }, [
              createElement('i', { className: `ph-fill ${ach.icon} text-2xl` })
            ]),
            createElement('div', {}, [
              createElement('h4', { className: 'm-0' }, ach.name),
              createElement('p', { className: 'text-xs text-gray m-0 mt-1' }, ach.desc)
            ])
          ])
        ])
      ))
    ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/profile');
    return layout.render();
  }
}
