// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX8zITwSKpBweToLsYlgCg6Y7425RsdOQ",
  authDomain: "homehero-417119.firebaseapp.com",
  projectId: "homehero-417119",
  storageBucket: "homehero-417119.appspot.com",
  messagingSenderId: "686892120103",
  appId: "1:686892120103:web:98233bb4db546e6bf9f602"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);