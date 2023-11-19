import type { Meta } from '@storybook/react';
import type { Status } from '~frontend/components/Calendar/types';
import { useState } from 'react';
import { CalendarMonthLoose, CalendarMonthTight } from '.';

const Story: Meta<typeof CalendarMonthLoose> = {
  component: CalendarMonthLoose,
  title: 'CalendarMonth',
};

export default Story;

const looseData = {
  '9-20': ['提拉米蘇蛋糕課', '情人節手作'],
  '9-30': ['創業諮詢課程非常長'],
  '9-17': [
    '提拉米蘇蛋糕課',
    '情人節手作',
    '3天寫程式就上手不可能',
    '精油課程妳看不見',
  ],
};

export const Loose = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2023-09-17'));

  return (
    <CalendarMonthLoose
      selectedDate={selectedDate}
      onSelect={setSelectedDate}
      data={looseData}
      type="content"
    />
  );
};

const data = {
  '9-20': 'unsold',
  '9-18': 'full',
  '9-17': 'has-order',
} as {
  [key: string]: Status;
};

export const Tight = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2023-09-17'));

  return (
    <CalendarMonthTight
      data={data}
      selectedDate={selectedDate}
      onSelect={setSelectedDate}
    />
  );
};
