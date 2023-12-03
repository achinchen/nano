import { Fragment } from 'react';
import sharedI from '~frontend/shared/i.json';
import Avatar from '~frontend/components/Avatar';
import Avacado from '~frontend/assets/avatar.png';
import { formateDateTime } from '~frontend/utils/date';
import Icon from '~frontend/components/Icon';
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

function Item({
  icon,
  title,
  children,
}: React.PropsWithChildren<{ icon: string; title: string }>) {
  return (
    <div className="flex gap-2 text-sm">
      <Icon icon={icon} className="color-primary-500" size="2xl" />
      <span className="flex flex-1 flex-col text-sm">
        {title}
        <span className="flex justify-between text-base font-normal color-zinc-600">
          {children}
        </span>
      </span>
    </div>
  );
}

const getInstagramBioUrl = (id: string) => `https://www.instagram.com/${id}`;

const { name, comment, SNSId, email, phone, note } = order;

export default function Info() {
  const onNoteEdit = () => console.log('edit note');
  return (
    <Fragment>
      <header className="flex items-center gap-2 text-xl">
        <Avatar size="lg" src={Avacado} />
        {name}
      </header>
      <Separator />
      <section className="flex flex-col gap-2">
        <Item icon="i-custom-sns-instagram" title={i.SNS}>
          <Fragment>
            {SNSId}
            <a
              className="text-sm font-medium color-primary-500"
              href={getInstagramBioUrl(SNSId)}
            >
              {i.to}
            </a>
          </Fragment>
        </Item>
        <Item icon="i-solar-letter-linear" title={sharedI.info.field.email}>
          {email}
        </Item>
        <Item
          icon="i-solar-phone-calling-outline"
          title={sharedI.info.field.phone}
        >
          {phone}
        </Item>
        <Item icon="i-solar-chat-line-linear" title={i.comment}>
          {comment}
        </Item>
      </section>
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
