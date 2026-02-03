// PUBLIC_INTERFACE
/**
 * Utility functions for managing localStorage with error handling
 */

const MY_LIST_KEY = 'netflix_clone_my_list';
const NOTIFICATIONS_KEY = 'netflix_clone_notifications';

// PUBLIC_INTERFACE
/**
 * Get My List from localStorage
 */
export const getMyList = () => {
  try {
    const data = localStorage.getItem(MY_LIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading My List from localStorage:', error);
    return [];
  }
};

// PUBLIC_INTERFACE
/**
 * Add title to My List
 */
export const addToMyList = (titleId) => {
  try {
    const myList = getMyList();
    if (!myList.includes(titleId)) {
      myList.push(titleId);
      localStorage.setItem(MY_LIST_KEY, JSON.stringify(myList));
    }
    return true;
  } catch (error) {
    console.error('Error adding to My List:', error);
    return false;
  }
};

// PUBLIC_INTERFACE
/**
 * Remove title from My List
 */
export const removeFromMyList = (titleId) => {
  try {
    const myList = getMyList();
    const filtered = myList.filter(id => id !== titleId);
    localStorage.setItem(MY_LIST_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing from My List:', error);
    return false;
  }
};

// PUBLIC_INTERFACE
/**
 * Check if title is in My List
 */
export const isInMyList = (titleId) => {
  const myList = getMyList();
  return myList.includes(titleId);
};

// PUBLIC_INTERFACE
/**
 * Get notifications from localStorage
 */
export const getNotifications = () => {
  try {
    const data = localStorage.getItem(NOTIFICATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading notifications from localStorage:', error);
    return [];
  }
};

// PUBLIC_INTERFACE
/**
 * Add notification
 */
export const addNotification = (notification) => {
  try {
    const notifications = getNotifications();
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...notification
    };
    notifications.unshift(newNotification);
    // Keep only last 50 notifications
    const trimmed = notifications.slice(0, 50);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(trimmed));
    return newNotification;
  } catch (error) {
    console.error('Error adding notification:', error);
    return null;
  }
};

// PUBLIC_INTERFACE
/**
 * Clear all notifications
 */
export const clearNotifications = () => {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error('Error clearing notifications:', error);
    return false;
  }
};
