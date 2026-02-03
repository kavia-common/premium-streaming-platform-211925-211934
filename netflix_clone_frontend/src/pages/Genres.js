import React, { useState } from 'react';
import ContentRow from '../components/ContentRow';
import { GENRES, getTitlesByGenre } from '../data/mockData';

// PUBLIC_INTERFACE
/**
 * Genres page with genre selection and filtered content
 */
const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const titles = getTitlesByGenre(selectedGenre);

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-14 min-h-screen bg-bg-primary">
      <div className="max-w-full mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Browse by Genre</h1>

        {/* Genre Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGenre('All')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedGenre === 'All'
                  ? 'text-white'
                  : 'text-text-primary hover:text-text-secondary'
              }`}
              style={{
                background: selectedGenre === 'All' ? '#E50914' : '#2F2F2F',
                border: selectedGenre === 'All' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              All
            </button>
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedGenre === genre
                    ? 'text-white'
                    : 'text-text-primary hover:text-text-secondary'
                }`}
                style={{
                  background: selectedGenre === genre ? '#E50914' : '#2F2F2F',
                  border: selectedGenre === genre ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-text-secondary">
            {titles.length} {titles.length === 1 ? 'title' : 'titles'} found
          </p>
        </div>

        {titles.length > 0 ? (
          <ContentRow title={selectedGenre === 'All' ? 'All Titles' : selectedGenre} titles={titles} id="genre-results" />
        ) : (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg">No titles found in this genre.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Genres;
