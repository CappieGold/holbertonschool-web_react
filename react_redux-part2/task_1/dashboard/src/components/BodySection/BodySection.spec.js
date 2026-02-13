import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('renders title and children', () => {
  render(
    <BodySection title="Test Title">
      <p>Test child</p>
    </BodySection>
  );

  expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
  expect(screen.getByText('Test child')).toBeInTheDocument();
});
