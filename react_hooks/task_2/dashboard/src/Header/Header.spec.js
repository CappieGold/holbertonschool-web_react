import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';

describe('Header Component', () => {
  const defaultContext = {
    user: {
      email: '',
      password: '',
      isLoggedIn: false
    },
    logOut: jest.fn()
  };

  const renderWithContext = (contextValue = defaultContext) => {
    return render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>
    );
  };

  test('renders without crashing', () => {
    renderWithContext();
  });

  test('contains the Holberton logo', () => {
    renderWithContext();
    const logo = screen.getByAltText(/holberton logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src');
  });

  test('contains h1 element with correct text', () => {
    renderWithContext();
    const heading = screen.getByRole('heading', { 
      level: 1, 
      name: /school dashboard/i 
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('School Dashboard');
  });

  test('logoutSection is not rendered with default context value', () => {
    renderWithContext();
    
    const logoutSection = document.querySelector('#logoutSection');
    expect(logoutSection).not.toBeInTheDocument();
    
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  test('logoutSection is rendered when user is logged in', () => {
    const loggedInContext = {
      user: {
        email: 'test@example.com',
        password: 'password123',
        isLoggedIn: true
      },
      logOut: jest.fn()
    };

    renderWithContext(loggedInContext);

    const logoutSection = document.querySelector('#logoutSection');
    expect(logoutSection).toBeInTheDocument();

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('clicking logout link calls the logOut function from context', () => {
    const logOutSpy = jest.fn();

    const loggedInContext = {
      user: {
        email: 'test@example.com',
        password: 'password123',
        isLoggedIn: true
      },
      logOut: logOutSpy
    };

    renderWithContext(loggedInContext);

    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);

    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });

  test('Header is a functional component', () => {
    expect(Header.prototype?.isReactComponent).toBeUndefined();
  });
});
