import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTitleById, MOCK_TITLES } from '../data/mockData';
import { useMyList } from '../context/MyListContext';

// PUBLIC_INTERFACE
/**
 * Detailed title page with full information and related content
 */
const TitleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInList, addTitle, removeTitle } = useMyList();
  
  const title = getTitleById(id);

  if (!title) {
    return (
      <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text mb-4">Title Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Go Home
          </button>
        </div>
      </main>
    );
  }

  const inList = isInList(title.id);
  const relatedTitles = MOCK_TITLES.filter(
    t => t.id !== title.id && t.genre.some(g => title.genre.includes(g))
  ).slice(0, 4);

  const handleMyListClick = () => {
    if (inList) {
      removeTitle(title.id, title.title);
    } else {
      addTitle(title.id, title.title);
    }
  };

  return (
    <main className="pt-16 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-b from-primary/30 to-background">
        <div className="absolute inset-0">
          <img
            src={title.thumbnail}
            alt=""
            className="w-full h-full object-cover opacity-40"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-text mb-4">
              {title.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-success text-white px-3 py-1 rounded font-semibold">
                {title.rating}
              </span>
              <span className="text-text">{title.year}</span>
              <span className="text-text">{title.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text mb-4">Overview</h2>
              <p className="text-text/80 text-lg leading-relaxed">
                {title.description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {title.genre.map((genre) => (
                  <span
                    key={genre}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {title.cast && title.cast.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-text mb-3">Cast</h3>
                <p className="text-text/80">{title.cast.join(', ')}</p>
              </div>
            )}

            {title.director && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-text mb-3">Director</h3>
                <p className="text-text/80">{title.director}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
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
                className={`px-8 py-3 rounded-md font-semibold border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  inList
                    ? 'bg-success text-white border-success'
                    : 'bg-surface text-primary border-primary hover:bg-primary/10'
                }`}
                aria-label={inList ? 'Remove from My List' : 'Add to My List'}
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
                      Add to My List
                    </>
                  )}
                </span>
              </button>

              <button
                onClick={() => navigate(-1)}
                className="bg-surface text-text px-8 py-3 rounded-md font-semibold border border-primary/20 hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Back
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-lg p-6 border border-primary/10">
              <h3 className="text-xl font-semibold text-text mb-4">Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-secondary">Year</dt>
                  <dd className="text-text font-medium">{title.year}</dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary">Rating</dt>
                  <dd className="text-text font-medium">{title.rating}</dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary">Duration</dt>
                  <dd className="text-text font-medium">{title.duration}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Related Titles */}
        {relatedTitles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-text mb-6">More Like This</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedTitles.map((relatedTitle) => (
                <button
                  key={relatedTitle.id}
                  onClick={() => navigate(`/title/${relatedTitle.id}`)}
                  className="text-left group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                    <img
                      src={relatedTitle.thumbnail}
                      alt={relatedTitle.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                    {relatedTitle.title}
                  </h3>
                  <p className="text-sm text-secondary">{relatedTitle.year}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TitleDetail;
