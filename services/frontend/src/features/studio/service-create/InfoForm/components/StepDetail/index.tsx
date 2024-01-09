import { Fragment, useState, useEffect } from 'react';
import Separator from '~frontend/components/Separator';
import IconButton from '~frontend/components/IconButton';
import SelectTime from '~frontend/components/SelectTime';
import scopedI from '~frontend/features/studio/service-create/InfoForm/i.json';
import { useServiceCreateContext } from '~frontend/features/studio/service-create/context';
import { useServiceCreateInfoFormContext } from '~frontend/features/studio/service-create/InfoForm/context';
import sharedI from '~frontend/shared/i.json';
import i from './i.json';
import AttendeeHint from './AttendeeHint';
import DurationHint from './DurationHint';
import { MAX_ATTENDEES } from './constants';

export default function StepTime() {
  const { setting } = useServiceCreateContext();
  const { form, setEmpty, errors, dispatchError, dispatch } =
    useServiceCreateInfoFormContext();

  const [hour, setHour] = useState('00');
  const [minus, setMinus] = useState('30');

  const onDecrease = () => {
    dispatch({ attendee: form.attendee - 1 });
  };

  const onIncrease = () => {
    dispatch({ attendee: form.attendee + 1 });
  };

  useEffect(() => {
    const duration = Number(hour) * 60 + Number(minus);
    dispatch({ duration });

    const isEmpty = duration === 0;
    dispatchError({
      duration: isEmpty
        ? i.empty
        : duration > (setting?.openDuration as number)
        ? i.invalid
        : '',
    });
  }, [hour, minus, dispatch, setEmpty, dispatchError, setting?.openDuration]);

  return (
    <Fragment>
      <div className="flex flex-row items-center justify-between gap-2 text-base font-normal">
        {scopedI.attendee.label}
        <div className="flex items-center justify-between gap-4">
          <IconButton
            icon="i-custom-minus"
            variant="outline"
            rounded
            color="dark"
            size="sm"
            disabled={form.attendee === 1}
            onClick={onDecrease}
          />
          <span className="text-lg">{form.attendee}</span>
          <IconButton
            icon="i-custom-add"
            variant="outline"
            rounded
            color="dark"
            size="sm"
            disabled={form.attendee === MAX_ATTENDEES}
            onClick={onIncrease}
          />
        </div>
      </div>
      <div>
        <AttendeeHint />
        <Separator />
      </div>
      <div className="'text-base flex flex-row flex-col justify-between gap-2 font-normal">
        {scopedI.duration.label}
        <div className="relative flex items-center justify-between gap-4">
          <span className="absolute bottom-0 ml-2 text-xs font-normal color-red-500">
            {errors.duration}
          </span>
          <SelectTime
            className="flex-1"
            value={hour}
            unit="hour"
            onValueChange={setHour}
          />
          <span className="mb-6">{sharedI.unit.hour}</span>
          <SelectTime
            className="flex-1"
            value={minus}
            unit="minute"
            onValueChange={setMinus}
          />
          <span className="mb-6">{sharedI.unit.minute}</span>
        </div>
      </div>
      <DurationHint />
    </Fragment>
  );
}
