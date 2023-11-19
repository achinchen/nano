import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEFAULT_PLACEHOLDER, NO_OPTIONS_LABEL } from './constants';
import Select from '.';

const OUTSIDE_ELEMENT_TEST_ID = 'outside';
const onValueChange = jest.fn();
const mockOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

const mockProps = {
  value: '',
  options: mockOptions,
  onValueChange,
};
const mockNoOptionsLabel = 'mock';

const setup = (props = {}) => {
  return render(<Select {...mockProps} {...props}></Select>);
};

describe('rendering', () => {
  test('render the trigger element with a placeholder', () => {
    setup();
    expect(
      screen.getByPlaceholderText(DEFAULT_PLACEHOLDER)
    ).toBeInTheDocument();
  });

  test('disable the select when disabled prop is true', () => {
    setup({ disabled: true });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('render with initialized value', async () => {
    const targetOption = mockOptions[0];
    setup({ value: targetOption.value });
    expect(screen.getByRole('textbox')).toHaveValue(targetOption.label);
  });

  test('render no options menu when no options', async () => {
    setup({ options: [] });
    userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => {
      expect(screen.getByText(NO_OPTIONS_LABEL)).toBeInTheDocument();
    });
  });

  test('render no options menu with noOptionsLabel', async () => {
    setup({ options: [], noOptionsLabel: mockNoOptionsLabel });
    userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => {
      expect(screen.getByText(mockNoOptionsLabel)).toBeInTheDocument();
    });
  });
});

describe('interaction', () => {
  test('open the select options when clicked', async () => {
    setup();
    expect(() => screen.getByRole('listbox')).toThrow();
    userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  test('close the options when an option is clicked', async () => {
    setup();
    userEvent.click(screen.getByRole('textbox'));
    const option = await screen.findByText(mockOptions[0].label);
    userEvent.click(option);
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith(mockOptions[0].value);
    });
    expect(() => screen.getByRole('listbox')).toThrow();
  });

  test('close the options when clicking outside', async () => {
    render(
      <div>
        <div data-testid={OUTSIDE_ELEMENT_TEST_ID}>Click me</div>
        <Select value="" options={mockOptions} />
      </div>
    );
    userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(OUTSIDE_ELEMENT_TEST_ID));
    await waitFor(() => {
      expect(() => screen.getByRole('listbox')).toThrow();
    });
  });

  test('do nothing if user type in input', async () => {
    const testText = 'test';

    setup();
    const inputField = screen.getByRole('textbox');
    userEvent.type(inputField, testText);
    await waitFor(async () => {
      expect(inputField).toHaveValue('');
    });
  });

  test('filter options if select is filterable', async () => {
    const targetOption = mockOptions[0];
    const nonTargetOption = mockOptions[1];

    setup({ filterable: true });
    const inputField = screen.getByRole('textbox');
    userEvent.type(inputField, targetOption.label);
    userEvent.click(inputField);
    await waitFor(async () => {
      expect(screen.getByText(targetOption.label)).toBeInTheDocument();
    });
    await waitFor(async () => {
      expect(() => screen.getByText(nonTargetOption.label)).toThrow();
    });
  });
});
