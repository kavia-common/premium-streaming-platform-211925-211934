import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Sticky navigation bar component with scroll effects
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/genres', label: 'Genres' },
    { path: '/my-list', label: 'My List' },
    { path: '/kids', label: 'Kids' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface shadow-lg' : 'bg-gradient-to-b from-primary/80 to-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-primary hover:text-success transition-colors duration-200"
              aria-label="Home"
            >
              <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                StreamFlix
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-primary text-white'
                    : scrolled
                    ? 'text-text hover:bg-primary/10 hover:text-primary'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-current={isActive(path) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Search Link */}
          <div className="flex items-center space-x-4">
            <Link
              to="/search"
              className={`p-2 rounded-full transition-colors duration-200 ${
                scrolled
                  ? 'text-text hover:bg-primary/10'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
