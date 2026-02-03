import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyList } from '../context/MyListContext';
import { getFeaturedTitle } from '../data/mockData';

// PUBLIC_INTERFACE
/**
 * Hero/Billboard component displaying featured content with Netflix styling
 */
const Billboard = () => {
  const navigate = useNavigate();
  const { isInList, addTitle, removeTitle } = useMyList();
  const title = getFeaturedTitle();

  const inList = isInList(title.id);

  const handleMyListClick = () => {
    if (inList) {
      removeTitle(title.id, title.title);
    } else {
      addTitle(title.id, title.title);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden animate-fade-in"
      style={{
        height: '56.25vw',
        maxHeight: '80vh',
        minHeight: '450px',
      }}
      role="region"
      aria-label="Featured content"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={title.thumbnail}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Gradient Overlays */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to right, rgba(20, 20, 20, 0.8) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: '40%',
          background: 'linear-gradient(to top, #141414 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div 
        className="absolute z-20 px-4 sm:px-6 lg:px-14"
        style={{
          bottom: '35%',
          maxWidth: '500px',
        }}
      >
        <h1 
          className="text-5xl md:text-6xl font-bold text-text-primary mb-4 animate-slide-in"
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
          }}
        >
          {title.title}
        </h1>
        
        <div className="flex items-center space-x-3 text-sm mb-4">
          <span className="text-success-green font-bold text-base">
            98% Match
          </span>
          <span 
            className="px-2 py-0.5 border text-xs font-semibold"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '2px',
            }}
          >
            {title.rating}
          </span>
          <span className="text-text-primary">{title.year}</span>
          <span className="text-text-primary">{title.duration}</span>
        </div>

        <p 
          className="text-lg text-text-primary mb-6 leading-relaxed line-clamp-3"
          style={{
            maxWidth: '450px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
          }}
        >
          {title.description}
        </p>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(`/title/${title.id}`)}
            className="bg-white hover:bg-white/75 text-black px-8 py-3 rounded font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bg-primary"
            style={{ fontSize: '1.125rem' }}
            aria-label={`Play ${title.title}`}
          >
            <span className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Play
            </span>
          </button>

          <button
            onClick={handleMyListClick}
            className="px-8 py-3 rounded font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bg-primary"
            style={{ 
              fontSize: '1.125rem',
              background: 'rgba(109, 109, 110, 0.7)',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.4)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.7)'}
            aria-label={inList ? `Remove ${title.title} from My List` : `Add ${title.title} to My List`}
          >
            <span className="flex items-center gap-3">
              {inList ? (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  In My List
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  My List
                </>
              )}
            </span>
          </button>

          <button
            onClick={() => navigate(`/title/${title.id}`)}
            className="p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bg-primary"
            style={{
              background: 'rgba(42, 42, 42, 0.6)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(42, 42, 42, 0.6)';
              e.target.style.transform = 'scale(1)';
            }}
            aria-label={`More info about ${title.title}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
