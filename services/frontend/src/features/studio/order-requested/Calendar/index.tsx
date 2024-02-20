import { lazy } from 'react';
import { useStudioContext } from '~frontend/features/studio/context';
import CalendarMonth from './components/Month';

const CalendarWeekList = lazy(
  () =>
    import('~frontend/features/studio/components/CalendarWeekList/ServiceRWD')
);

export default function Calendar() {
  const { isListMode } = useStudioContext();

  return isListMode ? <CalendarWeekList /> : <CalendarMonth />;
}
