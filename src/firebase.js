// Firebase configuration
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJRxKg2jl-kIJETYVjQbj7aA-02FlV3ho",
  authDomain: "codeplayground-493e1.firebaseapp.com",
  projectId: "codeplayground-493e1",
  storageBucket: "codeplayground-493e1.firebasestorage.app",
  messagingSenderId: "930798539696",
  appId: "1:930798539696:web:c6170ef0aaae2cf278bc75",
  measurementId: "G-LSWMJL0DVN"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

export default app

