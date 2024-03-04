import { Fragment, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Separator from '~frontend/components/Separator';
import ServiceInfoBlocks from '~frontend/shared/components/InfoBlocks';
import ConsumerContactInfo from '~frontend/shared/components/ConsumerContactInfo';
import Avatar from '~frontend/components/Avatar';
import sharedI from '~frontend/shared/i.json';
import OrderNote from '~frontend/shared/components/OrderNote';
import ServiceDescriptionMore from '~frontend/shared/components/ServiceDescriptionMore';
import { ORDERS } from '~frontend/features/my/order/mock';
import getAvatarById from '~frontend/shared/utils/get-avatar-by-id';
import StatusBadge from './StatusBadge';
import TimeCard from './TimeCard';
export { default as Footer } from './Footer';

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const order = useMemo(
    () => ORDERS.find(({ id: orderId }) => orderId === Number(id)),
    [id]
  );

  if (!order) return null;

  const { name, description, duration, attendee, supplier, location } =
    order.service;
  const { queues, status } = order;
  const contactInfo = {
    comment: order.comment,
    SNSId: order.SNSId,
    email: order.email,
    phone: order.phone,
  };

  return (
    <Fragment>
      <StatusBadge status={status} />
      <section>
        <h2 className="my-2 text-xl">{name}</h2>
        <TimeCard queues={queues} startAt={order.startAt} duration={duration} />
        <Separator />
        <ServiceInfoBlocks
          attendee={attendee}
          duration={duration}
          supplier={supplier}
          location={location}
        />
        <ServiceDescriptionMore
          className="mt-2"
          description={description}
          title={name}
        >
          {sharedI.detail}
        </ServiceDescriptionMore>
        <Separator />
        <h3 className="text-base">{sharedI.info.title}</h3>
        <header className="my-3 flex items-center gap-2 text-xl">
          <Avatar size="lg" src={getAvatarById(order.userId)} />
          {order.name}
        </header>
        <ConsumerContactInfo {...contactInfo} />
        <Separator />
        <OrderNote note={order.note} />
      </section>
    </Fragment>
  );
}
