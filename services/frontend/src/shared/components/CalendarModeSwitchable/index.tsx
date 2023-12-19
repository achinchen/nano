import type { PanInfo } from 'framer-motion';
import { useEffect, useState, lazy, startTransition } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '~frontend/context';
import { SheetIndicator } from '~frontend/components/Sheet';
import CalendarMonthTight from '~frontend/components/Calendar/Month/Tight';
import {
  getNextWeek,
  getPreviousWeek,
  getFirstDateInNextMonth,
  getFirstDateInPreviousMonth,
} from '~frontend/utils/date';
import { usePan, Direction } from '~frontend/components/shared/hooks/use-pan';
import { useCalendarModeSwitchableContext } from './context';

const mockServiceData = {
  17: [{ status: 'has-order', name: '提拉米蘇蛋糕課', id: 1 }],
  20: [
    {
      status: 'full',
      name: '提拉米蘇蛋糕課',
      id: 2,
    },
    {
      status: 'unsold',
      name: '情人節手作',
      id: 2,
    },
    {
      status: 'has-order',
      name: '3天寫程式就上手不可能',
      id: 3,
    },
    {
      status: 'has-order',
      name: '精油課程妳看不見',
      id: 12,
    },
  ],
  30: [
    {
      status: 'has-order',
      name: '提拉米蘇蛋糕課',
      id: 30,
    },
  ],
};

const CalendarWeek = lazy(() => import('~frontend/components/Calendar/Week'));

const getMockData = (month: number) => {
  return Object.entries(mockServiceData).reduce((data, [date, value]) => {
    return {
      ...data,
      [`${month}-${date}`]: value[0].status,
    };
  }, {});
};

export default function CalendarModeSwitchable({
  className = '',
}: {
  className?: string;
}) {
  const { mode, toggleMode } = useCalendarModeSwitchableContext();
  const { pan, onStart, onEnd } = usePan();
  const { selectedDate, setSelectedDate } = useAppContext();
  const [serviceData, setServiceData] = useState({});
  const isWeek = mode === 'week';

  const onPanStart = (_: unknown, { offset: { x, y } }: PanInfo) => {
    onStart({ x, y });
  };

  const onToggle = () => startTransition(toggleMode);

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
    const { direction } = onEnd({ x, y });
    onHorizontal(direction);
  };

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const isThisMonth = selectedDate.getMonth() === thisMonth;
    setServiceData(isThisMonth ? getMockData(thisMonth + 1) : {});
  }, [selectedDate, setSelectedDate]);

  return (
    <section className={className}>
      <motion.main
        className="flex flex-col rounded-b-4 bg-white pt-2 shadow-default"
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
        <SheetIndicator onClick={onToggle} />
      </motion.main>
    </section>
  );
}
