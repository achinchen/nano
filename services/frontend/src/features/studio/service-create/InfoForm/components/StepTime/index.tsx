import { Fragment, useEffect } from 'react';
import Separator from '~frontend/components/Separator';
import InputTime from '~frontend/components/InputTime';
import InputDate from '~frontend/components/InputDate';
import sharedI from '~frontend/shared/i.json';
import scopedI from '~frontend/features/studio/service-create/InfoForm/i.json';
import { useServiceCreateInfoFormContext } from '~frontend/features/studio/service-create/InfoForm/context';
import Switch from '~frontend/components/Switch';
import { isBefore } from '~frontend/utils/date';
import { getPlainPeriodTimes } from '~frontend/utils/time';
import i from './i.json';
import Hint from './Hint';

const LABEL_CLASSNAME =
  'flex flex-row items-center justify-between gap-2 text-base font-normal';

export default function StepTime() {
  const { form, errors, dispatchError, dispatch } =
    useServiceCreateInfoFormContext();

  const timeInvalid = Boolean(errors.endTime);

  const onAlldayChange = () => {
    dispatch({ allday: !form.allday });
  };

  const checkDateValid = (startAt: string, endAt: string) => {
    dispatchError({
      endAt: isBefore(new Date(startAt), new Date(endAt)) ? i.endAt : '',
    });
  };

  const onStartAtChange = (value: string) => {
    dispatch({ startAt: value });
    checkDateValid(value, form.endAt);
  };

  const onEndAtChange = (value: string) => {
    dispatch({ endAt: value });
    checkDateValid(form.startAt, value);
  };

  const checkTimeValid = (startTime: string, endTime: string) => {
    dispatchError({
      endTime: startTime > endTime ? i.endAt : '',
    });
  };

  const onStartTimeChange = (value: string) => {
    dispatch({ startTime: value });
    checkTimeValid(value, form.endTime);
  };

  const onEndTimeChange = (value: string) => {
    dispatch({ endTime: value });
    checkTimeValid(form.startTime, value);
  };

  useEffect(() => {
    if (form.allday) return;
    if (form.startTime && form.endTime) return;

    const time = new Date();
    const hour = time.getHours();
    const minus = time.getMinutes();
    const shouldTick = minus > 30;
    time.setHours(shouldTick ? hour + 1 : hour, shouldTick ? 0 : 30, 0, 0);
    const [startTime, endTime] = getPlainPeriodTimes(time, 60);
    dispatch({ startTime, endTime });
  }, [dispatch, form.allday, form.startTime, form.endTime]);

  return (
    <Fragment>
      <div className={LABEL_CLASSNAME}>
        {scopedI.allday.label}
        <Switch checked={form.allday} onChange={onAlldayChange} />
      </div>
      <div className={LABEL_CLASSNAME}>
        {scopedI.startAt.label}
        <InputDate
          className="mt-6 flex-1"
          value={form.startAt}
          onValueChange={onStartAtChange}
        />
      </div>
      <div className={LABEL_CLASSNAME}>
        {scopedI.endAt.label}
        <InputDate
          className="mt-6 flex-1"
          value={form.endAt}
          onValueChange={onEndAtChange}
          errorMessage={errors.endAt}
        />
      </div>
      <div>
        <Separator />
        {form.allday ? null : (
          <div className="flex flex-col justify-between gap-2 text-base font-normal">
            {scopedI.time.label}
            <div className="relative flex items-center justify-between gap-4">
              <span className="absolute bottom-0 ml-2 text-xs font-normal color-red-500">
                {errors.endTime}
              </span>
              <InputTime
                className="flex-1"
                value={form.startTime}
                onValueChange={onStartTimeChange}
                invalid={timeInvalid}
              />
              <span className="mb-6">{sharedI.to}</span>
              <InputTime
                className="flex-1"
                value={form.endTime}
                onValueChange={onEndTimeChange}
                invalid={timeInvalid}
              />
            </div>
          </div>
        )}
        <Hint />
      </div>
    </Fragment>
  );
}
