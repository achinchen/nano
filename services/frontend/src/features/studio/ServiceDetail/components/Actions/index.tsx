import { Link, useParams } from 'react-router-dom';
import Icon from '~frontend/components/Icon';
import i from './i.json';

const CLASSNAMES =
  'text-lg flex justify-between items-center py-3 pl-0 pr-2 border-b-px border-b-solid border-b-zinc-200';

export default function Actions() {
  const { id } = useParams<{ id?: string }>();
  const end = Number(id) % 2 === 0;

  return (
    <div className="flex flex-col">
      {!end && (
        <Link to={`/studio/services/${id}/update`} className={CLASSNAMES}>
          {i.update}
          <Icon size="xl" icon="i-solar-alt-arrow-right-linear" />
        </Link>
      )}
      <Link to={`/studio/services/create`} className={CLASSNAMES}>
        {i.duplicate}
        <Icon size="xl" icon="i-solar-alt-arrow-right-linear" />
      </Link>
      {!end && (
        <button type="button" className={CLASSNAMES}>
          {i.close}
          <Icon size="xl" icon="i-solar-alt-arrow-right-linear" />
        </button>
      )}
    </div>
  );
}
