import { render, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('renders notification with default type in blue', () => {
  const { container } = render(
    <NotificationItem id="1" type="default" value="Test notification" markAsRead={jest.fn()} />
  );

  const li = container.querySelector('[data-notification-type="default"]');
  expect(li).toBeInTheDocument();
  expect(li).toHaveTextContent('Test notification');
  expect(li).toHaveStyle({ color: 'blue' });
});

test('renders notification with urgent type in red', () => {
  const { container } = render(
    <NotificationItem id="1" type="urgent" value="Urgent notification" markAsRead={jest.fn()} />
  );

  const li = container.querySelector('[data-notification-type="urgent"]');
  expect(li).toBeInTheDocument();
  expect(li).toHaveTextContent('Urgent notification');
  expect(li).toHaveStyle({ color: 'red' });
});

test('calls markAsRead with correct id when clicked', () => {
  const mockMarkAsRead = jest.fn();
  const { container } = render(
    <NotificationItem id="1" type="default" value="Test" markAsRead={mockMarkAsRead} />
  );

  const li = container.querySelector('[data-notification-type="default"]');
  fireEvent.click(li);
  expect(mockMarkAsRead).toHaveBeenCalledWith('1');
});
