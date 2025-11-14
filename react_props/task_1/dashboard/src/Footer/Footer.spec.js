import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getFooterCopy, getCurrentYear } from '../utils/utils';

describe('Footer Component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
  });

  test('renders copyright text with current year and correct text when isIndex is true', () => {
    render(<Footer />);
    
    const currentYear = getCurrentYear();
    const footerText = getFooterCopy(true);
    
    const copyrightElement = screen.getByText(
      new RegExp(`copyright ${currentYear} - ${footerText}`, 'i')
    );
    
    expect(copyrightElement).toBeInTheDocument();
    expect(footerText).toBe('Holberton School');
  });

  test('getFooterCopy returns correct text when isIndex is true', () => {
    const result = getFooterCopy(true);
    expect(result).toBe('Holberton School');
  });

  test('getFooterCopy returns correct text when isIndex is false', () => {
    const result = getFooterCopy(false);
    expect(result).toBe('Holberton School main dashboard');
  });

  test('displays the correct copyright text format', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    
    const paragraph = screen.getByText(/copyright/i);
    expect(paragraph).toBeInTheDocument();
    
    expect(paragraph.textContent).toContain(currentYear.toString());
    expect(paragraph.textContent).toMatch(/holberton school/i);
  });
});
