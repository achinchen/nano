import { AVATARS } from './constants';
import getAvatarById from './index';

jest.mock('./constants', () => ({
  AVATARS: ['AvocadoOne', 'AvocadoTwo', 'AvocadoThree'],
}));

describe('getAvatarById', () => {
  test.each([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 0],
  ])('returns correct avatar for id %s', (id, expectedIndex) => {
    expect(getAvatarById(id)).toBe(AVATARS[expectedIndex]);
  });
});
