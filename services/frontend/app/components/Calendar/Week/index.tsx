import type { SelectedDatePayload } from '~frontend/components/Calendar/hooks/use-date-select';
import type { Status } from '~frontend/components/Calendar/types';
import { useMemo } from 'react';
import { DAYS, STATUS_CLASS } from '~frontend/components/Calendar/constants';
import { useDateSelect } from '~frontend/components/Calendar/hooks/use-date-select';
import { getWeekDays } from '~frontend/components/Calendar/utils';

type CalendarWeekProps = React.PropsWithChildren<{
  onSelect: (date: Date) => void;
  selectedDate?: Date;
  loose?: boolean;
  data?: {
    [key: string]: Status;
  };
}>;

export function CalendarWeek({
  loose,
  onSelect,
  selectedDate,
  data,
}: CalendarWeekProps) {
  const { selected, getCurrentColor, onDateSelect } = useDateSelect({
    selectedDate,
    onSelect,
  });

  const daysInWeek = useMemo(() => getWeekDays(selected), [selected]);

  const onClick =
    ({ year, month, day }: SelectedDatePayload) =>
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      onDateSelect({ year, month, day });
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
        {daysInWeek.map(({ year, month, day, weekday }) => (
          <li
            role="button"
            key={`${month}-${day}`}
            className="relative h-10 flex flex-col cursor-pointer items-center justify-center"
            onClick={onClick({ year, month, day })}
          >
            <span
              className={`mt-1 w-7 h-7 flex justify-center items-center rounded-full font-medium
                ${getCurrentColor({ month, day, weekday })}
                ${loose ? 'text-lg' : 'text-base'}
              `}
            >
              {day}
            </span>
            {data?.[`${month}-${day}`] && (
              <span className={STATUS_CLASS[data[`${month}-${day}`]]} />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
