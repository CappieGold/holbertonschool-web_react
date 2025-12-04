import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom Component', () => {
  test('contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children</p>
      </BodySectionWithMarginBottom>
    );

    const divWithMargin = container.querySelector('.bodySectionWithMargin');
    expect(divWithMargin).toBeInTheDocument();
  });

  test('renders the BodySection component with correct props', () => {
    render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children</p>
      </BodySectionWithMarginBottom>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('test title');

    expect(screen.getByText('test children')).toBeInTheDocument();
  });

  test('contains the bodySection class inside bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="nested test">
        <p>nested content</p>
      </BodySectionWithMarginBottom>
    );

    const outerDiv = container.querySelector('.bodySectionWithMargin');
    const innerDiv = container.querySelector('.bodySection');

    expect(outerDiv).toBeInTheDocument();
    expect(innerDiv).toBeInTheDocument();
    expect(outerDiv).toContainElement(innerDiv);
  });
});
