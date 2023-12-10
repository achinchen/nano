import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Separator from '~frontend/components/Separator';
import ServiceInfoBlocks from '~frontend/shared/components/InfoBlocks';
import ConsumerContactInfo from '~frontend/shared/components/ConsumerContactInfo';
import Avatar from '~frontend/components/Avatar';
import Avocado from '~frontend/assets/avatar.png';
import sharedI from '~frontend/shared/i.json';
import OrderNote from '~frontend/shared/components/OrderNote';
import ServiceDescriptionMore from '~frontend/shared/components/ServiceDescriptionMore';
import StatusBadge from './StatusBadge';
import TimeCard from './TimeCard';

const service = {
  duration: 90,
  name: '創業諮詢',
  description:
    '這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。',
  currentAttendee: 1,
  queue: false,
  serviceId: 7,
  startAt: '2023-12-19T08:30',
  endAt: '2024-01-31T10:00',
  attendee: 4,
  supplier: '阿狗狗',
  location: {
    name: '台中',
    address: '407台中市西屯區臺灣大道三段251號',
  },
};

const order = {
  queues: ['2023-12-19T08:30'],
  service: {
    id: 7,
    name: '創業諮詢',
  },
  name: '阿狗',
  SNSId: 'a.gogo.chen',
  email: 'example@example.com',
  phone: '0912345678',
  comment: '想詢問還需要準備什麼嗎？',
  note: {
    updateAt: '2023-08-31T08:00:00.000Z',
    content:
      '阿狗的備註好多蚊子，阿狗的備註好多蚊子，阿狗的備註好多蚊子，阿狗的備註好多蚊子，阿狗的備註好多蚊子，阿狗的備註好多蚊子。',
  },
};

const { name, description, duration, attendee, supplier, location } = service;

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const queues =
    id !== '21'
      ? order.queues
      : ['2023-12-19T08:30', '2023-12-19T15:30', '2024-01-24T10:30'];

  const status = id !== '21' ? 'end' : id === '12' ? 'coming' : 'request';

  return (
    <Fragment>
      <StatusBadge status={status} />
      <section>
        <h2 className="my-2 text-xl">{name}</h2>
        <TimeCard queues={queues} duration={duration} />
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
          <Avatar size="lg" src={Avocado} />
          {order.name}
        </header>
        <ConsumerContactInfo />
        <Separator />
        <OrderNote note={order.note} />
      </section>
    </Fragment>
  );
}
