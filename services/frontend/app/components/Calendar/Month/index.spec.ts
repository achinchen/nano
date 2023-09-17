import { CalendarMonthLoose, CalendarMonthTight } from '.';

describe('CalendarMonth entry', () => {
  it('has Loose', () => {
    expect(CalendarMonthLoose).toBeDefined();
  });

  it('has Tight', () => {
    expect(CalendarMonthTight).toBeDefined();
  });
});
