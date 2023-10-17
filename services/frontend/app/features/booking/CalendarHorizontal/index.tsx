import { useEffect, useState } from 'react';
import { CalendarMonthLoose } from '~frontend/components/Calendar/Month';
import { useBookingContext } from '~frontend/features/booking/context';

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
  const { selectedDate, setSelectedDate } = useBookingContext();
  const [serviceData, setServiceData] = useState({});

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const isThisMonth = selectedDate.getMonth() === thisMonth;
    setServiceData(isThisMonth ? getMockData(thisMonth + 1) : {});
  }, [selectedDate, setSelectedDate]);

  return (
    <section className={`w-160 bg-zinc-50 ${className}`}>
      <CalendarMonthLoose
        data={serviceData}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
        type="status"
      />
    </section>
  );
}

export default CalendarHorizontal;
