// js/views/ProfileView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { progressionEngine } from '../services/ProgressionEngine.js';

export class ProfileView {
  renderContent() {
    const profile = progressionEngine.getPlayerProfile();
    
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

    const identitySection = createElement('div', { className: 'card bg-primary text-center d-flex flex-column align-center mb-6' }, [
        avatarEl,
        createElement('h2', { className: 'text-2xl m-0' }, identity.displayName),
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
            createElement('span', { className: 'badge bg-secondary text-black mt-3' }, mission.status)
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
            createElement('div', { className: 'progress-fill bg-success', style: `width: ${progression.percentage}%;` })
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
                createElement('div', { className: 'progress-fill bg-primary', style: `width: ${journey.percentage}%;` })
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
            const progressEl = (!isUnlocked && ach.progress) ? createElement('p', { className: 'text-xs font-bold mt-2' }, ach.progress) : null;
            
            return createElement('div', { 
                className: `card d-flex align-center gap-4 ${isUnlocked ? 'card-interactive' : ''}`, 
                style: isUnlocked ? '' : 'opacity: 0.6; filter: grayscale(1);' 
            }, [
                createElement('div', { className: `p-3 rounded-full ${isUnlocked ? 'bg-primary' : 'bg-gray-300'}`, style: 'border-radius: var(--radius-md);' }, [
                    createElement('i', { className: `${isUnlocked ? ach.icon : 'ph-lock'} text-2xl` })
                ]),
                createElement('div', {}, [
                    createElement('h4', { className: 'm-0' }, ach.name),
                    createElement('p', { className: 'text-xs text-gray m-0 mt-1' }, ach.desc),
                    progressEl
                ].filter(Boolean))
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
                createElement('h3', { className: 'text-4xl text-secondary m-0' }, statistics.totalXp),
                createElement('p', { className: 'text-gray text-sm font-bold m-0 mt-2 uppercase' }, 'Total XP')
            ]),
            createElement('div', { className: 'card text-center' }, [
                createElement('h3', { className: 'text-4xl text-success m-0' }, statistics.completedQuests),
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
