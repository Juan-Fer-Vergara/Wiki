import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsY3_blYOog1QKTg1KyvRL2DlKV3__-00",
  authDomain: "wikistud-fd279.firebaseapp.com",
  projectId: "wikistud-fd279",
  storageBucket: "wikistud-fd279.appspot.com",
  messagingSenderId: "680850364872",
  appId: "1:680850364872:web:cac3bde9ca1cefd69f88fd",
  measurementId: "G-6ZHMKQSVSR"
};

initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));