// js/views/RegisterView.js
import { createElement } from '../utils/dom.js';
import { authService } from '../services/authService.js';
import { router } from '../router.js';

export class RegisterView {
  constructor() {
    this.handleRegister = this.handleRegister.bind(this);
    this.isLoading = false;
  }

  async handleRegister(e) {
    e.preventDefault();
    if (this.isLoading) return;

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorContainer = document.getElementById('register-error');
    const submitBtn = document.getElementById('register-btn');

    if (password !== confirmPassword) {
      errorContainer.textContent = 'Passwords do not match.';
      errorContainer.classList.remove('hide');
      return;
    }

    try {
      this.isLoading = true;
      submitBtn.textContent = 'Creating Character...';
      submitBtn.disabled = true;
      errorContainer.textContent = '';
      errorContainer.classList.add('hide');

      await authService.register(email, password, username);
      // Router will automatically handle redirecting based on auth state changes
    } catch (error) {
      this.isLoading = false;
      submitBtn.textContent = 'Create Character';
      submitBtn.disabled = false;
      errorContainer.textContent = error.message || 'Failed to register. Please try again.';
      errorContainer.classList.remove('hide');
    }
  }

  render() {
    return createElement('div', { className: 'centered-layout' }, [
      createElement('div', { className: 'card auth-card animate-pop-in' }, [
        createElement('div', { className: 'auth-header' }, [
          createElement('h1', { className: 'text-3xl' }, 'Join the Adventure'),
          createElement('p', { className: 'text-gray' }, 'Start your journey to master new skills today.')
        ]),
        createElement('form', { onsubmit: this.handleRegister }, [
          createElement('div', { className: 'form-group' }, [
            createElement('label', { className: 'form-label', for: 'username' }, 'Username'),
            createElement('input', { 
              type: 'text', 
              id: 'username', 
              className: 'form-input', 
              required: 'true',
              placeholder: 'Your adventurer name' 
            })
          ]),
          createElement('div', { className: 'form-group' }, [
            createElement('label', { className: 'form-label', for: 'email' }, 'Email'),
            createElement('input', { 
              type: 'email', 
              id: 'email', 
              className: 'form-input', 
              required: 'true',
              placeholder: 'adventurer@example.com' 
            })
          ]),
          createElement('div', { className: 'form-group' }, [
            createElement('label', { className: 'form-label', for: 'password' }, 'Password'),
            createElement('input', { 
              type: 'password', 
              id: 'password', 
              className: 'form-input', 
              required: 'true',
              placeholder: 'Create a password'
            })
          ]),
          createElement('div', { className: 'form-group' }, [
            createElement('label', { className: 'form-label', for: 'confirm-password' }, 'Confirm Password'),
            createElement('input', { 
              type: 'password', 
              id: 'confirm-password', 
              className: 'form-input', 
              required: 'true',
              placeholder: 'Confirm your password'
            })
          ]),
          createElement('div', { id: 'register-error', className: 'text-danger mb-4 font-bold text-center hide text-sm' }),
          createElement('button', { 
            type: 'submit', 
            id: 'register-btn',
            className: 'btn btn-primary w-100' 
          }, 'Create Character'),
          createElement('p', { className: 'text-center mt-4 text-sm font-bold' }, [
            'Already have an account? ',
            createElement('a', { href: '#/login' }, 'Login')
          ])
        ])
      ])
    ]);
  }
}
