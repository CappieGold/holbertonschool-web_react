import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '' } },
];

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockImplementation((url) => {
    if (url.includes('notifications')) {
      return Promise.resolve({ data: { notifications: mockNotifications } });
    }
    if (url.includes('courses')) {
      return Promise.resolve({ data: { courses: mockCourses } });
    }
    return Promise.resolve({ data: [] });
  });
});

describe('App Component', () => {
  describe('Rendering', () => {
    test('The App component renders without crashing', async () => {
      render(<App />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });
    });

    test('The App component renders Login by default (user not logged in)', async () => {
      render(<App />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
      });

      const emailLabelElement = screen.getByLabelText(/email/i);
      const passwordLabelElement = screen.getByLabelText(/password/i);
      const buttonElements = screen.getAllByRole('button', { name: /ok/i });

      expect(emailLabelElement).toBeInTheDocument();
      expect(passwordLabelElement).toBeInTheDocument();
      expect(buttonElements.length).toBeGreaterThanOrEqual(1);
    });

    test('it should display "News from the School" title and paragraph by default', async () => {
      render(<App />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      const newsTitle = screen.getByRole('heading', { name: /news from the school/i });
      const newsParagraph = screen.getByText(/holberton school news goes here/i);

      expect(newsTitle).toBeInTheDocument();
      expect(newsParagraph).toBeInTheDocument();
    });
  });

  describe('Notifications', () => {
    test('clicking on a notification item removes it from the list and logs the message', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const user = userEvent.setup();

      const { container } = render(<App />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
      });

      await waitFor(() => {
        const notificationItems = container.querySelectorAll('[data-notification-type]');
        expect(notificationItems.length).toBeGreaterThan(0);
      });

      const notificationItems = container.querySelectorAll('[data-notification-type]');
      const initialCount = notificationItems.length;

      if (notificationItems.length > 0) {
        await user.click(notificationItems[0]);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/Notification \d+ has been marked as read/));

        const updatedNotificationItems = container.querySelectorAll('[data-notification-type]');
        expect(updatedNotificationItems.length).toBe(initialCount - 1);
      }

      consoleSpy.mockRestore();
    });

    test('handleDisplayDrawer toggles displayDrawer', async () => {
      const user = userEvent.setup();
      render(<App />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
      });

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();

      const notificationTitle = screen.getByText(/your notifications/i);
      await user.click(notificationTitle);

      expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
    });

    test('handleHideDrawer sets displayDrawer to false', async () => {
      const user = userEvent.setup();
      render(<App />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
      });

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
      expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    });
  });

  describe('Authentication', () => {
    test('logIn function updates user state with email, password, and isLoggedIn true', async () => {
      const user = userEvent.setup();
      render(<App />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /ok/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/courses.json');
      });

      await waitFor(() => {
        expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();
        expect(screen.getByText(/test@example\.com/i)).toBeInTheDocument();
      });
    });

    test('logOut function resets user state to isLoggedIn false with empty email and password', async () => {
      const user = userEvent.setup();
      render(<App />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /ok/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/test@example\.com/i)).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();
      });

      const logoutLink = screen.getByText(/logout/i);
      await user.click(logoutLink);

      await waitFor(() => {
        expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: /course list/i })).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      });
    });
  });

  describe('Data Fetching', () => {
    test('verify notifications data is fetched when App component loads initially', async () => {
      render(<App />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
      });

      await waitFor(() => {
        expect(screen.getByText('New course available')).toBeInTheDocument();
        expect(screen.getByText('New resume available')).toBeInTheDocument();
      });
    });

    test('verify courses data is fetched when user state changes to logged in', async () => {
      const user = userEvent.setup();
      render(<App />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /ok/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/courses.json');
      });

      await waitFor(() => {
        expect(screen.getByText('ES6')).toBeInTheDocument();
        expect(screen.getByText('Webpack')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
      });
    });
  });
});
