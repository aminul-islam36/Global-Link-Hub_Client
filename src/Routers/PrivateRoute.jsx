import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Loader";
import GlobalLoader from "../Components/GlobalLoader ";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <GlobalLoader />;
  }
  if (!user) return <Navigate to="/login" state={location.pathname} />;
  return children;
};

export default PrivateRoute;
