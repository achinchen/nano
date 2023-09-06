import type { Value, ContextState } from '../types';
import { Children } from 'react';
import { TabsContextProvider } from '~frontend/components/Tabs/context';

type TabsProps = {
  defaultValue: Value;
  onChange: ContextState['onChange'];
  children?: React.ReactNode;
};

function Tabs({ children }: React.PropsWithChildren) {
  return <div className="flex flex-row gap-2">{children}</div>;
}

function TabsWithProvider({ children, defaultValue, onChange }: TabsProps) {
  return (
    <TabsContextProvider defaultValue={defaultValue} onChange={onChange}>
      <Tabs>{Children.map(children, (child) => child)}</Tabs>
    </TabsContextProvider>
  );
}

export { TabsWithProvider as Tabs };
