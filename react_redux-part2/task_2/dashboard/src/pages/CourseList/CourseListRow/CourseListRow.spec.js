import { render, screen, within } from '@testing-library/react';
import CourseListRow from './CourseListRow';

test('renders header with one cell spanning two columns', () => {
  render(
    <table><tbody>
      <CourseListRow isHeader={true} textFirstCell="First" textSecondCell={null} />
    </tbody></table>
  );

  const th = screen.getByRole('columnheader');
  expect(th).toHaveAttribute('colSpan', '2');
});

test('renders header with two cells when textSecondCell is provided', () => {
  render(
    <table><tbody>
      <CourseListRow isHeader={true} textFirstCell="First" textSecondCell="Second" />
    </tbody></table>
  );

  const thElements = screen.getAllByRole('columnheader');
  expect(thElements).toHaveLength(2);
});

test('renders regular row with two td cells', () => {
  render(
    <table><tbody>
      <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" />
    </tbody></table>
  );

  const tr = screen.getByRole('row');
  const tdElements = within(tr).getAllByRole('cell');
  expect(tdElements).toHaveLength(2);
});
