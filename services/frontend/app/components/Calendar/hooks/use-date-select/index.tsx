import { useCallback, useMemo } from 'react';
import { getDateInfo } from './utils';
import { DAY_STYLE } from './constants';

type DayInfo = ReturnType<typeof getDateInfo>;

type Parameters = {
  onSelect: (date: Date) => void;
  selectedDate?: Date;
};

export const useDateSelect = ({ selectedDate, onSelect }: Parameters) => {
  const today = useMemo(() => new Date(), []);
  const selected = useMemo(() => selectedDate ?? today, [today, selectedDate]);

  const { month: todayMonth, day: todayDay } = useMemo<DayInfo>(
    () => getDateInfo(today),
    [today]
  );

  const { month: selectedMonth, day: selectedDay } = useMemo<DayInfo>(
    () => getDateInfo(selected),
    [selected]
  );

  const getCurrentColor = useCallback(
    ({ month, day, weekday }: DayInfo) => {
      if (month !== selectedMonth) return DAY_STYLE.OUT_OF_MONTH;
      if (month === selectedMonth && day === selectedDay)
        return DAY_STYLE.SELECTED;
      if (month === todayMonth && day === todayDay) return DAY_STYLE.TODAY;
      if (weekday === 0 || weekday === 6) return DAY_STYLE.WEEKEND;
      return DAY_STYLE.DEFAULT;
    },
    [selectedMonth, selectedDay, todayMonth, todayDay]
  );

  const onDateSelect = (month: number, day: number) => {
    onSelect(new Date(selected.getFullYear(), month - 1, day, 0, 0, 0, 0));
  };

  return {
    selected,
    onDateSelect,
    getCurrentColor,
  };
};
