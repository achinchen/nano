import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Separator from '~frontend/components/Separator';
import Avatar from '~frontend/components/Avatar';
import Icon from '~frontend/components/Icon';
import Avocado from '~frontend/assets/avatar.png';
import i from './i.json';

type Order = {
  name: string;
  id: string;
};

type Props = {
  orders: Order[];
  attendee: number;
  end: boolean;
};

const ITEM_CLASSNAME =
  'mb-2 flex items-center gap-2 border-1 border-zinc-200 rounded-4 border-solid pa-2 font-bold';

export default function OrderLinks({ orders, attendee, end }: Props) {
  const restCount = attendee - orders.length;

  return (
    <Fragment>
      <Separator />
      <section className="mb-6">
        <h4 className="h-9 flex items-center text-base">{i.title}</h4>
        {orders.map(({ name, id }) => (
          <Link to={`/studio/orders/${id}`} key={id} className={ITEM_CLASSNAME}>
            <Avatar src={Avocado} />
            {name}
            <span className="ml-auto text-sm color-primary-500">{i.to}</span>
          </Link>
        ))}
        {restCount > 0 &&
          Array(restCount)
            .fill(0)
            .map((_, index) => (
              <div
                className={`${ITEM_CLASSNAME} color-zinc-400`}
                key={`empty-${index + 1}`}
              >
                <Icon
                  icon="i-solar-user-circle-bold"
                  size="4xl"
                  className="color-blue"
                />
                {!end && i.rest}
              </div>
            ))}
      </section>
    </Fragment>
  );
}
