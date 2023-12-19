import type { Status } from '~frontend/features/studio/order/Orders/types';
import type { Value } from '~frontend/components/Tabs/types';
import { Tabs, Tab } from '~frontend/components/Tabs';
import { STATUS_ITEMS } from './constants';

type Props = {
  status: Status;
  setStatus: (status: Status) => void;
};

export default function StatusTabs({ status, setStatus }: Props) {
  const onChange = (value?: Value) => setStatus(value as Status);

  return (
    <Tabs defaultValue={status} onChange={onChange}>
      {STATUS_ITEMS.map(({ value, icon, label }) => (
        <Tab key={value} value={value} icon={icon} label={label} />
      ))}
    </Tabs>
  );
}
