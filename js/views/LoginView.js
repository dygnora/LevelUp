// js/views/LoginView.js
import { createElement } from '../utils/dom.js';
import { authService } from '../services/authService.js';
import { router } from '../router.js';

export class LoginView {
  constructor() {
    this.handleEmailLogin = this.handleEmailLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.toggleAdminForm = this.toggleAdminForm.bind(this);
    this.isLoading = false;
    this.showAdminForm = false;
  }

  async handleGoogleLogin() {
    if (this.isLoading) return;
    
    const errorContainer = document.getElementById('login-error');
    const googleBtn = document.getElementById('google-login-btn');
    
    try {
      this.isLoading = true;
      googleBtn.textContent = 'Connecting...';
      googleBtn.disabled = true;
      errorContainer.textContent = '';
      errorContainer.classList.add('hide');

      await authService.loginWithGoogle();
      // Router will automatically redirect based on auth state changes
    } catch (error) {
      this.isLoading = false;
      googleBtn.innerHTML = '<i class="ph-fill ph-google-logo text-xl"></i> Continue with Google';
      googleBtn.disabled = false;
      errorContainer.textContent = error.message || 'Google login failed. Please try again.';
      errorContainer.classList.remove('hide');
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
      // Router will automatically redirect based on auth state changes
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
      // Clear container and re-render this view
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

    const googleSection = createElement('div', { className: 'mb-6 text-center' }, [
      createElement('p', { className: 'text-gray font-bold mb-4' }, 'Adventurers, start your journey here:'),
      createElement('button', { 
        id: 'google-login-btn',
        className: 'btn btn-white w-100 p-4',
        onclick: this.handleGoogleLogin
      }, [
        createElement('i', { className: 'ph-fill ph-google-logo text-xl' }),
        ' Continue with Google'
      ])
    ]);

    const adminSection = this.showAdminForm 
      ? createElement('div', { className: 'mt-6 p-4 bg-gray-100', style: 'border-radius: var(--radius-md); border: 2px solid var(--border-color);' }, [
          createElement('h3', { className: 'text-lg mb-4 text-center' }, 'Admin Access'),
          createElement('form', { onsubmit: this.handleEmailLogin }, [
            createElement('div', { className: 'form-group' }, [
              createElement('label', { className: 'form-label text-sm', for: 'email' }, 'Admin Email'),
              createElement('input', { 
                type: 'email', 
                id: 'email', 
                className: 'form-input', 
                required: 'true',
                placeholder: 'admin@levelup.com' 
              })
            ]),
            createElement('div', { className: 'form-group' }, [
              createElement('label', { className: 'form-label text-sm', for: 'password' }, 'Password'),
              createElement('input', { 
                type: 'password', 
                id: 'password', 
                className: 'form-input', 
                required: 'true',
                placeholder: 'Enter your password'
              })
            ]),
            createElement('button', { 
              type: 'submit', 
              id: 'login-btn',
              className: 'btn btn-secondary w-100' 
            }, 'Admin Login')
          ])
        ])
      : createElement('div', { className: 'mt-6 text-center' }, [
          createElement('button', { 
            className: 'text-gray text-xs font-bold',
            style: 'background: none; border: none; cursor: pointer; text-decoration: underline;',
            onclick: this.toggleAdminForm
          }, 'Admin Login')
        ]);

    return createElement('div', { className: 'centered-layout' }, [
      createElement('div', { className: 'card auth-card animate-pop-in' }, [
        createElement('div', { className: 'auth-header' }, [
          createElement('h1', { className: 'text-4xl m-0' }, [
            createElement('i', { className: 'ph-fill ph-sword text-primary' }),
            ' LevelUp'
          ]),
          createElement('p', { className: 'text-gray mt-2' }, 'Ready to continue your journey?')
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
}
