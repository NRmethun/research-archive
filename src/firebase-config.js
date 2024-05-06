import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD5PeqZ42DHwQ9XS1HIuWPSk5MLpdvrS0E",
    authDomain: "research-archive-480bd.firebaseapp.com",
    projectId: "research-archive-480bd",
    storageBucket: "research-archive-480bd.appspot.com",
    messagingSenderId: "914598295879",
    appId: "1:914598295879:web:3a496f01c5bf8d458b7462"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);