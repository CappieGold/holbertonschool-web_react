import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Login from './Login';

const createMockStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const defaultState = {
  auth: { user: { email: '', password: '' }, isLoggedIn: false },
  notifications: { notifications: [], displayDrawer: true },
  courses: { courses: [] },
};

test('renders login form with email, password fields and submit button', () => {
  const store = createMockStore(defaultState);
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
});

test('submit button is disabled by default', () => {
  const store = createMockStore(defaultState);
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
});

test('sets isLoggedIn to true on valid form submission', () => {
  const store = createMockStore(defaultState);
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /ok/i }));

  expect(store.getState().auth.isLoggedIn).toBe(true);
});

test('isLoggedIn remains false with invalid credentials', () => {
  const store = createMockStore(defaultState);
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });

  expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  expect(store.getState().auth.isLoggedIn).toBe(false);
});
