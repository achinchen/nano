import Setting from '~frontend/features/studio/setting';
import useBg from '~frontend/shared/hooks/use-bg';
import { BG } from './constants';

export default function Index() {
  useBg(BG);
  return <Setting />;
}
