import { Fragment, useState } from 'react';
import sharedI from '~frontend/shared/i.json';
import Icon from '~frontend/components/Icon';
import IconButton from '~frontend/components/IconButton';
import Separator from '~frontend/components/Separator';
import i from './i.json';

function Field({ children }: React.PropsWithChildren) {
  return (
    <span className="ml-2 flex gap-2 py-2 text-sm">
      {i.required}
      <span className="font-normal">{children}</span>
    </span>
  );
}

export default function OrderFields({ queue }: { queue: boolean }) {
  const [open, setOpen] = useState(true);
  const onToggle = () => setOpen((open) => !open);

  return (
    <Fragment>
      <h3 className="mt-10 flex items-center justify-between border-y-px border-zinc-200 border-y-solid py-2 text-lg">
        {i.title}
        <IconButton
          icon={
            open
              ? 'i-solar-alt-arrow-down-linear'
              : 'i-solar-alt-arrow-up-linear'
          }
          size="sm"
          color="dark"
          variant="text"
          className="transition-200"
          onClick={onToggle}
        />
      </h3>
      <section className={`${open ? '' : 'hidden'} transition-200 my-4`}>
        {queue && (
          <div className="flex items-start gap-2">
            <Icon
              icon="i-solar-check-circle-bold"
              size="base"
              className="mx-2 mt-0.5 flex-shrink-0"
            />
            <span className="flex flex-col text-sm">
              {i.queue.title}
              <span className="font-normal">{i.queue.description}</span>
            </span>
          </div>
        )}
        <div>
          <h4 className="h-9 flex items-center text-base">
            {sharedI.info.title}
          </h4>
          <Field>{sharedI.info.field.name}</Field>
          <Field>{sharedI.info.field.email}</Field>
          <Field>{sharedI.info.field.SNSId}</Field>
          <Field>{sharedI.info.field.phone}</Field>
        </div>
      </section>
    </Fragment>
  );
}
