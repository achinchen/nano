import { Fragment } from 'react';
import { useStudioSettingContext } from '~frontend/features/studio/setting-/context';
import Icon from '~frontend/components/Icon';
import i from './i.json';

export default function SettingHeader() {
  const { view, toggleView } = useStudioSettingContext();

  return (
    <header className="flex justify-start content-header">
      {view === 'studio' ? (
        <h2 className="text-lg md:text-xl">{i.title}</h2>
      ) : (
        <Fragment>
          <button onClick={toggleView}>
            <h2 className="text-lg color-zinc-700 md:text-xl">{i.title}</h2>
          </button>
          <Icon icon="i-solar-alt-arrow-right-linear" size="xl" />
          {i.supplier}
        </Fragment>
      )}
    </header>
  );
}
