import { render } from '@testing-library/react';
import { Counter } from '.';

describe('Counter', () => {
  const defaultProps = {
    length: {
      current: 0,
      max: 10,
    },
    setValid: jest.fn(),
  };

  it('sets valid to true when current is less than or equal to max', () => {
    const { rerender } = render(<Counter {...defaultProps} />);
    expect(defaultProps.setValid).toHaveBeenCalledWith(true);

    rerender(<Counter {...defaultProps} length={{ current: 5, max: 10 }} />);
    expect(defaultProps.setValid).toHaveBeenCalledWith(true);
  });

  it('sets valid to false when current is greater than max', () => {
    render(<Counter {...defaultProps} length={{ current: 15, max: 10 }} />);
    expect(defaultProps.setValid).toHaveBeenCalledWith(false);
  });
});
