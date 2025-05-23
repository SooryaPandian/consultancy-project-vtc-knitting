import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user, isAuthenticated } = useAuth();

  // Wait for the authentication state to initialize
  if (user === undefined) {
    return null; // Or a loading spinner
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
