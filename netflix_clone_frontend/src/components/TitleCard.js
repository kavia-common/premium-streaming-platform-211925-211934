import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyList } from '../context/MyListContext';

// PUBLIC_INTERFACE
/**
 * Individual title card with hover preview effects
 */
const TitleCard = ({ title, index }) => {
  const navigate = useNavigate();
  const { isInList, addTitle, removeTitle } = useMyList();
  const [showPreview, setShowPreview] = useState(false);
  const [previewTimeout, setPreviewTimeout] = useState(null);

  const inList = isInList(title.id);

  const handleMouseEnter = () => {
    // Show preview after 500ms hover
    const timeout = setTimeout(() => {
      setShowPreview(true);
    }, 500);
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
      className="scroll-snap-item flex-shrink-0 w-64 transition-transform duration-300 hover:scale-105 focus-within:scale-105 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title.title}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative bg-surface rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Thumbnail */}
        <div className="relative aspect-video">
          <img
            src={title.thumbnail}
            alt={title.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Hover Preview Overlay */}
          {showPreview && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 animate-fade-in">
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                {title.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-white/80 mb-2">
                <span className="bg-success/30 px-1.5 py-0.5 rounded">
                  {title.rating}
                </span>
                <span>{title.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-white text-black p-1.5 rounded-full hover:bg-white/90 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick();
                  }}
                  aria-label={`Play ${title.title}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </button>
                <button
                  className={`p-1.5 rounded-full transition-colors ${
                    inList ? 'bg-success text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  onClick={handleMyListClick}
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
        </div>

        {/* Card Info (always visible) */}
        <div className="p-3">
          <h3 className="font-semibold text-text text-sm mb-1 line-clamp-1">
            {title.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {title.genre.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-xs text-secondary bg-primary/10 px-2 py-0.5 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
