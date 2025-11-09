import React, { useContext } from "react";
import Loading from "../Components/Loading";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" state={location.pathname} />;
  return children;
};

export default PrivateRoute;
