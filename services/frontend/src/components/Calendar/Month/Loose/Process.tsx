import type { Props } from '~frontend/components/Calendar/Month/Loose/types';
import Container from './Container';

type Progress = 'start' | 'end';

const PROCESS_CLASS = {
  start: 'bg-yellow-300',
  end: 'bg-yellow-500',
};

function Status({ progress }: { progress: Progress }) {
  return (
    <span
      className={`flex mt-2px h-1 w-full rounded-3 ${PROCESS_CLASS[progress]}`}
    />
  );
}

export default function CalendarMonthLooseProcess(props: Props) {
  return (
    <Container {...props}>
      {(payload: unknown) => <Status progress={payload as Progress} />}
    </Container>
  );
}
