import { createStore } from 'effector';

export const $steps = createStore<string[]>(['USD']);
export const $amount = createStore<string>('10');
