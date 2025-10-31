import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications Component', () => {
  it('checks the existence of the notifications title "Here is the list of notifications"', () => {
    render(<Notifications />);
    const title = screen.getByText(/here is the list of notifications/i);
    expect(title).toBeInTheDocument();
  });

  it('checks the existence of the button element in the notifications', () => {
    render(<Notifications />);
    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  it('verifies that there are 3 li elements as notifications rendered', () => {
    const { container } = render(<Notifications />);
    const liElements = container.querySelectorAll('li');
    expect(liElements.length).toBe(3);
  });

  it('checks whether clicking the close button logs "Close button has been clicked" to the console', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<Notifications />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    
    fireEvent.click(closeButton);
    
    expect(logSpy).toHaveBeenCalledWith('Close button has been clicked');
    
    logSpy.mockRestore();
  });
});
