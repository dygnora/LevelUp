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
    this.openWhyModal = this.openWhyModal.bind(this);
    this.closeWhyModal = this.closeWhyModal.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);

    this.isLoading = false;
    this.showAdminForm = false;
    this.isWhyModalOpen = false;
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
      if (googleBtn) {
        googleBtn.textContent = 'Connecting...';
        googleBtn.disabled = true;
      }
      if (errorContainer) {
        errorContainer.textContent = '';
        errorContainer.classList.add('hide');
      }

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
    } catch (error) {
      this.isLoading = false;
      if (googleBtn) {
        googleBtn.innerHTML = '<i class="ph-fill ph-google-logo text-xl"></i> Continue with Google';
        googleBtn.disabled = false;
      }
      if (errorContainer) {
        errorContainer.textContent = error.message || 'Google login failed. Please try again.';
        errorContainer.classList.remove('hide');
      }

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

  openWhyModal() {
    this.isWhyModalOpen = true;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleKeydown);
    this.reRender();
  }

  closeWhyModal(e) {
    if (e) {
      if (e.target.closest('.why-modal-content') && !e.target.closest('.why-modal-close')) {
        return;
      }
    }
    this.isWhyModalOpen = false;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleKeydown);
    this.reRender();
  }

  handleKeydown(e) {
    if (e.key === 'Escape' && this.isWhyModalOpen) {
      this.closeWhyModal();
    }
  }

  reRender() {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      while (appContainer.firstChild) {
        appContainer.removeChild(appContainer.firstChild);
      }
      appContainer.appendChild(this.renderContent());
    }
    // Re-mount background since we destroyed DOM
    if (this.bg && !document.querySelector('.login-bg-container')) {
      const container = document.querySelector('.centered-layout') || document.body;
      this.bg.mount(container);
    }
  }

  renderWhyModal() {
    if (!this.isWhyModalOpen) return null;

    const leftCol = createElement('div', { className: 'why-modal-left' }, [
      createElement('h3', { className: 'text-xl font-bold m-0 mb-6' }, 'Your Journey'),
      createElement('div', { className: 'timeline mb-8' }, [
        this.createTimelineStep('ph-map-trifold', 'Level 1: Start Journey'),
        this.createTimelineStep('ph-sword', 'Level 2: Complete Quests'),
        this.createTimelineStep('ph-trend-up', 'Level 3: Gain XP'),
        this.createTimelineStep('ph-medal', 'Level 4: Unlock Badges'),
        this.createTimelineStep('ph-caret-double-up', 'Level Up', true)
      ]),
      createElement('h2', { className: 'text-2xl font-bold m-0 mb-3' }, 'What is LevelUp?'),
      createElement('p', { className: 'text-gray text-sm m-0', style: 'line-height: 1.6;' }, 
        'LevelUp transforms your learning journey into measurable progress through quests, XP, and skill progression.'
      )
    ]);

    const previewCard = createElement('div', { className: 'card bg-white p-6', style: 'border: 2px solid var(--border-color); box-shadow: 4px 4px 0px var(--color-black); pointer-events: none; user-select: none;' }, [
      createElement('div', { className: 'd-flex justify-between align-center mb-6' }, [
        createElement('h4', { className: 'm-0 text-xl font-bold' }, 'Level 12'),
        createElement('span', { className: 'badge bg-black text-white' }, 'EXPLORER')
      ]),
      createElement('div', { className: 'mb-6' }, [
        createElement('div', { className: 'd-flex justify-between text-sm font-bold mb-2' }, [
          createElement('span', {}, 'XP Progress'),
          createElement('span', {}, '560 / 700 XP')
        ]),
        createElement('div', { className: 'progress-container', style: 'height: 16px;' }, [
          createElement('div', { className: 'progress-bar', style: 'width: 80%;' })
        ])
      ]),
      createElement('div', { className: 'p-4 bg-gray-100', style: 'border-radius: var(--radius-sm); border: 2px solid var(--border-color);' }, [
        createElement('div', { className: 'd-flex justify-between align-center' }, [
          createElement('div', {}, [
            createElement('p', { className: 'text-xs text-gray font-bold m-0 mb-1 uppercase' }, 'Current Quest'),
            createElement('h4', { className: 'm-0 text-base font-bold' }, 'Responsive Layout')
          ]),
          createElement('span', { className: 'badge bg-primary text-black' }, '+20 XP')
        ])
      ])
    ]);

    const rightCol = createElement('div', { className: 'why-modal-right' }, [
      createElement('div', {}, [
        createElement('div', { className: 'd-flex justify-between align-center mb-4' }, [
          createElement('span', { className: 'text-sm font-bold uppercase text-gray' }, 'Inside LevelUp'),
          createElement('span', { className: 'badge bg-black text-white' }, 'PREVIEW')
        ]),
        previewCard
      ]),
      createElement('div', { className: 'mt-6' }, [
        createElement('button', { 
          className: 'btn btn-primary w-100 p-4 btn-google',
          style: 'font-weight: 800; display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 16px; border-width: 3px;',
          onclick: () => {
            this.closeWhyModal();
            this.handleGoogleLogin();
          }
        }, [
          createElement('i', { className: 'ph-bold ph-google-logo text-xl' }),
          ' Continue with Google'
        ])
      ])
    ]);

    const closeBtn = createElement('button', {
      className: 'why-modal-close',
      onclick: this.closeWhyModal,
      'aria-label': 'Close'
    }, [
      createElement('i', { className: 'ph-bold ph-x text-lg' })
    ]);

    const modalContent = createElement('div', { className: 'why-modal-content' }, [
      closeBtn,
      leftCol,
      rightCol
    ]);

    return createElement('div', { 
      className: 'why-modal-overlay',
      onclick: this.closeWhyModal
    }, [modalContent]);
  }

  createTimelineStep(iconClass, text, isLast = false) {
    const iconColorClass = isLast ? 'text-primary' : '';
    return createElement('div', { className: 'timeline-item' }, [
      createElement('div', { className: 'timeline-line', style: 'width: 1px;' }),
      createElement('div', { className: `timeline-icon ${iconColorClass}` }, [
        createElement('i', { className: `ph-bold ${iconClass}` })
      ]),
      createElement('span', { className: 'text-sm font-bold' }, text)
    ]);
  }

  createSignatureProgressLine() {
    return createElement('div', { className: 'signature-progress-line' }, [
      createElement('svg', { viewBox: '0 0 160 12', xmlns: 'http://www.w3.org/2000/svg' }, [
        createElement('line', { x1: '6', y1: '6', x2: '154', y2: '6' }),
        createElement('circle', { cx: '6', cy: '6', r: '4' }),
        createElement('circle', { cx: '55', cy: '6', r: '4' }),
        createElement('circle', { cx: '104', cy: '6', r: '4' }),
        createElement('circle', { className: 'active-glow', cx: '154', cy: '6', r: '6' }),
        createElement('circle', { className: 'active-node', cx: '154', cy: '6', r: '3' })
      ])
    ]);
  }

  renderContent() {
    const errorContainer = createElement('div', { 
      id: 'login-error', 
      className: 'text-danger mb-4 font-bold text-sm hide text-center' 
    });

    const googleBtn = createElement('button', { 
      id: 'google-login-btn',
      className: 'btn btn-primary w-100 p-4 btn-google mb-6',
      style: 'font-weight: 800; display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 16px; border-width: 3px;',
      onclick: this.handleGoogleLogin
    }, [
      createElement('i', { className: 'ph-bold ph-google-logo text-xl' }),
      ' Continue with Google'
    ]);

    const curiosityLink = createElement('div', { className: 'text-center mb-6' }, [
      createElement('p', { className: 'text-xs text-gray font-bold uppercase m-0 mb-2' }, 'Curious?'),
      createElement('button', { 
        className: 'link-subtle',
        onclick: this.openWhyModal
      }, [
        'See how LevelUp works',
        createElement('i', { className: 'ph-bold ph-arrow-right' })
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
      : createElement('div', { className: 'mt-2 text-center' }, [
          createElement('button', { 
            className: 'text-gray text-xs',
            style: 'background: none; border: none; cursor: pointer; text-decoration: underline; opacity: 0.6; font-weight: 500;',
            onclick: this.toggleAdminForm
          }, 'Admin Login')
        ]);

    const wrapper = createElement('div', { className: 'centered-layout relative z-0', style: 'padding: 40px 16px; overflow-y: auto; height: 100vh;' }, [
      createElement('div', { className: 'glow-a anim-glow-a', style: 'position: fixed;' }),
      createElement('div', { className: 'card auth-card login-card-clean animate-pop-in z-10', style: 'margin: auto;' }, [
        createElement('div', { className: 'text-center mb-8' }, [
          createElement('h1', { className: 'text-2xl m-0', style: 'font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px;' }, [
            createElement('i', { className: 'ph-fill ph-sword text-primary' }),
            'LevelUp'
          ]),
          this.createSignatureProgressLine(),
          createElement('h2', { className: 'text-4xl m-0 mb-4', style: 'font-weight: 800; line-height: 1.2; letter-spacing: -0.5px;' }, [
            'See your progress.',
            createElement('br'),
            'Not just your effort.'
          ]),
          createElement('p', { className: 'text-gray m-0 text-lg', style: 'font-weight: 500;' }, 'Every quest counts.')
        ]),
        errorContainer,
        googleBtn,
        curiosityLink,
        adminSection
      ])
    ]);

    const modal = this.renderWhyModal();
    if (modal) {
      wrapper.appendChild(modal);
    }

    return wrapper;
  }

  render() {
    return this.renderContent();
  }

  postRender() {
    if (!this.bg) {
      this.bg = new LoginBackground();
    }
    // Only mount if not already mounted
    if (!document.querySelector('.login-bg-container')) {
      const container = document.querySelector('.centered-layout') || document.body;
      this.bg.mount(container);
    }

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
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleKeydown);
  }
}
