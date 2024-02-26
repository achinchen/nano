import { useEffect, useState } from 'react';
import CalendarMonthLooseName from '~frontend/components/Calendar/Month/Loose/Name';
import { useAppContext } from '~frontend/context';
import { SERVICE } from '~frontend/shared/mock';

const services = SERVICE.IN_PROGRESS.map(({ name, serviceId }) => ({
  name,
  id: serviceId,
}));

const getMockServiceData = (month: number) => {
  const getDays = new Date(2024, month - 1, 0).getDate();

  return new Array(getDays).fill(0).reduce(
    (data, _, index) => ({
      ...data,
      [index + 1]: services,
    }),
    {}
  );
};

export default function CalendarMonthOrder() {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [serviceData, setServiceData] = useState({});

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    setServiceData(getMockServiceData(thisMonth + 1));
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
