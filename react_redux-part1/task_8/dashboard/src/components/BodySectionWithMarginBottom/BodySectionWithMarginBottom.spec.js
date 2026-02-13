import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

test('renders title and children', () => {
  render(
    <BodySectionWithMarginBottom title="Test Title">
      <p>Child Content</p>
    </BodySectionWithMarginBottom>
  );

  expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
  expect(screen.getByText('Child Content')).toBeInTheDocument();
});
