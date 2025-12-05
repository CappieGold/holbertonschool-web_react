import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow Component', () => {
  test('renders one cell with colspan=2 when isHeader is true and textSecondCell is null', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="Header" />
        </tbody>
      </table>
    );
    const thElement = screen.getByRole('columnheader');
    expect(thElement).toBeInTheDocument();
    expect(thElement).toHaveAttribute('colspan', '2');
    expect(thElement).toHaveTextContent('Header');
  });

  test('renders two cells when isHeader is true and textSecondCell is present', () => {
    render(
      <table>
        <thead>
          <CourseListRow isHeader={true} textFirstCell="Header 1" textSecondCell="Header 2" />
        </thead>
      </table>
    );
    const thElements = screen.getAllByRole('columnheader');
    expect(thElements).toHaveLength(2);
    expect(thElements[0]).toHaveTextContent('Header 1');
    expect(thElements[1]).toHaveTextContent('Header 2');
  });

  test('renders two td elements within a tr element when isHeader is false', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={false} textFirstCell="Cell 1" textSecondCell="Cell 2" />
        </tbody>
      </table>
    );
    const tdElements = screen.getAllByRole('cell');
    expect(tdElements).toHaveLength(2);
    expect(tdElements[0]).toHaveTextContent('Cell 1');
    expect(tdElements[1]).toHaveTextContent('Cell 2');
  });
});
