import type { Props } from './types';
import Default from './Default';
import Queues from './Queues';

export default function TimeCard({ queues, startAt, duration }: Props) {
  return queues ? (
    <Queues queues={queues} duration={duration} />
  ) : (
    <Default startAt={startAt} duration={duration} />
  );
}
