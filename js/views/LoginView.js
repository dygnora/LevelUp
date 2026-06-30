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
      className: 'text-danger mb-4 font-bold text-center hide text-sm' 
    });

    const googleBtn = createElement('button', { 
      id: 'google-login-btn',
      className: 'btn btn-primary w-100 p-4 btn-google mb-2',
      style: 'font-weight: 800; display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 16px; border-width: 3px;',
      onclick: this.handleGoogleLogin
    }, [
      createElement('i', { className: 'ph-bold ph-google-logo text-xl' }),
      ' Continue with Google'
    ]);

    const featureGrid = createElement('div', { 
      className: 'd-flex flex-wrap mt-4 mb-6', 
      style: 'gap: 12px; row-gap: 16px; font-weight: 700;' 
    }, [
      createElement('div', { style: 'flex: 1 1 45%; display: flex; align-items: center; gap: 8px;' }, [
        createElement('i', { className: 'ph ph-trend-up text-primary text-2xl' }), 'Track XP'
      ]),
      createElement('div', { style: 'flex: 1 1 45%; display: flex; align-items: center; gap: 8px;' }, [
        createElement('i', { className: 'ph ph-tree-structure text-primary text-2xl' }), 'Skill Tree'
      ]),
      createElement('div', { style: 'flex: 1 1 45%; display: flex; align-items: center; gap: 8px;' }, [
        createElement('i', { className: 'ph ph-medal text-primary text-2xl' }), 'Achievements'
      ]),
      createElement('div', { style: 'flex: 1 1 45%; display: flex; align-items: center; gap: 8px;' }, [
        createElement('i', { className: 'ph ph-target text-primary text-2xl' }), 'Learning Paths'
      ])
    ]);

    const demoPreview = createElement('div', { className: 'demo-preview mt-4' }, [
      // Character Info
      createElement('div', { className: 'd-flex justify-between align-center mb-4' }, [
        createElement('div', { className: 'd-flex align-center gap-3' }, [
          createElement('div', { className: 'avatar bg-secondary', style: 'width: 48px; height: 48px; border-width: 2px;' }),
          createElement('div', {}, [
            createElement('h3', { className: 'm-0 text-base font-bold' }, 'Level 12'),
            createElement('p', { className: 'm-0 text-xs text-gray font-bold' }, 'Explorer')
          ])
        ]),
        createElement('div', { className: 'text-right' }, [
          createElement('span', { className: 'badge bg-warning text-black' }, '🔥 7 Day Streak')
        ])
      ]),
      // XP Bar
      createElement('div', { className: 'mb-4' }, [
        createElement('div', { className: 'd-flex justify-between text-xs font-bold mb-2' }, [
          createElement('span', {}, 'XP Progress'),
          createElement('span', {}, '560 / 700 XP')
        ]),
        createElement('div', { className: 'progress-container', style: 'height: 16px;' }, [
          createElement('div', { className: 'progress-bar', style: 'width: 80%;' })
        ])
      ]),
      // Mock Quest Card
      createElement('div', { className: 'card bg-white p-3', style: 'border: 2px solid var(--border-color); box-shadow: 2px 2px 0px var(--color-black);' }, [
        createElement('div', { className: 'd-flex justify-between align-center' }, [
          createElement('div', {}, [
            createElement('p', { className: 'text-xs text-gray font-bold m-0 mb-1 uppercase' }, 'Current Quest'),
            createElement('h4', { className: 'm-0 text-sm font-bold' }, 'Build Responsive Layout')
          ]),
          createElement('span', { className: 'badge bg-primary text-black' }, '+20 XP')
        ])
      ]),
      // Achievement badge snippet
      createElement('div', { className: 'd-flex align-center gap-3 mt-4 p-3 bg-gray-100', style: 'border-radius: var(--radius-sm); border: 2px solid var(--border-color);' }, [
        createElement('i', { className: 'ph-fill ph-trophy text-warning text-2xl' }),
        createElement('div', {}, [
          createElement('p', { className: 'text-xs font-bold m-0 uppercase text-gray mb-1' }, 'Achievement Unlocked'),
          createElement('p', { className: 'text-sm font-bold m-0' }, 'First Quest Completed')
        ])
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
      : createElement('div', { className: 'mt-6 text-center' }, [
          createElement('button', { 
            className: 'text-gray text-xs',
            style: 'background: none; border: none; cursor: pointer; text-decoration: underline; opacity: 0.6; font-weight: 500;',
            onclick: this.toggleAdminForm
          }, 'Admin Login')
        ]);

    return createElement('div', { className: 'centered-layout relative z-0', style: 'padding: 40px 16px; align-items: flex-start; overflow-y: auto;' }, [
      createElement('div', { className: 'glow-a anim-glow-a', style: 'position: fixed;' }),
      createElement('div', { className: 'card auth-card login-card-wide animate-pop-in z-10 p-6', style: 'margin: auto;' }, [
        // Hero Header
        createElement('div', { className: 'auth-header text-left mb-6' }, [
          createElement('h1', { className: 'text-xl m-0', style: 'font-weight: 800; margin-bottom: 32px; display: flex; align-items: center; gap: 8px;' }, [
            createElement('i', { className: 'ph-fill ph-sword text-primary' }),
            'LevelUp'
          ]),
          createElement('h2', { className: 'text-3xl m-0 mb-3', style: 'font-weight: 900; line-height: 1.1; letter-spacing: -0.5px;' }, 'Don\'t just learn. Level up.'),
          createElement('p', { className: 'text-gray m-0 text-base mb-5', style: 'font-weight: 700;' }, 'Track every learning session. See your progress grow.'),
          createElement('div', { className: 'p-4 bg-gray-100', style: 'border-left: 4px solid var(--color-primary); border-radius: 0 var(--radius-sm) var(--radius-sm) 0;' }, [
            createElement('p', { className: 'text-sm text-gray m-0', style: 'font-weight: 500; line-height: 1.5;' }, 
              'Unlike traditional learning platforms, LevelUp doesn\'t teach you. It helps you stay consistent, track your progress, and visualize your growth.'
            )
          ])
        ]),
        errorContainer,
        // Main Actions
        createElement('div', {}, [
          googleBtn,
          featureGrid,
          demoPreview
        ]),
        // Footer Actions
        adminSection
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
