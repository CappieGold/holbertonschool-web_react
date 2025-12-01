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
  });

  test('calls logOut and shows alert when ctrl+h is pressed', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<App />);

    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(alertMock).toHaveBeenCalledWith('Logging you out');

    alertMock.mockRestore();
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

  test('clicking on "Your notifications" shows the notifications panel', () => {
    render(<App />);

    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
    
    const notificationTitle = screen.getByText(/your notifications/i);
    fireEvent.click(notificationTitle);
    
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('clicking on close button hides the notifications panel', () => {
    render(<App />);
    
    const notificationTitle = screen.getByText(/your notifications/i);
    fireEvent.click(notificationTitle);
    
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('logOut resets user state and shows Login component again', async () => {
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345678');

    const submitButton = screen.getByRole('button', { name: /ok/i });
    await user.click(submitButton);

    expect(screen.getByRole('heading', { level: 2, name: /course list/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(screen.getByRole('heading', { level: 2, name: /log in to continue/i })).toBeInTheDocument();

    alertMock.mockRestore();
  });
});
