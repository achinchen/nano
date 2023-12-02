import Icon from '~frontend/components/Icon';
import i from './i.json';

const CLASSNAMES =
  'text-lg flex justify-between items-center py-3 pl-0 pr-2 border-b-px border-b-solid border-b-zinc-200';

export default function ServiceAction() {
  return (
    <div className="mt-2 flex flex-col">
      <button type="button" className={CLASSNAMES}>
        {i.update}
        <Icon size="xl" icon="i-solar-alt-arrow-right-linear" />
      </button>
    </div>
  );
}
