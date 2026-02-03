import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyList } from '../context/MyListContext';
import { getFeaturedTitle } from '../data/mockData';

// PUBLIC_INTERFACE
/**
 * Hero/Billboard component displaying featured content
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
      className="relative h-[70vh] bg-gradient-to-b from-primary/20 to-background flex items-center animate-fade-in"
      role="region"
      aria-label="Featured content"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={title.thumbnail}
          alt=""
          className="w-full h-full object-cover opacity-30"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-text mb-4 animate-slide-in">
            {title.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-secondary mb-4">
            <span className="bg-success/20 text-success px-2 py-1 rounded font-semibold">
              {title.rating}
            </span>
            <span>{title.year}</span>
            <span>{title.duration}</span>
          </div>

          <p className="text-lg text-text/80 mb-8 leading-relaxed line-clamp-3">
            {title.description}
          </p>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/title/${title.id}`)}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Play ${title.title}`}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Play
              </span>
            </button>

            <button
              onClick={handleMyListClick}
              className="bg-surface hover:bg-primary/10 text-primary px-8 py-3 rounded-md font-semibold border-2 border-primary transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={inList ? `Remove ${title.title} from My List` : `Add ${title.title} to My List`}
            >
              <span className="flex items-center">
                {inList ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    In My List
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    My List
                  </>
                )}
              </span>
            </button>

            <button
              onClick={() => navigate(`/title/${title.id}`)}
              className="bg-surface/50 hover:bg-surface text-text p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`More info about ${title.title}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
