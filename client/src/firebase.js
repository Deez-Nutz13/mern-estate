// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a93a2.firebaseapp.com",
  projectId: "mern-estate-a93a2",
  storageBucket: "mern-estate-a93a2.firebasestorage.app",
  messagingSenderId: "352766718961",
  appId: "1:352766718961:web:df19ba1d49ff713f534a50"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);