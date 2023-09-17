import { useMemo } from 'react';
import { DAYS } from '~frontend/components/DatePicker/constants';
import { useDatePicker } from '~frontend/components/DatePicker/hooks/use-date-picker';
import { getMonthDays } from '../utils';

type MonthProps = React.PropsWithChildren<{
  onSelect: (date: Date) => void;
  selectedDate?: Date;
}>;

const LAST_ROW_START_INDEX = 35;

export const DatePickerMonthLoose = ({
  onSelect,
  selectedDate,
  children,
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
      <ol className="grid grid-cols-7 justify-items-center py-2 text-lg">
        {DAYS.map((DAY) => (
          <li key={DAY}>{DAY}</li>
        ))}
      </ol>
      <ol className="grid grid-cols-7 grid-rows-6">
        {daysInMonth.map(({ month, day, weekday }, index) => (
          <li
            role="button"
            key={`${month}-${day}`}
            className={`h-35 flex flex-col cursor-pointer items-center p-2 border-b-px  border-b-solid ${
              index < LAST_ROW_START_INDEX
                ? 'border-b-zinc-200'
                : 'border-b-transparent'
            }`}
            onClick={onClick(month, day)}
          >
            <span
              className={`w-7 h-7 flex text-lg justify-center items-center rounded-full font-medium duration-100
               ${getCurrentColor({ month, day, weekday })}`}
            >
              {day}
            </span>
            {children}
          </li>
        ))}
      </ol>
    </section>
  );
};
