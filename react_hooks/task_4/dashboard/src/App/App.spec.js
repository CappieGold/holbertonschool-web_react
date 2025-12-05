import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders Notifications component', () => {
    render(<App />);
    const notificationText = screen.getByText(/your notifications/i);
    expect(notificationText).toBeInTheDocument();
  });

  test('renders Header component', () => {
    render(<App />);
    const headerElement = screen.getByRole('heading', { 
      level: 1, 
      name: /school dashboard/i 
    });
    expect(headerElement).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    render(<App />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      new RegExp(`copyright ${currentYear}`, 'i')
    );
    expect(copyrightText).toBeInTheDocument();
  });

  test('does not render CourseList when user is not logged in (default state)', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 2, name: /log in to continue/i })).toBeInTheDocument();

    const table = screen.queryByRole('table');
    expect(table).not.toBeInTheDocument();
  });

  test('renders CourseList after successful login', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { level: 2, name: /log in to continue/i })).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345678');

    const submitButton = screen.getByRole('button', { name: /ok/i });
    await user.click(submitButton);

    expect(screen.getByRole('heading', { level: 2, name: /course list/i })).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  test('displays News from the School section with correct title and paragraph', () => {
    render(<App />);

    const newsTitle = screen.getByRole('heading', { 
      level: 2, 
      name: /news from the school/i 
    });
    expect(newsTitle).toBeInTheDocument();

    const newsParagraph = screen.getByText(/ipsum Lorem ipsum dolor sit amet/i);
    expect(newsParagraph).toBeInTheDocument();
  });

  test('displayDrawer state is false by default', () => {
    render(<App />);
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('handleDisplayDrawer: clicking on "Your notifications" shows the notifications panel', () => {
    render(<App />);

    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
    
    const notificationTitle = screen.getByText(/your notifications/i);
    fireEvent.click(notificationTitle);
    
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('handleHideDrawer: clicking on close button hides the notifications panel', () => {
    render(<App />);
    
    const notificationTitle = screen.getByText(/your notifications/i);
    fireEvent.click(notificationTitle);
    
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('logIn function updates user state with email, password, and isLoggedIn', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { level: 2, name: /log in to continue/i })).toBeInTheDocument();
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'user@test.com');
    await user.type(passwordInput, 'mypassword123');

    const submitButton = screen.getByRole('button', { name: /ok/i });
    await user.click(submitButton);

    expect(screen.getByRole('heading', { level: 2, name: /course list/i })).toBeInTheDocument();
    
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/user@test.com/i)).toBeInTheDocument();
    
    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
  });

  test('logOut function resets user state (isLoggedIn false, email and password cleared)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345678');

    const submitButton = screen.getByRole('button', { name: /ok/i });
    await user.click(submitButton);

    expect(screen.getByRole('heading', { level: 2, name: /course list/i })).toBeInTheDocument();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();

    const logoutLink = screen.getByText(/logout/i);
    await user.click(logoutLink);

    expect(screen.getByRole('heading', { level: 2, name: /log in to continue/i })).toBeInTheDocument();
    
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/test@example.com/i)).not.toBeInTheDocument();
    
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('clicking logout link in Header logs out the user', async () => {
    const user = userEvent.setup();
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345678');

    const submitButton = screen.getByRole('button', { name: /ok/i });
    await user.click(submitButton);

    expect(screen.getByRole('heading', { level: 2, name: /course list/i })).toBeInTheDocument();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();

    const logoutLink = screen.getByText(/logout/i);
    await user.click(logoutLink);

    expect(screen.getByRole('heading', { level: 2, name: /log in to continue/i })).toBeInTheDocument();
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
  });

  test('logoutSection is not visible when user is not logged in', () => {
    render(<App />);
    
    const logoutSection = document.querySelector('#logoutSection');
    expect(logoutSection).not.toBeInTheDocument();
  });

  test('logoutSection becomes visible after successful login', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345678');

    const submitButton = screen.getByRole('button', { name: /ok/i });
    await user.click(submitButton);

    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
  });

  test('markNotificationAsRead: clicking on a notification removes it from the list and logs to console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<App />);

    const notificationTitle = screen.getByText(/your notifications/i);
    fireEvent.click(notificationTitle);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    const firstNotification = screen.getByText('New course available');
    fireEvent.click(firstNotification);

    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');

    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    expect(screen.queryByText('New course available')).not.toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  test('can remove multiple notifications one by one', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<App />);

    const notificationTitle = screen.getByText(/your notifications/i);
    fireEvent.click(notificationTitle);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    fireEvent.click(screen.getByText('New course available'));
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    fireEvent.click(screen.getByText('New resume available'));
    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    consoleSpy.mockRestore();
  });

  test('"Contact us" link appears in Footer when user is logged in', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345678');

    const submitButton = screen.getByRole('button', { name: /ok/i });
    await user.click(submitButton);

    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });

  test('App is a functional component', () => {
    expect(App.prototype?.isReactComponent).toBeUndefined();
  });

  test('handleDisplayDrawer and handleHideDrawer work correctly in sequence', () => {
    render(<App />);

    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();

    const notificationTitle = screen.getByText(/your notifications/i);
    fireEvent.click(notificationTitle);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();

    fireEvent.click(notificationTitle);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });
});
