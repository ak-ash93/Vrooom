// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjqbq4xWrtBPSBOyScOU9oFQCZVnKIBEY",
  authDomain: "vroom-6d752.firebaseapp.com",
  projectId: "vroom-6d752",
  storageBucket: "vroom-6d752.firebasestorage.app",
  messagingSenderId: "264701508198",
  appId: "1:264701508198:web:bb8aa2c181fafc5600cba7",
  measurementId: "G-85XLS91QC4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
