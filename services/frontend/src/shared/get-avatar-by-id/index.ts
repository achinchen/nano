import AvocadoOne from '~frontend/assets/avatar/1.jpeg';
import AvocadoTwo from '~frontend/assets/avatar/2.jpeg';
import AvocadoThree from '~frontend/assets/avatar/3.jpeg';

export const AVATARS = [AvocadoOne, AvocadoTwo, AvocadoThree];

export default function getAvatarById(id: number) {
  const index = id % AVATARS.length;
  return AVATARS[index];
}
