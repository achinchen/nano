import type { Content } from '~frontend/features/studio/HomeContent/types';
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
    <header className="px-4 pb-2 pt-4">
      <Tabs defaultValue={currentContent} onChange={onChange}>
        {CONTENT_ITEMS.map(({ value, icon, label }) => (
          <Tab key={value} value={value} icon={icon} label={label} />
        ))}
      </Tabs>
    </header>
  );
}
