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
    <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">Browse by Genre</h1>

        {/* Genre Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGenre('All')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedGenre === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text border border-primary/20 hover:border-primary'
              }`}
            >
              All
            </button>
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedGenre === genre
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text border border-primary/20 hover:border-primary'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-secondary">
            {titles.length} {titles.length === 1 ? 'title' : 'titles'} found
          </p>
        </div>

        {titles.length > 0 ? (
          <ContentRow title={selectedGenre === 'All' ? 'All Titles' : selectedGenre} titles={titles} id="genre-results" />
        ) : (
          <div className="text-center py-16">
            <p className="text-secondary text-lg">No titles found in this genre.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Genres;
