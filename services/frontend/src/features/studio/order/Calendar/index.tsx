import { lazy } from 'react';
import { useStudioContext } from '~frontend/features/studio/context';
import CalendarMonth from './components/Month';

const CalendarWeekList = lazy(
  () => import('~frontend/features/studio/CalendarWeekList/Order')
);

export default function Calendar() {
  const { isListMode } = useStudioContext();

  return isListMode ? <CalendarWeekList /> : <CalendarMonth />;
}
