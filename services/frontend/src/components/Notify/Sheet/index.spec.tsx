import type { NotifyProps } from '~frontend/components/Notify/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotifySheet from '.';

describe('NotifySheet', () => {
  const defaultProps: NotifyProps = {
    onClose: jest.fn(),
    hasCloseButton: true,
    title: 'Test Sheet',
    description: 'This is a test sheet',
    severity: 'info',
  };

  it('calls onClose when close button is clicked', async () => {
    render(<NotifySheet {...defaultProps} />);
    const closeButton = screen.getByLabelText('icon-label');
    await userEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
