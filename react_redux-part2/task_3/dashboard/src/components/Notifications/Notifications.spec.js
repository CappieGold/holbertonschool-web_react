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

const defaultNotifications = [
  { id: '1', type: 'default', isRead: false, value: 'Default notification' },
  { id: '2', type: 'urgent', isRead: false, value: 'Urgent notification' },
  { id: '3', type: 'default', isRead: false, value: 'Another default' },
];

test('displays notification items when notifications are in the store', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: defaultNotifications, loading: false },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByText(/your notifications/i));

  expect(screen.getByText('Default notification')).toBeInTheDocument();
  expect(screen.getByText('Urgent notification')).toBeInTheDocument();
  expect(screen.getByText('Another default')).toBeInTheDocument();
});

test('drawer is hidden by default via Aphrodite styles', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: defaultNotifications, loading: false },
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
    notifications: { notifications: defaultNotifications, loading: false },
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
    notifications: { notifications: defaultNotifications, loading: false },
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
    notifications: { notifications: defaultNotifications, loading: false },
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

  expect(store.getState().notifications.notifications).toHaveLength(2);

  consoleSpy.mockRestore();
});

test('displays Loading... when loading is true', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: [], loading: true },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByText(/your notifications/i));

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('does not display Loading... when loading is false', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: [], loading: false },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

test('clicking ‼️ filters to show only urgent notifications', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: defaultNotifications, loading: false },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByText(/your notifications/i));
  fireEvent.click(screen.getByText('‼️'));

  expect(screen.getByText('Urgent notification')).toBeInTheDocument();
  expect(screen.queryByText('Default notification')).not.toBeInTheDocument();
  expect(screen.queryByText('Another default')).not.toBeInTheDocument();
});

test('clicking ?? filters to show only default notifications', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: defaultNotifications, loading: false },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByText(/your notifications/i));
  fireEvent.click(screen.getByText('??'));

  expect(screen.getByText('Default notification')).toBeInTheDocument();
  expect(screen.getByText('Another default')).toBeInTheDocument();
  expect(screen.queryByText('Urgent notification')).not.toBeInTheDocument();
});

test('clicking the same filter button again resets to all', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: defaultNotifications, loading: false },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByText(/your notifications/i));

  fireEvent.click(screen.getByText('‼️'));
  expect(screen.queryByText('Default notification')).not.toBeInTheDocument();

  fireEvent.click(screen.getByText('‼️'));
  expect(screen.getByText('Default notification')).toBeInTheDocument();
  expect(screen.getByText('Urgent notification')).toBeInTheDocument();
});
