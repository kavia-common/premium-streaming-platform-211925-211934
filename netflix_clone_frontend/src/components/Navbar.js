import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// =============================================================================
// TRANSITION DURATION CONFIGURATION
// =============================================================================
// Control the speed of the Navbar background transition from transparent to solid.
// Adjust ACTIVE_PRESET to switch between presets, or customize TRANSITION_MS directly.

const TRANSITION_PRESETS = {
  fast: 150,    // Quick, snappy transition
  normal: 250,  // Balanced, smooth transition (default)
  slow: 400,    // Slower, more dramatic transition
};

// Set the active preset here (options: 'fast', 'normal', 'slow')
const ACTIVE_PRESET = 'normal';

// Transition duration in milliseconds (derived from preset)
const TRANSITION_MS = TRANSITION_PRESETS[ACTIVE_PRESET];

// =============================================================================

// PUBLIC_INTERFACE
/**
 * Sticky navigation bar component with Netflix styling and scroll effects.
 * Implements transparent-to-solid transition on scroll with smooth animations.
 * 
 * Transition speed can be configured via TRANSITION_PRESETS and ACTIVE_PRESET constants above.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Netflix-like scroll threshold (70px)
      setScrolled(window.scrollY > 70);
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
      className={`fixed top-0 left-0 right-0 z-50 ease-out ${
        scrolled 
          ? 'bg-bg-primary shadow-lg' 
          : 'bg-transparent'
      }`}
      style={{ 
        height: '68px',
        transition: `background-color ${TRANSITION_MS}ms ease-out, box-shadow ${TRANSITION_MS}ms ease-out`,
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-14 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-3xl font-bold tracking-tight transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:ring-offset-2 focus:ring-offset-transparent rounded"
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
                className={`text-sm font-normal transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 ${
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
              className="p-2 rounded-full transition-all duration-200 text-text-primary hover:text-text-secondary focus:outline-none focus:ring-2 focus:ring-netflix-red focus:ring-offset-2 focus:ring-offset-transparent"
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
