// js/views/SettingsView.js
import { createElement } from '../utils/dom.js';
import { AppLayout } from '../components/AppLayout.js';

export class SettingsView {
  renderContent() {
    return createElement('div', { className: 'animate-fade-in' }, [
      createElement('h1', { className: 'text-3xl mb-6' }, 'Settings'),
      createElement('div', { className: 'card max-w-md mb-6' }, [
        createElement('h3', { className: 'text-xl' }, 'Account Preferences'),
        createElement('div', { className: 'form-group mt-4' }, [
          createElement('label', { className: 'form-label' }, 'Change Username'),
          createElement('input', { type: 'text', className: 'form-input', placeholder: 'Enter new username' })
        ]),
        createElement('button', { className: 'btn btn-primary mt-4' }, 'Save Changes')
      ]),
      createElement('div', { className: 'card max-w-md border-danger' }, [
        createElement('h3', { className: 'text-xl text-danger' }, 'Danger Zone'),
        createElement('p', { className: 'text-gray text-sm mb-4' }, 'Once you delete your account, there is no going back. Please be certain.'),
        createElement('button', { className: 'btn btn-secondary' }, 'Delete Account')
      ])
    ]);
  }

  render() {
    const style = createElement('style', {}, `
      .max-w-md { max-width: 600px; }
      .border-danger { border-color: var(--color-danger); }
    `);
    document.head.appendChild(style);

    const layout = new AppLayout(this.renderContent(), '#/settings');
    return layout.render();
  }
}
