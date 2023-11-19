import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioGroup from '.';

const mockOptions = [
  { value: '1', title: 'title-1' },
  { value: '2', title: 'title-2', subtitle: 'subtitle' },
  { value: '3', title: 'title-3', disabled: true },
];

const defaultValue = mockOptions[0].value;

const onChange = jest.fn();
const setup = () =>
  render(
    <RadioGroup
      options={mockOptions}
      onChange={onChange}
      value={defaultValue}
    />
  );

describe('rendering', () => {
  describe('renders radio options', () => {
    it('renders radio group', () => {
      setup();
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });
    it('renders radio button', () => {
      setup();
      expect(screen.getAllByRole('radio')).toHaveLength(mockOptions.length);
    });
    it('renders one checked radio button', () => {
      setup();
      expect(screen.getByRole('radio', { checked: true })).toBeInTheDocument();
    });
    it('renders option title', () => {
      setup();
      expect(screen.getByText(mockOptions[0].title)).toBeInTheDocument();
    });
    it('renders option subtitle', () => {
      setup();
      expect(
        screen.getByText(mockOptions[1].subtitle as string)
      ).toBeInTheDocument();
    });
  });
});

describe('interaction', () => {
  beforeEach(() => {
    onChange.mockClear();
  });

  describe('unchecked option clicked', () => {
    const targetOption = mockOptions[1];
    const clickOption = () => {
      const option = screen.getByText(targetOption.title);
      userEvent.click(option);
    };

    it('calls onChange', async () => {
      setup();
      clickOption();
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(targetOption.value);
      });
    });

    it('shows one checked radio button', () => {
      setup();
      clickOption();
      expect(screen.getByRole('radio', { checked: true })).toBeInTheDocument();
    });
  });

  describe('disabled option clicked', () => {
    it('does not call onChange', async () => {
      setup();
      const disabledOption = screen.getByText(mockOptions[2].title);
      userEvent.click(disabledOption);

      await waitFor(() => {
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });
});
