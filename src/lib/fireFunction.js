import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import{
  addDoc, collection, getDocs
}from 'firebase/firestore';

import { firebaseConfig } from './firebaseConfig.js';

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// -----------------Función para registrarse--------------------
export function registerEvent(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
// --------------Función para iniciar sesión--------------------
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
// ------------Función para registrarse con Google-------------
export function registerGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
export { GoogleAuthProvider };

// Firestore

const db = getFirestore(app);

export const saveTask = (description, userName, uidUser) => {
  const today = new Date();

  return addDoc(collection(db, 'tasks'), {
    uidUser,
    userName,
    description,
    date: today,
    like: [],
  });
};
