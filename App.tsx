
import React, { useState, useEffect, useContext } from 'react';
import LandingPage from './components/LandingPage';
import TraderDashboardPage from './components/DashboardPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Navbar, Footer } from './components/shared';
import { AuthContext } from './contexts/AuthContext';
import type { AuthContextType } from './types';

const AppContent: React.FC = () => {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const renderContent = () => {
    const path = hash.split('?')[0]; // Ignore query params for routing
    switch (path) {
      case '#/signin':
        return <SignInPage />;
      case '#/signup':
        return <SignUpPage />;
      case '#/dashboard/trader':
        return <ProtectedRoute role="trader"><TraderDashboardPage /></ProtectedRoute>;
      case '#/dashboard/admin':
        return <ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>;
      case '':
      case '#':
      case '#/':
        return <LandingPage />;
      default:
        // You could add a 404 component here
        return <LandingPage />;
    }
  };

  return renderContent();
};

function App() {
  const { loading } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="font-sans">
      <Navbar />
      {loading ? (
        <div className="flex flex-col justify-center items-center fixed inset-0 bg-background z-50">
          <div className="text-center">
            <svg className="w-20 h-20 text-primary mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
              <path className="infinity-loader-path" d="M 6 12 C 6 8, 10 8, 12 12 C 14 16, 18 16, 18 12 C 18 8, 14 8, 12 12 C 10 16, 6 16, 6 12 Z"/>
            </svg>
            <p className="mt-4 text-lg text-body-text font-serif tracking-wider">Loading FStandard</p>
          </div>
        </div>
      ) : (
        <AppContent />
      )}
      <Footer />
    </div>
  );
}

export default App;