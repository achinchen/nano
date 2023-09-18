import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step from './index';

describe('Step', () => {
  it('renders button', () => {
    render(<Step />);
    const button = screen.getByRole('button');
    const span = screen.getByRole('presentation');
    expect(button).toBeInTheDocument();
    expect(span).toBeInTheDocument();
  });

  it('renders presentation', () => {
    render(<Step />);
    const button = screen.getByRole('button');
    const span = screen.getByRole('presentation');
    expect(button).toBeInTheDocument();
    expect(span).toBeInTheDocument();
  });

  it('disables the button when completed is false', () => {
    render(<Step />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('enables the button when completed is true', () => {
    render(<Step completed />);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });

  it('calls onClick when the button is clicked', async () => {
    const onClick = jest.fn();
    render(<Step completed onClick={onClick} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
