import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { DatePickerMonthLoose, DatePickerMonthTight } from '.';

const Story: Meta<typeof DatePickerMonthLoose> = {
  component: DatePickerMonthLoose,
  title: 'DatePickerMonth',
};

export default Story;

export const Loose = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePickerMonthLoose
      selectedDate={selectedDate}
      onSelect={setSelectedDate}
    />
  );
};

export const Tight = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePickerMonthTight
      selectedDate={selectedDate}
      onSelect={setSelectedDate}
    />
  );
};
