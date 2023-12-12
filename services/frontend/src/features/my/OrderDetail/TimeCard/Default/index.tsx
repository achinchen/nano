import type { Props } from '~frontend/features/my/OrderDetail/TimeCard/types';
import EmphasizeBlock from '~frontend/shared/components/EmphasizeBlock';
import { formateDateWithDay } from '~frontend/utils/date';
import { getPeriodTimes } from '~frontend/utils/time';
import i from '~frontend/shared/i.json';

export default function Default({ queues, duration }: Props) {
  const [startAt, endAt] = getPeriodTimes(queues[0], duration);

  return (
    <div className="mt-2 text-sm">
      <EmphasizeBlock>{formateDateWithDay(queues[0])}</EmphasizeBlock>
      <div className="mt-2 flex items-center gap-2">
        <EmphasizeBlock>{startAt}</EmphasizeBlock>
        {i.to}
        <EmphasizeBlock>{endAt}</EmphasizeBlock>
      </div>
    </div>
  );
}
