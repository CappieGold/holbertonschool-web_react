import notificationsReducer, {
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    loading: false,
  };

  describe('initialState', () => {
    it('should return the correct initial state by default', () => {
      expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('fetchNotifications', () => {
    it('should set loading to true when fetchNotifications is pending', () => {
      const action = { type: fetchNotifications.pending.type };
      const newState = notificationsReducer(initialState, action);
      expect(newState.loading).toBe(true);
    });

    it('should store notifications and set loading to false when fulfilled', () => {
      const notifications = [
        { id: '1', type: 'urgent', isRead: false, value: 'Test urgent' },
        { id: '2', type: 'default', isRead: false, value: 'Test default' },
      ];

      const action = {
        type: fetchNotifications.fulfilled.type,
        payload: notifications,
      };

      const loadingState = { ...initialState, loading: true };
      const newState = notificationsReducer(loadingState, action);

      expect(newState.notifications).toEqual(notifications);
      expect(newState.notifications).toHaveLength(2);
      expect(newState.loading).toBe(false);
    });

    it('should set loading to false when fetchNotifications is rejected', () => {
      const action = { type: fetchNotifications.rejected.type };
      const loadingState = { ...initialState, loading: true };
      const newState = notificationsReducer(loadingState, action);
      expect(newState.loading).toBe(false);
    });
  });

  describe('markNotificationAsRead', () => {
    it('should remove a notification correctly when markNotificationAsRead is dispatched', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      const stateWithNotifications = {
        notifications: [
          { id: '1', type: 'urgent', isRead: false, value: 'Test urgent' },
          { id: '2', type: 'default', isRead: false, value: 'Test default' },
          { id: '3', type: 'urgent', isRead: false, value: 'Another urgent' },
        ],
        loading: false,
      };

      const newState = notificationsReducer(stateWithNotifications, markNotificationAsRead('2'));

      expect(newState.notifications).toHaveLength(2);
      expect(newState.notifications.find((n) => n.id === '2')).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');

      consoleSpy.mockRestore();
    });
  });
});
