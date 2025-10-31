import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications Component', () => {
  test('renders the notifications title "Here is the list of notifications"', () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button element', () => {
    render(<Notifications />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('renders 3 li elements', () => {
    const { container } = render(<Notifications />);
    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
  });

  test('logs "Close button has been clicked" when close button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<Notifications />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    
    fireEvent.click(closeButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    
    consoleSpy.mockRestore();
  });
});
