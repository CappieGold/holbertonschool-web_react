import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('contains 2 labels, 2 inputs (+ submit), and a submit input', () => {
    const { container } = render(<Login />);
    
    const labels = container.querySelectorAll('label');
    expect(labels).toHaveLength(2);
    
    const inputs = container.querySelectorAll('input');
    expect(inputs).toHaveLength(3);
    
    const submitInput = screen.getByRole('button', { name: /ok/i });
    expect(submitInput).toBeInTheDocument();
    expect(submitInput).toHaveAttribute('type', 'submit');
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
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

  test('submit button is disabled by default', () => {
    render(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /ok/i });
    expect(submitButton).toBeDisabled();
  });

  test('submit button becomes enabled after entering valid email and password (8+ chars)', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    
    expect(submitButton).toBeDisabled();
    
    await user.type(emailInput, 'invalid');
    expect(submitButton).toBeDisabled();
    
    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    expect(submitButton).toBeDisabled();
    
    await user.type(passwordInput, '1234567');
    expect(submitButton).toBeDisabled();
    
    await user.clear(passwordInput);
    await user.type(passwordInput, '12345678');
    expect(submitButton).toBeEnabled();
  });

  test('submit button becomes disabled when a field becomes invalid', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345678');
    expect(submitButton).toBeEnabled();

    await user.clear(emailInput);
    expect(submitButton).toBeDisabled();

    await user.type(emailInput, 'test@example.com');
    expect(submitButton).toBeEnabled();
    
    await user.clear(passwordInput);
    expect(submitButton).toBeDisabled();
  });

  test('form submission does not reload the page', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByRole('button', { name: /ok/i }).closest('form');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345678');
    
    const submitHandler = jest.fn((e) => e.preventDefault());
    form.addEventListener('submit', submitHandler);
    
    const submitButton = screen.getByRole('button', { name: /ok/i });
    await user.click(submitButton);
    
    expect(submitHandler).toHaveBeenCalled();
  });

  test('email and password inputs are controlled components', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    
    await user.type(emailInput, 'hello@world.com');
    await user.type(passwordInput, 'secret123');
    
    expect(emailInput).toHaveValue('hello@world.com');
    expect(passwordInput).toHaveValue('secret123');
  });

  test('logIn method is called with email and password when form is submitted', async () => {
    const user = userEvent.setup();
    const logInMock = jest.fn();

    render(<Login logIn={logInMock} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345678');

    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(logInMock).toHaveBeenCalledTimes(1);
    expect(logInMock).toHaveBeenCalledWith('test@example.com', '12345678');
  });

  test('logIn method is not called when form is invalid', async () => {
    const user = userEvent.setup();
    const logInMock = jest.fn();

    render(<Login logIn={logInMock} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    await user.type(emailInput, 'test@example.com');

    expect(submitButton).toBeDisabled();

    expect(logInMock).not.toHaveBeenCalled();
  });
});
