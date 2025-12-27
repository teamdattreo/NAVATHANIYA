import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin()) {
    // Save the current location to redirect back after login
    const currentPath = window.location.pathname;
    return (
      <Redirect 
        to={{ 
          pathname: "/admin/login",
          state: { from: currentPath }
        }} 
      />
    );
  }

  return children;
};

export default ProtectedRoute;
