import IconButton from '~frontend/components/IconButton';
import Button from '~frontend/components/Button';
import {
  getFirstDateInNextMonth,
  getFirstDateInPreviousMonth,
  getLocaleYYYYMMDD,
} from '~frontend/utils/date';
import i from '~frontend/shared/i.json';
import { useAppContext } from '~frontend/context';

export function Header({ smHidden = false }: { smHidden?: boolean }) {
  const { selectedDate, setSelectedDate } = useAppContext();
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
    <header className={`content-header ${smHidden ? 'hidden md:flex' : ''}`}>
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
