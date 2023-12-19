import type { PanInfo } from 'framer-motion';
import { motion } from 'framer-motion';
import { useStudioContext } from '~frontend/features/studio/context';
import CalendarWeek from '~frontend/components/Calendar/Week';
import { getNextWeek, getPreviousWeek } from '~frontend/utils/date';
import { usePan, Direction } from '~frontend/components/shared/hooks/use-pan';

export function ScrollableCalendarWeek({
  data,
}: {
  data: { [key: string]: 'unsold' | 'full' | 'has-order' };
}) {
  const { pan, onStart, onEnd } = usePan();
  const { selectedDate, setSelectedDate } = useStudioContext();

  const onPanStart = (_: unknown, { offset: { x, y } }: PanInfo) => {
    onStart({ x, y });
  };

  const onHorizontal = (direction: Direction) => {
    setSelectedDate((selectedDate) =>
      direction === Direction.right
        ? getPreviousWeek(selectedDate)
        : getNextWeek(selectedDate)
    );
  };

  const onPanEnd = (
    _: unknown,
    { offset: { x: offsetX, y: offsetY } }: PanInfo
  ) => {
    const y = pan.y - offsetY;
    const x = pan.x - offsetX;
    const { direction } = onEnd({ x, y });
    onHorizontal(direction);
  };
  return (
    <motion.section
      layout
      transition={{ duration: 0 }}
      style={{ touchAction: 'none' }}
      onPanSessionStart={onPanStart}
      onPanEnd={onPanEnd}
    >
      <CalendarWeek
        onSelect={setSelectedDate}
        selectedDate={selectedDate}
        data={data}
      />
    </motion.section>
  );
}

export default ScrollableCalendarWeek;
