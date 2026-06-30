// js/views/LoginView.js
import { createElement } from '../utils/dom.js';
import { authService } from '../services/authService.js';
import { router } from '../router.js';
import { LoginBackground } from '../components/LoginBackground.js';

export class LoginView {
  constructor() {
    this.handleEmailLogin = this.handleEmailLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.toggleAdminForm = this.toggleAdminForm.bind(this);
    this.isLoading = false;
    this.showAdminForm = false;
    this.bg = null;
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

    const googleSection = createElement('div', { className: 'mb-4 text-center' }, [
      createElement('button', { 
        id: 'google-login-btn',
        className: 'btn btn-white w-100 p-3 btn-google mb-4',
        onclick: this.handleGoogleLogin
      }, [
        createElement('i', { className: 'ph-fill ph-google-logo text-xl' }),
        ' Continue with Google'
      ]),
      // Feature Checklist
      createElement('div', { className: 'd-flex flex-column align-start pl-2' }, [
        createElement('div', { className: 'd-flex align-center gap-2 mb-1 feature-item delay-1 text-xs font-bold' }, [
          createElement('i', { className: 'ph-bold ph-check text-success' }), 'Track Progress'
        ]),
        createElement('div', { className: 'd-flex align-center gap-2 mb-1 feature-item delay-2 text-xs font-bold' }, [
          createElement('i', { className: 'ph-bold ph-check text-success' }), 'Complete Quests'
        ]),
        createElement('div', { className: 'd-flex align-center gap-2 mb-1 feature-item delay-3 text-xs font-bold' }, [
          createElement('i', { className: 'ph-bold ph-check text-success' }), 'Earn XP'
        ]),
        createElement('div', { className: 'd-flex align-center gap-2 feature-item delay-4 text-xs font-bold' }, [
          createElement('i', { className: 'ph-bold ph-check text-success' }), 'Unlock Achievements'
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
            createElement('button', { type: 'submit', id: 'login-btn', className: 'btn btn-secondary w-100 p-2 text-sm' }, 'Login')
          ])
        ])
      : createElement('div', { className: 'mt-4 text-center' }, [
          createElement('button', { 
            className: 'text-gray text-xs font-bold',
            style: 'background: none; border: none; cursor: pointer; text-decoration: underline; opacity: 0.5;',
            onclick: this.toggleAdminForm
          }, 'Admin Login')
        ]);

    const glowA = createElement('div', { className: 'glow-a' });

    return createElement('div', { className: 'centered-layout relative z-0' }, [
      glowA,
      createElement('div', { className: 'card auth-card animate-pop-in z-10' }, [
        createElement('div', { className: 'auth-header mb-5' }, [
          createElement('h1', { className: 'text-3xl m-0 mb-3' }, [
            createElement('i', { className: 'ph-fill ph-sword text-primary' }),
            ' LevelUp'
          ]),
          createElement('h2', { className: 'text-xl m-0 mb-1' }, 'Build real skills.'),
          createElement('p', { className: 'text-gray m-0 text-sm font-bold' }, 'Progress starts with one quest.')
        ]),
        errorContainer,
        googleSection,
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
  }

  unmount() {
    if (this.bg) {
      this.bg.destroy();
      this.bg = null;
    }
  }
}
