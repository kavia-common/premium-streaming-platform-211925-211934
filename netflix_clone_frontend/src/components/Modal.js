import React, { useEffect } from 'react';

// PUBLIC_INTERFACE
/**
 * Reusable modal component with Netflix dark styling and accessibility features
 */
const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Focus trap
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div 
        className="relative bg-bg-elevated rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-up"
      >
        <div 
          className="sticky top-0 z-10 bg-bg-elevated px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          {title && (
            <h2 id="modal-title" className="text-xl font-bold text-text-primary">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            style={{
              background: '#181818',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => e.target.style.background = '#2F2F2F'}
            onMouseLeave={(e) => e.target.style.background = '#181818'}
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
