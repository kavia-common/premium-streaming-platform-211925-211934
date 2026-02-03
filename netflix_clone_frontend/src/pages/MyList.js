import React from 'react';
import { useMyList } from '../context/MyListContext';
import { getTitleById } from '../data/mockData';
import TitleCard from '../components/TitleCard';

// PUBLIC_INTERFACE
/**
 * My List page showing user's saved titles
 */
const MyList = () => {
  const { myList } = useMyList();
  const titles = myList.map(id => getTitleById(id)).filter(Boolean);

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-14 min-h-screen bg-bg-primary">
      <div className="max-w-full mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-8">My List</h1>

        {titles.length === 0 ? (
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-text-primary mb-2">Your list is empty</h2>
            <p className="text-text-secondary mb-6">
              Add titles you want to watch later by clicking the &quot;+&quot; button on any title card.
            </p>
            <a
              href="/"
              className="inline-block text-white px-6 py-3 rounded-md font-semibold transition-colors"
              style={{ background: '#E50914' }}
              onMouseEnter={(e) => e.target.style.background = '#F40612'}
              onMouseLeave={(e) => e.target.style.background = '#E50914'}
            >
              Browse Titles
            </a>
          </div>
        ) : (
          <div>
            <p className="text-text-secondary mb-6">
              {titles.length} {titles.length === 1 ? 'title' : 'titles'} in your list
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {titles.map((title, index) => (
                <TitleCard key={title.id} title={title} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyList;
