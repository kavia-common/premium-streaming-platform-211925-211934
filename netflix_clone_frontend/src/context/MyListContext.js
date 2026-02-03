import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMyList, addToMyList, removeFromMyList, isInMyList } from '../utils/localStorage';
import { useNotification } from './NotificationContext';

const MyListContext = createContext();

// PUBLIC_INTERFACE
/**
 * Hook to access My List context
 */
export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyList must be used within MyListProvider');
  }
  return context;
};

// PUBLIC_INTERFACE
/**
 * Provider component for My List functionality
 */
export const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);
  const { showToast } = useNotification();

  useEffect(() => {
    // Load My List from localStorage on mount
    setMyList(getMyList());
  }, []);

  const addTitle = useCallback((titleId, titleName) => {
    if (addToMyList(titleId)) {
      setMyList(getMyList());
      showToast(`Added "${titleName}" to My List`, 'success');
      return true;
    }
    showToast('Failed to add to My List', 'error');
    return false;
  }, [showToast]);

  const removeTitle = useCallback((titleId, titleName) => {
    if (removeFromMyList(titleId)) {
      setMyList(getMyList());
      showToast(`Removed "${titleName}" from My List`, 'info');
      return true;
    }
    showToast('Failed to remove from My List', 'error');
    return false;
  }, [showToast]);

  const isInList = useCallback((titleId) => {
    return isInMyList(titleId);
  }, []);

  return (
    <MyListContext.Provider value={{ myList, addTitle, removeTitle, isInList }}>
      {children}
    </MyListContext.Provider>
  );
};
