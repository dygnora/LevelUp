// js/firebase.js

// Using global firebase object loaded from CDN in index.html
const firebaseConfig = {
  apiKey: "AIzaSyC2sDG2vKTQLYyjIhGPY9a5CqE-1iaCmg4",
  authDomain: "levelupspapp.firebaseapp.com",
  projectId: "levelupspapp",
  storageBucket: "levelupspapp.firebasestorage.app",
  messagingSenderId: "546376604209",
  appId: "1:546376604209:web:6b582a21a253e47155d310",
  measurementId: "G-SVB30QRDWR"
};

// Initialize Firebase only if it hasn't been initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();

// Enable offline persistence (optional but good for SPA)
db.enablePersistence().catch((err) => {
  console.warn("Firestore persistence failed:", err.code);
});
