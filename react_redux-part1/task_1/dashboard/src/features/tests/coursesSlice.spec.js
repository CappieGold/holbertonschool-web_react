import coursesReducer from '../courses/coursesSlice';
import { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('coursesSlice', () => {
  const initialState = {
    courses: [],
  };

  describe('initialState', () => {
    it('should return the correct initial state by default', () => {
      expect(coursesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('fetchCourses', () => {
    it('should fetch courses data correctly', () => {
      const courses = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ];

      const action = {
        type: fetchCourses.fulfilled.type,
        payload: courses,
      };

      const newState = coursesReducer(initialState, action);

      expect(newState.courses).toEqual(courses);
      expect(newState.courses).toHaveLength(3);
    });
  });

  describe('logout action', () => {
    it('should reset the courses array to empty when logout action is dispatched', () => {
      const stateWithCourses = {
        courses: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
          { id: 3, name: 'React', credit: 40 },
        ],
      };

      const newState = coursesReducer(stateWithCourses, logout());

      expect(newState.courses).toEqual([]);
      expect(newState.courses).toHaveLength(0);
    });
  });
});
