import { getServiceColorById } from '~frontend/shared/get-service-color-by-id';
import {
  getHeightByDuration,
  getTopByTimeAndOpenTime,
} from '~frontend/features/studio/components/CalendarWeekList/utils';

const studioOpeningHours = ['09:00', '21:00'];

const SERVICES = [
  {
    duration: 200,
    id: 1,
    name: '創業諮詢',
    description: '創業諮詢的敘述就好似這樣',
    startAt: '2023-12-19T09:00',
  },
  {
    name: '3天寫程式就上手不可能',
    description: '3天寫程式就上手不可能的敘述就好似這樣',
    id: 3,
    startAt: '2023-12-19T10:00',
    duration: 320,
  },
  {
    name: '精油課程妳看不見',
    id: 8,
    duration: 400,
    startAt: '2023-12-19T12:00',
    description: '精油課程妳看不見的敘述就好似這樣',
  },
  {
    name: '提拉米蘇蛋糕課',
    description: '提拉米蘇蛋糕課的敘述就好似這樣',
    startAt: '2023-12-19T17:00',
    duration: 80,
    id: 30,
  },
];

export default function ServiceTimeBlocks({
  loose = true,
}: {
  loose?: boolean;
}) {
  return (
    <Fragment>
      {SERVICES.map(({ id, startAt, duration }, index) => (
        <li
          className={`inline-block min-w-20 mt-9px max-w-60 rounded-2 mr-2 ${
            getServiceColorById(id).BG.LIGHT
          }`}
          // eslint-disable-next-line react/no-array-index-key
          key={`service-time-${id}-${startAt}-${index}`}
          style={{
            height: `${getHeightByDuration(duration, loose)}px`,
            translate: `translateY(${getTopByTimeAndOpenTime(
              startAt,
              studioOpeningHours[0],
              loose
            )})`,
          }}
        />
      ))}
    </Fragment>
  );
}
