import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { CalendarMonthLoose, CalendarMonthTight } from '.';

const Story: Meta<typeof CalendarMonthLoose> = {
  component: CalendarMonthLoose,
  title: 'CalendarMonth',
};

export default Story;

export const Loose = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <CalendarMonthLoose
      selectedDate={selectedDate}
      onSelect={setSelectedDate}
    />
  );
};

export const Tight = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <CalendarMonthTight
      selectedDate={selectedDate}
      onSelect={setSelectedDate}
    />
  );
};
