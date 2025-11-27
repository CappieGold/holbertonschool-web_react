import { render, screen, fireEvent } from '@testing-library/react';
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

  test('does not render CourseList when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);
    expect(screen.getByRole('heading', { level: 2, name: /log in to continue/i })).toBeInTheDocument();

    const table = screen.queryByRole('table');
    expect(table).not.toBeInTheDocument();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />);
    expect(screen.getByRole('heading', { level: 2, name: /course list/i })).toBeInTheDocument();

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  test('calls logOut function and alert when ctrl+h is pressed', () => {
    const logOutMock = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<App logOut={logOutMock} />);

    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    expect(logOutMock).toHaveBeenCalled();

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
});
