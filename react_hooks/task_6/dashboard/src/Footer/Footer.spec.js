import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getFooterCopy, getCurrentYear } from '../utils/utils';

describe('Footer Component', () => {
  test('renders without crashing', () => {
    render(<Footer user={{ isLoggedIn: false }} />);
  });

  test('renders copyright text with current year and correct text', () => {
    render(<Footer user={{ isLoggedIn: false }} />);
    
    const currentYear = getCurrentYear();
    const footerText = getFooterCopy(false);
    
    const copyrightElement = screen.getByText(
      new RegExp(`copyright ${currentYear} - ${footerText}`, 'i')
    );
    
    expect(copyrightElement).toBeInTheDocument();
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
    render(<Footer user={{ isLoggedIn: false }} />);
    
    const currentYear = new Date().getFullYear();
    
    const paragraph = screen.getByText(/copyright/i);
    expect(paragraph).toBeInTheDocument();
    
    expect(paragraph.textContent).toContain(currentYear.toString());
    expect(paragraph.textContent).toMatch(/holberton school/i);
  });

  test('"Contact us" link is not displayed when user is logged out', () => {
    render(<Footer user={{ isLoggedIn: false }} />);

    const contactLink = screen.queryByText(/contact us/i);
    expect(contactLink).not.toBeInTheDocument();
  });

  test('"Contact us" link is displayed when user is logged in', () => {
    render(<Footer user={{ isLoggedIn: true, email: 'test@example.com' }} />);

    const contactLink = screen.getByText(/contact us/i);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.tagName).toBe('A');
  });
});
