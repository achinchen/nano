import { AVATARS } from './constants';

export default function getAvatarById(id: number) {
  const index = id % AVATARS.length;
  return AVATARS[index];
}
