import Icon from '~frontend/components/Icon';
import { useTabsContext } from '~frontend/components/Tabs/context';
import { CONTAINER } from './constants';

type TabProps = {
  value: string;
  label: string;
  icon?: string;
};

export default function Tab({ value, label, icon }: TabProps) {
  const { onChange, setCurrent, current } = useTabsContext();

  const isCurrent = current === value;
  const classNames = isCurrent ? CONTAINER.active : CONTAINER.inactive;

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isCurrent) return;
    setCurrent(value);
    onChange(value);
  };

  return (
    <button onClick={onClick} className={classNames}>
      {icon ? <Icon icon={icon} className="mr-2" /> : null}
      {label}
    </button>
  );
}
