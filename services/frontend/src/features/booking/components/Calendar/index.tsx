import { useEffect, useState } from 'react';
import CalendarMonthLooseStatus from '~frontend/components/Calendar/Month/Loose/Status';
import { useAppContext } from '~frontend/context';
import { SERVICE, TAKE_LEAVES } from '~frontend/shared/mock';
import { getStatusByAttendee } from '~frontend/shared/utils/get-status-by-attendee';
import { isSameDay } from '~frontend/utils/date';

type Props = {
  className?: string;
};

const getIsDayOff = (selectedDate: Date) =>
  isSameDay(new Date(TAKE_LEAVES[0].startAt), selectedDate);

const getMockServiceData = (selectedDate: Date) => {
  const selectedMonth = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const month = selectedMonth + 1;
  const getDays = new Date(year, selectedMonth, 0).getDate();
  const mockServices = year === 2023 ? SERVICE.END : SERVICE.IN_PROGRESS;

  const status = mockServices
    .map(({ currentAttendee, attendee }) =>
      getStatusByAttendee(attendee, currentAttendee)
    )
    .reduce((current, status) => {
      if (current === 'unsold') return current;
      if (status === 'unsold') return status;
      if (current === 'has-order') return current;
      return current === 'full' ? current : status;
    }, '');

  return new Array(getDays).fill(0).reduce(
    (data, _, index) => ({
      ...data,
      [`${month}-${index + 1}`]: getIsDayOff(
        new Date(`${year}-${month}-${index + 1}`)
      )
        ? ''
        : status,
    }),
    {}
  );
};

export function CalendarHorizontal({ className = '' }: Props) {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [serviceData, setServiceData] = useState({});

  useEffect(() => {
    setServiceData(getMockServiceData(selectedDate));
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
