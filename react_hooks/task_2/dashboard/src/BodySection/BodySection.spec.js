import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection Component', () => {
  test('renders a heading with the title prop value', () => {
    render(<BodySection title="test title" />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('test title');
  });

  test('renders any children passed to it', () => {
    render(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('test title');

    expect(screen.getByText('test children node')).toBeInTheDocument();
  });

  test('renders multiple children correctly', () => {
    render(
      <BodySection title="multiple children">
        <p>First child</p>
        <p>Second child</p>
        <span>Third child</span>
      </BodySection>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });
});
