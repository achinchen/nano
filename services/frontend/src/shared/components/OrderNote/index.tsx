import { formateDateTime } from '~frontend/utils/date';
import IconButton from '~frontend/components/IconButton';
import i from './i.json';

type Props = {
  onEdit?: () => void;
  note: {
    updateAt: string;
    content: string;
  };
};

export default function OrderNote({ onEdit, note }: Props) {
  return (
    <article className="mt-3">
      <h3 className="flex items-center justify-between text-base font-bold">
        {i.note}
        {typeof onEdit !== 'undefined' && (
          <IconButton
            size="sm"
            variant="outline"
            color="primary"
            icon="i-solar-pen-2-bold"
            onClick={onEdit}
          />
        )}
      </h3>
      <time className="text-xs font-normal color-zinc-500">
        {i.updated}
        {formateDateTime(new Date(note.updateAt))}
      </time>
      <p className="mb-10 mt-1 text-sm font-normal">{note.content}</p>
    </article>
  );
}
