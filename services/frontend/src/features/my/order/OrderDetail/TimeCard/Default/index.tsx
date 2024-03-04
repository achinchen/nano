import type { Props } from '~frontend/features/my/order/OrderDetail/TimeCard/types';
import EmphasizeBlock from '~frontend/shared/components/EmphasizeBlock';
import { formateDateWithDay } from '~frontend/utils/date';
import { getPeriodTimes } from '~frontend/utils/time';
import i from '~frontend/shared/i.json';

export default function Default({ startAt, duration }: Props) {
  if (!startAt) return null;

  const [startTime, endTime] = getPeriodTimes(startAt, duration);
  return (
    <div className="mt-2 text-sm">
      <EmphasizeBlock>{formateDateWithDay(startAt)}</EmphasizeBlock>
      <div className="mt-2 flex items-center gap-2">
        <EmphasizeBlock>{startTime}</EmphasizeBlock>
        {i.to}
        <EmphasizeBlock>{endTime}</EmphasizeBlock>
      </div>
    </div>
  );
}
