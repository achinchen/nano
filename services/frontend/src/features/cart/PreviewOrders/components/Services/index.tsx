import type { ServiceOrder } from '~frontend/features/cart/types';
import { usePreviewOrdersContext } from '~frontend/features/cart/PreviewOrders/context';
import Separator from '~frontend/components/Separator';
import { TAG_CONFIG } from '~frontend/components/Tag/constants';
import { getMMDD } from '~frontend/utils/date';
import { getPeriodTime } from '~frontend/utils/time';
import sharedI from '~frontend/shared/i.json';
import { SECTION_CLASSNAMES } from '~frontend/features/cart/PreviewOrders/constants';
import Field from '~frontend/features/cart/PreviewOrders/components/Field';
import scopedI from './i.json';

const StringSeparator = <span className="mx-2 inline-block">|</span>;

function ServiceCard({
  name,
  address,
  supplier,
  duration,
  times,
  attendee,
  queue,
}: ServiceOrder) {
  const showOrder = queue && times.length > 1;
  return (
    <li className={SECTION_CLASSNAMES}>
      <h4 className="line-clamp-2 text-lg">{name}</h4>
      <div className="text-sm font-normal">
        {address}
        {StringSeparator} {supplier}
        {StringSeparator}
        {duration}{' '}
      </div>
      <Separator />
      <ul className="flex flex-col gap-1 text-sm">
        <li className={showOrder ? 'block' : 'flex'}>
          <Field icon="i-solar-calendar-linear">{sharedI.times}</Field>
          {times.map((time, index) => (
            <div key={time} className="my-1">
              {showOrder && (
                <span
                  className={`${TAG_CONFIG.sm} ml-8 bg-white text-primary-500 border-solid border-1 border-primary-500 mr-2`}
                >
                  {sharedI.queue.order} {index + 1}
                </span>
              )}
              <span className="text-sm">
                <span>{getMMDD(new Date(time))}・</span>
                <span className="color-zinc-500">
                  {getPeriodTime(time, duration)}
                </span>
              </span>
            </div>
          ))}
        </li>
        <li className="flex">
          <Field icon="i-solar-user-linear">{scopedI.attendee.label}</Field>
          {attendee} {scopedI.attendee.unit}
        </li>
      </ul>
    </li>
  );
}

export function Services() {
  const { services } = usePreviewOrdersContext();

  return (
    <section className="mb-4">
      <h3 className="mb-4">{scopedI.title}</h3>
      <ul className="flex flex-col gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </ul>
    </section>
  );
}

export default Services;
