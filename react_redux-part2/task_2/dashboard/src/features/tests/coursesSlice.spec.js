import coursesReducer, { fetchCourses, selectCourse, unSelectCourse } from '../courses/coursesSlice';
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
    it('should fetch courses data correctly with isSelected defaulting to false', () => {
      const mockCourses = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ];

      const action = fetchCourses.fulfilled(mockCourses, 'courses/fetchCourses');
      const newState = coursesReducer(initialState, action);

      expect(newState.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        { id: 3, name: 'React', credit: 40, isSelected: false },
      ]);
    });
  });

  describe('selectCourse', () => {
    it('should set isSelected to true for the given course id', () => {
      const stateWithCourses = {
        courses: [
          { id: 1, name: 'ES6', credit: 60, isSelected: false },
          { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        ],
      };

      const newState = coursesReducer(stateWithCourses, selectCourse(1));

      expect(newState.courses[0].isSelected).toBe(true);
      expect(newState.courses[1].isSelected).toBe(false);
    });
  });

  describe('unSelectCourse', () => {
    it('should set isSelected to false for the given course id', () => {
      const stateWithCourses = {
        courses: [
          { id: 1, name: 'ES6', credit: 60, isSelected: true },
          { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        ],
      };

      const newState = coursesReducer(stateWithCourses, unSelectCourse(1));

      expect(newState.courses[0].isSelected).toBe(false);
      expect(newState.courses[1].isSelected).toBe(false);
    });
  });

  describe('logout action', () => {
    it('should reset the courses array to empty whenever the logout action is dispatched', () => {
      const stateWithCourses = {
        courses: [
          { id: 1, name: 'ES6', credit: 60, isSelected: false },
          { id: 2, name: 'Webpack', credit: 20, isSelected: false },
          { id: 3, name: 'React', credit: 40, isSelected: false }
        ],
      };

      const action = logout();
      const newState = coursesReducer(stateWithCourses, action);

      expect(newState.courses).toEqual([]);
    });
  });
});
