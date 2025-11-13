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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google SingIn func
  const userWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Create  User FUnction

  const registerWithEmailPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user Func

  const loginWithEmailPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutFunc = () => {
    setLoading(true);
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
    setUser,
    user,
    setLoading,
    loading,
  };
  return (
    <AuthContext.Provider value={authInf}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
