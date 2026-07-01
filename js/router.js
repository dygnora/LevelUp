// js/router.js
import { state } from './state.js';

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.appContainer = document.getElementById('app');
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());

    // Intercept global link clicks to support old '/' links gracefully
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
  }

  addRoute(path, viewClass, requireAuth = false) {
    this.routes[path] = { viewClass, requireAuth };
  }

  navigate(path) {
    // Standardize path format
    if (!path.startsWith('/')) path = '/' + path;
    
    if (window.location.hash !== `#${path}`) {
      window.location.hash = path;
    } else {
      this.handleRoute(); // Manually trigger if navigating to same route programmatically
    }
  }

  async handleRoute() {
    // Wait for auth to be checked initially
    if (!state.get('isAuthChecked')) {
      return;
    }

    let path = window.location.hash.slice(1) || '/';
    // Remove query params if any
    if (path.includes('?')) path = path.split('?')[0];
    let matchedPath = null;
    let params = {};
    
    for (const routePath in this.routes) {
      if (routePath.includes(':')) {
        const routeParts = routePath.split('/').filter(Boolean);
        const pathParts = path.split('/').filter(Boolean);
        
        if (routeParts.length === pathParts.length) {
          let match = true;
          for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
              params[routeParts[i].substring(1)] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
              match = false;
              break;
            }
          }
          if (match) {
            matchedPath = routePath;
            break;
          }
        }
      } else if (routePath === path) {
        matchedPath = routePath;
        break;
      }
    }

    // Default to splash if not found
    if (!matchedPath) matchedPath = '/';

    const route = this.routes[matchedPath];
    const user = state.get('user');
    const character = state.get('character');

    // Routing Logic & Guards
    if (route && route.requireAuth && !user) {
      this.navigate('/login');
      return;
    }
    
    if (!user && matchedPath === '/') {
      this.navigate('/login');
      return;
    }
    
    if (user && !character) {
      if (matchedPath !== '/onboarding' && matchedPath !== '/choose-journey') {
        this.navigate('/onboarding');
        return;
      }
    }

    if (user && character && (matchedPath === '/login' || matchedPath === '/register' || matchedPath === '/')) {
      this.navigate('/home');
      return;
    }

    if (!route) return;

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
