import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBWBGR3tp_IucZUPYv-HbA-VSC4qwf0AM",
  authDomain: "calculatorhistory-4cad7.firebaseapp.com",
  projectId: "calculatorhistory-4cad7",
  storageBucket: "calculatorhistory-4cad7.appspot.com",
  messagingSenderId: "163012950196",
  appId: "1:163012950196:web:b8d0b87e16c272b132bfe1",
  measurementId: "G-G1QQQSPPD0"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth provider
const provider = new GoogleAuthProvider();

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, provider, db };












