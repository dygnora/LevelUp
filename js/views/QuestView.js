// js/views/QuestView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { router } from '../router.js';
import { progressionEngine, PROGRESSION_STATES } from '../services/ProgressionEngine.js';
import { RewardOverlay } from '../components/RewardOverlay.js';

export class QuestView {
  constructor() {
    this.quizAnswers = {};
    this.submissionValue = '';
    this.engineError = null;
  }

  handleAction(actionType) {
    const character = state.get('character');
    const questId = character?.progress?.currentQuest;
    if (!questId) return;
    
    this.engineError = null;
    let result = { success: true };

    if (actionType === 'START_QUEST') {
       result = progressionEngine.dispatch('START_QUEST', { questId });
    } else if (actionType === 'SUBMIT_PROJECT') {
       result = progressionEngine.dispatch('SUBMIT_PROJECT', {
         questId,
         type: 'github',
         value: this.submissionValue
       });
    } else if (actionType === 'SUBMIT_QUIZ') {
       result = progressionEngine.dispatch('SUBMIT_QUIZ', {
         questId,
         answers: this.quizAnswers
       });
    } else if (actionType === 'CLAIM_REWARD') {
       result = progressionEngine.dispatch('CLAIM_REWARD', { questId });
    }

    if (!result.success) {
       this.engineError = result;
    }
    
    this.reRender();
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

    // --- SHARED HEADER ---
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
           `${quest.estimatedMinutes} Minutes`
        ]),
        createElement('span', { className: 'd-flex align-center gap-1 text-warning' }, [
           createElement('i', { className: 'ph-fill ph-star' }),
           `+${quest.rewards.xp} XP`
        ])
      ])
    ]);

    const errorArea = this.engineError ? this._renderError(this.engineError) : createElement('div', {}, []);

    const contentArea = createElement('div', { className: 'w-100' }, [ errorArea ]);

    // --- STATE: AVAILABLE ---
    if (questState === PROGRESSION_STATES.AVAILABLE) {
        contentArea.appendChild(this._renderObjectiveCard(quest));
        contentArea.appendChild(createElement('button', {
             className: 'btn w-100 p-4 mt-6 animate-slide-up delay-200',
             style: 'background-color: var(--color-primary); color: var(--color-black); font-size: 20px; font-weight: 900; border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;',
             onclick: () => this.handleAction('START_QUEST'),
             onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = '0 0px 0px var(--color-black)'; },
             onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-black)'; }
        }, 'START MISSION'));
    }

    // --- STATE: IN_PROGRESS ---
    else if (questState === PROGRESSION_STATES.IN_PROGRESS) {
        contentArea.appendChild(this._renderObjectiveCard(quest));
        if (quest.resourcesRequired !== false) {
           contentArea.appendChild(this._renderResourcesCard(quest));
        }
        contentArea.appendChild(this._renderSubmissionForm(quest));
        if (quest.quizRequired !== false) {
           contentArea.appendChild(this._renderLockedQuiz());
        }
    }

    // --- STATE: SUBMITTED ---
    else if (questState === PROGRESSION_STATES.SUBMITTED) {
        contentArea.appendChild(this._renderObjectiveCard(quest));
        contentArea.appendChild(this._renderSubmittedState());
        contentArea.appendChild(this._renderLockedQuiz());
    }

    // --- STATE: QUIZ_AVAILABLE ---
    else if (questState === PROGRESSION_STATES.QUIZ_AVAILABLE) {
        contentArea.appendChild(this._renderObjectiveCard(quest));
        contentArea.appendChild(this._renderSubmittedState());
        contentArea.appendChild(this._renderQuizForm(quest, questState));
    }

    // --- STATE: REWARD_PENDING ---
    // (We render the QUIZ_AVAILABLE view underneath the modal)
    else if (questState === PROGRESSION_STATES.REWARD_PENDING) {
        contentArea.appendChild(this._renderObjectiveCard(quest));
        if (quest.submissionRequired !== false) {
            contentArea.appendChild(this._renderSubmittedState());
        }
        if (quest.quizRequired !== false) {
            contentArea.appendChild(this._renderQuizForm(quest, questState)); // Render underneath overlay
        }
    }

    // --- COMPLETED ---
    else if (questState === PROGRESSION_STATES.COMPLETED) {
        contentArea.appendChild(this._renderObjectiveCard(quest));
        
        const ctaButtons = [];
        if (quest.nextQuestId) {
            ctaButtons.push(
               createElement('button', { 
                   className: 'btn bg-primary text-black mt-4',
                   style: 'font-weight: 900; box-shadow: 4px 4px 0px var(--color-black); border: 2px solid var(--color-black);',
                   onclick: () => {
                       // Automatically set next quest as active and navigate to it?
                       // Or go back to home. Actually, just go back to home for now where they can start it.
                       router.navigate('/home');
                   }
               }, 'Continue Learning')
            );
        }
        
        ctaButtons.push(
           createElement('button', { 
               className: 'btn bg-black text-white mt-4 ml-4',
               onclick: () => router.navigate('/home')
           }, 'Return to Base')
        );

        contentArea.appendChild(createElement('div', { 
           className: 'card p-6 text-center bg-gray-100', style: 'border: 3px dashed var(--color-gray-400);' 
        }, [
           createElement('i', { className: 'ph-duotone ph-check-circle text-success text-5xl mb-4' }),
           createElement('h2', { className: 'text-2xl m-0' }, 'Mission Completed'),
           createElement('div', { className: 'mt-6 d-flex justify-center' }, ctaButtons)
        ]));
    }

    // CSS Utilities
    const style = createElement('style', {}, `
      .max-w-700 { max-width: 700px; margin: 0 auto; }
      .bg-white { background-color: var(--color-white); }
      .bg-black { background-color: var(--color-black); }
      .text-white { color: var(--color-white); }
    `);
    document.head.appendChild(style);

    const mainContainer = createElement('div', { className: 'animate-fade-in max-w-700 mt-4', style: 'position: relative;' }, [
      header,
      contentArea
    ]);

    // Append Reward Overlay if needed
    if (questState === PROGRESSION_STATES.REWARD_PENDING) {
        const overlay = new RewardOverlay(quest, () => this.handleAction('CLAIM_REWARD'));
        mainContainer.appendChild(overlay.render());
    }

    return mainContainer;
  }

  // --- UI COMPONENT HELPERS ---
  
  _renderError(error) {
      return createElement('div', { 
          className: 'bg-black text-white p-4 mb-6 d-flex align-center gap-3 animate-pop-in',
          style: 'border: 3px solid var(--color-warning); border-radius: 8px;'
      }, [
          createElement('i', { className: 'ph-fill ph-warning-circle text-warning text-3xl' }),
          createElement('div', {}, [
              createElement('div', { className: 'text-sm font-bold text-warning mb-1' }, `ERROR: ${error.code}`),
              createElement('div', { className: 'font-bold' }, error.message)
          ])
      ]);
  }

  _renderObjectiveCard(quest) {
      return createElement('div', { 
         className: 'card p-6 mb-6 animate-slide-up delay-100', 
         style: 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); background: var(--color-white);' 
      }, [
          createElement('h3', { className: 'text-xl font-black mb-3 m-0 d-flex align-center gap-2' }, [
             createElement('i', { className: 'ph-bold ph-target text-primary' }),
             'Mission Objective'
          ]),
          createElement('p', { className: 'text-lg m-0 mb-4', style: 'line-height: 1.6;' }, quest.objective),
          
          quest.whyItMatters ? createElement('div', { 
              className: 'p-4 bg-gray-100 mb-4', 
              style: 'border-radius: 8px; border-left: 4px solid var(--color-primary);'
          }, [
              createElement('div', { className: 'mb-1 text-sm text-gray text-uppercase font-bold' }, 'Why it matters'),
              createElement('div', { style: 'line-height: 1.5;' }, [quest.whyItMatters])
          ]) : createElement('div', {}, []),

          quest.keyConcepts && quest.keyConcepts.length > 0 ? createElement('div', { className: 'mb-4' }, [
              createElement('div', { className: 'mb-2 text-sm text-gray text-uppercase font-bold' }, 'Key Concepts Preview'),
              createElement('div', { className: 'd-flex flex-wrap', style: 'gap: 8px;' }, quest.keyConcepts.map(concept => 
                  createElement('span', { 
                      className: 'px-3 py-1 bg-black text-white font-bold text-xs',
                      style: 'border-radius: 20px;'
                  }, concept)
              ))
          ]) : createElement('div', {}, []),

          quest.learningOutcomes && quest.learningOutcomes.length > 0 ? createElement('div', { className: 'mb-4' }, [
              createElement('div', { className: 'mb-2 text-sm text-gray text-uppercase font-bold' }, 'Learning Outcomes'),
              createElement('ul', { className: 'm-0 text-sm', style: 'list-style-type: disc; padding-left: 20px;' }, quest.learningOutcomes.map(outcome => 
                  createElement('li', { className: 'mb-1' }, [outcome])
              ))
          ]) : createElement('div', {}, []),

          quest.commonMistakes && quest.commonMistakes.length > 0 ? createElement('div', {
              className: 'p-4',
              style: 'background-color: #fff5f5; border-radius: 8px; border: 2px solid #ffc9c9;'
          }, [
              createElement('div', { className: 'mb-2 text-sm text-uppercase font-bold', style: 'color: #e03131;' }, 'Common Mistakes to Avoid'),
              createElement('ul', { className: 'm-0', style: 'color: #c92a2a; list-style-type: disc; padding-left: 20px;' }, quest.commonMistakes.map(mistake => 
                  createElement('li', { className: 'mb-1 font-bold' }, [mistake])
              ))
          ]) : createElement('div', {}, [])
       ]);
  }

  _renderResourcesCard(quest) {
      if (!quest.resources || quest.resources.length === 0) return createElement('div', {}, []);
      return createElement('div', { className: 'mb-8 animate-slide-up delay-200' }, [
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
                      createElement('div', { className: 'text-xs text-gray font-bold d-flex gap-2' }, [
                          createElement('span', { className: 'text-uppercase' }, res.type),
                          createElement('span', {}, '•'),
                          createElement('span', {}, `${res.estimatedMinutes}m`),
                          createElement('span', {}, '•'),
                          createElement('span', {}, res.difficulty)
                      ])
                   ])
                ]),
                createElement('i', { className: 'ph-bold ph-arrow-up-right text-gray' })
             ])
          ))
      ]);
  }

  _renderSubmissionForm(quest) {
      return createElement('div', { 
          className: 'card p-6 mb-8 animate-slide-up delay-300', 
          style: 'border: 3px solid var(--color-black); background: var(--theme-bg);' 
       }, [
          createElement('h3', { className: 'text-xl font-black mb-4 m-0 d-flex align-center gap-2 text-white' }, [
             createElement('i', { className: 'ph-bold ph-upload-simple' }),
             'Submit Deliverable'
          ]),
          createElement('div', { className: 'bg-white p-4 mb-4', style: 'border: 2px solid var(--color-black); border-radius: 8px;' }, [
             
             quest.projectRubric ? createElement('div', { className: 'mb-4' }, [
                 createElement('div', { className: 'font-bold text-sm mb-2 text-primary text-uppercase' }, 'Project Evaluation Rubric:'),
                 createElement('div', { className: 'p-3 bg-gray-100', style: 'border-radius: 6px; font-family: monospace;' }, 
                     quest.projectRubric.map(item => createElement('div', { className: 'd-flex justify-between mb-1' }, [
                         createElement('span', {}, item.criteria),
                         createElement('span', { className: 'font-bold' }, item.percentage)
                     ]))
                 )
             ]) : createElement('div', {}, []),

             quest.submissionRequirement.requirements ? createElement('div', { className: 'mb-4' }, [
                 createElement('div', { className: 'font-bold text-sm mb-2 text-gray text-uppercase' }, 'Requirements:'),
                 createElement('ul', { className: 'm-0 text-sm', style: 'list-style-type: disc; padding-left: 20px;' }, 
                     quest.submissionRequirement.requirements.map(req => createElement('li', { className: 'mb-1 font-bold' }, [req]))
                 )
             ]) : createElement('div', {}, []),

             quest.beforeYouSubmit ? createElement('div', { className: 'mb-4' }, [
                 createElement('div', { className: 'font-bold text-sm mb-2 text-warning text-uppercase' }, 'Before You Submit:'),
                 createElement('ul', { className: 'm-0 pl-0 text-sm', style: 'list-style: none;' }, 
                     quest.beforeYouSubmit.map(check => createElement('li', { className: 'mb-2 d-flex align-center gap-2' }, [
                         createElement('i', { className: 'ph-duotone ph-square' }),
                         createElement('span', { className: 'font-bold' }, check)
                     ]))
                 )
             ]) : createElement('div', {}, []),

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
  }

  _renderSubmittedState() {
      return createElement('div', { 
          className: 'card p-4 mb-8 text-center animate-fade-in', 
          style: 'border: 2px dashed var(--color-black); background: var(--color-gray-100);' 
       }, [
          createElement('i', { className: 'ph-duotone ph-check-circle text-success text-3xl mb-2' }),
          createElement('h3', { className: 'm-0 font-bold' }, 'Project Submitted!'),
          createElement('p', { className: 'text-sm text-gray m-0 mt-1' }, 'Scroll down to take the final quiz.')
       ]);
  }

  _renderLockedQuiz() {
      return createElement('div', { className: 'card p-4 text-center opacity-50', style: 'border: 2px dashed var(--color-gray-400);' }, [
          createElement('i', { className: 'ph-bold ph-lock-key text-2xl text-gray mb-2' }),
          createElement('p', { className: 'font-bold m-0 text-gray' }, 'Quiz unlocks after submission')
      ]);
  }

  _renderQuizForm(quest, questState) {
      if (!quest.quiz || quest.quiz.length === 0) {
          // If a quest has no quiz, directly allow claiming reward after submission
          // For MVP, we assume all quests have a quiz or we simulate an empty one.
          return createElement('div', {}, []);
      }

      const hasSubmitted = questState === PROGRESSION_STATES.REWARD_PENDING || (this.engineError && this.engineError.code === 'QUIZ_FAILED');

      return createElement('div', { 
          className: 'card p-6 mb-8 animate-slide-up', 
          style: 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); background: var(--color-white);' 
       }, [
          createElement('h3', { className: 'text-xl font-black mb-4 m-0 d-flex align-center gap-2' }, [
             createElement('i', { className: 'ph-bold ph-exam text-primary' }),
             'Knowledge Check'
          ]),
          createElement('div', { className: 'd-flex flex-column gap-6 mb-6' }, quest.quiz.map((q, index) => {
             
             let explanationBox = null;
             if (hasSubmitted && this.quizAnswers[index] !== undefined) {
                 const selectedAnswer = this.quizAnswers[index];
                 const isCorrect = selectedAnswer === q.correctAnswer;
                 const boxClass = isCorrect ? 'bg-success text-white' : 'bg-warning text-black';
                 const icon = isCorrect ? 'ph-check-circle' : 'ph-x-circle';
                 explanationBox = createElement('div', {
                     className: `p-3 mt-3 d-flex gap-2 ${boxClass}`,
                     style: 'border-radius: 8px; border: 2px solid var(--color-black);'
                 }, [
                     createElement('i', { className: `ph-fill ${icon} text-xl mt-1` }),
                     createElement('div', {}, [
                         createElement('strong', { className: 'd-block mb-1' }, isCorrect ? 'Correct!' : 'Incorrect.'),
                         createElement('span', { className: 'text-sm font-bold' }, q.explanation)
                     ])
                 ]);
             }

             return createElement('div', {}, [
                createElement('p', { className: 'font-bold mb-3' }, [`${index + 1}. ${q.question}`]),
                createElement('div', { className: 'd-flex flex-column gap-2' }, q.options.map((opt, optIndex) => 
                   createElement('label', { 
                      className: 'd-flex align-center gap-3 p-3 card-interactive', 
                      style: 'border: 2px solid var(--color-black); border-radius: 8px; cursor: pointer; background: var(--color-gray-100);' 
                   }, [
                      createElement('input', { 
                         type: 'radio', 
                         name: `quiz-${index}`, 
                         value: optIndex,
                         checked: this.quizAnswers[index] === optIndex,
                         disabled: questState === PROGRESSION_STATES.REWARD_PENDING,
                         onchange: () => { this.quizAnswers[index] = optIndex; }
                      }),
                      createElement('span', { className: 'font-bold' }, [opt])
                   ])
                )),
                explanationBox ? explanationBox : createElement('span', {}, [])
             ])
          })),
          questState === PROGRESSION_STATES.REWARD_PENDING 
            ? createElement('div', { className: 'text-center font-bold text-success' }, 'Quiz Passed!')
            : createElement('button', {
             className: 'btn w-100 p-4',
             style: 'background-color: var(--color-warning); color: var(--color-black); font-size: 18px; font-weight: 900; border: 3px solid var(--color-black); box-shadow: 4px 4px 0px var(--color-black); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;',
             onclick: () => this.handleAction('SUBMIT_QUIZ'),
             onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = '0 0px 0px var(--color-black)'; },
             onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-black)'; }
          }, 'COMPLETE QUEST')
       ]);
  }



  render() {
    const layout = new AppLayout(this.renderContent(), '/quest');
    return layout.render();
  }
}
