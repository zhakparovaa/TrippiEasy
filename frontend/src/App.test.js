import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TrippiEasy logo', () => {
  render(<App />);
  const logoElement = screen.getByAltText(/TrippiEasy Logo/i);
  expect(logoElement).toBeInTheDocument();
});