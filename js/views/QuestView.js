// js/views/QuestView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { router } from '../router.js';
import { progressionEngine, PROGRESSION_STATES } from '../services/ProgressionEngine.js';

export class QuestView {
  constructor() {
    this.quizAnswers = {};
    this.submissionValue = '';
  }

  handleAction(actionType) {
    const character = state.get('character');
    const questId = character?.progress?.currentQuest;
    if (!questId) return;

    if (actionType === 'SUBMIT_PROJECT') {
      if (!this.submissionValue.trim()) {
         alert('Please enter a valid submission URL.');
         return;
      }
      progressionEngine.dispatch('SUBMIT_PROJECT', {
         questId,
         type: 'github', // hardcoded for MVP
         value: this.submissionValue
      });
      this.reRender();
    } else if (actionType === 'PASS_QUIZ') {
      const quest = progressionEngine.getQuest(questId);
      // Validate all answers are correct
      let allCorrect = true;
      quest.quiz.forEach((q, index) => {
         if (this.quizAnswers[index] !== q.correctAnswer) {
            allCorrect = false;
         }
      });
      
      if (!allCorrect) {
         alert('Some answers are incorrect. Please try again!');
         return;
      }

      progressionEngine.dispatch('PASS_QUIZ', {
         questId,
         score: 100,
         attempts: 1
      });
      // Navigate back to home to see the "Mission Complete" or "Next Unlock"
      router.navigate('/home');
    }
  }

  reRender() {
    const root = document.getElementById('app');
    if (root) {
      root.innerHTML = '';
      root.appendChild(this.render());
    }
  }

  renderContent() {
    const context = progressionEngine.getCurrentContext();
    if (!context || !context.quest) {
       return createElement('div', { className: 'p-6 text-center' }, 'No active quest found.');
    }

    const { journey, module, quest, state: questState } = context;

    // Header
    const header = createElement('div', { className: 'mb-8 animate-fade-in' }, [
      createElement('button', { 
         className: 'btn bg-transparent p-0 mb-4 font-bold text-gray d-flex align-center gap-2',
         style: 'border: none; cursor: pointer;',
         onclick: () => router.navigate('/home')
      }, [
         createElement('i', { className: 'ph-bold ph-arrow-left' }),
         'Back to Base Camp'
      ]),
      createElement('div', { className: 'd-flex align-center gap-2 text-sm font-bold text-gray mb-2' }, [
        createElement('span', {}, journey.title),
        createElement('i', { className: 'ph-bold ph-caret-right' }),
        createElement('span', {}, module.title)
      ]),
      createElement('h1', { className: 'text-4xl m-0 font-black mb-2' }, quest.title),
      createElement('div', { className: 'd-flex align-center gap-3 text-sm font-bold' }, [
        createElement('span', { className: 'bg-black text-white px-3 py-1', style: 'border-radius: 20px;' }, quest.difficulty),
        createElement('span', { className: 'd-flex align-center gap-1 text-gray' }, [
           createElement('i', { className: 'ph-bold ph-hourglass-high' }),
           quest.estimatedTime
        ]),
        createElement('span', { className: 'd-flex align-center gap-1 text-warning' }, [
           createElement('i', { className: 'ph-fill ph-star' }),
           `+${quest.rewardXP} XP`
        ])
      ])
    ]);

    // Objective
    const objectiveCard = createElement('div', { 
       className: 'card p-6 mb-6 animate-slide-up delay-100', 
       style: 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); background: var(--color-white);' 
    }, [
       createElement('h3', { className: 'text-xl font-black mb-3 m-0 d-flex align-center gap-2' }, [
          createElement('i', { className: 'ph-bold ph-target text-primary' }),
          'Mission Objective'
       ]),
       createElement('p', { className: 'text-lg m-0', style: 'line-height: 1.6;' }, quest.objective)
    ]);

    // Resources
    let resourcesCard = createElement('div', {}, []);
    if (quest.resources && quest.resources.length > 0) {
       resourcesCard = createElement('div', { className: 'mb-8 animate-slide-up delay-200' }, [
          createElement('h3', { className: 'text-lg font-black mb-3' }, 'Required Intel (Resources)'),
          createElement('div', { className: 'd-flex flex-column gap-3' }, quest.resources.map(res => 
             createElement('a', { 
                href: res.url, 
                target: '_blank',
                className: 'card-interactive p-4 d-flex align-center justify-between',
                style: 'border: 2px solid var(--color-black); border-radius: 8px; text-decoration: none; color: var(--color-black); background: var(--color-gray-100);' 
             }, [
                createElement('div', { className: 'd-flex align-center gap-3' }, [
                   createElement('i', { className: 'ph-duotone ph-book-bookmark text-2xl' }),
                   createElement('div', {}, [
                      createElement('div', { className: 'font-bold' }, res.title),
                      createElement('div', { className: 'text-xs text-gray font-bold' }, res.type)
                   ])
                ]),
                createElement('i', { className: 'ph-bold ph-arrow-up-right text-gray' })
             ])
          ))
       ]);
    }

