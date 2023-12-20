import { useEffect, useState } from 'react';
import CalendarMonthLooseStatus from '~frontend/components/Calendar/Month/Loose/Status';
import { useAppContext } from '~frontend/context';

type Props = {
  className?: string;
};

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

export function CalendarHorizontal({ className = '' }: Props) {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [serviceData, setServiceData] = useState({});

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const isThisMonth = selectedDate.getMonth() === thisMonth;
    setServiceData(isThisMonth ? getMockData(thisMonth + 1) : {});
  }, [selectedDate, setSelectedDate]);

  return (
    <section className={`w-160 bg-zinc-50 ${className}`}>
      <CalendarMonthLooseStatus
        data={serviceData}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
    </section>
  );
}

export default CalendarHorizontal;
