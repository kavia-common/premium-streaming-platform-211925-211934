import React, { useEffect, useState } from 'react';
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
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      className="relative w-full overflow-hidden"
      style={{
        height: '56.25vw',
        maxHeight: '80vh',
        minHeight: '450px',
      }}
      role="region"
      aria-label="Featured content"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={title.thumbnail}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Side Gradient Overlay (for text readability) */}
      <div 
        className="absolute inset-y-0 left-0 z-[1]"
        style={{
          width: '40%',
          background: 'linear-gradient(to right, rgba(20, 20, 20, 0.8) 0%, transparent 100%)',
        }}
      />

      {/* Bottom Gradient Overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          height: '40%',
          background: 'linear-gradient(to top, #141414 0%, transparent 100%)',
        }}
      />

      {/* Content Container */}
      <div 
        className="absolute z-20 left-4 sm:left-8 md:left-12 lg:left-14 md:right-1/2"
        style={{
          bottom: isDesktop ? '35%' : '20%',
          maxWidth: '500px',
        }}
      >
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            lineHeight: '1.2',
          }}
        >
          {title.title}
        </h1>
        
        <div className="flex items-center gap-3 mb-6">
          <span 
            className="font-bold"
            style={{
              color: '#46D369',
              fontSize: '0.875rem',
            }}
          >
            98% Match
          </span>
          <span 
            className="font-semibold text-white"
            style={{
              padding: '0.125rem 0.5rem',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '2px',
              fontSize: '0.75rem',
            }}
          >
            {title.rating}
          </span>
          <span className="text-white" style={{ fontSize: '0.875rem' }}>{title.year}</span>
          <span className="text-white" style={{ fontSize: '0.875rem' }}>{title.duration}</span>
        </div>

        <p 
          className="text-white mb-6"
          style={{
            fontSize: '1.125rem',
            lineHeight: '1.5',
            maxWidth: '450px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title.description}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/title/${title.id}`)}
            className="bg-white text-black font-semibold rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            style={{ 
              padding: isDesktop ? '0.75rem 2rem' : '0.5rem 1.5rem',
              fontSize: isDesktop ? '1.125rem' : '1rem',
              borderRadius: '0.25rem',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.75)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
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
            className="font-semibold rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            style={{ 
              padding: isDesktop ? '0.75rem 2rem' : '0.5rem 1.5rem',
              fontSize: isDesktop ? '1.125rem' : '1rem',
              background: 'rgba(109, 109, 110, 0.7)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '0.25rem',
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
            className="rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            style={{
              width: '2rem',
              height: '2rem',
              padding: '0.5rem',
              background: 'rgba(42, 42, 42, 0.6)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(42, 42, 42, 0.6)';
              e.currentTarget.style.transform = 'scale(1)';
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
