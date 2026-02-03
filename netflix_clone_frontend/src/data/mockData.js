// PUBLIC_INTERFACE
/**
 * Mock data for Netflix clone with realistic titles, descriptions, and metadata
 */

export const GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Romance',
  'Thriller',
  'Documentary',
  'Animation',
  'Fantasy',
  'Kids',
  'Family'
];

export const MOCK_TITLES = [
  {
    id: 1,
    title: 'Quantum Odyssey',
    description: 'A physicist discovers a way to travel between parallel universes, but each jump has devastating consequences for reality itself.',
    genre: ['Sci-Fi', 'Thriller'],
    year: 2023,
    rating: 'PG-13',
    duration: '2h 18m',
    cast: ['Emma Stone', 'Oscar Isaac', 'Tilda Swinton'],
    director: 'Denis Villeneuve',
    thumbnail: 'https://picsum.photos/seed/quantum/400/225',
    featured: true,
    trending: true,
  },
  {
    id: 2,
    title: 'Laugh Factory',
    description: 'Five struggling comedians share an apartment in New York City while trying to make it big in the stand-up world.',
    genre: ['Comedy'],
    year: 2022,
    rating: 'TV-MA',
    duration: '3 Seasons',
    cast: ['Bill Hader', 'Tiffany Haddish', 'John Mulaney'],
    director: 'Judd Apatow',
    thumbnail: 'https://picsum.photos/seed/laugh/400/225',
    trending: true,
  },
  {
    id: 3,
    title: 'Shadow Protocol',
    description: 'An elite team of international spies must prevent a global cyber attack that could bring down the world\'s financial systems.',
    genre: ['Action', 'Thriller'],
    year: 2023,
    rating: 'R',
    duration: '2h 5m',
    cast: ['Idris Elba', 'Charlize Theron', 'Tom Hardy'],
    director: 'Christopher McQuarrie',
    thumbnail: 'https://picsum.photos/seed/shadow/400/225',
    featured: true,
  },
  {
    id: 4,
    title: 'Moonlight Gardens',
    description: 'Two strangers meet at a botanical garden and form an unexpected connection that changes both their lives forever.',
    genre: ['Romance', 'Drama'],
    year: 2023,
    rating: 'PG',
    duration: '1h 52m',
    cast: ['Timothée Chalamet', 'Zendaya'],
    director: 'Greta Gerwig',
    thumbnail: 'https://picsum.photos/seed/moonlight/400/225',
  },
  {
    id: 5,
    title: 'Dinosaur Kingdom',
    description: 'Join Rex and his friends on magical adventures through prehistoric lands filled with wonder and excitement!',
    genre: ['Kids', 'Animation', 'Family'],
    year: 2023,
    rating: 'TV-Y',
    duration: '2 Seasons',
    cast: ['Voice Cast'],
    director: 'Pete Docter',
    thumbnail: 'https://picsum.photos/seed/dino/400/225',
    isKids: true,
  },
  {
    id: 6,
    title: 'The Last Frontier',
    description: 'A gripping documentary about the last unexplored regions of the Amazon rainforest and the indigenous people who call it home.',
    genre: ['Documentary'],
    year: 2022,
    rating: 'TV-14',
    duration: '1h 45m',
    cast: ['Documentary'],
    director: 'Werner Herzog',
    thumbnail: 'https://picsum.photos/seed/frontier/400/225',
  },
  {
    id: 7,
    title: 'Neon Nights',
    description: 'In a futuristic Tokyo, a detective hunts rogue androids while questioning what it means to be human.',
    genre: ['Sci-Fi', 'Thriller'],
    year: 2023,
    rating: 'R',
    duration: '2h 30m',
    cast: ['Ryan Gosling', 'Ana de Armas'],
    director: 'Ridley Scott',
    thumbnail: 'https://picsum.photos/seed/neon/400/225',
    featured: true,
  },
  {
    id: 8,
    title: 'Whispers in the Dark',
    description: 'A family moves into a Victorian mansion, only to discover it harbors dark secrets from a century ago.',
    genre: ['Horror'],
    year: 2023,
    rating: 'R',
    duration: '1h 58m',
    cast: ['Florence Pugh', 'Oscar Isaac'],
    director: 'Ari Aster',
    thumbnail: 'https://picsum.photos/seed/whispers/400/225',
  },
  {
    id: 9,
    title: 'Brooklyn Hearts',
    description: 'A heartwarming story of a diverse Brooklyn neighborhood and the bonds that unite its residents across generations.',
    genre: ['Drama', 'Family'],
    year: 2022,
    rating: 'PG-13',
    duration: '2h 10m',
    cast: ['Michael B. Jordan', 'Viola Davis'],
    director: 'Barry Jenkins',
    thumbnail: 'https://picsum.photos/seed/brooklyn/400/225',
  },
  {
    id: 10,
    title: 'Velocity Racing',
    description: 'High-octane action as underground racers compete for ultimate supremacy on the streets of Los Angeles.',
    genre: ['Action'],
    year: 2023,
    rating: 'PG-13',
    duration: '2h 12m',
    cast: ['John Boyega', 'Zoe Kravitz'],
    director: 'Justin Lin',
    thumbnail: 'https://picsum.photos/seed/velocity/400/225',
    trending: true,
  },
  {
    id: 11,
    title: 'Magic Academy',
    description: 'Young wizards attend a mystical school where they learn spells, make friends, and save the magical realm!',
    genre: ['Kids', 'Fantasy', 'Animation'],
    year: 2023,
    rating: 'TV-Y7',
    duration: '1 Season',
    cast: ['Voice Cast'],
    director: 'Hayao Miyazaki',
    thumbnail: 'https://picsum.photos/seed/magic/400/225',
    isKids: true,
  },
  {
    id: 12,
    title: 'The Heist Chronicles',
    description: 'A master thief assembles a crew for one final impossible heist that will change their lives forever.',
    genre: ['Thriller', 'Action'],
    year: 2023,
    rating: 'PG-13',
    duration: '2h 20m',
    cast: ['Benedict Cumberbatch', 'Lupita Nyong\'o'],
    director: 'Steven Soderbergh',
    thumbnail: 'https://picsum.photos/seed/heist/400/225',
  },
  {
    id: 13,
    title: 'Cosmic Dreams',
    description: 'Astronauts on a deep space mission encounter a mysterious signal that defies all known physics.',
    genre: ['Sci-Fi', 'Drama'],
    year: 2022,
    rating: 'PG-13',
    duration: '2h 35m',
    cast: ['Jessica Chastain', 'Matthew McConaughey'],
    director: 'Christopher Nolan',
    thumbnail: 'https://picsum.photos/seed/cosmic/400/225',
    featured: true,
    trending: true,
  },
  {
    id: 14,
    title: 'Love & Lattes',
    description: 'A coffee shop owner and a tech entrepreneur clash, then fall for each other in this modern romantic comedy.',
    genre: ['Romance', 'Comedy'],
    year: 2023,
    rating: 'PG-13',
    duration: '1h 48m',
    cast: ['Tom Holland', 'Anya Taylor-Joy'],
    director: 'Nancy Meyers',
    thumbnail: 'https://picsum.photos/seed/lattes/400/225',
  },
  {
    id: 15,
    title: 'Ocean Explorers',
    description: 'Dive deep into the ocean to discover incredible sea creatures and underwater ecosystems!',
    genre: ['Kids', 'Documentary', 'Family'],
    year: 2023,
    rating: 'TV-G',
    duration: '1 Season',
    cast: ['Documentary'],
    director: 'David Attenborough',
    thumbnail: 'https://picsum.photos/seed/ocean/400/225',
    isKids: true,
  },
  {
    id: 16,
    title: 'Medieval Legends',
    description: 'Knights, dragons, and epic battles come to life in this sweeping fantasy saga set in a medieval world.',
    genre: ['Fantasy', 'Action'],
    year: 2022,
    rating: 'TV-MA',
    duration: '4 Seasons',
    cast: ['Henry Cavill', 'Anya Chalotra'],
    director: 'Miguel Sapochnik',
    thumbnail: 'https://picsum.photos/seed/medieval/400/225',
    trending: true,
  },
  {
    id: 17,
    title: 'City of Shadows',
    description: 'A noir thriller following a private detective through the rain-soaked streets of a corrupt metropolis.',
    genre: ['Thriller', 'Drama'],
    year: 2023,
    rating: 'R',
    duration: '2h 8m',
    cast: ['Jake Gyllenhaal', 'Rebecca Ferguson'],
    director: 'David Fincher',
    thumbnail: 'https://picsum.photos/seed/cityshad/400/225',
  },
  {
    id: 18,
    title: 'The Standup Special',
    description: 'Hilarious standup comedy from one of today\'s hottest comedians, filmed live in Brooklyn.',
    genre: ['Comedy'],
    year: 2023,
    rating: 'TV-MA',
    duration: '1h 15m',
    cast: ['Ali Wong'],
    director: 'Marcus Raboy',
    thumbnail: 'https://picsum.photos/seed/standup/400/225',
  },
  {
    id: 19,
    title: 'Superhero Squad',
    description: 'Kid-friendly superheroes team up to protect their city from silly villains in colorful adventures!',
    genre: ['Kids', 'Animation', 'Action'],
    year: 2023,
    rating: 'TV-Y7',
    duration: '2 Seasons',
    cast: ['Voice Cast'],
    director: 'Phil Lord',
    thumbnail: 'https://picsum.photos/seed/superhero/400/225',
    isKids: true,
  },
  {
    id: 20,
    title: 'Culinary Wars',
    description: 'Top chefs compete in intense cooking challenges in this high-stakes culinary competition series.',
    genre: ['Documentary'],
    year: 2022,
    rating: 'TV-PG',
    duration: '3 Seasons',
    cast: ['Gordon Ramsay'],
    director: 'Reality TV',
    thumbnail: 'https://picsum.photos/seed/culinary/400/225',
  },
];

