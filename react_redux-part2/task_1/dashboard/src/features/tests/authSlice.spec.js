import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  };

  describe('initialState', () => {
    it('should return the initial state', () => {
      expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('login action', () => {
    it('should update the state with user email and password from payload', () => {
      const userPayload = {
        email: 'test@test.com',
        password: 'password123',
      };

      const action = login(userPayload);
      const newState = authReducer(initialState, action);

      expect(newState.user.email).toBe(userPayload.email);
      expect(newState.user.password).toBe(userPayload.password);
    });

    it('should set isLoggedIn to true when login action is dispatched', () => {
      const userPayload = {
        email: 'test@test.com',
        password: 'password123',
      };

      const action = login(userPayload);
      const newState = authReducer(initialState, action);

      expect(newState.isLoggedIn).toBe(true);
    });
  });

  describe('logout action', () => {
    it('should reset user email and password to empty string', () => {
      const loggedInState = {
        user: {
          email: 'test@test.com',
          password: 'password123',
        },
        isLoggedIn: true,
      };

      const action = logout();
      const newState = authReducer(loggedInState, action);

      expect(newState.user.email).toBe('');
      expect(newState.user.password).toBe('');
    });

    it('should set isLoggedIn to false when logout action is dispatched', () => {
      const loggedInState = {
        user: {
          email: 'test@test.com',
          password: 'password123',
        },
        isLoggedIn: true,
      };

      const action = logout();
      const newState = authReducer(loggedInState, action);

      expect(newState.isLoggedIn).toBe(false);
    });
  });
});
