import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

// PUBLIC_INTERFACE
/**
 * Hook to access notification context
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

// PUBLIC_INTERFACE
/**
 * Provider component for notifications/toasts
 */
export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    const toast = { id, message, type };
    
    setToasts(prev => [...prev, toast]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showToast, toasts, removeToast }}>
      {children}
    </NotificationContext.Provider>
  );
};
