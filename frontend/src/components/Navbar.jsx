import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative bg-accent-light dark:bg-accent-dark mb-8">
      {/* Fade effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-transparent to-accent-light dark:to-accent-dark pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
        <div className="flex justify-between h-28">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-3 rounded-md text-primary-light dark:text-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-6 py-4 rounded-lg text-lg font-montserrat font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-dark shadow-md'
                  : 'text-secondary-dark dark:text-secondary-light hover:bg-secondary-light dark:hover:bg-secondary-dark hover:shadow-md'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/menu/vip"
              className={`px-6 py-4 rounded-lg text-lg font-montserrat font-medium transition-all duration-300 ${
                isActive('/menu/vip')
                  ? 'bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-dark shadow-md'
                  : 'text-secondary-dark dark:text-secondary-light hover:bg-secondary-light dark:hover:bg-secondary-dark hover:shadow-md'
              }`}
            >
              Vip Menu
            </Link>
            <Link
              to="/menu/regular"
              className={`px-6 py-4 rounded-lg text-lg font-montserrat font-medium transition-all duration-300 ${
                isActive('/menu/regular')
                  ? 'bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-dark shadow-md'
                  : 'text-secondary-dark dark:text-secondary-light hover:bg-secondary-light dark:hover:bg-secondary-dark hover:shadow-md'
              }`}
            >
              Regular Menu
            </Link>
            
            <Link
              to="/about"
              className={`px-6 py-4 rounded-lg text-lg font-montserrat font-medium transition-all duration-300 ${
                isActive('/about')
                  ? 'bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-dark shadow-md'
                  : 'text-secondary-dark dark:text-secondary-light hover:bg-secondary-light dark:hover:bg-secondary-dark hover:shadow-md'
              }`}
            >
              About
            </Link>
            
            <Link
              to="/contact"
              className={`px-6 py-4 rounded-lg text-lg font-montserrat font-medium transition-all duration-300 ${
                isActive('/contact')
                  ? 'bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-dark shadow-md'
                  : 'text-secondary-dark dark:text-secondary-light hover:bg-secondary-light dark:hover:bg-secondary-dark hover:shadow-md'
              }`}
            >
              Contact
            </Link>

            <div className="ml-6">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-6`}>
          <div className="px-2 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-4 rounded-lg text-lg font-montserrat font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-dark shadow-md'
                  : 'text-secondary-dark dark:text-secondary-light hover:bg-secondary-light dark:hover:bg-secondary-dark hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link
              to="/menu/vip"
              className={`block px-4 py-4 rounded-lg text-lg font-montserrat font-medium transition-all duration-300 ${
                isActive('/menu/vip')
                  ? 'bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-dark shadow-md'
                  : 'text-secondary-dark dark:text-secondary-light hover:bg-secondary-light dark:hover:bg-secondary-dark hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Vip Menu
            </Link>
            <Link
              to="/menu/regular"
              className={`block px-4 py-4 rounded-lg text-lg font-montserrat font-medium transition-all duration-300 ${
                isActive('/menu/regular')
                  ? 'bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-dark shadow-md'
                  : 'text-secondary-dark dark:text-secondary-light hover:bg-secondary-light dark:hover:bg-secondary-dark hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Regular Menu
            </Link>
            
            <Link
              to="/about"
              className={`block px-4 py-4 rounded-lg text-lg font-montserrat font-medium transition-all duration-300 ${
                isActive('/about')
                  ? 'bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-dark shadow-md'
                  : 'text-secondary-dark dark:text-secondary-light hover:bg-secondary-light dark:hover:bg-secondary-dark hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <Link
              to="/contact"
              className={`block px-4 py-4 rounded-lg text-lg font-montserrat font-medium transition-all duration-300 ${
                isActive('/contact')
                  ? 'bg-primary-light dark:bg-primary-dark text-accent-light dark:text-accent-dark shadow-md'
                  : 'text-secondary-dark dark:text-secondary-light hover:bg-secondary-light dark:hover:bg-secondary-dark hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="px-4 py-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;