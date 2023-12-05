import Icon from '~frontend/components/Icon';
import i from './i.json';

const CLASSNAMES =
  'text-lg flex justify-between color-zinc-700 items-center py-3 pl-0 pr-2 border-b-px border-b-solid border-b-zinc-200';

export default function ServiceAction() {
  return (
    <div className="flex flex-col">
      <button type="button" className={CLASSNAMES}>
        {i.merge}
        <Icon size="xl" icon="i-solar-alt-arrow-right-linear" />
      </button>
      <button type="button" className={CLASSNAMES}>
        {i.cancel}
        <Icon size="xl" icon="i-solar-alt-arrow-right-linear" />
      </button>
    </div>
  );
}
