// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBP4AYpZsEqeMv2hDgR6A_0_32sWpVo42Y",
  authDomain: "laptop-534f1.firebaseapp.com",
  projectId: "laptop-534f1",
  storageBucket: "laptop-534f1.firebasestorage.app",
  messagingSenderId: "91811781068",
  appId: "1:91811781068:web:1369eb6a8e701ac54fa569"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);