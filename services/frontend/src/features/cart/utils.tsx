import type { Payload } from '~frontend/types/utils';
import { ScopedLocalStorage } from '~frontend/utils/storage/local-storage';
import { Step } from '~frontend/features/cart/constants';

const FEATURE_SCOPED = 'cart:agogo';

const scopedLocalStorage = new ScopedLocalStorage(FEATURE_SCOPED);

function getCartStorage(key: Step) {
  return scopedLocalStorage.get(Step[key]);
}

function setCartStorage(key: Step, payload?: Payload) {
  return scopedLocalStorage.set(Step[key], payload);
}

export const setCart = (payload?: Payload) =>
  setCartStorage(Step.cart, payload);

export const setInfo = (payload?: Payload) =>
  setCartStorage(Step.info, payload);

export const getAll = () => ({
  cart: getCartStorage(Step.cart),
  info: getCartStorage(Step.info),
});
