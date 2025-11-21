import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem Component', () => {
  test('renders li element with blue color and data-notification-type="default" when type is "default"', () => {
    const { container } = render(
      <NotificationItem type="default" value="Test notification" />
    );
    
    const liElement = container.querySelector('li');
    
    expect(liElement).toHaveStyle({ color: 'rgb(0, 0, 255)' });
    
    expect(liElement).toHaveAttribute('data-notification-type', 'default');
  });

  test('renders li element with red color and data-notification-type="urgent" when type is "urgent"', () => {
    const { container } = render(
      <NotificationItem type="urgent" value="Urgent notification" />
    );
    
    const liElement = container.querySelector('li');
    
    expect(liElement).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    
    expect(liElement).toHaveAttribute('data-notification-type', 'urgent');
  });

  test('renders value text correctly', () => {
    render(
      <NotificationItem type="default" value="Test notification text" />
    );
    
    const notification = screen.getByText('Test notification text');
    expect(notification).toBeInTheDocument();
  });

  test('renders HTML content correctly when html prop is provided', () => {
    const htmlContent = { __html: '<strong>Urgent requirement</strong> - complete by EOD' };
    const { container } = render(
      <NotificationItem type="urgent" html={htmlContent} />
    );
    
    const liElement = container.querySelector('li');
    expect(liElement.innerHTML).toBe('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
