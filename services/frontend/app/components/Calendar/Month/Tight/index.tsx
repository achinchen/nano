import { useMemo } from 'react';
import { DAYS } from '~frontend/components/shared/constants';
import { useDateSelect } from '~frontend/components/shared/hooks/use-date-select';
import { getMonthDays } from '~frontend/components/shared/utils';

type CalendarMonthProps = React.PropsWithChildren<{
  onSelect: (date: Date) => void;
  selectedDate?: Date;
}>;

export const CalendarMonthTight = ({
  onSelect,
  selectedDate,
}: CalendarMonthProps) => {
  const { selected, getCurrentColor, onDateSelect } = useDateSelect({
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
