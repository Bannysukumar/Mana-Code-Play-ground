import { createContext, useContext, useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sign up with email/password
  async function signup(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name: name || user.email.split('@')[0],
      createdAt: serverTimestamp()
    })
    
    return userCredential
  }

  // Sign in with email/password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Sign in with Google
  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    
    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    
    if (!userDoc.exists()) {
      // Create user document if it doesn't exist
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        createdAt: serverTimestamp()
      })
    }
    
    return result
  }

  // Sign out
  function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

