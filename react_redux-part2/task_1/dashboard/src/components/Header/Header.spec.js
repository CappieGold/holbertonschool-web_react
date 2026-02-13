import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Header from './Header';
import { login } from '../../features/auth/authSlice';

const createMockStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

test('displays logout link when isLoggedIn is true', () => {
  const store = createMockStore({
    auth: { user: { email: 'test@test.com', password: 'pass' }, isLoggedIn: true },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('displays welcome message with email after login', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  store.dispatch(login({ email: 'test@test.com', password: 'password123' }));

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});

test('sets isLoggedIn to false after logout', () => {
  const store = createMockStore({
    auth: { user: { email: 'test@test.com', password: 'pass' }, isLoggedIn: true },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  fireEvent.click(screen.getByText(/logout/i));

  expect(store.getState().auth.isLoggedIn).toBe(false);
});
