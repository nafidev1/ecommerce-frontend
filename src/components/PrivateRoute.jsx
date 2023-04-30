import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const auth = user !== null;
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
