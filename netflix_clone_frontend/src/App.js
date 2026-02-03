import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { MyListProvider } from './context/MyListContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Genres from './pages/Genres';
import MyList from './pages/MyList';
import Kids from './pages/Kids';
import Search from './pages/Search';
import TitleDetail from './pages/TitleDetail';

// PUBLIC_INTERFACE
/**
 * Main App component with routing and context providers
 */
function App() {
  return (
    <Router>
      <NotificationProvider>
        <MyListProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/search" element={<Search />} />
              <Route path="/title/:id" element={<TitleDetail />} />
            </Routes>
            <Toast />
          </div>
        </MyListProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
