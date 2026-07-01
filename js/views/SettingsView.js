import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { themeManager } from '../managers/ThemeManager.js';
import { progressionEngine } from '../services/ProgressionEngine.js';

export class SettingsView {
  renderContent() {
    const theme = themeManager.getCurrentTheme();
    const profile = progressionEngine.getPlayerProfile();

    if (!profile) return createElement('div', { className: 'p-8 text-center' }, 'Loading Settings...');

    const isReducedMotion = localStorage.getItem('reducedMotion') === 'true';

    // 1. Player Preferences
    const preferencesSection = createElement('div', { className: 'card mb-6' }, [
      createElement('h2', { className: 'text-2xl mb-4' }, 'Player Preferences'),
      
      createElement('div', { className: 'mb-4' }, [
        createElement('h3', { className: 'text-lg m-0 mb-1' }, 'Current Theme'),
        createElement('div', { className: 'd-flex align-center justify-between bg-gray-100 p-3 rounded-md' }, [
            createElement('span', { className: 'font-bold' }, theme.name),
            createElement('span', { className: 'text-sm text-gray' }, 'Auto (Dynamic)')
        ]),
        createElement('p', { className: 'text-sm text-gray mt-2 m-0' }, 'Theme changes automatically based on your local time.')
      ]),
      
      createElement('div', { className: 'd-flex align-center justify-between pt-4', style: 'border-top: 2px dashed var(--color-gray-300);' }, [
        createElement('div', {}, [
            createElement('h3', { className: 'text-lg m-0 mb-1' }, 'Reduced Motion'),
            createElement('p', { className: 'text-sm text-gray m-0' }, 'Disable sliding and scaling animations.')
        ]),
        createElement('button', { 
            className: `btn ${isReducedMotion ? 'bg-primary' : 'bg-gray-300'}`,
            style: 'min-width: 80px;',
            onclick: (e) => {
                const newState = localStorage.getItem('reducedMotion') === 'true' ? 'false' : 'true';
                localStorage.setItem('reducedMotion', newState);
                if (newState === 'true') {
                    document.body.classList.add('reduced-motion');
                    e.currentTarget.className = 'btn bg-primary';
                    e.currentTarget.textContent = 'ON';
                } else {
                    document.body.classList.remove('reduced-motion');
                    e.currentTarget.className = 'btn bg-gray-300';
                    e.currentTarget.textContent = 'OFF';
                }
            }
        }, isReducedMotion ? 'ON' : 'OFF')
      ])
    ]);

    // 2. Learning Preferences (Hidden for MVP as requested)

    // 3. Account Information
    const accountSection = createElement('div', { className: 'card mb-6' }, [
        createElement('h2', { className: 'text-2xl mb-4' }, 'Account Information'),
        createElement('div', { className: 'd-flex align-center gap-4 mb-4' }, [
            profile.identity.photoURL 
                ? createElement('img', { src: profile.identity.photoURL, className: 'avatar bg-white', style: 'width: 60px; height: 60px; object-fit: cover;' })
                : createElement('div', { className: 'avatar bg-gray-300 d-flex align-center justify-center', style: 'width: 60px; height: 60px;' }, [
                    createElement('span', { className: 'text-2xl font-bold' }, profile.identity.displayName.charAt(0).toUpperCase())
                  ]),
            createElement('div', {}, [
                createElement('h3', { className: 'text-lg m-0' }, profile.identity.displayName),
                createElement('p', { className: 'text-gray text-sm m-0 mt-1' }, profile.account.email)
            ])
        ]),
        createElement('div', { className: 'bg-gray-100 p-3 rounded-md d-flex justify-between align-center' }, [
            createElement('span', { className: 'font-bold text-sm' }, 'Current Journey'),
            createElement('span', { className: 'text-sm' }, profile.journey ? profile.journey.journeyName : 'None')
        ]),
        createElement('p', { className: 'text-xs text-gray mt-3 m-0 text-center' }, 'Account identity is managed by your authentication provider.')
    ]);

    // 4. About LevelUp
    const aboutSection = createElement('div', { className: 'card mb-6' }, [
        createElement('h2', { className: 'text-2xl mb-4' }, 'About LevelUp'),
        createElement('div', { className: 'd-flex flex-column gap-3' }, [
            this.createAboutRow('Version', 'MVP 1.0'),
            this.createAboutRow('Theme', `${theme.name} (Dynamic)`),
            profile.journey ? this.createAboutRow('Journey', profile.journey.journeyName) : null,
            this.createAboutRow('Signed In', 'Google')
        ].filter(Boolean))
    ]);

    // 5. Danger Zone
    const dangerSection = createElement('div', { className: 'card border-danger' }, [
        createElement('h2', { className: 'text-2xl text-danger mb-4' }, 'Danger Zone'),
        createElement('div', { className: 'd-flex justify-between align-center flex-wrap gap-4' }, [
            createElement('div', { style: 'flex: 1; min-width: 200px;' }, [
                createElement('h3', { className: 'text-lg m-0 mb-1' }, 'Delete Account'),
                createElement('p', { className: 'text-sm text-gray m-0' }, 'Permanently remove all progress and data.')
            ]),
            createElement('button', { 
                className: 'btn bg-danger text-white',
                onclick: () => this.showDeleteDialog()
            }, 'Delete Account')
        ])
    ]);

    return createElement('div', { className: 'animate-fade-in pb-8', style: 'max-width: 900px; margin: 0 auto;' }, [
        createElement('h1', { className: 'text-3xl mb-6' }, 'Settings'),
        preferencesSection,
        accountSection,
        aboutSection,
        dangerSection
    ]);
  }

  createAboutRow(label, value) {
      return createElement('div', { className: 'd-flex justify-between align-center pb-2', style: 'border-bottom: 1px solid var(--color-gray-200);' }, [
          createElement('span', { className: 'font-bold text-sm' }, label),
          createElement('span', { className: 'text-sm text-gray' }, value)
      ]);
  }

  showDeleteDialog() {
      const dialog = createElement('div', { 
          className: 'fixed inset-0 d-flex align-center justify-center p-4',
          style: 'background: rgba(0,0,0,0.5); z-index: 9999; animation: fadeIn 0.2s ease-out forwards;'
      }, [
          createElement('div', { className: 'card max-w-sm w-full animate-pop-in' }, [
              createElement('h2', { className: 'text-2xl text-danger mb-3' }, 'Delete Account?'),
              createElement('p', { className: 'text-sm mb-4' }, 'This will permanently remove:'),
              createElement('ul', { className: 'text-sm text-gray mb-6', style: 'padding-left: 20px; margin-bottom: 24px;' }, [
                  createElement('li', { className: 'mb-1' }, 'Progress'),
                  createElement('li', { className: 'mb-1' }, 'XP'),
                  createElement('li', { className: 'mb-1' }, 'Achievements'),
                  createElement('li', { className: 'mb-1' }, 'Journey Progress')
              ]),
              createElement('p', { className: 'text-sm font-bold mb-6' }, 'This action cannot be undone.'),
              createElement('div', { className: 'd-flex gap-3 justify-end' }, [
                  createElement('button', { 
                      className: 'btn bg-gray-200',
                      onclick: () => document.body.removeChild(dialog)
                  }, 'Cancel'),
                  createElement('button', { 
                      className: 'btn bg-danger text-white',
                      onclick: () => {
                          alert("In MVP, account deletion is not connected to Firebase yet.");
                          document.body.removeChild(dialog);
                      }
                  }, 'Delete Forever')
              ])
          ])
      ]);
      document.body.appendChild(dialog);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/settings');
    return layout.render();
  }
}
