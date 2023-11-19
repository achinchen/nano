import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BottomSheet from '.';

describe('BottomSheet', () => {
  const defaultProps = {
    onClose: jest.fn(),
    title: 'Test BottomSheet',
    footer: 'Test Footer',
  };

  it('renders the title, description, children, and footer', () => {
    const childrenText = 'Test Children';
    render(
      <BottomSheet {...defaultProps}>
        <div>{childrenText}</div>
      </BottomSheet>
    );

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(childrenText)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.footer)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    render(<BottomSheet {...defaultProps} />);
    const closeButton = screen.getAllByRole('button')[0];
    await userEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
