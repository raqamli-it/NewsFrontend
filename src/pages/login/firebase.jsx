// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY4tEeGO_5A4dnOOF2-trlIH_ckk9aK1o",
  authDomain: "news-8103c.firebaseapp.com",
  projectId: "news-8103c",
  storageBucket: "news-8103c.appspot.com",
  messagingSenderId: "14848553008",
  appId: "1:14848553008:web:77446a50e3c16a2bb9fdf5",
  measurementId: "G-607PCKRFFY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Google Auth Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
