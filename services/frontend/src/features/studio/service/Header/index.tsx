import { Link } from 'react-router-dom';
import IconButton from '~frontend/components/IconButton';
import Button from '~frontend/components/Button';
import { useAppContext } from '~frontend/context';
import { useStudioContext } from '~frontend/features/studio/context';
import {
  getNextWeek,
  getPreviousWeek,
  getFirstDateInNextMonth,
  getFirstDateInPreviousMonth,
} from '~frontend/utils/date';
import sharedI from '~frontend/shared/i.json';
import i from './i.json';

const CONTAINER_CLASSES = 'items-center justify-between gap-2';

export default function ServicesHeader({ smHidden }: { smHidden?: boolean }) {
  const { setSelectedDate } = useAppContext();
  const { isListMode, toggleListMode } = useStudioContext();
  const onNextClick = () => {
    setSelectedDate((selectedDate) => {
      return isListMode
        ? getNextWeek(selectedDate)
        : getFirstDateInNextMonth(selectedDate);
    });
  };

  const onPreviousClick = () => {
    setSelectedDate((selectedDate) => {
      return isListMode
        ? getPreviousWeek(selectedDate)
        : getFirstDateInPreviousMonth(selectedDate);
    });
  };
  const onTodayClick = () => setSelectedDate(new Date());
  const onCreateClick = () => {
    /** */
  };

  return (
    <header
      className={`content-header ${smHidden ? 'hidden md:flex' : 'flex'}`}
    >
      <h2 className="text-lg md:text-xl">{i.list}</h2>
      <aside className={`${CONTAINER_CLASSES} flex`}>
        <div className={`${CONTAINER_CLASSES} hidden md:flex`}>
          <IconButton
            icon="i-solar-alt-arrow-left-linear"
            color="dark"
            variant="outline"
            size="sm"
            onClick={onPreviousClick}
          />
          <Button
            color="dark"
            variant="outline"
            size="sm"
            onClick={onTodayClick}
          >
            {sharedI.today}
          </Button>
          <IconButton
            icon="i-solar-alt-arrow-right-linear"
            color="dark"
            size="sm"
            variant="outline"
            onClick={onNextClick}
          />
          <IconButton
            icon="i-custom-slider-bold"
            color="dark"
            size="sm"
            variant={isListMode ? 'solid' : 'outline'}
            onClick={toggleListMode}
          />
        </div>
        <Link to="/studio/service/create">
          <Button
            color="dark"
            variant="outline"
            size="sm"
            prefixIcon="i-solar-add-circle-bold"
            onClick={onCreateClick}
          >
            {i.create}
          </Button>
        </Link>
      </aside>
    </header>
  );
}
