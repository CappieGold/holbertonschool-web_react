import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications Component', () => {
  const sampleNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
  ];

  test('renders the notifications title', () => {
    render(<Notifications notifications={sampleNotifications} />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications notifications={sampleNotifications} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('renders 3 list items with correct notifications', () => {
    const { container } = render(<Notifications notifications={sampleNotifications} />);
    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
  });

  test('displays correct text for each notification', () => {
    render(<Notifications notifications={sampleNotifications} />);
    
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
    
    const urgentRequirement = screen.getByText(/urgent requirement/i);
    expect(urgentRequirement).toBeInTheDocument();
  });

  test('clicking close button logs message to console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<Notifications notifications={sampleNotifications} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    
    fireEvent.click(closeButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    
    consoleSpy.mockRestore();
  });

  test('renders correctly with empty notifications array', () => {
    render(<Notifications notifications={[]} />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders correctly when notifications prop is not provided', () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });
});
