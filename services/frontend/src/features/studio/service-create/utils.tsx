import type { Payload } from '~frontend/types/utils';
import { ScopedLocalStorage } from '~frontend/utils/storage/local-storage';
import { Step } from '~frontend/features/cart/constants';

const FEATURE_SCOPED = 'service-create';

const scopedLocalStorage = new ScopedLocalStorage(FEATURE_SCOPED);

function getCreateServiceStorage(key: Step) {
  return scopedLocalStorage.get(Step[key]);
}

function setCreateServiceStorage(key: Step, payload?: Payload) {
  return scopedLocalStorage.set(Step[key], payload);
}

export const setInfo = (payload?: Payload) =>
  setCreateServiceStorage(Step.info, payload);

export const getInfo = () => getCreateServiceStorage(Step.info);

export const clearInfo = () => setInfo(undefined);
