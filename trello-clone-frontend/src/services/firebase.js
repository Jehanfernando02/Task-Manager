import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuVOMDWhJ4w_PhEerzCT5gC1o-7-LtwAA",
  authDomain: "trello-clone-651b7.firebaseapp.com",
  projectId: "trello-clone-651b7",
  storageBucket: "trello-clone-651b7.firebasestorage.app",
  messagingSenderId: "947156747747",
  appId: "1:947156747747:web:968945c1d8a76febfa0cd6",
  measurementId: "G-C6H2NQKEMF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };