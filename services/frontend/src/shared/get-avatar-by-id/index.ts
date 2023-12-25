export const AVATARS = [
  'https://loremipsum.io/assets/images/lorem-ipsum-15th-century-typesetter.jpg',
  'https://loremipsum.io/assets/images/lorem-ipsum-star-wars.jpg',
  'https://loremipsum.io/assets/images/lorem-ipsum-generator-cicero-de-finibus-bonorum-et-malorum.png',
];

export default function getAvatarById(id: number) {
  const index = id % AVATARS.length;
  return AVATARS[index];
}
