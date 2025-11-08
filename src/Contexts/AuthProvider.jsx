import React from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const authInf = {
    name: "name",
  };
  return <AuthContext authInf={authInf}>{children}</AuthContext>;
};

export default AuthProvider;
