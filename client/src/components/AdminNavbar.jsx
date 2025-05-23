import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import { LogOut, LayoutDashboard, Package, ShoppingCart, Users, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logoutAdmin } = useAdmin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg z-50 sticky top-0 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center group">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold bg-gradient-to-r from-vtc-red to-vtc-darkbrown bg-clip-text text-transparent"
            >
              VTC
            </motion.span>
            <span className="ml-2 text-vtc-darkbrown font-semibold opacity-80">Admin</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { path: '/admin/products', icon: Package, label: 'Products' },
              { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
              { path: '/admin/customers', icon: Users, label: 'Customers' },
              { path: '/admin/settings', icon: Settings, label: 'Settings' },
            ].map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2
                  ${isActiveLink(path)
                    ? 'bg-vtc-red text-white shadow-md shadow-vtc-red/20'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Icon className={`h-5 w-5 ${isActiveLink(path) ? 'text-white' : 'text-gray-500'}`} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="px-4 py-2 rounded-full bg-gray-100">
              <span className="text-sm font-medium text-gray-700">
                {admin?.name || 'Admin'}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-gray-700 hover:text-vtc-red hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-2">
              {[
                { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { path: '/admin/products', icon: Package, label: 'Products' },
                { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
                { path: '/admin/customers', icon: Users, label: 'Customers' },
                { path: '/admin/settings', icon: Settings, label: 'Settings' },
              ].map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2
                    ${isActiveLink(path)
                      ? 'bg-vtc-red text-white shadow-md shadow-vtc-red/20'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <Icon className={`h-5 w-5 ${isActiveLink(path) ? 'text-white' : 'text-gray-500'}`} />
                  <span>{label}</span>
                </Link>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="w-full justify-start text-gray-700 hover:text-vtc-red hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
