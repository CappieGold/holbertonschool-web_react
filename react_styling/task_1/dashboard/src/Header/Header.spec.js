import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('contains the Holberton logo', () => {
    render(<Header />);
    const logo = screen.getByAltText(/holberton logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src');
  });

  test('contains h1 element with correct text', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { 
      level: 1, 
      name: /school dashboard/i 
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('School Dashboard');
  });
});
