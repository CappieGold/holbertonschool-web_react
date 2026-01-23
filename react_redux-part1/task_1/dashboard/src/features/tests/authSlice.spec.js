import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: '',
      isLoggedIn: false,
    },
  };

  test('should return the correct initial state by default', () => {
    const result = authReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  test('should update state correctly when login action is dispatched', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = authReducer(initialState, login(credentials));

    expect(result.user.email).toBe(credentials.email);
    expect(result.user.password).toBe(credentials.password);
    expect(result.user.isLoggedIn).toBe(true);
  });

  test('should reset state correctly when logout action is dispatched', () => {
    const loggedInState = {
      user: {
        email: 'test@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
    };

    const result = authReducer(loggedInState, logout());

    expect(result.user.email).toBe('');
    expect(result.user.password).toBe('');
    expect(result.user.isLoggedIn).toBe(false);
  });
});
