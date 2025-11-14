import { render } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });
});
