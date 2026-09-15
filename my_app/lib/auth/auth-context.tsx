"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";

import { auth, googleProvider, linkedinProvider } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isDemoMode: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name?: string) => Promise<void>;
  updateUserProfile: (name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isDemoMode: false,
  signIn: async () => { },
  signUp: async () => { },
  updateUserProfile: async () => { },
  signInWithGoogle: async () => { },
  signInWithLinkedIn: async () => { },
  logout: async () => { },
  resetPassword: async () => { }
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isDemoMode = false;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (email: string, pass: string, name?: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    if (name && res.user) {
      await updateProfile(res.user, { displayName: name });
    }
  };

  const updateUserProfile = async (name: string) => {
    if (!auth.currentUser) {
      throw new Error("You must be signed in to update your profile.");
    }

    await updateProfile(auth.currentUser, { displayName: name });
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signInWithLinkedIn = async () => {
    await signInWithPopup(auth, linkedinProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isDemoMode,
        signIn,
        signUp,
        updateUserProfile,
        signInWithGoogle,
        signInWithLinkedIn,
        logout,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
