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
  };

  describe('initialState', () => {
    it('should return the correct initial state by default', () => {
      expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('fetchNotifications', () => {
    it('should fetch notifications data correctly', () => {
      const notifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
      ];

      const action = {
        type: fetchNotifications.fulfilled.type,
        payload: notifications,
      };

      const newState = notificationsReducer(initialState, action);

      expect(newState.notifications).toEqual(notifications);
      expect(newState.notifications).toHaveLength(3);
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
      };

      const newState = notificationsReducer(stateWithNotifications, markNotificationAsRead(2));

      expect(newState.notifications).toHaveLength(2);
      expect(newState.notifications.find((n) => n.id === 2)).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');

      consoleSpy.mockRestore();
    });
  });
});
