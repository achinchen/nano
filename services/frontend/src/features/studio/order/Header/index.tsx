import IconButton from '~frontend/components/IconButton';
import Button from '~frontend/components/Button';
import { useStudioContext } from '~frontend/features/studio/context';
import useHeader from '~frontend/features/studio/hooks/use-header';
import sharedI from '~frontend/shared/i.json';
import i from './i.json';

export default function Header({ smHidden }: { smHidden?: boolean }) {
  const { isListMode, toggleListMode } = useStudioContext();
  const { onNextClick, onPreviousClick, onTodayClick } = useHeader({
    isListMode,
  });

  return (
    <header
      className={`content-header ${smHidden ? 'hidden md:flex' : 'flex'}`}
    >
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
