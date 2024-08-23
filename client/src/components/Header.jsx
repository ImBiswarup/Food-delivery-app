import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthModalToggle = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-2xl font-bold dark:text-white">Khanaa Peenaaa</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
            >
              Contact
            </Link>

            {user ? (
              <div className="relative">
                <button
                  className="flex items-center text-gray-900 dark:text-white"
                  onClick={handleDropdownToggle}
                >
                  <FaUserCircle size={24} />
                  <span className="ml-2">{user?.user?.name}</span>
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 bg-white dark:bg-gray-800 rounded shadow-lg mt-2 w-48 z-10">
                    <li>
                      <Link
                        to="/profile"
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <button
                className="text-gray-900 py-2 px-4 rounded hover:bg-blue-700 dark:text-white"
                onClick={handleAuthModalToggle}
              >
                Create Account
              </button>
            )}
          </div>
          <button
            type="button"
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            onClick={handleMenuToggle}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4 bg-white dark:bg-gray-900">
              <li>
                <Link
                  to="/"
                  className="block text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  onClick={handleMenuToggle}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="block text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  onClick={handleMenuToggle}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  onClick={handleMenuToggle}
                >
                  Contact
                </Link>
              </li>

              {user ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="block text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                      onClick={handleMenuToggle}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="block text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                    // onClick={handleMenuToggle}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    className="text-gray-900 py-2 px-4 rounded hover:bg-blue-700 dark:text-white"
                    onClick={() => {
                      handleAuthModalToggle();
                      handleMenuToggle();
                    }}
                  >
                    Create Account
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
      <AuthModal isVisible={isAuthModalOpen} onClose={handleAuthModalToggle} />
    </>
  );
};

export default Header;
