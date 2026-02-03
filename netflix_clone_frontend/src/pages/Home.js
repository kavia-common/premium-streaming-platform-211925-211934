import React from 'react';
import Billboard from '../components/Billboard';
import ContentRow from '../components/ContentRow';
import { MOCK_TITLES, getTrendingTitles, getTitlesByGenre } from '../data/mockData';

// PUBLIC_INTERFACE
/**
 * Home page with featured billboard and content rows
 */
const Home = () => {
  const trendingTitles = getTrendingTitles();
  const actionTitles = getTitlesByGenre('Action');
  const comedyTitles = getTitlesByGenre('Comedy');
  const scifiTitles = getTitlesByGenre('Sci-Fi');
  const dramaTitles = getTitlesByGenre('Drama');

  return (
    <main className="pt-16 bg-bg-primary">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Billboard />

      <div id="main-content" className="py-8">
        <ContentRow title="Trending Now" titles={trendingTitles} id="trending" />
        <ContentRow title="Action & Adventure" titles={actionTitles} id="action" />
        <ContentRow title="Comedies" titles={comedyTitles} id="comedy" />
        <ContentRow title="Sci-Fi Favorites" titles={scifiTitles} id="scifi" />
        <ContentRow title="Dramatic Stories" titles={dramaTitles} id="drama" />
        <ContentRow title="All Titles" titles={MOCK_TITLES} id="all" />
      </div>
    </main>
  );
};

export default Home;
