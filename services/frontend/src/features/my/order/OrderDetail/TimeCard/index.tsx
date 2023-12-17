import type { Props } from './types';
import Default from './Default';
import Queues from './Queues';

export default function TimeCard({ queues, duration }: Props) {
  return queues.length > 1 ? (
    <Queues queues={queues} duration={duration} />
  ) : (
    <Default queues={queues} duration={duration} />
  );
}
