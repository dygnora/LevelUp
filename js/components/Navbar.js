// js/components/Navbar.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { authService } from '../services/authService.js';
import { router } from '../router.js';

export class Navbar {
  handleLogout() {
    authService.logout().then(() => {
      router.navigate('/login');
    });
  }

  render() {
    const character = state.get('character') || {};
    
    return createElement('header', { className: 'app-header justify-between' }, [
      createElement('div', { className: 'd-flex align-center gap-2' }, [
        // Mobile menu toggle (future)
        createElement('i', { className: 'ph ph-list text-2xl hide-desktop' }),
        createElement('span', { className: 'font-black text-xl text-primary' }, 'LevelUp')
      ]),
      createElement('div', { className: 'd-flex align-center gap-4' }, [
        createElement('div', { className: 'd-flex align-center gap-2' }, [
          createElement('i', { className: 'ph-fill ph-fire text-danger' }),
          createElement('span', { className: 'font-bold text-sm' }, `${character.currentStreak || 0} Day Streak`)
        ]),
        createElement('button', { 
          className: 'btn btn-white', 
          onclick: () => this.handleLogout()
        }, 'Logout')
      ])
    ]);
  }
}
