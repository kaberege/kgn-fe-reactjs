import React from 'react';
import { Navigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
   const useAuth = "useAuth";
    //const navigate = useNavigate();
  const isAuthenticated = true; // Simulate authentication

  if (!isAuthenticated) {
    // Redirect to home or login page if not authenticated
    return <Navigate to="/"/>;
    
    
  }

  return children;
};

export default ProtectedRoute;
