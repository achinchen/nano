import { Fragment } from 'react';
import {
  getHeightByDuration,
  getTopByTimeAndOpenTime,
} from '~frontend/features/studio/components/CalendarWeekList/utils';
import { FULL_BLOCK_CLASS_NAMES } from '~frontend/features/studio/components/CalendarWeekList/constants';
import takeLeaveImage from '~frontend/assets/takeleave.svg';
import { STUDIO_TIMES, STUDIO_DURATION } from '~frontend/shared/mock';

const TAKE_LEAVES = [
  {
    duration: STUDIO_DURATION,
    startAt: '2024-01-30T09:00',
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
            top: getTopByTimeAndOpenTime(startAt, STUDIO_TIMES[0], loose),
          }}
        >
          <img src={takeLeaveImage} alt="take leave" />
        </li>
      ))}
    </Fragment>
  );
}
