import type { Props } from '~frontend/components/Calendar/Month/Loose/types';
import { getServiceColorById } from '~frontend/shared/utils/get-service-color-by-id';
import { Content as ContentType } from '~frontend/components/Calendar/types';
import Container from './components/Container';
import { MAX_LENGTH } from './constants';
import i from './i.json';

type Payload = {
  data: ContentType[];
  date: string;
};

function Content({ data, date }: Payload) {
  const { length: dataLength } = data;
  const showMore = dataLength > MAX_LENGTH;
  const items = showMore ? data.slice(0, MAX_LENGTH) : data;
  const moreItemLength = dataLength - MAX_LENGTH;

  return (
    <ul className="mt-1 w-100% flex flex-col gap-1 p-0">
      {items.map(({ name, id }) => (
        <li
          key={`${date}-${name}-${id}`}
          className={`truncate rounded-1 px-2 text-xs font-medium ${
            getServiceColorById(id).LABEL
          }`}
        >
          {name}
        </li>
      ))}
      {showMore && (
        <li className="truncate px-2 text-xs font-medium">
          {i.rest} {moreItemLength} {i.service}
        </li>
      )}
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
