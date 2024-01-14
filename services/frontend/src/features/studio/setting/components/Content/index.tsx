import { Fragment, useMemo, useState } from 'react';
import Avatar from '~frontend/components/Avatar';
import sharedI from '~frontend/shared/i.json';
import Separator from '~frontend/components/Separator';
import { getPeriodTimes } from '~frontend/utils/time';
import { useStudioSettingContext } from '~frontend/features/studio/setting/context';
import Icon from '~frontend/components/Icon';
import IconLoading from '~frontend/components/IconLoading';
import TextButton from '~frontend/components/TextButton';
import useSetting from '~frontend/features/studio/hooks/use-setting';
import scopedI from './i.json';

const CONTAINER_CLASS = 'flex flex-col gap-4';

function Item({ title, content }: { title: string; content: string }) {
  return (
    <div className="flex flex-col">
      {title}
      <span className="whitespace-pre text-sm">{content}</span>
    </div>
  );
}

export default function Content() {
  const { view, toggleView } = useStudioSettingContext();
  const { loading, setting } = useSetting();
  const [selectedSupplierIndex, setSelectedSupplierIndex] =
    useState<number>(-1);

  const [startAt, endAt] = useMemo(
    () => (setting ? getPeriodTimes(setting.openAt, setting.openDuration) : []),
    [setting]
  );

  const onSupplierClick = (index: number) => () => {
    setSelectedSupplierIndex(index);
    toggleView();
  };

  const onClick = () => {
    // TODO: navigate the link
  };

  return (
    <section className="h-[calc(100dvh-112px)] flex-1 overflow-y-scroll bg-white px-4 py-6 font-normal md:h-[calc(100dvh-108px)] md:px-10">
      <div className="max-w-md">
        {loading ? (
          <IconLoading />
        ) : setting ? (
          view === 'studio' ? (
            <Fragment>
              <div className={CONTAINER_CLASS}>
                <header>
                  <h3 className="text-base">{scopedI.info.title}</h3>
                  <Separator size="sm" />
                </header>
                <Avatar
                  size="lg"
                  className="flex-shrink-0 flex-grow-0"
                  src={setting.avatarUrl}
                />
                <Item title={scopedI.info.name} content={setting.name} />
                <Item
                  title={sharedI.info.field.email}
                  content={setting.email}
                />
                <Item title={scopedI.info.SNS} content={setting.SNSId} />
                <Item title={scopedI.info.no} content={String(setting.id)} />
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
                  {setting.suppliers.map((supplier, index) => (
                    <button
                      className="flex items-center gap-2 border-1 border-zinc-200 rounded-4 border-solid pa-2 text-base font-bold color-zinc-700"
                      onClick={onSupplierClick(index)}
                      key={supplier.id}
                    >
                      <Avatar src={supplier.avatarUrl} />
                      {supplier.name}
                      <Icon
                        icon="i-solar-alt-arrow-right-linear"
                        size="xl"
                        className="ml-auto"
                      />
                    </button>
                  ))}
                </div>
                <Item
                  title={sharedI.location}
                  content={`${setting.location.name}\n${setting.location.address}`}
                />
              </div>
            </Fragment>
          ) : (
            <div className={CONTAINER_CLASS}>
              <Avatar
                size="lg"
                className="flex-shrink-0 flex-grow-0"
                src={setting.suppliers[selectedSupplierIndex].avatarUrl}
              />
              <Item title={scopedI.info.no} content={String(setting.id)} />
              <Item
                title={scopedI.supplier.name}
                content={setting.suppliers[selectedSupplierIndex].name}
              />
            </div>
          )
        ) : (
          <span>oops!</span>
        )}
        <Separator />
        <h3 className="text-base font-normal">{scopedI.update.title}</h3>
        <p className="text-sm">{scopedI.update.content}</p>
        <TextButton className="text-base" onClick={onClick}>
          {scopedI.update.button}
        </TextButton>
      </div>
    </section>
  );
}
