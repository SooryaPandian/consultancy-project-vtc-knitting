
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from './AdminContext';

const AdminRoute = ({ element }) => {
  const { isAdmin, isAdminLoading } = useAdmin();
  const location = useLocation();
  
  // Show loading while checking admin status
  if (isAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vtc-red"></div>
      </div>
    );
  }
  
  // Redirect to admin login if not an admin
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  // Render the protected admin component
  return <>{element}</>;
};

export default AdminRoute;
