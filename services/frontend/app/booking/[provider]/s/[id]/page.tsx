'use client';

import type { ServiceDetailProps } from '~frontend/features/booking/ServiceDetail/type';
import ServiceDetail from '~frontend/features/booking/ServiceDetail';

export const SERVICE = {
  id: 10,
  attendee: 3,
  duration: 240,
  name: '小飛象造型戚風蛋糕',
  description: `戚風蛋糕是一種蓬鬆、輕盈且口感柔軟的蛋糕，非常受歡迎。如果你想學習手作戚風蛋糕，有很多教程和課程可以幫助你。
  戚風蛋糕是一種蓬鬆、輕盈且口感柔軟的蛋糕，非常受歡迎。如果你想學習手作戚風蛋糕，有很多教程和課程可以幫助你。戚風蛋糕是一種蓬鬆、輕盈且口感柔軟的蛋糕，非常受歡迎。如果你想學習手作戚風蛋糕，有很多教程和課程可以幫助你。
  戚風蛋糕是一種蓬鬆、輕盈且口感柔軟的蛋糕，非常受歡迎。如果你想學習手作戚風蛋糕，有很多教程和課程可以幫助你。戚風蛋糕是一種蓬鬆、輕盈且口感柔軟的蛋糕，非常受歡迎。如果你想學習手作戚風蛋糕，有很多教程和課程可以幫助你。
  戚風蛋糕是一種蓬鬆、輕盈且口感柔軟的蛋糕，非常受歡迎。如果你想學習手作戚風蛋糕，有很多教程和課程可以幫助你。`,
  time: '下午 2:00 - 下午 6:00',
  allday: false,
  location: {
    name: '台中',
    address: '407台中市西屯區臺灣大道三段251號',
  },
  supplier: '泡泡',
  status: 'has-order',
  selectedDate: new Date(),
} as ServiceDetailProps;

export default async function Index() {
  return (
    <main className="ma-4 mt-1">
      <ServiceDetail {...SERVICE} />
    </main>
  );
}
