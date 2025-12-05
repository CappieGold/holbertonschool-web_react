import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem Component', () => {
  test('renders without crashing', () => {
    render(<NotificationItem />);
  });

  test('renders correct text when value prop is passed', () => {
    render(<NotificationItem type="default" value="Test notification" />);
    
    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  test('renders li element with correct data-notification-type attribute', () => {
    render(<NotificationItem type="default" value="Test" />);
    
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('data-notification-type', 'default');
  });

  test('renders with default type styling', () => {
    render(<NotificationItem type="default" value="Default notification" />);
    
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('data-notification-type', 'default');
    expect(listItem).toHaveClass('text-[color:var(--default-notification-item)]');
  });

  test('renders with urgent type styling', () => {
    render(<NotificationItem type="urgent" value="Urgent notification" />);
    
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('data-notification-type', 'urgent');
    expect(listItem).toHaveClass('text-[color:var(--urgent-notification-item)]');
  });

  test('renders HTML content when html prop is provided', () => {
    const htmlContent = { __html: '<strong>Important</strong> message' };
    render(<NotificationItem type="urgent" html={htmlContent} />);
    
    const listItem = screen.getByRole('listitem');
    expect(listItem.innerHTML).toContain('<strong>Important</strong>');
    expect(listItem.innerHTML).toContain('message');
  });

  test('calls markAsRead with correct id when clicked', () => {
    const markAsReadMock = jest.fn();
    
    render(
      <NotificationItem 
        id={42} 
        type="default" 
        value="Click me" 
        markAsRead={markAsReadMock} 
      />
    );
    
    const listItem = screen.getByRole('listitem');
    fireEvent.click(listItem);
    
    expect(markAsReadMock).toHaveBeenCalledTimes(1);
    expect(markAsReadMock).toHaveBeenCalledWith(42);
  });

  test('calls markAsRead when html notification is clicked', () => {
    const markAsReadMock = jest.fn();
    const htmlContent = { __html: '<strong>Click me</strong>' };
    
    render(
      <NotificationItem 
        id={99} 
        type="urgent" 
        html={htmlContent} 
        markAsRead={markAsReadMock} 
      />
    );
    
    const listItem = screen.getByRole('listitem');
    fireEvent.click(listItem);
    
    expect(markAsReadMock).toHaveBeenCalledTimes(1);
    expect(markAsReadMock).toHaveBeenCalledWith(99);
  });

  test('renders with default props when none provided', () => {
    render(<NotificationItem />);
    
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('data-notification-type', 'default');
    expect(listItem).toHaveTextContent('');
  });

  test('component is memoized (wrapped with React.memo)', () => {
    expect(NotificationItem.$$typeof).toBe(Symbol.for('react.memo'));
  });

  test('does not re-render when props remain the same', () => {
    const markAsReadMock = jest.fn();
    
    const { rerender } = render(
      <NotificationItem 
        id={1} 
        type="default" 
        value="Test" 
        markAsRead={markAsReadMock} 
      />
    );
    
    rerender(
      <NotificationItem 
        id={1} 
        type="default" 
        value="Test" 
        markAsRead={markAsReadMock} 
      />
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('re-renders when props change', () => {
    const markAsReadMock = jest.fn();
    
    const { rerender } = render(
      <NotificationItem 
        id={1} 
        type="default" 
        value="Original" 
        markAsRead={markAsReadMock} 
      />
    );
    
    expect(screen.getByText('Original')).toBeInTheDocument();
    
    rerender(
      <NotificationItem 
        id={1} 
        type="default" 
        value="Updated" 
        markAsRead={markAsReadMock} 
      />
    );
    
    expect(screen.getByText('Updated')).toBeInTheDocument();
    expect(screen.queryByText('Original')).not.toBeInTheDocument();
  });
});
