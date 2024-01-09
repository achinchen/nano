import { Fragment } from 'react';
import Separator from '~frontend/components/Separator';
import scopedI from '~frontend/features/studio/service-create/InfoForm/i.json';
import { useServiceCreateInfoFormContext } from '~frontend/features/studio/service-create/InfoForm/context';
import Switch from '~frontend/components/Switch';
import Hint from './Hint';

const LABEL_CLASSNAME =
  'flex flex-row items-center justify-between gap-2 text-base font-normal';

export default function StepQueue() {
  const { form, dispatch } = useServiceCreateInfoFormContext();

  const onQueueChange = () => {
    dispatch({ queue: !form.queue });
  };

  return (
    <Fragment>
      <div className={LABEL_CLASSNAME}>
        {scopedI.queue.label}
        <Switch checked={form.queue} onChange={onQueueChange} />
      </div>
      <div>
        <Separator />
        <Hint />
      </div>
    </Fragment>
  );
}
