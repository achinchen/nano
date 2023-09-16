import { getWeekDays } from '.';

describe('getWeekDays', () => {
  it('returns an array of weekdays starting from the previous Sunday', () => {
    const date = new Date('2022-01-19T00:00:00.000Z');
    const weekdays = getWeekDays(date);
    expect(weekdays).toEqual([
      { month: 1, day: 16, weekday: 0 },
      { month: 1, day: 17, weekday: 1 },
      { month: 1, day: 18, weekday: 2 },
      { month: 1, day: 19, weekday: 3 },
      { month: 1, day: 20, weekday: 4 },
      { month: 1, day: 21, weekday: 5 },
      { month: 1, day: 22, weekday: 6 },
    ]);
  });
});
