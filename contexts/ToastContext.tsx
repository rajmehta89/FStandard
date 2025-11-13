import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { Toast } from '../components/ui';

interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [duration, setDuration] = useState(4000);

  // Function to check and show pending toast
  const checkPendingToast = useCallback(() => {
    // Don't show if already visible
    if (isVisible) {
      return;
    }
    
    const pendingToast = localStorage.getItem('pendingToast');
    if (pendingToast) {
      try {
        const { message, duration: toastDuration } = JSON.parse(pendingToast);
        console.log('Showing pending toast:', message); // Debug log
        setToastMessage(message);
        setDuration(toastDuration || 4000);
        setIsVisible(true);
        // Clear from localStorage after showing
        localStorage.removeItem('pendingToast');
      } catch (error) {
        console.error('Error parsing pending toast:', error);
        localStorage.removeItem('pendingToast');
      }
    }
  }, [isVisible]);

  // Check for pending toast message on mount
  useEffect(() => {
    checkPendingToast();
  }, [checkPendingToast]);

  // Check for pending toast when hash changes (page navigation)
  useEffect(() => {
    const handleHashChange = () => {
      // Small delay to ensure page has loaded
      setTimeout(() => {
        checkPendingToast();
      }, 300);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Also check periodically in case hashchange doesn't fire (programmatic navigation)
    // But only check a few times, then stop to avoid performance issues
    let checkCount = 0;
    const maxChecks = 10; // Check for 5 seconds (10 * 500ms)
    const checkInterval = setInterval(() => {
      if (checkCount < maxChecks) {
        checkPendingToast();
        checkCount++;
      } else {
        clearInterval(checkInterval);
      }
    }, 500);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearInterval(checkInterval);
    };
  }, [checkPendingToast]);

  const showToast = (message: string, toastDuration: number = 4000) => {
    setToastMessage(message);
    setDuration(toastDuration);
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
    // Clear message after animation
    setTimeout(() => {
      setToastMessage('');
    }, 400);
  };

  // Function to show toast that persists across navigation
  const showPersistentToast = (message: string, toastDuration: number = 4000) => {
    // Store in localStorage so it persists across page navigation
    localStorage.setItem('pendingToast', JSON.stringify({ message, duration: toastDuration }));
    // Also show immediately if on same page
    showToast(message, toastDuration);
  };

  return (
    <ToastContext.Provider value={{ showToast: showPersistentToast, hideToast }}>
      {children}
      {/* Global Toast - rendered at app level so it persists */}
      <Toast
        message={toastMessage}
        isVisible={isVisible}
        onClose={hideToast}
        duration={duration}
      />
    </ToastContext.Provider>
  );
};

