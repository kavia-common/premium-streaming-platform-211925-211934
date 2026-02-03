import React, { useState, useEffect } from 'react';
import { searchTitles, GENRES } from '../data/mockData';
import TitleCard from '../components/TitleCard';

// PUBLIC_INTERFACE
/**
 * Search page with query input and genre/year filters
 */
const Search = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ genre: 'All', year: '' });
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query || filters.genre !== 'All' || filters.year) {
      const searchResults = searchTitles(query, filters);
      setResults(searchResults);
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [query, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setQuery('');
    setFilters({ genre: 'All', year: '' });
    setHasSearched(false);
  };

  const years = [2022, 2023];

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-14 min-h-screen bg-bg-primary">
      <div className="max-w-full mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Search</h1>

        {/* Search Input */}
        <div className="mb-6">
          <label htmlFor="search-input" className="sr-only">
            Search for titles
          </label>
          <div className="relative">
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, genres, or keywords..."
              className="w-full px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              style={{
                background: '#2F2F2F',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
              }}
              autoFocus
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          {/* Genre Filter */}
          <div>
            <label htmlFor="genre-filter" className="block text-sm font-medium text-text-primary mb-2">
              Genre
            </label>
            <select
              id="genre-filter"
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
              className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              style={{
                background: '#2F2F2F',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
              }}
            >
              <option value="All">All Genres</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label htmlFor="year-filter" className="block text-sm font-medium text-text-primary mb-2">
              Year
            </label>
            <select
              id="year-filter"
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="px-4 py-2 bg-surface border border-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(query || filters.genre !== 'All' || filters.year) && (
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                style={{
                  background: '#2F2F2F',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = '#2F2F2F'}
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="mb-6">
            <p className="text-text-secondary">
              {results.length} {results.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((title, index) => (
              <TitleCard key={title.id} title={title} index={index} />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto mb-4"
              style={{ color: 'rgba(179, 179, 179, 0.3)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-text-secondary text-lg">
              No titles found. Try a different search term or adjust your filters.
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-secondary text-lg">
              Start typing to search for titles...
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
