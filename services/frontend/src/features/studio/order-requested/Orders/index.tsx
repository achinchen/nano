import { Link } from 'react-router-dom';
import { useState } from 'react';
import sharedI from '~frontend/shared/i.json';
import Icon from '~frontend/components/Icon';
import Avatar from '~frontend/components/Avatar';
import Avocado from '~frontend/assets/avatar.png';
import { getRelativeTime } from '~frontend/utils/time';

const ORDERS = [
  {
    service: {
      name: '創業諮詢',
      attendee: 4,
    },
    id: '5',
    name: '阿花',
    updatedAt: '2023-11-19T10:00',
  },
  {
    service: {
      name: '客製蛋糕',
      attendee: 2,
    },
    id: '10',
    name: '阿狗',
    updatedAt: '2023-10-19T13:00',
  },
  {
    service: {
      name: '小飛象戚風蛋糕',
      attendee: 2,
    },
    id: '12',
    name: '阿貓',
    updatedAt: '2023-12-01T15:00',
  },
];

export default function OrderRequestCards() {
  const [orders] = useState(ORDERS);

  return (
    <section className="ma-4 flex flex-col gap-2">
      {orders.map(({ id, name, updatedAt, service }, index) => (
        <Link
          to={`/studio/orders/requested/${id}`}
          className="flex flex-col overflow-hidden border-1 border-zinc-200 rounded-2 border-solid bg-light-100 pa-2 active:bg-zinc-100 hover:bg-zinc-50"
          key={`order-cards-${id}-${name}`}
        >
          <header className="relative flex items-center gap-2">
            <Avatar size="base" src={Avocado} className="flex-shrink-0" />
            <span className="line-clamp-3">{name}</span>
            <time className="ml-auto mt-2 flex-shrink-0 self-start text-xs font-normal color-zinc-500">
              {getRelativeTime(updatedAt)}
            </time>
            {index === 0 && (
              <span className="absolute right-0 top-0 h-1.5 w-1.5 translate-x-1/2 translate-y--1/2 rounded-50% bg-red-500" />
            )}
          </header>
          <footer className="my-2 flex items-center justify-between gap-1">
            <h5 className="line-clamp-2 text-sm font-normal">{service.name}</h5>
            <span className="flex flex-shrink-0 items-center self-baseline text-sm">
              <Icon
                size="2xl"
                icon="i-solar-chair-linear"
                className="mr-1 color-primary-500"
              />{' '}
              {service.attendee} {sharedI.unit.attendee}
            </span>
          </footer>
        </Link>
      ))}
    </section>
  );
}
