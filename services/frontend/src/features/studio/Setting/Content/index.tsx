import { Fragment } from 'react';
import Avatar from '~frontend/components/Avatar';
import Avocado from '~frontend/assets/avatar.png';
import sharedI from '~frontend/shared/i.json';
import Separator from '~frontend/components/Separator';
import { getPeriodTimes } from '~frontend/utils/time';
import { useStudioSettingContext } from '~frontend/features/studio/Setting/context';
import Icon from '~frontend/components/Icon';
import TextButton from '~frontend/components/TextButton';
import scopedI from './i.json';

const info = {
  name: '酪梨小教室',
  email: 'example@example.com',
  no: '123456789',
  SNS: 'a.b.c',
  time: {
    start: '2021-01-01T10:00:00',
    duration: 600,
  },
  location: {
    address: '台北市大安區復興南路一段390號',
    name: '台北',
  },
  supplier: {
    name: '阿狗狗',
    avatar: Avocado,
    email: 'supplier@example.com',
    no: '12344',
  },
};

const CONTAINER_CLASS = 'flex flex-col gap-4';

function Item({ title, content }: { title: string; content: string }) {
  return (
    <div className="flex flex-col">
      {title}
      <span className="whitespace-pre color-zinc-600">{content}</span>
    </div>
  );
}

const [startAt, endAt] = getPeriodTimes(info.time.start, info.time.duration);

export default function Content() {
  const { view, toggleView } = useStudioSettingContext();
  const onClick = () => {
    // TODO: navigate the link
  };

  return (
    <section className="h-[calc(100dvh-112px)] flex-1 overflow-y-scroll bg-white px-4 py-6 font-normal md:h-[calc(100dvh-108px)] md:px-10">
      <div className="max-w-md">
        {view === 'studio' ? (
          <Fragment>
            <div className={CONTAINER_CLASS}>
              <header>
                <h3 className="text-base">{scopedI.info.title}</h3>
                <Separator size="sm" />
              </header>
              <Avatar
                size="lg"
                className="flex-shrink-0 flex-grow-0"
                src={Avocado}
              />
              <Item title={scopedI.info.name} content={info.name} />
              <Item title={sharedI.info.field.email} content={info.email} />
              <Item title={scopedI.info.SNS} content={info.SNS} />
              <Item title={scopedI.info.no} content={info.no} />
            </div>
            <div className={`${CONTAINER_CLASS} mt-8 mb-12`}>
              <header>
                <h3 className="text-base">{scopedI.service.title}</h3>
                <Separator size="sm" />
              </header>
              <Item
                title={scopedI.service.time}
                content={`${startAt} ${sharedI.to} ${endAt}`}
              />
              <div className="flex flex-col gap-2">
                {scopedI.service.supplier}
                <button
                  className="flex items-center gap-2 border-1 border-zinc-200 rounded-4 border-solid pa-2 text-base font-bold"
                  onClick={toggleView}
                >
                  <Avatar src={info.supplier.avatar} />
                  {info.supplier.name}
                  <Icon
                    icon="i-solar-alt-arrow-right-linear"
                    size="xl"
                    className="ml-auto"
                  />
                </button>
              </div>
              <Item
                title={sharedI.location}
                content={`${info.location.name}\n${info.location.address}`}
              />
            </div>
          </Fragment>
        ) : (
          <div className={CONTAINER_CLASS}>
            <Avatar
              size="lg"
              className="flex-shrink-0 flex-grow-0"
              src={info.supplier.avatar}
            />
            <Item title={scopedI.info.no} content={info.supplier.no} />
            <Item title={scopedI.supplier.name} content={info.supplier.name} />
            <Item
              title={sharedI.info.field.email}
              content={info.supplier.email}
            />
          </div>
        )}
        <Separator />
        <h3 className="text-base font-normal">{scopedI.update.title}</h3>
        <p className="text-sm">{scopedI.update.content}</p>
        <TextButton onClick={onClick}>{scopedI.update.button}</TextButton>
      </div>
    </section>
  );
}
