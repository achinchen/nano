import Privacy from '~frontend/features/auth/Privacy';
import useBg from '~frontend/shared/hooks/use-bg';
import { BG } from './constants';

export default function Index() {
  useBg(BG);
  return <Privacy />;
}
