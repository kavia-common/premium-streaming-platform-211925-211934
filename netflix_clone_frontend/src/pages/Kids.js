import React from 'react';
import ContentRow from '../components/ContentRow';
import { getKidsTitles } from '../data/mockData';

// PUBLIC_INTERFACE
/**
 * Kids page with family-friendly content
 */
const Kids = () => {
  const kidsTitles = getKidsTitles();

  return (
    <main className="pt-16 min-h-screen bg-bg-primary">
      {/* Kids Header */}
      <div className="py-12 mb-8" style={{ background: 'linear-gradient(to right, rgba(70, 211, 105, 0.1), rgba(229, 9, 20, 0.1))' }}>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-14">
          <h1 className="text-5xl font-bold text-text-primary mb-4">
            Kids Corner
            <span className="ml-3" role="img" aria-label="kids">
              🎨
            </span>
          </h1>
          <p className="text-lg text-text-secondary">
            Safe, fun, and educational content for children of all ages!
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-8 space-y-8">
        {kidsTitles.length > 0 ? (
          <>
            <ContentRow title="Kids Favorites" titles={kidsTitles} id="kids-all" />
            <ContentRow
              title="Animated Adventures"
              titles={kidsTitles.filter(t => t.genre.includes('Animation'))}
              id="kids-animation"
            />
            <ContentRow
              title="Family Fun"
              titles={kidsTitles.filter(t => t.genre.includes('Family'))}
              id="kids-family"
            />
          </>
        ) : (
          <div className="text-center py-16 px-4">
            <p className="text-text-secondary text-lg">
              Kids content coming soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Kids;
