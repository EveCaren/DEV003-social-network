// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyByGdMp2YhjwRN_mG1hI0XsLQFl3K7c5yc',
  authDomain: 'social-network-a6b7f.firebaseapp.com',
  projectId: 'social-network-a6b7f',
  storageBucket: 'social-network-a6b7f.appspot.com',
  messagingSenderId: '232264032335',
  appId: '1:232264032335:web:1f6bc4b86044d282c38a3a',
  measurementId: 'G-LZT0N9CE1B',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);