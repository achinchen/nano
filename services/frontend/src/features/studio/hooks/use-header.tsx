import { useCallback } from 'react';
import { useAppContext } from '~frontend/context';
import { useStudioContext } from '~frontend/features/studio/context';
import {
  getNextWeek,
  getPreviousWeek,
  getFirstDateInNextMonth,
  getFirstDateInPreviousMonth,
} from '~frontend/utils/date';

export default function useHeader() {
  const { selectedDate, setSelectedDate } = useAppContext();
  const { isListMode } = useStudioContext();

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
    () => setSelectedDate(new Date()),
    [setSelectedDate]
  );

  return {
    onNextClick,
    onPreviousClick,
    onTodayClick,
    selectedDate,
  };
}
