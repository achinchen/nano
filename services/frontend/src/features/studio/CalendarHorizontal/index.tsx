import { useEffect, useState } from 'react';
import CalendarMonthLoose from '~frontend/components/Calendar/Month/Loose';
import { useStudioContext } from '~frontend/features/studio/context';

type Props = {
  className?: string;
};

const mockServiceData = {
  17: [{ name: '提拉米蘇蛋糕課', id: 1 }],
  20: [
    {
      name: '提拉米蘇蛋糕課',
      id: 1,
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
  return Object.entries(mockServiceData).reduce((data, [date, value]) => {
    return {
      ...data,
      [`${month}-${date}`]: value,
    };
  }, {});
};

export function CalendarHorizontal({ className = '' }: Props) {
  const { selectedDate, setSelectedDate } = useStudioContext();
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
        type="content"
      />
    </section>
  );
}

export default CalendarHorizontal;
