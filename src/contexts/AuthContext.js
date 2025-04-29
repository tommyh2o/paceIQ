import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register with email and password
  async function signup(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      if (userData.username) {
        await updateProfile(user, {
          displayName: userData.username
        });
      }
      
      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        username: userData.username || "",
        name: userData.name || "",
        phoneNumber: userData.phoneNumber || "",
        dateOfBirth: userData.dateOfBirth || "",
        ageRange: userData.ageRange || "",
        createdAt: new Date().toISOString()
      });
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Sign in with email and password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign in with Google
  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user document exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        // If first time signing in with Google, create a user document
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username: user.displayName || "",
          name: user.displayName || "",
          photoURL: user.photoURL || "",
          createdAt: new Date().toISOString()
        });
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Sign in with Apple
  async function signInWithApple() {
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user document exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        // If first time signing in with Apple, create a user document
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username: user.displayName || "",
          name: user.displayName || "",
          photoURL: user.photoURL || "",
          createdAt: new Date().toISOString()
        });
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Logout function
  function logout() {
    return signOut(auth);
  }

  // Update user profile
  async function updateUserProfile(userData) {
    if (!currentUser) return;
    
    try {
      // Update display name if provided
      if (userData.username) {
        await updateProfile(currentUser, {
          displayName: userData.username
        });
      }
      
      // Update user data in Firestore
      await setDoc(doc(db, "users", currentUser.uid), userData, { merge: true });
    } catch (error) {
      throw error;
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
    signInWithApple,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}