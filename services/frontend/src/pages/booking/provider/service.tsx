import Detail from '~frontend/features/booking/detail';
import useBg from '~frontend/shared/hooks/use-bg';
import { BG } from './constants';

export default function Index() {
  useBg(BG);
  return <Detail />;
}
