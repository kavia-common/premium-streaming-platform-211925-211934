import React, { useRef, useState } from 'react';
import TitleCard from './TitleCard';

// PUBLIC_INTERFACE
/**
 * Horizontal scrolling row of title cards with navigation arrows
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
    <section className="mb-10" aria-labelledby={`row-title-${id}`}>
      <h2
        id={`row-title-${id}`}
        className="text-2xl font-bold text-text mb-4 px-4 sm:px-6 lg:px-8"
      >
        {title}
      </h2>

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-30 bg-gradient-to-r from-background to-transparent w-16 flex items-center justify-start pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100"
            aria-label={`Scroll ${title} left`}
          >
            <div className="bg-primary/80 hover:bg-primary text-white p-2 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-30 bg-gradient-to-l from-background to-transparent w-16 flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100"
            aria-label={`Scroll ${title} right`}
          >
            <div className="bg-primary/80 hover:bg-primary text-white p-2 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-snap-x px-4 sm:px-6 lg:px-8 py-2"
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
