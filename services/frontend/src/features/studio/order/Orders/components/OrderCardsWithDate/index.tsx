import type { Order } from '~frontend/features/studio/types';
import { Fragment } from 'react';
import OrderCards from '~frontend/features/studio/components/OrderCards';
import {
  isToday,
  isTomorrow,
  isBefore,
  formateDate,
} from '~frontend/utils/date';
import i from '~frontend/shared/i.json';

type Props = {
  data: { [key: string]: Order[] };
};

const generateDate = (target: string) => {
  const date = new Date(target);
  if (isToday(date)) return i.today;
  if (isTomorrow(date)) return i.tomorrow;
  return formateDate(target);
};

export default function OrderCardsWithDate({ data }: Props) {
  return (
    <section>
      {Object.entries(data)
        .sort(([dateA], [dateB]) =>
          isBefore(new Date(dateB), new Date(dateA)) ? -1 : 1
        )
        .map(([date, orders]) => (
          <Fragment key={date}>
            <h4 className="my-4 text-xl font-bold first:mt-0">
              {generateDate(date)}
            </h4>
            <OrderCards orders={orders} />
          </Fragment>
        ))}
    </section>
  );
}
