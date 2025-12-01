import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';

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

  test('logoutSection is not rendered with default context value', () => {
    render(<Header />);
    
    const logoutSection = document.querySelector('#logoutSection');
    expect(logoutSection).not.toBeInTheDocument();
    
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  test('logoutSection is rendered when user is logged in', () => {
    const contextValue = {
      user: {
        email: 'test@example.com',
        password: 'password123',
        isLoggedIn: true
      },
      logOut: jest.fn()
    };

    render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>
    );

    const logoutSection = document.querySelector('#logoutSection');
    expect(logoutSection).toBeInTheDocument();

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('clicking logout link calls the logOut function from context', () => {
    const logOutSpy = jest.fn();

    const contextValue = {
      user: {
        email: 'test@example.com',
        password: 'password123',
        isLoggedIn: true
      },
      logOut: logOutSpy
    };

    render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>
    );

    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);

    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });
});
