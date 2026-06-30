// js/services/dbService.js
import { db } from '../firebase.js';

export const dbService = {
  // --- Master Data ---
  async getLearningPaths() {
    const snapshot = await db.collection('learning_paths').where('isActive', '==', true).orderBy('displayOrder').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getSkillsByPath(pathId) {
    const snapshot = await db.collection('skills')
      .where('learningPathId', '==', pathId)
      .where('isActive', '==', true)
      .orderBy('displayOrder')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getQuestsBySkill(skillId) {
    const snapshot = await db.collection('quests')
      .where('skillId', '==', skillId)
      .where('isActive', '==', true)
      .orderBy('displayOrder')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // --- User Data ---
  async createCharacter(uid, characterData) {
    const data = {
      ...characterData,
      characterLevel: 1,
      characterXP: 0,
      characterRank: 'Beginner',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    await db.collection('users').doc(uid).set(data);
    return data;
  },
  
  async updateCharacter(uid, data) {
    const updateData = {
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    await db.collection('users').doc(uid).update(updateData);
  }
};
