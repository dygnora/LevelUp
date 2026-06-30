// js/views/LoginView.js
import { createElement } from '../utils/dom.js';
import { authService } from '../services/authService.js';
import { router } from '../router.js';
import { LoginBackground } from '../components/LoginBackground.js';
import { themeManager } from '../managers/ThemeManager.js';

export class LoginView {
  constructor() {
    this.handleEmailLogin = this.handleEmailLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.toggleAdminForm = this.toggleAdminForm.bind(this);
    this.isLoading = false;
    this.showAdminForm = false;
    this.bg = null;
    this.unsubscribeTheme = null;
  }

  async handleGoogleLogin() {
    if (this.isLoading) return;
    
    const errorContainer = document.getElementById('login-error');
    const googleBtn = document.getElementById('google-login-btn');
    const authCard = document.querySelector('.auth-card');
    const bgContainer = document.querySelector('.login-bg-container');
    
    try {
      this.isLoading = true;
      googleBtn.textContent = 'Connecting...';
      googleBtn.disabled = true;
      errorContainer.textContent = '';
      errorContainer.classList.add('hide');

      // Phase 5: Polish Transition
      if (authCard) {
        authCard.style.transition = 'transform 0.3s ease';
        authCard.style.transform = 'scale(0.98)';
      }
      if (bgContainer) {
        bgContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        bgContainer.style.opacity = '0.5';
        bgContainer.style.transform = 'scale(1.02)';
      }

      await authService.loginWithGoogle();
      // Router will automatically redirect based on auth state changes
    } catch (error) {
      this.isLoading = false;
      googleBtn.innerHTML = '<i class="ph-fill ph-google-logo text-xl"></i> Continue with Google';
      googleBtn.disabled = false;
      errorContainer.textContent = error.message || 'Google login failed. Please try again.';
      errorContainer.classList.remove('hide');

      // Revert Phase 5 Polish
      if (authCard) authCard.style.transform = 'scale(1)';
      if (bgContainer) {
        bgContainer.style.opacity = '1';
        bgContainer.style.transform = 'scale(1)';
      }
    }
  }

  async handleEmailLogin(e) {
    e.preventDefault();
    if (this.isLoading) return;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorContainer = document.getElementById('login-error');
    const submitBtn = document.getElementById('login-btn');

    try {
      this.isLoading = true;
      submitBtn.textContent = 'Logging in...';
      submitBtn.disabled = true;
      errorContainer.textContent = '';
      errorContainer.classList.add('hide');

      await authService.login(email, password);
    } catch (error) {
      this.isLoading = false;
      submitBtn.textContent = 'Admin Login';
      submitBtn.disabled = false;
      errorContainer.textContent = error.message || 'Failed to login. Please try again.';
      errorContainer.classList.remove('hide');
    }
  }

  toggleAdminForm() {
    this.showAdminForm = !this.showAdminForm;
    this.reRender();
  }

