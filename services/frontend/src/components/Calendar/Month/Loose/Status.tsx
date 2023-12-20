import type { Props } from '~frontend/components/Calendar/Month/Loose/types';
import type { Status as StatusType } from '~frontend/components/Calendar/types';
import Container from './components/Container';

export const STATUS_CLASS: { [key in StatusType]: string } = {
  unsold: `bg-primary-300`,
  'has-order': `bg-yellow-500`,
  full: `bg-zinc-200`,
};

function Status({ status }: { status: StatusType }) {
  return (
    <span
      className={`flex mt-2px h-1 w-full rounded-3 ${STATUS_CLASS[status]}`}
    />
  );
}

export default function CalendarMonthLooseStatus(props: Props) {
  return (
    <Container {...props}>
      {(payload: unknown) => <Status status={payload as StatusType} />}
    </Container>
  );
}
