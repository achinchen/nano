import type { Content } from '~frontend/features/studio/ServicesContent/types';
import type { Value } from '~frontend/components/Tabs/types';
import { Tabs, Tab } from '~frontend/components/Tabs';
import { CONTENT_ITEMS } from './constants';

type Props = {
  currentContent: Content;
  setCurrentContent: (content: Content) => void;
};

export default function ContentTabs({
  currentContent,
  setCurrentContent,
}: Props) {
  const onChange = (value?: Value) => setCurrentContent(value as Content);

  return (
    <Tabs defaultValue={currentContent} onChange={onChange}>
      {CONTENT_ITEMS.map(({ value, icon, label }) => (
        <Tab key={value} value={value} icon={icon} label={label} />
      ))}
    </Tabs>
  );
}
