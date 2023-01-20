// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMOCBMKnAsPgkB8qTpf0X14arQ733dzKA",
  authDomain: "meetit-31dc9.firebaseapp.com",
  projectId: "meetit-31dc9",
  storageBucket: "meetit-31dc9.appspot.com",
  messagingSenderId: "74546535992",
  appId: "1:74546535992:web:0d5c06f6d44dbccb5c50cd",
  measurementId: "G-PGQJE6G570"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = getFirestore(app);
export default firebase;