import { useEffect, useState } from 'react';
import CalendarMonthLooseTag from '~frontend/components/Calendar/Month/Loose/Tag';
import { useAppContext } from '~frontend/context';
import { SERVICE } from '~frontend/shared/mock';

const getMockServiceData = (selectedDate: Date) => {
  const selectedMonth = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const getDays = new Date(year, selectedMonth, 0).getDate();
  const mockServices = year === 2023 ? SERVICE.END : SERVICE.IN_PROGRESS;

  const services = mockServices.map(({ name, serviceId }) => ({
    name,
    id: serviceId,
  }));

  return new Array(getDays).fill(0).reduce(
    (data, _, index) => ({
      ...data,
      [index + 1]: services,
    }),
    {}
  );
};

const getMockData = (selectedDate: Date) => {
  const month = selectedDate.getMonth() + 1;
  return Object.entries(getMockServiceData(selectedDate)).reduce(
    (data, [date, value]) => {
      return {
        ...data,
        [`${month}-${date}`]: value,
      };
    },
    {}
  );
};

export default function CalendarMonth() {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [serviceData, setServiceData] = useState({});

  useEffect(() => {
    setServiceData(getMockData(selectedDate));
  }, [selectedDate, setSelectedDate]);

  if (Object.values(serviceData).length === 0) return null;

  return (
    <section className="h-full w-160 bg-zinc-50">
      <CalendarMonthLooseTag
        data={serviceData}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
    </section>
  );
}
