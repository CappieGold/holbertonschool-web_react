import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications Component', () => {
  const sampleNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
  ];

  test('renders without crashing', () => {
    render(<Notifications />);
  });

  test('renders "Your notifications" title', () => {
    render(<Notifications />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('renders "No new notification for now" when notifications is empty and displayDrawer is true', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
  });

  test('renders notification items when notifications array is provided and displayDrawer is true', () => {
    render(<Notifications displayDrawer={true} notifications={sampleNotifications} />);
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });

  test('does not render notifications list when displayDrawer is false', () => {
    render(<Notifications displayDrawer={false} notifications={sampleNotifications} />);
    expect(screen.queryByText('New course available')).not.toBeInTheDocument();
  });

  test('renders correct number of notification items', () => {
    render(<Notifications displayDrawer={true} notifications={sampleNotifications} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  test('logs correct message when notification item is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<Notifications displayDrawer={true} notifications={sampleNotifications} />);

    const firstNotification = screen.getByText('New course available');
    fireEvent.click(firstNotification);

    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');

    const secondNotification = screen.getByText('New resume available');
    fireEvent.click(secondNotification);

    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');

    consoleSpy.mockRestore();
  });

  test('does not re-render when notifications length stays the same', () => {
    const initialNotifications = [
      { id: 1, type: 'default', value: 'First notification' },
      { id: 2, type: 'urgent', value: 'Second notification' },
      { id: 3, type: 'default', value: 'Third notification' }
    ];

    const updatedNotifications = [
      { id: 1, type: 'default', value: 'Updated first notification' },
      { id: 2, type: 'urgent', value: 'Updated second notification' },
      { id: 3, type: 'default', value: 'Updated third notification' }
    ];

    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={initialNotifications} />
    );

    expect(screen.getByText('First notification')).toBeInTheDocument();

    rerender(
      <Notifications displayDrawer={true} notifications={updatedNotifications} />
    );

    expect(screen.getByText('First notification')).toBeInTheDocument();
    expect(screen.queryByText('Updated first notification')).not.toBeInTheDocument();
  });

  test('re-renders when notifications length changes', () => {
    const initialNotifications = [
      { id: 1, type: 'default', value: 'First notification' },
      { id: 2, type: 'urgent', value: 'Second notification' }
    ];

    const longerNotifications = [
      { id: 1, type: 'default', value: 'First notification' },
      { id: 2, type: 'urgent', value: 'Second notification' },
      { id: 3, type: 'default', value: 'Third notification' }
    ];

    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={initialNotifications} />
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    rerender(
      <Notifications displayDrawer={true} notifications={longerNotifications} />
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Third notification')).toBeInTheDocument();
  });
});
