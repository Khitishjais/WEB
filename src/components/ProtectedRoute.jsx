import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-screen" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="logo-icon animate-float" style={{ fontSize: '3rem' }}>⚕️</div>
      </div>
    );
  }

  if (!user) {
    // If we're on the booking page, we want to stay there but show the login modal
    if (location.pathname === '/booking') {
      return (
        <>
          <LoginModal 
            isOpen={showLogin} 
            onClose={() => {
              setShowLogin(false);
              // Redirect back to home if they cancel login on a protected route
              window.location.href = '/';
            }} 
          />
          <div style={{ filter: 'blur(5px)', pointerEvents: 'none' }}>
            {children}
          </div>
        </>
      );
    }
    // For other protected routes like Dashboard, redirect to Home and show modal is complex,
    // so we just redirect to home with a state to show login.
    return <Navigate to="/" state={{ showLogin: true, from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
