import IconButton from '~frontend/components/IconButton';
import Button from '~frontend/components/Button';
import { useStudioContext } from '~frontend/features/studio/context';
import sharedI from '~frontend/shared/i.json';
import useHeader from '~frontend/features/studio/hooks/use-header';
import i from './i.json';

export default function Header() {
  const { isListMode, toggleListMode } = useStudioContext();
  const { onPreviousClick, onNextClick, onTodayClick } = useHeader({
    isListMode,
  });

  return (
    <header className="hidden content-header md:flex">
      <h2 className="text-lg md:text-xl">{i.list}</h2>
      <aside className="hidden items-center justify-between gap-2 md:flex">
        <IconButton
          icon="i-solar-alt-arrow-left-linear"
          color="dark"
          variant="outline"
          size="sm"
          onClick={onPreviousClick}
        />
        <Button color="dark" variant="outline" size="sm" onClick={onTodayClick}>
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
      </aside>
    </header>
  );
}
