import { getDateInfo } from '.';

describe('getDateInfo', () => {
  it('returns an object with the month, day, and weekday of a given date', () => {
    const date = new Date('2022-02-01');
    const expected = {
      month: 2,
      day: 1,
      weekday: 2,
    };

    expect(getDateInfo(date)).toEqual(expected);
  });
});
