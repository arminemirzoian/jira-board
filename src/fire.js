import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import { initializeApp } from "firebase";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyAUfYMrL_vyH-RTMQzpFuJi7c9s-H7-Ohg",
    authDomain: "task-1f9c6.firebaseapp.com",
    projectId: "task-1f9c6",
    storageBucket: "task-1f9c6.appspot.com",
    messagingSenderId: "191314486797",
    appId: "1:191314486797:web:32a37ce9c63c1d66259744",
    measurementId: "G-F4NQ5QVT3N"
};


const fire = firebase.initializeApp(firebaseConfig);
export default fire;