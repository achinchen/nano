import type { Value, ContextState } from '~frontend/components/Tabs/types';
import { Children } from 'react';
import { TabsContextProvider } from '~frontend/components/Tabs/context';

type TabsProps = {
  defaultValue: Value;
  onChange: ContextState['onChange'];
  children?: React.ReactNode;
};

function Tabs({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-row gap-1 border-1 border-zinc-200 rounded-3 border-solid bg-white pa-1">
      {children}
    </div>
  );
}

export default function TabsWithProvider({
  children,
  defaultValue,
  onChange,
}: TabsProps) {
  return (
    <TabsContextProvider defaultValue={defaultValue} onChange={onChange}>
      <Tabs>{Children.map(children, (child) => child)}</Tabs>
    </TabsContextProvider>
  );
}
