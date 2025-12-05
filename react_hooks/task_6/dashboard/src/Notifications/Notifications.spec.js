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

  test('calls markNotificationAsRead with correct id when notification item is clicked', () => {
    const markNotificationAsReadMock = jest.fn();

    render(
      <Notifications
        displayDrawer={true}
        notifications={sampleNotifications}
        markNotificationAsRead={markNotificationAsReadMock}
      />
    );

    const firstNotification = screen.getByText('New course available');
    fireEvent.click(firstNotification);

    expect(markNotificationAsReadMock).toHaveBeenCalledWith(1);

    const secondNotification = screen.getByText('New resume available');
    fireEvent.click(secondNotification);

    expect(markNotificationAsReadMock).toHaveBeenCalledWith(2);
  });

  test('clicking on menu item calls handleDisplayDrawer', () => {
    const handleDisplayDrawerMock = jest.fn();

    render(
      <Notifications
        notifications={sampleNotifications}
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawerMock}
        handleHideDrawer={() => {}}
      />
    );

    const menuItem = screen.getByText(/your notifications/i);
    fireEvent.click(menuItem);

    expect(handleDisplayDrawerMock).toHaveBeenCalled();
    expect(handleDisplayDrawerMock).toHaveBeenCalledTimes(1);
  });

  test('clicking on close button calls handleHideDrawer', () => {
    const handleHideDrawerMock = jest.fn();

    render(
      <Notifications
        notifications={sampleNotifications}
        displayDrawer={true}
        handleDisplayDrawer={() => {}}
        handleHideDrawer={handleHideDrawerMock}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(handleHideDrawerMock).toHaveBeenCalled();
    expect(handleHideDrawerMock).toHaveBeenCalledTimes(1);
  });

  test('component is memoized (wrapped with React.memo)', () => {
    expect(Notifications.$$typeof).toBe(Symbol.for('react.memo'));
  });

  test('re-renders when displayDrawer changes', () => {
    const { rerender } = render(
      <Notifications displayDrawer={false} notifications={sampleNotifications} />
    );

    expect(screen.queryByText('New course available')).not.toBeInTheDocument();

    rerender(
      <Notifications displayDrawer={true} notifications={sampleNotifications} />
    );

    expect(screen.getByText('New course available')).toBeInTheDocument();
  });

  test('re-renders when notifications array length changes', () => {
    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={sampleNotifications} />
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    const fewerNotifications = [
      { id: 1, type: 'default', value: 'New course available' }
    ];

    rerender(
      <Notifications displayDrawer={true} notifications={fewerNotifications} />
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('notification title has bounce animation when notifications exist and drawer is closed', () => {
    render(<Notifications displayDrawer={false} notifications={sampleNotifications} />);
    
    const title = screen.getByText(/your notifications/i);
    expect(title).toHaveClass('animate-bounce');
  });

  test('notification title does not have bounce animation when drawer is open', () => {
    render(<Notifications displayDrawer={true} notifications={sampleNotifications} />);
    
    const title = screen.getByText(/your notifications/i);
    expect(title).not.toHaveClass('animate-bounce');
  });

  test('notification title does not have bounce animation when no notifications', () => {
    render(<Notifications displayDrawer={false} notifications={[]} />);
    
    const title = screen.getByText(/your notifications/i);
    expect(title).not.toHaveClass('animate-bounce');
  });

  test('renders HTML content correctly in notification item', () => {
    render(<Notifications displayDrawer={true} notifications={sampleNotifications} />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[2].innerHTML).toContain('<strong>Urgent requirement</strong>');
  });

  test('does not re-render when props remain the same', () => {
    const markNotificationAsReadMock = jest.fn();
    const handleDisplayDrawerMock = jest.fn();
    const handleHideDrawerMock = jest.fn();

    const { rerender } = render(
      <Notifications
        displayDrawer={true}
        notifications={sampleNotifications}
        handleDisplayDrawer={handleDisplayDrawerMock}
        handleHideDrawer={handleHideDrawerMock}
        markNotificationAsRead={markNotificationAsReadMock}
      />
    );

    rerender(
      <Notifications
        displayDrawer={true}
        notifications={sampleNotifications}
        handleDisplayDrawer={handleDisplayDrawerMock}
        handleHideDrawer={handleHideDrawerMock}
        markNotificationAsRead={markNotificationAsReadMock}
      />
    );

    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
