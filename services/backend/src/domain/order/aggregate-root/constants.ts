import type { State } from '~backend/domain/order/entity';
import { STATES } from '~backend/domain/order/entity';

export const DEFAULT_STATE = STATES[3] as State;
export const REQUESTED_STATE = STATES[4] as State;
export const PERMITTED_STATE = STATES[3] as State;
export const REJECTED_STATE = STATES[2] as State;
