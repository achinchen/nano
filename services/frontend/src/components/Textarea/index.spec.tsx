import type { TextareaProps } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textarea from '.';

const onValueChange = jest.fn();

const setup = (props: Partial<TextareaProps> = {}) => {
  const defaultProps: TextareaProps = {
    onValueChange,
    placeholder: 'placeholder',
  };

  const mergedProps = { ...defaultProps, ...props };

  render(<Textarea {...mergedProps} />);
};

describe('rendering', () => {
  it('renders textarea', () => {
    setup();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders placeholder', () => {
    setup();
    expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
  });

  it('renders errorMessage', () => {
    const errorMessage = 'errorMessage';
    setup({ errorMessage });
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders counter', () => {
    setup({ maxLength: 10 });
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });
});

describe('interaction', () => {
  const inputValue = 'test';

  it('trigger onValueChange when typing', async () => {
    setup();
    await userEvent.type(screen.getByRole('textbox'), inputValue);
    expect(onValueChange).toHaveBeenCalledWith(inputValue);
  });
});
