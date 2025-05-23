
import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon, PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-vtc-red">VTC</span>
              <span className="ml-2 text-vtc-darkbrown font-medium">Knitting Co.</span>
            </div>
            <p className="text-gray-600 mt-2">
              Premium quality innerwear manufactured in Tiruppur, Tamil Nadu, India.
            </p>
            <div className="flex items-center space-x-1 text-vtc-brown font-medium">
              <span>🇮🇳</span>
              <span>Made in India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-vtc-darkbrown">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-vtc-red transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-vtc-red transition-colors duration-200">
                  Search Products
                </Link>
              </li>
              <li>
                <Link to="/bulk-order" className="text-gray-600 hover:text-vtc-red transition-colors duration-200">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-vtc-red transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-vtc-red transition-colors duration-200">
                  View Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-vtc-darkbrown">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-vtc-red mr-2 mt-0.5" />
                <span className="text-gray-600">
                  123 Textile Park, Tiruppur, Tamil Nadu - 641603, India
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-vtc-red mr-2" />
                <span className="text-gray-600">+91-9876543210</span>
              </li>
              <li className="flex items-center">
                <MailIcon className="h-5 w-5 text-vtc-red mr-2" />
                <span className="text-gray-600">contact@vtcknitting.com</span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-vtc-red transition-colors duration-200">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-vtc-red transition-colors duration-200">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-vtc-red transition-colors duration-200">
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} VTC Knitting Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
