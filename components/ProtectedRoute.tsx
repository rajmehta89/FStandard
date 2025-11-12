import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthContextType, UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactElement;
  role: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext) as AuthContextType;

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading session...</p></div>;
  }

  if (!user) {
    // Redirect to sign-in page if not logged in
    window.location.hash = '#/signin';
    return null;
  }

  if (user.role !== role) {
    // Show access denied if roles don't match
    return (
        <div className="flex flex-col justify-center items-center h-screen text-center">
            <h1 className="text-4xl font-bold text-danger">Access Denied</h1>
            <p className="mt-4 text-body-text">You do not have permission to view this page.</p>
            <a href="#" className="mt-6 text-primary hover:text-hover-blue hover:underline">Go to Homepage</a>
        </div>
    );
  }

  return children;
};

export default ProtectedRoute;
