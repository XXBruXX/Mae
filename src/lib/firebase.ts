import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "studio-3441371610-2564a",
  appId: "1:1080747788978:web:27d7f55ef28d801b7617ab",
  storageBucket: "studio-3441371610-2564a.firebasestorage.app",
  apiKey: "AIzaSyBMag4aZAebqzhLO_A6KCRxsOg34s6Dq7w",
  authDomain: "studio-3441371610-2564a.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "1080747788978"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
