import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsContextProvider } from '~frontend/components/Tabs/context';
import { CONTAINER } from './constants';
import { Tab } from '.';

const MOCK_LABEL = 'Test';
const MOCK_OTHER = 'Other';
const MOCK_VALUE = 'test';
const onChange = jest.fn();

const setup = (defaultValue: string | null = null) => {
  render(
    <TabsContextProvider defaultValue={defaultValue} onChange={onChange}>
      <>
        <Tab label={MOCK_LABEL} value={MOCK_VALUE} />
        <Tab label={MOCK_OTHER} value={MOCK_OTHER} />
      </>
    </TabsContextProvider>
  );
};

describe('Tab', () => {
  afterEach(() => {
    onChange.mockClear();
  });

  it('renders without crashing', () => {
    setup();
    expect(screen.getByText(MOCK_LABEL)).toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    setup();

    await userEvent.click(screen.getByText(MOCK_LABEL));
    expect(onChange).toHaveBeenCalledWith(MOCK_VALUE);
  });

  it('not calls onChange when clicked current', async () => {
    setup(MOCK_OTHER);

    await userEvent.click(screen.getByText(MOCK_OTHER));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies inactive style when current does not match value', () => {
    setup(MOCK_OTHER);
    const tab = screen.getByText(MOCK_LABEL);

    expect(tab).toHaveClass(CONTAINER.inactive);
    expect(tab).not.toHaveClass(CONTAINER.active);
  });
});
