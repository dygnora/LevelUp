// js/components/AppLayout.js
import { createElement } from '../utils/dom.js';
import { Navbar } from './Navbar.js';
import { Sidebar } from './Sidebar.js';

export class AppLayout {
  constructor(contentElement, activePath) {
    this.contentElement = contentElement;
    this.activePath = activePath;
  }

  render() {
    const navbar = new Navbar().render();
    const sidebar = new Sidebar(this.activePath).render();

    return createElement('div', { className: 'app-layout animate-fade-in' }, [
      sidebar,
      createElement('div', { className: 'app-main' }, [
        navbar,
        createElement('main', { className: 'app-content' }, this.contentElement)
      ])
    ]);
  }
}
