// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZJaxT1jEt1bg9MYsg1-_aaSYmXrWRknw",
  authDomain: "todoapp-2a52b.firebaseapp.com",
  projectId: "todoapp-2a52b",
  storageBucket: "todoapp-2a52b.appspot.com",
  messagingSenderId: "1010550350648",
  appId: "1:1010550350648:web:111a82b5f741412f9817cd",
  measurementId: "G-HYN6NF7YHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
