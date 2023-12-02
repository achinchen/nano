import type { SelectedDatePayload } from '~frontend/components/Calendar/hooks/use-date-select';
import type {
  Status as StatusType,
  Content as ContentType,
} from '~frontend/components/Calendar/types';
import { useMemo } from 'react';
import { DAYS } from '~frontend/components/Calendar/constants';
import { useDateSelect } from '~frontend/components/Calendar/hooks/use-date-select';
import { getMonthDays } from '~frontend/components/Calendar/utils';
import Status from './Status';
import Content from './Content';

type CalendarMonthProps = {
  className?: string;
  onSelect: (date: Date) => void;
  selectedDate?: Date;
  data?: {
    [key: string]: ContentType[] | StatusType;
  };
  type?: 'status' | 'content';
  variant?: 'name' | 'tag' | 'all';
};

const LAST_ROW_START_INDEX = 35;

export default function CalendarMonthLoose({
  className = '',
  onSelect,
  selectedDate,
  data,
  type = 'status',
  variant,
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
    <section className={`max-w-5xl min-w-xl flex flex-col h-full ${className}`}>
      <ol className="grid grid-cols-7 justify-items-center py-2 text-lg">
        {DAYS.map((DAY) => (
          <li key={DAY}>{DAY}</li>
        ))}
      </ol>
      <ol className="grid grid-rows-[repeat(6,1fr)] grid-cols-7 flex-1">
        {daysInMonth.map(({ year, month, day, weekday }, index) => (
          <li
            role="button"
            key={`${month}-${day}`}
            className={`flex flex-col cursor-pointer items-center pa-2 border-b-px  border-b-solid ${
              index < LAST_ROW_START_INDEX
                ? 'border-b-zinc-200'
                : 'border-b-transparent'
            }`}
            onClick={onClick({ year, month, day })}
          >
            <span
              className={`w-7 h-7 flex text-lg justify-center items-center rounded-full font-medium duration-100
               ${getCurrentColor({ month, day, weekday })}`}
            >
              {day}
            </span>
            {data?.[`${month}-${day}`] &&
              (type === 'status' ? (
                <Status status={data[`${month}-${day}`] as StatusType} />
              ) : (
                <Content
                  data={data[`${month}-${day}`] as ContentType[]}
                  date={`${month}-${day}`}
                  variant={variant}
                />
              ))}
          </li>
        ))}
      </ol>
    </section>
  );
}
