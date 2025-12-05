import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import WithLogging from './WithLogging';

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

class MockApp extends React.Component {
  render() {
    return (
      <h1>Hello from Mock App Component</h1>
    );
  }
}

describe('WithLogging HOC', () => {
  test('renders the wrapped component correctly', () => {
    const WrappedMockApp = WithLogging(MockApp);

    render(<WrappedMockApp />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello from Mock App Component');
  });

  test('logs mount message on component mount', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const WrappedMockApp = WithLogging(MockApp);

    render(<WrappedMockApp />);

    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is mounted');
  });

  test('logs unmount message on component unmount', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const WrappedMockApp = WithLogging(MockApp);

    const { unmount } = render(<WrappedMockApp />);

    unmount();

    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
  });

  test('uses "Component" as default name when wrapped element has no name', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const AnonymousComponent = () => <p>Anonymous</p>;
    Object.defineProperty(AnonymousComponent, 'name', { value: '' });

    const WrappedAnonymous = WithLogging(AnonymousComponent);

    render(<WrappedAnonymous />);

    expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted');
  });

  test('has correct displayName for debugging', () => {
    const WrappedMockApp = WithLogging(MockApp);

    expect(WrappedMockApp.displayName).toBe('WithLogging(MockApp)');
  });

  test('passes props to the wrapped component', () => {
    class PropsComponent extends React.Component {
      render() {
        return <p>Hello {this.props.name}</p>;
      }
    }

    const WrappedPropsComponent = WithLogging(PropsComponent);

    render(<WrappedPropsComponent name="World" />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
