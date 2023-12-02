import { Fragment } from 'react';
import { getServiceColorById } from '~frontend/shared/get-service-color-by-id';
import { Content as ContentType } from '~frontend/components/Calendar/types';
import { MAX_LENGTH } from './constants';
import i from './i.json';

type Props = {
  data: ContentType[];
  date: string;
  variant?: 'name' | 'tag' | 'all';
};

function Tags({ items, date }: { items: ContentType[]; date: string }) {
  return (
    <Fragment>
      {items.map(({ id }) => (
        <span
          key={`${id}-tag-${date}`}
          className={`flex-1 rounded-3 ${getServiceColorById(id).BG.DEFAULT}`}
        />
      ))}
    </Fragment>
  );
}

export default function Content({ data, date, variant }: Props) {
  const { length: dataLength } = data;
  const showMore = dataLength > MAX_LENGTH;
  const items = showMore ? data.slice(0, MAX_LENGTH) : data;
  const moreItemLength = dataLength - MAX_LENGTH;

  return (
    <ul className="mt-1 w-100% flex flex-col gap-1 p-0">
      {variant !== 'name' && (
        <li className="h-1 flex flex-row gap-1">
          <Tags items={items} date={date} />
        </li>
      )}
      {variant !== 'tag' && (
        <Fragment>
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
        </Fragment>
      )}
    </ul>
  );
}
