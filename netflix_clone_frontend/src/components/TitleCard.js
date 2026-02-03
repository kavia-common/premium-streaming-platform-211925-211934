import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyList } from '../context/MyListContext';

// PUBLIC_INTERFACE
/**
 * Individual title card with Netflix-style hover preview effects
 */
const TitleCard = ({ title, index }) => {
  const navigate = useNavigate();
  const { isInList, addTitle, removeTitle } = useMyList();
  const [showPreview, setShowPreview] = useState(false);
  const [previewTimeout, setPreviewTimeout] = useState(null);

  const inList = isInList(title.id);

  const handleMouseEnter = () => {
    // Show preview after 300ms hover
    const timeout = setTimeout(() => {
      setShowPreview(true);
    }, 300);
    setPreviewTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (previewTimeout) {
      clearTimeout(previewTimeout);
    }
    setShowPreview(false);
  };

  const handleMyListClick = (e) => {
    e.stopPropagation();
    if (inList) {
      removeTitle(title.id, title.title);
    } else {
      addTitle(title.id, title.title);
    }
  };

  const handleCardClick = () => {
    navigate(`/title/${title.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className="flex-shrink-0 cursor-pointer"
      style={{ 
        width: '250px',
        transition: 'transform 300ms cubic-bezier(0.5, 0, 0.1, 1)',
        transitionDelay: showPreview ? '300ms' : '0ms',
        transform: showPreview ? 'scale(1.5) translateY(-10px)' : 'scale(1)',
        zIndex: showPreview ? 50 : 1,
        animationDelay: `${index * 50}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title.title}`}
    >
      <div 
        className="relative bg-bg-card rounded overflow-hidden"
        style={{
          aspectRatio: '16 / 9',
          boxShadow: showPreview ? '0 8px 24px rgba(0, 0, 0, 0.8)' : 'none',
        }}
      >
        {/* Thumbnail */}
        <img
          src={title.thumbnail}
          alt={title.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Hover Preview Overlay */}
        {showPreview && (
          <div 
            className="absolute inset-0 flex flex-col justify-end p-4 animate-fade-in"
            style={{
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%)',
            }}
          >
            <h3 className="text-white font-semibold text-base mb-2 line-clamp-1">
              {title.title}
            </h3>
            <div className="flex items-center space-x-2 text-xs mb-2">
              <span className="text-success-green font-bold">
                95% Match
              </span>
              <span 
                className="px-1.5 py-0.5 text-white"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '2px',
                  fontSize: '0.625rem',
                }}
              >
                {title.rating}
              </span>
              <span className="text-text-secondary">{title.year}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'white',
                  color: 'black',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick();
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                aria-label={`Play ${title.title}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
              <button
                className="flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: '32px',
                  height: '32px',
                  background: inList ? '#46D369' : 'rgba(42, 42, 42, 0.6)',
                  border: inList ? 'none' : '2px solid rgba(255, 255, 255, 0.5)',
                  color: 'white',
                }}
                onClick={handleMyListClick}
                onMouseEnter={(e) => {
                  if (!inList) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  if (!inList) e.currentTarget.style.background = 'rgba(42, 42, 42, 0.6)';
                }}
                aria-label={inList ? `Remove from My List` : `Add to My List`}
              >
                {inList ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Card Info (always visible when not hovering) */}
        {!showPreview && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">
              {title.title}
            </h3>
            <div className="flex flex-wrap gap-1">
              {title.genre.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: '#E5E5E5',
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleCard;
