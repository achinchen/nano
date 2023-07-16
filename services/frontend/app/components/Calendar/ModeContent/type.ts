import type { InitialState } from '~frontend/components/Calendar/context';
export type Props = Pick<InitialState, 'selectedDate' | 'today'>;
