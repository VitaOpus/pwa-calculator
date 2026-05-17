import { Effect, is, StoreWritable } from 'effector';

const ERROR_EFFECT = 'Можно передавать только эффект';
const ERROR_STORE = 'Можно передавать только хранилища';

export const setLoading = <P, R>(store: StoreWritable<boolean>, effect: Effect<P, R>) => {
  if (!is.effect(effect)) {
    throw new Error(ERROR_EFFECT);
  }

  if (!is.store(store)) {
    throw new Error(ERROR_STORE);
  }

  store.on(effect, (): boolean => true);
  store.on([effect.doneData, effect.fail], (): boolean => false);
};

export default {};
