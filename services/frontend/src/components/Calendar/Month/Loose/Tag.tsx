import type { Props } from '~frontend/components/Calendar/Month/Loose/types';
import { getServiceColorById } from '~frontend/shared/get-service-color-by-id';
import { Content as ContentType } from '~frontend/components/Calendar/types';
import Container from './components/Container';
import { MAX_LENGTH } from './constants';

type Payload = {
  data: ContentType[];
  date: string;
};

function Content({ data, date }: Payload) {
  const { length: dataLength } = data;
  const showMore = dataLength > MAX_LENGTH;
  const items = showMore ? data.slice(0, MAX_LENGTH) : data;

  return (
    <ul className="mt-1 w-100% flex flex-col gap-1 p-0">
      <li className="h-1 flex flex-row gap-1">
        {items.map(({ id }) => (
          <span
            key={`${id}-tag-${date}`}
            className={`flex-1 rounded-3 ${getServiceColorById(id).BG.DEFAULT}`}
          />
        ))}
      </li>
    </ul>
  );
}

export default function CalendarMonthLooseName(props: Props) {
  return (
    <Container {...props}>
      {(payload: unknown, date: string) => (
        <Content data={payload as ContentType[]} date={date} />
      )}
    </Container>
  );
}
