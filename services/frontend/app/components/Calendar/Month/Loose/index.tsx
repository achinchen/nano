import { useMemo } from 'react';
import { DAYS } from '~frontend/components/Calendar/constants';
import { useDateSelect } from '~frontend/components/Calendar/hooks/use-date-select';
import { getMonthDays } from '~frontend/components/Calendar/utils';
import { Content } from './Content';

type CalendarMonthProps = React.PropsWithChildren<{
  onSelect: (date: Date) => void;
  selectedDate?: Date;
  data?: {
    [key: string]: string[];
  };
  maxHeight?: boolean;
}>;

const LAST_ROW_START_INDEX = 35;

export function CalendarMonthLoose({
  maxHeight = false,
  onSelect,
  selectedDate,
  data,
}: CalendarMonthProps) {
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
            className={` flex flex-col cursor-pointer items-center pa-2 border-b-px  border-b-solid ${
              index < LAST_ROW_START_INDEX
                ? 'border-b-zinc-200'
                : 'border-b-transparent'
            } ${maxHeight ? 'h-35' : 'h-30'}`}
            onClick={onClick(month, day)}
          >
            <span
              className={`w-7 h-7 flex text-lg justify-center items-center rounded-full font-medium duration-100
               ${getCurrentColor({ month, day, weekday })}`}
            >
              {day}
            </span>
            {data?.[`${month}-${day}`] && (
              <Content data={data[`${month}-${day}`]} />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
