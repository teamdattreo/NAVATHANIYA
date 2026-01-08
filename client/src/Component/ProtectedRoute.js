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

  return (
    <>
      <style>{`
        .admin-protected-wrap {
          animation: adminFade 0.5s ease;
        }

        @keyframes adminFade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="admin-protected-wrap">{children}</div>
    </>
  );
};

export default ProtectedRoute;
