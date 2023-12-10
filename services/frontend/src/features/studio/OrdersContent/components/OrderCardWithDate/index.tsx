import { Fragment } from 'react';
import OrderCards from '~frontend/features/studio/OrderCards';
import {
  isToday,
  isTomorrow,
  formateDate,
  getAfter,
} from '~frontend/utils/date';
import i from '~frontend/shared/i.json';

const generateDate = (date: Date) => {
  if (isToday(date)) return i.today;
  if (isTomorrow(date)) return i.tomorrow;
  return formateDate(date.toISOString());
};

function CardsWithDate({ date }: { date: Date }) {
  return (
    <Fragment>
      <h4 className="my-4 text-xl font-bold first:mt-0">
        {generateDate(date)}
      </h4>
      <OrderCards />
    </Fragment>
  );
}

export default function OrderCardsWithDate() {
  return (
    <section>
      <CardsWithDate date={new Date()} />
      <CardsWithDate date={getAfter(new Date(), 1, 'day')} />
      <CardsWithDate date={new Date('2024/1/1')} />
    </section>
  );
}
