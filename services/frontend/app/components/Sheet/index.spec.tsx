import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sheet, SheetProps } from '.';

describe('Sheet', () => {
  const defaultProps: SheetProps = {
    opened: true,
    onClose: jest.fn(),
    hasCloseButton: true,
    title: 'Test Sheet',
    description: 'This is a test sheet',
    severity: 'info',
  };

  it('calls onClose when close button is clicked', async () => {
    render(<Sheet {...defaultProps} />);
    const closeButton = screen.getByLabelText('icon-label');
    await userEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
