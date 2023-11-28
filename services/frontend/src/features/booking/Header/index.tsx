import IconButton from '~frontend/components/IconButton';
import Button from '~frontend/components/Button';
import { useBookingContext } from '~frontend/features/booking/context';
import {
  getFirstDateInNextMonth,
  getFirstDateInPreviousMonth,
  getLocaleYYYYMMDD,
} from '~frontend/utils/date';
import i from '~frontend/shared/i.json';

export function Header({ className = '' }: { className?: string }) {
  const { selectedDate, setSelectedDate } = useBookingContext();
  const onNextClick = () => {
    setSelectedDate((selectedDate) => getFirstDateInNextMonth(selectedDate));
  };

  const onPreviousClick = () => {
    setSelectedDate((selectedDate) =>
      getFirstDateInPreviousMonth(selectedDate)
    );
  };
  const onTodayClick = () => setSelectedDate(new Date());

  return (
    <header className={`content-header ${className}`}>
      <time onClick={onTodayClick}>{getLocaleYYYYMMDD(selectedDate)}</time>
      <aside className="hidden items-center justify-between gap-2 md:flex">
        <IconButton
          icon="i-solar-alt-arrow-left-linear"
          color="dark"
          variant="outline"
          size="sm"
          onClick={onPreviousClick}
        />
        <Button color="dark" variant="outline" size="sm" onClick={onTodayClick}>
          {i.today}
        </Button>
        <IconButton
          icon="i-solar-alt-arrow-right-linear"
          color="dark"
          size="sm"
          variant="outline"
          onClick={onNextClick}
        />
      </aside>
    </header>
  );
}

export default Header;
