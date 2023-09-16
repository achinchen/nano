import { useMemo } from 'react';
import { DAYS } from '~frontend/components/DatePicker/constants';
import { useDatePicker } from '~frontend/components/DatePicker/hooks/use-date-picker';
import { getMonthDays } from '../utils';

type MonthProps = React.PropsWithChildren<{
  onSelect: (date: Date) => void;
  selectedDate?: Date;
}>;

export const DatePickerMonthTight = ({
  onSelect,
  selectedDate,
}: MonthProps) => {
  const { selected, getCurrentColor, onDateSelect } = useDatePicker({
    selectedDate,
    onSelect,
  });

  const daysInMonth = useMemo(() => getMonthDays(selected), [selected]);

  const onClick = (month: number, day: number) => () => {
    onDateSelect(month, day);
  };

  return (
    <section className="flex flex-col">
      <ol className="grid grid-cols-7 justify-items-center pb-1 pt-2 text-sm">
        {DAYS.map((DAY) => (
          <li key={DAY}>{DAY}</li>
        ))}
      </ol>
      <ol className="grid grid-cols-7 grid-rows-6 gap-1">
        {daysInMonth.map(({ month, day, weekday }) => (
          <li
            role="button"
            key={`${month}-${day}`}
            className="relative h-9 flex flex-col cursor-pointer items-center justify-center"
            onClick={onClick(month, day)}
          >
            <span
              className={`w-7 h-7 text-base flex justify-center items-center rounded-full font-medium
               ${getCurrentColor({ month, day, weekday })}`}
            >
              {day}
            </span>
            <span className="absolute bottom--1.5 inline-block h-2 w-2 rounded bg-transparent" />
          </li>
        ))}
      </ol>
    </section>
  );
};
