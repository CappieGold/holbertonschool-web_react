import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import newContext from '../Context/context';
import { getFooterCopy, getCurrentYear } from '../utils/utils';

describe('Footer Component', () => {
  const renderWithContext = (contextValue) => {
    return render(
      <newContext.Provider value={contextValue}>
        <Footer />
      </newContext.Provider>
    );
  };

  const defaultContext = {
    user: {
      email: '',
      password: '',
      isLoggedIn: false
    },
    logOut: jest.fn()
  };

  const loggedInContext = {
    user: {
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: true
    },
    logOut: jest.fn()
  };

  test('renders without crashing', () => {
    renderWithContext(defaultContext);
  });

  test('renders copyright text with current year and correct text', () => {
    renderWithContext(defaultContext);
    
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
    renderWithContext(defaultContext);
    
    const currentYear = new Date().getFullYear();
    
    const paragraph = screen.getByText(/copyright/i);
    expect(paragraph).toBeInTheDocument();
    
    expect(paragraph.textContent).toContain(currentYear.toString());
    expect(paragraph.textContent).toMatch(/holberton school/i);
  });

  test('"Contact us" link is not displayed when user is logged out', () => {
    renderWithContext(defaultContext);

    const contactLink = screen.queryByText(/contact us/i);
    expect(contactLink).not.toBeInTheDocument();
  });

  test('"Contact us" link is displayed when user is logged in', () => {
    renderWithContext(loggedInContext);

    const contactLink = screen.getByText(/contact us/i);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.tagName).toBe('A');
  });
});
