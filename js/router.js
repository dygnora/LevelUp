// js/router.js
import { state } from './state.js';

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.appContainer = document.getElementById('app');
    
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  addRoute(path, viewClass, requireAuth = false) {
    this.routes[path] = { viewClass, requireAuth };
  }

  navigate(path) {
    window.location.hash = path;
  }

  async handleRoute() {
    // Wait for auth to be checked initially
    if (!state.get('isAuthChecked')) {
      // Let SplashView handle this until auth resolves
      return;
    }

    const hash = window.location.hash || '#/';
    // Simple exact match for now, later we can add regex for /skill/:id
    let matchedPath = null;
    let params = {};
    
    for (const routePath in this.routes) {
      if (routePath.includes(':')) {
        // Dynamic route matching
        const routeParts = routePath.split('/');
        const hashParts = hash.split('/');
        
        if (routeParts.length === hashParts.length) {
          let match = true;
          for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
              params[routeParts[i].substring(1)] = hashParts[i];
            } else if (routeParts[i] !== hashParts[i]) {
              match = false;
              break;
            }
          }
          if (match) {
            matchedPath = routePath;
            break;
          }
        }
      } else if (routePath === hash) {
        matchedPath = routePath;
        break;
      }
    }

    // Default to splash if not found
    if (!matchedPath) matchedPath = '#/';

    const route = this.routes[matchedPath];
    const user = state.get('user');
    const character = state.get('character');

    // Routing Logic & Guards
    if (route.requireAuth && !user) {
      this.navigate('#/login');
      return;
    }
    
    if (!user && matchedPath === '#/') {
      this.navigate('#/login');
      return;
    }
    
    if (user && !character) {
      if (matchedPath !== '#/onboarding' && matchedPath !== '#/choose-journey') {
        // Authenticated but no character created
        this.navigate('#/onboarding');
        return;
      }
    }

    if (user && character && (matchedPath === '#/login' || matchedPath === '#/register' || matchedPath === '#/')) {
      // Already logged in and set up
      this.navigate('#/home');
      return;
    }

    // Unmount previous view
    if (this.currentView && typeof this.currentView.unmount === 'function') {
      this.currentView.unmount();
    }

    // Mount new view
    const ViewClass = route.viewClass;
    this.currentView = new ViewClass(params);
    
    // Clear container
    while (this.appContainer.firstChild) {
      this.appContainer.removeChild(this.appContainer.firstChild);
    }
    
    // Render and append
    const element = await this.currentView.render();
    this.appContainer.appendChild(element);
    
    // Call post-render hook if exists
    if (typeof this.currentView.postRender === 'function') {
      this.currentView.postRender();
    }
  }
}

export const router = new Router();
