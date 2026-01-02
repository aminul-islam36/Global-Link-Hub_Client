import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

//----------------------- Firebase  Auth Start -----------------
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

//----------------------- Firebase  Auth End -----------------

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Google SingIn func
  const userWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Create  User Function

  const registerWithEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user Func

  const loginWithEmailPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutFunc = () => {
    return signOut(auth);
  };

  // user observer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInf = {
    userWithGoogle,
    registerWithEmailPass,
    loginWithEmailPass,
    logOutFunc,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInf}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
