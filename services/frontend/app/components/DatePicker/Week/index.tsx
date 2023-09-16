import { useMemo } from 'react';
import { DAYS } from '~frontend/components/DatePicker/constants';
import { useDatePicker } from '~frontend/components/DatePicker/hooks/use-date-picker';
import { getWeekDays } from './utils';

type DatePickerWeekProps = React.PropsWithChildren<{
  onSelect: (date: Date) => void;
  selectedDate?: Date;
  loose?: boolean;
}>;

export const DatePickerWeek = ({
  loose,
  onSelect,
  selectedDate,
  children,
}: DatePickerWeekProps) => {
  const { selected, getCurrentColor, onDateSelect } = useDatePicker({
    selectedDate,
    onSelect,
  });

  const daysInWeek = useMemo(() => getWeekDays(selected), [selected]);

  const onClick =
    (month: number, day: number) =>
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      onDateSelect(month, day);
    };

  return (
    <section className="flex flex-col">
      <ol className="grid grid-cols-7 justify-items-center">
        {DAYS.map((DAY) => (
          <li
            key={DAY}
            className={`font-medium ${loose ? 'text-lg' : 'text-sm'}`}
          >
            {DAY}
          </li>
        ))}
      </ol>
      <ol className="grid grid-cols-7">
        {daysInWeek.map(({ month, day, weekday }) => (
          <li
            role="button"
            key={`${month}-${day}`}
            className="relative h-10 flex flex-col cursor-pointer items-center justify-center"
            onClick={onClick(month, day)}
          >
            <span
              className={`mt-1 w-7 h-7 flex justify-center items-center rounded-full font-medium
                ${getCurrentColor({ month, day, weekday })}
                ${loose ? 'text-lg' : 'text-base'}
              `}
            >
              {day}
            </span>
            {loose || (
              <span className="absolute bottom--1.5 inline-block h-2 w-2 rounded bg-gray" />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};