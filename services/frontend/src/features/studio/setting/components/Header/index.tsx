import { Fragment } from 'react';
import { useStudioSettingContext } from '~frontend/features/studio/setting/context';
import Icon from '~frontend/components/Icon';
import i from './i.json';

const TEXT = 'text-lg md:text-xl';

export default function SettingHeader() {
  const { view, toggleView } = useStudioSettingContext();

  return (
    <header className="flex justify-start text-lg content-header">
      {view === 'studio' ? (
        <h2 className={TEXT}>{i.title}</h2>
      ) : (
        <Fragment>
          <button className="pa-0" onClick={toggleView}>
            <h2 className={`text-lg color-zinc-700 ${TEXT}`}>{i.title}</h2>
          </button>
          <Icon icon="i-solar-alt-arrow-right-linear" size="xl" />
          <span className={TEXT}>{i.supplier}</span>
        </Fragment>
      )}
    </header>
  );
}
