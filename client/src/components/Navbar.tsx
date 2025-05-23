
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-vtc-red">VTC</span>
            <span className="ml-2 text-vtc-darkbrown font-medium">Textile Co.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-vtc-red transition-colors duration-200">
              Home
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-vtc-red transition-colors duration-200">
              Search
            </Link>
            <Link to="/bulk-order" className="text-gray-700 hover:text-vtc-red transition-colors duration-200">
              Bulk Orders
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-vtc-red transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* User & Cart Icons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center">
                  <Link 
                    to="/profile" 
                    className="text-sm text-gray-600 mr-2 hover:text-vtc-red transition-colors duration-200"
                  >
                    Hello, {user?.name}
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={logout} 
                    className="text-gray-700 hover:text-vtc-red"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
                <Link to="/cart" className="relative p-2">
                  <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-vtc-red transition-colors duration-200" />
                  {getCartCount() > 0 && (
                    <span className="absolute top-0 right-0 bg-vtc-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-700 hover:text-vtc-red"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t mt-2 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 py-2 hover:text-vtc-red transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/search" 
                className="text-gray-700 py-2 hover:text-vtc-red transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link 
                to="/bulk-order" 
                className="text-gray-700 py-2 hover:text-vtc-red transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Bulk Orders
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 py-2 hover:text-vtc-red transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/cart" 
                    className="text-gray-700 py-2 hover:text-vtc-red transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-700 py-2 hover:text-vtc-red transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4 inline mr-1" />
                    Logout ({user?.name})
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="text-gray-700 py-2 hover:text-vtc-red transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 inline mr-1" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
