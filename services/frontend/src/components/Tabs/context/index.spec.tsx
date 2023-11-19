import { screen, render } from '@testing-library/react';
import { TabsContextProvider } from './index';

describe('TabsContextProvider', () => {
  it('renders without crashing', () => {
    const MOCK = 'test';
    render(
      <TabsContextProvider
        defaultValue={null}
        onChange={() => {
          /* */
        }}
      >
        <div>{MOCK}</div>
      </TabsContextProvider>
    );

    expect(screen.getByText(MOCK)).toBeInTheDocument();
  });
});
