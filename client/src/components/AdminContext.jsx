
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AdminContext = createContext(undefined);

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Admin provider component
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  // Load admin from localStorage on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem('vtcAdmin');
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.error('Failed to parse admin data:', error);
        localStorage.removeItem('vtcAdmin');
      }
    }
    setIsAdminLoading(false);
  }, []);

  // Logout admin
  const logoutAdmin = () => {
    localStorage.removeItem('vtcAdmin');
    setAdmin(null);
  };

  // Check if user has admin role
  const isAdmin = admin && admin.role === 'admin';

  return (
    <AdminContext.Provider
      value={{
        admin,
        isAdmin,
        isAdminLoading,
        logoutAdmin
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
