import { render, screen } from '@testing-library/react';
import Box from './App';

test('renders New Joke', () => {
  render(<Box />);
  const linkElement = screen.getByText(/New Joke/i);
  expect(linkElement).toBeInTheDocument();
});


