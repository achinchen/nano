import { useState, useEffect, useMemo } from 'react';
import CalendarWeek from '~frontend/components/Calendar/Week';
import { useStudioContext } from '~frontend/features/studio/context';
import sharedI from '~frontend/shared/i.json';
import { getServiceColorById } from '~frontend/shared/get-service-color-by-id';
import { getPeriodTime } from '~frontend/utils/time';
import takeLeaveImage from '~frontend/assets/takeleave.svg';
import {
  getTimeOptions,
  getHeightByDuration,
  getTopByTimeAndOpenTime,
} from './utils';

const mockServiceData = {
  17: [{ name: '提拉米蘇蛋糕課', id: 1, status: 'full' }],
  20: [
    {
      name: '提拉米蘇蛋糕課',
      description: '提拉米蘇蛋糕課的敘述就好似這樣',
      id: 8,
      startTime: '10:00',
      endTime: '20:00',
      status: 'unsold',
    },
    {
      name: '情人節手作',
      id: 2,
      description: '情人節手作的敘述就好似這樣',
      startTime: '10:00',
      endTime: '12:00',
      status: 'has-order',
    },
    {
      name: '3天寫程式就上手不可能',
      description: '3天寫程式就上手不可能的敘述就好似這樣',
      id: 3,
      startTime: '09:00',
      endTime: '15:00',
      status: 'full',
    },
    {
      name: '精油課程妳看不見',
      id: 12,
      startTime: '10:00',
      endTime: '18:00',
      description: '精油課程妳看不見的敘述就好似這樣',
      status: 'has-order',
    },
    {
      name: '提拉米蘇蛋糕課',
      description: '提拉米蘇蛋糕課的敘述就好似這樣',
      startTime: '19:00',
      endTime: '21:00',
      id: 30,
      status: 'has-order',
    },
  ],
  30: [
    {
      name: '提拉米蘇蛋糕課',
      id: 30,
      status: 'has-order',
    },
  ],
};

const ORDERS = [
  {
    duration: 15,
    name: '創業諮詢',
    description: '創業諮詢的敘述就好似這樣',
    currentAttendee: 4,
    serviceId: 7,
    attendee: 4,
    startAt: '2023-12-19T10:00',
  },
  {
    duration: 90,
    name: '客製蛋糕',
    description: '客製蛋糕的敘述就好似這樣',
    currentAttendee: 1,
    serviceId: 21,
    attendee: 2,
    startAt: '2023-12-19T13:00',
  },
  {
    duration: 30,
    name: '客製蛋糕',
    description: '客製蛋糕的敘述就好似這樣',
    currentAttendee: 2,
    serviceId: 21,
    attendee: 2,
    startAt: '2023-12-19T12:00',
  },
  {
    duration: 45,
    currentAttendee: 2,
    serviceId: 20,
    attendee: 2,
    description: '小飛象戚風蛋糕的敘述就好似這樣',
    name: '小飛象戚風蛋糕',
    startAt: '2023-12-19T15:00',
  },
];

const TIME = 'w-14 md:w-17 text-xs color-zinc-500 font-normal text-right';
const studioOpeningHours = ['09:00', '21:00'];

const TAKE_LEAVES = [
  {
    duration: 40,
    name: '創業諮詢',
    description: '創業諮詢的敘述就好似這樣',
    startAt: '2023-12-19T19:00',
  },
];

const TIME_BLOCK_CLASSNAME =
  'absolute mt-9px w-100% flex flex-col overflow-hidden border-1 border-zinc-200 rounded-2 border-solid bg-light-100';

const getMockData = (month: number) => {
  return Object.entries(mockServiceData).reduce((data, [date, value]) => {
    return {
      ...data,
      [`${month}-${date}`]: value,
    };
  }, {});
};

const SCALE_SIZE = {
  XS: {
    TITLE: 'text-10px',
    TAG: 'top-2px',
    DESCRIPTION: 'text-8px',
  },
  SM: {
    TITLE: 'text-12px',
    TAG: 'top-2',
    DESCRIPTION: 'text-10px',
  },
  MD: {
    TITLE: 'text-base',
    TAG: 'top-2',
    DESCRIPTION: 'text-sm',
  },
};

