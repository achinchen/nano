import { getMonthDays, getWeekDays } from '.';

describe('getMonthDays', () => {
  it('returns an array of objects representing the days in a month', () => {
    const date = new Date('2022-02-01');

    const expected = [
      { month: 1, day: 30, weekday: 0 },
      { month: 1, day: 31, weekday: 1 },
      { month: 2, day: 1, weekday: 2 },
      { month: 2, day: 2, weekday: 3 },
      { month: 2, day: 3, weekday: 4 },
      { month: 2, day: 4, weekday: 5 },
      { month: 2, day: 5, weekday: 6 },
      { month: 2, day: 6, weekday: 0 },
      { month: 2, day: 7, weekday: 1 },
      { month: 2, day: 8, weekday: 2 },
      { month: 2, day: 9, weekday: 3 },
      { month: 2, day: 10, weekday: 4 },
      { month: 2, day: 11, weekday: 5 },
      { month: 2, day: 12, weekday: 6 },
      { month: 2, day: 13, weekday: 0 },
      { month: 2, day: 14, weekday: 1 },
      { month: 2, day: 15, weekday: 2 },
      { month: 2, day: 16, weekday: 3 },
      { month: 2, day: 17, weekday: 4 },
      { month: 2, day: 18, weekday: 5 },
      { month: 2, day: 19, weekday: 6 },
      { month: 2, day: 20, weekday: 0 },
      { month: 2, day: 21, weekday: 1 },
      { month: 2, day: 22, weekday: 2 },
      { month: 2, day: 23, weekday: 3 },
      { month: 2, day: 24, weekday: 4 },
      { month: 2, day: 25, weekday: 5 },
      { month: 2, day: 26, weekday: 6 },
      { month: 2, day: 27, weekday: 0 },
      { month: 2, day: 28, weekday: 1 },
      { month: 3, day: 1, weekday: 2 },
      { month: 3, day: 2, weekday: 3 },
      { month: 3, day: 3, weekday: 4 },
      { month: 3, day: 4, weekday: 5 },
      { month: 3, day: 5, weekday: 6 },
      { month: 3, day: 6, weekday: 0 },
      { month: 3, day: 7, weekday: 1 },
      { month: 3, day: 8, weekday: 2 },
      { month: 3, day: 9, weekday: 3 },
      { month: 3, day: 10, weekday: 4 },
      { month: 3, day: 11, weekday: 5 },
      { month: 3, day: 12, weekday: 6 },
    ];

    expect(getMonthDays(date)).toEqual(expected);
  });
});

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
