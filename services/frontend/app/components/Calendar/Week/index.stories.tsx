import type { Meta } from '@storybook/react';
import type { Status } from '~frontend/components/Calendar/types';
import { useState } from 'react';
import { Switch } from '~frontend/components/Switch';
import { CalendarWeek } from '.';

const Story: Meta<typeof CalendarWeek> = {
  component: CalendarWeek,
  title: 'CalendarWeek',
};

export default Story;

const data = {
  '9-20': 'unsold',
  '9-18': 'full',
  '9-17': 'has-order',
} as {
  [key: string]: Status;
};

export const Default = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2023-09-17'));
  const [isLoose, setIsLoose] = useState(true);

  return (
    <>
      Loose{' '}
      <Switch
        checked={isLoose}
        onChange={() => setIsLoose((isLoose) => !isLoose)}
      />
      <CalendarWeek
        loose={isLoose}
        data={data}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
    </>
  );
};
