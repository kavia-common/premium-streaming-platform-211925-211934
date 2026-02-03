import { render, screen } from '@testing-library/react';
import App from './App';

test('renders StreamFlix application', () => {
  render(<App />);
  const logoElement = screen.getByText(/StreamFlix/i);
  expect(logoElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  const homeLink = screen.getByText(/Home/i);
  const genresLink = screen.getByText(/Genres/i);
  expect(homeLink).toBeInTheDocument();
  expect(genresLink).toBeInTheDocument();
});
