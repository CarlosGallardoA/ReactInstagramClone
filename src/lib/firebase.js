import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { seedDatabase } from "../seed";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_APP_ID,
  appId: "",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const FildValue = getFirestore();

// seedDatabase(FildValue);
export { firebase, FildValue };
