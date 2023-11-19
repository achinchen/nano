import { render } from '@testing-library/react';
import Counter from '.';

describe('Counter', () => {
  const defaultProps = {
    maxLength: 10,
    value: 'test',
    setValid: jest.fn(),
  };

  it('sets valid to true when current is less than or equal to max', () => {
    const { rerender } = render(<Counter {...defaultProps} />);
    expect(defaultProps.setValid).toHaveBeenCalledWith(true);

    rerender(<Counter {...defaultProps} />);
    expect(defaultProps.setValid).toHaveBeenCalledWith(true);
  });

  it('sets valid to false when current is greater than max', () => {
    render(<Counter {...defaultProps} value="testtesttesttest" />);
    expect(defaultProps.setValid).toHaveBeenCalledWith(false);
  });
});
