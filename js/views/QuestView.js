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

  handleAction(actionType, payload = null) {
    const character = state.get('character');
    const questId = character?.progress?.currentQuest;
    if (!questId) return;
    
    this.engineError = null;
    let result = { success: true };

    if (actionType === 'START_QUEST') {
       result = progressionEngine.dispatch('START_QUEST', { questId });
    } else if (actionType === 'OPEN_RESOURCE') {
       result = progressionEngine.dispatch('OPEN_RESOURCE', { url: payload });
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
    } else if (result.unlockedAchievements && result.unlockedAchievements.length > 0) {
       import('../components/AchievementToast.js').then(module => {
           module.achievementToast.show(result.unlockedAchievements);
       });
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

    // --- HERO BANNER ---
    const headerBanner = createElement('div', { 
        className: 'w-100 bg-primary text-black animate-fade-in', 
        style: 'border-bottom: 4px solid var(--color-black); box-shadow: 0 6px 0 var(--color-black); margin-bottom: 40px;' 
    }, [
        createElement('div', { className: 'max-w-1200 p-6', style: 'margin: 0 auto;' }, [
            createElement('button', { 
               className: 'btn bg-transparent p-0 mb-4 font-bold text-black d-flex align-center gap-2',
               style: 'border: none; cursor: pointer;',
               onclick: () => router.navigate('/home')
            }, [
               createElement('i', { className: 'ph-bold ph-arrow-left' }),
               'Back to Base Camp'
            ]),
            createElement('div', { className: 'd-flex align-center gap-2 text-sm font-bold mb-2', style: 'color: rgba(0,0,0,0.7);' }, [
              createElement('span', {}, journey.title),
              createElement('i', { className: 'ph-bold ph-caret-right' }),
              createElement('span', {}, module.title)
            ]),
            createElement('h1', { className: 'text-4xl m-0 font-black mb-4', style: 'letter-spacing: -1px;' }, quest.title),
            createElement('div', { className: 'd-flex align-center gap-3 text-sm font-bold flex-wrap' }, [
              createElement('span', { className: 'bg-black text-white px-3 py-1', style: 'border-radius: 20px;' }, quest.difficulty),
              createElement('span', { className: 'd-flex align-center gap-1 bg-white px-3 py-1', style: 'border-radius: 20px; border: 2px solid var(--color-black); box-shadow: 2px 2px 0 var(--color-black);' }, [
                 createElement('i', { className: 'ph-bold ph-hourglass-high' }),
                 `${quest.estimatedMinutes} Minutes`
              ]),
              createElement('span', { className: 'd-flex align-center gap-1 bg-white text-warning px-3 py-1', style: 'border-radius: 20px; border: 2px solid var(--color-black); box-shadow: 2px 2px 0 var(--color-black);' }, [
                 createElement('i', { className: 'ph-fill ph-star' }),
                 `+${quest.rewards.xp} XP`
              ])
            ])
        ])
    ]);

    // --- COLUMNS ---
    const mainCol = createElement('div', { className: 'd-flex flex-column', style: 'flex: 1; min-width: 300px; gap: 24px;' });
    const sidebarCol = createElement('div', { className: 'd-flex flex-column sidebar-col', style: 'width: 350px; flex-shrink: 0; gap: 24px;' });
    const contentGrid = createElement('div', { className: 'd-flex max-w-1200 px-6 pb-12 w-100 flex-wrap', style: 'margin: 0 auto; gap: 32px;' }, [mainCol, sidebarCol]);

    // MAIN CONTENT
    const errorArea = this.engineError ? this._renderError(this.engineError) : null;
    if (errorArea) mainCol.appendChild(errorArea);

    mainCol.appendChild(this._renderObjectiveCard(quest));

    if (questState === PROGRESSION_STATES.IN_PROGRESS) {
        mainCol.appendChild(this._renderSubmissionForm(quest));
        if (quest.quizRequired !== false) mainCol.appendChild(this._renderLockedQuiz());
    } else if (questState === PROGRESSION_STATES.SUBMITTED) {
        if (quest.quizRequired !== false) mainCol.appendChild(this._renderLockedQuiz());
    } else if (questState === PROGRESSION_STATES.QUIZ_AVAILABLE || questState === PROGRESSION_STATES.REWARD_PENDING) {
        if (quest.quizRequired !== false) mainCol.appendChild(this._renderQuizForm(quest, questState));
    } else if (questState === PROGRESSION_STATES.COMPLETED) {
        mainCol.appendChild(this._renderCompletedState(quest));
    }

    // SIDEBAR CONTENT
    sidebarCol.appendChild(this._renderStatusCard(questState, quest));
    if (quest.resourcesRequired !== false && questState !== PROGRESSION_STATES.AVAILABLE) {
       sidebarCol.appendChild(this._renderResourcesCard(quest));
    }

    // CSS Utilities
    const style = createElement('style', {}, `
      .max-w-1200 { max-width: 1200px; margin: 0 auto; }
      .bg-white { background-color: var(--color-white); }
      .bg-black { background-color: var(--color-black); }
      .text-white { color: var(--color-white); }
      @media (max-width: 800px) {
         .sidebar-col { width: 100% !important; order: -1; }
      }
    `);
    document.head.appendChild(style);

    const mainContainer = createElement('div', { className: 'animate-fade-in w-100', style: 'position: relative;' }, [
      headerBanner,
      contentGrid
    ]);

    const wrapper = createElement('div', { className: 'w-100' }, [mainContainer]);

    // Append Reward Overlay if needed
    if (questState === PROGRESSION_STATES.REWARD_PENDING) {
        const overlay = new RewardOverlay(quest, () => this.handleAction('CLAIM_REWARD'));
        wrapper.appendChild(overlay.render());
    }

    return wrapper;
  }

  // --- UI COMPONENT HELPERS ---
  
  _renderStatusCard(questState, quest) {
      let icon, title, description, btnHtml = null;

      if (questState === PROGRESSION_STATES.AVAILABLE) {
          icon = 'ph-lock-key-open';
          title = 'Mission Available';
          description = 'Read the briefing and start when ready.';
          btnHtml = createElement('button', {
             className: 'btn w-100 p-3 mt-4 animate-slide-up delay-200',
             style: 'background-color: var(--color-primary); color: var(--color-black); font-size: 16px; font-weight: 900; border: 3px solid var(--color-black); box-shadow: 4px 4px 0px var(--color-black); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;',
             onclick: () => this.handleAction('START_QUEST'),
             onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = '0 0px 0px var(--color-black)'; },
             onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-black)'; }
          }, 'START MISSION');
      } else if (questState === PROGRESSION_STATES.IN_PROGRESS) {
          icon = 'ph-person-simple-run';
          title = 'Mission Active';
          description = 'You are currently working on this mission.';
      } else if (questState === PROGRESSION_STATES.SUBMITTED) {
          icon = 'ph-check-circle';
          title = 'Project Submitted';
          description = 'Complete the final quiz to earn your reward.';
      } else if (questState === PROGRESSION_STATES.QUIZ_AVAILABLE || questState === PROGRESSION_STATES.REWARD_PENDING) {
          icon = 'ph-exam';
          title = 'Final Evaluation';
          description = 'Pass the knowledge check to complete the mission.';
      } else if (questState === PROGRESSION_STATES.COMPLETED) {
          icon = 'ph-medal';
          title = 'Mission Accomplished';
          description = 'You have successfully completed this mission.';
      }

      return createElement('div', { 
         className: 'card p-5 animate-slide-up delay-100 bg-white', 
         style: 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black);' 
      }, [
          createElement('div', { className: 'd-flex align-center gap-3 mb-2' }, [
             createElement('i', { className: `ph-duotone ${icon} text-3xl text-primary` }),
             createElement('h3', { className: 'text-lg font-black m-0' }, title)
          ]),
          createElement('p', { className: 'text-sm font-bold text-gray m-0' }, description),
          btnHtml || createElement('div', {}, [])
      ]);
  }

  _renderCompletedState(quest) {
        const ctaButtons = [];
        if (quest.nextQuestId) {
            ctaButtons.push(
               createElement('button', { 
                   className: 'btn bg-primary text-black mt-4',
                   style: 'font-weight: 900; box-shadow: 4px 4px 0px var(--color-black); border: 2px solid var(--color-black);',
                   onclick: () => router.navigate('/home')
               }, 'Continue Learning')
            );
        }
        
        ctaButtons.push(
           createElement('button', { 
               className: 'btn bg-black text-white mt-4 ml-4',
               onclick: () => router.navigate('/home')
           }, 'Return to Base')
        );

        return createElement('div', { 
           className: 'card p-6 text-center bg-gray-100 animate-slide-up', 
           style: 'border: 3px dashed var(--color-gray-400);' 
        }, [
           createElement('i', { className: 'ph-duotone ph-check-circle text-success text-5xl mb-4' }),
           createElement('h2', { className: 'text-2xl m-0' }, 'Mission Completed'),
           createElement('div', { className: 'mt-6 d-flex justify-center flex-wrap gap-2' }, ctaButtons)
        ]);
  }

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
                style: 'border: 2px solid var(--color-black); border-radius: 8px; text-decoration: none; color: var(--color-black); background: var(--color-gray-100);',
                onclick: () => this.handleAction('OPEN_RESOURCE', res.url)
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
          createElement('div', { className: 'd-flex flex-column mb-6', style: 'gap: 24px;' }, quest.quiz.map((q, index) => {
             
             let explanationBox = null;
             if (hasSubmitted && this.quizAnswers[index] !== undefined) {
                 const selectedAnswer = this.quizAnswers[index];
                 const isCorrect = selectedAnswer === q.correctAnswer;
                 const icon = isCorrect ? 'ph-check-circle' : 'ph-x-circle';
                 const borderColor = isCorrect ? 'var(--color-success, #2b8a3e)' : 'var(--color-danger, #c92a2a)';
                 explanationBox = createElement('div', {
                     className: `p-3 mt-3 d-flex gap-2 bg-white`,
                     style: `border-radius: 8px; border: 2px solid ${borderColor}; color: var(--color-black);`
                 }, [
                     createElement('i', { className: `ph-fill ${icon} text-xl mt-1`, style: `color: ${borderColor};` }),
                     createElement('div', {}, [
                         createElement('strong', { className: 'd-block mb-1' }, isCorrect ? 'Correct!' : 'Incorrect.'),
                         createElement('span', { className: 'text-sm font-bold' }, [q.explanation])
                     ])
                 ]);
             }

             return createElement('div', { className: 'p-4 bg-gray-100', style: 'border: 2px solid var(--color-black); border-radius: 8px;' }, [
                createElement('p', { className: 'font-bold text-lg m-0 mb-4' }, [`${index + 1}. ${q.question}`]),
                createElement('div', { className: 'd-flex flex-column', style: 'gap: 12px;' }, q.options.map((opt, optIndex) => 
                   createElement('label', { 
                      className: 'd-flex align-center p-3 card-interactive bg-white', 
                      style: 'gap: 12px; border: 2px solid var(--color-black); border-radius: 8px; cursor: pointer;' 
                   }, [
                      createElement('input', { 
                         type: 'radio', 
                         name: `quiz-${index}`, 
                         value: optIndex,
                         checked: this.quizAnswers[index] === optIndex,
                         disabled: questState === PROGRESSION_STATES.REWARD_PENDING,
                         style: 'transform: scale(1.2); margin: 0;',
                         onchange: () => { this.quizAnswers[index] = optIndex; }
                      }),
                      createElement('span', { className: 'font-bold text-sm' }, [opt])
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
