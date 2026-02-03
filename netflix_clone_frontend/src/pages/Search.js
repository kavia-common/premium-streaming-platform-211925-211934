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
    <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">Search</h1>

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
              className="w-full px-4 py-3 pl-12 bg-surface border border-primary/20 rounded-lg text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary"
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
            <label htmlFor="genre-filter" className="block text-sm font-medium text-text mb-2">
              Genre
            </label>
            <select
              id="genre-filter"
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
              className="px-4 py-2 bg-surface border border-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
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
            <label htmlFor="year-filter" className="block text-sm font-medium text-text mb-2">
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
                className="px-4 py-2 bg-surface text-text border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="mb-6">
            <p className="text-secondary">
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
              className="w-24 h-24 mx-auto text-secondary/30 mb-4"
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
            <p className="text-secondary text-lg">
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
