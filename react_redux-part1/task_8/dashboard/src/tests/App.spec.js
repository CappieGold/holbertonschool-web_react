import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/rootReducer';
import App from '../App';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

const createMockStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const mockNotificationsResponse = {
  data: {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '' } }
    ]
  }
};

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]
  }
};

test('renders Login when isLoggedIn is false', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  mockAxios.mockResponse(mockNotificationsResponse);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('renders CourseList when isLoggedIn is true', async () => {
  const store = createMockStore({
    auth: { user: { email: 'test@test.com', password: 'pass' }, isLoggedIn: true },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [{ id: 1, name: 'ES6', credit: 60 }] },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  mockAxios.mockResponse(mockNotificationsResponse);

  expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();
});

test('fetches notifications on mount and displays them', async () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });
});
