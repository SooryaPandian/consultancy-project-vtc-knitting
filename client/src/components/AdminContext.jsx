import React, { createContext, useContext, useState, useEffect } from "react";
import { BACKEND_URL } from "../data/config";
import { toast } from "@/components/ui/use-toast";

// Create the context
const AdminContext = createContext(undefined);

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

// Admin provider component
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check admin session on mount
  useEffect(() => {
    const fetchAdmin = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/admin/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.is_admin) {
            setAdmin(data);
            setIsAdminAuthenticated(true);
          } else {
            setAdmin(null);
            setIsAdminAuthenticated(false);
          }
        } else {
          setAdmin(null);
          setIsAdminAuthenticated(false);
        }
      } catch (err) {
        setAdmin(null);
        setIsAdminAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const adminLogin = async (email, password) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid admin credentials",
          variant: "destructive",
        });
        setAdmin(null);
        setIsAdminAuthenticated(false);
        return false;
      }
      setAdmin(data.admin);
      setIsAdminAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to Admin Dashboard",
      });
      return true;
    } catch (err) {
      toast({
        title: "Login Failed",
        description: "Something went wrong",
        variant: "destructive",
      });
      setAdmin(null);
      setIsAdminAuthenticated(false);
      return false;
    }
  };

  const adminLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setAdmin(null);
      setIsAdminAuthenticated(false);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (err) {
      toast({
        title: "Logout Failed",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        isAdminAuthenticated,
        loading,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
