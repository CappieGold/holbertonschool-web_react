import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import mockAxios from 'jest-mock-axios';

describe('coursesSlice', () => {
  const initialState = {
    courses: [],
  };

  afterEach(() => {
    mockAxios.reset();
  });

  describe('initialState', () => {
    it('should return the correct initial state', () => {
      expect(coursesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('fetchCourses', () => {
    it('should fetch courses data correctly', async () => {
      const mockCourses = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ];

      const action = fetchCourses.fulfilled(mockCourses, 'courses/fetchCourses');
      const newState = coursesReducer(initialState, action);

      expect(newState.courses).toEqual(mockCourses);
    });
  });

  describe('logout action', () => {
    it('should reset the courses array to empty whenever the logout action is dispatched', () => {
      const stateWithCourses = {
        courses: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
          { id: 3, name: 'React', credit: 40 }
        ],
      };

      const action = logout();
      const newState = coursesReducer(stateWithCourses, action);

      expect(newState.courses).toEqual([]);
    });
  });
});
