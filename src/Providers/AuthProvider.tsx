import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext(null);

type children = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: children) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const googleProvider = new GoogleAuthProvider().addScope('email');

  // create user
  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login
  const login = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // social login
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  // type AuthInfo = {
  //   login: (a: string, b: string) => {};
  //   loading: boolean;
  //   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  //   createUser: (a: string, b: string) => {};
  //   logout: () => {};
  //   googleSignIn: () => {};
  //   user: object | null;
  // };

  const authInfo: any = {
    login,
    loading,
    setLoading,
    createUser,
    logout,
    googleSignIn,
    user,
  };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
