import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header Component', () => {
  test('renders without crashing', () => {
    render(<Header user={{ isLoggedIn: false }} logOut={() => {}} />);
  });

  test('contains the Holberton logo', () => {
    render(<Header user={{ isLoggedIn: false }} logOut={() => {}} />);
    const logo = screen.getByAltText(/holberton logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src');
  });

  test('contains h1 element with correct text', () => {
    render(<Header user={{ isLoggedIn: false }} logOut={() => {}} />);
    const heading = screen.getByRole('heading', { 
      level: 1, 
      name: /school dashboard/i 
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('School Dashboard');
  });

  test('logoutSection is not rendered when user is not logged in', () => {
    render(<Header user={{ isLoggedIn: false }} logOut={() => {}} />);
    
    const logoutSection = document.querySelector('#logoutSection');
    expect(logoutSection).not.toBeInTheDocument();
    
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  test('logoutSection is rendered when user is logged in', () => {
    const loggedInUser = {
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: true
    };

    render(<Header user={loggedInUser} logOut={() => {}} />);

    const logoutSection = document.querySelector('#logoutSection');
    expect(logoutSection).toBeInTheDocument();

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('clicking logout link calls the logOut function', async () => {
    const user = userEvent.setup();
    const logOutSpy = jest.fn();

    const loggedInUser = {
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: true
    };

    render(<Header user={loggedInUser} logOut={logOutSpy} />);

    const logoutLink = screen.getByText(/logout/i);
    await user.click(logoutLink);

    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });

  test('Header is a functional component', () => {
    expect(Header.prototype?.isReactComponent).toBeUndefined();
  });
});
