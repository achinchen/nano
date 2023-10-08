'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SheetIndicator } from '~frontend/components/Sheet';
import { CalendarMonthTight } from '~frontend/components/Calendar/Month';
import { CalendarWeek } from '~frontend/components/Calendar/Week';
import { formatDate } from './utils';

export function VerticalCalendar() {
  const [mode, setMode] = useState<'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDrag = () => setMode((mode) => (mode === 'month' ? 'week' : 'month'));

  return (
    <section>
      <header className="px-4 py-2.5">{formatDate(selectedDate)} </header>
      <motion.main
        className="flex flex-col rounded-b-4 bg-white px-4 shadow-default"
        drag="y"
        layout
        transition={{ duration: 0 }}
        style={{ touchAction: 'none' }}
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragStart={onDrag}
      >
        {mode === 'week' && (
          <CalendarWeek
            onSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
        )}
        {mode === 'month' && (
          <CalendarMonthTight
            onSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
        )}
        <SheetIndicator />
      </motion.main>
    </section>
  );
}

export default VerticalCalendar;
