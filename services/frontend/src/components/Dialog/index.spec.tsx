import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '.';

const props = {
  onClose: jest.fn(),
  title: 'Title',
  footer: 'Footer',
  children: 'Children',
};

describe('Dialog', () => {
  it('should render the provided title and footer', () => {
    render(<Dialog {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.children)).toBeInTheDocument();
    expect(screen.getByText(props.footer)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    render(<Dialog {...props} />);
    const closeButton = screen.getAllByRole('button')[0];
    await userEvent.click(closeButton);
    expect(props.onClose).toHaveBeenCalled();
  });
});
