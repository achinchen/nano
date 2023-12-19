import { Fragment, lazy } from 'react';
import { useStudioContext } from '~frontend/features/studio/context';
import CalendarWeekList from '~frontend/features/studio/CalendarWeekList';
import { getIsMobile } from '~frontend/utils/device';
import CalendarMonth from './components/Month';

const CalendarModeSwitchable = lazy(
  () => import('~frontend/shared/components/CalendarModeSwitchable')
);

export default function Calendar() {
  const { isListMode } = useStudioContext();
  const isLoose = !getIsMobile();

  return (
    <div className="flex flex-col md:flex-row">
      {isListMode ? (
        <CalendarWeekList loose={isLoose} />
      ) : (
        <Fragment>
          <CalendarMonth className="hidden md:block" />
          <CalendarModeSwitchable className="md:hidden" />
        </Fragment>
      )}
    </div>
  );
}
