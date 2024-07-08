// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuDdtznE_sPbtPAfpp60OaK6z6mXxYiJk",
  authDomain: "stack-builder-c4ca8.firebaseapp.com",
  projectId: "stack-builder-c4ca8",
  storageBucket: "stack-builder-c4ca8.appspot.com",
  messagingSenderId: "140755308855",
  appId: "1:140755308855:web:30cef20bb42c7348ba8ab2",
  measurementId: "G-LK5WMV3FGS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
