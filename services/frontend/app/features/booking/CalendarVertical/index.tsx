import type { PanInfo } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingContext } from '~frontend/features/booking/context';
import { SheetIndicator } from '~frontend/components/Sheet';
import { CalendarMonthTight } from '~frontend/components/Calendar/Month';
import { CalendarWeek } from '~frontend/components/Calendar/Week';
import {
  getFirstDateInNextMonth,
  getFirstDateInPreviousMonth,
  getAfter,
  getBefore,
} from '~frontend/utils/date';
import { useCalendarVerticalContext } from './context';

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

const DAYS = 7;

function toPrevious(isWeek: boolean) {
  return isWeek
    ? (date: Date) => getBefore(date, DAYS)
    : getFirstDateInPreviousMonth;
}

function toNext(isWeek: boolean) {
  return isWeek
    ? (date: Date) => getAfter(date, DAYS)
    : getFirstDateInNextMonth;
}

export function CalendarVertical({ className = '' }: { className?: string }) {
  const { mode, toggleMode } = useCalendarVerticalContext();
  const { selectedDate, setSelectedDate } = useBookingContext();
  const [serviceData, setServiceData] = useState({});
  const [panInfo, setPanInfo] = useState({
    x: 0,
    y: 0,
  });

  const isWeek = mode === 'week';

  const onPanStart = (_: unknown, { offset }: PanInfo) => {
    setPanInfo({
      x: offset.x,
      y: offset.y,
    });
  };

  const onPanEnd = (_: unknown, { offset }: PanInfo) => {
    const isChangeMode = Math.abs(offset.y - panInfo.y);
    if (isChangeMode) return toggleMode();

    const isToPrevious = offset.x < panInfo.x;
    setSelectedDate((selectedDate) =>
      isToPrevious
        ? toPrevious(isWeek)(selectedDate)
        : toNext(isWeek)(selectedDate)
    );
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
        onPanStart={onPanStart}
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
