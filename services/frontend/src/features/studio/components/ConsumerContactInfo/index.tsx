import { Fragment } from 'react';
import sharedI from '~frontend/shared/i.json';
import Icon from '~frontend/components/Icon';
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

const { comment, SNSId, email, phone } = order;

export default function ConsumerContactInfo() {
  return (
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
  );
}
