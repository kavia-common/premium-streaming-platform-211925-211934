import React, { useRef, useState } from 'react';
import TitleCard from './TitleCard';

// PUBLIC_INTERFACE
/**
 * Horizontal scrolling row of title cards with Netflix-style navigation arrows
 */
const ContentRow = ({ title, titles, id }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 10);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.offsetWidth - 10
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scroll('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scroll('right');
    }
  };

  return (
    <section className="mb-12 px-4 sm:px-6 lg:px-14" aria-labelledby={`row-title-${id}`}>
      <h2
        id={`row-title-${id}`}
        className="text-2xl font-bold mb-4"
        style={{ color: '#E5E5E5' }}
      >
        {title}
      </h2>

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100"
            style={{
              width: '3.5rem',
              background: 'rgba(20, 20, 20, 0.5)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(20, 20, 20, 0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(20, 20, 20, 0.5)'}
            aria-label={`Scroll ${title} left`}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100"
            style={{
              width: '3.5rem',
              background: 'rgba(20, 20, 20, 0.5)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(20, 20, 20, 0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(20, 20, 20, 0.5)'}
            aria-label={`Scroll ${title} right`}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          className="flex gap-2 overflow-x-auto scrollbar-hide py-2"
          role="list"
          tabIndex={0}
          aria-label={`${title} content carousel`}
        >
          {titles.map((title, index) => (
            <TitleCard key={title.id} title={title} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentRow;
