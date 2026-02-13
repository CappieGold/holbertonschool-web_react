import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import CourseList from './CourseList';
import { logout } from '../../features/auth/authSlice';
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

test('displays courses list when courses are in the store', () => {
  const store = createMockStore({
    auth: { user: { email: 'test@test.com', password: 'pass' }, isLoggedIn: true },
    notifications: { notifications: [], loading: false },
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        { id: 3, name: 'React', credit: 40, isSelected: false },
      ],
    },
  });

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  expect(screen.getByText('ES6')).toBeInTheDocument();
  expect(screen.getByText('Webpack')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
});

test('resets courses array when logout is dispatched', () => {
  const store = createMockStore({
    auth: { user: { email: 'test@test.com', password: 'pass' }, isLoggedIn: true },
    notifications: { notifications: [], loading: false },
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        { id: 3, name: 'React', credit: 40, isSelected: false },
      ],
    },
  });

  store.dispatch(logout());

  expect(store.getState().courses.courses).toEqual([]);
});

test('sets isSelected to true when a course checkbox is checked', () => {
  const store = createMockStore({
    auth: { user: { email: 'test@test.com', password: 'pass' }, isLoggedIn: true },
    notifications: { notifications: [], loading: false },
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        { id: 3, name: 'React', credit: 40, isSelected: false },
      ],
    },
  });

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);

  expect(store.getState().courses.courses[0].isSelected).toBe(true);
});

test('sets isSelected to false when a course checkbox is unchecked', () => {
  const store = createMockStore({
    auth: { user: { email: 'test@test.com', password: 'pass' }, isLoggedIn: true },
    notifications: { notifications: [], loading: false },
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: true },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        { id: 3, name: 'React', credit: 40, isSelected: false },
      ],
    },
  });

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);

  expect(store.getState().courses.courses[0].isSelected).toBe(false);
});
