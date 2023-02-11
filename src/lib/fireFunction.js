import { initializeApp } from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
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
