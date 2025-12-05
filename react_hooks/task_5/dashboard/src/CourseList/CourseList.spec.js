import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

describe('CourseList Component', () => {
  test('renders correctly with empty courses array', () => {
    render(<CourseList courses={[]} />);
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1);
  });

  test('renders correctly with list of courses', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ];
    
    render(<CourseList courses={courses} />);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
  });
});