// PUBLIC_INTERFACE
/**
 * Get titles filtered by genre
 */
export const getTitlesByGenre = (genre) => {
  if (!genre || genre === 'All') return MOCK_TITLES;
  return MOCK_TITLES.filter(title => title.genre.includes(genre));
};

// PUBLIC_INTERFACE
/**
 * Get featured/hero title for billboard
 */
export const getFeaturedTitle = () => {
  const featured = MOCK_TITLES.filter(t => t.featured);
  return featured[0] || MOCK_TITLES[0];
};

// PUBLIC_INTERFACE
/**
 * Get trending titles
 */
export const getTrendingTitles = () => {
  return MOCK_TITLES.filter(t => t.trending);
};

// PUBLIC_INTERFACE
/**
 * Get kids-friendly titles
 */
export const getKidsTitles = () => {
  return MOCK_TITLES.filter(t => t.isKids);
};

// PUBLIC_INTERFACE
/**
 * Search titles by query
 */
export const searchTitles = (query, filters = {}) => {
  let results = MOCK_TITLES;

  // Text search
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(title =>
      title.title.toLowerCase().includes(lowerQuery) ||
      title.description.toLowerCase().includes(lowerQuery) ||
      title.genre.some(g => g.toLowerCase().includes(lowerQuery))
    );
  }

  // Genre filter
  if (filters.genre && filters.genre !== 'All') {
    results = results.filter(title => title.genre.includes(filters.genre));
  }

  // Year filter
  if (filters.year) {
    results = results.filter(title => title.year === parseInt(filters.year));
  }

  return results;
};

// PUBLIC_INTERFACE
/**
 * Get title by ID
 */
export const getTitleById = (id) => {
  return MOCK_TITLES.find(t => t.id === parseInt(id));
};
