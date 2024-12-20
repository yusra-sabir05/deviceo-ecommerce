// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFJZAzIIzsxir-Yg2X66csCNoQVw6Tqkg",
  authDomain: "deviceo.firebaseapp.com",
  projectId: "deviceo",
  storageBucket: "deviceo.firebasestorage.app",
  messagingSenderId: "671031668035",
  appId: "1:671031668035:web:2fb1b3936b0979b48e53f6",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
