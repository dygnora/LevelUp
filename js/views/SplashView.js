// js/views/SplashView.js
import { createElement } from '../utils/dom.js';

export class SplashView {
  render() {
    return createElement('div', { className: 'splash-container animate-fade-in' }, [
      createElement('div', { className: 'splash-logo' }, [
        createElement('i', { className: 'ph-fill ph-sword text-primary' }),
        ' LevelUp'
      ]),
      createElement('p', { className: 'font-bold' }, 'Loading your adventure...')
    ]);
  }
}
