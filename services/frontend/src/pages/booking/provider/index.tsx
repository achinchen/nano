import useBg from '~frontend/shared/hooks/use-bg';
import Home from '~frontend/features/booking/home';
import { BG } from './constants';

export default function Index() {
  useBg(BG);
  return <Home />;
}
