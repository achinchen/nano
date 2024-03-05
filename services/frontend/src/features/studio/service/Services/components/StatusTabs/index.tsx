import type { ServiceStatus } from '~frontend/types';
import type { Value } from '~frontend/components/Tabs/types';
import { Tabs, Tab } from '~frontend/components/Tabs';
import { STATUS_ITEMS } from './constants';

type Props = {
  status: ServiceStatus;
  setStatus: (Status: ServiceStatus) => void;
};

export default function StatusTabs({ status, setStatus }: Props) {
  const onChange = (value?: Value) => setStatus(value as ServiceStatus);

  return (
    <Tabs defaultValue={status} onChange={onChange}>
      {STATUS_ITEMS.map(({ value, icon, label }) => (
        <Tab key={value} value={value} icon={icon} label={label} />
      ))}
    </Tabs>
  );
}
