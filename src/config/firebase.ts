import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyChsjAIFBVJVkTRn1XdTffL7FW_K77JXiY",
  authDomain: "react-course-b5a98.firebaseapp.com",
  projectId: "react-course-b5a98",
  storageBucket: "react-course-b5a98.appspot.com",
  messagingSenderId: "309615266631",
  appId: "1:309615266631:web:4d9dbb0742ffe441b9da62"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);