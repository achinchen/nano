import { Fragment } from 'react';
import {
  getHeightByDuration,
  getTopByTimeAndOpenTime,
} from '~frontend/features/studio/CalendarWeekList/utils';
import { FULL_BLOCK_CLASS_NAMES } from '~frontend/features/studio/CalendarWeekList/constants';
import takeLeaveImage from '~frontend/assets/takeleave.svg';

const studioOpeningHours = ['09:00', '21:00'];
const TAKE_LEAVES = [
  {
    duration: 40,
    name: '創業諮詢',
    description: '創業諮詢的敘述就好似這樣',
    startAt: '2023-12-19T19:00',
  },
];

export default function TakeleaveBlocks({ loose = true }: { loose?: boolean }) {
  return (
    <Fragment>
      {TAKE_LEAVES.map(({ startAt, duration }, index) => (
        <li
          className={FULL_BLOCK_CLASS_NAMES}
          // eslint-disable-next-line react/no-array-index-key
          key={`takeleave-${startAt}-${index}`}
          style={{
            height: `${getHeightByDuration(duration, loose)}px`,
            top: getTopByTimeAndOpenTime(startAt, studioOpeningHours[0], loose),
          }}
        >
          <img src={takeLeaveImage} alt="take leave" />
        </li>
      ))}
    </Fragment>
  );
}
