import IconButton from '~frontend/components/IconButton';
import Button from '~frontend/components/Button';
import { useStudioContext } from '~frontend/features/studio/context';
import {
  getNextWeek,
  getPreviousWeek,
  getLocaleYYYYMMDD,
  getFirstDateInNextMonth,
  getFirstDateInPreviousMonth,
} from '~frontend/utils/date';
import i from '~frontend/shared/i.json';

const CONTAINER_CLASSES = 'items-center justify-between gap-2';

export default function HomeHeader() {
  const { selectedDate, setSelectedDate, isListMode, toggleListMode } =
    useStudioContext();
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

  return (
    <header className="content-header">
      <time onClick={onTodayClick}>{getLocaleYYYYMMDD(selectedDate)}</time>
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
            {i.today}
          </Button>
          <IconButton
            icon="i-solar-alt-arrow-right-linear"
            color="dark"
            size="sm"
            variant="outline"
            onClick={onNextClick}
          />
        </div>
        <IconButton
          icon="i-custom-slider-bold"
          color="dark"
          size="sm"
          variant={isListMode ? 'solid' : 'outline'}
          onClick={toggleListMode}
        />
      </aside>
    </header>
  );
}
