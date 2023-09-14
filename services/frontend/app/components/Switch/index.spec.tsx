import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '.';

const mock = {
  onChange: jest.fn(),
  checked: true,
};

describe('rendering', () => {
  render(<Switch checked={mock.checked} onChange={mock.onChange} />);

  test('render checkbox', () => {
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});

describe('interaction', () => {
  test('trigger onChange', async () => {
    render(<Switch checked={mock.checked} onChange={mock.onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(mock.onChange).toHaveBeenCalled();
  });
});
