import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('contains 2 labels, 2 inputs, and 1 button', () => {
    const { container } = render(<Login />);
    
    const labels = container.querySelectorAll('label');
    expect(labels).toHaveLength(2);
    
    const inputs = container.querySelectorAll('input');
    expect(inputs).toHaveLength(2);
    
    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(1);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });

  test('inputs get focused when their related labels are clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.click(emailInput);
    expect(emailInput).toHaveFocus();
    
    await user.click(passwordInput);
    expect(passwordInput).toHaveFocus();
  });
});
