import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OPTION_BY_UNIT, UNITS } from './constants';
import SelectTime from '.';

describe('SelectTime', () => {
  const onValueChange = jest.fn();

  test.each(UNITS)('renders the provided options %s', async (unit) => {
    render(<SelectTime value="" onValueChange={onValueChange} unit={unit} />);
    await userEvent.click(screen.getByRole('textbox'));
    OPTION_BY_UNIT[unit].forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('renders the provided placeholder', () => {
    const placeholder = 'Select an hour';
    render(
      <SelectTime
        value=""
        onValueChange={onValueChange}
        unit="hour"
        placeholder={placeholder}
      />
    );

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('calls the provided callback when an option is selected', async () => {
    const unit = 'hour';
    const target = OPTION_BY_UNIT[unit][1];
    render(<SelectTime value="" onValueChange={onValueChange} unit={unit} />);
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.click(screen.getByText(target.label));

    expect(onValueChange).toHaveBeenCalledWith(target.value);
  });
});
