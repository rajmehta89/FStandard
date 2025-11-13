
import React, { useState, useEffect, useContext } from 'react';
import LandingPage from './pages/LandingPage';
import TraderDashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Navbar, Footer } from './components/shared';

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
  return (
    <div className="font-sans">
      <Navbar />
        <AppContent />
      <Footer />
    </div>
  );
}

export default App;