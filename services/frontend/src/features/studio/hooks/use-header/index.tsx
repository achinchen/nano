import { useCallback } from 'react';
import { useAppContext } from '~frontend/context';
import {
  getNextWeek,
  getPreviousWeek,
  getFirstDateInNextMonth,
  getFirstDateInPreviousMonth,
} from '~frontend/utils/date';

export default function useHeader({ isListMode }: { isListMode: boolean }) {
  const { selectedDate, setSelectedDate } = useAppContext();

  const onNextClick = useCallback(() => {
    setSelectedDate((selectedDate) => {
      return isListMode
        ? getNextWeek(selectedDate)
        : getFirstDateInNextMonth(selectedDate);
    });
  }, [isListMode, setSelectedDate]);

  const onPreviousClick = useCallback(() => {
    setSelectedDate((selectedDate) => {
      return isListMode
        ? getPreviousWeek(selectedDate)
        : getFirstDateInPreviousMonth(selectedDate);
    });
  }, [isListMode, setSelectedDate]);

  const onTodayClick = useCallback(
    () => setSelectedDate(new Date('2024/01/01')),
    [setSelectedDate]
  );

  return {
    onNextClick,
    onPreviousClick,
    onTodayClick,
    selectedDate,
  };
}
