import type { SelectedDatePayload } from '~frontend/components/Calendar/hooks/use-date-select';
import type { Status } from '~frontend/components/Calendar/types';
import { useMemo } from 'react';
import { DAYS, STATUS_CLASS } from '~frontend/components/Calendar/constants';
import { useDateSelect } from '~frontend/components/Calendar/hooks/use-date-select';
import { getMonthDays } from '~frontend/components/Calendar/utils';

type CalendarMonthProps = React.PropsWithChildren<{
  onSelect: (date: Date) => void;
  selectedDate?: Date;
  data?: {
    [key: string]: Status;
  };
}>;

export default function CalendarMonthTight({
  onSelect,
  selectedDate,
  data,
}: CalendarMonthProps) {
  const { selected, getCurrentColor, onDateSelect } = useDateSelect({
    selectedDate,
    onSelect,
  });

  const daysInMonth = useMemo(() => getMonthDays(selected), [selected]);

  const onClick =
    ({ year, month, day }: SelectedDatePayload) =>
    () => {
      onDateSelect({ year, month, day });
    };

  return (
    <section className="flex flex-col">
      <ol className="grid grid-cols-7 justify-items-center py-2 text-sm">
        {DAYS.map((DAY) => (
          <li key={DAY}>{DAY}</li>
        ))}
      </ol>
      <ol className="grid grid-cols-7 grid-rows-6 gap-1">
        {daysInMonth.map(({ year, month, day, weekday }) => (
          <li
            role="button"
            key={`${month}-${day}`}
            className="relative h-9 flex flex-col cursor-pointer items-center justify-center"
            onClick={onClick({ year, month, day })}
          >
            <span
              className={`w-7 h-7 text-base flex justify-center items-center rounded-full font-medium
               ${getCurrentColor({ month, day, weekday })}`}
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
