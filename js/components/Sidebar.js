// js/components/Sidebar.js
import { createElement } from '../utils/dom.js';
import { router } from '../router.js';

export class Sidebar {
  constructor(activePath) {
    this.activePath = activePath;
  }

  render() {
    const navItems = [
      { path: '/home', icon: 'ph-house', label: 'Home' },
      { path: '/journey', icon: 'ph-map-trifold', label: 'Journey' },
      { path: '/profile', icon: 'ph-user', label: 'Character' },
      { path: '/settings', icon: 'ph-gear', label: 'Settings' }
    ];

    const ul = createElement('ul', { className: 'w-100 p-4' });

    navItems.forEach(item => {
      const isActive = this.activePath === item.path;
      
      const li = createElement('li', { className: 'mb-2' }, [
        createElement('a', { 
          href: item.path,
          className: `d-flex align-center gap-2 p-3 font-bold ${isActive ? 'bg-primary' : ''}`,
          style: `border-radius: var(--radius-md); color: var(--color-black); text-decoration: none; ${isActive ? 'border: 2px solid var(--color-black); box-shadow: 2px 2px 0px var(--color-black);' : ''}`
        }, [
          createElement('i', { className: `${isActive ? 'ph-fill' : 'ph'} ${item.icon} text-lg` }),
          item.label
        ])
      ]);
      
      ul.appendChild(li);
    });

    return createElement('aside', { className: 'app-sidebar' }, [
      createElement('div', { className: 'p-6 pb-2 text-center' }, [
        createElement('h2', { className: 'text-2xl m-0' }, [
          createElement('i', { className: 'ph-fill ph-sword text-primary' }),
          ' LevelUp'
        ])
      ]),
      ul
    ]);
  }
}
