import { useEffect, useState } from 'react';
import CalendarMonthLooseName from '~frontend/components/Calendar/Month/Loose/Name';
import { useAppContext } from '~frontend/context';

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

export default function CalendarMonthOrder() {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [serviceData, setServiceData] = useState({});

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const isThisMonth = selectedDate.getMonth() === thisMonth;
    setServiceData(isThisMonth ? getMockData(thisMonth + 1) : {});
  }, [selectedDate, setSelectedDate]);

  return (
    <section className="h-full w-160 bg-zinc-50">
      <CalendarMonthLooseName
        data={serviceData}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
    </section>
  );
}
