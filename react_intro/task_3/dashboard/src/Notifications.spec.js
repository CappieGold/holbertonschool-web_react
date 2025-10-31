import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications Component', () => {
  test('renders the notifications title', () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('renders 3 list items', () => {
    const { container } = render(<Notifications />);
    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
  });

  test('clicking close button logs message to console', () => {
    // Mock console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<Notifications />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    
    // Simulate click event
    fireEvent.click(closeButton);
    
    // Check if console.log was called with the correct message
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    
    // Restore console.log
    consoleSpy.mockRestore();
  });
});
