import { Fragment } from 'react';
import ConsumerContactInfo from '~frontend/shared/components/ConsumerContactInfo';
import OrderNote from '~frontend/shared/components/OrderNote';
import Avatar from '~frontend/components/Avatar';
import Avocado from '~frontend/assets/avatar.png';
import Separator from '~frontend/components/Separator';

const order = {
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

const { name, note } = order;

export default function Info() {
  const onNoteEdit = () => console.log('edit note');
  return (
    <Fragment>
      <header className="flex items-center gap-2 text-xl">
        <Avatar size="lg" src={Avocado} />
        {name}
      </header>
      <Separator />
      <ConsumerContactInfo />
      <Separator />
      <OrderNote onEdit={onNoteEdit} note={note} />
    </Fragment>
  );
}
