import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authcontent";

export default function PrivateRoute({ children }) {
  const { isAuthed } = useAuth();
  return isAuthed ? children : <Navigate to="/login" replace />;
}
