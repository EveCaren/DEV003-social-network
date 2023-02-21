import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  where,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

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

// ------------Función para registrarse con Google-------------
export function registerGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
export { GoogleAuthProvider };

// -------------Función para identificar el usuario------------

export const currentUserInfo = () => auth.currentUser;

// -----------------Firestore----------------------
// Función que guarda los post de un usuario
const db = getFirestore(app);
export const addANewPost = (customer, postUser, uidUser) => {
  const today = new Date();
  return addDoc(collection(db, 'posts'), {
    customer,
    postUser,
    uidUser,
    today,
    like: [],
  });
};
export const printPost = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('today')), callback);



// Función para llamar a los post de un usuario
// const q = query(collection(db, user), where(user, '==', true));
// export const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

// Este posiblemente nos sirva para editar posts
// const post = doc(db, 'postUser/post');
// function writePost() {
//   const docData = {
//     user: 'tako',
//     Post: 'comentario2',
//   };
//   setDoc(post, docData, { merge: true });
// }
// writePost();





// esta era una prueba para guardar tareas
// export const saveTask = (description, userName, uidUser) => {
//   const today = new Date();

//   return addDoc(collection(db, 'tasks'), {
//     uidUser,
//     userName,
//     description,
//     date: today,
//     like: [],
//   });
// };



// ---------------------Observador----------
// export function watcher() {
//   onAuthStateChanged(auth, (user) => {
//     if (user !== null) {
//       const uid = user.uid;
//       // User is signed in, see docs for a list of available properties
//       user.providerData.forEach((profile) => {
//         console.log(`Sign-in provider: ${profile.providerId}`);
//         console.log(`  Provider-specific UID: ${profile.uid}`);
//         console.log(`  Name: ${profile.displayName}`);
//         console.log(`  Email: ${profile.email}`);
//         console.log(`  Photo URL: ${profile.photoURL}`);
//       });
//     } else {
//       // User is signed out se ejecuta cuando el usuario se desloguea
//       console.log('no hay usuario');
//     }
//   });
// }
