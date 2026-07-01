// js/views/HomeView.js
import { createElement } from '../utils/dom.js';
import { state } from '../state.js';
import { AppLayout } from '../components/AppLayout.js';
import { router } from '../router.js';
<<<<<<< HEAD
import { themeManager } from '../managers/ThemeManager.js';
=======
import { progressionEngine, PROGRESSION_STATES } from '../services/ProgressionEngine.js';
>>>>>>> 704771c8f5568654476264eda21692c32793e646

export class HomeView {
  
  handleAction(actionType, payload) {
    if (actionType === 'START_QUEST' || actionType === 'CONTINUE_QUEST') {
       if (actionType === 'START_QUEST') {
          progressionEngine.dispatch('START_QUEST', payload);
       }
       router.navigate('/quest'); // Navigate to Quest detail view
    } else if (actionType === 'TAKE_QUIZ') {
       router.navigate('/quest'); // Quest view will show the quiz
    } else if (actionType === 'OPEN_NEXT') {
       // Acknowledge completion, refresh the page to show the next available quest
       // In a real app this might clear a local "just completed" flag.
       // For MVP, we just re-render to fetch the new current context
       this.reRender();
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
    const character = state.get('character');
    
    if (!character) {
       return createElement('div', {}, 'Loading character data...');
    }

<<<<<<< HEAD
    const theme = themeManager.getCurrentTheme();

    // Realistic Mock Data for MVP Mission Control
    const mockData = {
      path: "Frontend Developer",
      chapter: "HTML",
      module: "Semantic HTML",
      quest: {
        title: "Build Semantic Landing Page",
        objective: "Create a semantic landing page using <header>, <main>, <section>, dan <footer>.",
        difficulty: "Beginner",
        estimatedTime: "30 min",
        reward: "+40 XP",
        deliverable: "GitHub Repository",
        quizStatus: "Available after submission"
      },
      nextUnlock: {
        title: "HTML Forms",
        preview: ["Forms", "Inputs", "Buttons", "Validation"]
      },
      resources: [
        { type: 'Documentation', title: 'MDN Web Docs', icon: 'ph-book-bookmark' },
        { type: 'Video', title: 'YouTube Tutorial', icon: 'ph-video' },
        { type: 'Practice', title: 'Frontend Mentor', icon: 'ph-flask' }
      ],
      roadmap: [
        { status: 'completed', title: 'HTML Basics' },
        { status: 'current', title: 'Semantic HTML' },
        { status: 'locked', title: 'HTML Forms' },
        { status: 'locked', title: 'Tables' }
      ],
      achievement: "HTML Explorer"
    };

    // 1. Greeting (Dynamic from ThemeManager)
    const firstName = (character.displayName || 'Deny').split(' ')[0];
    const headerContext = createElement('div', { className: 'mb-4 animate-slide-up', style: 'margin-bottom: 24px;' }, [
      createElement('p', { className: 'm-0 text-gray font-bold text-sm mb-1' }, `${theme.greeting}, ${firstName}.`),
      createElement('p', { className: 'm-0 text-black font-bold text-md' }, theme.subGreeting)
    ]);

    // Container standard styles
    const cardStyle = 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); border-radius: 8px; background: var(--color-white); width: 100%; margin-bottom: 24px; overflow: hidden;';

    // 2. HERO: Today's Main Quest (Redesign Phase 2 + Revisions)
    const questState = 'AVAILABLE'; // Mock FSM state (Phase 6 will connect this to ProgressionEngine)
    let ctaLabel = 'Start Learning';
    if (questState === 'IN_PROGRESS') ctaLabel = 'Continue Learning';
    else if (questState === 'SUBMITTED') ctaLabel = 'Take Quiz';
    else if (questState === 'COMPLETED') ctaLabel = 'Continue Journey';

    const heroQuest = createElement('div', { 
      className: 'animate-slide-up delay-100', 
      style: cardStyle
    }, [
      // Content Box (White)
      createElement('div', { className: 'p-6' }, [
        createElement('span', { 
           className: 'font-bold text-sm text-black px-3 py-1 mb-4 d-inline-block', 
           style: 'background-color: var(--theme-accent); border-radius: 20px; white-space: nowrap;' 
        }, `${theme.icon} TODAY'S MISSION`),
        createElement('h1', { className: 'm-0 text-3xl font-black mb-3 text-black' }, mockData.quest.title),
        createElement('p', { 
           className: 'm-0 font-bold text-black text-md mb-2', 
           style: 'opacity: 0.8; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;' 
        }, [mockData.quest.objective]), // Array forces createTextNode avoiding HTML injection
        
        // Metrics Row (Pills, very light)
        createElement('div', { className: 'd-flex align-center mt-4 mb-2 flex-wrap', style: 'gap: 12px;' }, [
           createElement('span', { className: 'align-center text-sm font-bold px-3 py-1', style: 'display: inline-flex; gap: 4px; background: var(--color-gray-100); border-radius: 20px;' }, [
              createElement('span', {}, '🟢'), createElement('span', {}, mockData.quest.difficulty)
           ]),
           createElement('span', { className: 'align-center text-sm font-bold px-3 py-1', style: 'display: inline-flex; gap: 4px; background: var(--color-gray-100); border-radius: 20px;' }, [
              createElement('span', {}, '⏱'), createElement('span', {}, mockData.quest.estimatedTime)
           ]),
           createElement('span', { className: 'align-center text-sm font-bold px-3 py-1 text-warning', style: 'display: inline-flex; gap: 4px; background: var(--color-gray-100); border-radius: 20px;' }, [
              createElement('span', {}, '⭐'), createElement('span', {}, mockData.quest.reward)
           ])
        ])
      ]),
      // CTA Button (Full Width flush to bottom)
      createElement('button', {
        className: 'btn w-100 p-4 d-flex justify-center align-center gap-2',
        style: 'background-color: var(--theme-bg); color: var(--theme-btn-text); font-size: 18px; font-weight: 900; border: none; border-top: 3px solid var(--color-black); cursor: pointer; transition: background-color 0.2s;',
        onmousedown: (e) => { e.currentTarget.style.opacity = '0.9'; },
        onmouseup: (e) => { e.currentTarget.style.opacity = '1'; },
        onclick: () => router.navigate('/quest')
      }, [
        ctaLabel,
        createElement('i', { className: 'ph-bold ph-arrow-right text-xl' })
      ])
    ]);

    // 3. Next Unlock Attachment (Phase 3 Redesign - Teaser Card)
    const nextUnlock = createElement('div', { 
      className: 'p-6 animate-slide-up delay-200', 
      style: `${cardStyle} box-shadow: 4px 4px 0px var(--color-black); transition: all 0.2s; cursor: default;`,
      onmouseenter: (e) => { 
        const icon = e.currentTarget.querySelector('.lock-icon');
        const preview = e.currentTarget.querySelector('.teaser-preview');
        if(icon) icon.style.transform = 'translateY(-2px) rotate(5deg)';
        if(preview) { preview.style.filter = 'blur(0px)'; preview.style.opacity = '0.9'; }
      },
      onmouseleave: (e) => { 
        const icon = e.currentTarget.querySelector('.lock-icon');
        const preview = e.currentTarget.querySelector('.teaser-preview');
        if(icon) icon.style.transform = 'none';
        if(preview) { preview.style.filter = 'blur(1px)'; preview.style.opacity = '0.5'; }
      }
    }, [
      createElement('div', { className: 'd-flex flex-column gap-3' }, [
        // Kicker & Icon
        createElement('div', { className: 'd-flex align-center gap-2 mb-1' }, [
          createElement('i', { className: 'ph-fill ph-lock-key text-gray text-xl lock-icon', style: 'transition: transform 0.2s;' }),
          createElement('span', { className: 'text-gray text-xs font-bold' }, 'NEXT UNLOCK')
        ]),
        // Target Module
        createElement('h3', { className: 'm-0 text-xl font-black text-black' }, mockData.nextUnlock.title),
        // Condition text
        createElement('p', { className: 'm-0 font-bold text-gray text-sm' }, `Complete ${mockData.module} to unlock.`),
        
        // Separator
        createElement('hr', { style: 'border: none; border-top: 2px dashed var(--color-gray-300); margin: 16px 0; width: 100%;' }),
        
        // Teaser Preview
        createElement('div', { className: 'd-flex flex-column gap-2 teaser-preview', style: 'opacity: 0.5; filter: blur(1px); user-select: none; transition: all 0.3s;' }, [
          createElement('span', { className: 'text-xs font-bold text-gray mb-1' }, 'YOU WILL LEARN:'),
          ...mockData.nextUnlock.preview.map(item => 
            createElement('div', { className: 'd-flex align-center gap-2 text-sm font-bold text-black' }, [
              createElement('i', { className: 'ph-bold ph-check text-gray' }), item
            ])
          )
        ])
      ])
    ]);

    // 4. Journey Progress (Phase 4 Redesign - Option A: Quest Log)
    const mockJourneyStats = { completed: 2, total: 8, percentage: 25 };
    const journeyProgress = createElement('div', { 
      className: 'p-6 animate-slide-up delay-300', 
      style: `${cardStyle} box-shadow: 4px 4px 0px var(--color-black); transition: all 0.2s;`,
      onmouseenter: (e) => { 
         e.currentTarget.style.transform = 'translateY(-2px)';
         e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-black)';
      },
      onmouseleave: (e) => { 
         e.currentTarget.style.transform = 'translateY(0)';
         e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-black)';
      }
    }, [
      // 1. Header (Title + Badge)
      createElement('div', { className: 'd-flex justify-between align-center mb-3 flex-wrap', style: 'gap: 16px;' }, [
         createElement('div', {}, [
           createElement('h3', { className: 'm-0 text-xl font-black' }, `${mockData.path} Journey`),
           createElement('p', { className: 'm-0 text-sm font-bold text-gray' }, 'Building the Web')
         ]),
         // Badge
         createElement('div', { className: 'px-3 py-1 font-bold text-xs d-flex align-center gap-1', style: 'background: var(--color-black); color: var(--color-white); border-radius: 20px;' }, [
            createElement('i', { className: 'ph-fill ph-flag' }),
            `${mockJourneyStats.completed}/${mockJourneyStats.total} Quests`
         ])
      ]),
      
      // 2. Minimalist Progress Bar
      createElement('div', { className: 'mb-5', style: 'width: 100%; height: 8px; background: var(--color-gray-200); border-radius: 4px; overflow: hidden; position: relative;' }, [
         createElement('div', { 
            style: `width: 0%; height: 100%; background: var(--theme-accent); transition: width 700ms cubic-bezier(0.4, 0, 0.2, 1);` 
         }, [])
      ]),

      // 3. Current Roadmap Preview (Timeline Style)
      createElement('div', { className: 'd-flex flex-column mb-3 pl-2', style: 'border-left: 3px solid var(--color-gray-200); margin-left: 10px; gap: 16px;' }, mockData.roadmap.slice(0, 4).map((item, index) => {
        let iconHtml, textColor, dotColor, dotBorder;
        if (item.status === 'completed') {
           iconHtml = createElement('i', { className: 'ph-bold ph-check text-success text-sm' });
           textColor = 'var(--color-gray-600)';
           dotColor = 'var(--color-white)';
           dotBorder = 'var(--color-black)';
        } else if (item.status === 'current') {
           iconHtml = createElement('i', { className: 'ph-fill ph-play text-sm', style: 'color: var(--color-black);' });
           textColor = 'var(--color-black)';
           dotColor = 'var(--theme-accent)';
           dotBorder = 'var(--color-black)';
        } else {
           iconHtml = createElement('i', { className: 'ph-bold ph-lock-key text-gray-400 text-sm' });
           textColor = 'var(--color-gray-400)';
           dotColor = 'var(--color-gray-200)';
           dotBorder = 'var(--color-gray-300)';
        }

        return createElement('div', { 
          className: 'd-flex align-center gap-3',
          style: 'position: relative; padding-left: 16px;'
        }, [
          // Timeline Node Dot
          createElement('div', { 
             className: 'd-flex align-center justify-center', 
             style: `width: 24px; height: 24px; border-radius: 50%; background: ${dotColor}; border: 2px solid ${dotBorder}; position: absolute; left: -25px; top: 50%; transform: translateY(-50%);` 
          }, [iconHtml]),
          // Content
          createElement('span', { className: 'font-bold text-sm', style: `color: ${textColor};` }, [item.title])
        ]);
      })),

      // 4. Open Journey (Lightweight Link)
      createElement('div', { className: 'd-flex mt-4', style: 'justify-content: flex-end;' }, [
         createElement('a', { 
            href: 'javascript:void(0)', 
            className: 'font-bold text-sm d-flex align-center gap-1',
            style: 'color: var(--color-black); text-decoration: none; border-bottom: 2px solid transparent; padding-bottom: 2px; transition: border-color 0.2s;',
            onmouseenter: (e) => e.currentTarget.style.borderBottom = '2px solid var(--color-black)',
            onmouseleave: (e) => e.currentTarget.style.borderBottom = '2px solid transparent',
            onclick: () => router.navigate('/journey')
         }, [
            'Open Journey', 
            createElement('i', { className: 'ph-bold ph-arrow-right' })
         ])
      ])
    ]);
    
    // Trigger progress bar animation after DOM mount
    setTimeout(() => {
       const pb = journeyProgress.querySelector('div[style*="transition: width 700ms"]');
       if(pb) pb.style.width = `${mockJourneyStats.percentage}%`;
    }, 50);

    // 5. Achievement (Conditional)
    let recentAchievement = createElement('div', {}, []);
    if (mockData.achievement) {
      recentAchievement = createElement('div', { 
        className: 'animate-slide-up delay-400', 
        style: `${cardStyle} padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;` 
      }, [
        createElement('h3', { className: 'text-xl font-black mb-4 w-100 text-left' }, 'Recent Achievement'),
        createElement('div', { className: 'mb-4' }, [
          createElement('i', { className: 'ph-duotone ph-trophy', style: 'font-size: 80px; color: var(--theme-bg); filter: drop-shadow(4px 4px 0px var(--color-black));' })
        ]),
        createElement('div', { className: 'font-black text-2xl mb-2' }, mockData.achievement),
        createElement('div', { className: 'text-sm font-bold text-white bg-black px-4 py-2', style: 'border-radius: 20px;' }, 'Unlocked Today')
      ]);
    }

    // Wrap elements in a single column layout container
    const layoutContainer = createElement('div', { 
      className: 'd-flex flex-column', 
      style: 'max-width: 1100px; margin: 0 auto; padding-top: 32px; padding-bottom: 48px; width: 100%;' 
    }, [
      headerContext,
      heroQuest,
      nextUnlock,
      journeyProgress,
      recentAchievement
=======
    const context = progressionEngine.getCurrentContext();
    if (!context) {
       return createElement('div', {}, 'Loading progression context...');
    }

    const { journey, module, quest, state: questState, nextUnlock, xp } = context;

    // 1. Natural Greeting
    const firstName = (character.displayName || 'Friend').split(' ')[0];
    const greeting = createElement('div', { className: 'mb-4 animate-fade-in' }, [
      createElement('p', { className: 'm-0 text-gray font-bold text-lg' }, `Good Morning, ${firstName}.`)
    ]);

    // 2. Current Journey Identity
    const journeyIdentity = createElement('div', { className: 'd-flex align-center gap-2 mb-8 animate-fade-in delay-100' }, [
      createElement('span', { className: 'text-3xl' }, journey.icon),
      createElement('div', {}, [
        createElement('div', { className: 'font-black text-xl' }, `${journey.title} Journey`),
        createElement('div', { className: 'text-gray text-sm font-bold' }, journey.description)
      ])
    ]);

    // 3. Dynamic Hero (The Mission)
    let heroTitle = 'Today\'s Mission';
    let missionTitle = quest ? quest.title : 'Journey Complete!';
    let ctaLabel = 'Start Mission';
    let actionType = 'START_QUEST';
    let ctaClass = 'btn w-100 p-4';
    let ctaStyle = 'background-color: var(--color-black); color: var(--color-white); font-size: 18px; font-weight: 900; border: none; box-shadow: 0 6px 0px rgba(0,0,0,0.8); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;';
    
    // Dynamic FSM Logic
    if (questState === PROGRESSION_STATES.IN_PROGRESS) {
      ctaLabel = 'Continue Mission';
      actionType = 'CONTINUE_QUEST';
    } else if (questState === PROGRESSION_STATES.SUBMITTED) {
      heroTitle = 'Pending Review';
      ctaLabel = 'Take Quiz';
      actionType = 'TAKE_QUIZ';
      ctaStyle = 'background-color: var(--theme-bg); color: var(--color-black); font-size: 18px; font-weight: 900; border: 3px solid var(--color-black); box-shadow: 4px 6px 0px rgba(0,0,0,1); cursor: pointer;';
    } else if (questState === PROGRESSION_STATES.COMPLETED) {
      heroTitle = 'Mission Complete!';
      ctaLabel = 'Open Next Module';
      actionType = 'OPEN_NEXT';
    } else if (!quest) {
      heroTitle = 'Congratulations!';
      missionTitle = `You have completed the ${journey.title} Journey.`;
      ctaLabel = 'Explore New Journeys';
      actionType = 'CHOOSE_JOURNEY';
    }

    const heroQuest = createElement('div', { 
      className: 'card animate-slide-up delay-200 mb-6', 
      style: 'border: 4px solid var(--color-black); box-shadow: 12px 12px 0px var(--color-black); background: var(--color-white); padding: 0; overflow: hidden; display: flex; flex-direction: column; min-height: 250px;'
    }, [
      // Header
      createElement('div', { style: 'background: var(--color-white); padding: 40px; border-bottom: 4px solid var(--color-black); flex-grow: 1; display: flex; flex-direction: column; justify-content: center;' }, [
        createElement('span', { className: 'font-bold text-sm bg-black text-white px-3 py-1 mb-4 d-inline-block', style: 'border-radius: 20px; white-space: nowrap; width: fit-content;' }, heroTitle.toUpperCase()),
        createElement('h1', { className: 'm-0 text-5xl font-black mb-2', style: 'color: var(--color-black); text-shadow: 3px 3px 0px var(--theme-bg); line-height: 1.1;' }, missionTitle)
      ]),
      // CTA
      createElement('button', {
        className: ctaClass,
        style: ctaStyle,
        onmousedown: (e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = '0 0px 0px rgba(0,0,0,0.8)'; },
        onmouseup: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0px rgba(0,0,0,0.8)'; },
        onclick: () => this.handleAction(actionType, { questId: quest ? quest.id : null })
      }, [
        ctaLabel,
        createElement('i', { className: 'ph-bold ph-arrow-right ml-2' })
      ])
    ]);

    // 4. Next Unlock (Conditional)
    let nextUnlockEl = null;
    if (nextUnlock && quest) {
       nextUnlockEl = createElement('div', { 
         className: 'card p-4 d-flex align-center gap-3 animate-slide-up delay-300 mb-8', 
         style: 'border: 3px solid var(--color-black); box-shadow: 6px 6px 0px var(--color-black); background: var(--theme-bg); margin-top: -12px; width: 92%; margin-left: auto; margin-right: auto; position: relative; z-index: 10;' 
       }, [
         createElement('div', { className: 'bg-white p-2 d-flex align-center justify-center', style: 'border: 2px solid var(--color-black); border-radius: 50%;' }, [
           createElement('i', { className: 'ph-duotone ph-lock-key-open text-xl text-black' })
         ]),
         createElement('div', { className: 'd-flex align-center flex-wrap gap-2 text-white' }, [
           createElement('span', { className: 'font-black' }, 'NEXT UNLOCK:'),
           createElement('span', { className: 'font-bold' }, `Complete this mission to unlock`),
           createElement('span', { className: 'font-black bg-white text-black px-2 py-1 d-inline-block', style: 'border: 2px solid var(--color-black); border-radius: 6px; box-shadow: 2px 2px 0px var(--color-black);' }, nextUnlock)
         ])
       ]);
    } else {
       nextUnlockEl = createElement('div', { className: 'mb-8' }, []);
    }

    // 5. Journey Snapshot (Progress Bar)
    // Calculate simple progress based on completed quests vs total quests in journey
    const modules = progressionEngine.getModulesForJourney(journey.id);
    let totalQuests = 0;
    let completedCount = 0;
    
    modules.forEach(m => {
      const quests = progressionEngine.getQuestsForModule(m.id);
      totalQuests += quests.length;
      quests.forEach(q => {
        if (character.progress.completedQuests && character.progress.completedQuests[q.id]) {
          completedCount++;
        }
      });
    });

    const progressPercentage = totalQuests > 0 ? Math.round((completedCount / totalQuests) * 100) : 0;

    const snapshot = createElement('div', { className: 'card animate-slide-up delay-400 mb-6', style: 'border: 3px solid var(--color-black); background: var(--color-white); padding: 24px; display: flex; justify-content: space-between; align-items: center;' }, [
      createElement('div', { style: 'flex-grow: 1; padding-right: 24px;' }, [
        createElement('h3', { className: 'text-xl font-black mb-2 m-0' }, 'Journey Progress'),
        createElement('div', { className: 'd-flex align-center gap-3 mt-3' }, [
          createElement('div', { style: 'flex-grow: 1; height: 12px; background: var(--color-gray-200); border: 2px solid var(--color-black); border-radius: 6px; overflow: hidden;' }, [
            createElement('div', { style: `height: 100%; width: ${progressPercentage}%; background: var(--theme-bg); border-right: 2px solid var(--color-black);` })
          ]),
          createElement('span', { className: 'font-black' }, `${progressPercentage}%`)
        ])
      ]),
      createElement('button', { 
        className: 'btn', 
        style: 'border: 2px solid var(--color-black); background: var(--color-gray-100); color: var(--color-black); font-weight: bold; padding: 12px 24px;', 
        onclick: () => router.navigate('/journey') 
      }, 'Open Journey')
>>>>>>> 704771c8f5568654476264eda21692c32793e646
    ]);

    // CSS Utilities
    const style = createElement('style', {}, `
<<<<<<< HEAD
      @media(min-width: 768px) { .md-grid-cols-3 { grid-template-columns: repeat(3, 1fr); } }
=======
>>>>>>> 704771c8f5568654476264eda21692c32793e646
      .bg-white { background-color: var(--color-white); }
      .bg-black { background-color: var(--color-black); }
      .text-white { color: var(--color-white); }
      .ml-2 { margin-left: 8px; }
      .max-w-700 { max-width: 700px; margin: 0 auto; }
    `);
    document.head.appendChild(style);

<<<<<<< HEAD
    return createElement('div', { className: 'animate-fade-in w-100' }, [layoutContainer]);
=======
    return createElement('div', { className: 'animate-fade-in max-w-700 mt-6' }, [
      greeting,
      journeyIdentity,
      heroQuest,
      nextUnlockEl,
      snapshot
    ]);
>>>>>>> 704771c8f5568654476264eda21692c32793e646
  }

  render() {
    const layout = new AppLayout(this.renderContent(), '/home');
    return layout.render();
  }
}

