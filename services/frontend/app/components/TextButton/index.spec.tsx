import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextButton } from '.';

describe('TextButton', () => {
  const props = {
    children: 'text-button',
    onClick: jest.fn(),
  };

  it('renders button', () => {
    render(<TextButton {...props} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with children text', () => {
    render(<TextButton {...props} />);
    expect(screen.getByText(props.children)).toBeInTheDocument();
  });

  it('triggers onClick', async () => {
    render(<TextButton {...props} />);
    await userEvent.click(screen.getByRole('button'));
    expect(props.onClick).toHaveBeenCalled();
  });
});