    // Submission (Only if IN_PROGRESS)
    let submissionCard = createElement('div', {}, []);
    if (questState === PROGRESSION_STATES.IN_PROGRESS || questState === PROGRESSION_STATES.AVAILABLE) {
       submissionCard = createElement('div', { 
          className: 'card p-6 mb-8 animate-slide-up delay-300', 
          style: 'border: 3px solid var(--color-black); background: var(--theme-bg); position: relative;' 
       }, [
          createElement('h3', { className: 'text-xl font-black mb-4 m-0 d-flex align-center gap-2 text-white' }, [
             createElement('i', { className: 'ph-bold ph-upload-simple' }),
             'Submit Deliverable'
          ]),
          createElement('div', { className: 'bg-white p-4 mb-4', style: 'border: 2px solid var(--color-black); border-radius: 8px;' }, [
             createElement('label', { className: 'd-block text-sm font-bold mb-2' }, quest.submissionRequirement.label),
             createElement('input', { 
                type: 'url', 
                placeholder: 'https://...',
                className: 'w-100 p-3 font-bold',
                style: 'border: 2px solid var(--color-gray-400); border-radius: 4px; outline: none;',
                oninput: (e) => { this.submissionValue = e.target.value; }
             })
          ]),
          createElement('button', {
             className: 'btn w-100 p-4',
             style: 'background-color: var(--color-black); color: var(--color-white); font-size: 18px; font-weight: 900; border: none; box-shadow: 4px 4px 0px rgba(0,0,0,0.5); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;',
             onclick: () => this.handleAction('SUBMIT_PROJECT'),
             onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = '0 0px 0px rgba(0,0,0,0.5)'; },
             onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px rgba(0,0,0,0.5)'; }
          }, 'SUBMIT MISSION')
       ]);
    } else if (questState === PROGRESSION_STATES.SUBMITTED) {
       submissionCard = createElement('div', { 
          className: 'card p-4 mb-8 text-center animate-fade-in', 
          style: 'border: 2px dashed var(--color-black); background: var(--color-gray-100);' 
       }, [
          createElement('i', { className: 'ph-duotone ph-check-circle text-success text-3xl mb-2' }),
          createElement('h3', { className: 'm-0 font-bold' }, 'Project Submitted!'),
          createElement('p', { className: 'text-sm text-gray m-0 mt-1' }, 'Scroll down to take the final quiz.')
       ]);
    }

    // Quiz (Only if SUBMITTED)
    let quizCard = createElement('div', {}, []);
    if (questState === PROGRESSION_STATES.SUBMITTED && quest.quiz && quest.quiz.length > 0) {
       quizCard = createElement('div', { 
          className: 'card p-6 mb-8 animate-slide-up delay-400', 
          style: 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); background: var(--color-white);' 
       }, [
          createElement('h3', { className: 'text-xl font-black mb-4 m-0 d-flex align-center gap-2' }, [
             createElement('i', { className: 'ph-bold ph-exam text-primary' }),
             'Knowledge Check'
          ]),
          createElement('div', { className: 'd-flex flex-column gap-6 mb-6' }, quest.quiz.map((q, index) => 
             createElement('div', {}, [
                createElement('p', { className: 'font-bold mb-3' }, `${index + 1}. ${q.question}`),
                createElement('div', { className: 'd-flex flex-column gap-2' }, q.options.map((opt, optIndex) => 
                   createElement('label', { 
                      className: 'd-flex align-center gap-3 p-3 card-interactive', 
                      style: 'border: 2px solid var(--color-black); border-radius: 8px; cursor: pointer; background: var(--color-gray-100);' 
                   }, [
                      createElement('input', { 
                         type: 'radio', 
                         name: `quiz-${index}`, 
                         value: optIndex,
                         onchange: () => { this.quizAnswers[index] = optIndex; }
                      }),
                      createElement('span', { className: 'font-bold' }, opt)
                   ])
                ))
             ])
          )),
          createElement('button', {
             className: 'btn w-100 p-4',
             style: 'background-color: var(--color-warning); color: var(--color-black); font-size: 18px; font-weight: 900; border: 3px solid var(--color-black); box-shadow: 4px 4px 0px var(--color-black); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;',
             onclick: () => this.handleAction('PASS_QUIZ'),
             onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = '0 0px 0px var(--color-black)'; },
             onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-black)'; }
          }, 'COMPLETE QUEST')
       ]);
    } else if (questState !== PROGRESSION_STATES.COMPLETED) {
       quizCard = createElement('div', { className: 'card p-4 text-center opacity-50', style: 'border: 2px dashed var(--color-gray-400);' }, [
          createElement('i', { className: 'ph-bold ph-lock-key text-2xl text-gray mb-2' }),
          createElement('p', { className: 'font-bold m-0 text-gray' }, 'Quiz unlocks after submission')
       ]);
    }

    // CSS Utilities
    const style = createElement('style', {}, `
      .max-w-700 { max-width: 700px; margin: 0 auto; }
      .bg-white { background-color: var(--color-white); }
      .bg-black { background-color: var(--color-black); }
      .text-white { color: var(--color-white); }
    `);
    document.head.appendChild(style);

    return createElement('div', { className: 'animate-fade-in max-w-700 mt-4' }, [
      header,
      objectiveCard,
      resourcesCard,
      submissionCard,
      quizCard
    ]);
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/quest');
    return layout.render();
  }
}
