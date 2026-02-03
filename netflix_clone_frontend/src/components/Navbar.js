import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Sticky navigation bar component with Netflix styling and scroll effects
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
        scrolled ? 'bg-bg-primary' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
      style={{ height: '68px' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-14 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-3xl font-bold tracking-tight transition-colors duration-200"
              style={{ color: '#E50914' }}
              aria-label="Home"
            >
              NETFLIX
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-5">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-normal transition-colors duration-200 ${
                  isActive(path)
                    ? 'text-text-primary font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-current={isActive(path) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Search Icon */}
          <div className="flex items-center">
            <Link
              to="/search"
              className="p-2 rounded-full transition-all duration-200 text-text-primary hover:text-text-secondary"
              aria-label="Search"
            >
              <svg
                className="w-6 h-6"
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
