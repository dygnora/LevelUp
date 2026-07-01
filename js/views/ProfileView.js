// js/views/ProfileView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { progressionEngine } from '../services/ProgressionEngine.js';
import { themeManager } from '../managers/ThemeManager.js';

export class ProfileView {
  renderContent() {
    const profile = progressionEngine.getPlayerProfile();
    const theme = themeManager.getCurrentTheme();
    
    // Check if fully initialized
    if (!profile || !profile.identity) {
       return createElement('div', { className: 'p-8 text-center' }, 'Loading Profile...');
    }

    const { identity, progression, journey, mission, achievements, statistics, account } = profile;

    // 1. Identity Section
    const avatarEl = identity.photoURL 
        ? createElement('img', { src: identity.photoURL, className: 'avatar bg-white mb-4', style: 'width: 100px; height: 100px; object-fit: cover;' })
        : createElement('div', { className: 'avatar bg-white mb-4 d-flex align-center justify-center', style: 'width: 100px; height: 100px;' }, [
            createElement('span', { className: 'text-4xl font-bold' }, identity.displayName.charAt(0).toUpperCase())
          ]);

    const identitySection = createElement('div', { className: 'card text-center d-flex flex-column align-center mb-6', style: 'background-color: var(--theme-bg); transition: background-color var(--transition-normal);' }, [
        avatarEl,
        createElement('h2', { className: 'text-2xl m-0 text-black' }, identity.displayName),
        createElement('span', { className: 'badge bg-black text-white mt-2' }, identity.rank)
    ]);

    // 2. Current Mission Section
    let missionContent;
    if (mission && mission.isComplete) {
        missionContent = [
            createElement('h3', { className: 'text-success m-0' }, 'Congratulations! Journey Complete.')
        ];
    } else if (mission) {
        missionContent = [
            createElement('p', { className: 'text-sm text-gray font-bold uppercase m-0' }, `Module: ${mission.moduleTitle}`),
            createElement('h3', { className: 'text-xl m-0 mt-2' }, mission.questTitle),
            createElement('span', { className: 'badge mt-3', style: 'background-color: var(--theme-accent); color: var(--theme-element-color); font-weight: bold; transition: background-color var(--transition-normal);' }, mission.status)
        ];
    } else {
        missionContent = [
            createElement('p', { className: 'text-gray m-0' }, 'No mission yet. Choose your first journey.')
        ];
    }

    const missionSection = createElement('div', { className: 'card mb-6 border-black' }, [
        createElement('h2', { className: 'text-lg mb-4' }, 'Current Mission'),
        ...missionContent
    ]);

    // 3. Level & Progression Section
    const progressionSection = createElement('div', { className: 'card mb-6' }, [
        createElement('div', { className: 'd-flex justify-between align-end mb-2' }, [
            createElement('h2', { className: 'text-2xl m-0' }, `Level ${progression.level}`),
            createElement('span', { className: 'text-sm font-bold' }, `${progression.currentXp} / ${progression.nextLevelXp} XP`)
        ]),
        createElement('div', { className: 'progress-bar bg-gray-300' }, [
            createElement('div', { className: 'progress-fill', style: `width: ${progression.percentage}%; background-color: var(--theme-accent); transition: background-color var(--transition-normal);` })
        ])
    ]);

    // 4. Journey Progress Section
    let journeySection;
    if (journey) {
        journeySection = createElement('div', { className: 'card mb-6' }, [
            createElement('h2', { className: 'text-lg mb-4' }, journey.journeyName),
            createElement('div', { className: 'd-flex justify-between align-center mb-2' }, [
                createElement('span', { className: 'font-bold' }, 'Progress'),
                createElement('span', { className: 'text-sm' }, `${journey.completedQuests} / ${journey.totalQuests} Quests`)
            ]),
            createElement('div', { className: 'progress-bar bg-gray-300' }, [
                createElement('div', { className: 'progress-fill', style: `width: ${journey.percentage}%; background-color: var(--theme-accent); transition: background-color var(--transition-normal);` })
            ])
        ]);
    } else {
        journeySection = createElement('div', { className: 'card mb-6 text-gray' }, 'No active journey.');
    }

    // 5. Achievements Section
    let achievementsContent;
    if (achievements && achievements.length > 0) {
        achievementsContent = createElement('div', { className: 'grid grid-cols-1 md-grid-cols-2 gap-4' }, achievements.map(ach => {
            const isUnlocked = ach.isUnlocked;
            
            return createElement('div', { 
                className: `card d-flex align-center gap-4 ${isUnlocked ? 'card-interactive' : ''}`, 
                style: isUnlocked ? 'border: 3px solid var(--color-black);' : 'opacity: 0.6; filter: grayscale(1); border: 2px dashed var(--color-gray-400);' 
            }, [
                createElement('div', { className: 'p-3 rounded-full', style: `border-radius: var(--radius-md); background-color: ${isUnlocked ? 'var(--color-primary)' : 'var(--color-gray-300)'}; transition: background-color var(--transition-normal); border: 2px solid var(--color-black);` }, [
                    createElement('i', { className: `${isUnlocked ? ach.icon : 'ph-lock'} text-2xl ${isUnlocked ? 'text-black' : ''}` })
                ]),
                createElement('div', {}, [
                    createElement('h4', { className: 'm-0' }, ach.title),
                    createElement('p', { className: 'text-xs text-gray m-0 mt-1' }, ach.description),
                    createElement('span', { className: 'text-xs font-bold mt-2 d-inline-block', style: 'color: var(--color-primary); text-transform: uppercase;' }, ach.rarity)
                ])
            ]);
        }));
    } else {
        achievementsContent = createElement('div', { className: 'card text-center text-gray p-8' }, 'No achievements yet. Complete your first quest to unlock one.');
    }

    const achievementsSection = createElement('div', { className: 'mb-6' }, [
        createElement('h2', { className: 'text-2xl mb-4' }, 'Achievements'),
        achievementsContent
    ]);

    // 6. Player Statistics Section
    const statsSection = createElement('div', { className: 'mb-6' }, [
        createElement('h2', { className: 'text-2xl mb-4' }, 'Statistics'),
        createElement('div', { className: 'grid grid-cols-2 gap-4' }, [
            createElement('div', { className: 'card text-center' }, [
                createElement('h3', { className: 'text-4xl m-0', style: 'color: var(--theme-accent); transition: color var(--transition-normal);' }, statistics.totalXp),
                createElement('p', { className: 'text-gray text-sm font-bold m-0 mt-2 uppercase' }, 'Total XP')
            ]),
            createElement('div', { className: 'card text-center' }, [
                createElement('h3', { className: 'text-4xl m-0', style: 'color: var(--theme-accent); transition: color var(--transition-normal);' }, statistics.completedQuests),
                createElement('p', { className: 'text-gray text-sm font-bold m-0 mt-2 uppercase' }, 'Quests Done')
            ])
        ])
    ]);

    // 7. Account Section
    const accountSection = createElement('div', { className: 'card mb-6' }, [
        createElement('h2', { className: 'text-lg mb-4' }, 'Account Details'),
        createElement('div', { className: 'd-flex flex-column gap-2' }, [
            createElement('div', { className: 'd-flex justify-between' }, [
                createElement('span', { className: 'font-bold' }, 'Email'),
                createElement('span', { className: 'text-gray' }, account.email)
            ])
        ])
    ]);

    return createElement('div', { className: 'animate-fade-in pb-8', style: 'max-width: 800px; margin: 0 auto;' }, [
        createElement('h1', { className: 'text-3xl mb-6' }, 'Character Profile'),
        identitySection,
        missionSection,
        progressionSection,
        journeySection,
        achievementsSection,
        statsSection,
        accountSection
    ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/profile');
    return layout.render();
  }
}
