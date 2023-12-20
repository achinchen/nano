import type { Meta } from '@storybook/react';
import type { Status } from '~frontend/components/Calendar/types';
import { useState } from 'react';
import CalendarMonthLooseNameTag from './Loose/NameTag';
import { CalendarMonthTight } from '.';

const Story: Meta<typeof CalendarMonthLooseNameTag> = {
  component: CalendarMonthLooseNameTag,
  title: 'CalendarMonth',
};

export default Story;

const looseData = {
  17: [{ name: '提拉米蘇蛋糕課', id: 1 }],
  20: [
    {
      name: '提拉米蘇蛋糕課',
      id: 2,
    },
    {
      name: '情人節手作',
      id: 2,
    },
    {
      name: '3天寫程式就上手不可能',
      id: 3,
    },
    {
      name: '精油課程妳看不見',
      id: 12,
    },
  ],
  30: [
    {
      name: '提拉米蘇蛋糕課',
      id: 30,
    },
  ],
};

const getMockData = (month: number) => {
  return Object.entries(looseData).reduce((data, [date, value]) => {
    return {
      ...data,
      [`${month}-${date}`]: value,
    };
  }, {});
};

export const Loose = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2023-09-17'));

  return (
    <CalendarMonthLooseNameTag
      selectedDate={selectedDate}
      onSelect={setSelectedDate}
      data={getMockData(new Date().getMonth() + 1)}
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
