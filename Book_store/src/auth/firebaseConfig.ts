import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDLGUAkNPDnQaH3sU5vr14nUoCguPgWlDU",
  authDomain: "bookstore-3ae16.firebaseapp.com",
  projectId: "bookstore-3ae16",
  storageBucket: "bookstore-3ae16.firebasestorage.app",
  messagingSenderId: "506639931288",
  appId: "1:506639931288:web:85b4987e641e06ce6b3ded",
  measurementId: "G-YH8VG2ZBYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);