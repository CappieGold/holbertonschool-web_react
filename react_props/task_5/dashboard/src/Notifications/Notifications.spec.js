import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications Component', () => {
  const sampleNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
  ];

  test('menu item is being displayed when displayDrawer is false', () => {
    render(<Notifications />);
    const menuItem = screen.getByText(/your notifications/i);
    expect(menuItem).toBeInTheDocument();
  });

  test('div.Notifications is not being displayed when displayDrawer is false', () => {
    const { container } = render(<Notifications displayDrawer={false} />);
    const notificationsDiv = container.querySelector('.Notifications');
    expect(notificationsDiv).not.toBeInTheDocument();
  });

  test('menu item is being displayed when displayDrawer is true', () => {
    render(<Notifications displayDrawer={true} />);
    const menuItem = screen.getByText(/your notifications/i);
    expect(menuItem).toBeInTheDocument();
  });

  test('div.Notifications is being displayed when displayDrawer is true', () => {
    const { container } = render(<Notifications displayDrawer={true} />);
    const notificationsDiv = container.querySelector('.Notifications');
    expect(notificationsDiv).toBeInTheDocument();
  });

  test('renders "Here is the list of notifications" when notifications are provided', () => {
    render(<Notifications displayDrawer={true} notifications={sampleNotifications} />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('renders 3 list items when notifications are provided', () => {
    const { container } = render(<Notifications displayDrawer={true} notifications={sampleNotifications} />);
    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
  });

  test('renders "No new notification for now" when notifications are empty', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('clicking close button logs message to console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<Notifications displayDrawer={true} notifications={sampleNotifications} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    
    fireEvent.click(closeButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    
    consoleSpy.mockRestore();
  });
});
