import { MAX_LENGTH } from './constants';

type ContentProps = {
  data: string[];
};

export default function Content({ data }: ContentProps) {
  const { length: dataLength } = data;
  const showMore = dataLength > MAX_LENGTH;
  const items = showMore ? data.slice(0, MAX_LENGTH) : data;
  const moreItemLength = dataLength - MAX_LENGTH;

  return (
    <ul className="mt-1 w-100% flex flex-col gap-1 p-0">
      <li className="h-1 flex flex-row gap-1">
        {dataLength && <span className="flex-1 rounded-3 bg-red-400" />}
        {dataLength > 1 && <span className="flex-1 rounded-3 bg-yellow-400" />}
        {dataLength > 2 && <span className="flex-1 rounded-3 bg-blue-500" />}
      </li>
      {items.map((name, index) => (
        <li
          key={`${name}-${index + 1}`}
          className="truncate rounded-1 bg-red-100 px-2 text-xs font-medium text-red-800"
        >
          {name}
        </li>
      ))}
      {showMore && (
        <li className="truncate px-2 text-xs font-medium">
          還有 {moreItemLength} 項服務
        </li>
      )}
    </ul>
  );
}
