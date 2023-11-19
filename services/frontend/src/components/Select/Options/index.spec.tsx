import type { OptionsProps } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '.';

const defaultProps: OptionsProps = {
  value: 'option1',
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ],
  noOptionsLabel: 'No options',
  onOptionClick: jest.fn(),
  onClose: jest.fn(),
};

describe('Options', () => {
  it('renders the provided options', () => {
    render(<Options {...defaultProps} />);

    defaultProps.options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('calls the provided callback with the option value when clicked', () => {
    const option = defaultProps.options[0];
    render(<Options {...defaultProps} options={[option]} />);

    userEvent.click(screen.getByText(option.label));

    expect(defaultProps.onOptionClick).toHaveBeenCalledWith(option);
  });

  it('calls the provided callback with the option value when keydown', () => {
    const option = defaultProps.options[0];
    render(<Options {...defaultProps} options={[option]} />);

    userEvent.tab();
    userEvent.keyboard('{enter}');

    expect(defaultProps.onOptionClick).toHaveBeenCalledWith(option);
  });

  it('shows no options label when there are no options', () => {
    render(<Options {...defaultProps} options={[]} />);

    expect(screen.getByText('No options')).toBeInTheDocument();
  });

  it('sets the selected option as aria-selected', () => {
    const selectedOption = defaultProps.options[0];
    render(<Options {...defaultProps} value={selectedOption.value} />);

    expect(screen.getByText(selectedOption.label)).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });
});
