import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sheet from '.';

describe('Sheet', () => {
  const onClose = jest.fn();
  const children = 'Test content';
  it('renders the children', () => {
    render(<Sheet onClose={onClose}>{children}</Sheet>);
    const contentElement = screen.getByText(children);
    expect(contentElement).toBeInTheDocument();
  });

  it('calls the onClose function when the close button is clicked', async () => {
    render(
      <Sheet onClose={onClose} hasCloseButton clickOutsideToClose={false}>
        {children}
      </Sheet>
    );
    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
