import { TAG_CONFIG } from '~frontend/components/Tag/constants';
import i from './i.json';

export default function UpdateTag({ className = '' }) {
  return (
    <span
      className={`${TAG_CONFIG.base} bg-yellow-500 h-6 min-w-10 color-light-100 ml-3`}
    >
      {i.update}
    </span>
  );
}
