# StreamFlix - Netflix Clone Frontend

A pixel-perfect, desktop-optimized Netflix clone built with React and Tailwind CSS, featuring a Pure White theme with retro styling cues. This single-page application delivers a premium streaming platform experience with advanced UI/UX, responsive carousels, modals, search functionality, and comprehensive accessibility features.

## 🎨 Features

### Core Functionality
- **Billboard/Hero Section** - Featured content with dynamic background and call-to-action buttons
- **Horizontal Content Rows** - Interactive carousels with smooth scrolling and navigation arrows
- **Title Cards** - Hover previews with smooth animations and quick actions
- **Detail Views** - Comprehensive title detail pages with related content
- **Modal Support** - Accessible modal components for quick previews
- **Client-Side Routing** - Fast navigation with React Router (Home, Genres, My List, Kids, Search)
- **Search with Filters** - Real-time search with genre and year filtering
- **My List** - localStorage-backed personal watchlist functionality
- **Notifications/Toasts** - User feedback for actions with animated toasts

### Design & Styling
- **Pure White Theme** - Primary color: `#374151`, Success accent: `#10B981`
- **Retro Styling Cues** - Minimalist design with nostalgic touches
- **Tailwind CSS** - Utility-first styling with custom configuration
- **Responsive Layout** - Desktop-optimized with smooth transitions
- **Custom Animations** - Fade-in, slide-in, and scale-up effects
- **Smooth Scrolling** - Scroll-snap behavior for carousels

### Accessibility
- **Keyboard Navigation** - Full keyboard support with arrow keys
- **Focus Management** - Clear focus indicators and skip links
- **ARIA Labels** - Comprehensive screen reader support
- **Color Contrast** - WCAG AA compliant color combinations
- **Reduced Motion** - Respects `prefers-reduced-motion` preference
- **Semantic HTML** - Proper heading hierarchy and landmarks

### Technical Implementation
- **React 18** - Modern React with hooks and context API
- **React Router v6** - Client-side routing
- **Tailwind CSS v3** - Utility-first CSS framework
- **Context API** - State management for My List and notifications
- **localStorage** - Persistent user data without backend
- **Mock Data** - Realistic content with 20+ titles across multiple genres

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Sticky navigation bar
│   ├── Billboard.js    # Hero section with featured content
│   ├── ContentRow.js   # Horizontal scrolling carousel
│   ├── TitleCard.js    # Individual title card with hover effects
│   ├── Modal.js        # Accessible modal component
│   └── Toast.js        # Notification toasts
├── pages/              # Page components
│   ├── Home.js         # Main landing page
│   ├── Genres.js       # Genre browsing page
│   ├── MyList.js       # User's personal list
│   ├── Kids.js         # Kids-friendly content
│   ├── Search.js       # Search with filters
│   └── TitleDetail.js  # Individual title detail page
├── context/            # React context providers
│   ├── NotificationContext.js  # Toast notifications
│   └── MyListContext.js        # My List functionality
├── data/               # Mock data and utilities
│   └── mockData.js     # Realistic title data
├── utils/              # Helper functions
│   └── localStorage.js # localStorage operations
├── App.js              # Main app with routing
├── index.js            # Entry point
└── index.css           # Global styles with Tailwind
```

## 🎯 Key Components

### Navbar
Sticky navigation bar with:
- Logo and branding
- Navigation links (Home, Genres, My List, Kids)
- Search button
- Scroll-based styling changes

### Billboard
Hero section featuring:
- Large title and description
- Background image with gradient overlays
- Play and My List action buttons
- Responsive layout

### ContentRow
Horizontal scrolling carousel with:
- Mouse and keyboard navigation
- Scroll-snap behavior
- Navigation arrows (visible on hover)
- Smooth scrolling animations

### TitleCard
Individual content cards featuring:
- Thumbnail images
- Hover preview with additional info
- Quick action buttons (Play, Add to List)
- Genre tags

### Search
Advanced search functionality:
- Real-time text search
- Genre filtering
- Year filtering
- Results count display

### My List
Personal watchlist with:
- localStorage persistence
- Add/remove functionality
- Empty state with call-to-action
- Grid layout for saved titles

## 🎨 Theme & Styling

### Color Palette
```javascript
{
  primary: '#374151',      // Dark gray
  secondary: '#9CA3AF',    // Medium gray
  success: '#10B981',      // Green accent
  error: '#EF4444',        // Red
  background: '#f9fafb',   // Light background
  surface: '#ffffff',      // White surface
  text: '#111827'          // Near black text
}
```

### Custom Animations
- `fade-in` - Smooth opacity transition
- `slide-in` - Slide up with fade
- `scale-up` - Zoom in effect

### Responsive Design
- Desktop-optimized (1280px+)
- Supports tablet and mobile with graceful degradation
- Touch-friendly interactions

## ♿ Accessibility Features

### Keyboard Navigation
- Tab navigation through all interactive elements
- Arrow keys for carousel navigation
- Escape key to close modals
- Enter/Space to activate buttons

### Screen Readers
- ARIA labels on all interactive elements
- Semantic HTML structure
- Skip to main content link
- Live regions for dynamic content

### Visual Accessibility
- High contrast text and backgrounds
- Clear focus indicators
- Reduced motion support
- Proper heading hierarchy

## 🔧 Configuration

### Tailwind Configuration
Custom theme extensions in `tailwind.config.js`:
- Extended color palette
- Custom animations
- Font family configuration

### Environment Variables
No environment variables required for core functionality. All features work client-side with mock data.

## 📊 Mock Data

The application includes realistic mock data with:
- 20+ titles across multiple genres
- Detailed metadata (cast, director, year, rating)
- High-quality placeholder images (via Picsum)
- Genre categorization
- Featured and trending flags

## 🧪 Testing

Tests are written using:
- Jest
- React Testing Library
- @testing-library/jest-dom

Run tests with:
```bash
npm test          # Interactive mode
CI=true npm test  # CI mode
```

## 🚢 Deployment

Build the application for production:
```bash
npm run build
```

The optimized build will be in the `build/` directory and can be served with any static hosting service.

## 📝 Code Quality

### Best Practices
- Component composition and reusability
- Context API for global state
- Custom hooks for shared logic
- Proper error handling
- Loading states and empty states

### Documentation
- JSDoc comments for public functions
- PUBLIC_INTERFACE markers
- Descriptive component and function names
- Inline comments for complex logic

## 🎭 Performance

### Optimizations
- Lazy loading images
- Smooth scroll with CSS
- Debounced search input
- Optimized re-renders with React hooks
- Production build with minification

## 📚 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Implementing real backend API
- Adding authentication
- Video player integration
- More comprehensive testing
- Performance monitoring
- Analytics integration

## 📄 License

This project is for demonstration purposes only.

## 🙏 Acknowledgments

- Inspired by Netflix's UI/UX
- Built with React and Tailwind CSS
- Uses Picsum for placeholder images
- Inter font from Google Fonts

---

**Note**: This is a frontend-only implementation using mock data. No backend or API integration is required for basic functionality. All state is managed client-side with React Context and localStorage.
