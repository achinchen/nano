import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from '.';

const Story: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'DatePicker',
};

export default Story;

export const Default = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return <DatePicker selectedDate={selectedDate} onSelect={setSelectedDate} />;
};
