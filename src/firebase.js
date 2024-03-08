// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPbGlORrL5DI4mw6z78eua9hu4IkH0IpU",
  authDomain: "instagramclone-c1d83.firebaseapp.com",
  projectId: "instagramclone-c1d83",
  storageBucket: "instagramclone-c1d83.appspot.com",
  messagingSenderId: "966673940136",
  appId: "1:966673940136:web:59af4c5b088b70f1520c9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

