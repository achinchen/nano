import type { PanInfo } from 'framer-motion';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingContext } from '~frontend/features/booking/context';
import { SheetIndicator } from '~frontend/components/Sheet';
import { CalendarMonthTight } from '~frontend/components/Calendar/Month';
import { CalendarWeek } from '~frontend/components/Calendar/Week';
import {
  getFirstDateInNextMonth,
  getFirstDateInPreviousMonth,
} from '~frontend/utils/date';
import { getNextWeek, getPreviousWeek } from './utils';
import { useCalendarVerticalContext } from './context';
import { usePan, Direction } from './hooks/use-pan';

const mockServiceData = {
  17: 'full',
  20: 'unsold',
  30: 'has-order',
};

const getMockData = (month: number) => {
  return Object.entries(mockServiceData).reduce((data, [date, value]) => {
    return {
      ...data,
      [`${month}-${date}`]: value,
    };
  }, {});
};

export function CalendarVertical({ className = '' }: { className?: string }) {
  const { mode, toggleMode } = useCalendarVerticalContext();
  const { pan, onStart, onEnd } = usePan();
  const { selectedDate, setSelectedDate } = useBookingContext();
  const [serviceData, setServiceData] = useState({});
  const isWeek = mode === 'week';

  const onPanStart = (_: unknown, { offset: { x, y } }: PanInfo) => {
    onStart({ x, y });
  };

  const onVertical = (direction: Direction) => {
    if (direction === Direction.up && !isWeek) toggleMode();
    if (direction === Direction.down && isWeek) toggleMode();
  };

  const onHorizontal = (direction: Direction) => {
    let cb;

    if (direction === Direction.right) {
      cb = isWeek ? getPreviousWeek : getFirstDateInPreviousMonth;
    } else {
      cb = isWeek ? getNextWeek : getFirstDateInNextMonth;
    }
    setSelectedDate(cb);
  };

  const onPanEnd = (
    _: unknown,
    { offset: { x: offsetX, y: offsetY } }: PanInfo
  ) => {
    const y = pan.y - offsetY;
    const x = pan.x - offsetX;
    const { direction, isVertical } = onEnd({ x, y });
    isVertical ? onVertical(direction) : onHorizontal(direction);
  };

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const isThisMonth = selectedDate.getMonth() === thisMonth;
    setServiceData(isThisMonth ? getMockData(thisMonth + 1) : {});
  }, [selectedDate, setSelectedDate]);

  return (
    <section className={className}>
      <motion.main
        className="flex flex-col rounded-b-4 bg-white px-4 shadow-default"
        layout
        transition={{ duration: 0 }}
        style={{ touchAction: 'none' }}
        onPanSessionStart={onPanStart}
        onPanEnd={onPanEnd}
      >
        {isWeek ? (
          <CalendarWeek
            onSelect={setSelectedDate}
            selectedDate={selectedDate}
            data={serviceData}
          />
        ) : (
          <CalendarMonthTight
            onSelect={setSelectedDate}
            selectedDate={selectedDate}
            data={serviceData}
          />
        )}
        <SheetIndicator />
      </motion.main>
    </section>
  );
}

export default CalendarVertical;
