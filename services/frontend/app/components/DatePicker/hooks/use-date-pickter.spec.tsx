import { renderHook, act } from '@testing-library/react';
import { useDatePicker } from './use-date-picker';
import { DAY_STYLE } from './constants';

describe('useDatePicker', () => {
  jest.useFakeTimers().setSystemTime(new Date('2020-02-22'));

  it('should return the correct values', () => {
    const onSelect = jest.fn();
    const selectedDate = new Date('2022-02-14');

    const { result } = renderHook(() =>
      useDatePicker({ onSelect, selectedDate })
    );

    const selected = {
      month: 3,
      day: 1,
    };

    act(() => {
      result.current.onDateSelect(selected.month, selected.day);
    });

    expect(onSelect).toHaveBeenCalledWith(
      new Date(`2022-${selected.month}-${selected.day}`)
    );
  });

  const onSelect = jest.fn();
  const selectedDate = new Date('2022-02-14');

  test.each([
    [{ month: 2, day: 14, weekday: 1 }, DAY_STYLE.SELECTED],
    [{ month: 2, day: 1, weekday: 2 }, DAY_STYLE.DEFAULT],
    [{ month: 3, day: 1, weekday: 2 }, DAY_STYLE.OUT_OF_MONTH],
    [{ month: 2, day: 26, weekday: 6 }, DAY_STYLE.WEEKEND],
    [{ month: 2, day: 22, weekday: 2 }, DAY_STYLE.TODAY],
  ])(
    'should return the correct color for a given (%p) day',
    (day, expectedColor) => {
      const { result } = renderHook(() =>
        useDatePicker({ onSelect, selectedDate })
      );

      expect(result.current.getCurrentColor(day)).toBe(expectedColor);
    }
  );
});
