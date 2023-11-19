import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '.';

const props = {
  title: 'Checkbox',
  subtitle: 'Subtitle',
  value: 'checkbox',
};

const onChange = jest.fn();
const setup = ({ disabled = false } = {}) =>
  render(
    <Checkbox
      {...props}
      checked={false}
      disabled={disabled}
      onChange={onChange}
    />
  );
const clickCheckbox = () => {
  const checkbox = screen.getByRole('checkbox');
  userEvent.click(checkbox);
};

describe('rendering', () => {
  it('renders checkbox', () => {
    setup();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  it('renders title', () => {
    setup();
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });
  it('renders subtitle', () => {
    setup();
    expect(screen.getByText(props.subtitle)).toBeInTheDocument();
  });
});
describe('interaction', () => {
  beforeEach(() => {
    onChange.mockClear();
  });
  describe('when unchecked checkbox is clicked', () => {
    it('should calls onChange', async () => {
      setup();
      clickCheckbox();
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(props.value, true);
      });
    });
  });

  describe('when disabled checkbox is clicked', () => {
    it('should not call onChange', async () => {
      setup({ disabled: true });
      clickCheckbox();
      await waitFor(() => {
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });
});
