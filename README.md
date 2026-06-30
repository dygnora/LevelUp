# LevelUp 🚀

LevelUp is a **gamified learning platform** built as a true Vanilla JavaScript Single Page Application (SPA). It uses RPG mechanics (XP, levels, ranks, quests, and skill trees) to make learning programming interactive and rewarding.

The UI is built from scratch following the **Modern Neobrutalism** design aesthetic—characterized by bold colors, hard shadows, thick borders, and playful micro-animations.

## 🌟 Features

- **Vanilla JS SPA Architecture**: Custom hash-based router, global state management, and declarative DOM rendering without any frontend frameworks (No React, No Vue, No Angular).
- **Authentication**: Google OAuth and Email/Password login powered by Firebase Authentication.
- **Gamified Progression**:
  - **Learning Paths**: Choose a career path (e.g., Frontend Developer).
  - **Skill Trees**: Unlock skills sequentially.
  - **Quests**: Complete tasks to earn XP.
  - **Leveling System**: Mathematical progression tracking your Rank and Level.
- **Modern Neobrutalism UI**: A fully custom, responsive CSS design system leveraging CSS variables, Flexbox, and Grid.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6 Modules), Custom CSS.
- **Backend (BaaS)**: Firebase Authentication, Cloud Firestore.
- **Icons**: Phosphor Icons (SVG).

## 🚀 Getting Started

### 1. Prerequisites
- A local web server (e.g., VS Code [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or Python's `http.server`).
- A Firebase project with Authentication (Email & Google) and Firestore Database enabled.

### 2. Installation
Clone the repository and open it in your code editor:
```bash
git clone https://github.com/dygnora/LevelUp.git
cd LevelUp
```

### 3. Firebase Configuration
Open `js/firebase.js` and update the `firebaseConfig` object with your own Firebase project credentials.

### 4. Database Seeding (Master Data)
To populate your Firestore database with the required learning paths and skills:
1. Open your Firebase Console > Firestore Database > Rules.
2. Temporarily set your rules to allow global writes:
   ```javascript
   match /{document=**} {
     allow read, write: if true;
   }
   ```
3. Run the app locally and navigate to `http://127.0.0.1:5500/seed.html`.
4. Click the **"Start Seeding Database"** button.
5. **IMPORTANT:** Revert your Firestore rules back to secure mode after seeding!

### 5. Run the Application
Start your local development server and open `index.html` in the browser.
```bash
# Example using npx and live-server
npx live-server
```

## 📁 Folder Structure
```text
LevelUp/
├── css/                  # Neobrutalism Design System (variables, base, layout, components, utilities, animations)
├── js/
│   ├── components/       # Reusable UI components (Navbar, Sidebar, SkillTree, etc.)
│   ├── services/         # Firebase abstraction layer (authService, dbService, progressionService)
│   ├── utils/            # Helper utilities (dom.js for createElement)
│   ├── views/            # Full-page view classes (LoginView, HomeView, JourneyView, etc.)
│   ├── app.js            # App initialization and route definitions
│   ├── firebase.js       # Firebase SDK initialization
│   ├── router.js         # Custom SPA Hash Router
│   └── state.js          # Observer-based Global State Management
├── Context/              # Project requirement and architecture documents
├── index.html            # Entry point
└── seed.html             # Automated database seeding utility
```

## 📜 License
This project is open-source and available under the MIT License.
