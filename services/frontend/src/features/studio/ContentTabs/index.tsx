import type { Content } from '~frontend/features/studio/types';
import type { Value } from '~frontend/components/Tabs/types';
import { Tabs, Tab } from '~frontend/components/Tabs';
import { useStudioContext } from '~frontend/features/studio/context';
import { CONTENT_ITEMS } from './constants';

export default function ContentTabs() {
  const { currentContent, setCurrentContent } = useStudioContext();
  const onChange = (value?: Value) => setCurrentContent(value as Content);

  return (
    <Tabs defaultValue={currentContent} onChange={onChange}>
      {CONTENT_ITEMS.map(({ value, icon, label }) => (
        <Tab key={value} value={value} icon={icon} label={label} />
      ))}
    </Tabs>
  );
}
