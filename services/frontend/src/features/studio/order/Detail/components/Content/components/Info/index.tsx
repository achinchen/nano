import type { OrderDetail } from '~frontend/features/studio/types';
import { Fragment } from 'react';
import ConsumerContactInfo from '~frontend/shared/components/ConsumerContactInfo';
import OrderNote from '~frontend/shared/components/OrderNote';
import Avatar from '~frontend/components/Avatar';
import getAvatarById from '~frontend/shared/utils/get-avatar-by-id';
import Separator from '~frontend/components/Separator';

type Props = Omit<OrderDetail, 'service'>;

export default function Info({
  name,
  userId,
  SNSId,
  email,
  phone,
  note,
  comment,
}: Props) {
  const onNoteEdit = () => console.log('edit note');
  return (
    <Fragment>
      <header className="flex items-center gap-2 text-xl">
        <Avatar size="lg" src={getAvatarById(userId)} />
        {name}
      </header>
      <Separator />
      <ConsumerContactInfo
        comment={comment}
        SNSId={SNSId}
        email={email}
        phone={phone}
      />
      <Separator />
      <OrderNote onEdit={onNoteEdit} note={note} />
    </Fragment>
  );
}
