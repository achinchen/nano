import { render, screen } from '@testing-library/react';
import InputTime from '.';

describe('InputTime', () => {
  const props = {
    value: '2021-10-01',
    onValueChange: jest.fn(),
    'data-testid': 'input-date',
  };

  it('renders an input with type "date"', () => {
    render(<InputTime {...props} />);

    const input = screen.getByTestId(props['data-testid']);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'time');
  });
});