  reRender() {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      while (appContainer.firstChild) {
        appContainer.removeChild(appContainer.firstChild);
      }
      appContainer.appendChild(this.renderContent());
    }
  }

  renderContent() {
    const errorContainer = createElement('div', { 
      id: 'login-error', 
      className: 'text-danger mb-4 font-bold text-sm hide' 
    });

    const googleBtn = createElement('button', { 
      id: 'google-login-btn',
      className: 'btn btn-primary w-100 p-4 btn-google mb-4',
      style: 'font-weight: 800; display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 16px; border-width: 3px;',
      onclick: this.handleGoogleLogin
    }, [
      createElement('i', { className: 'ph-bold ph-google-logo text-xl' }),
      ' Continue with Google'
    ]);

    const featureGrid = createElement('div', { 
      className: 'd-flex flex-wrap mb-6', 
      style: 'gap: 12px;' 
    }, [
      createElement('div', { className: 'feature-card' }, [
        createElement('i', { className: 'ph-bold ph-trend-up text-primary text-xl' }), 'XP Progress'
      ]),
      createElement('div', { className: 'feature-card' }, [
        createElement('i', { className: 'ph-bold ph-tree-structure text-primary text-xl' }), 'Skill Tree'
      ]),
      createElement('div', { className: 'feature-card' }, [
        createElement('i', { className: 'ph-bold ph-medal text-primary text-xl' }), 'Achievements'
      ]),
      createElement('div', { className: 'feature-card' }, [
        createElement('i', { className: 'ph-bold ph-target text-primary text-xl' }), 'Learning Paths'
      ])
    ]);

    const socialProof = createElement('div', { className: 'd-flex align-center gap-6 mt-2 pt-4', style: 'border-top: 2px dashed var(--border-color);' }, [
      createElement('div', {}, [
        createElement('h4', { className: 'm-0 text-lg font-bold' }, '500+'),
        createElement('p', { className: 'm-0 text-xs text-gray font-bold uppercase' }, 'Completed Quests')
      ]),
      createElement('div', {}, [
        createElement('h4', { className: 'm-0 text-lg font-bold' }, '120+'),
        createElement('p', { className: 'm-0 text-xs text-gray font-bold uppercase' }, 'Achievements')
      ]),
      createElement('div', {}, [
        createElement('h4', { className: 'm-0 text-lg font-bold' }, '30+'),
        createElement('p', { className: 'm-0 text-xs text-gray font-bold uppercase' }, 'Learning Paths')
      ])
    ]);

    const adminSection = this.showAdminForm 
      ? createElement('div', { className: 'mt-6 p-4 bg-gray-100', style: 'border-radius: var(--radius-md); border: 2px solid var(--border-color);' }, [
          createElement('form', { onsubmit: this.handleEmailLogin }, [
            createElement('div', { className: 'form-group' }, [
              createElement('label', { className: 'form-label text-xs text-gray', for: 'email' }, 'Admin Email'),
              createElement('input', { type: 'email', id: 'email', className: 'form-input', required: 'true' })
            ]),
            createElement('div', { className: 'form-group' }, [
              createElement('label', { className: 'form-label text-xs text-gray', for: 'password' }, 'Password'),
              createElement('input', { type: 'password', id: 'password', className: 'form-input', required: 'true' })
            ]),
            createElement('button', { type: 'submit', id: 'login-btn', className: 'btn btn-secondary w-100', style: 'font-weight: 600;' }, 'Login')
          ])
        ])
      : createElement('div', { className: 'mt-4 text-left' }, [
          createElement('button', { 
            className: 'text-gray text-xs',
            style: 'background: none; border: none; cursor: pointer; text-decoration: underline; opacity: 0.6; font-weight: 500;',
            onclick: this.toggleAdminForm
          }, 'Admin Login')
        ]);

    const leftPanel = createElement('div', { className: 'login-left-panel' }, [
      createElement('h1', { className: 'text-xl m-0', style: 'font-weight: 800; margin-bottom: 32px; display: flex; align-items: center; gap: 8px;' }, [
        createElement('i', { className: 'ph-fill ph-sword text-primary' }),
        'LevelUp'
      ]),
      createElement('h2', { className: 'text-4xl m-0 mb-3', style: 'font-weight: 900; line-height: 1.1; letter-spacing: -1px;' }, 'Visualize your learning. One quest at a time.'),
      createElement('p', { className: 'text-gray m-0 text-base mb-6', style: 'font-weight: 700;' }, 'Turn every study session into visible progress.'),
      errorContainer,
      featureGrid,
      googleBtn,
      socialProof,
      adminSection
    ]);

    const rightPanel = createElement('div', { className: 'login-right-panel' }, [
      createElement('div', { className: 'd-flex justify-between align-center mb-2' }, [
        createElement('span', { className: 'text-xs font-bold uppercase text-gray' }, 'Your Journey Starts Here'),
        createElement('span', { className: 'badge bg-black text-white' }, 'PREVIEW')
      ]),
      // Profile & Level
      createElement('div', { className: 'd-flex justify-between align-center' }, [
        createElement('div', { className: 'd-flex align-center gap-3' }, [
          createElement('div', { className: 'avatar bg-secondary', style: 'width: 56px; height: 56px; border-width: 2px;' }),
          createElement('div', {}, [
            createElement('h3', { className: 'm-0 text-lg font-bold' }, 'Deny'),
            createElement('p', { className: 'm-0 text-xs text-gray font-bold' }, 'Explorer')
          ])
        ]),
        createElement('div', { className: 'text-right' }, [
          createElement('p', { className: 'm-0 text-xs text-gray font-bold uppercase mb-1' }, 'Current Level'),
          createElement('h3', { className: 'm-0 text-2xl font-bold' }, '12')
        ])
      ]),
      // Today's Progress (XP)
      createElement('div', { className: 'card bg-white p-4', style: 'border: 2px solid var(--border-color); box-shadow: 2px 2px 0px var(--color-black);' }, [
        createElement('div', { className: 'd-flex justify-between text-sm font-bold mb-2' }, [
          createElement('span', {}, 'Today\'s Progress'),
          createElement('span', {}, '68%')
        ]),
        createElement('div', { className: 'progress-container', style: 'height: 16px;' }, [
          createElement('div', { className: 'progress-bar', style: 'width: 68%;' })
        ])
      ]),
      // Current Quest
      createElement('div', { className: 'card bg-white p-4', style: 'border: 2px solid var(--border-color); box-shadow: 2px 2px 0px var(--color-black);' }, [
        createElement('div', { className: 'd-flex justify-between align-start' }, [
          createElement('div', {}, [
            createElement('p', { className: 'text-xs text-gray font-bold m-0 mb-1 uppercase' }, 'Current Quest'),
            createElement('h4', { className: 'm-0 text-base font-bold' }, 'Responsive Layout')
          ]),
          createElement('span', { className: 'badge bg-primary text-black' }, '+20 XP')
        ])
      ]),
      // Recent Achievement
      createElement('div', { className: 'card bg-white p-3', style: 'border: 2px solid var(--border-color); box-shadow: 2px 2px 0px var(--color-black); display: flex; align-items: center; gap: 12px;' }, [
        createElement('i', { className: 'ph-fill ph-trophy text-warning text-3xl' }),
        createElement('div', {}, [
          createElement('p', { className: 'text-xs font-bold m-0 uppercase text-gray mb-1' }, 'Recent Achievement'),
          createElement('p', { className: 'text-sm font-bold m-0' }, 'First Commit')
        ])
      ])
    ]);

    return createElement('div', { className: 'centered-layout relative z-0', style: 'padding: 40px 16px; overflow-y: auto;' }, [
      createElement('div', { className: 'glow-a anim-glow-a', style: 'position: fixed;' }),
      createElement('div', { className: 'card auth-card login-card-landscape animate-pop-in z-10', style: 'margin: auto;' }, [
        leftPanel,
        rightPanel
      ])
    ]);
  }

  render() {
    return this.renderContent();
  }

  postRender() {
    // Mount background after DOM is ready
    if (!this.bg) {
      this.bg = new LoginBackground();
    }
    const container = document.querySelector('.centered-layout') || document.body;
    this.bg.mount(container);

    // Subscribe to dynamic theme updates
    this.unsubscribeTheme = themeManager.subscribe((theme) => {
      const greetingEl = document.getElementById('dynamic-greeting');
      if (greetingEl) {
        greetingEl.textContent = theme.greeting;
      }
    });
  }

  unmount() {
    if (this.bg) {
      this.bg.destroy();
      this.bg = null;
    }
    if (this.unsubscribeTheme) {
      this.unsubscribeTheme();
      this.unsubscribeTheme = null;
    }
  }
}
