import { CalendarMonthLoose } from '~frontend/components/Calendar/Month';
import { useBookingContext } from '~frontend/features/booking/context';

type Props = {
  className?: string;
  maxHeight?: boolean;
};

export function CalendarHorizontal({ className = '', maxHeight }: Props) {
  const { selectedDate, setSelectedDate } = useBookingContext();

  return (
    <section className={`w-160 bg-zinc-50 ${className}`}>
      <CalendarMonthLoose
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
        maxHeight={maxHeight}
      />
    </section>
  );
}

export default CalendarHorizontal;
