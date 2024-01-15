import Terms from '~frontend/features/auth/Terms';
import useBg from '~frontend/shared/hooks/use-bg';
import { BG } from './constants';

export default function Index() {
  useBg(BG);
  return <Terms />;
}
