import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalSheet } from '.';

describe('ModalSheet', () => {
  const onClose = jest.fn();
  const children = 'Test content';
  it('renders the children', () => {
    render(
      <ModalSheet onClose={onClose} opened>
        {children}
      </ModalSheet>
    );
    const contentElement = screen.getByText(children);
    expect(contentElement).toBeInTheDocument();
  });

  it('calls the onClose function when the close button is clicked', async () => {
    render(
      <ModalSheet onClose={onClose} opened hasCloseButton>
        {children}
      </ModalSheet>
    );
    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
