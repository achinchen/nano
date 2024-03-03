import { Link } from 'react-router-dom';
import { useState } from 'react';
import sharedI from '~frontend/shared/i.json';
import Icon from '~frontend/components/Icon';
import Avatar from '~frontend/components/Avatar';
import { getRelativeTime } from '~frontend/utils/time';
import { ORDER } from '~frontend/shared/mock';
import getAvatarById from '~frontend/shared/utils/get-avatar-by-id';

export default function OrderRequestCards() {
  const [orders] = useState(ORDER.REQUESTED);

  return (
    <section className="ma-4 flex flex-col gap-2">
      {orders.map(({ id, userId, name, updateAt, service }, index) => (
        <Link
          to={`/studio/orders/requested/${id}`}
          className="flex flex-col overflow-hidden border-1 border-zinc-200 rounded-2 border-solid bg-light-100 pa-2 active:bg-zinc-100 hover:bg-zinc-50"
          key={`order-cards-${id}-${name}`}
        >
          <header className="relative flex items-center gap-2">
            <Avatar
              size="base"
              src={getAvatarById(userId)}
              className="flex-shrink-0"
            />
            <span className="line-clamp-3">{name}</span>
            <time className="ml-auto mt-2 flex-shrink-0 self-start text-xs font-normal color-zinc-500">
              {getRelativeTime(updateAt)}
            </time>
            {index !== 0 && (
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
