import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Notifications from './Notifications';
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

test('displays notification items when notifications are in the store', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
    },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByText(/your notifications/i));

  expect(screen.getByText('New course available')).toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();
});

test('drawer is hidden by default via Aphrodite styles', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
      ],
    },
    courses: { courses: [] },
  });

  const { container } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  const drawer = container.querySelector('[class*="notificationItems"]');
  expect(drawer.className).not.toContain('visible');
});

test('adds visible class when "Your notifications" is clicked', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
      ],
    },
    courses: { courses: [] },
  });

  const { container } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByText(/your notifications/i));

  const drawer = container.querySelector('[class*="notificationItems"]');
  expect(drawer.className).toContain('visible');
});

test('removes visible class when close button is clicked', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
      ],
    },
    courses: { courses: [] },
  });

  const { container } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByText(/your notifications/i));
  fireEvent.click(screen.getByRole('button', { name: /close/i }));

  const drawer = container.querySelector('[class*="notificationItems"]');
  expect(drawer.className).not.toContain('visible');
});

test('removes notification from list when marked as read', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
    },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByText(/your notifications/i));

  const items = screen.getAllByRole('listitem');
  fireEvent.click(items[0]);

  expect(store.getState().notifications.notifications).toHaveLength(1);

  consoleSpy.mockRestore();
});
