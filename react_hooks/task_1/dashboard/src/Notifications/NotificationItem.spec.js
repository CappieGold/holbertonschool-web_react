import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem Component', () => {
  test('renders li element with data-notification-type="default" when type is "default"', () => {
    render(<NotificationItem type="default" value="test" />);
    const li = screen.getByRole('listitem');
    expect(li).toHaveAttribute('data-notification-type', 'default');
  });

  test('renders li element with data-notification-type="urgent" when type is "urgent"', () => {
    render(<NotificationItem type="urgent" value="test" />);
    const li = screen.getByRole('listitem');
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
  });

  test('renders value text correctly', () => {
    render(<NotificationItem type="default" value="New course available" />);
    expect(screen.getByText('New course available')).toBeInTheDocument();
  });

  test('renders html correctly when html prop is provided', () => {
    const htmlContent = { __html: '<strong>Urgent requirement</strong>' };
    render(<NotificationItem type="urgent" html={htmlContent} />);
    const li = screen.getByRole('listitem');
    expect(li.innerHTML).toBe('<strong>Urgent requirement</strong>');
  });

  test('calls markAsRead with correct id when clicked', () => {
    const markAsReadMock = jest.fn();

    render(
      <NotificationItem
        type="default"
        value="Test notification"
        id={1}
        markAsRead={markAsReadMock}
      />
    );

    const li = screen.getByRole('listitem');
    fireEvent.click(li);

    expect(markAsReadMock).toHaveBeenCalledWith(1);
    expect(markAsReadMock).toHaveBeenCalledTimes(1);
  });
});
