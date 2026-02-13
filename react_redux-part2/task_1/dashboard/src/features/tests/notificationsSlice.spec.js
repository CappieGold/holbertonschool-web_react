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

    it('should fetch notifications data correctly and set loading to false', () => {
      const notifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
      ];

      const action = {
        type: fetchNotifications.fulfilled.type,
        payload: notifications,
      };

      const loadingState = { ...initialState, loading: true };
      const newState = notificationsReducer(loadingState, action);

      expect(newState.notifications).toEqual(notifications);
      expect(newState.notifications).toHaveLength(3);
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
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
        ],
        loading: false,
      };

      const newState = notificationsReducer(stateWithNotifications, markNotificationAsRead(2));

      expect(newState.notifications).toHaveLength(2);
      expect(newState.notifications.find((n) => n.id === 2)).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');

      consoleSpy.mockRestore();
    });
  });
});
