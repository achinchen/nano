import Icon from '~frontend/components/Icon';
import i from './i.json';

const CLASSNAMES =
  'text-lg flex justify-between items-center py-3 pl-0 pr-2 border-b-px border-b-solid border-b-zinc-200';

type Props = {
  end: boolean;
  id: number;
};

export default function Actions({ id, end }: Props) {
  return (
    <div className="flex flex-col">
      {!end && (
        <button className={CLASSNAMES}>
          {i.update}
          <Icon size="xl" icon="i-solar-alt-arrow-right-linear" />
        </button>
      )}
      <button className={CLASSNAMES}>
        {i.duplicate}
        <Icon size="xl" icon="i-solar-alt-arrow-right-linear" />
      </button>
      {!end && (
        <button type="button" className={CLASSNAMES}>
          {i.close}
          <Icon size="xl" icon="i-solar-alt-arrow-right-linear" />
        </button>
      )}
    </div>
  );
}
