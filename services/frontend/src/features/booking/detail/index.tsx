import type { ServiceDetailProps } from '~frontend/features/booking/detail/components/ServiceDetail/types';
import type { ServiceTimesProps } from '~frontend/features/booking/detail/components/ServiceTimes/types';
import { useParams } from 'react-router-dom';
import { Fragment, lazy } from 'react';
import Header from '~frontend/features/booking/components/Header';
import Footer from '~frontend/features/booking/detail/components/Footer';
import ServiceDetail from '~frontend/features/booking/detail/components/ServiceDetail';
import ServiceTimes from '~frontend/features/booking/detail/components/ServiceTimes';

const Calendar = lazy(
  () => import('~frontend/features/booking/components/Calendar')
);

const services = [
  {
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
  },
  {
    id: 12,
    attendee: 1,
    duration: 60,
    name: '創業諮詢',
    description: `創業諮詢是個好課程，歡迎大家來上課！創業諮詢是個好課程，歡迎大家來上課！創業諮詢是個好課程，歡迎大家來上課！`,
    allday: true,
    time: '下午 2:00 - 下午 6:00',
    location: {
      name: '台北',
      address: '200台北市中正區忠孝西路 1 號 1 樓',
    },
    supplier: '阿狗狗',
    status: 'full',
    selectedDate: new Date(),
  },
  {
    id: 13,
    attendee: 2,
    duration: 30,
    name: '美味寵物便當',
    allday: true,
    address: '台北',
    supplier: '阿狗狗',
    status: 'unsold',
    description: `狗狗吃得好，人類沒煩惱！貓貓吃得好，鏟屎官快樂！`,
    time: '下午 2:00 - 下午 6:00',
    location: {
      name: '台北',
      address: '200台北市中正區忠孝西路 1 號 1 樓',
    },
    selectedDate: new Date(),
  },
] as ServiceDetailProps[];

const times = [
  {
    times: [
      {
        time: '15:30',
        status: 'unsold',
      },
      {
        time: '15:40',
        status: 'unsold',
      },
      {
        time: '15:50',
        status: 'unsold',
      },
      {
        time: '16:00',
        status: 'has-order',
        restAttendee: 2,
      },
      {
        time: '16:10',
        status: 'full',
      },
      {
        time: '16:20',
        status: 'has-order',
        restAttendee: 1,
      },
      {
        time: '17:30',
        status: 'full',
      },
      {
        time: '17:40',
        status: 'unsold',
      },
      {
        time: '17:50',
        status: 'full',
      },
      {
        time: '18:00',
        status: 'full',
      },
      {
        time: '18:20',
        status: 'unsold',
      },
      {
        time: '18:30',
        status: 'full',
      },
      {
        time: '19:00',
        status: 'unsold',
      },
      {
        time: '19:30',
        status: 'full',
      },
      {
        time: '20:00',
        status: 'full',
      },
      {
        time: '21:20',
        status: 'unsold',
      },
      {
        time: '22:00',
        status: 'full',
      },
    ],
    queue: true,
  },
  {
    times: [
      {
        time: '15:30',
        status: 'unsold',
      },
      {
        time: '15:40',
        status: 'unsold',
      },
      {
        time: '15:50',
        status: 'unsold',
      },
      {
        time: '16:00',
        status: 'has-order',
        restAttendee: 2,
      },
      {
        time: '16:10',
        status: 'full',
      },
      {
        time: '16:20',
        status: 'has-order',
        restAttendee: 1,
      },
      {
        time: '17:30',
        status: 'full',
      },
      {
        time: '17:40',
        status: 'unsold',
      },
      {
        time: '17:50',
        status: 'full',
      },
      {
        time: '18:00',
        status: 'full',
      },
      {
        time: '18:20',
        status: 'unsold',
      },
      {
        time: '18:30',
        status: 'full',
      },
    ],
    queue: false,
  },
  {
    times: [],
    queue: true,
  },
] as ServiceTimesProps[];

export default function Detail() {
  const { id } = useParams<{
    id: string;
    provider: string;
  }>();
  const serviceTimes = {
    ...(id === '10' ? times[0] : id === '12' ? times[1] : times[2]),
  };

  return (
    <Fragment>
      <Header smHidden />
      <div className="flex flex-col md:h-[calc(100dvh-180px)]">
        <main className="relative flex bg-white">
          <Calendar className="hidden md:block" />
          <section className="max-h-[calc(100dvh-120px)] flex-1 overflow-y-scroll overflow-y-scroll bg-white px-4 py-2 md:max-h-full">
            <ServiceDetail
              {...(id === '10'
                ? services[0]
                : id === '12'
                ? services[1]
                : services[2])}
            />
            <ServiceTimes {...serviceTimes} />
          </section>
        </main>
        <Footer disabled={!serviceTimes.times.length} />
      </div>
    </Fragment>
  );
}
