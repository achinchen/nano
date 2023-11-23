import { Fragment } from 'react';
import IconButton from '~frontend/components/IconButton';
import Button from '~frontend/components/Button';
import { useStudioContext } from '~frontend/features/studio/context';
import {
  getLocaleYYYYMMDD,
  getFirstDateInNextMonth,
  getFirstDateInPreviousMonth,
} from '~frontend/utils/date';
import { getIsMobile } from '~frontend/utils/device';
import i from './i.json';

export function Header() {
  const { selectedDate, setSelectedDate, isListMode, setListMode } =
    useStudioContext();
  const onNextClick = () => {
    setSelectedDate((selectedDate) => getFirstDateInNextMonth(selectedDate));
  };

  const onPreviousClick = () => {
    setSelectedDate((selectedDate) =>
      getFirstDateInPreviousMonth(selectedDate)
    );
  };
  const onTodayClick = () => setSelectedDate(new Date());
  const onToggleListMode = () => setListMode((isListMode) => !isListMode);

  return (
    <header className="content-header">
      <time onClick={onTodayClick}>{getLocaleYYYYMMDD(selectedDate)}</time>
      <aside className="flex items-center justify-between gap-2">
        {!getIsMobile() && (
          <Fragment>
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
          </Fragment>
        )}
        <IconButton
          icon={isListMode ? 'i-custom-slider-bold' : 'i-custom-slider-outline'}
          color="dark"
          size="sm"
          variant="outline"
          onClick={onToggleListMode}
        />
      </aside>
    </header>
  );
}

export default Header;
