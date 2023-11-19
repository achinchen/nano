import { render, screen } from '@testing-library/react';
import InputDate from '.';

describe('InputDate', () => {
  const props = {
    value: '2021-10-01',
    onValueChange: jest.fn(),
    'data-testid': 'input-date',
  };

  it('renders an input with type "date"', () => {
    render(<InputDate {...props} />);

    const input = screen.getByTestId(props['data-testid']);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });
});
