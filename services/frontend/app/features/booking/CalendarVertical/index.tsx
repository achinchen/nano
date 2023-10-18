import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingContext } from '~frontend/features/booking/context';
import { SheetIndicator } from '~frontend/components/Sheet';
import { CalendarMonthTight } from '~frontend/components/Calendar/Month';
import { CalendarWeek } from '~frontend/components/Calendar/Week';
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

export function CalendarVertical({ className = '' }: { className?: string }) {
  const { mode, toggleMode } = useCalendarVerticalContext();
  const { selectedDate, setSelectedDate } = useBookingContext();
  const [serviceData, setServiceData] = useState({});

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const isThisMonth = selectedDate.getMonth() === thisMonth;
    setServiceData(isThisMonth ? getMockData(thisMonth + 1) : {});
  }, [selectedDate, setSelectedDate]);

  return (
    <section className={className}>
      <motion.main
        className="flex flex-col rounded-b-4 bg-white px-4 shadow-default"
        drag="y"
        layout
        transition={{ duration: 0 }}
        style={{ touchAction: 'none' }}
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragStart={toggleMode}
        // onScroll={onChange}
      >
        {mode === 'week' && (
          <CalendarWeek
            onSelect={setSelectedDate}
            selectedDate={selectedDate}
            data={serviceData}
          />
        )}
        {mode === 'month' && (
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