export default function ListMode({ loose = true }: { loose?: boolean }) {
  const { selectedDate, setSelectedDate } = useStudioContext();
  const [serviceData, setServiceData] = useState({});
  const timeOptions = getTimeOptions(
    studioOpeningHours[0],
    studioOpeningHours[1]
  );

  const selectedDateService = mockServiceData['20'];

  const serviceStatusData = useMemo(() => {
    return Object.entries(serviceData).reduce(
      (data, [date, services]) => ({
        ...data,
        [date]: (services as { status: string }[])[0].status,
      }),
      {}
    );
  }, [serviceData]);

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const isThisMonth = selectedDate.getMonth() === thisMonth;
    setServiceData(isThisMonth ? getMockData(thisMonth + 1) : {});
  }, [selectedDate, setSelectedDate]);

  return (
    <section className="border-t-1 border-t-zinc-200 border-t-solid pt-2 md:w-160 md:border-none md:bg-zinc-50 md:pl-6 md:pt-6">
      <CalendarWeek
        onSelect={setSelectedDate}
        selectedDate={selectedDate}
        data={serviceStatusData}
        loose={loose}
      />
      <section className="mt-2 bg-zinc-50">
        <nav className="flex items-center gap-1 border-y-2 border-y-zinc-200 border-y-solid py-2">
          <h6 className={`flex-shrink-0 ${TIME}`}>{sharedI.service}</h6>
          <ul className="flex flex-1 overflow-y-scroll pr-2">
            {selectedDateService.map(({ id, name }, index) => (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={`service-${id}-${index}`}
                className={`${
                  getServiceColorById(id).LABEL
                } flex-shrink-0 flex rounded-2 overflow-hidden text-sm min-w-20 max-w-60 border-1 border-color-zinc-200 border-solid ml-2 border-solid
                `}
              >
                <span
                  className={`flex-shrink-0 inline-block w-1 ${
                    getServiceColorById(id).BG
                  }`}
                />
                <span className="truncate px-2 py-1">{name}</span>
              </li>
            ))}
          </ul>
        </nav>
        <main className="relative mt-2 h-[calc(100dvh-236px)] overflow-y-scroll md:h-[calc(100dvh-330px)]">
          <ul className="flex flex-col">
            {timeOptions.map((time) => (
              <li key={time} className="h-12 flex gap-1px md:h-15">
                <span className={`${TIME} flex flex-shrink-0 justify-end`}>
                  {time}
                </span>
                <span className="ml-1 w-100% translate-y-8px border-t-1 border-t-zinc-400 border-t-solid before:relative before:left-0 before:top-50% before:block before:h-0.5px before:w-100% before:translate-y--50% before:bg-zinc-200 before:content-['']" />
              </li>
            ))}
          </ul>
          <ul className="absolute top-0 w-[calc(100%-60px)] translate-x-15 md:w-[calc(100%-72px)] md:translate-x-18">
            {ORDERS.map(
              ({
                startAt,
                duration,
                name,
                currentAttendee,
                attendee,
                serviceId,
              }) => {
                const scale =
                  duration < 35
                    ? SCALE_SIZE.XS
                    : duration < 40
                    ? SCALE_SIZE.SM
                    : SCALE_SIZE.MD;

                return (
                  <li
                    className={`${TIME_BLOCK_CLASSNAME} pr-2 active:bg-zinc-100 hover:bg-zinc-50`}
                    key={`order-cards-${serviceId}-${name}-${startAt}`}
                    style={{
                      height: `${getHeightByDuration(duration, loose)}px`,
                      top: getTopByTimeAndOpenTime(
                        startAt,
                        studioOpeningHours[0],
                        loose
                      ),
                    }}
                  >
                    <div
                      className={`relative flex flex-col gap--1 pl-2 border-l-8 border-l-solid h-100% ${
                        getServiceColorById(serviceId).BORDER.LEFT
                      }`}
                    >
                      <time className={scale.TITLE}>
                        {getPeriodTime(startAt, duration)}
                      </time>
                      <span
                        className={`absolute right-0 flex items-center rounded-2 bg-primary-200 px-1 text-1em color-primary-500 ${scale.TAG}`}
                      >
                        {currentAttendee}/{attendee}
                      </span>
                      <h5
                        className={`line-clamp-2 font-normal color-zinc-600 ${scale.DESCRIPTION}`}
                      >
                        {name}
                      </h5>
                    </div>
                  </li>
                );
              }
            )}
            {TAKE_LEAVES.map(({ startAt, duration }, index) => (
              <li
                className={TIME_BLOCK_CLASSNAME}
                // eslint-disable-next-line react/no-array-index-key
                key={`order-cards-${startAt}-${index}`}
                style={{
                  height: `${getHeightByDuration(duration, loose)}px`,
                  top: getTopByTimeAndOpenTime(
                    startAt,
                    studioOpeningHours[0],
                    loose
                  ),
                }}
              >
                <img src={takeLeaveImage} alt="take leave" />
              </li>
            ))}
          </ul>
        </main>
      </section>
    </section>
  );
}
