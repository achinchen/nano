import { useEffect, useState } from 'react';
import CalendarMonthLoose from '~frontend/components/Calendar/Month/Loose/Process';
import { useMyContext } from '~frontend/features/my/context';
import { isBefore } from '~frontend/utils/date';

type Props = {
  className?: string;
};

const mockServiceData = {
  17: [{ id: 1 }],
  20: [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 12,
    },
  ],
  30: [
    {
      id: 30,
    },
  ],
};

const getMockData = (month: number) => {
  return Object.entries(mockServiceData).reduce((data, [date]) => {
    return {
      ...data,
      [`${month}-${date}`]: isBefore(
        new Date(),
        new Date(2023, month, Number(date))
      )
        ? 'end'
        : 'start',
    };
  }, {});
};

export default function CalendarHorizontal({ className = '' }: Props) {
  const { selectedDate, setSelectedDate } = useMyContext();
  const [serviceData, setServiceData] = useState({});

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const isThisMonth = selectedDate.getMonth() === thisMonth;
    setServiceData(isThisMonth ? getMockData(thisMonth + 1) : {});
  }, [selectedDate, setSelectedDate]);

  return (
    <section className={`w-160 bg-zinc-50 h-full ${className}`}>
      <CalendarMonthLoose
        data={serviceData}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
    </section>
  );
}
