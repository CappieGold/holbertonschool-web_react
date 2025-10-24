import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders h1 element with text "School dashboard"', () => {
    render(<App />);
    const h1Element = screen.getByRole('heading', { 
      level: 1, 
      name: /school dashboard/i 
    });
    expect(h1Element).toBeInTheDocument();
  });

  test('renders paragraph with login text in App-body', () => {
    render(<App />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
  });

  test('renders paragraph with copyright text in App-footer', () => {
    render(<App />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      new RegExp(`copyright ${currentYear} - holberton school`, 'i')
    );
    expect(copyrightText).toBeInTheDocument();
  });

  test('renders img element with alt text "holberton logo"', () => {
    render(<App />);
    const imgElement = screen.getByAltText(/holberton logo/i);
    expect(imgElement).toBeInTheDocument();
  });

  test('renders 2 input elements', () => {
    render(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders 2 label elements with text Email and Password', () => {
    render(<App />);
    const emailLabel = screen.getByText(/email:/i);
    const passwordLabel = screen.getByText(/password:/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders a button with text OK', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});
