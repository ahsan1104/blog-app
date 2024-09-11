import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut ,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
import {getDoc, doc, deleteDoc, getFirestore, collection, addDoc,getDocs,updateDoc} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyADB45z3t94qpEEyniBt8ay_EKifXhIp2U",
  authDomain: "fire-5d3e5.firebaseapp.com",
  projectId: "fire-5d3e5",
  storageBucket: "fire-5d3e5.appspot.com",
  messagingSenderId: "1080298470769",
  appId: "1:1080298470769:web:28b42788f7d9c0d15b4ad0",
  measurementId: "G-P2D5YLYYRN"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { getStorage, ref, uploadBytesResumable, getDownloadURL };
export {getDoc, doc, deleteDoc ,db, collection, addDoc,getDocs ,updateDoc};
export{auth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged ,signOut,sendPasswordResetEmail}

