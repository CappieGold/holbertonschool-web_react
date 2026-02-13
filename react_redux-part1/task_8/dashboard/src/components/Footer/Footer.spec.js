import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Footer from './Footer';

const createMockStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

test('renders footer with copyright text', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );

  const footerParagraph = screen.getByText(/copyright/i);
  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${new Date().getFullYear()}`, 'i'));
  expect(footerParagraph).toHaveTextContent(/holberton school/i);
});

test('Contact us link is displayed when isLoggedIn is true', () => {
  const store = createMockStore({
    auth: { user: { email: 'test@test.com', password: 'pass' }, isLoggedIn: true },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );

  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});

test('Contact us link is not displayed when isLoggedIn is false', () => {
  const store = createMockStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );

  expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
});
