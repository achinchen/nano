import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, InputProps } from '.';

describe('Input', () => {
  const props = {
    value: '',
    onValueChange: jest.fn(),
    placeholder: 'Enter text',
  } as InputProps;

  it('renders the input with the correct placeholder', () => {
    render(<Input {...props} />);
    expect(
      screen.getByPlaceholderText(props.placeholder as string)
    ).toBeInTheDocument();
  });

  it('calls onValueChange when the input value changes', async () => {
    render(<Input {...props} />);
    const newValue = 'New value';
    await userEvent.type(screen.getByRole('textbox'), newValue);
    expect(props.onValueChange).toHaveBeenCalled();
  });

  it('renders the prefix icon when provided', () => {
    const prefixIcon = 'search';
    render(<Input {...props} prefixIcon={prefixIcon} />);
    expect(screen.getByLabelText('icon-label')).toBeInTheDocument();
  });

  it('renders the suffix icon button when provided', () => {
    const suffixIcon = 'clear';
    render(<Input {...props} suffixIcon={suffixIcon} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
