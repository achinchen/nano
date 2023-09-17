import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DAYS } from '~frontend/components/DatePicker/constants';
import { getWeekDays } from '~frontend/components/DatePicker/Week/utils';
import { DatePickerWeek } from '.';

describe('DatePickerWeek', () => {
  const onSelect = jest.fn();
  const selectedDate = new Date('2023-01-28, 00:00:00');

  it('renders the days of the week', () => {
    render(<DatePickerWeek onSelect={onSelect} selectedDate={selectedDate} />);

    DAYS.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('should render the days of the month', () => {
    render(<DatePickerWeek onSelect={onSelect} selectedDate={selectedDate} />);

    const daysInMonth = getWeekDays(selectedDate);

    daysInMonth.forEach(({ day }) => {
      expect(screen.getByText(String(day))).toBeInTheDocument();
    });

    expect(screen.getAllByRole('button')).toHaveLength(daysInMonth.length);
  });

  it('calls onSelect when a day is clicked', async () => {
    render(<DatePickerWeek onSelect={onSelect} selectedDate={selectedDate} />);

    const dayToClick = selectedDate.getDate();
    await userEvent.click(
      screen.getByRole('button', { name: String(dayToClick) })
    );

    expect(onSelect).toHaveBeenCalledWith(selectedDate);
  });
});
