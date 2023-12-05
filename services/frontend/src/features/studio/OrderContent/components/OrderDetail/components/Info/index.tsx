import { Fragment } from 'react';
import ConsumerContactInfo from '~frontend/features/studio/components/ConsumerContactInfo';
import Avatar from '~frontend/components/Avatar';
import Avocado from '~frontend/assets/avatar.png';
import { formateDateTime } from '~frontend/utils/date';
import Separator from '~frontend/components/Separator';
import IconButton from '~frontend/components/IconButton';
import i from './i.json';

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

export default function Info({ children }: React.PropsWithChildren) {
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
      <article className="mt-3">
        <h3 className="flex items-center justify-between text-base font-bold">
          {i.note}
          <IconButton
            size="sm"
            variant="outline"
            color="primary"
            icon="i-solar-pen-2-bold"
            onClick={onNoteEdit}
          />
        </h3>
        <time className="text-xs font-normal color-zinc-600">
          {i.updated}
          {formateDateTime(new Date(note.updateAt))}
        </time>
        <p className="mb-10 mt-1 text-sm font-normal color-zinc-600">
          {note.content}
        </p>
      </article>
    </Fragment>
  );
}
