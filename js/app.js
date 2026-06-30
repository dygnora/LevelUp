import { router } from './router.js';
import { authService } from './services/authService.js';
import { SplashView } from './views/SplashView.js';
import { LoginView } from './views/LoginView.js';
import { OnboardingView } from './views/OnboardingView.js';
import { ChooseJourneyView } from './views/ChooseJourneyView.js';
import { HomeView } from './views/HomeView.js';
import { JourneyView } from './views/JourneyView.js';
import { SkillView } from './views/SkillView.js';
import { QuestView } from './views/QuestView.js';
import { ProfileView } from './views/ProfileView.js';
import { SettingsView } from './views/SettingsView.js';

// Initialize App
function initApp() {
  // Register Routes
  router.addRoute('/', SplashView, false);
  router.addRoute('/login', LoginView, false);
  router.addRoute('/onboarding', OnboardingView, true);
  router.addRoute('/choose-journey', ChooseJourneyView, true);
  router.addRoute('/home', HomeView, true);
  router.addRoute('/journey', JourneyView, true);
  router.addRoute('/skill/:id', SkillView, true);
  router.addRoute('/quest/:id', QuestView, true);
  router.addRoute('/profile', ProfileView, true);
  router.addRoute('/settings', SettingsView, true);
  // We will add more routes soon...
  
  // Listen to Auth State
  authService.onAuthStateChanged((user) => {
    // Re-trigger router when auth state resolves
    router.handleRoute();
  });
  
  // Initial render
  router.handleRoute();
}

// Start
document.addEventListener('DOMContentLoaded', initApp);
