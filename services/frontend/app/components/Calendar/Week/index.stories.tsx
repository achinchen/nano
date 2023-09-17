import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '~frontend/components/Switch';
import { CalendarWeek } from '.';

const Story: Meta<typeof CalendarWeek> = {
  component: CalendarWeek,
  title: 'CalendarWeek',
};

export default Story;

export const Default = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2023-1-1'));
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
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
    </>
  );
};
